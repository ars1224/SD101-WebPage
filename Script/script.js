//form contact form submit
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submitBtn input[type="submit"]');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = form.querySelector('#inputEmail').value.trim();
        const name = form.querySelector('#inputName').value.trim();
        const contact = form.querySelector('#inputContact').value.trim();
        const message = form.querySelector('#inputMessage').value.trim();
        const consent = form.querySelector('#checkConsent').checked;

        if (!email || !name || !contact || !consent) {
            alert('Please fill in all required fields and agree to the consent checkbox.');
            return;
        }

        const formData = { email, name, contact, message };
        console.log("Form submitted with data:", formData);

        alert("Form submitted successfully!");

        location.reload();
    });
});

//form newsletter form submit
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Stop default form action
  
      const email = form.querySelector('#floatingInput').value.trim();
      const name = form.querySelector('#floatingName').value.trim();
  
      if (!email || !name) {
        alert('Please fill in all required fields.');
        return;
      }
  
      const formData = { email, name };
      console.log("Form submitted with data:", formData);
  
      alert("Form submitted successfully!");
      
      location.reload(); // 🔄 reload page after alert
    });
  });
  
  const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

//Booking

document.addEventListener("DOMContentLoaded", () => {
  const yesRadio = document.getElementById("memberYes");
  const noRadio = document.getElementById("memberNo");
  const discountMsg = document.getElementById("discountMsg");
  const classSelection = document.getElementById("classSelection");
  const bookingForm = document.getElementById("bookingForm");
  const paymentForm = document.getElementById("paymentForm");
  const classRadios = document.querySelectorAll('input[name="class"]');
  const form = document.getElementById("userDetailsForm");

  // Hide everything initially
  discountMsg.style.display = "none";
  classSelection.classList.add("hidden");
  bookingForm.classList.add("hidden");
  paymentForm.classList.add("hidden");

  // Show class selection on member status select
  yesRadio.addEventListener("change", () => {
      discountMsg.style.display = "none";
      classSelection.classList.remove("hidden");
  });

  noRadio.addEventListener("change", () => {
      discountMsg.style.display = "block";
      classSelection.classList.remove("hidden");
  });

  // Show booking form after class is selected
  classRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
          bookingForm.classList.remove("hidden");
      });
  });

  // Show payment form on form submission
  form.addEventListener("submit", (e) => {
      e.preventDefault();
      paymentForm.classList.remove("hidden");
      document.querySelector(".progress-step:nth-child(2)").classList.add("active");
      document.querySelector(".progress-step:nth-child(3)").classList.add("active");
  });
});
