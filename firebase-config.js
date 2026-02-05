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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Storage
const storage = firebase.storage();

// Collection name
const COLLECTION_NAME = 'valentineData';
