# Post-Clone Setup Guide

**For users who cloned this repository from GitHub**

Welcome! This guide will help you set up your own personal resume builder.

## 📋 Prerequisites

- Node.js 18+ installed
- A Firebase account
- Firebase CLI installed: `npm install -g firebase-tools`

## 🚀 Quick Setup (5 Steps)

### Step 1: Create Your Personal Config

```bash
# Copy the example config
cp src/config.local.js.example src/config.local.js

# Open and edit with your data
code src/config.local.js  # Or your preferred editor
```

Update with your information:
- Firebase credentials
- Your email address
- Your resume content
- Your SEO metadata

### Step 2: Create Firebase Project Config

```bash
# Copy the example
cp .firebaserc.example .firebaserc

# Edit with your Firebase project ID
code .firebaserc
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Firebase

```bash
firebase login
firebase init

# Select: Firestore, Storage, Hosting
# Choose your Firebase project
# Accept defaults
```

### Step 5: Deploy

```bash
# Build
npm run build

# Deploy to Firebase
firebase deploy
```

**Done!** Your resume is live! 🎉

## 📚 Detailed Instructions

Need more help? See:
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup guide
- [FIREBASE_CONFIG.md](./FIREBASE_CONFIG.md) - Firebase configuration
- [QUICK_START.md](./QUICK_START.md) - Quick start guide

## ⚠️ Important Files

### Must Create (Not in Repository)
These files are git-ignored for privacy:

1. **`src/config.local.js`**
   - Your personal data
   - Copy from `src/config.local.js.example`
   - Update with your information

2. **`.firebaserc`**
   - Your Firebase project ID
   - Copy from `.firebaserc.example`
   - Update with your project

### Never Commit
Your `.gitignore` is configured to prevent committing:
- `src/config.local.js` - Your personal data
- `.firebaserc` - Your Firebase project
- `.env` files - Environment variables
- `node_modules/`, `dist/` - Build artifacts

## 🔍 Verify Setup

```bash
# Check that personal files are ignored
git status

# You should NOT see:
# - src/config.local.js
# - .firebaserc

# Test build
npm run build

# Test local dev server
npm run dev
```

## 🎨 Customization

After setup, customize your resume:

1. **Design:** Edit `src/styles/colors.css`
2. **Templates:** Edit files in `src/templates/`
3. **Admin:** Login and update via admin panel

See [MODERN_DESIGN_GUIDE.md](./MODERN_DESIGN_GUIDE.md) for details.

## 🆘 Troubleshooting

### "Cannot find module '../config.local.js'"
**Solution:** You haven't created `src/config.local.js` yet
```bash
cp src/config.local.js.example src/config.local.js
# Then edit the file with your data
```

### "Firebase project not found"
**Solution:** You haven't created `.firebaserc` yet
```bash
cp .firebaserc.example .firebaserc
# Then edit with your Firebase project ID
```

### "Permission denied" errors
**Solution:** Enable required Firebase services in Firebase Console
- Firestore Database
- Authentication (Google Sign-in)
- Storage
- Hosting

## 📖 Next Steps

1. ✅ Complete the 5-step setup above
2. 📝 Login to admin panel and customize your resume
3. 🎨 Customize colors and design (optional)
4. 🚀 Share your resume URL!

---

**Need help?** Check [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md) for all guides.

