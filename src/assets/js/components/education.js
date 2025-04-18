import faulogo from "../../images/education/fau.webp";
import purduelogo from "../../images/education/PU-V-Full-RGB.webp";
import fullstacklogo from "../../images/education/fso.webp";

class Education {
  constructor() {
    this.container = document.querySelector("#education-section");
    if (!this.container) return;

    this.educationData = [
      {
        id: "fullstack",
        logo: fullstacklogo,
        title: "Full Stack Open - Core Course",
        subtitle: "",
        period: "2022 - 2023",
        description: "Covered the following major topics,",
        items: [
          "Fundamentals of Web Apps using JavaScript",
          "React development using Vite",
          "RESTful API, Axios, Promises, Error handling",
          "Node.js & Express",
          "Build & Deployment with Fly.io & Render.com",
          "MongoDB & Mongoose",
          "Unit & Integration testing",
          "JWT token-based authentication/authorization",
          "Playwright end-to-end testing",
        ],
        links: [
          { text: "Course Website", url: "https://fullstackopen.com/en" },
          {
            text: "Certificate",
            url: "https://drive.google.com/file/d/19T4m4IhEqeUx-vSB17Ac0SuA-thPHvw4/view?usp=sharing",
          },
        ],
      },
      {
        id: "purdue",
        logo: purduelogo,
        title: "Purdue University",
        subtitle: "Masters in Mechanical Engineering",
        period: "2018 - 2020",
        description: "Some relevant course work,",
        items: [
          "Intro Scientific Machine Learning",
          "Linear Algebra",
          "Decision Making in Engineering System Design",
          "Product and Process Design",
          "Numerical Methods",
        ],
        links: [
          {
            text: "Diploma",
            url: "https://drive.google.com/file/d/14cl_MIVYW-glCY6jVLacJlZymnWAxFke/view?usp=sharing",
          },
        ],
      },
      {
        id: "fau",
        logo: faulogo,
        title: "Florida Atlantic University",
        subtitle: "Bachelors in Mechanical Engineering",
        period: "2013 - 2016",
        description: "Some relevant projects,",
        items: [
          "3D printed Voith Schneider Propeller based Semi-Autonomous boat",
          "Pipe system flowrate distribution calculator in Python",
          "Modified and Calibrated RepRap Prusa i3 3D printer",
          "Mini-dumpster attachment for pick-up trucks",
        ],
        links: [],
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
    viewContainer.id = "education-accordion-container";
    viewContainer.className = "education-view-container active";
    this.container.appendChild(viewContainer);
    this.accordionContainer = viewContainer;
  }

  renderAccordion() {
    const accordion = document.createElement("div");
    accordion.className = "education-accordion";

    this.educationData.forEach((education, index) => {
      // Create accordion item
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";
      accordionItem.dataset.id = education.id;

      // Create accordion header
      const header = document.createElement("div");
      header.className = "accordion-header";

      const logoContainer = document.createElement("div");
      logoContainer.className = "accordion-logo";

      const logo = document.createElement("img");
      logo.src = education.logo;
      logo.alt = education.title;
      logoContainer.appendChild(logo);

      const titleContainer = document.createElement("div");
      titleContainer.className = "accordion-title";

      const title = document.createElement("h4");
      title.textContent = education.title;
      titleContainer.appendChild(title);

      if (education.subtitle) {
        const subtitle = document.createElement("p");
        subtitle.textContent = education.subtitle;
        titleContainer.appendChild(subtitle);
      }

      if (education.period) {
        const period = document.createElement("p");
        period.className = "accordion-period";
        period.textContent = education.period;
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
      description.textContent = education.description;
      description.style.marginBottom = "0px";
      content.appendChild(description);

      const list = document.createElement("ul");
      education.items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        list.appendChild(listItem);
      });
      content.appendChild(list);

      // Add links if any
      if (education.links.length > 0) {
        const linksContainer = document.createElement("div");
        linksContainer.className = "accordion-links";

        education.links.forEach((link) => {
          const linkElement = document.createElement("a");
          linkElement.href = link.url;
          linkElement.textContent = link.text;
          linkElement.target = "_blank";
          linksContainer.appendChild(linkElement);
        });

        content.appendChild(linksContainer);
      }

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
  new Education();
});

export default Education;
