import { Fancybox } from "@fancyapps/ui";
import caboh from "../../images/projects/caboh.png";
import placesCentralZoner from "../../images/projects/PCZ.png";
import serverlessImageProcessor from "../../images/projects/BG.png";
import rtc from "../../images/projects/rtc.jpg";

class ProjectsCarousel {
  constructor() {
    this.container = document.querySelector(".projects-container");
    this.carousel = document.querySelector(".projects-carousel");
    this.projects = [
      {
        title: "Chat & Sketch",
        subtitle: "Real-time websocket chat, channels & sketching",
        image: rtc,
        description:
          "Modern React SPA featuring real-time chat and collaborative drawing functionality. Built with an emphasis on foundational web technologies and minimal dependencies using GoLang for server-side processing, WebSockets for real-time communication, and PostgreSQL for data persistence.",
        tech: "Go|React|Websockets|PostgreSQL|Tailwind",
        details: "Gorilla|Docker|Axios|Zod|Jest|Vite",
        complexity: "⭐⭐⭐⭐⭐",
        demoUrl: "https://rtc-nb-app.fly.dev/",
        repoUrl: "https://github.com/nikomayra/rtc-nb",
        videoUrl: "https://youtu.be/AIZz2XFL1Kc",
      },
      {
        title: "Bizarre Gallery",
        subtitle: "Azure Serverless Image Processor",
        image: serverlessImageProcessor,
        description:
          "Serverless image processor using a Azure Function App and Azure Blob Storage. Users can upload images tagged with start/middle/end from the frontend. The Function App takes 3 uploaded images, (if available) selects 1 each of start/middle/end tagged images randomly, generates a Gif, and assigns a random title. On load of the static frontend the last 20 gifs are loaded from the server. Just a tech demo showing some serverless image processing architecture turned into a fun little art project.",
        tech: "HTML|CSS|JS|Azure|AI/ML",
        details: "Imagesharp|NSFWJS|Git Pages|Azure Functions|Azure Blob Storage",
        complexity: "⭐⭐",
        demoUrl: "https://nikomayra.github.io/sl-img-prcr/",
        repoUrl: "https://github.com/nikomayra/sl-img-prcr",
        videoUrl: null,
      },
      {
        title: "Places Central-Zoner",
        subtitle: "Places clustering algorithm web app",
        image: placesCentralZoner,
        description:
          "Places Central Zoner is a web application that finds central zones which each contain at least one of each searched location within a minimized radius. For example, search for LA Fitness, Chipotle and Starbucks within the greater Seattle area and it will draw circular zones with a center point which is at a minimum distance to each of those three stores. In other words, this app helps find geographical areas which are minimally near at least one of each searched place. When I was living out of my car the original need was to find ideal areas to situate myself such that I had access to a multitude of places.",
        tech: "MUI|Vite|React.ts|Flask|PostgreSQL|Google APIs|Google OAuth2.0",
        details: "K-Means/DBSCAN Clustering|OAuth Implicit Flow|Flask SQLAlchemy|Google Maps/Location APIs",
        complexity: "⭐⭐⭐⭐",
        demoUrl: "https://places-central-zoner.onrender.com",
        repoUrl: "https://github.com/nikomayra/places-central-zoner",
        videoUrl: "https://youtu.be/gH2cRBy0p8o",
      },
      {
        title: "Caboh: The Game",
        subtitle: "Multiplayer RESTful Card Game",
        image: caboh,
        description:
          'This was my first project after completing the Fullstack Open fullstack coding bootcamp which focused on the MERN stack using REST API structure and CRUD style operations. My friend group used to like playing a card game called Cabo which is based on the game Golf or Cabo with our own extra rules. I felt it was a good game to practice implementing what I learned since the game is turn based and doesn\'t rely on dynamic "live" elements all players need to see and where websockets would be a better tool.',
        tech: "Vite|React.js|Node.js|Express|MongoDB",
        details: "RESTful|Mongoose|Axios",
        complexity: "⭐⭐⭐",
        demoUrl: "https://caboh.onrender.com",
        repoUrl: "https://github.com/nikomayra/caboh",
        videoUrl: "https://youtu.be/JCAG6QyIfGM",
      },
    ];
    this.activeIndex = 0;
    this.startX = 0;
    this.isSwiping = false;
    this.swipeThreshold = 50;
    this.init();
  }

  init() {
    this.render();
    // Wait for next frame to ensure DOM and styles are fully applied
    requestAnimationFrame(() => {
      this.setupNavigation();
      this.initializeFancybox();
      this.setupCards();
      // Center the first card on init with a small delay to ensure proper rendering
      setTimeout(() => this.setActiveCard(this.activeIndex), 100);
      this.setupSwipeSupport();
    });
  }

  render() {
    this.carousel.innerHTML = `
      <div class="carousel-track">
        ${this.projects.map((project, index) => this.createProjectCard(project, index)).join("")}
      </div>
    `;

    // Keep arrow navigation for accessibility but more subtle
    this.container.insertAdjacentHTML(
      "beforeend",
      `<div class="carousel-controls">
        <div class="carousel-nav prev">
          <i class="chevron-left"></i>
        </div>
        <div class="carousel-nav next">
          <i class="chevron-right"></i>
        </div>
      </div>`
    );
  }

  createProjectCard(project, index) {
    const techTags = project.tech
      .split("|")
      .map((tech) => `<span class="tech-tag">${tech.trim()}</span>`)
      .join("");
    const details = project.details
      .split("|")
      .map((detail) => `<span class="detail">${detail.trim()}</span>`)
      .join("");
    return `
      <div class="project-card" data-index="${index}">
        <div class="card-inner">
          <div class="card-front">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-subtitle">${project.subtitle}</p>
            <div class="project-tech-stack">
              ${techTags}
            </div>
            <div class="project-complexity">
              <span class="complexity-label">Complexity:</span>
              <span class="complexity-value">${project.complexity}</span>
            </div>
            <div class="project-links">
              <a href="${project.demoUrl}" target="_blank">Demo</a>
              <a href="${project.repoUrl}" target="_blank">Repo</a>
              ${
                project.videoUrl
                  ? `
              <a href="${project.videoUrl}" 
                 data-fancybox 
                 data-type="iframe">
                 Video
              </a>`
                  : ""
              }
            </div>
          </div>
          <div class="card-back">
            <p class="project-description">${project.description}</p>
            <div class="project-details">
              ${details}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupNavigation() {
    this.prevButton = document.querySelector(".carousel-nav.prev");
    this.nextButton = document.querySelector(".carousel-nav.next");

    this.prevButton.addEventListener("click", () => this.navigate("prev"));
    this.nextButton.addEventListener("click", () => this.navigate("next"));

    this.updateNavigationVisibility();

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.navigate("prev");
      } else if (e.key === "ArrowRight") {
        this.navigate("next");
      }
    });
  }

  navigate(direction) {
    const newIndex = direction === "next" ? this.activeIndex + 1 : this.activeIndex - 1;

    if (newIndex >= 0 && newIndex < this.projects.length) {
      this.setActiveCard(newIndex);
    }
  }

  setActiveCard(index) {
    if (index < 0 || index >= this.projects.length) return;

    const cards = this.carousel.querySelectorAll(".project-card");
    const track = this.carousel.querySelector(".carousel-track");

    // Flip back any cards that are no longer active
    cards.forEach((card, i) => {
      if (i !== index && card.classList.contains("flipped")) {
        card.classList.remove("flipped");
      }
    });

    cards.forEach((card) => card.classList.remove("active"));
    cards[index].classList.add("active");

    const cardWidth = cards[0].offsetWidth;
    const carouselWidth = this.carousel.offsetWidth;

    // Calculate the offset to center the active card within the carousel
    const totalOffset = cardWidth * index;
    const centerOffset = (carouselWidth - cardWidth) / 2;

    // Apply the transform with easing
    track.style.transform = `translateX(${centerOffset - totalOffset}px)`;

    this.activeIndex = index;
    this.updateNavigationVisibility();
  }

  updateNavigationVisibility() {
    if (this.activeIndex <= 0) {
      this.prevButton.classList.add("disabled");
    } else {
      this.prevButton.classList.remove("disabled");
    }

    if (this.activeIndex >= this.projects.length - 1) {
      this.nextButton.classList.add("disabled");
    } else {
      this.nextButton.classList.remove("disabled");
    }
  }

  initializeFancybox() {
    Fancybox.bind("[data-fancybox]", {
      // Your existing Fancybox options
    });
  }

  setupCards() {
    const cards = this.carousel.querySelectorAll(".project-card");

    // Set up click on inactive cards to navigate to them
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const cardIndex = parseInt(card.dataset.index, 10);

        // Don't handle navigation if clicking on links
        if (e.target.tagName === "A") {
          return;
        }

        // If clicking on an inactive card, make it active
        if (cardIndex !== this.activeIndex) {
          this.setActiveCard(cardIndex);
          e.stopPropagation();
          return;
        }

        // If clicking on the active card (and not on links), flip it
        if (cardIndex === this.activeIndex) {
          card.classList.toggle("flipped");
          e.stopPropagation();
        }
      });
    });
  }

  setupSwipeSupport() {
    const track = this.carousel.querySelector(".carousel-track");

    // Touch events for mobile
    track.addEventListener("touchstart", (e) => {
      this.startX = e.touches[0].clientX;
      this.isSwiping = true;
    });

    track.addEventListener(
      "touchmove",
      (e) => {
        if (!this.isSwiping) return;

        const currentX = e.touches[0].clientX;
        const diffX = this.startX - currentX;

        // Prevent default to disable page scrolling while swiping
        if (Math.abs(diffX) > 5) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    track.addEventListener("touchend", (e) => {
      if (!this.isSwiping) return;

      const endX = e.changedTouches[0].clientX;
      const diffX = this.startX - endX;

      if (Math.abs(diffX) > this.swipeThreshold) {
        if (diffX > 0) {
          // Swipe left, go next
          this.navigate("next");
        } else {
          // Swipe right, go prev
          this.navigate("prev");
        }
      }

      this.isSwiping = false;
    });

    // Mouse events for desktop
    track.addEventListener("mousedown", (e) => {
      this.startX = e.clientX;
      this.isSwiping = true;
      // Prevent text selection while swiping
      e.preventDefault();
    });

    track.addEventListener("mousemove", (e) => {
      if (!this.isSwiping) return;
    });

    track.addEventListener("mouseup", (e) => {
      if (!this.isSwiping) return;

      const endX = e.clientX;
      const diffX = this.startX - endX;

      if (Math.abs(diffX) > this.swipeThreshold) {
        if (diffX > 0) {
          // Swipe left, go next
          this.navigate("next");
        } else {
          // Swipe right, go prev
          this.navigate("prev");
        }
      }

      this.isSwiping = false;
    });

    // Cancel swipe on mouse leave
    track.addEventListener("mouseleave", () => {
      this.isSwiping = false;
    });
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new ProjectsCarousel();
});
