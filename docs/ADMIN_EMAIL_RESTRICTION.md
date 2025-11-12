# Admin Email Restriction Guide

This guide explains how the admin email whitelist works and how to configure it for your resume builder.

## Overview

The Personal Resume Builder includes email-based access control to restrict admin panel access to specific users. This ensures only you (or authorized administrators) can edit the resume content.

## How It Works

The security system uses **three layers of protection**:

1. **Client-Side Validation** (`src/App.jsx`)
   - Checks user email against whitelist immediately after sign-in
   - Automatically signs out unauthorized users
   - Provides good UX with immediate feedback

2. **Firestore Security Rules** (`firestore.rules`)
   - Enforces access control at the database level
   - Prevents unauthorized writes even if client-side check is bypassed
   - Server-side enforcement ensures true security

3. **Optional: Blocking Functions** (`functions/index.js`)
   - **Requires** Google Cloud Identity Platform (GCIP) - currently disabled
   - Would prevent unauthorized sign-ins at the Firebase Auth level
   - Strongest security but requires additional setup

## Configuration

To configure admin access, you need to update **TWO files**:

### 1. Update src/lib/firebase.js

Open `src/lib/firebase.js` and modify the `ADMIN_EMAILS` array:

```javascript
/**
 * Admin email whitelist
 * Only these email addresses can access the admin panel
 */
export const ADMIN_EMAILS = [
  "your.email@gmail.com",  // Replace with your email
  // "colleague@example.com", // Uncomment to add more admins
];
```

### 2. Update firestore.rules

Open `firestore.rules` and update the `adminEmails` list:

```javascript
function isAdmin() {
  // List of authorized admin email addresses
  // IMPORTANT: Keep this in sync with ADMIN_EMAILS in src/lib/firebase.js
  let adminEmails = [
    'your.email@gmail.com'  // Replace with your email (lowercase)
  ];
  return request.auth != null && 
         request.auth.token.email.lower() in adminEmails;
}
```

**Important Notes:**
- Emails in Firestore rules should be lowercase
- Must match exactly with `src/lib/firebase.js`
- Update BOTH files for full security

### 3. Rebuild and Deploy

After making changes:

```bash
# Rebuild the frontend
npm run build

# Deploy everything
firebase deploy
```

## Adding Multiple Admins

To allow multiple administrators:

**src/lib/firebase.js:**
```javascript
export const ADMIN_EMAILS = [
  "admin1@example.com",
  "admin2@example.com",
  "admin3@example.com"
];
```

**firestore.rules:**
```javascript
let adminEmails = [
  'admin1@example.com',
  'admin2@example.com',
  'admin3@example.com'
];
```

## Testing

To test the access restriction:

1. **Test Authorized Access:**
   - Sign in with an email in the whitelist
   - You should be redirected to `/admin`
   - You should be able to edit and save the resume

2. **Test Unauthorized Access:**
   - Sign in with an email NOT in the whitelist
   - You should be automatically signed out
   - Check browser console for "Unauthorized access attempt" message

3. **Test Firestore Rules:**
   - Try to access Firestore directly (using Firebase Console)
   - Unauthorized users should be unable to write to `/resume` collection

## Security Features

### What's Protected:

✅ **Admin Panel Access** - Only whitelisted emails can access `/admin`  
✅ **Resume Editing** - Only admins can modify resume data in Firestore  
✅ **Settings** - Only admins can read/write settings  
✅ **Automatic Sign-Out** - Unauthorized users are immediately signed out

### What's NOT Protected:

⚠️ **Public Resume View** - Anyone can view your resume at `/` (this is intentional)  
⚠️ **Google Sign-In** - Anyone can attempt to sign in (but will be signed out if not authorized)

## Optional: Enable Blocking Functions

For the **strongest security**, you can enable blocking functions that prevent unauthorized sign-ins at the Firebase Authentication level.

### Requirements:

1. **Firebase Blaze Plan** (pay-as-you-go)
2. **Google Cloud Identity Platform** (GCIP) enabled

### Steps to Enable:

1. **Upgrade to Blaze Plan:**
   - Go to Firebase Console → Upgrade
   - Choose Blaze plan (free tier included)

2. **Enable GCIP:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project
   - Enable "Identity Platform" API
   - Follow GCIP setup wizard

3. **Uncomment Blocking Function:**
   
   Open `functions/index.js` and uncomment:
   - The `ADMIN_EMAILS` constant (lines 35-38)
   - The entire `exports.beforeSignIn` function (lines 53-87)
   - The import statements at the top (lines 17-18)

4. **Deploy Functions:**
   ```bash
   firebase deploy --only functions
   ```

### Benefits of Blocking Functions:

- 🔒 **Prevents sign-in** - Unauthorized users cannot sign in at all
- 📊 **Logging** - Logs all sign-in attempts in Cloud Functions logs
- ⚡ **Immediate feedback** - Error shown before sign-in completes
- 🛡️ **Strongest security** - Enforced at Firebase Auth level

### Costs:

- **Cloud Functions:** Very low cost (free tier: 2M invocations/month)
- **Estimated:** $0 - $1/month for typical personal resume site
- **GCIP:** Free for up to 50 sign-ins/month

## Troubleshooting

### "I can't sign in even though my email is in the list"

**Check:**
1. Email is spelled correctly (case-insensitive)
2. You updated BOTH `src/lib/firebase.js` AND `firestore.rules`
3. You rebuilt and redeployed: `npm run build && firebase deploy`
4. Clear browser cache and try again
5. Check browser console for error messages

### "Permission denied" error when saving resume

**Solution:**
1. Verify email is in `firestore.rules` adminEmails list
2. Email in rules must be lowercase
3. Redeploy Firestore rules: `firebase deploy --only firestore:rules`

### Someone else can access my admin panel

**Immediate action:**
1. Check `src/lib/firebase.js` - ensure only your email is listed
2. Check `firestore.rules` - ensure only your email is listed
3. Rebuild and redeploy immediately
4. Consider enabling blocking functions for stronger security

### How to remove an admin

1. Remove email from `src/lib/firebase.js` ADMIN_EMAILS array
2. Remove email from `firestore.rules` adminEmails list
3. Rebuild and redeploy
4. The removed admin will be signed out on next page load

## Best Practices

1. **Keep Lists Synchronized** - Always update both files together
2. **Use Personal Emails** - Use your actual Google account email
3. **Deploy After Changes** - Always rebuild and deploy after updating
4. **Test Regularly** - Periodically test with unauthorized email
5. **Enable Blocking Functions** - For production sites with sensitive data
6. **Monitor Access** - Check Firebase Console → Authentication → Users periodically

## Summary

- ✅ Update `src/lib/firebase.js` with admin emails
- ✅ Update `firestore.rules` with admin emails (lowercase)
- ✅ Rebuild: `npm run build`
- ✅ Deploy: `firebase deploy`
- ✅ Test with both authorized and unauthorized emails
- 🔒 Consider enabling blocking functions for maximum security

## Version 2.0 Note

As of v2.0, the admin panel includes additional features that are protected by this email restriction:
- Profile picture uploads (Firebase Storage)
- Section icon customization
- Enhanced header fields (title, social links)
- All admin dashboard features

The security system remains the same and continues to work perfectly with all new features.

---

**Questions?** Check the main [README.md](../README.md) or [FIREBASE_CONFIG.md](./FIREBASE_CONFIG.md) for more information.

