export function scrollex(elements, options = {}) {
  const defaultOptions = {
    top: 0,
    bottom: 0,
    delay: 0,
    mode: 'default',
    enter: null,
    leave: null,
    initialize: null,
    terminate: null,
    scroll: null,
  };

  const settings = { ...defaultOptions, ...options };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      const elementBottom = elementTop + element.offsetHeight;

      const isInView =
        scrollTop + window.innerHeight >= elementTop + settings.top &&
        scrollTop <= elementBottom - settings.bottom;

      if (isInView) {
        if (settings.enter) settings.enter.call(element);
      } else {
        if (settings.leave) settings.leave.call(element);
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  if (settings.initialize) settings.initialize();

  return {
    destroy: () => {
      window.removeEventListener('scroll', handleScroll);
      if (settings.terminate) settings.terminate();
    },
  };
}
