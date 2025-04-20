import airbusLogo from "../../images/work/airbus.webp";
import lockheedLogo from "../../images/work/LM-logo.webp";
import decimalLogo from "../../images/work/de.webp";
import canonLogo from "../../images/work/CanonSolutionsAmerica.webp";
import sentricaLogo from "../../images/work/sentrica.webp";

class WorkExperience {
  constructor() {
    this.container = document.querySelector("#work-experience-demo");
    if (!this.container) return;

    this.companies = [
      {
        id: "sentrica",
        name: "Sentrica",
        logo: sentricaLogo,
        location: "Santiago, Chile",
        period: "Jan. 2025 - TBD",
        description:
          "A technology partner that delivers solutions for the capture, management and analysis of metrics and performance of IT Services",
        roles: [
          {
            title: "Software Intern",
            period: "Jan. 2025 - As neeeded",
            responsibilities: [
              "Built a user feedback system integrated with GitLab Issues, allowing customers to report bugs and suggestions via a modal form with image uploads, label selection, and automatic metadata tagging; implemented with GitLab API v4, FilePond, and a responsive UI.",
              "Developed a full-featured HTML email templating engine in Go, including account recovery and alarm notification templates, using Go’s standard library templating and a modular folder structure to support easy future expansion and consistent branding.",
              "Added tooling and developer UX improvements, such as a mobile-aware tooltip component, WCAG-compliant dynamic label contrast, robust error handling, and a testing for validating rendered emails across clients.",
            ],
            skills: [
              "Next.js & React UI Eng.",
              "Go Lang Backend Dev.",
              "HTML Email Rendering & Template Systems",
              "GitLab API Integration & Automation",
            ],
          },
        ],
      },
      {
        id: "airbus",
        name: "Airbus",
        logo: airbusLogo,
        location: "Augsburg, Germany",
        period: "Offer Accepted (Dec. 2023)",
        description: "Global leader in aeronautics, space and related services.",
        roles: [
          {
            title: "Design Engineer - Authorizer",
            period: "No Start (Dec. 2023) - Refer to resume",
            responsibilities: [
              "Planned: Authorize engineering designs for composite aircraft components",
              "Planned: Collaborate on technical specifications",
              "Planned: Ensure compliance with aerospace standards",
            ],
            skills: ["Aerospace Design", "Engineering", "Authorization"],
          },
        ],
      },
      {
        id: "lockheed",
        name: "Lockheed Martin",
        logo: lockheedLogo,
        location: "Multiple Locations, USA",
        period: "Nov. 2016 - Jun. 2023",
        description: "American aerospace, defense, arms, security, and advanced technologies company.",
        roles: [
          {
            title: "Senior Mechanical Design Engineer",
            location: "Orlando, Florida",
            period: "Nov. 2022 - Jun. 2023",
            responsibilities: [
              "Led mechanical design for Internal Research And Development (IRAD) program on Machine Determinate fuel tank designs & airframe integration",
              "Conducted design trade studies and feasibility studies for advanced systems",
              "Served as Lead for Model Based Definition conversion of largest MFC legacy CATIA V5 production program",
            ],
            skills: ["Senior Tech Lead", "Leadership", "Mechanical & System Eng."],
          },
          {
            title: "Mechanical Design Engineer",
            location: "Orlando, Florida",
            period: "Mar. 2018 - Nov. 2022",
            responsibilities: [
              "Product Owner and Technical Lead for MFC's CATIA Model Based Definition development team, leading 6-8 engineers",
              "Generated well over $100,000 in savings as Cost Target Owner for Guidance & Control subsystem production affordability initiatives",
              "Built Python script using Confluence REST API to improve training review/maintenance",
              "Led trade studies on missile canister ejection methods for novel palletized system",
              "Designed novel space-efficient, high-strength hinge mechanism for tailfin deploy & control actuation system",
            ],
            skills: ["Leadership", "Mechanical & System Eng.", "Design & Analysis", "Optimization"],
          },
          {
            title: "Asc. Quality Engineer",
            location: "Troy, Alabama",
            period: "Nov. 2016 - Mar. 2018",
            responsibilities: [
              "Led team monitoring internal environmental conditions of all production buildings on site",
              "Developed extensive Excel VBA macro tools for quality assurance and manufacturing optimization, generating over $300,000 in contract savings",
              "Performed First Article Inspections (FAI), QNote management, and Foreign Object Damage/Debris (FOD) walk-downs",
              "Improved production process efficiency through customized data visualization tools for leadership",
            ],
            skills: ["Quality Assurance", "Process Improvement", "Manufacturing"],
          },
        ],
      },
      {
        id: "decimal",
        name: "Decimal Engineering",
        logo: decimalLogo,
        location: "Pompano Beach, Florida",
        period: "Sep. 2015 - Mar. 2016",
        description: "Specialized engineering firm focusing on precision components.",
        roles: [
          {
            title: "Engineering Intern",
            period: "Sep. 2015 - Mar. 2016",
            responsibilities: [
              "Revised Bill of Materials (BOM) and Routings for over 50 detail parts and assemblies",
              "Generated dozens of CAD models for dimension verification from drawings",
              "Created and modified over 10 punching/laser g-code programs using RADAN software",
              "Worked on initiative to modify Bystronic machine forming program to use extensive coining tool inventory",
            ],
            skills: ["Engineering", "Production", "Manufacturing"],
          },
        ],
      },
      {
        id: "canon",
        name: "Canon Solutions America",
        logo: canonLogo,
        location: "Boca Raton, Florida",
        period: "Jul. 2015 - Aug. 2015",
        description: "Provider of industry leading enterprise, production, and large format printing solutions.",
        roles: [
          {
            title: "Technical Intern",
            period: "Jul. 2015 - Aug. 2015",
            responsibilities: [
              "Designed and 3D printed digital microscope mount and alignment jig for automatic Printhead analysis program",
              "Designed Printhead analysis tool using electro-audio signal with oscilloscope and LabVIEW",
              "Revised company test process for rejected Printheads improving test yield by nearly 100%",
              "Produced test reports using linear regression for Director of Operations",
            ],
            skills: ["Tools Engineering", "Process Improvement", "Research"],
          },
        ],
      },
    ];

    this.init();
  }

  init() {
    this.renderContainer();
    this.renderAccordion();
    this.setupEventListeners();
  }

  renderContainer() {
    const viewContainer = document.createElement("div");
    viewContainer.id = "work-accordion-container";
    viewContainer.className = "work-accordion-container active";
    this.container.appendChild(viewContainer);
    this.accordionContainer = viewContainer;
  }

  renderAccordion() {
    const accordion = document.createElement("div");
    accordion.className = "work-accordion";

    this.companies.forEach((company) => {
      // Create accordion item
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";
      accordionItem.dataset.id = company.id;

      // Create accordion header
      const header = document.createElement("div");
      header.className = "accordion-header";

      const logoContainer = document.createElement("div");
      logoContainer.className = "accordion-logo";

      const logo = document.createElement("img");
      logo.src = company.logo;
      logo.alt = company.name + " logo";
      logoContainer.appendChild(logo);

      const titleContainer = document.createElement("div");
      titleContainer.className = "accordion-title";

      const title = document.createElement("h4");
      title.textContent = company.name;
      titleContainer.appendChild(title);

      if (company.location) {
        const location = document.createElement("p");
        location.className = "accordion-location";
        location.textContent = company.location;
        titleContainer.appendChild(location);
      }

      if (company.period) {
        const period = document.createElement("p");
        period.className = "accordion-period";
        period.textContent = company.period;
        titleContainer.appendChild(period);
      }

      // Toggle button
      const toggleButton = document.createElement("button");
      toggleButton.className = "accordion-toggle";
      toggleButton.innerHTML = '<span class="plus">+</span><span class="minus">−</span>';

      header.appendChild(logoContainer);
      header.appendChild(titleContainer);
      header.appendChild(toggleButton);

      // Create accordion content
      const content = document.createElement("div");
      content.className = "accordion-content";

      const description = document.createElement("p");
      description.textContent = company.description;
      description.className = "company-description";
      content.appendChild(description);

      // Add roles
      const rolesContainer = document.createElement("div");
      rolesContainer.className = "roles-container";

      company.roles.forEach((role) => {
        const roleItem = document.createElement("div");
        roleItem.className = "role-item";

        const roleTitle = document.createElement("h4");
        roleTitle.className = "role-title";
        roleTitle.textContent = role.title;
        roleItem.appendChild(roleTitle);

        if (role.location) {
          const roleLocation = document.createElement("p");
          roleLocation.className = "role-location";
          roleLocation.textContent = role.location;
          roleItem.appendChild(roleLocation);
        }

        const rolePeriod = document.createElement("p");
        rolePeriod.className = "role-period";
        rolePeriod.textContent = role.period;
        roleItem.appendChild(rolePeriod);

        const roleDetails = document.createElement("div");
        roleDetails.className = "role-details";

        const responsibilitiesTitle = document.createElement("h5");
        responsibilitiesTitle.textContent = "Responsibilities:";
        roleDetails.appendChild(responsibilitiesTitle);

        const responsibilitiesList = document.createElement("ul");
        responsibilitiesList.className = "role-responsibilities";
        role.responsibilities.forEach((resp) => {
          const listItem = document.createElement("li");
          listItem.textContent = resp;
          responsibilitiesList.appendChild(listItem);
        });
        roleDetails.appendChild(responsibilitiesList);

        if (role.skills && role.skills.length > 0) {
          const skillsContainer = document.createElement("div");
          skillsContainer.className = "role-skills";
          role.skills.forEach((skill) => {
            const skillTag = document.createElement("span");
            skillTag.className = "skill-tag";
            skillTag.textContent = skill;
            skillsContainer.appendChild(skillTag);
          });
          roleDetails.appendChild(skillsContainer);
        }

        roleItem.appendChild(roleDetails);
        rolesContainer.appendChild(roleItem);
      });

      content.appendChild(rolesContainer);

      // Add to accordion item
      accordionItem.appendChild(header);
      accordionItem.appendChild(content);

      accordion.appendChild(accordionItem);
    });

    this.accordionContainer.appendChild(accordion);
  }

  setupEventListeners() {
    const accordionHeaders = this.accordionContainer.querySelectorAll(".accordion-header");

    accordionHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const accordionItem = header.parentElement;
        const content = accordionItem.querySelector(".accordion-content");

        // Toggle active class
        accordionItem.classList.toggle("active");

        // Toggle content height
        if (accordionItem.classList.contains("active")) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new WorkExperience();
});

export default WorkExperience;
