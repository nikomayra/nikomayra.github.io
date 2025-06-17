import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

class Testimonials {
  constructor() {
    this.container = document.querySelector("#seven .testimonials-container");
    if (!this.container) return;

    this.testimonialsData = [
      {
        quote:
          "Nick is one of the most creative problem solvers I’ve seen. Nick proved to be one of the smartest and most forward-thinking engineers on our team. He was always the go-to guy for the most difficult mechanical design assignments, and he was able to deliver high-quality work under tight deadlines.",
        author: "Dave Greenfield",
        title: "Principal Design Engineer, Lockheed Martin",
      },
      {
        quote:
          "Nick is a rare blend of talent, diligence, and creativity. Any organization would benefit from his technical prowess and growth mindset. I strongly endorse their candidacy and welcome further inquiries.",
        author: "Dante Garin",
        title: "Director of Engineering, Sentrica",
      },
      {
        quote:
          "It’s rare to find developers who truly understand the problem and can translate that understanding into an effective technical solution - but Nick is one of them. Beyond his technical skills, he’s professional, reliable, and easy to work with. I’d recommend him for any project or team.",
        author: "Adam Durrin",
        title: "CEO, Aurox",
      },
      {
        quote:
          "As a leader, Nick has brought his vision to the model-based team, guiding them to create novel design formats and automated CAD tools. He also oversaw the revamping of the training, making it more scalable and searchable. The deployed product has received rave reviews from users and senior management alike.",
        author: "Edwin Vasquez",
        title: "Mechanical Engineering Manager, Lockheed Martin",
      },
      {
        quote:
          "He was one of the top three students in my class. He was very independent and matured – always tried to understand and solve problems on his own – which gave him a good depth of the subject. He was very cooperative with other students and his team spirit was impressive.",
        author: "Dr. Hassan Mahfuz",
        title: "Director of Nanocomposites Laboratory, Florida Atlantic University",
      },
      {
        quote: "He is a very intelligent individual who always strides to do his best in all his endeavors.",
        author: "Dr. Davood Moslemian",
        title: "Associate Professor of Mech. Eng., Florida Atlantic University",
      },
      {
        quote:
          "He is a self-starter who responds well to schedule pressure. He communicates crisply and accurately. He is a pleasant person who functions well in a team setting.",
        author: "Aaron Schuman",
        title: "Mechanical Engineer Senior Staff, Lockheed Martin",
      },
      {
        quote:
          'Nick is a natural leader who can always be counted on. I am extremely impressed by Nick\'s organizational skills. He knows what actions absolutely "must be" done in a given day in order to meet their goals. Nick is very talented Engineer with outstanding potential.',
        author: "Paul Self",
        title: "Quality Engineering Manager, Lockheed Martin",
      },
      {
        quote:
          "Nikolas is highly organized and ensures that all issues are tracked to completion and resolved before they become impediments to forward progress. He works as a leader among his peers and he is eager to participate in Engineering forums among some of the brightest Senior Engineers.",
        author: "Clifford Porazynski",
        title: "Systems Engineer Senior Staff, Lockheed Martin",
      },
    ];

    this.init();
  }

  init() {
    this.render();
    this.initSwiper();
  }

  render() {
    // Clear previous content
    this.container.innerHTML = "";

    // Create Swiper container structure
    const swiperEl = document.createElement("div");
    swiperEl.className = "swiper testimonials-swiper";

    const swiperWrapper = document.createElement("div");
    swiperWrapper.className = "swiper-wrapper";
    swiperEl.appendChild(swiperWrapper);

    // Add slides - duplicate them to ensure smooth looping
    this.testimonialsData.forEach((testimonial) => {
      const slide = this.createTestimonialSlide(testimonial);
      swiperWrapper.appendChild(slide);
    });

    // Add duplicate slides to ensure smooth looping
    this.testimonialsData.forEach((testimonial) => {
      const slide = this.createTestimonialSlide(testimonial);
      swiperWrapper.appendChild(slide);
    });

    this.container.appendChild(swiperEl);
  }

  createTestimonialSlide(testimonial) {
    const slide = document.createElement("div");
    slide.className = "swiper-slide testimonial-card";

    slide.innerHTML = `
      <div class="testimonial-quote">"${testimonial.quote}"</div>
      <div class="testimonial-author-info">
        <div class="testimonial-author">${testimonial.author}</div>
        <div class="testimonial-title">${testimonial.title}</div>
      </div>
    `;

    return slide;
  }

  initSwiper() {
    // Initialize Swiper with minimal configuration for reliable performance
    this.swiper = new Swiper(".testimonials-swiper", {
      modules: [Autoplay],
      slidesPerView: "auto",
      spaceBetween: 20,
      loop: true,
      speed: 5000,
      grabCursor: true,
      a11y: false,
      freeMode: true,
      autoplay: {
        delay: 0.5,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    });

    // Implement manual infinite loop behavior
    this.swiper.on("reachEnd", () => {
      // When we reach the end, quietly reset to the start
      this.swiper.slideTo(0, 0, false);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Testimonials();
});

export default Testimonials;
