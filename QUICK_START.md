# Quick Start - Personal Resume Builder

Get your resume builder up and running in minutes!

## ⚡ Super Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase
Edit `src/lib/firebase.js` with your Firebase credentials (see [FIREBASE_CONFIG.md](./FIREBASE_CONFIG.md))

### 3. Enable Google Sign-in
Go to Firebase Console → Authentication → Enable Google provider

### 4. Start Development
```bash
npm run dev
```

### 5. Initialize Data
Open browser console (F12) and run:
```javascript
await window.initializeDatabase()
```

### 6. Deploy
```bash
npm run build
firebase deploy
```

**Done!** Your resume is live! 🎉

## 📚 Need More Details?

- **Complete Setup:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Firebase Help:** [FIREBASE_CONFIG.md](./FIREBASE_CONFIG.md)
- **Design Custom:** [MODERN_DESIGN_GUIDE.md](./MODERN_DESIGN_GUIDE.md)
- **All Docs:** [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)

## ✨ Version 2.0 Features

Your resume builder includes:
- Modern two-column design
- Profile picture upload
- Social media links (GitHub, LinkedIn, Website)
- Visual skill tags
- Custom section icons
- 10 pre-formatted templates
- ATS-optimized PDF export

See [V2_RELEASE_NOTES.md](./V2_RELEASE_NOTES.md) for complete feature list!

