import airbusLogo from "../../../images/work/airbus.png";
import lockheedLogo from "../../../images/work/LM-logo.png";
import decimalLogo from "../../../images/work/decimalEngineering.png";
import canonLogo from "../../../images/work/CanonSolutionsAmerica.png";

class CompanyGrid {
  constructor() {
    this.container = document.querySelector(".company-grid-container");
    if (!this.container) return;

    this.companies = [
      {
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
            skills: ["Senior Design", "Leadership", "Mechanical Engineering"],
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
            skills: ["Leadership", "Design & Analysis", "Mechanical & System Engineering", "Optimization"],
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
    this.render();
    this.setupInteractions();
  }

  render() {
    if (!this.container) return;

    let gridHTML = `
      <div class="company-grid">
        ${this.companies
          .map((company) => {
            return `
            <div class="company-card" data-company="${company.name.toLowerCase().replace(/\s+/g, "-")}">
              <div class="company-card-header">
                <div class="company-logo-wrapper">
                  <img src="${company.logo}" alt="${company.name} logo" class="company-logo">
                </div>
                <div class="company-info">
                  <h3 class="company-name">${company.name}</h3>
                  <p class="company-location">${company.location}</p>
                  <p class="company-period">${company.period}</p>
                </div>
                <button class="expand-button">
                  <span class="expand-icon">&#9662;</span>
                </button>
              </div>
              
              <div class="company-card-content">
                <p class="company-description">${company.description}</p>
                
                <div class="roles-container">
                  ${company.roles
                    .map((role) => {
                      return `
                      <div class="role-item">
                        <h4 class="role-title">${role.title}</h4>
                        ${role.location ? `<p class="role-location">${role.location}</p>` : ""}
                        <p class="role-period">${role.period}</p>
                        
                        <div class="role-details">
                          <h5>Responsibilities:</h5>
                          <ul class="role-responsibilities">
                            ${role.responsibilities.map((resp) => `<li>${resp}</li>`).join("")}
                          </ul>
                          
                          <div class="role-skills">
                            ${role.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
                          </div>
                        </div>
                      </div>
                    `;
                    })
                    .join("")}
                </div>
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    `;

    this.container.innerHTML = gridHTML;
  }

  setupInteractions() {
    this.container.querySelectorAll(".expand-button").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".company-card");
        const content = card.querySelector(".company-card-content");
        const expandIcon = button.querySelector(".expand-icon");

        card.classList.toggle("expanded");

        if (card.classList.contains("expanded")) {
          expandIcon.innerHTML = "&#9652;"; // Up arrow
          content.style.maxHeight = `${content.scrollHeight}px`;
        } else {
          expandIcon.innerHTML = "&#9662;"; // Down arrow
          content.style.maxHeight = "0";
        }
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CompanyGrid();
});

export default CompanyGrid;
