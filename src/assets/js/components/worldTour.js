import * as d3 from "d3";
import * as topojson from "topojson-client";

// Copyright 2020 Observable, Inc.
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.

// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

// Animation durations
const ANIMATION = Object.freeze({
  FLIGHT: 1250,
  PAUSE: 1100,
});

const visitedCountries = [
  "United States of America",
  "France",
  "Italy",
  "Spain",
  "Germany",
  "Portugal",
  "Netherlands",
  "Austria",
  "Slovenia",
  "Hungary",
  "Croatia",
  "Czechia",
  "Japan",
  "South Korea",
  "Mexico",
  "Chile",
  "Uruguay",
  "Puerto Rico",
  "Vietnam",
  "Morocco",
  "Argentina",
  "Peru",
];

// Country arcs to exclude: [country name, array indices to exclude]
const arcExclusions = {
  France: [0, 2], // Exclude French territories - first is French Guiana, third is likely islands
  Netherlands: [1, 2], // Exclude Dutch Caribbean territories
  "United States of America": [1, 2, 3, 4, 5, 6, 7, 8, 9], // Exclude all but 50 states
};

// Cache color values
let colors = {
  ocean: getColorValue("--world-ocean-color"),
  graticule: getColorValue("--world-graticule-color"),
  border: getColorValue("--world-border-color"),
  visited: getColorValue("--world-visited-country-color"),
  land: getColorValue("--world-land-color"),
  flight: getColorValue("--world-flight-path-color"),
};

// Global variables to maintain state across resize events
let worldData = null;
let currentCountry = null;
let currentPath = null;
let isAnimating = false;
let rotationAngles = [0, 0, 0];
let animationTimer = null;
let projection = null;
let path = null;
let canvas = null;
let context = null;
let globeContainer = null;
let isInitialized = false; // Flag to track if setup has run
let animationFrameId = null; // Track current RAF id
let isInViewport = true; // Track intersection state

// Versor class for smooth rotation interpolation
class Versor {
  static fromAngles([l, p, g]) {
    l *= Math.PI / 360;
    p *= Math.PI / 360;
    g *= Math.PI / 360;
    const sl = Math.sin(l),
      cl = Math.cos(l);
    const sp = Math.sin(p),
      cp = Math.cos(p);
    const sg = Math.sin(g),
      cg = Math.cos(g);
    return [
      cl * cp * cg + sl * sp * sg,
      sl * cp * cg - cl * sp * sg,
      cl * sp * cg + sl * cp * sg,
      cl * cp * sg - sl * sp * cg,
    ];
  }

  static toAngles([a, b, c, d]) {
    return [
      (Math.atan2(2 * (a * b + c * d), 1 - 2 * (b * b + c * c)) * 180) / Math.PI,
      (Math.asin(Math.max(-1, Math.min(1, 2 * (a * c - d * b)))) * 180) / Math.PI,
      (Math.atan2(2 * (a * d + b * c), 1 - 2 * (c * c + d * d)) * 180) / Math.PI,
    ];
  }

  static interpolateAngles(a, b) {
    const i = Versor.interpolate(Versor.fromAngles(a), Versor.fromAngles(b));
    return (t) => Versor.toAngles(i(t));
  }

  static interpolate([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    let dot = a1 * a2 + b1 * b2 + c1 * c2 + d1 * d2;
    if (dot < 0) (a2 = -a2), (b2 = -b2), (c2 = -c2), (d2 = -d2), (dot = -dot);
    if (dot > 0.9995) return Versor.#interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]);
    const theta0 = Math.acos(Math.max(-1, Math.min(1, dot)));
    const x = new Array(4);
    const l = Math.hypot((a2 -= a1 * dot), (b2 -= b1 * dot), (c2 -= c1 * dot), (d2 -= d1 * dot));
    (a2 /= l), (b2 /= l), (c2 /= l), (d2 /= l);
    return (t) => {
      const theta = theta0 * t;
      const s = Math.sin(theta);
      const c = Math.cos(theta);
      x[0] = a1 * c + a2 * s;
      x[1] = b1 * c + b2 * s;
      x[2] = c1 * c + c2 * s;
      x[3] = d1 * c + d2 * s;
      return x;
    };
  }

  static #interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    (a2 -= a1), (b2 -= b1), (c2 -= c1), (d2 -= d1);
    const x = new Array(4);
    return (t) => {
      const l = Math.hypot((x[0] = a1 + a2 * t), (x[1] = b1 + b2 * t), (x[2] = c1 + c2 * t), (x[3] = d1 + d2 * t));
      (x[0] /= l), (x[1] /= l), (x[2] /= l), (x[3] /= l);
      return x;
    };
  }
}

/**
 * Retrieves the value of a CSS variable.
 * @param {string} cssVar - The name of the CSS variable.
 * @returns {string} The value of the CSS variable.
 */
function getColorValue(cssVar) {
  return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
}

/**
 * Selects a random country from the list of visited countries.
 * @param {Object} countries - The GeoJSON object containing country features.
 * @param {Object} prevCountry - The previously selected country.
 * @returns {Object} A randomly selected country feature.
 */
function getRandomCountry(countries, prevCountry) {
  const availableCountries = countries.features.filter(
    (c) =>
      visitedCountries.includes(c.properties.name) &&
      (!prevCountry || c.properties.name !== prevCountry.properties.name)
  );
  return availableCountries[Math.floor(Math.random() * availableCountries.length)];
}

/**
 * Updates the globe dimensions, projection, and redraws the canvas.
 */
function updateGlobeDimensionsAndProjection() {
  if (!globeContainer || !canvas || !context || !projection || !path) return;

  // Get container dimensions
  const containerWidth = globeContainer.clientWidth;
  const containerHeight = globeContainer.clientHeight;

  // Determine ideal globe size (always 1:1 aspect ratio)
  // Use the smaller dimension of the container, with padding on larger screens
  const baseSize = Math.min(containerWidth, containerHeight);
  let globeSize = baseSize;
  if (containerWidth > 600) {
    // Apply padding only on larger screens
    globeSize = baseSize * 0.9;
  }

  // Set canvas size with device pixel ratio support
  const dpr = window.devicePixelRatio || 1;
  canvas.width = globeSize * dpr;
  canvas.height = globeSize * dpr;
  canvas.style.width = `${globeSize}px`;
  canvas.style.height = `${globeSize}px`;

  // Reset context transform and scale for retina
  context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
  context.scale(dpr, dpr);

  // Update projection
  projection.scale(globeSize / 2 - 5).translate([globeSize / 2, globeSize / 2]);

  // Redraw the globe -- REMOVED drawGlobe() call from here
  // drawGlobe();
}

/**
 * Initialize the world map visualization ONCE.
 */
async function setupGlobe() {
  // Prevent multiple initializations
  if (isInitialized) return;

  // Find the container
  globeContainer = document.querySelector(".world-tour-container");
  if (!globeContainer) return;

  // Clean up any existing canvas (just in case of HMR or similar)
  const existingCanvas = globeContainer.querySelector("canvas");
  if (existingCanvas) {
    existingCanvas.remove();
  }

  // Create or find the title element
  let titleElement = globeContainer.querySelector(".world-title");
  if (!titleElement) {
    titleElement = document.createElement("div");
    titleElement.className = "world-title";
    globeContainer.appendChild(titleElement);
  }

  // Create a new canvas (only once)
  canvas = document.createElement("canvas");
  globeContainer.appendChild(canvas);

  // Get drawing context (only once)
  context = canvas.getContext("2d");

  // Set up the projection (only once)
  projection = d3.geoOrthographic().rotate(rotationAngles); // Initial rotation

  path = d3.geoPath(projection, context);

  // Load world data if not already loaded
  const dataLoaded = await loadWorldData();
  if (!dataLoaded) return; // Stop if data failed to load

  // Set initial dimensions and projection (without drawing yet)
  updateGlobeDimensionsAndProjection();

  // Draw the initial state once before starting animation
  drawGlobe();

  // Mark as initialized
  isInitialized = true;

  // Start animation loop
  startAnimation();
}

/**
 * Load world map data
 */
async function loadWorldData() {
  try {
    const data = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");

    // Apply arc exclusions
    if (data && data.objects && data.objects.countries && data.objects.countries.geometries) {
      data.objects.countries.geometries.forEach((geometry) => {
        const countryName = geometry.properties.name;
        if (arcExclusions[countryName] && geometry.type === "MultiPolygon") {
          geometry.arcs = geometry.arcs.filter((_, index) => !arcExclusions[countryName].includes(index));
        }
      });
    }

    // Save the processed data
    worldData = {
      countries: topojson.feature(data, data.objects.countries),
      borders: topojson.mesh(data, data.objects.countries, (a, b) => a !== b),
      graticule: d3.geoGraticule(),
    };

    return true;
  } catch (error) {
    console.error("Error loading world data:", error);
    return false;
  }
}

/**
 * Draw the globe with current state
 */
function drawGlobe() {
  if (!context || !worldData) return;

  const width = canvas.width / (window.devicePixelRatio || 1);
  const height = canvas.height / (window.devicePixelRatio || 1);

  // Clear canvas based on scaled size
  context.clearRect(0, 0, width, height);

  // Draw ocean (sphere)
  context.beginPath();
  path({ type: "Sphere" });
  context.fillStyle = colors.ocean;
  context.fill();

  // Draw graticule
  context.beginPath();
  path(worldData.graticule());
  context.strokeStyle = colors.graticule;
  context.lineWidth = 0.5;
  context.stroke();

  // Draw all countries
  context.beginPath();
  path(worldData.countries);
  context.fillStyle = colors.land;
  context.fill();

  // Draw visited countries
  worldData.countries.features
    .filter((d) => visitedCountries.includes(d.properties.name))
    .forEach((d) => {
      context.beginPath();
      path(d);
      context.fillStyle = colors.visited;
      context.fill();
    });

  // Highlight current country if provided
  if (currentCountry) {
    context.beginPath();
    path(currentCountry);
    context.fillStyle = colors.visited;
    context.fill();
  }

  // Draw borders
  context.beginPath();
  path(worldData.borders);
  context.strokeStyle = colors.border;
  context.lineWidth = 0.5;
  context.stroke();

  // Draw flight path if provided
  if (currentPath) {
    context.beginPath();
    path(currentPath);
    context.strokeStyle = colors.flight;
    context.lineWidth = 2;
    context.stroke();
  }

  // Draw sphere outline
  context.beginPath();
  path({ type: "Sphere" });
  context.strokeStyle = colors.border;
  context.lineWidth = 1;
  context.stroke();
}

/**
 * Start the country animation sequence
 */
function startAnimation() {
  isAnimating = true;
  goToNextCountry(); // Start the sequence directly
}

function pauseAnimation() {
  isAnimating = false;
  if (animationTimer) {
    clearTimeout(animationTimer);
    animationTimer = null;
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function resumeAnimation() {
  if (!isAnimating && isInViewport && document.visibilityState === "visible") {
    isAnimating = true;
    goToNextCountry();
  }
}

/**
 * Animate to a new random country
 */
async function goToNextCountry() {
  if (!worldData || !isAnimating) return;

  const tilt = 20;
  const prevCountry = currentCountry;
  const nextCountry = getRandomCountry(worldData.countries, prevCountry);

  // Update title with country name
  const titleElement = globeContainer.querySelector(".world-title");
  if (titleElement) {
    titleElement.textContent = nextCountry.properties.name;
    titleElement.classList.add("highlight");

    // Remove highlight class after animation
    setTimeout(() => {
      titleElement.classList.remove("highlight");
    }, ANIMATION.FLIGHT + ANIMATION.PAUSE);
  }

  // Get start and end coordinates
  const startCoords = prevCountry ? d3.geoCentroid(prevCountry) : [0, 0];
  const endCoords = d3.geoCentroid(nextCountry);

  // Calculate rotation parameters
  const startRotation = projection.rotate();
  const endRotation = [-endCoords[0], tilt - endCoords[1], 0];

  // Create an interpolator for the path
  const pathInterpolator = d3.geoInterpolate(startCoords, endCoords);

  // Create a rotation interpolator
  const rotationInterpolator = Versor.interpolateAngles(startRotation, endRotation);

  // Duration of the flight animation
  const duration = ANIMATION.FLIGHT;
  const startTime = Date.now();

  // Start the animation frame loop
  function animate() {
    if (!isAnimating) return; // Guard when paused
    const elapsed = Date.now() - startTime;
    const t = Math.min(elapsed / duration, 1);

    // Update rotation
    rotationAngles = rotationInterpolator(t);
    projection.rotate(rotationAngles);

    // Update the current path
    const currentCoord = pathInterpolator(t);
    currentPath = {
      type: "LineString",
      coordinates: [startCoords, currentCoord],
    };

    // Set current country
    currentCountry = nextCountry;

    // Redraw the globe
    drawGlobe();

    // Continue animation if not complete
    if (t < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      // Show completed path for a moment
      setTimeout(() => {
        if (isAnimating) {
          // Schedule next country after pause
          animationTimer = setTimeout(goToNextCountry, ANIMATION.PAUSE - 300);
        }
      }, 300);
    }
  }

  // Begin animation
  animate();
}

/**
 * Handle window resize
 */
function handleResize() {
  // Throttle resize work to next animation frame
  if (handleResize._scheduled) return;
  handleResize._scheduled = true;
  requestAnimationFrame(() => {
    // Refresh the colors in case theme has changed
    colors = {
      ocean: getColorValue("--world-ocean-color"),
      graticule: getColorValue("--world-graticule-color"),
      border: getColorValue("--world-border-color"),
      visited: getColorValue("--world-visited-country-color"),
      land: getColorValue("--world-land-color"),
      flight: getColorValue("--world-flight-path-color"),
    };

    // Only update dimensions and projection, then redraw
    updateGlobeDimensionsAndProjection();
    drawGlobe();
    handleResize._scheduled = false;
  });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  setupGlobe();

  // Add resize listener
  window.addEventListener("resize", handleResize);

  // Pause/resume animation based on visibility
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      pauseAnimation();
    } else {
      resumeAnimation();
    }
  });

  // Observe viewport intersection to pause when offscreen
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      isInViewport = entry.isIntersecting;
      if (!isInViewport) {
        pauseAnimation();
      } else {
        resumeAnimation();
      }
    },
    { root: null, threshold: 0.2 }
  );

  const container = document.querySelector(".world-tour-container");
  if (container) observer.observe(container);
});
