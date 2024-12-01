import * as d3 from "https://cdn.skypack.dev/d3@7";
import * as topojson from "https://cdn.skypack.dev/topojson-client@3";

// Modified version of https://observablehq.com/@d3/world-tour
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
  // const width = 960;
  // const height = 500;
  const container = document.querySelector(".world-tour-container");
  if (!container) return;
  const width = container.clientWidth;
  const height = container.clientHeight;
  const scale = width / 2.5;

  const svg = d3
    .select("#world-tour")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", "100%")
    .attr("height", "100%");

  const projection = d3
    .geoOrthographic()
    .scale(scale)
    .translate([width / 2, height / 2])
    .clipAngle(90);

  const path = d3.geoPath(projection);
  const globe = svg.append("path").attr("class", "globe");

  const graticule = svg
    .append("path")
    .datum(d3.geoGraticule())
    .attr("class", "graticule");

  let v0, r0, q0;
  // let v1, r1, q1;

  // function dragstarted() {
  //   v0 = versor.cartesian(projection.invert(d3.pointer(event, this)));
  //   r0 = projection.rotate();
  //   q0 = versor(r0);
  // }

  // function dragged() {
  //   const v1 = versor.cartesian(
  //     projection.rotate(r0).invert(d3.pointer(event, this))
  //   );
  //   const q1 = versor.multiply(q0, versor.delta(v0, v1));
  //   const r1 = versor.rotation(q1);
  //   projection.rotate(r1);
  // }

  async function render() {
    const world = await d3.json(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    );
    const land = topojson.feature(world, world.objects.land);

    globe.datum(land).attr("d", path);

    graticule.attr("d", path);

    let lastTime = d3.now();
    const rotation = [0, 0];
    const velocity = [0.015, 0];

    d3.timer(function (elapsed) {
      const now = d3.now();
      const delta = now - lastTime;
      lastTime = now;

      rotation[0] += velocity[0] * delta;
      rotation[1] += velocity[1] * delta;

      if (rotation[1] > 45) rotation[1] = 45;
      if (rotation[1] < -45) rotation[1] = -45;

      projection.rotate(rotation);

      globe.attr("d", path);
      graticule.attr("d", path);
    });
  }

  render();
});
