import * as d3 from "d3";
import * as topojson from "topojson-client";

// Animation durations
const ANIMATION = Object.freeze({
  FLIGHT: 1250,
  PAUSE: 1000,
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
  "Czech Republic",
  "Japan",
  "South Korea",
  "Mexico",
  "Chile",
  "Uruguay",
  "Puerto Rico",
  "Vietnam",
  "Morocco",
];

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
      (Math.atan2(2 * (a * b + c * d), 1 - 2 * (b * b + c * c)) * 180) /
        Math.PI,
      (Math.asin(Math.max(-1, Math.min(1, 2 * (a * c - d * b)))) * 180) /
        Math.PI,
      (Math.atan2(2 * (a * d + b * c), 1 - 2 * (c * c + d * d)) * 180) /
        Math.PI,
    ];
  }

  static interpolateAngles(a, b) {
    const i = Versor.interpolate(Versor.fromAngles(a), Versor.fromAngles(b));
    return (t) => Versor.toAngles(i(t));
  }

  static interpolate([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    let dot = a1 * a2 + b1 * b2 + c1 * c2 + d1 * d2;
    if (dot < 0) (a2 = -a2), (b2 = -b2), (c2 = -c2), (d2 = -d2), (dot = -dot);
    if (dot > 0.9995)
      return Versor.#interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]);
    const theta0 = Math.acos(Math.max(-1, Math.min(1, dot)));
    const x = new Array(4);
    const l = Math.hypot(
      (a2 -= a1 * dot),
      (b2 -= b1 * dot),
      (c2 -= c1 * dot),
      (d2 -= d1 * dot)
    );
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
      const l = Math.hypot(
        (x[0] = a1 + a2 * t),
        (x[1] = b1 + b2 * t),
        (x[2] = c1 + c2 * t),
        (x[3] = d1 + d2 * t)
      );
      (x[0] /= l), (x[1] /= l), (x[2] /= l), (x[3] /= l);
      return x;
    };
  }
}

function getColorValue(cssVar) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(cssVar)
    .trim();
}

function getRandomCountry(countries, prevCountry) {
  const availableCountries = countries.features.filter(
    (c) =>
      visitedCountries.includes(c.properties.name) &&
      (!prevCountry || c.properties.name !== prevCountry.properties.name)
  );
  return availableCountries[
    Math.floor(Math.random() * availableCountries.length)
  ];
}

document.addEventListener("DOMContentLoaded", async function () {
  const container = document.querySelector(".world-tour-container");
  const width = container.clientWidth;
  const height = container.clientHeight;
  const tilt = 20;

  // Create title element
  const title = d3
    .select(".world-tour-container")
    .append("div")
    .attr("class", "world-title");

  const svg = d3
    .select(".world-tour-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  const projection = d3.geoOrthographic().fitExtent(
    [
      [10, 10],
      [width - 10, height - 10],
    ],
    { type: "Sphere" }
  );

  const path = d3.geoPath(projection);

  const globe = svg
    .append("path")
    .attr("class", "sphere")
    .attr("fill", colors.ocean);

  const graticule = svg
    .append("path")
    .datum(d3.geoGraticule())
    .attr("class", "graticule")
    .attr("fill", "none")
    .attr("stroke", colors.graticule)
    .attr("stroke-width", "0.5px");

  async function render() {
    const world = await d3.json(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    );

    const countries = topojson.feature(world, world.objects.countries);
    const borders = topojson.mesh(
      world,
      world.objects.countries,
      (a, b) => a !== b
    );

    svg
      .selectAll(".country")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("fill", (d) =>
        visitedCountries.includes(d.properties.name)
          ? colors.visited
          : colors.land
      )
      .attr("d", path);

    svg
      .append("path")
      .datum(borders)
      .attr("class", "borders")
      .attr("fill", "none")
      .attr("stroke", colors.border)
      .attr("d", path);

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
      setTimeout(() => title.classed("highlight", false), ANIMATION.FLIGHT);

      // Calculate rotation parameters
      p1 = p2;
      p2 = d3.geoCentroid(country);
      r1 = r2;
      r2 = [-p2[0], tilt - p2[1], 0];

      // Create an arc generator for the flight path
      const interpolator = d3.geoInterpolate(p1, p2);
      const numPoints = 100;
      const arcPoints = Array.from({ length: numPoints }, (_, i) => {
        const t = i / (numPoints - 1);
        return interpolator(t);
      });

      // First transition: rotate to country while drawing path
      await d3
        .transition()
        .duration(ANIMATION.FLIGHT)
        .tween("render", () => (t) => {
          projection.rotate(Versor.interpolateAngles(r1, r2)(t));

          // Update all paths
          svg.selectAll("path").attr("d", path);

          // Draw flight path
          svg.select(".flight-path").remove();
          svg
            .append("path")
            .attr("class", "flight-path")
            .datum({
              type: "LineString",
              coordinates: arcPoints.slice(0, Math.ceil(t * numPoints)),
            })
            .attr("d", path)
            .attr("fill", "none")
            .attr("stroke", colors.flight)
            .attr("stroke-width", 2);
        })
        .end();

      prevCountry = country;

      // Schedule next country
      setTimeout(animateToCountry, ANIMATION.FLIGHT + ANIMATION.PAUSE);
    }

    // Start the animation
    animateToCountry();
  }

  render();
});
