# Images Folder

This folder contains all the images used in the Valentine's Day application.

## Folder Structure

```
images/
├── john/
│   ├── rejection1.jpg
│   ├── rejection2.jpg
│   ├── rejection3.jpg
│   ├── rejection4.jpg
│   ├── rejection5.jpg
│   └── success.jpg
├── sarah/
│   ├── rejection1.jpg
│   ├── rejection2.jpg
│   ├── rejection3.jpg
│   ├── rejection4.jpg
│   ├── rejection5.jpg
│   └── success.jpg
└── alex/
    ├── rejection1.jpg
    ├── rejection2.jpg
    ├── rejection3.jpg
    ├── rejection4.jpg
    ├── rejection5.jpg
    └── success.jpg
```

## How to Add Images

For each person, you need:
- **5 rejection images** (rejection1.jpg - rejection5.jpg): Shown when they click "No"
- **1 success image** (success.jpg): Shown when they finally say "Yes"

### Supported Formats
- JPG/JPEG
- PNG
- GIF
- WebP

### Recommended Image Specs
- **Size**: 800x600px or similar aspect ratio
- **File size**: < 500KB per image (smaller is better for GitHub Pages)
- **Content**: Fun, cute, or romantic memes/images

## Adding Your Own Person

1. Create a new folder: `images/yourname/`
2. Add 5 rejection images + 1 success image
3. In admin panel, add the person and use paths like:
   - `./images/yourname/rejection1.jpg`
   - `./images/yourname/rejection2.jpg`
   - etc.

## Using External URLs

You can also use external image URLs (like Imgur) instead of local files:
- `https://i.imgur.com/abc123.jpg`

Just paste the URL in the admin panel when setting images.
