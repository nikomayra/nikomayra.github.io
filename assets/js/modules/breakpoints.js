/**
 * Modern breakpoint management system
 */
class Breakpoint {
  constructor() {
    this.breakpoints = {
      xlarge: [1281, 1680],
      large: [1025, 1280],
      medium: [737, 1024],
      small: [481, 736],
      xsmall: [null, 480],
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
    return null; // Return null if no breakpoint matches
  }
}

// Export an instance of the Breakpoint class
const breakpointInstance = new Breakpoint();
export default breakpointInstance;
