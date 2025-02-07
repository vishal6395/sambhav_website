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
    
    // Course buttons
    document.getElementById('excelTipsBtn').addEventListener('click', showExcelTips);
    document.getElementById('biExamplesBtn').addEventListener('click', showBIExamples);
    document.getElementById('careerPathsBtn').addEventListener('click', showCareerPaths);
    
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
function showExcelTips() {
    showAlert(`<strong>Excel Quick Tips:</strong><br>
        1. Use VLOOKUP for data lookup<br>
        2. Master Pivot Tables<br>
        3. Learn keyboard shortcuts`);
}

function showBIExamples() {
    showAlert(`<strong>Power BI Demos:</strong><br>
        1. Sales Dashboard<br>
        2. Customer Segmentation<br>
        3. Real-time Analytics`);
}

function showCareerPaths() {
    showAlert(`<strong>Common Career Paths:</strong><br>
        1. Junior Analyst → Senior Analyst<br>
        2. Data Analyst → Data Scientist<br>
        3. Business Intelligence Specialist`);
}

// Window click handler
window.onclick = function(event) {
    const modal = document.getElementById('interestModal');
    if (event.target === modal) {
        closeModal();
    }
}