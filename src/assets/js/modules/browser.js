/**
 * Modern browser detection and feature testing utility
 */
class Browser {
  constructor() {
    this.name = null;
    this.version = null;
    this.os = null;
    this.osVersion = null;
    this.touch = null;
    this.mobile = null;
    this._canUse = null;
    this.init();
  }

  /**
   * Initialize browser detection
   */
  init() {
    // Get user agent
    const ua = navigator.userAgent;

    // Detect browser name and version
    if (/Edge\//.test(ua)) {
      this.name = 'edge';
      this.version = /Edge\/([0-9\.]+)/.exec(ua)[1];
    } else if (/Chrome\//.test(ua)) {
      this.name = 'chrome';
      this.version = /Chrome\/([0-9\.]+)/.exec(ua)[1];
    } else if (/Safari\//.test(ua)) {
      this.name = 'safari';
      this.version = /Version\/([0-9\.]+)/.exec(ua)[1];
    } else if (/Firefox\//.test(ua)) {
      this.name = 'firefox';
      this.version = /Firefox\/([0-9\.]+)/.exec(ua)[1];
    } else if (/MSIE/.test(ua)) {
      this.name = 'ie';
      this.version = /MSIE ([0-9]+)/.exec(ua)[1];
    }

    // Detect OS
    if (/Windows/.test(ua)) {
      this.os = 'windows';
      this.osVersion = /Windows NT ([0-9\.]+)/.exec(ua)[1];
    } else if (/Mac/.test(ua)) {
      this.os = 'mac';
    } else if (/Linux/.test(ua)) {
      this.os = 'linux';
    } else if (/Android/.test(ua)) {
      this.os = 'android';
    } else if (/iOS/.test(ua)) {
      this.os = 'ios';
    }

    // Detect touch capability
    this.touch = (
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof DocumentTouch)
    );

    // Detect mobile
    this.mobile = (
      this.os === 'android' ||
      this.os === 'ios' ||
      /(Android|iPhone|iPad|iPod)/.test(ua)
    );
  }

  /**
   * Check if a specific feature is supported
   * @param {string} property - CSS property or feature to test
   * @returns {boolean} Whether the feature is supported
   */
  canUse(property) {
    // Create cache if it doesn't exist
    if (this._canUse === null) {
      this._canUse = new Map();
    }

    // Check cache
    if (this._canUse.has(property)) {
      return this._canUse.get(property);
    }

    // Test for feature support
    let result;
    switch (property) {
      case 'object-fit':
        result = 'objectFit' in document.documentElement.style;
        break;
        
      case 'css-animations':
        result = 'animation' in document.documentElement.style || 
                'webkitAnimation' in document.documentElement.style;
        break;
        
      case 'css-transitions':
        result = 'transition' in document.documentElement.style || 
                'webkitTransition' in document.documentElement.style;
        break;
        
      case 'css-transforms':
        result = 'transform' in document.documentElement.style || 
                'webkitTransform' in document.documentElement.style;
        break;
        
      default:
        result = false;
    }

    // Cache result
    this._canUse.set(property, result);
    return result;
  }
}

// Create and export singleton instance
export default new Browser();
