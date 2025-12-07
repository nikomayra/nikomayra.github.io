import { hexToHSL, HSLToHex } from "../colorConverter.js";

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
      level: levels.novice,
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
      name: "Django",
      level: levels.intermediate,
      category: "Tools",
      url: "https://www.djangoproject.com/",
    },
    {
      name: "Flask",
      level: levels.intermediate,
      category: "Tools",
      url: "https://flask.palletsprojects.com/",
    },
    {
      name: "Celery",
      level: levels.intermediate,
      category: "Tools",
      url: "https://docs.celeryq.dev/en/main/getting-started/introduction.html",
    },
    {
      name: "Redis",
      level: levels.intermediate,
      category: "Tools",
      url: "https://redis.io/",
    },
    {
      name: "Redux",
      level: levels.intermediate,
      category: "Tools",
      url: "https://redux.js.org/",
    },
    {
      name: "SWR",
      level: levels.intermediate,
      category: "Tools",
      url: "https://swr.vercel.app/",
    },
    {
      name: "React Query",
      level: levels.novice,
      category: "Tools",
      url: "https://tanstack.com/query",
    },
    {
      name: "Vitest",
      level: levels.novice,
      category: "Tools",
      url: "https://vitest.dev/",
    },
    {
      name: "Playwright",
      level: levels.novice,
      category: "Tools",
      url: "https://tanstack.com/query",
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
      name: "Azure",
      level: levels.novice,
      category: "Tools",
      url: "https://learn.microsoft.com/en-us/azure",
    },
    {
      name: "S3",
      level: levels.novice,
      category: "Tools",
      url: "https://aws.amazon.com/s3/",
    },
    {
      name: "DynamoDB",
      level: levels.introduced,
      category: "Tools",
      url: "https://aws.amazon.com/dynamodb/",
    },
    // Other misc
    {
      name: "Label Studio SDK",
      level: levels.novice,
      category: "Tools",
      url: "https://labelstud.io/guide/",
    },
    {
      name: "Adobe Acrobat SDK",
      level: levels.introduced,
      category: "Tools",
      url: "https://opensource.adobe.com/dc-acrobat-sdk-docs/acrobatsdk/index.html",
    },
  ];

  const mechanicalSkills = [
    {
      name: "SAP",
      level: levels.intermediate,
      category: null,
      url: "https://help.sap.com/",
    },
    {
      name: "MATLAB",
      level: levels.novice,
      category: null,
      url: "https://www.mathworks.com/products/matlab.html",
    },
    // CAD & Design
    {
      name: "Creo",
      level: levels.expert,
      category: null,
      url: "https://www.ptc.com/en/products/creo",
    },
    {
      name: "CATIA",
      level: levels.expert,
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
      level: levels.novice,
      category: null,
      url: "https://docs.unity3d.com/",
    },
    {
      name: "Anark Workstation",
      level: levels.intermediate,
      category: null,
      url: "https://www.anark.com/products/anark-workstation",
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
      level: levels.advanced,
      category: null,
      url: "https://www.atlassian.com/software/jira",
    },
    {
      name: "Confluence",
      level: levels.advanced,
      category: null,
      url: "https://www.atlassian.com/software/confluence",
    },
  ];

  // --- Refactored Helper Function ---
  function createSkillElement(skillData, maxLevelInCategory) {
    const skill = document.createElement("div");
    skill.className = "skill";

    const link = document.createElement("a");
    link.href = skillData.url;
    link.target = "_blank";

    // Create progress bar background - Use total number of levels
    const totalLevels = Object.keys(levels).length;
    const progress = document.createElement("div");
    progress.className = "skill-progress";
    progress.style.width = `${(skillData.level / totalLevels) * 100}%`; // Use totalLevels

    // Add text
    const text = document.createElement("span");
    text.className = "skill-text";
    text.textContent = skillData.name;

    // Calculate opacity based on MAX LEVEL IN CATEGORY
    const baseOpacity = 1;
    const minOpacity = 0.35; // Adjusted min opacity
    const opacityExponent = 1.8; // Adjusted exponent for more emphasis on higher levels

    const normalizedLevel = maxLevelInCategory > 0 ? skillData.level / maxLevelInCategory : 0; // Use maxLevelInCategory, handle division by zero
    const opacity = minOpacity + (baseOpacity - minOpacity) * Math.pow(normalizedLevel, opacityExponent);

    // Set opacity on the link element
    link.style.opacity = opacity;

    // Add data attribute if this skill is the max level in its category
    if (skillData.level === maxLevelInCategory) {
      skill.dataset.isMaxLevel = "true";
    }

    link.appendChild(progress);
    link.appendChild(text);
    skill.appendChild(link);

    return skill;
  }
  // --- End Helper Function ---

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

    // Populate the sections with skills using the helper
    populateSkillsGrid(toolsGrid, toolSkills);
    populateSkillsGrid(languagesGrid, languageSkills);
  }

  function populateSkillsGrid(grid, skills) {
    // Sort skills by level (highest first)
    const sortedSkills = [...skills].sort((a, b) => b.level - a.level);

    // Find the highest level within THIS category of skills
    const maxLevelInCategory = Math.max(0, ...skills.map((skill) => skill.level)); // Calculate here, ensure non-negative

    // Create and add skill tags using the helper function
    sortedSkills.forEach((skillData) => {
      const skillElement = createSkillElement(skillData, maxLevelInCategory); // Pass maxLevelInCategory
      grid.appendChild(skillElement);
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

    // Find the highest level within THIS category of skills
    const maxLevelInCategory = Math.max(0, ...skills.map((skill) => skill.level)); // Calculate here, ensure non-negative

    // Create and add skill tags using the helper function
    sortedSkills.forEach((skillData) => {
      const skillElement = createSkillElement(skillData, maxLevelInCategory); // Pass maxLevelInCategory
      grid.appendChild(skillElement);
    });
  }

  function addIntersectionObservers() {
    // Add intersection observer for fade-in effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Check if the class is already present before adding it
            if (!entry.target.classList.contains("visible")) {
              entry.target.classList.add("visible");
            }
            observer.unobserve(entry.target); // Unobserve after first intersection
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
  // Add observers ONCE after initial creation
  addIntersectionObservers();

  // Update window resize handler to also adjust heights
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // If specific resize adjustments are needed later, add them here.
      // For now, CSS should handle responsiveness.
    }, 250);
  });
});
