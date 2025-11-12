# Firebase Configuration Guide

This guide explains how to configure your own Firebase project for the Personal Resume Builder.

## Why You Need Your Own Firebase Project

The Firebase configuration in this repository is specific to the original author's project. To deploy your own version, you **must** create your own Firebase project and update the configuration.

## Step-by-Step Configuration

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** (or use an existing project)
3. Enter a project name (e.g., "my-resume-builder")
4. Choose whether to enable Google Analytics (optional)
5. Click **"Create project"**

### 2. Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Enter an app nickname (e.g., "Resume Website")
3. Check **"Also set up Firebase Hosting"** (optional but recommended)
4. Click **"Register app"**
5. **Copy the Firebase configuration** shown on the screen

### 3. Update Your Code

Open `src/lib/firebase.js` in your code editor and **replace the entire `firebaseConfig` object** with your credentials:

```javascript
// src/lib/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIza...YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456",
  measurementId: "G-ABCDEFGHIJ"
};

// Rest of the file remains the same...
```

### 4. Where to Find Your Configuration

You can always find your Firebase configuration in:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the **gear icon** → **Project settings**
4. Scroll down to **"Your apps"**
5. Select your web app
6. Under **"SDK setup and configuration"**, choose **"Config"**
7. Copy the configuration object

### 5. Update .firebaserc (Optional)

If you're using Firebase CLI, update `.firebaserc` with your project ID:

```json
{
  "projects": {
    "default": "YOUR_PROJECT_ID"
  }
}
```

## Security Notes

### Is it Safe to Commit Firebase Config?

**Yes!** Firebase configuration (API keys, project IDs, etc.) is meant to be public and is safe to commit to your repository. Here's why:

- **API keys are not secret** - They identify your Firebase project, not authenticate users
- **Security comes from Firestore rules** - Not from hiding your config
- **All client-side apps expose these values** - They're visible in network requests

### Real Security Measures

Your resume builder is secured by:

1. **Firestore Security Rules** (`firestore.rules`)
   - Public can read resume data
   - Only authenticated users can write

2. **Firebase Authentication**
   - Google Sign-in provides secure authentication
   - Only your Google account can access admin panel

3. **Authorized Domains**
   - Configure in Firebase Console → Authentication → Settings
   - Only requests from approved domains are allowed

## Customizing Initial Data

To customize the initial resume data:

1. Open `src/lib/initialResumeData.js`
2. Update the `header` and `sections` with your information
3. Run `await window.initializeDatabase()` in the browser console
4. This will populate your Firestore database

## Current Approach (v2.0)

The project currently uses **hardcoded credentials** in `src/lib/firebase.js` for simplicity and reliability. This is the recommended approach because:
- Works consistently in development and production
- No environment variable issues
- Firebase config is safe to commit (security comes from Firestore rules)

## Environment Variables (Alternative)

If you prefer, you can use a `.env` file instead of hardcoding credentials:

1. Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

2. Update `src/lib/firebase.js` to use environment variables:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
```

**Note:** The `.env` file won't be deployed (it's in `.gitignore`), so for production builds, hardcoded values are more reliable. This is why the default approach uses hardcoded values.

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"

**Solution:** You haven't updated the Firebase config in `src/lib/firebase.js`. Follow step 3 above.

### "This domain is not authorized"

**Solution:** Add your domain to authorized domains:
1. Firebase Console → Authentication → Settings → Authorized domains
2. Add your domain (e.g., `yoursite.web.app` or `yourdomain.com`)

### "Permission denied" when trying to read/write data

**Solution:** Deploy your Firestore security rules:
```bash
firebase deploy --only firestore:rules
```

### Can't sign in with Google

**Solution:** Enable Google Sign-in:
1. Firebase Console → Authentication → Sign-in method
2. Enable Google provider
3. Add your email as support email

## Summary Checklist

- [ ] Created Firebase project
- [ ] Registered web app
- [ ] Copied Firebase configuration
- [ ] Updated `src/lib/firebase.js` with your config
- [ ] Updated `.firebaserc` with your project ID
- [ ] Enabled Firestore Database
- [ ] Enabled Google Sign-in Authentication
- [ ] Deployed Firestore security rules
- [ ] Tested locally with `npm run dev`
- [ ] Initialized database with your resume data
- [ ] Built and deployed to Firebase Hosting

---

**Need more help?** Check the main [README.md](../README.md) or [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete instructions.

