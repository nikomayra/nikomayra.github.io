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

// State name mapping (TopoJSON uses full names)
const stateAbbreviations = {
  California: "CA",
  Georgia: "GA",
  Florida: "FL",
  "New York": "NY",
  Texas: "TX",
  Washington: "WA",
  Arizona: "AZ",
  Hawaii: "HI",
  Illinois: "IL",
  Missouri: "MO",
  Nebraska: "NE",
  Pennsylvania: "PA",
  "South Carolina": "SC",
  Tennessee: "TN",
  Alabama: "AL",
  Colorado: "CO",
  Kentucky: "KY",
  "North Carolina": "NC",
  "South Dakota": "SD",
  Utah: "UT",
  Wisconsin: "WI",
  Idaho: "ID",
  Montana: "MT",
  "New Mexico": "NM",
  Oregon: "OR",
  Nevada: "NV",
  Wyoming: "WY",
  Kansas: "KS",
  Connecticut: "CT",
  Iowa: "IA",
};

const visitedStates = {
  visitedStates: Object.keys(stateAbbreviations),
};

// Cache for color values.
let colors = {
    border: getColorValue("--us-tour-state-border-color"),
    unvisited: getColorValue("--us-tour-state-unvisited-color"),
    visited: getColorValue("--us-tour-state-visited-color"),
    hover: getColorValue("--us-tour-state-hover-color"),
  };

/**
 * Retrieves the value of a CSS variable.
 * @param {string} cssVar - The name of the CSS variable.
 * @returns {string} The value of the CSS variable.
 */
function getColorValue(cssVar) {
  return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
}

document.addEventListener("DOMContentLoaded", async function () {
  // Constants for the visualization
  const width = 975;
  const height = 610;

  // Create tooltip
  const tooltip = d3.select("#us-tour").append("div").attr("class", "tooltip");

  // Create SVG container
  const svg = d3
    .select("#us-tour")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Load US topology data
  const us = await d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json");
  const path = d3.geoPath();

  // Draw states
  svg
    .append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
    .attr("d", path)
    .attr("class", "state")
    .attr("fill", (d) => (visitedStates.visitedStates.includes(d.properties.name) ? colors.visited : colors.unvisited))
    .on("mouseover", function (event, d) {
      if (!visitedStates.visitedStates.includes(d.properties.name)) return;

      d3.select(this).attr("fill", colors.hover);

      const stateAbbr = stateAbbreviations[d.properties.name];
      tooltip
        .html(`${stateAbbr}`)
        .classed("visible", true)
        .style("left", `${event.clientX}px`)
        .style("top", `${event.clientY - 10}px`);
    })
    .on("mousemove", function (event) {
      tooltip.style("left", `${event.clientX}px`).style("top", `${event.clientY - 10}px`);
    })
    .on("mouseout", function (event, d) {
      if (!visitedStates.visitedStates.includes(d.properties.name)) return;
      d3.select(this).attr("fill", colors.visited);
      tooltip.classed("visible", false);
    });

  // Add state borders
  svg
    .append("path")
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", colors.border)
    .attr("stroke-linejoin", "round")
    .attr("d", path);

  // Hide tooltip on scroll or mouse movement
  document.addEventListener("scroll", () => {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) tooltip.classList.remove("visible");
  });
});
