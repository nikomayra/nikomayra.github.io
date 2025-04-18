import * as d3 from "d3";
import { hexToHSL, HSLToHex } from "../colorConverter.js";

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
  const levels = {
    introduced: 1,
    novice: 2,
    intermediate: 3,
    advanced: 4,
    expert: 5,
    master: 6,
  };

  const softwareSkills = [
    // Programming Languages
    {
      name: "JavaScript",
      level: levels.intermediate,
      category: "Languages",
      url: "https://www.javascript.com/",
    },
    {
      name: "TypeScript",
      level: levels.advanced,
      category: "Languages",
      url: "https://www.typescriptlang.org/",
    },
    {
      name: "Python",
      level: levels.advanced,
      category: "Languages",
      url: "https://www.python.org/",
    },
    {
      name: "VBA",
      level: levels.intermediate,
      category: "Languages",
      url: "https://learn.microsoft.com/en-us/office/vba/api/overview/",
    },
    {
      name: "C#",
      level: levels.novice,
      category: "Languages",
      url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    },
    {
      name: "HTML",
      level: levels.intermediate,
      category: "Languages",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      name: "CSS",
      level: levels.intermediate,
      category: "Languages",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      name: "Go Lang",
      level: levels.advanced,
      category: "Languages",
      url: "https://go.dev/",
    },
    {
      name: "SQL",
      level: levels.intermediate,
      category: "Languages",
      url: "https://www.sql.com/",
    },

    // Post/Pre Processing CSS
    {
      name: "SASS",
      level: levels.intermediate,
      category: "Tools",
      url: "https://sass-lang.com/",
    },
    {
      name: "Tailwind",
      level: levels.intermediate,
      category: "Tools",
      url: "https://tailwindcss.com/",
    },

    // Frameworks & Runtime
    {
      name: "React",
      level: levels.advanced,
      category: "Tools",
      url: "https://react.dev/",
    },
    {
      name: "Vite",
      level: levels.intermediate,
      category: "Tools",
      url: "https://vitejs.dev/",
    },
    {
      name: "Docker",
      level: levels.intermediate,
      category: "Tools",
      url: "https://www.docker.com/",
    },
    {
      name: "Node",
      level: levels.intermediate,
      category: "Tools",
      url: "https://nodejs.org/docs/latest/api/",
    },
    {
      name: "Express",
      level: levels.intermediate,
      category: "Tools",
      url: "https://expressjs.com/",
    },
    {
      name: "Flask",
      level: levels.intermediate,
      category: "Tools",
      url: "https://flask.palletsprojects.com/",
    },
    {
      name: "Azure Functions",
      level: levels.novice,
      category: "Tools",
      url: "https://learn.microsoft.com/en-us/azure/azure-functions/",
    },

    // Data Storage
    {
      name: "MongoDB",
      level: levels.intermediate,
      category: "Tools",
      url: "https://www.mongodb.com/docs/",
    },
    {
      name: "Postgres",
      level: levels.intermediate,
      category: "Tools",
      url: "https://www.postgresql.org/docs/",
    },
    {
      name: "Azure Blob",
      level: levels.introduced,
      category: "Tools",
      url: "https://learn.microsoft.com/en-us/azure/storage/blobs/",
    },
    {
      name: "S3",
      level: levels.introduced,
      category: "Tools",
      url: "https://aws.amazon.com/s3/",
    },
    {
      name: "DynamoDB",
      level: levels.introduced,
      category: "Tools",
      url: "https://aws.amazon.com/dynamodb/",
    },
  ];

  const mechanicalSkills = [
    {
      name: "SAP",
      level: levels.intermediate,
      category: null,
      url: "https://help.sap.com/",
    },
    // CAD & Design
    {
      name: "Creo",
      level: levels.master,
      category: null,
      url: "https://www.ptc.com/en/products/creo",
    },
    {
      name: "CATIA",
      level: levels.master,
      category: null,
      url: "https://www.3ds.com/products-services/catia/",
    },
    {
      name: "Solidworks",
      level: levels.advanced,
      category: null,
      url: "https://www.solidworks.com/",
    },
    {
      name: "Unity3D",
      level: levels.intermediate,
      category: null,
      url: "https://docs.unity3d.com/",
    },
    // PLM Systems
    {
      name: "Windchill",
      level: levels.expert,
      category: null,
      url: "https://www.ptc.com/en/products/windchill",
    },
    {
      name: "Enovia",
      level: levels.advanced,
      category: null,
      url: "https://www.3ds.com/products-services/enovia/",
    },
    {
      name: "SmarTeam",
      level: levels.intermediate,
      category: null,
      url: "https://www.3ds.com/products-services/smarteam/",
    },
    // Project Management
    {
      name: "Jira",
      level: levels.expert,
      category: null,
      url: "https://www.atlassian.com/software/jira",
    },
    {
      name: "Confluence",
      level: levels.expert,
      category: null,
      url: "https://www.atlassian.com/software/confluence",
    },
  ];

  function createSkillsChart() {
    // For mechanical skills, use the standard approach
    createSkillsSection(".skills-container.mechanical", mechanicalSkills);

    // For software skills, handle the categories separately
    createSoftwareSkillsSections();
  }

  function createSoftwareSkillsSections() {
    const container = document.querySelector(".skills-container.software");
    if (!container) return;

    // Clear container
    container.innerHTML = "";

    // Group skills by category
    const languageSkills = softwareSkills.filter((skill) => skill.category === "Languages");
    const toolSkills = softwareSkills.filter((skill) => skill.category === "Tools");

    // Create the Tools section
    const toolsSection = document.createElement("div");
    toolsSection.className = "skills-subcategory tools";

    const toolsTitle = document.createElement("h4");
    toolsTitle.className = "skills-subcategory-title";
    toolsTitle.textContent = "Tools";
    toolsSection.appendChild(toolsTitle);

    const toolsGrid = document.createElement("div");
    toolsGrid.className = "skills-grid";
    toolsSection.appendChild(toolsGrid);

    // Create the Languages section
    const languagesSection = document.createElement("div");
    languagesSection.className = "skills-subcategory languages";

    const languagesTitle = document.createElement("h4");
    languagesTitle.className = "skills-subcategory-title";
    languagesTitle.textContent = "Languages";
    languagesSection.appendChild(languagesTitle);

    const languagesGrid = document.createElement("div");
    languagesGrid.className = "skills-grid";
    languagesSection.appendChild(languagesGrid);

    // Add both sections to the container
    container.appendChild(toolsSection);
    container.appendChild(languagesSection);

    // Populate the sections with skills
    populateSkillsGrid(toolsGrid, toolSkills);
    populateSkillsGrid(languagesGrid, languageSkills);

    // Add intersection observers for the animation
    addIntersectionObservers();
  }

  function populateSkillsGrid(grid, skills) {
    // Sort skills by level (highest first)
    const sortedSkills = [...skills].sort((a, b) => b.level - a.level);

    // Find the highest level within this category of skills
    const maxLevelInCategory = Math.max(...skills.map((skill) => skill.level));

    // Create and add skill tags
    sortedSkills.forEach((skillData) => {
      const skill = document.createElement("div");
      skill.className = "skill";

      const link = document.createElement("a");
      link.href = skillData.url;
      link.target = "_blank";

      // Create progress bar background
      const progress = document.createElement("div");
      progress.className = "skill-progress";
      progress.style.width = `${(skillData.level / Object.keys(levels).length) * 100}%`;

      // Add text
      const text = document.createElement("span");
      text.className = "skill-text";
      text.textContent = skillData.name;

      link.style.setProperty("--skill-level", `${(skillData.level / Object.keys(levels).length) * 100}%`);

      const baseOpacity = 1;
      const minOpacity = 0.4;
      const opacityExponent = 1.3;

      // Calculate opacity relative to the highest level in this category
      const normalizedLevel = skillData.level / maxLevelInCategory;
      const opacity = minOpacity + (baseOpacity - minOpacity) * Math.pow(normalizedLevel, opacityExponent);

      // Set opacity on the link element
      link.style.opacity = opacity;

      link.appendChild(progress);
      link.appendChild(text);
      skill.appendChild(link);
      grid.appendChild(skill);
    });
  }

  function createSkillsSection(containerSelector, skills) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Clear container
    container.innerHTML = "";

    // Create grid
    const grid = document.createElement("div");
    grid.className = "skills-grid";
    container.appendChild(grid);

    // Sort skills by level (highest first)
    const sortedSkills = [...skills].sort((a, b) => b.level - a.level);

    // Find the highest level within this category of skills
    const maxLevelInCategory = Math.max(...skills.map((skill) => skill.level));

    // Create and add skill tags
    sortedSkills.forEach((skillData) => {
      const skill = document.createElement("div");
      skill.className = "skill";

      const link = document.createElement("a");
      link.href = skillData.url;
      link.target = "_blank";

      // Create progress bar background
      const progress = document.createElement("div");
      progress.className = "skill-progress";
      progress.style.width = `${(skillData.level / Object.keys(levels).length) * 100}%`;

      // Add text
      const text = document.createElement("span");
      text.className = "skill-text";
      text.textContent = skillData.name;

      link.style.setProperty("--skill-level", `${(skillData.level / Object.keys(levels).length) * 100}%`);

      const baseOpacity = 1;
      const minOpacity = 0.4;
      const opacityExponent = 1.3;

      // Calculate opacity relative to the highest level in this category
      const normalizedLevel = skillData.level / maxLevelInCategory;
      const opacity = minOpacity + (baseOpacity - minOpacity) * Math.pow(normalizedLevel, opacityExponent);

      // Set opacity on the link element
      link.style.opacity = opacity;

      link.appendChild(progress);
      link.appendChild(text);
      skill.appendChild(link);
      grid.appendChild(skill);
    });

    addIntersectionObservers();
  }

  function addIntersectionObservers() {
    // Add intersection observer for fade-in effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".skill").forEach((skill, index) => {
      skill.style.transitionDelay = `${index * 50}ms`;
      observer.observe(skill);
    });
  }

  // Initial creation
  createSkillsChart();

  // Update window resize handler to also adjust heights
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      createSkillsChart();
    }, 250);
  });
});
