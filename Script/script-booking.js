document.addEventListener("DOMContentLoaded", () => {
  const yesRadio = document.getElementById("memberYes");
  const noRadio = document.getElementById("memberNo");
  const discountMsg = document.getElementById("discountMsg");
  const classSelection = document.getElementById("classSelection");
  const bookingForm = document.getElementById("bookingForm");
  const paymentForm = document.getElementById("paymentForm");
  const classRadios = document.querySelectorAll('input[name="class"]');
  const form = document.getElementById("userDetailsForm");
  const payCardBtn = document.getElementById("payCardBtn");
  const cardPaymentForm = document.getElementById("cardPaymentForm");
  const expDateInput = document.getElementById("expDate");
  const memberButtons = document.querySelectorAll("input[name='btnradio'][type='radio']");
  const classButtons = document.querySelectorAll("input[id$='Btn']");
  const progressSteps = document.querySelectorAll(".progress-step");
  const payOnArrivalRadio = document.querySelector("input[name='payment'][value='arrival']");
  const referenceDisplay = document.querySelector("#reference-number");
  const formSections = document.querySelectorAll(".form-section");
  let currentStep = 0;

  // Initial UI Setup
  discountMsg.style.display = "none";
  classSelection.classList.add("hidden");
  bookingForm.classList.add("hidden");
  paymentForm.classList.add("hidden");
  if (referenceDisplay) referenceDisplay.style.display = "none";

  // Handle member selection
  yesRadio?.addEventListener("change", () => {
    discountMsg.style.display = "none";
    classSelection.classList.remove("hidden");
  });

  noRadio?.addEventListener("change", () => {
    discountMsg.style.display = "block";
    classSelection.classList.remove("hidden");
  });

  // Show booking form when class selected
  classRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      bookingForm.classList.remove("hidden");
      setActiveStep(0);
    });
  });

  // Form submission
  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    // Activate steps
    setActiveStep(1);
    paymentForm.classList.remove("hidden");
    document.querySelector(".progress-step:nth-child(2)")?.classList.add("active");
    document.querySelector(".progress-step:nth-child(3)")?.classList.add("active");

    if (payOnArrivalRadio?.checked && referenceDisplay) {
      const ref = generateReferenceNumber();
      referenceDisplay.textContent = ref;
      referenceDisplay.style.display = "block";
    }
  });

  // Card Payment Reveal
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

  // Format Expiry Date
  expDateInput?.addEventListener("change", function () {
    const value = this.value;
    if (value) {
      const [year, month] = value.split("-");
      const formatted = `${month}/${year.slice(-2)}`;
      this.setAttribute("data-formatted", formatted);
      this.title = formatted;
    }
  });

  // Update progress on member or class pick
  memberButtons.forEach(btn => {
    btn.addEventListener("change", () => setActiveStep(0));
  });
  classButtons.forEach(btn => {
    btn.addEventListener("change", () => setActiveStep(0));
  });

  // Step navigation buttons
  document.querySelector("#toStep2")?.addEventListener("click", () => showStep(1));
  document.querySelector("#toStep3")?.addEventListener("click", () => showStep(2));

  // Helpers
  function setActiveStep(index) {
    progressSteps.forEach((step, i) => {
      step.classList.toggle("active", i <= index);
    });
  }

  function showStep(index) {
    formSections.forEach((section, i) => {
      section.classList.toggle("hidden", i !== index);
    });
    currentStep = index;
    setActiveStep(index);
  }

  function generateReferenceNumber() {
    const now = Date.now().toString();
    const rand = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `REF-${now.slice(-5)}-${rand}`;
  }

});
