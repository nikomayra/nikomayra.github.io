class Contact {
  constructor() {
    this.contactForm = document.getElementById("contact-form");
    this.formMessage = document.getElementById("form-message");
    this.backToTopButton = document.querySelector(".back-to-top");

    if (this.contactForm) {
      this.initFormHandlers();
    }

    if (this.backToTopButton) {
      this.initBackToTopButton();
    }
  }

  initFormHandlers() {
    // Form submission handler
    this.contactForm.addEventListener("submit", this.handleFormSubmit.bind(this));

    // Form input animations
    const formInputs = this.contactForm.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        input.parentElement.parentElement.classList.remove("focused");

        // Add 'filled' class if the input has a value
        if (input.value.trim() !== "") {
          input.parentElement.parentElement.classList.add("filled");
        } else {
          input.parentElement.parentElement.classList.remove("filled");
        }
      });

      // Check initial state in case of pre-filled inputs
      if (input.value.trim() !== "") {
        input.parentElement.parentElement.classList.add("filled");
      }
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      this.showFormMessage("Please fill out all fields.", "error");
      return;
    }

    // Email validation
    if (!this.isValidEmail(email)) {
      this.showFormMessage("Please enter a valid email address.", "error");
      return;
    }

    // Show loading state
    const submitBtn = this.contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Submit form using FormSpree
    const formData = new FormData(this.contactForm);

    fetch(this.contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          // Success
          this.contactForm.reset();
          this.showFormMessage("Message sent successfully! I'll get back to you soon.", "success");
        } else {
          // Error
          this.showFormMessage("Something went wrong. Please try again.", "error");
        }
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        this.showFormMessage("Something went wrong. Please try again.", "error");
      })
      .finally(() => {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      });
  }

  showFormMessage(message, type) {
    if (!this.formMessage) return;

    this.formMessage.textContent = message;
    this.formMessage.className = `form-message ${type}`;

    // Add visible class after a small delay (for animation)
    setTimeout(() => {
      this.formMessage.classList.add("visible");
    }, 10);

    // Hide message after a delay
    setTimeout(() => {
      this.formMessage.classList.remove("visible");
    }, 5000);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  initBackToTopButton() {
    // Click handler
    this.backToTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        this.backToTopButton.classList.add("visible");
      } else {
        this.backToTopButton.classList.remove("visible");
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Contact();
});

export default Contact;
