import airbusLogo from "../../images/work/airbus.webp";
import lockheedLogo from "../../images/work/LM-logo.webp";
import decimalLogo from "../../images/work/de.webp";
import canonLogo from "../../images/work/CanonSolutionsAmerica.webp";
import sentricaLogo from "../../images/work/sentrica.webp";
import auroxLogo from "../../images/work/aurox.webp";
import adituLogo from "../../images/work/aditu.webp";

class WorkExperience {
  constructor() {
    this.container =
      document.querySelector("#work-experience-demo");

    if (!this.container) return;

    this.companies = [
      {
        id: "aditu",
        name: "Aditu",
        logo: adituLogo,
        location: "Florida, USA (Remote)",
        period: "April 2026 - Present",
        description:
          "AI-powered call quality assurance platform for teams reviewing recorded customer calls",
        roles: [
          {
            title: "Founder & Sole Builder",
            period: "April 2026 - Present",
            responsibilities: [
              "Built and operated a production-ready B2B SaaS using Next.js, FastAPI, PostgreSQL, Celery/Redis, Docker, and Stripe metered billing, including batch audio processing, configurable QA rubrics, AI evaluation, transcript evidence, dashboards, organization accounts, and PDF/spreadsheet exports.",
              "Benchmarked ElevenLabs, Deepgram, and AssemblyAI against human-verified transcripts and validated approximately 8x lower cost and 12x faster processing than the manual review baseline, informing vendor selection and pricing.",
              "Owned product discovery, system design, market research, unit economics, customer onboarding, data-processing and subprocessor considerations, backups, observability, and production-cutover documentation.",
            ],
            skills: [
              "Product Discovery",
              "Next.js/FastAPI",
              "PostgreSQL/Celery",
              "AI/LLM Integration",
              "Stripe Metered Billing",
              "Vendor Benchmarking",
              "Production Operations",
            ],
          },
        ],
      },
      {
        id: "aurox",
        name: "Aurox",
        logo: auroxLogo,
        location: "New York, NY, USA (Remote)",
        period: "April 2025 - March 2026",
        description:
          "Agricultural technology platform for capturing, measuring, and analyzing forage inventory",
        roles: [
          {
            title: "Software Engineer",
            period: "October 2025 - March 2026",
            responsibilities: [
              "Led an incremental modernization of a legacy React application, migrating from Create React App to Vite and progressively from JavaScript to TypeScript; decomposed a 3,400-line monolith and other large components into feature-based modules with typed API boundaries and clearer Redux/SWR state ownership.",
              "Established frontend architecture and contribution standards, introducing Husky pre-commit checks, refined ESLint and formatting rules, automated unit/integration/end-to-end test workflows, pull-request CI validation, and onboarding documentation for contractor contributions.",
              "Rebuilt and expanded Inventory Management, Flight Hub, permissions, invitation, and operational workflows across React and Django, resolving state-synchronization failures, crash loops, validation gaps, and inconsistent user experiences.",
              "Replaced thousands of lines of fragile custom payment logic with a streamlined Stripe subscription and customer-portal architecture, including frontend/backend workflows, webhook processing, API reconciliation, fallback handling, and safer subscription-state management.",
              "Stabilized large-file upload, ML inference, and report-generation workflows across Celery, AWS ECS, and AWS Batch by resolving memory and state-management failures and adding retry, reconciliation, resumability, CloudWatch diagnostics, and operational recovery tooling.",
            ],
            skills: [
              "React/TypeScript",
              "Django",
              "Vite Migration",
              "Testing & CI/CD",
              "Stripe Subscriptions",
              "Celery/AWS",
              "Platform Reliability",
            ],
          },
          {
            title: "Software Engineering Intern",
            period: "April 2025 - May 2025",
            responsibilities: [
              "Built a Django/React product from an initial requirements brief through a working MVP, including authentication, large-scale image uploads, Celery/Redis background processing, project-status tracking, operational dashboards, and report delivery.",
              "Integrated video-frame extraction, S3 storage, Label Studio annotation, temporal analysis, PDF report generation, TypeScript/Tailwind visualization, and Stripe payment functionality into the end-to-end computer-vision workflow.",
            ],
            skills: [
              "Django/React",
              "Celery/Redis",
              "S3",
              "Label Studio",
              "Image Processing",
              "Stripe API",
            ],
          },
        ],
      },
      {
        id: "sentrica",
        name: "Sentrica",
        logo: sentricaLogo,
        location: "Santiago, Chile (Remote)",
        period: "January 2025 - February 2025",
        description:
          "Technology partner delivering IT service metrics and performance-analysis solutions",
        roles: [
          {
            title: "Software Engineering Intern",
            period: "January 2025 - February 2025",
            responsibilities: [
              "Built an in-application feedback workflow that captured user reports and application metadata and automatically created structured GitLab issues, improving traceability between customer feedback and engineering work.",
              "Developed reusable HTML email templates within a Go application and improved responsive behavior, accessibility, validation, and user feedback across customer-facing interfaces.",
            ],
            skills: [
              "React/Next.js",
              "Go",
              "GitLab API",
              "Responsive UI",
              "Accessibility",
            ],
          },
        ],
      },
      {
        id: "airbus",
        name: "Airbus",
        logo: airbusLogo,
        location: "Augsburg, Germany",
        period: "November 2023",
        description: "Global aerospace manufacturer",
        roles: [
          {
            title: "Design Engineer - Authorizer",
            period:
              "Selected; contract mutually cancelled before start",
            responsibilities: [
              "Selected following a multi-round technical interview for a composite aircraft-component authorization role; the contract was mutually cancelled due to a family emergency.",
            ],
            skills: [
              "Aerospace Design",
              "Engineering Authorization",
            ],
          },
        ],
      },
      {
        id: "lockheed",
        name: "Lockheed Martin",
        logo: lockheedLogo,
        location: "Multiple Locations, USA",
        period: "November 2016 - June 2023",
        description:
          "Aerospace, defense, security, and advanced-technology company",
        roles: [
          {
            title: "Senior Mechanical Design Engineer",
            location: "Orlando, Florida",
            period: "November 2022 - June 2023",
            responsibilities: [
              "Directed Model-Based Definition conversion for a major legacy CATIA V5 production program, defining digital processes, CAD automation workflows, and checking/release expectations.",
              "Conducted internal research and development concept studies for machine-determinate fuel-tank designs, airframe integration, and related mechanical-system feasibility.",
            ],
            skills: [
              "CATIA V5",
              "Model-Based Definition",
              "CAD Automation",
              "R&D Feasibility",
              "Technical Leadership",
            ],
          },
          {
            title: "Mechanical Design Engineer",
            location: "Orlando, Florida",
            period: "March 2018 - November 2022",
            responsibilities: [
              "Served as Product Owner and Technical Lead for a 6-8 engineer digital-transformation effort spanning CATIA Model-Based Definition, Functional Tolerancing & Annotation, CAD automation, 3D-PDF templates, training, CAD-to-PLM infrastructure, and checking/release workflows.",
              "Owned Guidance & Control affordability initiatives and implemented production design changes producing more than $100K in verified cost savings.",
              "Built Python tooling with the Confluence REST API to automate reporting, training, and engineering-data workflows, improving process efficiency by more than 200%.",
              "Led requirements, trade studies, risk assessments, supplier coordination, design reviews, and concept development for canister-deployment, tailfin-control, support-equipment, and test-tooling systems.",
            ],
            skills: [
              "Product Ownership",
              "Mechanical Systems",
              "CATIA/Creo",
              "Python Automation",
              "Requirements & Risk",
              "Supplier Coordination",
            ],
          },
          {
            title: "Associate Quality Engineer",
            location: "Troy, Alabama",
            period: "November 2016 - March 2018",
            responsibilities: [
              "Developed SAP-integrated VBA tooling for QA dashboards, Quality Notification tracking, production build-status visibility, and compliance reporting, contributing to more than $300K in contract cost savings.",
              "Led environmental-monitoring operations across production buildings and programs, creating VBA GUI tools and automated dashboards for humidity, temperature, and facility-control compliance.",
              "Performed First Article Inspections, production audits, Quality Notification routing and dispositions, FOD walk-downs, special-process reviews, and manufacturing-quality investigations.",
            ],
            skills: [
              "Quality Engineering",
              "VBA/SAP Automation",
              "Manufacturing",
              "Compliance Monitoring",
              "Data Visualization",
            ],
          },
        ],
      },
      {
        id: "decimal",
        name: "Decimal Engineering",
        logo: decimalLogo,
        location: "Pompano Beach, Florida",
        period: "September 2015 - March 2016",
        description:
          "Precision sheet-metal, machining, and manufacturing company",
        roles: [
          {
            title: "Engineering Intern",
            period: "September 2015 - March 2016",
            responsibilities: [
              "Updated more than 50 bills of material and CNC routings, generated RADAN punching and laser programs, created CAD models from drawings, and wrote manufacturing work instructions across forming, welding, machining, laser, and punching operations.",
            ],
            skills: [
              "Manufacturing Engineering",
              "CAD Modeling",
              "BOM/Routing",
              "RADAN",
              "CNC Programming",
            ],
          },
        ],
      },
      {
        id: "canon",
        name: "Canon Solutions America",
        logo: canonLogo,
        location: "Boca Raton, Florida",
        period: "July 2015 - August 2015",
        description:
          "Enterprise, production, and large-format printing solutions provider",
        roles: [
          {
            title: "Technical Intern",
            period: "July 2015 - August 2015",
            responsibilities: [
              "Designed 3D-printed microscope and test jigs and developed a LabVIEW-based oscilloscope validation tool for printhead testing, improving test yield and reducing validation cost.",
            ],
            skills: [
              "3D Printing",
              "LabVIEW",
              "Test Tooling",
              "Process Improvement",
            ],
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
    const viewContainer =
      document.createElement("div");

    viewContainer.id =
      "work-accordion-container";

    viewContainer.className =
      "work-accordion-container active";

    this.container.appendChild(viewContainer);
    this.accordionContainer = viewContainer;
  }

  renderAccordion() {
    const accordion =
      document.createElement("div");

    accordion.className = "work-accordion";

    this.companies.forEach((company) => {
      const accordionItem =
        document.createElement("div");

      accordionItem.className =
        "accordion-item";

      accordionItem.dataset.id = company.id;

      const header =
        document.createElement("div");

      header.className = "accordion-header";

      const logoContainer =
        document.createElement("div");

      logoContainer.className =
        "accordion-logo";

      const logo =
        document.createElement("img");

      logo.src = company.logo;
      logo.alt = `${company.name} logo`;

      logoContainer.appendChild(logo);

      const titleContainer =
        document.createElement("div");

      titleContainer.className =
        "accordion-title";

      const title =
        document.createElement("h4");

      title.textContent = company.name;
      titleContainer.appendChild(title);

      if (company.location) {
        const location =
          document.createElement("p");

        location.className =
          "accordion-location";

        location.textContent =
          company.location;

        titleContainer.appendChild(location);
      }

      if (company.period) {
        const period =
          document.createElement("p");

        period.className =
          "accordion-period";

        period.textContent = company.period;
        titleContainer.appendChild(period);
      }

      const toggleButton =
        document.createElement("button");

      toggleButton.className =
        "accordion-toggle";

      toggleButton.innerHTML =
        '<span class="plus">+</span><span class="minus">−</span>';

      header.appendChild(logoContainer);
      header.appendChild(titleContainer);
      header.appendChild(toggleButton);

      const content =
        document.createElement("div");

      content.className =
        "accordion-content";

      const description =
        document.createElement("p");

      description.textContent =
        company.description;

      description.className =
        "company-description";

      content.appendChild(description);

      const rolesContainer =
        document.createElement("div");

      rolesContainer.className =
        "roles-container";

      company.roles.forEach((role) => {
        const roleItem =
          document.createElement("div");

        roleItem.className = "role-item";

        const roleTitle =
          document.createElement("h4");

        roleTitle.className = "role-title";
        roleTitle.textContent = role.title;
        roleItem.appendChild(roleTitle);

        if (role.location) {
          const roleLocation =
            document.createElement("p");

          roleLocation.className =
            "role-location";

          roleLocation.textContent =
            role.location;

          roleItem.appendChild(roleLocation);
        }

        const rolePeriod =
          document.createElement("p");

        rolePeriod.className = "role-period";
        rolePeriod.textContent = role.period;

        roleItem.appendChild(rolePeriod);

        const roleDetails =
          document.createElement("div");

        roleDetails.className =
          "role-details";

        const responsibilitiesTitle =
          document.createElement("h5");

        responsibilitiesTitle.textContent =
          "Responsibilities:";

        roleDetails.appendChild(
          responsibilitiesTitle
        );

        const responsibilitiesList =
          document.createElement("ul");

        responsibilitiesList.className =
          "role-responsibilities";

        role.responsibilities.forEach(
          (responsibility) => {
            const listItem =
              document.createElement("li");

            listItem.textContent =
              responsibility;

            responsibilitiesList.appendChild(
              listItem
            );
          }
        );

        roleDetails.appendChild(
          responsibilitiesList
        );

        if (
          role.skills &&
          role.skills.length > 0
        ) {
          const skillsContainer =
            document.createElement("div");

          skillsContainer.className =
            "role-skills";

          role.skills.forEach((skill) => {
            const skillTag =
              document.createElement("span");

            skillTag.className =
              "skill-tag";

            skillTag.textContent = skill;

            skillsContainer.appendChild(
              skillTag
            );
          });

          roleDetails.appendChild(
            skillsContainer
          );
        }

        roleItem.appendChild(roleDetails);
        rolesContainer.appendChild(roleItem);
      });

      content.appendChild(rolesContainer);

      accordionItem.appendChild(header);
      accordionItem.appendChild(content);
      accordion.appendChild(accordionItem);
    });

    this.accordionContainer.appendChild(
      accordion
    );
  }

  setupEventListeners() {
    const accordionHeaders =
      this.accordionContainer.querySelectorAll(
        ".accordion-header"
      );

    accordionHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const accordionItem =
          header.parentElement;

        const content =
          accordionItem.querySelector(
            ".accordion-content"
          );

        accordionItem.classList.toggle(
          "active"
        );

        if (
          accordionItem.classList.contains(
            "active"
          )
        ) {
          content.style.maxHeight =
            `${content.scrollHeight}px`;
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new WorkExperience();
});

export default WorkExperience;