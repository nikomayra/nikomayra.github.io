import airbusLogo from "../../images/work/airbus.webp";
import lockheedLogo from "../../images/work/LM-logo.webp";
import decimalLogo from "../../images/work/de.webp";
import canonLogo from "../../images/work/CanonSolutionsAmerica.webp";
import sentricaLogo from "../../images/work/sentrica.webp";
import auroxLogo from "../../images/work/aurox.webp";
import adituLogo from "../../images/work/aditu.webp";

class WorkExperience {
  constructor() {
    this.container = document.querySelector("#work-experience-demo");
    if (!this.container) return;

    this.companies = [
    {
      id: "aditu",
      name: "Aditu",
      logo: adituLogo,
      location: "Boca Raton, FL, USA (Remote)",
      period: "April 2026 - Present",
      description: "Solo-founded AI-powered call quality assurance (QA) platform for teams reviewing recorded customer calls",
      roles: [
        {
          title: "Founder & Builder",
          period: "April 2026 - Present",
          responsibilities: [
            "Built, launched, marketed, and operated an AI-powered call QA web app end-to-end: product discovery, full-stack development (Next.js, FastAPI, PostgreSQL, Celery), deployment, Stripe metered billing, vendor benchmarking, pricing model, and customer onboarding workflow.",
            "Delivered ~8x lower cost per call and ~12x faster processing than the manual review baseline, with 100% review coverage and bilingual (English/Spanish) support.",
            "See project Report on this site (Projects section) for the full case study, benchmarks, and sample outputs."
          ],
          skills: ["Product Discovery", "Full-Stack Development", "FastAPI/Next.js", "Stripe Metered Billing", "AI/LLM Integration", "Unit Economics", "Market Research", "Production Operations"],
        },
      ],
    },
    {
      id: "aurox",
      name: "Aurox",
      logo: auroxLogo,
      location: "New York, NY, USA (Remote)",
      period: "April 2025 - March 2026",
      description: "All-in-one solution for capturing, measuring, and analyzing farm forage inventory",
      roles: [
        {
          title: "Software Engineer",
          period: "October 2025 - March 2026",
          responsibilities: [
            "Architecture Modernization: refactored 3,000+ line legacy single-file components into a maintainable, feature-first structure; removed dead code, standardized patterns, and established contribution and architectural guidelines for the team.",
            "System Stabilization (Inventory 2.0): rebuilt the core Inventory Management System, resolving long-standing state-sync issues and crash loops; new implementation is mobile-friendly and supports upcoming forecasting features.",
            "Product Delivery (Flight Hub 2.0): delivered the full Customer Operations Portal, including responsive layouts, flight visualization tools, usage tracking, and secure invitation logic.",
            "Data Integrity: reworked Flight Management & Scheduling tools with clear validation, optimistic UI updates, and backend fixes to prevent data corruption.",
            "Billing Infrastructure: replaced fragile custom billing logic with a Stripe-based subscription workflow and customer portal, significantly reducing maintenance overhead and payment issues."
          ],
          skills: ["Full-Stack Development", "System Architecture", "React/Django", "Stripe Subscriptions", "Mobile-Friendly UX", "Product Delivery"],
        },
        {
          title: "Software Engineering Intern",
          period: "April 2025 - May 2025",
          responsibilities: [
            "Containerized Cloud Architecture: designed and implemented a full-stack Django/React application (Docker, Redis, S3) to process thousands of agricultural image uploads daily.",
            "Computer Vision Pipeline: built a system for video frame extraction and image processing via Label Studio, generating analytical reports on feed inventory.",
            "Interactive Dashboard: developed a modern TypeScript application using Tailwind and Recharts for real-time visualization of livestock activity.",
            "Secure Payments: implemented Stripe API transaction management with MFA-secured JWT authentication."
          ],
          skills: ["Full-Stack Development", "Computer Vision Pipeline", "React/Django", "Docker/Redis/S3", "Stripe API"],
        },
      ],
    },
    {
      id: "sentrica",
      name: "Sentrica",
      logo: sentricaLogo,
      location: "Santiago, Chile",
      period: "January 2025 - February 2025",
      description: "Technology partner delivering solutions for IT service metrics and performance analysis",
      roles: [
        {
          title: "Software Engineering Intern",
          period: "January 2025 - February 2025",
          responsibilities: [
            "Developed GitLab-integrated user feedback system and built HTML email templating engine in Go with WCAG-compliant UI enhancements.",
            "See resume for detailed technical contributions."
          ],
          skills: ["Next.js/React", "Go Backend Development", "GitLab API Integration", "Accessibility (WCAG)"],
        },
      ],
    },
    {
      id: "airbus",
      name: "Airbus",
      logo: airbusLogo,
      location: "Augsburg, Germany",
      period: "Offer Accepted (Dec. 2023)",
      description: "Global leader in aeronautics, space and related services",
      roles: [
        {
          title: "Design Engineer - Authorizer",
          period: "Offer Accepted (Contract Mutually Cancelled)",
          responsibilities: [
            "Hired after multi-round interviews for composite aircraft component authorization role; contract mutually cancelled due to family emergency."
          ],
          skills: ["Aerospace Design", "Engineering Authorization"],
        },
      ],
    },
    {
      id: "lockheed",
      name: "Lockheed Martin",
      logo: lockheedLogo,
      location: "Multiple Locations, USA",
      period: "November 2016 - June 2023",
      description: "American aerospace, defense, arms, security, and advanced technologies company",
      roles: [
        {
          title: "Senior Mechanical Design Engineer",
          location: "Orlando, Florida",
          period: "November 2022 - June 2023",
          responsibilities: [
            "Led Model-Based Definition modernization for legacy CATIA V5 production programs and conducted IRAD concept development for advanced fuel tank and airframe integration.",
            "See resume for detailed contributions and cost savings."
          ],
          skills: ["Technical Leadership", "MBD/CAD Automation", "System Engineering"],
        },
        {
          title: "Mechanical Design Engineer",
          location: "Orlando, Florida",
          period: "March 2018 - November 2022",
          responsibilities: [
            "Product Owner and Technical Lead for 6-8 engineer team driving digital transformation. Generated $100K+ in cost savings, built Python automation tools, and designed advanced mechanical subsystems.",
            "See resume for detailed contributions and awards."
          ],
          skills: ["Product Ownership", "Technical Leadership", "Python Automation", "Systems Design"],
        },
        {
          title: "Asc. Quality Engineer",
          location: "Troy, Alabama",
          period: "November 2016 - March 2018",
          responsibilities: [
            "Developed VBA automation suite generating $300K+ in contract savings and led environmental monitoring team with custom data visualization tools.",
            "See resume for detailed contributions."
          ],
          skills: ["Quality Assurance", "VBA Automation", "Process Improvement"],
        },
      ],
    },
    {
      id: "decimal",
      name: "Decimal Engineering",
      logo: decimalLogo,
      location: "Pompano Beach, Florida",
      period: "September 2015 - March 2016",
      description: "Specialized engineering firm focusing on precision components",
      roles: [
        {
          title: "Engineering Intern",
          period: "September 2015 - March 2016",
          responsibilities: [
            "Revised BOMs/routings for 50+ parts, generated CAD models, and created laser g-code programs using RADAN software."
          ],
          skills: ["CAD Modeling", "Manufacturing Engineering", "G-Code Programming"],
        },
      ],
    },
    {
      id: "canon",
      name: "Canon Solutions America",
      logo: canonLogo,
      location: "Boca Raton, Florida",
      period: "July 2015 - August 2015",
      description: "Provider of industry leading enterprise, production, and large format printing solutions",
      roles: [
        {
          title: "Technical Intern",
          period: "July 2015 - August 2015",
          responsibilities: [
            "Designed 3D-printed microscope mount, developed Printhead analysis tool using LabVIEW, and improved test yield by nearly 100%."
          ],
          skills: ["3D Printing", "LabVIEW", "Process Improvement"],
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



