/* ============================================================
   VIDAPLENA — Medical Clinic HTML Template
   Appointment form validation (form.js)
   Pure client-side validation: required fields, email and
   phone formats, and an appointment date that cannot be in
   the past. On success it shows a confirmation message
   (connect your own backend/endpoint to really send it).
   ============================================================ */
(function () {
  "use strict";

  var form = document.getElementById("appointment-form");
  if (!form) return;

  var success = document.querySelector(".form-success");

  // Prevent selecting past dates in the date picker.
  var dateInput = form.querySelector("#date");
  if (dateInput) {
    var today = new Date();
    var iso = today.toISOString().split("T")[0];
    dateInput.min = iso;
  }

  function setValidity(input, valid) {
    var group = input.closest(".form-group");
    if (group) group.classList.toggle("invalid", !valid);
    return valid;
  }

  function validateField(input) {
    var value = input.value.trim();
    var valid = true;

    if (input.hasAttribute("required") && value === "") valid = false;

    if (valid && input.type === "email") {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    }
    if (valid && input.id === "phone") {
      // Accept digits, spaces, +, - and parentheses; require 7+ digits.
      valid = /^[+()\-\s\d]+$/.test(value) && value.replace(/\D/g, "").length >= 7;
    }
    if (valid && input.id === "date" && value !== "") {
      valid = value >= dateInput.min;
    }
    return setValidity(input, valid);
  }

  // Live validation: re-check a field once the user leaves it.
  form.querySelectorAll("input, select, textarea").forEach(function (field) {
    field.addEventListener("blur", function () { validateField(field); });
    field.addEventListener("input", function () {
      var group = field.closest(".form-group");
      if (group && group.classList.contains("invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var allValid = true;
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      var firstInvalid = form.querySelector(".form-group.invalid input, .form-group.invalid select, .form-group.invalid textarea");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Demo behaviour: show the success banner and reset the form.
    // TODO (buyer): point this form to your booking system or email service.
    if (success) {
      success.classList.add("show");
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    form.reset();
  });
})();
