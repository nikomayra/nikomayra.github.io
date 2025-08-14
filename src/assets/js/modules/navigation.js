/**
 * Generate an indented list of links from a nav element
 * @param {HTMLElement} element - The navigation element to process
 * @returns {string} HTML string of processed navigation links
 */
export function createNavList(element) {
  const links = element.querySelectorAll("a");
  return Array.from(links)
    .map((link) => {
      const indent = Math.max(0, link.closest("li")?.parentElement?.children.length ?? 0);
      const href = link.getAttribute("href");
      const target = link.getAttribute("target");

      return `
        <a 
          class="link depth-${indent}"
          ${target ? ` target="${target}"` : ""}
          ${href ? ` href="${href}"` : ""}
        >
          <span class="indent-${indent}"></span>
          ${link.textContent}
        </a>
      `;
    })
    .join("");
}

/**
 * Panel functionality for an element
 * @param {HTMLElement} element - The element to panelize
 * @param {Object} userConfig - Configuration options
 */
export function createPanel(element, userConfig = {}) {
  if (!element) return;

  const config = {
    delay: 0,
    hideOnClick: false,
    hideOnEscape: false,
    hideOnSwipe: false,
    resetScroll: false,
    resetForms: false,
    side: null,
    target: element,
    visibleClass: "visible",
    ...userConfig,
  };

  // Convert target to HTMLElement if it's a selector
  if (typeof config.target === "string") {
    config.target = document.querySelector(config.target);
  }

  const hide = (event) => {
    if (!config.target.classList.contains(config.visibleClass)) return;

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    config.target.classList.remove(config.visibleClass);

    setTimeout(() => {
      if (config.resetScroll) element.scrollTop = 0;
      if (config.resetForms) {
        element.querySelectorAll("form").forEach((form) => form.reset());
      }
    }, config.delay);
  };

  // Touch handling
  let touchStartX = null;
  let touchStartY = null;

  const handleTouchStart = (event) => {
    touchStartX = event.touches[0].pageX;
    touchStartY = event.touches[0].pageY;
  };

  const handleTouchMove = (event) => {
    if (touchStartX === null || touchStartY === null) return;

    const diffX = touchStartX - event.touches[0].pageX;
    const diffY = touchStartY - event.touches[0].pageY;
    const boundary = 20;
    const delta = 50;

    // Swipe handling
    if (config.hideOnSwipe) {
      let result = false;

      switch (config.side) {
        case "left":
          result = diffY < boundary && diffY > -boundary && diffX > delta;
          break;
        case "right":
          result = diffY < boundary && diffY > -boundary && diffX < -delta;
          break;
        case "top":
          result = diffX < boundary && diffX > -boundary && diffY > delta;
          break;
        case "bottom":
          result = diffX < boundary && diffX > -boundary && diffY < -delta;
          break;
      }

      if (result) {
        touchStartX = null;
        touchStartY = null;
        hide();
        return;
      }
    }

    // Prevent vertical scrolling past boundaries
    const height = element.offsetHeight;
    const scrollHeight = element.scrollHeight;

    if ((element.scrollTop <= 0 && diffY < 0) || (scrollHeight - height <= element.scrollTop + 2 && diffY > 0)) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  // Event Listeners
  element.style.msOverflowStyle = "-ms-autohiding-scrollbar";
  element.style.webkitOverflowScrolling = "touch";

  if (config.hideOnClick) {
    element.querySelectorAll("a").forEach((a) => {
      a.style.webkitTapHighlightColor = "rgba(0,0,0,0)";

      a.addEventListener("click", (event) => {
        const href = a.getAttribute("href");
        const target = a.getAttribute("target");

        if (!href || href === "#" || href === "" || href === `#${element.id}`) return;

        event.preventDefault();
        event.stopPropagation();

        hide();

        setTimeout(() => {
          if (target === "_blank") {
            window.open(href);
          } else {
            window.location.href = href;
          }
        }, config.delay + 10);
      });
    });
  }

  // Touch events
  element.addEventListener("touchstart", handleTouchStart, { passive: true });
  element.addEventListener("touchmove", handleTouchMove, { passive: false });

  // Prevent event bubbling
  ["click", "touchend", "touchstart", "touchmove"].forEach((eventType) => {
    element.addEventListener(eventType, (e) => e.stopPropagation());
  });

  // Hide panel on anchor click
  element.querySelectorAll(`a[href="#${element.id}"]`).forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      hide();
    });
  });

  return {
    element,
    hide,
    config,
  };
}
