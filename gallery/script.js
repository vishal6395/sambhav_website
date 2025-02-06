import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-5o2DI_pYJHT8HpXq7XJ535SJw9v-1Xc",
    authDomain: "sambhav-22391.firebaseapp.com",
    projectId: "sambhav-22391",
    storageBucket: "sambhav-22391.firebasestorage.app",
    messagingSenderId: "875613491239",
    appId: "1:875613491239:web:24e65df29c7c6cdb3afe02",
    measurementId: "G-N3QJNQ5J4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM Elements
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const downloadBtn = document.getElementById('downloadBtn');
const closeBtn = document.getElementById('closeBtn');
const categoryNav = document.getElementById('categoryNav');

const categories = ['ADA', 'EV', 'CRM'];
let currentImage = null; // Declare the variable at the top

// 🔹 Fetch images from Firebase (Define first)
const fetchImages = (category) => {
    gallery.innerHTML = '<div class="loading">Loading images...</div>';

    const dbRef = ref(database, `images/${category}`);
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        gallery.innerHTML = '';

        if (data) {
            gallery.innerHTML = Object.values(data).map(createImageCard).join('');
            initImageClickHandlers();
        } else {
            gallery.innerHTML = `
                <div class="empty-state">
                    <ion-icon name="sad-outline"></ion-icon>
                    <p>No images found in this collection</p>
                </div>
            `;
        }
    });
};

// 🔹 Create category buttons (Now fetchImages is defined, so no error)
const createCategoryButtons = () => {
    categoryNav.innerHTML = categories.map(cat => `
        <button class="category-btn" data-category="${cat}">
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
    `).join('');

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            fetchImages(btn.dataset.category);
        });
    });
};

// 🔹 Create image card template
const createImageCard = (imgData) => `
    <div class="image-card" data-url="${imgData.url}" data-title="${imgData.title}">
        <div class="image-content">
            <img src="${imgData.url}" alt="${imgData.title}">
        </div>
        <div class="image-title">
            <h3>${imgData.title}</h3>
        </div>
    </div>
`;

// 🔹 Lightbox functionality
const showLightbox = (url, title) => {
    currentImage = url;
    lightboxImg.src = url;
    lightboxImg.alt = title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
};

// 🔹 Download functionality
const downloadImage = () => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `download-${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// 🔹 Event listeners
const initImageClickHandlers = () => {
    document.querySelectorAll('.image-card').forEach(card => {
        card.addEventListener('click', () => {
            const url = card.dataset.url;
            const title = card.dataset.title;
            showLightbox(url, title);
        });
    });
};

closeBtn.addEventListener('click', closeLightbox);
downloadBtn.addEventListener('click', downloadImage);

// Close lightbox on outside click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// 🔹 Initialize categories on load
createCategoryButtons();
document.querySelector('.category-btn').click(); // Selects first category
fetchImages('ADA'); // No error now

document.getElementById('uploadBtn').addEventListener('click', function () {
    window.location.href = '../index.html';
});
// Add this JavaScript
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Check localStorage for theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});