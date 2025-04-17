document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const yesRadio = document.getElementById("memberYes");
  const noRadio = document.getElementById("memberNo");
  const discountMsg = document.getElementById("discountMsg");
  const classSelection = document.getElementById("classSelection");
  const bookingForm = document.getElementById("bookingForm");
  const paymentForm = document.querySelector("#step3");
  const classRadios = document.querySelectorAll('input[name="class"]');
  const cardPaymentForm = document.getElementById("cardPaymentForm");
  const expDateInput = document.getElementById("expDate");
  const memberButtons = document.querySelectorAll("input[name='btnradio'][type='radio']");
  const classButtons = document.querySelectorAll("input[id$='Btn']");
  const progressSteps = document.querySelectorAll(".progress-step");
  const payCardRadio = document.querySelector("input[name='payment'][value='card']");
  const payArrivalRadio = document.querySelector("input[name='payment'][value='arrival']");
  const referenceDisplay = document.querySelector("#reference-number");
  const formSections = document.querySelectorAll(".form-section");
  const nextBtn = document.getElementById("toStep2");
  const form = document.querySelector("#step2 form");
  const userForm = document.querySelector("#step2");
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const dropdownButton = document.querySelector('.dropdown-toggle');
  const hiddenInput = document.getElementById('selectedTime');
  const priceDisplay = document.getElementById('priceDisplay');
  const toStep3Btn = document.getElementById('toStep3');
  const thankYouPage = document.getElementById("thankYouPage");
  const payArrivalSubmitBtn = document.getElementById("payArrivalSubmit");
  const payArrivalRadio1 = document.getElementById("payArrivalRadio");
  const referenceNumber = document.getElementById("reference-number");
  const arrivalBtn = document.getElementById("payArrivalSubmit");
  const payArrivalSubmit = document.getElementById("payArrivalSubmit");
  const allFormSections = document.querySelectorAll(".form-section");
  const submitButton = document.querySelector("#toStep3");

  let currentStep = 0;

  // Initial Setup
  setActiveStep(0);
  discountMsg.style.display = "none";
  classSelection.classList.add("hidden");
  bookingForm.classList.add("hidden");
  paymentForm.classList.add("hidden");
  if (referenceDisplay) referenceDisplay.style.display = "none";

  // Member selection
  yesRadio?.addEventListener("change", () => {
    discountMsg.style.display = "none";
    classSelection.classList.remove("hidden");
    classSelection.style.display = "flex";
  });
  noRadio?.addEventListener("change", () => {
    discountMsg.style.display = "block";
    classSelection.classList.remove("hidden");
    classSelection.style.display = "flex";
  });

  // Class selection
  classRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      bookingForm.classList.remove("hidden");
      nextBtn.classList.add("show");
      setActiveStep(0);
    });
  });

  // Step navigation
  document.querySelector("#toStep2")?.addEventListener("click", () => showStep(1));
  document.querySelector("#Back")?.addEventListener("click", () => {
    if (currentStep > 0) showStep(currentStep - 1);
  });

  memberButtons.forEach(btn => btn.addEventListener("change", () => setActiveStep(0)));
  classButtons.forEach(btn => btn.addEventListener("change", () => setActiveStep(0)));

  // Form Validation + Submit
  form?.addEventListener("input", () => {
    const requiredFields = form.querySelectorAll("[required]");
    submitButton.disabled = [...requiredFields].some(field => !field.value.trim());
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    form.querySelectorAll(".error-message").forEach(el => el.remove());
    requiredFields.forEach(field => field.classList.remove("input-error"));

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("input-error");
        const error = document.createElement("div");
        error.className = "error-message";
        error.style.color = "red";
        error.style.fontSize = "0.9rem";
        error.style.marginTop = "4px";
        error.textContent = `${field.placeholder || field.name} is required`;
        field.insertAdjacentElement("afterend", error);
      }
    });

    if (!isValid) return;

    // Loading animation on button
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = `<span class="spinner"></span> Submitting...`;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const member = document.querySelector('input[name="member"]:checked')?.value;
    if (member === 'yes') {
      userForm.classList.add("hidden");
      thankYouPage.classList.remove("hidden");
      thankYouPage.style.display = "flex";
      setActiveStep(3);

      const ref = generateReferenceNumber();
      referenceDisplay.textContent = `Reference #: ${ref}`;
      referenceDisplay.style.display = "block";

    } else {
      userForm.classList.add("hidden");
      paymentForm.classList.remove("hidden");
      setActiveStep(2);

      const price = 30;
      priceDisplay.textContent = `$${price.toFixed(2)}`;
    }
  });

  // Payment option change
  function handlePaymentOptionChange() {
    if (payCardRadio?.checked) {
      cardPaymentForm.classList.remove("hidden");
      referenceDisplay.style.display = "none";
    } else if (payArrivalRadio?.checked) {
      cardPaymentForm.classList.add("hidden");
      const ref = generateReferenceNumber();
      referenceDisplay.textContent = `Reference #: ${ref}`;
      referenceDisplay.style.display = "block";
    }
  }

  payCardRadio?.addEventListener("change", handlePaymentOptionChange);
  payArrivalRadio?.addEventListener("change", handlePaymentOptionChange);

  // Format expiry date
  expDateInput?.addEventListener("change", function () {
    const value = this.value;
    if (value) {
      const [year, month] = value.split("-");
      const formatted = `${month}/${year.slice(-2)}`;
      this.setAttribute("data-formatted", formatted);
      this.title = formatted;
    }
  });

  // Card Payment Submit
  cardPaymentForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    paymentForm.classList.add("hidden");
    thankYouPage.classList.remove("hidden");
    thankYouPage.style.display = "flex";
    setActiveStep(3);

    const ref = generateReferenceNumber();
    referenceDisplay.textContent = `Reference #: ${ref}`;
    referenceDisplay.style.display = "block";
  });

  // Pay on Arrival Submit
  payArrivalSubmitBtn?.addEventListener("click", () => {
    paymentForm.classList.add("hidden");
    thankYouPage.classList.remove("hidden");
    thankYouPage.style.display = "flex";
    setActiveStep(3);

    const ref = generateReferenceNumber();
    referenceDisplay.textContent = `Reference #: ${ref}`;
    referenceDisplay.style.display = "block";
  });

  // Helpers
  function setActiveStep(step) {
    progressSteps.forEach((el, index) => {
      el.classList.toggle("active", index <= step);
    });
    currentStep = step;
  }

  function showStep(step) {
    formSections.forEach((section, index) => {
      section.classList.toggle("hidden", index !== step);
    });
    setActiveStep(step);
  }

  function generateReferenceNumber() {
    const now = Date.now().toString();
    const rand = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `REF-${now.slice(-5)}-${rand}`;
  }

  // Dropdown time selection
  dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const time = item.textContent;
      dropdownButton.textContent = time;
      hiddenInput.value = time;
    });
  });

  // Time slot check
  toStep3Btn?.addEventListener('click', (e) => {
    if (!hiddenInput.value.trim()) {
      e.preventDefault();
      alert("Please select a time slot before proceeding.");
    }
  });

  payArrivalRadio1.addEventListener("change", () => {
    if (payArrivalRadio1.checked) {
      referenceNumber.style.display = "block";
      payArrivalSubmit.style.display = "inline-block";
    }
  });

  payArrivalSubmit.addEventListener("click", () => {
    allFormSections.forEach(section => section.classList.add("hidden"));
    thankYouPage.classList.remove("hidden");
    thankYouPage.style.display = "flex";

    setTimeout(() => {
      window.location.href = "Book.html";
    }, 10000);
  });
});
