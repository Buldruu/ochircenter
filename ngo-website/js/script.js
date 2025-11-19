// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navMenu.style.display =
        navMenu.style.display === "flex" ? "none" : "flex";
      navMenu.style.position = "absolute";
      navMenu.style.top = "80px";
      navMenu.style.left = "0";
      navMenu.style.right = "0";
      navMenu.style.flexDirection = "column";
      navMenu.style.backgroundColor = "#ffffff";
      navMenu.style.gap = "0";
      navMenu.style.padding = "1rem";
    });
  }

  // Close mobile menu when a link is clicked
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navMenu) {
        navMenu.style.display = "auto";
      }
    });
  });

  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showMessage("Thank you for contacting us! We will get back to you soon.");
      contactForm.reset();
    });
  }
});

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Show message popup
function showMessage(message) {
  alert(message);
}

// Add scroll animation for elements
window.addEventListener("scroll", function () {
  const cards = document.querySelectorAll(
    ".project-card, .stat, .mission-box, .involvement-card"
  );

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 50;

    if (isVisible) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// Highlight active navigation link
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Add counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger counter animation when stats section is in view
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const stats = entry.target.querySelectorAll(".stat h3");
      stats.forEach((stat) => {
        const number = parseInt(stat.textContent);
        if (!isNaN(number)) {
          animateCounter(stat, number);
        }
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Find about section and observe it
const aboutSection = document.querySelector(".about");
if (aboutSection) {
  observer.observe(aboutSection);
}

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowDown") {
    window.scrollBy(0, 100);
  } else if (e.key === "ArrowUp") {
    window.scrollBy(0, -100);
  }
});

// Scroll to top button (hidden by default, shown on scroll)
let scrollTopBtn = document.createElement("button");
scrollTopBtn.textContent = "⬆";
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: 0.3s ease;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

scrollTopBtn.addEventListener("mouseover", function () {
  this.style.transform = "scale(1.1)";
});

scrollTopBtn.addEventListener("mouseout", function () {
  this.style.transform = "scale(1)";
});

// Initial animations
window.addEventListener("load", function () {
  const elements = document.querySelectorAll(
    ".hero-content h1, .hero-content p"
  );
  elements.forEach((el, index) => {
    el.style.opacity = "0";
    setTimeout(() => {
      el.style.opacity = "1";
    }, index * 200);
  });
});
