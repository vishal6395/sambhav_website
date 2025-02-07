// Import the required Firebase functions (modular SDK approach)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB-5o2DI_pYJHT8HpXq7XJ535SJw9v-1Xc",
    authDomain: "sambhav-22391.firebaseapp.com",
    projectId: "sambhav-22391",
    storageBucket: "sambhav-22391.firebasestorage.app",
    messagingSenderId: "875613491239",
    appId: "1:875613491239:web:24e65df29c7c6cdb3afe02",
    measurementId: "G-N3QJNQ5J4R"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Handle form submit to Firebase and Web3Form
function handleSubmit(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create a new reference for the data under 'messages' in Firebase Realtime Database
    const messagesRef = ref(database, 'messages');
    const newMessageRef = push(messagesRef);

    // Set the data at the new reference location
    set(newMessageRef, {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
    }).then(() => {
        // Handle successful push
        console.log('Message successfully written to Firebase');
        // Handle Web3Form submission
        // Submit to Web3Form API

        // Show success message
        document.getElementById('success-msg').style.display = 'block';

        // Reset form
        form.reset();
    }).catch((error) => {
        // Handle error
        console.error('Error writing message to Firebase:', error);
    });
}

document.getElementById('contact-form').addEventListener('submit', handleSubmit);

// Accordion functionality for About Section
document.querySelectorAll('.about-header-item').forEach(header => {
    header.addEventListener('click', () => {
        const parentItem = header.parentElement;
        parentItem.classList.toggle('active');
        const icon = header.querySelector('i');
        if (parentItem.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-msg");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Create a FormData object from the form
    const formData = new FormData(form);

    // Submit the form data using Fetch API
    fetch(form.action, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Show the success message
                successMsg.style.display = "block";

                // Optionally hide the message after a few seconds
                setTimeout(() => {
                    successMsg.style.display = "none";
                }, 5000);

                // Reset the form if needed
                form.reset();
            } else {
                // Handle errors if needed
                console.error("Submission failed:", data);
            }
        })
        .catch((error) => {
            console.error("Error submitting form:", error);
        });
});


// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

// Toggle menu
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('show');
});

// Close menu when clicking outside or on links
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('show');
    }
});

// Smooth scroll and close menu
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));

        // Close menu
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('show');

        // Smooth scroll
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Updated JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const themeTogglers = document.querySelectorAll('.theme-toggler');
    const htmlElement = document.documentElement;

    function updateThemeIcons(theme) {
        themeTogglers.forEach(toggler => {
            toggler.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
        });
    }

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcons('light');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcons('dark');
        }
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcons('dark');
    }

    // Add event listeners to all togglers
    themeTogglers.forEach(toggler => {
        toggler.addEventListener('click', toggleTheme);
    });
});

document.querySelectorAll('.expand-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const card = trigger.closest('.sponsor-card');
        const chevron = trigger.querySelector('.fa-chevron-down');
        card.classList.toggle('active');
        chevron.style.transform = card.classList.contains('active') 
            ? 'rotate(180deg)' 
            : 'rotate(0deg)';
    });
});