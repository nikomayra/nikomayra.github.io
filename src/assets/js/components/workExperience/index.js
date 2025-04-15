import CompanyGrid from "./companyGrid.js";

class WorkExperienceDemo {
  constructor() {
    this.container = document.querySelector("#work-experience-demo");
    if (!this.container) return;
    this.init();
  }

  init() {
    this.renderView();
  }

  renderView() {
    // Create a container for the grid view
    const viewContainer = document.createElement("div");
    viewContainer.className = "company-grid-container";
    this.container.appendChild(viewContainer);
    new CompanyGrid();
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new WorkExperienceDemo();
});

export default WorkExperienceDemo;
