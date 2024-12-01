import * as d3 from "d3";
import { hexToHSL, HSLToHex } from "../js/colorConverter.js";

// Modified version of https://observablehq.com/@d3/bubble-chart/2
// ISC License

// Copyright 2017–2023 Observable, Inc.
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
  const skills = [
    // Programming Languages
    {
      name: "JavaScript",
      level: 4,
      category: "Languages",
      url: "https://www.javascript.com/",
    },
    {
      name: "TypeScript",
      level: 5,
      category: "Languages",
      url: "https://www.typescriptlang.org/",
    },
    {
      name: "Python",
      level: 5,
      category: "Languages",
      url: "https://www.python.org/",
    },
    {
      name: "VBA",
      level: 3,
      category: "Languages",
      url: "https://learn.microsoft.com/en-us/office/vba/api/overview/",
    },
    {
      name: "C#",
      level: 2,
      category: "Languages",
      url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    },
    {
      name: "HTML",
      level: 3,
      category: "Languages",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      name: "CSS",
      level: 2,
      category: "Languages",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      name: "Go Lang",
      level: 6,
      category: "Languages",
      url: "https://go.dev/",
    },

    // Frameworks & Runtime
    {
      name: "React (Vite)",
      level: 6,
      category: "Frameworks",
      url: "https://react.dev/",
    },
    {
      name: "Node.js",
      level: 4,
      category: "Frameworks",
      url: "https://nodejs.org/docs/latest/api/",
    },
    {
      name: "Express",
      level: 3,
      category: "Frameworks",
      url: "https://expressjs.com/",
    },
    {
      name: "Flask",
      level: 3,
      category: "Frameworks",
      url: "https://flask.palletsprojects.com/",
    },
    {
      name: "Azure Functions",
      level: 2,
      category: "Frameworks",
      url: "https://learn.microsoft.com/en-us/azure/azure-functions/",
    },

    // Data Storage
    {
      name: "MongoDB",
      level: 4,
      category: "Storage",
      url: "https://www.mongodb.com/docs/",
    },
    {
      name: "PostgreSQL",
      level: 5,
      category: "Storage",
      url: "https://www.postgresql.org/docs/",
    },
    {
      name: "Azure Blob",
      level: 3,
      category: "Storage",
      url: "https://learn.microsoft.com/en-us/azure/storage/blobs/",
    },
    {
      name: "DynamoDB",
      level: 2,
      category: "Storage",
      url: "https://aws.amazon.com/dynamodb/",
    },

    // Project Management
    {
      name: "Jira",
      level: 6,
      category: "Management",
      url: "https://www.atlassian.com/software/jira",
    },
    {
      name: "Confluence",
      level: 5,
      category: "Management",
      url: "https://www.atlassian.com/software/confluence",
    },
    {
      name: "SAP",
      level: 3,
      category: "Management",
      url: "https://help.sap.com/",
    },

    // CAD & Design
    {
      name: "Creo",
      level: 6,
      category: "Design",
      url: "https://www.ptc.com/en/products/creo",
    },
    {
      name: "CATIA",
      level: 6,
      category: "Design",
      url: "https://www.3ds.com/products-services/catia/",
    },
    {
      name: "Solidworks",
      level: 4,
      category: "Design",
      url: "https://www.solidworks.com/",
    },
    {
      name: "Unity3D",
      level: 3,
      category: "Design",
      url: "https://docs.unity3d.com/",
    },

    // PLM Systems
    {
      name: "Windchill",
      level: 4,
      category: "PLM",
      url: "https://www.ptc.com/en/products/windchill",
    },
    {
      name: "Enovia",
      level: 4,
      category: "PLM",
      url: "https://www.3ds.com/products-services/enovia/",
    },
    {
      name: "SmarTeam",
      level: 3,
      category: "PLM",
      url: "https://www.3ds.com/products-services/smarteam/",
    },
  ];

  function generateCategoryColors() {
    const baseColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--skill-base-color")
      .trim();
    // console.log(baseColor); //GOOD

    // Convert base color to HSL
    const baseColorHex = hexToHSL(baseColor);

    // Parse HSL values
    const [h, s, _] = baseColorHex.match(/\d+/g).map(Number);

    // Get unique categories
    const categories = [...new Set(skills.map((skill) => skill.category))];

    // Generate colors by adjusting lightness only
    const categoryColors = {};
    let lightness = 10;

    categories.forEach((category) => {
      categoryColors[category] = `hsl(${h}, ${s}%, ${lightness}%)`;
      lightness += 10;
    });
    //console.log("categoryColors", categoryColors);
    return categoryColors;
  }

  function createSkillsChart() {
    const container = document.querySelector(".skills-container");
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    // const minDimension = Math.min(width, height);
    const margin = 2;
    // console.log("width", width);
    // console.log("height", height);

    // Clear existing skills
    container.innerHTML = "";

    // Generate colors for categories
    const categoryColors = generateCategoryColors();

    // Create pack layoutb
    const pack = d3
      .pack()
      .size([width - margin * 2, height - margin * 2])
      .padding(5);

    // Create hierarchy with dynamic sizing based on container
    // const root = d3.hierarchy({ children: skills }).sum((d) => {
    //   const baseSizePercent = minDimension * 0.15; // Base size is 15% of container
    //   const sizeMap = {
    //     1: baseSizePercent * 0.7,
    //     2: baseSizePercent * 0.85,
    //     3: baseSizePercent,
    //     4: baseSizePercent * 1.15,
    //   };
    //   return d.level ? sizeMap[d.level] : 0;
    // });

    const root = pack(d3.hierarchy({ children: skills }).sum((d) => d.level));

    // Generate bubble layout data
    const skillData = pack(root).leaves();

    // Create and position skill bubbles
    skillData.forEach((d, i) => {
      const skill = document.createElement("div");
      skill.className = "skill";

      const link = document.createElement("a");
      link.href = d.data.url;
      link.target = "_blank";
      link.className = "skill-name";
      link.textContent = d.data.name;

      // Set CSS variables for dynamic text sizing
      //   skill.style.setProperty("--text-length", d.data.name.length);
      //   skill.style.setProperty("--bubble-size", `${d.r * 2}px`);

      // Apply background color based on category
      skill.style.background = categoryColors[d.data.category];

      // Position and size the bubble
      skill.style.left = `${d.x - d.r}px`;
      skill.style.top = `${d.y - d.r}px`;
      skill.style.width = `${d.r * 2}px`;
      skill.style.height = `${d.r * 2}px`;

      // Add random animation delay for floating and ensure wiggle works
      skill.style.animationDelay = `${Math.random() * -8}s`;
      skill.style.animationPlayState = "running";

      skill.appendChild(link);
      container.appendChild(skill);
    });
  }

  // Initial creation
  createSkillsChart();

  // Handle window resizing
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createSkillsChart, 250);
  });
});
