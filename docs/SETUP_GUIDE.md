# Quick Setup Guide

Follow these steps to get your resume builder up and running.

## Step 1: Create Your Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or use an existing project
3. Follow the setup wizard (you can disable Google Analytics if you want)
4. Once created, click on **"Web"** icon (</>) to register your app
5. Give it a nickname and click **"Register app"**
6. **Copy the Firebase configuration** - you'll need this!

## Step 2: Configure Your Firebase Credentials

**Important:** Open `src/lib/firebase.js` in your code editor and replace the `firebaseConfig` with your own credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

You can find these values in:
- Firebase Console → Project Settings → Your apps → SDK setup and configuration

📚 **Need more details?** See [FIREBASE_CONFIG.md](./FIREBASE_CONFIG.md) for a complete configuration guide with screenshots and troubleshooting.

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Enable Services in Firebase

### Enable Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll deploy security rules later)
4. Select a location and click **"Enable"**

### Enable Google Sign-in
1. Navigate to **Authentication** → **Sign-in method**
2. Click on **Google** in the providers list
3. Toggle **Enable** switch to ON
4. Enter your email as the support email
5. Click **Save**

**Important:** You'll use your Google account to login to the admin panel!

## Step 5: Setup Firebase CLI

```bash
firebase login
firebase init
```

When prompted:
- Select: **Firestore** and **Hosting**
- Choose your Firebase project
- Accept default files for Firestore rules (`firestore.rules`)
- Set public directory: **dist**
- Configure as single-page app: **Yes**
- Set up automatic builds: **No**

Deploy your Firestore security rules:
```bash
firebase deploy --only firestore:rules
```

## Step 6: Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Step 7: Initialize Resume Data

1. Open your browser to `http://localhost:3000`
2. Open the browser console (Press F12)
3. Run this command:

```javascript
await window.initializeDatabase()
```

4. You should see: **"Database initialized successfully!"**

Your resume data is now loaded into Firestore!

## Step 8: Test the Application

1. **View Public Resume:** Already on the homepage
2. **Login to Admin:** Click "Admin Panel" button
3. **Sign in with Google** using your Google account
4. **Edit your resume** in the admin dashboard
5. **Click Save** to persist changes
6. **Click "View Resume"** to see the public view

**Note:** Only you (the Google account owner) will be able to access the admin panel. The first time you sign in with Google, Firebase will automatically create your user account.

## Step 9: Deploy to Firebase Hosting

```bash
npm run build
firebase deploy
```

Your site will be live at:
- `https://YOUR_PROJECT_ID.web.app`
- `https://YOUR_PROJECT_ID.firebaseapp.com`

## Customization Tips

### Change Colors
Edit `src/styles/colors.css` and update CSS variables:
- `--color-primary-600` (primary color)
- `--color-accent-600` (accent color)

### Change Fonts
Edit `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
}
```

### Update SEO
Edit `index.html` meta tags with your information.

## Troubleshooting

### Can't access Firebase Console
Make sure you're logged in to the Google account associated with the Firebase project.

### Authentication not working
- Verify Google Sign-in is enabled in Firebase Console → Authentication → Sign-in method
- Check that you've added authorized domains in Firebase Console (localhost should be there by default)
- Check browser console for errors
- Make sure you're using a valid Google account

### Resume not loading
- Verify Step 5 was completed (database initialization)
- Check Firestore Console → Data tab for `resume/main` document
- Check browser console for errors

### Build/Deploy errors
- Ensure Firebase CLI is installed: `npm install -g firebase-tools`
- Run `firebase login` and select correct account
- Ensure you've run `firebase init` in the project directory

## Support

Check the main [README.md](../README.md) for detailed documentation.

---

**You're all set! 🎉**

