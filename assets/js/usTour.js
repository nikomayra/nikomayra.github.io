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

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".us-tour-container");
  if (!container) return;
  const width = container.clientWidth;
  const height = container.clientHeight;
  const path = d3.geoPath();
  //   const usData = JSON.parse("../data/states-10m.json");
  const us = statesData;
  console.log("us", us);
  // The counties feature collection is all U.S. counties, each with a
  // five-digit FIPS identifier. The statemap lets us lookup the name of
  // the state that contains a given county; a state’s two-digit identifier
  // corresponds to the first two digits of its counties’ identifiers.
  const counties = topojson.feature(us, us.objects.counties);
  const states = topojson.feature(us, us.objects.states);
  const statemap = new Map(states.features.map((d) => [d.id, d]));
  console.log("statemap", statemap);
  // The statemesh is just the internal borders between states, i.e.,
  // everything but the coastlines and country borders. This avoids an
  // additional stroke on the perimeter of the map, which would otherwise
  // mask intricate features such as islands and inlets. (Try removing
  // the last argument to topojson.mesh below to see the effect.)
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  console.log("statemesh", statemesh);

  const svg = d3
    .create("svg")
    .attr("width", 975)
    .attr("height", 610)
    .attr("viewBox", [0, 0, width, height])
    .attr("width", "100%")
    .attr("height", "100%");

  svg
    .append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
    .attr("fill", (d) => color(valuemap.get(d.id)))
    .attr("d", path);

  svg
    .append("path")
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);
});
