# Deploying to GitHub Pages

This guide will help you deploy your Valentine's Day app to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your image files ready

## Step 1: Prepare Your Images

1. Add your image files to the appropriate folders:
   ```
   images/
   ├── john/
   │   ├── rejection1.jpg
   │   ├── rejection2.jpg
   │   ├── rejection3.jpg
   │   ├── rejection4.jpg
   │   ├── rejection5.jpg
   │   └── success.jpg
   └── (repeat for other people)
   ```

2. Keep images small (< 500KB each) for faster loading

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it something like `valentine-2026`
3. Make it **public** (required for GitHub Pages free tier)

## Step 3: Push Your Code

Open terminal/command prompt in your project folder:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit - Valentine's Day app"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/valentine-2026.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

## Step 5: Access Your Site

After a few minutes, your site will be available at:
```
https://YOUR_USERNAME.github.io/valentine-2026/
```

## Important Notes

### LocalStorage Behavior
- Each user's data is stored in their browser's localStorage
- Data is specific to the domain (your GitHub Pages URL)
- When you seed data or add people in admin panel, it only affects that specific browser
- Users need to visit the admin panel on the deployed site to set up their data

### First-Time Setup on GitHub Pages

After deployment, you or users need to:

1. Visit: `https://YOUR_USERNAME.github.io/valentine-2026/admin.html`
2. Click "🌱 Seed Sample Data" button (or add people manually)
3. Add actual image files to the repository that match the paths used

### Admin Panel URL

Share this with people who need to add/manage names:
```
https://YOUR_USERNAME.github.io/valentine-2026/admin.html
```

### Main Page URL

Share this with the people you want to send Valentine's messages to:
```
https://YOUR_USERNAME.github.io/valentine-2026/
```

## Updating Your Site

Whenever you make changes:

```bash
git add .
git commit -m "Update images or fix bugs"
git push
```

Changes will appear on GitHub Pages within a few minutes.

## Troubleshooting

### Images Not Loading

1. Check the image paths in admin panel match your actual file paths
2. Ensure images are committed to the repository
3. Try clearing browser cache

### LocalStorage Issues

- Each user/browser has separate localStorage
- Data set locally won't appear on GitHub Pages automatically
- You need to re-seed or manually add data when first accessing the deployed site

### 404 Error

- Ensure GitHub Pages is enabled in Settings
- Check that you're using the correct URL
- Wait a few minutes after first enabling GitHub Pages

## Custom Domain (Optional)

If you have a custom domain:

1. Add a `CNAME` file to your repository with your domain
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings with your custom domain

## Security Note

⚠️ **Important**: localStorage data (including secret keys) is stored in the browser and can be viewed by anyone with browser dev tools. This is fine for a fun Valentine's project, but don't use it for sensitive information!
