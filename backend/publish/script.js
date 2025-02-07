import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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

// Function to Save Image URL to Firebase Realtime Database
window.saveImageURL = function () {
  const imageURL = document.getElementById('imageURL').value;
  const category = document.getElementById('categorySelect').value;
  const imageTitle = document.getElementById('imageTitle').value;

  if (!imageURL || !imageTitle) {
    alert("Please enter a valid image URL and title.");
    return;
  }

  const dbRef = ref(database, 'images/' + category);
  push(dbRef, {
    url: imageURL,
    title: imageTitle
  }).then(() => {
    console.log("Data saved successfully");
    document.getElementById('status').innerText = "Image URL uploaded successfully!";
  }).catch((error) => {
    console.error("Error saving data: ", error);
    document.getElementById('status').innerText = "Error saving image.";
  });
}
