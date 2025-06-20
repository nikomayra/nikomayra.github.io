import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { createNavList, createPanel } from "./modules/navigation.js";
import { applyPlaceholderPolyfill, prioritizeElements } from "./modules/forms.js";
import { scrolly } from "./modules/scrolly.js";
import { scrollex } from "./modules/scrollex.js";
import breakpointInstance from "./modules/breakpoints.js";

// Initialize Fancybox
Fancybox.bind("[data-fancybox]", {
  // Your Fancybox options here
});

// Import other visualization modules
import "./components/worldTour.js";
import "./components/skills.js";
import "./components/usTour.js";
import "./components/projects.js";
import "./components/workExperience.js";
import "./components/education.js";
import "./components/testimonials.js";
import "./components/contact.js";

// DOM Elements
const $window = window;
const $body = document.body;
const $header = document.getElementById("header");

// Initialize navigation
document.querySelectorAll(".nav").forEach((nav) => {
  nav.innerHTML = createNavList(nav);
});

// Initialize panels
document.querySelectorAll(".panel").forEach((panel) => {
  createPanel(panel);
});

// Apply form polyfills
document.querySelectorAll("form").forEach((form) => {
  applyPlaceholderPolyfill(form);
});

// Play initial animations on page load
$window.addEventListener("load", () => {
  setTimeout(() => {
    $body.classList.remove("is-preload");
  }, 100);
});

// Create Title Bar
const titleBar = document.createElement("div");
titleBar.id = "titleBar";
titleBar.innerHTML = `
  <a href="#" class="toggle"></a>
  <span class="title">${document.getElementById("logo").innerHTML}</span>
`;
$body.appendChild(titleBar);

// Handle side panel toggle
function toggleNavPanel() {
  $header.classList.toggle("header-visible");
}

// Event listener for the toggle button
const $titleBarToggle = titleBar.querySelector(".toggle");
if ($titleBarToggle) {
  $titleBarToggle.addEventListener("click", (e) => {
    e.preventDefault();
    toggleNavPanel();
  });
}

// Function to check and set header visibility based on breakpoints
function checkHeaderVisibility() {
  const currentBreakpoint = breakpointInstance.getCurrent();
  const wasVisible = $header.classList.contains("header-visible");

  if (currentBreakpoint === "large" || currentBreakpoint === "xlarge") {
    if (!wasVisible) {
      // Store the pre-large state if we're just crossing into large
      if (!$header.dataset.wasVisibleBeforeLarge) {
        $header.dataset.wasVisibleBeforeLarge = "false";
      }
      $header.classList.add("header-visible");
    }
  } else {
    // When going below large breakpoint, restore previous state
    if ($header.dataset.wasVisibleBeforeLarge === "false") {
      $header.classList.remove("header-visible");
    }
  }

  // Store visibility state when entering large breakpoint
  if (currentBreakpoint === "large" || currentBreakpoint === "xlarge") {
    if (!$header.dataset.wasVisibleBeforeLarge) {
      $header.dataset.wasVisibleBeforeLarge = wasVisible.toString();
    }
  } else {
    // Reset the stored state when leaving large/xlarge
    delete $header.dataset.wasVisibleBeforeLarge;
  }
}

// Initialize visibility tracking
$header.dataset.wasVisibleBeforeLarge = $header.classList.contains("header-visible").toString();

// Check visibility on load and resize
$window.addEventListener("load", checkHeaderVisibility);
$window.addEventListener("resize", checkHeaderVisibility);

// Smooth scrolling for navigation links
scrolly("#nav a", {
  speed: 1000,
  offset: function () {
    if (breakpoints.active("<=medium")) return titleBar.offsetHeight;
    return 0;
  },
});

// Initialize Scrollex for each navigation link
const $navLinks = document.querySelectorAll("#nav a");

$navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  const section = document.querySelector(href);

  if (section) {
    scrollex([section], {
      mode: "middle",
      top: "5vh",
      bottom: "5vh",
      initialize: function () {
        section.classList.add("inactive");
      },
      enter: function () {
        section.classList.remove("inactive");

        // Check if any link is locked
        if (!document.querySelector(".active-locked")) {
          $navLinks.forEach((navLink) => navLink.classList.remove("active"));
          link.classList.add("active");
        } else if (link.classList.contains("active-locked")) {
          link.classList.remove("active-locked");
        }
      },
    });

    // Add click event to the link
    link.addEventListener("click", function (e) {
      if (href.charAt(0) !== "#") return; // External link
      e.preventDefault();

      // Remove active class from all links
      $navLinks.forEach((navLink) => navLink.classList.remove("active"));
      link.classList.add("active");
      link.classList.add("active-locked"); // Lock the link

      // Smooth scroll to section
      section.scrollIntoView({ behavior: "smooth" });
    });
  }
});

// Highlight active section on scroll
$window.addEventListener("scroll", () => {
  let scrollPosition = $window.scrollY + 50; // Adjust offset as needed

  $navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        $navLinks.forEach((navLink) => navLink.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
});

function updateNavScrollIndicators() {
  const nav = document.querySelector("#header nav");
  const wrapper = nav.parentElement;

  requestAnimationFrame(() => {
    const scrollTop = Math.round(nav.scrollTop);
    const scrollHeight = Math.round(nav.scrollHeight);
    const clientHeight = Math.round(nav.clientHeight);

    wrapper.classList.toggle("is-scrollable-top", scrollTop > 0);
    wrapper.classList.toggle("is-scrollable-bottom", scrollTop + clientHeight < scrollHeight);
  });
}

// Update indicators on important events
const nav = document.querySelector("#header nav");
nav.addEventListener("scroll", updateNavScrollIndicators);
window.addEventListener("resize", () => {
  requestAnimationFrame(updateNavScrollIndicators);
});
window.addEventListener("load", updateNavScrollIndicators);

// Add mutation observer to handle dynamic content changes
const observer = new MutationObserver(() => {
  requestAnimationFrame(updateNavScrollIndicators);
});

observer.observe(nav, {
  childList: true,
  subtree: true,
  characterData: true,
});
