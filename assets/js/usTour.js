import * as d3 from "https://cdn.skypack.dev/d3@7";
import * as topojson from "https://cdn.skypack.dev/topojson-client@3";

// Modified version of https://observablehq.com/@d3/us-state-choropleth/2
// ISC License

// Copyright 2019–2023 Observable, Inc.
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

function getColorValue(cssVar) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(cssVar)
    .trim();
}

document.addEventListener("DOMContentLoaded", async function () {
  const tooltip = d3.select("#us-tour").append("div").attr("class", "tooltip");

  // Constants for the visualization
  const width = 975;
  const height = 610;
  const transition_duration = 750;

  // Create SVG container
  const svg = d3
    .select("#us-tour")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Load US topology and visited states data
  const us = await d3.json(
    "https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json"
  );

  // Create path generator
  const path = d3.geoPath();

  // Draw states
  const states = svg
    .append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
    .attr("fill", (d) => {
      const stateName = d.properties.name;
      return visitedStates.visitedStates.includes(stateName)
        ? getColorValue("--visited-state-color")
        : getColorValue("--unvisited-state-color");
    })
    .attr("d", path)
    .attr("class", "state")
    .on("mouseover", function (event, d) {
      const stateName = d.properties.name;
      if (!visitedStates.visitedStates.includes(stateName)) return;

      const stateAbbr = stateAbbreviations[stateName];
      const [x, y] = d3.pointer(event); // Get mouse position relative to SVG

      tooltip
        .html(`${stateAbbr}`)
        .classed("visible", true)
        .style("left", `${event.clientX}px`)
        .style("top", `${event.clientY - 10}px`); // Offset slightly above cursor

      d3.select(this)
        .transition()
        .duration(transition_duration)
        .attr("fill", getColorValue("--hover-state-color"));
    })
    .on("mousemove", function (event) {
      tooltip
        .style("left", `${event.clientX}px`)
        .style("top", `${event.clientY - 10}px`);
    })
    .on("mouseout", function (event, d) {
      tooltip.classed("visible", false);

      d3.select(this)
        .transition()
        .duration(transition_duration)
        .attr(
          "fill",
          visitedStates.visitedStates.includes(d.properties.name)
            ? getColorValue("--visited-state-color")
            : getColorValue("--unvisited-state-color")
        );
    });

  // Add state borders
  svg
    .append("path")
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", getColorValue("--state-border-color"))
    .attr("stroke-linejoin", "round")
    .attr("d", path);
});
