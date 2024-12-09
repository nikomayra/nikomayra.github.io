import * as d3 from 'd3';
import { hexToHSL, HSLToHex } from '../js/colorConverter.js';

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

document.addEventListener('DOMContentLoaded', function () {
  const levels = {
    novice: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
    master: 5,
  };

  const softwareSkills = [
    // Programming Languages
    {
      name: 'JavaScript',
      level: levels.advanced,
      category: 'Languages',
      url: 'https://www.javascript.com/',
    },
    {
      name: 'TypeScript',
      level: levels.advanced,
      category: 'Languages',
      url: 'https://www.typescriptlang.org/',
    },
    {
      name: 'Python',
      level: levels.advanced,
      category: 'Languages',
      url: 'https://www.python.org/',
    },
    {
      name: 'VBA',
      level: levels.intermediate,
      category: 'Languages',
      url: 'https://learn.microsoft.com/en-us/office/vba/api/overview/',
    },
    {
      name: 'C#',
      level: levels.novice,
      category: 'Languages',
      url: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
    },
    {
      name: 'HTML',
      level: levels.intermediate,
      category: 'Languages',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
      name: 'CSS',
      level: levels.intermediate,
      category: 'Languages',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
      name: 'Go Lang',
      level: levels.advanced,
      category: 'Languages',
      url: 'https://go.dev/',
    },

    // Frameworks & Runtime
    {
      name: 'React',
      level: levels.advanced,
      category: 'Frameworks',
      url: 'https://react.dev/',
    },
    {
      name: 'Vite',
      level: levels.intermediate,
      category: 'Frameworks',
      url: 'https://vitejs.dev/',
    },
    {
      name: 'Node',
      level: levels.advanced,
      category: 'Frameworks',
      url: 'https://nodejs.org/docs/latest/api/',
    },
    {
      name: 'Express',
      level: levels.intermediate,
      category: 'Frameworks',
      url: 'https://expressjs.com/',
    },
    {
      name: 'Flask',
      level: levels.intermediate,
      category: 'Frameworks',
      url: 'https://flask.palletsprojects.com/',
    },
    {
      name: 'Azure Functions',
      level: levels.novice,
      category: 'Frameworks',
      url: 'https://learn.microsoft.com/en-us/azure/azure-functions/',
    },

    // Data Storage
    {
      name: 'MongoDB',
      level: levels.intermediate,
      category: 'Storage',
      url: 'https://www.mongodb.com/docs/',
    },
    {
      name: 'Postgres',
      level: levels.intermediate,
      category: 'Storage',
      url: 'https://www.postgresql.org/docs/',
    },
    {
      name: 'Azure Blob',
      level: levels.novice,
      category: 'Storage',
      url: 'https://learn.microsoft.com/en-us/azure/storage/blobs/',
    },
    {
      name: 'DynamoDB',
      level: levels.novice,
      category: 'Storage',
      url: 'https://aws.amazon.com/dynamodb/',
    },
  ];

  const mechanicalSkills = [
    {
      name: 'SAP',
      level: levels.intermediate,
      category: 'Management',
      url: 'https://help.sap.com/',
    },
    // CAD & Design
    {
      name: 'Creo',
      level: levels.master,
      category: 'Design',
      url: 'https://www.ptc.com/en/products/creo',
    },
    {
      name: 'CATIA',
      level: levels.master,
      category: 'Design',
      url: 'https://www.3ds.com/products-services/catia/',
    },
    {
      name: 'Solidworks',
      level: levels.advanced,
      category: 'Design',
      url: 'https://www.solidworks.com/',
    },
    {
      name: 'Unity3D',
      level: levels.intermediate,
      category: 'Design',
      url: 'https://docs.unity3d.com/',
    },
    // PLM Systems
    {
      name: 'Windchill',
      level: levels.advanced,
      category: 'PLM',
      url: 'https://www.ptc.com/en/products/windchill',
    },
    {
      name: 'Enovia',
      level: levels.advanced,
      category: 'PLM',
      url: 'https://www.3ds.com/products-services/enovia/',
    },
    {
      name: 'SmarTeam',
      level: levels.intermediate,
      category: 'PLM',
      url: 'https://www.3ds.com/products-services/smarteam/',
    },
    // Project Management
    {
      name: 'Jira',
      level: levels.expert,
      category: 'Management',
      url: 'https://www.atlassian.com/software/jira',
    },
    {
      name: 'Confluence',
      level: levels.expert,
      category: 'Management',
      url: 'https://www.atlassian.com/software/confluence',
    },
  ];

  function createSkillsChart() {
    createSkillsSection('.skills-container.software', softwareSkills);
    createSkillsSection('.skills-container.mechanical', mechanicalSkills);
  }

  function createSkillsSection(containerSelector, skills) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Clear container
    container.innerHTML = '';

    // Create grid
    const grid = document.createElement('div');
    grid.className = 'skills-grid';
    container.appendChild(grid);

    // Sort skills by level (highest first)
    const sortedSkills = [...skills].sort((a, b) => b.level - a.level);

    // Find the highest level within this category of skills
    const maxLevelInCategory = Math.max(...skills.map((skill) => skill.level));

    // Create and add skill tags
    sortedSkills.forEach((skillData) => {
      const skill = document.createElement('div');
      skill.className = 'skill';

      const link = document.createElement('a');
      link.href = skillData.url;
      link.target = '_blank';

      // Create progress bar background
      const progress = document.createElement('div');
      progress.className = 'skill-progress';
      progress.style.width = `${(skillData.level / Object.keys(levels).length) * 100}%`;

      // Add text
      const text = document.createElement('span');
      text.className = 'skill-text';
      text.textContent = skillData.name;

      link.style.setProperty(
        '--skill-level',
        `${(skillData.level / Object.keys(levels).length) * 100}%`
      );

      const baseOpacity = 1;
      const minOpacity = 0.4;
      const opacityExponent = 1.3;

      // Calculate opacity relative to the highest level in this category
      const normalizedLevel = skillData.level / maxLevelInCategory;
      const opacity =
        minOpacity + (baseOpacity - minOpacity) * Math.pow(normalizedLevel, opacityExponent);

      // Set opacity on the link element
      link.style.opacity = opacity;

      link.appendChild(progress);
      link.appendChild(text);
      skill.appendChild(link);
      grid.appendChild(skill);
    });

    // Add intersection observer for fade-in effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.skill').forEach((skill, index) => {
      skill.style.transitionDelay = `${index * 50}ms`;
      observer.observe(skill);
    });
  }

  // Initial creation
  createSkillsChart();

  // Handle window resizing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createSkillsChart, 250);
  });
});
