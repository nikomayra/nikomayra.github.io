import { Fancybox } from "@fancyapps/ui";
import aditu from "../../images/projects/aditu_p.webp";
import agenticWorkbench from "../../images/projects/AW.webp";
import caboh from "../../images/projects/caboh.webp";
import placesCentralZoner from "../../images/projects/PCZ.webp";
import serverlessImageProcessor from "../../images/projects/BG.webp";
import rtc from "../../images/projects/rtc.webp";

class ProjectsCarousel {
  constructor() {
    this.container = document.querySelector(".projects-container");
    this.carousel = document.querySelector(".projects-carousel");

    this.projects = [
      {
        title: "Agentic Workbench",
        subtitle: "Human-governed multi-agent engineering platform",
        image: agenticWorkbench,
        description:
          "Full-stack agent orchestration platform that turns GitHub issues into human-approved draft pull requests. A deterministic FastAPI coordinator manages planning, parallel workers isolated in Git worktrees, protected tool approvals, integration tests, independent review, and bounded repair. MCP repository tools, Celery/Redis durable execution, SSE progress, and repeatable evals measure reliability, latency, token usage, and cost; a 15-run benchmark passed all deterministic checks while exposing the overhead of multi-agent workflows.",
        tech:
          "React|TypeScript|FastAPI|OpenAI Agents SDK|PostgreSQL|MCP",
        details:
          "Celery|Redis|Git Worktrees|Human-in-the-loop|SSE|Pydantic|SQLAlchemy|Docker|GitHub Actions",
        complexity: "⭐⭐⭐⭐⭐",
        websiteUrl: null,
        demoUrl: null,
        repoUrl: "https://github.com/nikomayra/agentic-workbench",
        videoUrl: null,
        reportUrl: null,
      },
      {
        title: "Aditu",
        subtitle: "AI-powered call quality assurance platform",
        image: aditu,
        description:
          "Solo-founded B2B SaaS for recorded-call quality assurance. The platform processes audio batches through transcription and configurable rubric-based AI evaluation, anchors results to transcript evidence, and generates call-level and batch reports with PDF/spreadsheet exports. I owned product discovery, system design, full-stack delivery, vendor benchmarking, Stripe metered billing, pricing, market research, and production operations. Internal benchmarks showed roughly 8x lower cost and 12x faster processing than the manual review baseline, with English and Spanish support. Live operations are paused; the Report includes the full case study, benchmarks, and sample outputs.",
        tech: "Next.js|FastAPI|PostgreSQL|Celery|Redis|Tailwind",
        details:
          "Stripe|Clerk|Cloudflare R2|ElevenLabs|Deepgram|Claude|Docker|GitHub Actions|Sentry|Vercel",
        complexity: "⭐⭐⭐⭐⭐",
        websiteUrl: "https://aditu.app",
        demoUrl: null,
        repoUrl: null,
        videoUrl: null,
        reportUrl:
          "https://drive.google.com/open?id=1XvE_k-gDJtM2Q4Vu0xZoXS3yPuCC9gNF&usp=drive_fs",
      },
      {
        title: "Chat & Sketch",
        subtitle: "Real-time chat and collaborative drawing platform",
        image: rtc,
        description:
          "Full-stack multi-channel collaboration platform built with Go, React/TypeScript, PostgreSQL, and native WebSockets. The backend manages concurrent connections, channel-scoped broadcasting, presence, authentication, file sharing, and REST/WebSocket APIs; the frontend synchronizes chat and Canvas drawing through typed event protocols and custom connection hooks without Socket.IO or external drawing frameworks.",
        tech:
          "Go|React|TypeScript|WebSockets|PostgreSQL|Tailwind",
        details:
          "Gorilla Mux/WebSocket|Docker|Axios|Zod|Jest|Vite|Native Canvas API",
        complexity: "⭐⭐⭐⭐",
        demoUrl: "https://rtc-nb-app.fly.dev/",
        repoUrl: "https://github.com/nikomayra/rtc-nb",
        videoUrl: "https://youtu.be/AIZz2XFL1Kc",
      },
      {
        title: "Bizarre Gallery",
        subtitle: "Azure serverless image processor",
        image: serverlessImageProcessor,
        description:
          "Serverless image-processing demo using Azure Functions and Azure Blob Storage. Users upload images tagged as start, middle, or end; the function selects compatible images, generates a randomized GIF and title, and publishes recent outputs to a static gallery. The project explores event-driven serverless processing through a lightweight generative-art experience.",
        tech:
          "HTML|CSS|JavaScript|Azure Functions|Azure Blob Storage",
        details:
          "ImageSharp|NSFWJS|GitHub Pages|Serverless Processing",
        complexity: "⭐",
        demoUrl: "https://nikomayra.github.io/sl-img-prcr/",
        repoUrl: "https://github.com/nikomayra/sl-img-prcr",
        videoUrl: null,
      },
      {
        title: "Places Central-Zoner",
        subtitle: "Geospatial clustering and optimization platform",
        image: placesCentralZoner,
        description:
          "Public geospatial demo that identifies minimized-radius zones containing at least one of each selected place type. The Flask backend refines noisy Google Places results, clusters nearby duplicates, and compares brute-force, DBSCAN, and K-means approaches using WCSS-based evaluation; the React/TypeScript frontend provides interactive mapping and configurable search-quality controls. An earlier architecture used Google sign-in, Supabase persistence, and Redis before the live demo was simplified for reliability and easier access.",
        tech:
          "React|TypeScript|Flask|scikit-learn|Google Maps/Places APIs",
        details:
          "K-means|DBSCAN|Brute-force Search|WCSS Evaluation|Rate Limiting|Previously: OAuth/Supabase/Redis",
        complexity: "⭐⭐⭐",
        demoUrl: "https://places-central-zoner.onrender.com",
        repoUrl:
          "https://github.com/nikomayra/places-central-zoner",
        videoUrl: "https://youtu.be/gH2cRBy0p8o",
      },
      {
        title: "Caboh: The Game",
        subtitle: "Multiplayer RESTful card game",
        image: caboh,
        description:
          "Turn-based multiplayer card game built after completing Full Stack Open to apply MERN-stack fundamentals. The application models custom game rules and shared player state through RESTful CRUD workflows, with React on the frontend and Node.js, Express, and MongoDB on the backend.",
        tech: "React|Vite|Node.js|Express|MongoDB",
        details:
          "REST API|Mongoose|Axios|Turn-based State Management",
        complexity: "⭐⭐",
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

    requestAnimationFrame(() => {
      this.setupNavigation();
      this.initializeFancybox();
      this.setupCards();

      setTimeout(() => {
        this.setActiveCard(this.activeIndex);
      }, 100);

      this.setupSwipeSupport();
    });
  }

  render() {
    this.carousel.innerHTML = `
      <div class="carousel-track">
        ${this.projects
          .map((project, index) =>
            this.createProjectCard(project, index)
          )
          .join("")}
      </div>
    `;

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
      .map(
        (tech) =>
          `<span class="tech-tag">${tech.trim()}</span>`
      )
      .join("");

    const details = project.details
      .split("|")
      .map(
        (detail) =>
          `<span class="detail">${detail.trim()}</span>`
      )
      .join("");

    return `
      <div class="project-card" data-index="${index}">
        <div class="card-inner">
          <div class="card-front">
            <img
              src="${project.image}"
              alt="${project.title}"
              class="project-image"
            >
            <h3 class="project-title">${project.title}</h3>
            <p class="project-subtitle">${project.subtitle}</p>

            <div class="project-tech-stack">
              ${techTags}
            </div>

            <div class="project-complexity">
              <span class="complexity-label">Complexity:</span>
              <span class="complexity-value">
                ${project.complexity}
              </span>
            </div>

            <div class="project-links">
              ${
                project.websiteUrl
                  ? `<a href="${project.websiteUrl}" target="_blank" rel="noopener noreferrer">Web</a>`
                  : ""
              }

              ${
                project.demoUrl
                  ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">Demo</a>`
                  : ""
              }

              ${
                project.repoUrl
                  ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">Repo</a>`
                  : ""
              }

              ${
                project.videoUrl
                  ? `<a
                       href="${project.videoUrl}"
                       data-fancybox
                       data-type="iframe"
                     >Video</a>`
                  : ""
              }

              ${
                project.reportUrl
                  ? `<a href="${project.reportUrl}" target="_blank" rel="noopener noreferrer">Report</a>`
                  : ""
              }
            </div>
          </div>

          <div class="card-back">
            <p class="project-description">
              ${project.description}
            </p>

            <div class="project-details">
              ${details}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupNavigation() {
    this.prevButton =
      document.querySelector(".carousel-nav.prev");

    this.nextButton =
      document.querySelector(".carousel-nav.next");

    this.prevButton.addEventListener("click", () => {
      this.navigate("prev");
    });

    this.nextButton.addEventListener("click", () => {
      this.navigate("next");
    });

    this.updateNavigationVisibility();

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.navigate("prev");
      } else if (event.key === "ArrowRight") {
        this.navigate("next");
      }
    });
  }

  navigate(direction) {
    const newIndex =
      direction === "next"
        ? this.activeIndex + 1
        : this.activeIndex - 1;

    if (
      newIndex >= 0 &&
      newIndex < this.projects.length
    ) {
      this.setActiveCard(newIndex);
    }
  }

  setActiveCard(index) {
    if (
      index < 0 ||
      index >= this.projects.length
    ) {
      return;
    }

    const cards =
      this.carousel.querySelectorAll(".project-card");

    const track =
      this.carousel.querySelector(".carousel-track");

    cards.forEach((card, cardIndex) => {
      if (
        cardIndex !== index &&
        card.classList.contains("flipped")
      ) {
        card.classList.remove("flipped");
      }
    });

    cards.forEach((card) => {
      card.classList.remove("active");
    });

    cards[index].classList.add("active");

    const cardWidth = cards[0].offsetWidth;
    const carouselWidth = this.carousel.offsetWidth;
    const totalOffset = cardWidth * index;
    const centerOffset =
      (carouselWidth - cardWidth) / 2;

    track.style.transform =
      `translateX(${centerOffset - totalOffset}px)`;

    this.activeIndex = index;
    this.updateNavigationVisibility();
  }

  updateNavigationVisibility() {
    if (this.activeIndex <= 0) {
      this.prevButton.classList.add("disabled");
    } else {
      this.prevButton.classList.remove("disabled");
    }

    if (
      this.activeIndex >=
      this.projects.length - 1
    ) {
      this.nextButton.classList.add("disabled");
    } else {
      this.nextButton.classList.remove("disabled");
    }
  }

  initializeFancybox() {
    Fancybox.bind("[data-fancybox]", {});
  }

  setupCards() {
    const cards =
      this.carousel.querySelectorAll(".project-card");

    cards.forEach((card) => {
      card.addEventListener("click", (event) => {
        const cardIndex = Number.parseInt(
          card.dataset.index,
          10
        );

        if (event.target.tagName === "A") {
          return;
        }

        if (cardIndex !== this.activeIndex) {
          this.setActiveCard(cardIndex);
          event.stopPropagation();
          return;
        }

        card.classList.toggle("flipped");
        event.stopPropagation();
      });
    });
  }

  setupSwipeSupport() {
    const track =
      this.carousel.querySelector(".carousel-track");

    track.addEventListener("touchstart", (event) => {
      this.startX = event.touches[0].clientX;
      this.isSwiping = true;
    });

    track.addEventListener(
      "touchmove",
      (event) => {
        if (!this.isSwiping) return;

        const currentX =
          event.touches[0].clientX;

        const diffX =
          this.startX - currentX;

        if (Math.abs(diffX) > 5) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    track.addEventListener("touchend", (event) => {
      if (!this.isSwiping) return;

      const endX =
        event.changedTouches[0].clientX;

      const diffX =
        this.startX - endX;

      if (
        Math.abs(diffX) >
        this.swipeThreshold
      ) {
        if (diffX > 0) {
          this.navigate("next");
        } else {
          this.navigate("prev");
        }
      }

      this.isSwiping = false;
    });

    track.addEventListener("mousedown", (event) => {
      this.startX = event.clientX;
      this.isSwiping = true;
      event.preventDefault();
    });

    track.addEventListener("mousemove", () => {
      if (!this.isSwiping) return;
    });

    track.addEventListener("mouseup", (event) => {
      if (!this.isSwiping) return;

      const endX = event.clientX;
      const diffX = this.startX - endX;

      if (
        Math.abs(diffX) >
        this.swipeThreshold
      ) {
        if (diffX > 0) {
          this.navigate("next");
        } else {
          this.navigate("prev");
        }
      }

      this.isSwiping = false;
    });

    track.addEventListener("mouseleave", () => {
      this.isSwiping = false;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ProjectsCarousel();
});
