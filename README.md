# 💕 Valentine's Day Proposal App

A fun, interactive web app to ask someone to be your Valentine! Features multiple rejection screens that get progressively more desperate before they finally accept. 😊

## 🌟 Features

- **Personalized Messages**: Each person has their own name and secret key
- **5 Rejection Levels**: Fun images for each "No" response
- **Success Celebration**: Special image and confetti when they say "Yes!"
- **Admin Panel**: Easy management of people and their images
- **Secret Key Protection**: Prevents users from accessing others' messages
- **Fully Static**: No backend required - perfect for GitHub Pages!

## 🚀 Quick Start

### For Users

1. Visit the main page: `index.html`
2. Enter your name and secret key
3. Enjoy the Valentine's proposal experience!

### For Admins

1. Visit the admin panel: `admin.html`
2. Click "🌱 Seed Sample Data" to populate with examples, or
3. Manually add people with their secret keys and images

## 📁 Project Structure

```
Kalpentine/
├── index.html          # Main user-facing page
├── script.js           # Main page logic
├── admin.html          # Admin panel
├── admin.js            # Admin panel logic
├── styles.css          # All styling
├── images/             # Image assets
│   ├── john/          # Example person's images
│   ├── sarah/         # Example person's images
│   └── alex/          # Example person's images
├── DEPLOYMENT.md       # GitHub Pages deployment guide
└── README.md           # This file
```

## 🖼️ Adding Images

### Option 1: Local Images (Recommended for GitHub Pages)

1. Create a folder in `images/` for each person
2. Add 6 images per person:
   - `rejection1.jpg` through `rejection5.jpg`
   - `success.jpg`
3. In admin panel, use relative paths: `./images/name/rejection1.jpg`

### Option 2: External URLs

Use image hosting services like Imgur:
1. Upload images to Imgur or similar
2. In admin panel, paste the direct image URLs

## 🔐 Secret Keys

Each person has a secret key to prevent unauthorized access:

- **John**: `love123`
- **Sarah**: `heart456`
- **Alex**: `valentine789`

Users must know both their name AND secret key to access their personalized experience.

## 🎯 How It Works

1. User enters name + secret key
2. System validates credentials
3. Shows first rejection image with "Will you be my Valentine?"
4. Each "No" shows a progressively more desperate image
5. After 5 "No" clicks (or clicking "Yes" anytime), shows success screen
6. Confetti celebration! 🎉

## 🌐 Deploying to GitHub Pages

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

**Quick version:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

Then enable GitHub Pages in repository Settings → Pages.

## 💾 Data Storage

- Uses browser `localStorage` for all data
- No backend or database required
- Data persists per browser/device
- Each domain (localhost vs GitHub Pages) has separate storage

## 🎨 Customization

### Colors
Edit `styles.css` - main color scheme uses pink gradients:
- Primary: `#ff6b9d`
- Secondary: `#c06c84`
- Accent: `#f67280`

### Messages
Edit `script.js` - look for the `messages` array to customize desperation texts

### Images
Replace or add images in the `images/` folder

## 🛠️ Technologies

- Pure HTML/CSS/JavaScript
- No frameworks or dependencies
- LocalStorage API
- FileReader API (for image uploads)

## 📝 Admin Features

- ➕ Add new people with secret keys
- 🖼️ Upload images (file or URL)
- 🔐 Manage secret keys
- 🗑️ Delete people and their data
- 👁️ Preview all uploaded images
- 🌱 Seed sample data for testing

## 🎭 Use Cases

- Valentine's Day proposals
- Birthday surprises
- Anniversary messages
- Just-for-fun romantic gestures
- Teaching localStorage and DOM manipulation

## 📄 License

Free to use and modify for personal projects!

## 🤝 Contributing

Feel free to fork and add features like:
- More rejection levels
- Sound effects
- Different themes (Christmas, Birthday, etc.)
- Export/import functionality
- Better mobile responsiveness

## 💡 Tips

- Keep images under 500KB each for best performance
- Use romantic/funny memes for rejection images
- Use celebratory images for success
- Test locally before deploying
- Share the secret keys privately with each person

---

Made with 💕 for Valentine's Day 2026
