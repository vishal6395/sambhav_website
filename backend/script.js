const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ddzod1d07/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'images';

// Handle Image Preview
const fileInput = document.getElementById('imageFile');
const imagePreview = document.getElementById('imagePreview');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    // Clear previous preview
    imagePreview.innerHTML = '';

    if (file) {
        const reader = new FileReader();

        // When file is loaded, create an image element
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result; // Base64 data URL
            img.alt = 'Preview of selected image';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '200px';
            img.style.borderRadius = '10px';
            imagePreview.appendChild(img);
        };

        reader.readAsDataURL(file); // Read the file as a Base64 URL
    }
});

// Handle Upload
document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    // Show spinner
    document.querySelector('.button-text').textContent = 'Uploading...';
    document.querySelector('.spinner').hidden = false;

    try {
        const response = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        // Hide spinner
        document.querySelector('.button-text').textContent = 'Upload';
        document.querySelector('.spinner').hidden = true;

        if (data.secure_url) {
            // Create a masked URL
            const maskedUrl = `https://res.cloudinary.com/upload/HS6WHhsuiwu.png...`;

            // Display the success message and modern cell
            document.getElementById('result').innerHTML = `
                <p>Image Uploaded Successfully!</p>
                <div class="url-cell">
                    <span>${maskedUrl}</span>
                    <img src="https://img.icons8.com/fluency-systems-regular/50/copy.png" alt="Copy Icon" class="copy-icon" onclick="copyToClipboard('${data.secure_url}')">
                </div>
            `;
            
        } else {
            document.getElementById('result').textContent = 'Failed to upload image.';
        }
    } catch (error) {
        console.error('Upload Error:', error);
        document.querySelector('.button-text').textContent = 'Upload';
        document.querySelector('.spinner').hidden = true;
        document.getElementById('result').textContent = 'An error occurred during upload.';
    }
});

// Function to Copy URL to Clipboard
function copyToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
        // Show the floating message
        const floatingMessage = document.getElementById('floatingMessage');
        floatingMessage.textContent = 'Copied!';
        floatingMessage.style.display = 'block';
        floatingMessage.style.opacity = '1';

        // Hide the message after 2 seconds
        setTimeout(() => {
            floatingMessage.style.opacity = '0';
            setTimeout(() => {
                floatingMessage.style.display = 'none';
            }, 300);
        }, 2000);
    }).catch((err) => {
        console.error('Failed to copy URL: ', err);
    });
}
