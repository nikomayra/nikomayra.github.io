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
];

// Country arcs to exclude: [country name, array indices to exclude]
const arcExclusions = {
  France: [0, 2], // Exclude French territories - first is French Guiana, third is likely islands
  Netherlands: [1, 2], // Exclude Dutch Caribbean territories
  "United States of America": [1, 2, 3, 4, 5, 6, 7, 8, 9], // Exclude all but 50 states
};

// Cache color values
const colors = {
  ocean: getColorValue("--world-ocean-color"),
  graticule: getColorValue("--world-graticule-color"),
  border: getColorValue("--world-border-color"),
  visited: getColorValue("--world-visited-country-color"),
  land: getColorValue("--world-land-color"),
  flight: getColorValue("--world-flight-path-color"),
};

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

document.addEventListener("DOMContentLoaded", async function () {
  const container = document.querySelector(".world-tour-container");
  const width = container.clientWidth;
  const height = container.clientHeight;
  const tilt = 20;

  // Create title element
  const title = d3.select(".world-tour-container").append("div").attr("class", "world-title");

  // Prepare canvas with device pixel ratio support
  const dpr = window.devicePixelRatio ?? 1;
  const canvas = d3
    .select(".world-tour-container")
    .append("canvas")
    .attr("width", dpr * width)
    .attr("height", dpr * height)
    .style("width", `${width}px`)
    .style("height", `${height}px`);

  const context = canvas.node().getContext("2d");
  context.scale(dpr, dpr);

  const projection = d3.geoOrthographic().fitExtent(
    [
      [10, 10],
      [width - 10, height - 10],
    ],
    { type: "Sphere" }
  );

  const path = d3.geoPath(projection, context);

  async function render() {
    const world = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");

    // Apply arc exclusions
    if (world && world.objects && world.objects.countries && world.objects.countries.geometries) {
      // Loop through country geometries
      world.objects.countries.geometries.forEach((geometry) => {
        const countryName = geometry.properties.name;

        // Check if this country has arc exclusions
        if (arcExclusions[countryName] && geometry.type === "MultiPolygon") {
          // Filter out the specified arc arrays
          geometry.arcs = geometry.arcs.filter((_, index) => !arcExclusions[countryName].includes(index));
        }
      });
    }

    const countries = topojson.feature(world, world.objects.countries);
    const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
    const graticule = d3.geoGraticule();

    // Render function for drawing the globe
    function renderGlobe(country, arc) {
      // Clear the canvas
      context.clearRect(0, 0, width, height);

      // Draw ocean (sphere)
      context.beginPath();
      path({ type: "Sphere" });
      context.fillStyle = colors.ocean;
      context.fill();

      // Draw graticule
      context.beginPath();
      path(graticule());
      context.strokeStyle = colors.graticule;
      context.lineWidth = 0.5;
      context.stroke();

      // Draw all countries
      context.beginPath();
      path(countries);
      context.fillStyle = colors.land;
      context.fill();

      // Draw visited countries
      countries.features
        .filter((d) => visitedCountries.includes(d.properties.name))
        .forEach((d) => {
          context.beginPath();
          path(d);
          context.fillStyle = colors.visited;
          context.fill();
        });

      // Highlight current country if provided
      if (country) {
        context.beginPath();
        path(country);
        context.fillStyle = colors.visited;
        context.fill();
      }

      // Draw borders
      context.beginPath();
      path(borders);
      context.strokeStyle = colors.border;
      context.lineWidth = 0.5;
      context.stroke();

      // Draw flight path if provided
      if (arc) {
        context.beginPath();
        path(arc);
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

    let p1,
      p2 = [0, 0],
      r1,
      r2 = [0, 0, 0];
    let prevCountry = null;

    async function animateToCountry() {
      const country = getRandomCountry(countries, prevCountry);

      // Update title with country name
      title.text(country.properties.name).classed("highlight", true);

      // Remove highlight class after animation
      setTimeout(() => title.classed("highlight", false), ANIMATION.FLIGHT + ANIMATION.PAUSE);

      // Render current state before animation
      renderGlobe(country);

      // Calculate rotation parameters
      p1 = p2;
      p2 = d3.geoCentroid(country);
      r1 = r2;
      r2 = [-p2[0], tilt - p2[1], 0];

      // Create an arc for the flight path
      const interpolator = d3.geoInterpolate(p1, p2);

      // First transition: rotate to country while drawing path
      await d3
        .transition()
        .duration(ANIMATION.FLIGHT)
        .tween("render", () => (t) => {
          projection.rotate(Versor.interpolateAngles(r1, r2)(t));
          const currentPoint = interpolator(t);
          renderGlobe(country, {
            type: "LineString",
            coordinates: [p1, currentPoint],
          });
        })
        .end();

      // Short pause with completed flight path
      await d3
        .transition()
        .duration(300)
        .tween("render", () => (t) => {
          renderGlobe(country, {
            type: "LineString",
            coordinates: [p1, p2],
          });
        })
        .end();

      prevCountry = country;

      // Schedule next country
      setTimeout(animateToCountry, ANIMATION.PAUSE - 300);
    }

    // Start with initial render
    renderGlobe();

    // Start the animation
    setTimeout(animateToCountry, 500);
  }

  render();
});
