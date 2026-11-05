/* ============================================================
   VIDAPLENA — Medical Clinic HTML Template
   Gallery lightbox (gallery.js)
   Opens a full-screen preview when a gallery photo is
   clicked. CSS-only tiles (no image) are ignored.
   ============================================================ */
(function () {
  "use strict";

  var lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;

  var lightboxImg = lightbox.querySelector("img");
  var caption = lightbox.querySelector(".lightbox-caption");
  var closeBtn = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-item img").forEach(function (img) {
    img.addEventListener("click", function () {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      var fig = img.closest(".gallery-item").querySelector("figcaption");
      caption.textContent = fig ? fig.textContent : img.alt;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
})();
