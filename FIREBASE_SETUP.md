# Valentine's Day Website - Firebase Setup Guide

## 🔥 Firebase Setup Instructions

Your website now uses Firebase Firestore to sync data across all devices! Follow these steps to set it up:

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Enter a project name (e.g., "valentine-website")
4. Follow the prompts to create your project

### Step 2: Enable Firestore Database

1. In your Firebase project, go to **Build** → **Firestore Database**
2. Click **Create database**
3. Select **Start in test mode** (for easier setup)
4. Choose a Firestore location (select closest to your users)
5. Click **Enable**

### Step 3: Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`)
4. Register your app (give it a nickname)
5. Copy the `firebaseConfig` object shown

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### Step 4: Update Your firebase-config.js File

1. Open the file `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};
```

3. Save the file

### Step 5: Set Up Firestore Security Rules (Optional but Recommended)

For better security after testing, update your Firestore rules:

1. Go to **Firestore Database** → **Rules** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /valentineData/{document=**} {
      allow read, write: if true;
    }
  }
}
```

For production, you should add proper authentication!

### Step 6: Test Your Setup

1. Open `admin.html` in your browser
2. Add a name with images
3. Open the same page on another device or browser
4. You should see the same data! 🎉

## 📱 Cross-Device Sync

Now that you're using Firebase:
- Data is stored in the cloud
- Works across all devices
- Real-time synchronization
- No need for backend servers

## 🚀 Deploy to GitHub Pages

Your website is already configured for GitHub Pages! Just:
1. Make sure `firebase-config.js` is committed with your actual config
2. Push to your repository
3. Your site will work from anywhere!

## ⚠️ Important Notes

- Keep your Firebase API key in the code - it's safe for web apps (Firebase has security rules to protect your data)
- The current setup is in "test mode" - perfect for personal use
- For production with multiple users, implement proper authentication
- Firebase free tier includes:
  - 50,000 reads/day
  - 20,000 writes/day
  - 1 GB storage
  - More than enough for personal use!

## 🆘 Troubleshooting

**Data not syncing?**
- Check browser console for errors (F12)
- Verify firebase-config.js has correct credentials
- Make sure Firestore is enabled in Firebase Console
- Check that security rules allow read/write

**"Firebase not defined" error?**
- Make sure you're connected to the internet
- Firebase CDN scripts need to load from the web
- Clear browser cache and reload

**Still having issues?**
- Check Firebase Console → Firestore → Data tab
- Verify your collection "valentineData" exists
- Look at the Firebase Console logs

## 🎉 You're All Set!

Your Valentine website now works across all devices. Add names and images from any device and they'll sync everywhere!
