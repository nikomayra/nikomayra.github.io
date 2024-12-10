import { Fancybox } from '@fancyapps/ui';
import caboh from '../../images/projects/caboh.png';
import placesCentralZoner from '../../images/projects/PCZ.png';
import serverlessImageProcessor from '../../images/projects/BG.png';
import rtc from '../../images/projects/rtc.jpg';
import tbd from '../../images/projects/pic03.jpg';

class ProjectsCarousel {
  constructor() {
    this.container = document.querySelector('.projects-container');
    this.carousel = document.querySelector('.projects-carousel');
    this.projects = [
      {
        title: 'Project 5',
        subtitle: 'TBD',
        image: tbd,
        description: 'TBD TBD TBD TBD TBD TBD TBD TBD TBD TBD',
        tech: 'TBD|TBD|TBD|TBD|TBD|TBD',
        details: 'TBD|TBD|TBD|TBD|TBD|TBD',
        complexity: '⭐⭐⭐⭐',
        demoUrl: 'TBD',
        repoUrl: 'TBD',
        videoUrl: null,
      },
      {
        title: 'Project 4',
        subtitle: 'Real-time chat & sketch',
        image: rtc,
        description: 'TBD TBD TBD TBD TBD TBD TBD TBD TBD TBD',
        tech: 'Go Lang|React|Websockets|PostgreSQL|Redis',
        details: 'Gorilla Websockets|Go-Redis|Axios|TBD|TBD|TBD',
        complexity: '⭐⭐⭐⭐⭐',
        demoUrl: 'TBD',
        repoUrl: 'https://github.com/nikomayra/rtc-nb',
        videoUrl: null,
      },
      {
        title: 'Serverless Image Processor',
        subtitle: 'Azure Serverless Architecture',
        image: serverlessImageProcessor,
        description:
          'Serverless image processor using a Azure Function App and Azure Blob Storage. Users can upload images tagged with start/middle/end from the frontend. The Function App takes 3 uploaded images, (if available) selects 1 each of start/middle/end tagged images randomly, generates a Gif, and assigns a random title. On load of the static frontend the last 20 gifs are loaded from the server. Just a tech demo showing some serverless image processing architecture turned into a fun little art project.',
        tech: 'HTML|CSS|JS|Azure Functions|Azure Blob Storage|AI/ML',
        details: 'Imagesharp|NSFWJS|Git Pages',
        complexity: '⭐⭐',
        demoUrl: 'https://nikomayra.github.io/sl-img-prcr/',
        repoUrl: 'https://github.com/nikomayra/sl-img-prcr',
        videoUrl: null,
      },
      {
        title: 'Places Central-Zoner',
        subtitle: 'Location-based Web Application',
        image: placesCentralZoner,
        description:
          'Places Central Zoner is a web application that finds central zones which each contain at least one of each searched location within a minimized radius. For example, search for LA Fitness, Chipotle and Starbucks within the greater Seattle area and it will draw circular zones with a center point which is at a minimum distance to each of those three stores. In other words, this app helps find geographical areas which are minimally near at least one of each searched place. When I was living out of my car the original need was to find ideal areas to situate myself such that I had access to a multitude of places.',
        tech: 'MUI|Vite|React.ts|Flask|PostgreSQL|Google APIs|Google OAuth2.0',
        details:
          'K-Means/DBSCAN Clustering|OAuth Implicit Flow|Flask SQLAlchemy|Google Maps/Location APIs',
        complexity: '⭐⭐⭐⭐',
        demoUrl: 'https://places-central-zoner.onrender.com',
        repoUrl: 'https://github.com/nikomayra/places-central-zoner',
        videoUrl: 'https://youtu.be/gH2cRBy0p8o',
      },
      {
        title: 'Caboh: The Game',
        subtitle: 'Multiplayer Card Game',
        image: caboh,
        description:
          'This was my first project after completing the Fullstack Open fullstack coding bootcamp which focused on the MERN stack using REST API structure and CRUD style operations. My friend group used to like playing a card game called Cabo which is based on the game Golf or Cabo with our own extra rules. I felt it was a good game to practice implementing what I learned since the game is turn based and doesn\'t rely on dynamic "live" elements all players need to see and where websockets would be a better tool.',
        tech: 'Vite|React.js|Node.js|Express|MongoDB',
        details: 'RESTful|Mongoose|Axios',
        complexity: '⭐⭐⭐',
        demoUrl: 'https://caboh.onrender.com',
        repoUrl: 'https://github.com/nikomayra/caboh',
        videoUrl: 'https://youtu.be/JCAG6QyIfGM',
      },
    ];
    this.activeIndex = 0;
    this.init();
  }

  init() {
    this.render();
    // Wait for next frame to ensure DOM and styles are fully applied
    requestAnimationFrame(() => {
      this.setupNavigation();
      this.initializeFancybox();
      this.setupCardFlip();
      this.setActiveCard(this.activeIndex);
    });
  }

  render() {
    this.carousel.innerHTML = `
      <div class="carousel-track">
        ${this.projects.map((project, index) => this.createProjectCard(project, index)).join('')}
      </div>
    `;

    this.container.insertAdjacentHTML(
      'beforeend',
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
      .split('|')
      .map((tech) => `<span class="tech-tag">${tech.trim()}</span>`)
      .join('');
    const details = project.details
      .split('|')
      .map((detail) => `<span class="detail">${detail.trim()}</span>`)
      .join('');
    return `
      <div class="project-card">
        <div class="card-inner">
          <div class="card-front">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-subtitle">${project.subtitle}</p>
            <div class="project-tech-stack">
              ${techTags}
            </div>
            <div class="project-complexity">
              <span class="complexity-label">Relative Complexity:</span>
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
                  : ''
              }
            </div>
            <i class="flip-icon"></i>
          </div>
          <div class="card-back">
            <p class="project-description">${project.description}</p>
            <div class="project-details">
              ${details}
            </div>
            <i class="flip-icon"></i>
          </div>
        </div>
      </div>
    `;
  }

  setupNavigation() {
    this.prevButton = document.querySelector('.carousel-nav.prev');
    this.nextButton = document.querySelector('.carousel-nav.next');

    this.prevButton.addEventListener('click', () => this.navigate('prev'));
    this.nextButton.addEventListener('click', () => this.navigate('next'));

    this.updateNavigationVisibility();
  }

  navigate(direction) {
    const newIndex = direction === 'next' ? this.activeIndex + 1 : this.activeIndex - 1;

    if (newIndex >= 0 && newIndex < this.projects.length) {
      this.setActiveCard(newIndex);
    }
  }

  setActiveCard(index) {
    const cards = this.carousel.querySelectorAll('.project-card');
    const track = this.carousel.querySelector('.carousel-track');

    cards.forEach((card) => card.classList.remove('active'));
    cards[index].classList.add('active');

    const cardWidth = cards[0].offsetWidth;
    const carouselWidth = this.carousel.offsetWidth;

    // Calculate the offset to center the active card within the carousel
    const totalOffset = cardWidth * index;
    const centerOffset = (carouselWidth - cardWidth) / 2;

    track.style.transform = `translateX(${centerOffset - totalOffset}px)`;

    this.activeIndex = index;
    this.updateNavigationVisibility();
  }

  updateNavigationVisibility() {
    if (this.activeIndex <= 0) {
      this.prevButton.classList.add('disabled');
    } else {
      this.prevButton.classList.remove('disabled');
    }

    if (this.activeIndex >= this.projects.length - 1) {
      this.nextButton.classList.add('disabled');
    } else {
      this.nextButton.classList.remove('disabled');
    }
  }

  initializeFancybox() {
    Fancybox.bind('[data-fancybox]', {
      // Your existing Fancybox options
    });
  }

  setupCardFlip() {
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        // Don't flip if clicking on a link
        if (e.target.tagName === 'A') return;

        card.classList.toggle('flipped');
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProjectsCarousel();
});
