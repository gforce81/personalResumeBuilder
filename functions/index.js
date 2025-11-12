/**
 * Firebase Cloud Functions for Personal Resume Builder
 *
 * This file contains security functions to restrict admin access.
 *
 * Note: For blocking functions to work, you need Google Cloud Identity
 * Platform (GCIP). The current implementation uses client-side validation +
 * Firestore rules instead, which works with standard Firebase Auth (free).
 *
 * If you want to use blocking functions:
 * 1. Upgrade to Firebase Blaze plan
 * 2. Enable Google Cloud Identity Platform
 * 3. Uncomment the blocking function below
 */

const {setGlobalOptions} = require("firebase-functions/v2");
// const {beforeUserSignedIn} = require("firebase-functions/v2/identity");
// const {logger} = require("firebase-functions");

// Global options for all functions
setGlobalOptions({
  maxInstances: 10,
  region: "us-central1",
});

/**
 * Admin email whitelist
 * Only these email addresses are allowed to access the admin panel
 *
 * IMPORTANT: Update this list with your admin email address(es)
 * Also update ADMIN_EMAILS in src/lib/firebase.js to match
 *
 * Example: ["admin@example.com", "owner@example.com"]
 */
// const ADMIN_EMAILS = [
//   "g23e981@gmail.com",
//   // Add more admin emails here if needed
// ];

/**
 * OPTIONAL: beforeSignIn Blocking Function (Requires GCIP)
 *
 * Uncomment this function if you've enabled Google Cloud Identity Platform.
 * This provides the strongest security by preventing unauthorized sign-ins
 * at the Firebase Authentication level.
 *
 * To enable:
 * 1. Enable GCIP in Google Cloud Console
 * 2. Uncomment the code below
 * 3. Deploy: firebase deploy --only functions
 */

// exports.beforeSignIn = beforeUserSignedIn((event) => {
//   const user = event.data;
//   const email = user.email ? user.email.toLowerCase() : null;
//
//   // Log the sign-in attempt
//   logger.info("Sign-in attempt", {
//     email: email,
//     uid: user.uid,
//     provider: user.providerData && user.providerData[0] ?
//       user.providerData[0].providerId : "unknown",
//   });
//
//   // Check if email is in whitelist
//   const isAuthorized = ADMIN_EMAILS.some(
//       (adminEmail) => adminEmail.toLowerCase() === email,
//   );
//
//   if (!isAuthorized) {
//     logger.warn("Unauthorized sign-in attempt blocked", {
//       email: email,
//       uid: user.uid,
//     });
//
//     // Block the sign-in by throwing an error
//     throw new Error(
//         "Access denied. This resume website is private. " +
//         "Only authorized administrators can sign in.",
//     );
//   }
//
//   logger.info("Authorized sign-in allowed", {email: email});
//
//   // Allow the sign-in to proceed
//   return;
// });

// Placeholder export to prevent deployment errors
exports.placeholder = () => {
  return null;
};
