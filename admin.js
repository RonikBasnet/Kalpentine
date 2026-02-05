// Get all data from Firestore
async function getData() {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).get();
        const data = {};
        snapshot.forEach(doc => {
            data[doc.id] = doc.data();
        });
        return data;
    } catch (error) {
        console.error('Error getting data:', error);
        return {};
    }
}

// Save data for a specific name to Firestore
async function saveNameData(name, data) {
    try {
        await db.collection(COLLECTION_NAME).doc(name).set(data);
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        alert('Error saving data. Please check your Firebase configuration.');
        return false;
    }
}

// Delete name from Firestore
async function deleteNameData(name) {
    try {
        await db.collection(COLLECTION_NAME).doc(name).delete();
        return true;
    } catch (error) {
        console.error('Error deleting data:', error);
        return false;
    }
}

// Seed function to populate with sample data
async function seedData() {
    const sampleData = {
        "John": {
            secretKey: "love123",
            images: {
                "1": "./images/john/rejection1.jpg", // First rejection - puppy eyes
                "2": "./images/john/rejection2.jpg", // Second rejection - sad cat
                "3": "./images/john/rejection3.jpg", // Third rejection - crying meme
                "4": "./images/john/rejection4.jpg", // Fourth rejection - desperate plea
                "5": "./images/john/rejection5.jpg", // Fifth rejection - last chance
                "success": "./images/john/success.jpg" // Acceptance - celebration
            }
        },
        "Sarah": {
            secretKey: "heart456",
            images: {
                "1": "./images/sarah/rejection1.jpg",
                "2": "./images/sarah/rejection2.jpg",
                "3": "./images/sarah/rejection3.jpg",
                "4": "./images/sarah/rejection4.jpg",
                "5": "./images/sarah/rejection5.jpg",
                "success": "./images/sarah/success.jpg"
            }
        },
        "Alex": {
            secretKey: "valentine789",
            images: {
                "1": "./images/alex/rejection1.jpg",
                "2": "./images/alex/rejection2.jpg",
                "3": "./images/alex/rejection3.jpg",
                "4": "./images/alex/rejection4.jpg",
                "5": "./images/alex/rejection5.jpg",
                "success": "./images/alex/success.jpg"
            }
        }
    };
    
    // Save each name individually to Firestore
    for (const [name, data] of Object.entries(sampleData)) {
        await saveNameData(name, data);
    }
    await loadNames();
    alert('Sample data has been seeded! 🎉\n\nPeople added:\n- John (key: love123)\n- Sarah (key: heart456)\n- Alex (key: valentine789)\n\nEach has 5 rejection images and 1 acceptance image.\n\n⚠️ Remember to add actual image files to the images/ folder!');
}

// Current selected name
let currentSelectedName = null;

// DOM Elements
const newNameInput = document.getElementById('newName');
const addNameBtn = document.getElementById('addNameBtn');
const nameSelect = document.getElementById('nameSelect');
const deleteNameBtn = document.getElementById('deleteNameBtn');
const imageSection = document.getElementById('imageSection');
const currentNameSpan = document.getElementById('currentName');
const namesList = document.getElementById('namesList');
const seedDataBtn = document.getElementById('seedDataBtn');
const secretKeyInput = document.getElementById('secretKeyInput');
const updateKeyBtn = document.getElementById('updateKeyBtn');
const currentKeyDisplay = document.getElementById('currentKeyDisplay');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadNames();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    addNameBtn.addEventListener('click', addName);
    newNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addName();
    });
    
    if (seedDataBtn) {
        seedDataBtn.addEventListener('click', seedData);
    }
    
    if (updateKeyBtn) {
        updateKeyBtn.addEventListener('click', updateSecretKey);
    }
    
    nameSelect.addEventListener('change', handleNameSelect);
    deleteNameBtn.addEventListener('click', deleteName);
    
    // Setup image upload buttons
    document.querySelectorAll('.upload-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const level = e.target.dataset.level;
            uploadImage(level);
        });
    });
    
    // Setup remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const level = e.target.dataset.level;
            removeImage(level);
        });
    });
    
    // Setup file input change handlers
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const level = e.target.dataset.level;
            handleFileSelect(e, level);
        });
    });
}

// Load names into select and list
async function loadNames() {
    const data = await getData();
    const names = Object.keys(data);
    
    // Update select dropdown
    nameSelect.innerHTML = '<option value="">-- Select a name --</option>';
    names.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        nameSelect.appendChild(option);
    });
    
    // Update names list
    if (names.length === 0) {
        namesList.innerHTML = '<p class="empty-state">No names added yet. Add one above!</p>';
    } else {
        namesList.innerHTML = '';
        names.forEach(name => {
            const nameCard = document.createElement('div');
            nameCard.className = 'name-card';
            
            const imageCount = data[name].images ? Object.keys(data[name].images).length : 0;
            
            nameCard.innerHTML = `
                <h3>${name}</h3>
                <p>${imageCount} image${imageCount !== 1 ? 's' : ''} uploaded</p>
            `;
            
            nameCard.addEventListener('click', () => {
                nameSelect.value = name;
                handleNameSelect();
            });
            
            namesList.appendChild(nameCard);
        });
    }
}

// Add new name
async function addName() {
    const name = newNameInput.value.trim();
    
    if (!name) {
        alert('Please enter a name!');
        return;
    }
    
    const data = await getData();
    
    // Check if name already exists (case-insensitive)
    const nameExists = Object.keys(data).some(
        existingName => existingName.toLowerCase() === name.toLowerCase()
    );
    
    if (nameExists) {
        alert('This name already exists!');
        return;
    }
    
    // Prompt for secret key
    const secretKey = prompt('Enter a secret key for this person (they will need this to access their images):');
    
    if (!secretKey || !secretKey.trim()) {
        alert('A secret key is required!');
        return;
    }
    
    // Add new name with empty images object and secret key
    const newData = {
        secretKey: secretKey.trim(),
        images: {}
    };
    
    await saveNameData(name, newData);
    newNameInput.value = '';
    await loadNames();
    
    alert(`Name "${name}" added successfully! Secret key has been set.`);
}

// Handle name selection
function handleNameSelect() {
    const selectedName = nameSelect.value;
    
    if (!selectedName) {
        imageSection.style.display = 'none';
        currentSelectedName = null;
        return;
    }
    
    currentSelectedName = selectedName;
    currentNameSpan.textContent = selectedName;
    imageSection.style.display = 'block';
    
    await loadImagesForName(selectedName);
    await displaySecretKey(selectedName);
}

// Display secret key for selected name
async function displaySecretKey(name) {
    const data = await getData();
    const userData = data[name];
    
    if (userData && currentKeyDisplay) {
        const key = userData.secretKey || 'No key set';
        currentKeyDisplay.textContent = key;
    }
}

// Update secret key
async function updateSecretKey() {
    if (!currentSelectedName) {
        alert('Please select a name first!');
        return;
    }
    
    const newKey = secretKeyInput.value.trim();
    
    if (!newKey) {
        alert('Please enter a secret key!');
        return;
    }
    
    const data = await getData();
    
    if (data[currentSelectedName]) {
        data[currentSelectedName].secretKey = newKey;
        await saveNameData(currentSelectedName, data[currentSelectedName]);
        secretKeyInput.value = '';
        await displaySecretKey(currentSelectedName);
        alert('Secret key updated successfully!');
    }
}

// Load images for selected name
async function loadImagesForName(name) {
    const data = await getData();
    const userData = data[name];
    
    if (!userData) return;
    
    const images = userData.images || {};
    
    // Load each level's image
    for (let i = 1; i <= 5; i++) {
        const preview = document.getElementById(`preview${i}`);
        const imageUrl = images[i.toString()];
        
        if (imageUrl) {
            preview.innerHTML = `<img src="${imageUrl}" alt="Level ${i} image" />`;
        } else {
            preview.innerHTML = '<span class="no-image">No image</span>';
        }
    }
    
    // Load success image
    const successPreview = document.getElementById('previewSuccess');
    const successImageUrl = images.success;
    
    if (successImageUrl) {
        successPreview.innerHTML = `<img src="${successImageUrl}" alt="Success image" />`;
    } else {
        successPreview.innerHTML = '<span class="no-image">No image</span>';
    }
}

// Handle file selection
function handleFileSelect(event, level) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file!');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const imageUrl = e.target.result;
        saveImage(level, imageUrl);
    };
    reader.readAsDataURL(file);
}

// Upload image (from file or URL)
// Upload image (from file or URL)
async function uploadImage(level) {
    if (!currentSelectedName) {
        alert('Please select a name first!');
        return;
    }
    
    const fileInput = document.getElementById(`imageFile${level === 'success' ? 'Success' : level}`);
    const urlInput = document.getElementById(`imageUrl${level === 'success' ? 'Success' : level}`);
    
    const file = fileInput.files[0];
    const url = urlInput.value.trim();
    
    if (file) {
        // Use file
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file!');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            await saveImage(level, e.target.result);
            fileInput.value = '';
        };
        reader.readAsDataURL(file);
    } else if (url) {
        // Use URL
        await saveImage(level, url);
        urlInput.value = '';
    } else {
        alert('Please select a file or enter an image URL!');
    }
}

// Save image to Firestore
async function saveImage(level, imageUrl) {
    if (!currentSelectedName) return;
    
    const data = await getData();
    
    if (!data[currentSelectedName]) {
        data[currentSelectedName] = { images: {} };
    }
    
    if (!data[currentSelectedName].images) {
        data[currentSelectedName].images = {};
    }
    
    data[currentSelectedName].images[level] = imageUrl;
    
    await saveNameData(currentSelectedName, data[currentSelectedName]);
    await loadImagesForName(currentSelectedName);
    await loadNames(); // Refresh the names list to update image count
    
    alert('Image saved successfully!');
}

// Remove image
async function removeImage(level) {
    if (!currentSelectedName) {
        alert('Please select a name first!');
        return;
    }
    
    if (!confirm('Are you sure you want to remove this image?')) {
        return;
    }
    
    const data = await getData();
    
    if (data[currentSelectedName] && data[currentSelectedName].images) {
        delete data[currentSelectedName].images[level];
        await saveNameData(currentSelectedName, data[currentSelectedName]);
        await loadImagesForName(currentSelectedName);
        await loadNames(); // Refresh the names list to update image count
        
        alert('Image removed successfully!');
    }
}

// Delete name
async function deleteName() {
    const selectedName = nameSelect.value;
    
    if (!selectedName) {
        alert('Please select a name to delete!');
        return;
    }
    
    if (!confirm(`Are you sure you want to delete "${selectedName}" and all their images?`)) {
        return;
    }
    
    await deleteNameData(selectedName);
    
    nameSelect.value = '';
    currentSelectedName = null;
    imageSection.style.display = 'none';
    
    await loadNames();
    alert(`"${selectedName}" has been deleted successfully!`);
}
