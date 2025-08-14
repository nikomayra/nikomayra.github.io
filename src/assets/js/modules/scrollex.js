export function scrollex(elements, options = {}) {
  const defaultOptions = {
    top: 0,
    bottom: 0,
    delay: 0,
    mode: "default",
    enter: null,
    leave: null,
    initialize: null,
    terminate: null,
    scroll: null,
  };

  const settings = { ...defaultOptions, ...options };

  // Normalize elements to an array of HTMLElements
  const targets = Array.isArray(elements) ? elements : [elements];

  // Utility to parse top/bottom values which may be numbers (px) or strings like '5vh'
  const parseOffset = (value) => {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed.endsWith("vh")) {
        const n = parseFloat(trimmed);
        return (window.innerHeight * n) / 100;
      }
      if (trimmed.endsWith("px")) {
        return parseFloat(trimmed);
      }
      const n = parseFloat(trimmed);
      return isNaN(n) ? 0 : n;
    }
    return 0;
  };

  const topPx = parseOffset(settings.top);
  const bottomPx = parseOffset(settings.bottom);

  // IntersectionObserver rootMargin shrinks with negative values
  const rootMargin = `${-topPx}px 0px ${-bottomPx}px 0px`;

  let observer = null;

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (typeof settings.enter === "function") settings.enter.call(entry.target);
      } else {
        if (typeof settings.leave === "function") settings.leave.call(entry.target);
      }
    });
  };

  // Initialize callback once
  if (typeof settings.initialize === "function") settings.initialize();

  // Create observer and observe targets
  observer = new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin,
    threshold: settings.mode === "middle" ? 0.5 : 0,
  });

  targets.forEach((el) => {
    if (el instanceof Element) observer.observe(el);
  });

  return {
    destroy: () => {
      if (observer) observer.disconnect();
      if (typeof settings.terminate === "function") settings.terminate();
    },
  };
}
