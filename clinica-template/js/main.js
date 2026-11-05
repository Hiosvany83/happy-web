/* ============================================================
   VIDAPLENA — Medical Clinic HTML Template
   Main script (main.js)
   - Dark / light theme toggle (saved in localStorage)
   - Mobile navigation
   - Reveal-on-scroll animations (IntersectionObserver)
   - Testimonials slider (auto + dots)
   - Back-to-top button
   - Dynamic footer year
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");

  // Apply the saved theme as early as possible to avoid a flash.
  var savedTheme = null;
  try { savedTheme = localStorage.getItem("vidaplena-theme"); } catch (e) { /* storage unavailable */ }
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  function syncToggleIcon() {
    if (!toggle) return;
    var dark = root.getAttribute("data-theme") === "dark";
    toggle.textContent = dark ? "☀" : "☾";
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  syncToggleIcon();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("vidaplena-theme", next); } catch (e) { /* ignore */ }
      syncToggleIcon();
    });
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close the menu after tapping a link (mobile UX).
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Testimonials slider ---------- */
  var slides = document.querySelectorAll(".testimonial-slide");
  var dotsWrap = document.querySelector(".slider-dots");
  if (slides.length && dotsWrap) {
    var current = 0, timer = null;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show testimonial " + (i + 1));
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", function () { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll("button");

    function goTo(index) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 6000);
    }
    restart();
  }

  /* ---------- Back to top ---------- */
  var backTop = document.querySelector(".back-to-top");
  if (backTop) {
    window.addEventListener("scroll", function () {
      backTop.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector(".js-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
