document.addEventListener("DOMContentLoaded", () => {
  // ======== Element Selectors ========
  const selectors = {
    noRadio: document.getElementById("memberNo"),
    discountMsg: document.getElementById("discountMsg"),
    classSelection: document.getElementById("classSelection"),
    bookingForm: document.getElementById("bookingForm"),
    paymentForm: document.querySelector("#step3"),
    classRadios: document.querySelectorAll('input[name="class"]'),
    cardPaymentForm: document.getElementById("cardPaymentForm"),
    expDateInput: document.getElementById("expDate"),
    memberButtons: document.querySelectorAll("input[name='btnradio'][type='radio']"),
    classButtons: document.querySelectorAll("input[id$='Btn']"),
    progressSteps: document.querySelectorAll(".progress-step"),
    payCardRadio: document.querySelector("input[name='payment'][value='card']"),
    payArrivalRadio: document.querySelector("input[name='payment'][value='arrival']"),
    referenceDisplay: document.querySelector("#reference-number"),
    formSections: document.querySelectorAll(".form-section"),
    nextBtn: document.getElementById("toStep2"),
    form: document.querySelector("#step2 form"),
    userForm: document.querySelector("#step2"),
    hiddenInput: document.getElementById('selectedTime'),
    priceDisplay: document.getElementById('priceDisplay'),
    toStep3Btn: document.getElementById('toStep3'),
    thankYouPage: document.getElementById("thankYouPage"),
    payArrivalSubmitBtn: document.getElementById("payArrivalSubmit"),
    submitButton: document.querySelector("#toStep3"),
    timeRadios: document.querySelectorAll('input[name="time"]'),
    contactNoField: document.getElementById("contactNo"),
    memberYes: document.getElementById('memberYes'),
    loginForm: document.getElementById('loginForm'),
    loginBtn: document.getElementById('loginBtn'),
    loginFormElement: document.getElementById('loginFormElement'),
    referenceNumber: document.getElementById("reference-number"),
    payArrivalSubmit: document.getElementById("payArrivalSubmit")
  };

  let currentStep = 0;
  let loggedInUser = null;

  const users = {
    "admin@admin.com": {
      firstName: "Admin",
      surname: "User",
      email: "admin@admin.com",
      contactNo: "0271234567"
    }
  };

  // ======== Initialization ========
  function initializeForm() {
    setActiveStep(0);
    selectors.discountMsg.style.display = "none";
    selectors.classSelection.classList.add("hidden");
    selectors.bookingForm.classList.add("hidden");
    selectors.paymentForm.classList.add("hidden");
    selectors.referenceDisplay.style.display = "none";
  }

  // ======== Step Navigation ========
  function setActiveStep(step) {
    selectors.progressSteps.forEach((el, index) => {
      el.classList.toggle("active", index <= step);
    });
    currentStep = step;
  }

  function showStep(step) {
    selectors.formSections.forEach((section, index) => {
      section.classList.toggle("hidden", index !== step);
    });
    setActiveStep(step);
  }

  // ======== Event Handlers ========

  // Member Selection
  selectors.noRadio?.addEventListener("change", () => {
    selectors.discountMsg.style.display = "block";
    selectors.classSelection.classList.remove("hidden");
    selectors.classSelection.style.display = "flex";
  });

  // Class Selection
  selectors.classRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      selectors.bookingForm.classList.remove("hidden");
      selectors.nextBtn.classList.add("show");
      setActiveStep(0);
    });
  });

  selectors.memberButtons.forEach(btn => btn.addEventListener("change", () => setActiveStep(0)));
  selectors.classButtons.forEach(btn => btn.addEventListener("change", () => setActiveStep(0)));

  // Step Buttons
  selectors.nextBtn?.addEventListener("click", () => showStep(1));
  document.querySelector("#Back")?.addEventListener("click", () => {
    if (currentStep > 0) showStep(currentStep - 1);
  });

  // Time & Contact Validation
  selectors.toStep3Btn?.addEventListener('click', (e) => {
    const selectedTime = selectors.hiddenInput.value.trim().toLowerCase();
    const allowedTimes = Array.from(selectors.timeRadios).map(r => r.value.toLowerCase());
    if (!allowedTimes.includes(selectedTime)) {
      e.preventDefault();
      alert("Please select a valid time slot before proceeding.");
      return;
    }

    const phonePattern = /^[0-9+\-()\s]{7,15}$/;
    const contactNo = selectors.contactNoField?.value.trim();
    selectors.contactNoField?.classList.remove("input-error");
    selectors.contactNoField?.nextElementSibling?.classList?.contains("error-message") && selectors.contactNoField.nextElementSibling.remove();

    if (!phonePattern.test(contactNo)) {
      e.preventDefault();
      selectors.contactNoField.classList.add("input-error");
      const error = document.createElement("div");
      error.className = "error-message";
      error.style.color = "red";
      error.style.fontSize = "0.9rem";
      error.style.marginTop = "4px";
      error.textContent = "Please enter a valid contact number.";
      selectors.contactNoField.insertAdjacentElement("afterend", error);
    }
  });

  // Form Validation
  selectors.form?.addEventListener("input", () => {
    const requiredFields = selectors.form.querySelectorAll("[required]");
    selectors.submitButton.disabled = [...requiredFields].some(field => !field.value.trim());
  });

  // Form Submission
  selectors.form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const requiredFields = selectors.form.querySelectorAll("[required]");
    let isValid = true;

    selectors.form.querySelectorAll(".error-message").forEach(el => el.remove());
    requiredFields.forEach(field => {
      field.classList.remove("input-error");
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

    selectors.submitButton.disabled = true;
    selectors.submitButton.innerHTML = `<span class="spinner"></span> Submitting...`;
    await new Promise(resolve => setTimeout(resolve, 2000));

    const member = document.querySelector('input[name="member"]:checked')?.value;
    if (member === 'yes') {
      selectors.userForm.classList.add("hidden");
      selectors.thankYouPage.classList.remove("hidden");
      selectors.thankYouPage.style.display = "flex";
      setActiveStep(3);
      const ref = generateReferenceNumber();
      selectors.referenceDisplay.textContent = `Reference #: ${ref}`;
      selectors.referenceDisplay.style.display = "block";
      setTimeout(() => {
        window.location.href = "Book.html";
      }, 10000);
    } else {
      selectors.userForm.classList.add("hidden");
      selectors.paymentForm.classList.remove("hidden");
      setActiveStep(2);
      selectors.priceDisplay.textContent = `$${30.00.toFixed(2)}`;
    }
  });

  // Payment Method Selection
  function handlePaymentOptionChange() {
    if (selectors.payCardRadio?.checked) {
      selectors.cardPaymentForm.classList.remove("hidden");
      selectors.referenceDisplay.style.display = "none";
    } else if (selectors.payArrivalRadio?.checked) {
      selectors.cardPaymentForm.classList.add("hidden");
      const ref = generateReferenceNumber();
      selectors.referenceDisplay.textContent = `Reference #: ${ref}`;
      selectors.referenceDisplay.style.display = "block";
    }
  }

  selectors.payCardRadio?.addEventListener("change", handlePaymentOptionChange);
  selectors.payArrivalRadio?.addEventListener("change", handlePaymentOptionChange);

  // Card Payment Submission
  selectors.cardPaymentForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    selectors.paymentForm.classList.add("hidden");
    selectors.thankYouPage.classList.remove("hidden");
    selectors.thankYouPage.style.display = "flex";
    setActiveStep(3);
    const ref = generateReferenceNumber();
    selectors.referenceDisplay.textContent = `Reference #: ${ref}`;
    selectors.referenceDisplay.style.display = "block";

    setTimeout(() => {
      window.location.href = "Book.html";
    }, 10000);
  });

  // Pay on Arrival
  selectors.payArrivalRadio?.addEventListener("change", () => {
    if (selectors.payArrivalRadio.checked) {
      selectors.referenceNumber.style.display = "block";
      selectors.payArrivalSubmit.style.display = "inline-block";
    }
  });

  selectors.payArrivalSubmit?.addEventListener("click", () => {
    selectors.paymentForm.classList.add("hidden");
    selectors.thankYouPage.classList.remove("hidden");
    selectors.thankYouPage.style.display = "flex";
    setActiveStep(3);

    setTimeout(() => {
      window.location.href = "Book.html";
    }, 10000);
  });

  // Time Slot Update to Hidden Field
  selectors.timeRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      if (this.checked) {
        selectors.hiddenInput.value = this.value;
        selectors.hiddenInput.dispatchEvent(new Event('input'));
      }
    });
  });

  // Expiry Date Format
  selectors.expDateInput?.addEventListener("change", function () {
    const [year, month] = this.value.split("-");
    const formatted = `${month}/${year.slice(-2)}`;
    this.setAttribute("data-formatted", formatted);
    this.title = formatted;
  });

  // Member Yes/No Toggle Login Section
  function updateMemberSelection() {
    const isMember = selectors.memberYes.checked;
  
    const memberChoiceGroup = document.getElementById("memberChoiceGroup");
    if (memberChoiceGroup) {
      memberChoiceGroup.classList.add("hidden");
    }
  
    if (isMember) {
      selectors.loginForm.classList.remove("hidden");
      selectors.classSelection.classList.add("hidden");
      selectors.bookingForm.classList.add("hidden");
      selectors.discountMsg.style.display = "none";
    } else {
      selectors.loginForm.classList.add("hidden");
      selectors.classSelection.classList.remove("hidden");
      selectors.classSelection.style.display = "flex";
      selectors.discountMsg.style.display = "block";
    }
  }
  

  selectors.memberYes?.addEventListener("change", updateMemberSelection);
  selectors.noRadio?.addEventListener("change", updateMemberSelection);

  // Login Handler
  selectors.loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const loginError = document.getElementById('loginError');

    if (email === "admin@admin.com" && password === "admin") {
      selectors.loginForm.classList.add('hidden');
      selectors.classSelection.classList.remove('hidden');
      selectors.classSelection.style.display = 'flex';
      loginError.textContent = '';
      loggedInUser = users[email];
    } else {
      loginError.textContent = 'Incorrect email or password. Please try again.';
      document.getElementById('loginEmail').style.borderColor = 'red';
      document.getElementById('loginPassword').style.borderColor = 'red';
    }
  });

  //form auto fill on step 2
  document.getElementById('toStep2').addEventListener('click', function() {
    // Move to Step 2
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
  
    if (loggedInUser) {
      // Auto-fill the fields
      document.getElementById('firstName').value = loggedInUser.firstName;
      document.getElementById('surName').value = loggedInUser.surname;
      document.getElementById('email').value = loggedInUser.email;
      document.getElementById('contactNo').value = loggedInUser.contactNo;
    }
  });


  // ======== Helper Functions ========
  function generateReferenceNumber() {
    const now = Date.now().toString();
    const rand = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `REF-${now.slice(-5)}-${rand}`;
  }

  // ======== Call Initial Setup ========
  initializeForm();
});
