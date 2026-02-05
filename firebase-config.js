// Firebase Configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyByA58zp-3lnSn3oQZOWIZ3gasPtVLoQR0",
    authDomain: "kalpentine.firebaseapp.com",
    projectId: "kalpentine",
    storageBucket: "kalpentine.firebasestorage.app",
    messagingSenderId: "950477229640",
    appId: "1:950477229640:web:34f2200143102225fc527d",
    measurementId: "G-WXVMD6MF8X"
};

// Global variables
let db;
let storage;
const COLLECTION_NAME = 'valentineData';

// Initialize Firebase and wait for it to be ready
function initializeFirebase() {
    return new Promise((resolve, reject) => {
        try {
            // Check if Firebase SDK is loaded
            if (typeof firebase === 'undefined') {
                console.error('Firebase SDK not loaded');
                reject(new Error('Firebase SDK not loaded'));
                return;
            }
            
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            
            // Initialize Firestore
            db = firebase.firestore();
            
            // Initialize Storage
            storage = firebase.storage();
            
            console.log('Firebase initialized successfully');
            resolve();
        } catch (error) {
            console.error('Error initializing Firebase:', error);
            reject(error);
        }
    });
}

// Initialize immediately when this script loads
initializeFirebase().catch(error => {
    console.error('Failed to initialize Firebase:', error);
    alert('Failed to initialize Firebase. Please refresh the page.');
});
