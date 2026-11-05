/* ============================================================
   VIDAPLENA — Medical Clinic HTML Template
   Services tabs (services.js)
   Switches the visible services category panel when a tab is
   clicked. Works with any number of tabs/panels as long as
   each tab's data-target matches a panel's id.
   ============================================================ */
(function () {
  "use strict";

  var tabs = document.querySelectorAll(".service-tab");
  var panels = document.querySelectorAll(".service-panel");
  if (!tabs.length || !panels.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      panels.forEach(function (p) { p.classList.remove("active"); });

      tab.classList.add("active");
      var target = document.getElementById(tab.getAttribute("data-target"));
      if (target) target.classList.add("active");
    });
  });
})();
