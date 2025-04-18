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


document.addEventListener("DOMContentLoaded", () => {
    // Elements
  const navigateButton = document.getElementById("join");
  const navigateButton2 = document.getElementById("join2");
  const yogapage = document.getElementById("yoga");
  const pilatesPage = document.getElementById("pilates");
  const hiitPage = document.getElementById("hiit");
  
    // Event Listener for Navigation
    navigateButton?.addEventListener("click", () => {
      window.location.href = "join.html"; // Replace "newPage.html" with the URL of the page you want to navigate to
    });
    yogapage?.addEventListener("click", () => {
        window.location.href = "yoga.html"; // Replace "newPage.html" with the URL of the page you want to navigate to
      });
      pilatesPage?.addEventListener("click", () => {
          window.location.href = "pilates.html"; // Replace "newPage.html" with the URL of the page you want to navigate to
        });
        hiitPage?.addEventListener("click", () => {
            window.location.href = "hiit.html"; // Replace "newPage.html" with the URL of the page you want to navigate to
          });
        navigateButton2?.addEventListener("click", () => {
              window.location.href = "join.html"; // Replace "newPage.html" with the URL of the page you want to navigate to
            });
  
  });
  