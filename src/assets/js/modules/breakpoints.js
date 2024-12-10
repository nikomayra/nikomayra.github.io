/**
 * Modern breakpoint management system
 */
class Breakpoint {
  constructor() {
    this.breakpoints = {
      xlarge: [1200, null], // ≥1200px
      large: [992, 1199], // 992px-1199px
      medium: [768, 991], // 768px-991px
      small: [576, 767], // 576px-767px
      xsmall: [320, 575], // 320px-575px
    };
  }

  // Method to get the current breakpoint
  getCurrent() {
    const width = window.innerWidth;

    for (const [key, [min, max]] of Object.entries(this.breakpoints)) {
      if ((min === null || width >= min) && (max === null || width <= max)) {
        return key;
      }
    }
    return 'xsmall'; // Default to xsmall if no breakpoint matches
  }
}

// Export an instance of the Breakpoint class
const breakpointInstance = new Breakpoint();
export default breakpointInstance;
