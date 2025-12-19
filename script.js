// PRELOADER + START TYPING AFTER IT
window.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const page = document.getElementById("page");
  const barFill = document.getElementById("preloader-bar-fill");
  const percentText = document.getElementById("preloader-percent");

  let progress = 0;
  const duration = 3200; // total time ~3.2s
  const intervalTime = 50;
  const increment = 100 / (duration / intervalTime);

  const interval = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // small delay then show page
      setTimeout(() => {
        preloader.style.transition = "opacity 0.5s ease";
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
          page.classList.remove("hidden");

          // start typing ONLY after preloader is gone
          startNameTyping();
        }, 500);
      }, 200);
    }
    barFill.style.width = `${progress}%`;
    percentText.textContent = `${Math.round(progress)}%`;
  }, intervalTime);
});

// TYPING EFFECT FOR NAME
const typedNameElement = document.getElementById("typed-name");
const fullName = "Alisha Almeida";
let nameIndex = 0;

function startNameTyping() {
  if (!typedNameElement) return;
  nameIndex = 0;
  typedNameElement.textContent = "";
  typeNameStep();
}

function typeNameStep() {
  if (nameIndex <= fullName.length) {
    typedNameElement.textContent = fullName.slice(0, nameIndex);
    nameIndex++;
    setTimeout(typeNameStep, 120);
  }
}

// SMOOTH SCROLL + ACTIVE LINK
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(href);
      if (section) {
        const offset = 70; // navbar height
        const top = section.offsetTop - offset;
        window.scrollTo({
          top,
          behavior: "smooth"
        });
      }
    }
  });
});

// Update active nav link on scroll
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 80;
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const section = document.querySelector(href);
    if (!section) return;
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// CONTACT FORM VALIDATION (front-end only)
// CONTACT FORM VALIDATION + SUBMIT TO FORMSPREE
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    const nameInput = document.getElementById("name");
    const reasonSelect = document.getElementById("reason");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const errorName = document.getElementById("error-name");
    const errorReason = document.getElementById("error-reason");
    const errorEmail = document.getElementById("error-email");
    const errorMessage = document.getElementById("error-message");
    const successMsg = document.getElementById("form-success");

    let valid = true;

    // reset errors
    errorName.textContent = "";
    errorReason.textContent = "";
    errorEmail.textContent = "";
    errorMessage.textContent = "";
    successMsg.textContent = "";

    // Name
    if (!nameInput.value.trim()) {
      errorName.textContent = "Please enter your name.";
      valid = false;
    }

    // Reason
    if (!reasonSelect.value) {
      errorReason.textContent = "Please select a reason.";
      valid = false;
    }

    // Email
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailValue || !emailPattern.test(emailValue)) {
      errorEmail.textContent = "Please enter a valid email address.";
      valid = false;
    }

    // Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
      errorMessage.textContent = "Please write a short message (min 5 characters).";
      valid = false;
    }

    if (!valid) {
      // stop sending if there are errors
      e.preventDefault();
    } else {
      // allow normal submit to Formspree
      successMsg.textContent = "Sending your message...";
      // no e.preventDefault() here
    }
  });
}


// SIMPLE LIGHTBOX FOR IMAGES
const lightboxOverlay = document.getElementById("lightbox-overlay");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

// select ALL images inside .lightbox-target
const lightboxTargets = document.querySelectorAll(".lightbox-target img");

lightboxTargets.forEach(img => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => {
    if (!lightboxOverlay || !lightboxImage) return;
    lightboxImage.src = img.src;
    lightboxOverlay.style.display = "flex";
  });
});

// close on X click
if (lightboxClose && lightboxOverlay && lightboxImage) {
  lightboxClose.addEventListener("click", () => {
    lightboxOverlay.style.display = "none";
    lightboxImage.src = "";
  });
}

// close when clicking outside the image
if (lightboxOverlay && lightboxImage) {
  lightboxOverlay.addEventListener("click", e => {
    if (e.target === lightboxOverlay) {
      lightboxOverlay.style.display = "none";
      lightboxImage.src = "";
    }
  });
}
