/**
 * Portfolio Website - Main JavaScript
 * Handles language toggle and project filtering
 */

document.addEventListener("DOMContentLoaded", () => {
  initLanguageToggle();
  initProjectFilter();
  initSmoothScroll();
});

/**
 * Language Toggle (CN ↔ EN)
 */
function initLanguageToggle() {
  const toggle = document.getElementById("lang-toggle");
  let isEnglish = localStorage.getItem("lang") === "en";

  // Apply saved language on load
  if (isEnglish) {
    setLanguage("en");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      isEnglish = !isEnglish;
      setLanguage(isEnglish ? "en" : "zh");
      localStorage.setItem("lang", isEnglish ? "en" : "zh");
    });
  }
}

function setLanguage(lang) {
  const zhElements = document.querySelectorAll(".lang-zh");
  const enElements = document.querySelectorAll(".lang-en");

  if (lang === "en") {
    zhElements.forEach((el) => (el.style.display = "none"));
    enElements.forEach((el) => (el.style.display = ""));
    document.documentElement.lang = "en";
  } else {
    zhElements.forEach((el) => (el.style.display = ""));
    enElements.forEach((el) => (el.style.display = "none"));
    document.documentElement.lang = "zh-CN";
  }
}

/**
 * Project Category Filter
 */
function initProjectFilter() {
  const tabs = document.querySelectorAll(".tab-btn");
  const cards = document.querySelectorAll(".project-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Update active tab
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.dataset.category;

      // Filter cards with animation
      cards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.classList.remove("hidden");
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";

          requestAnimationFrame(() => {
            card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          });
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/**
 * Intersection Observer for scroll animations (optional enhancement)
 */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  document.querySelectorAll(".project-card, .section-title").forEach((el) => {
    observer.observe(el);
  });
}
