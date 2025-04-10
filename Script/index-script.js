// scroll 
const offerBtn = document.getElementById('offerBtn');
const offerLocation = document.getElementById('OffersNav');

offerBtn.addEventListener('click', () => {
  offerLocation.scrollIntoView({ behavior: 'smooth' });
});

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