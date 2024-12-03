export function scrolly(selector, options = {}) {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  elements.forEach((element) => {
    const href = element.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return;

    const defaultOptions = {
      anchor: 'top',
      easing: 'ease-in-out',
      offset: 0,
      speed: 1000,
    };

    const settings = { ...defaultOptions, ...options };

    element.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - settings.offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
}
