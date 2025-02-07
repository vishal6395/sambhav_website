import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-5o2DI_pYJHT8HpXq7XJ535SJw9v-1Xc",
    authDomain: "sambhav-22391.firebaseapp.com",
    projectId: "sambhav-22391",
    storageBucket: "sambhav-22391.appspot.com",
    messagingSenderId: "875613491239",
    appId: "1:875613491239:web:24e65df29c7c6cdb3afe02",
    measurementId: "G-N3QJNQ5J4R"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Consolidated event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // // Course buttons
    document.getElementById('chargingMapBtn').addEventListener('click', showChargingMap);
    document.getElementById('batteryTechBtn').addEventListener('click', showBatteryTech);
    document.getElementById('careerBtn').addEventListener('click', showCareer);

    // Modal button
    document.getElementById('interestBtn').addEventListener('click', openModal);

    // Close modal
    document.getElementById('closeModal').addEventListener('click', closeModal);

    // Form submission
    document.getElementById('interestForm').addEventListener('submit', handleFormSubmit);

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// Unified theme handling
function toggleTheme() {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'light'
        : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}


// Form handling
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');

    const formData = {
        name: form.name.value.trim(),
        mobile: form.mobile.value.trim(),
        email: form.email.value.trim(),
        course: form.course.value,
        timestamp: serverTimestamp()
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
        const registrationRef = ref(database, 'registrations');
        await push(registrationRef, formData);
        showAlert('Thank you for your interest! We will contact you soon.');
        form.reset();
        closeModal();
    } catch (error) {
        console.error('Error:', error);
        showAlert('Submission failed. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    }
}

// Modal functions
function openModal() {
    document.getElementById('interestModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('interestModal').style.display = 'none';
}

// Alert system
// Updated alert functions
function showAlert(message) {
    const alert = document.getElementById('customAlert');
    const content = document.getElementById('alertContent');

    // Reset animation
    alert.style.display = 'block';
    void alert.offsetHeight; // Trigger reflow

    content.innerHTML = message;
    alert.classList.add('show');

    // Clear existing timeout
    if (alert.timeoutId) clearTimeout(alert.timeoutId);
    alert.timeoutId = setTimeout(hideAlert, 5000);
}

function hideAlert() {
    const alert = document.getElementById('customAlert');
    alert.classList.remove('show');

    // Wait for transition before hiding completely
    setTimeout(() => {
        alert.style.display = 'none';
    }, 400); // Match transition duration
}

// Specific alert content
// Function to display EV Charging Map details
function showChargingMap() {
    showAlert(`<strong>EV Charging Stations Map:</strong><br>
        1. Locate nearby charging stations<br>
        2. Compare charging speeds and availability<br>
        3. Plan optimal routes for your EV journey`);
}

// Function to display Battery Technology insights
function showBatteryTech() {
    showAlert(`<strong>Battery Technology Updates:</strong><br>
        1. Latest innovations in battery design<br>
        2. Improvements in energy density<br>
        3. Emerging trends in battery efficiency`);
}

// Function to display Career Opportunities information
function showCareer() {
    showAlert(`<strong>Career Opportunities in the EV Industry:</strong><br>
        1. Electrical Engineering roles<br>
        2. Research and Development positions<br>
        3. Sales and Technical Support careers`);
}

// Window click handler
window.onclick = function (event) {
    const modal = document.getElementById('interestModal');
    if (event.target === modal) {
        closeModal();
    }
}