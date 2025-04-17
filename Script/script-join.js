// script-join.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Perform form validation or any other logic here
        
        alert('Form submitted successfully!');
        
    });
});
