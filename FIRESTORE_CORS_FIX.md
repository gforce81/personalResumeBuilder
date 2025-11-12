# Fixing Firestore CORS/Private Network Access Error

## The Error

```
Access to fetch at 'https://firestore.googleapis.com/...' has been blocked by CORS policy: 
Permission was denied for this request to access the `unknown` address space.
```

## Root Cause

This error occurs when Firestore database hasn't been created in Firebase Console, or when Chrome's Private Network Access policy blocks the connection.

## Solution: Create Firestore Database

### Step 1: Create Database in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/project/simpleresumebuilder/firestore)
2. If you see **"Create database"** button, click it
3. Choose **"Start in production mode"** (we already have security rules)
4. Select location: **nam5 (us-central)** or your preferred region
5. Click **"Enable"**
6. Wait for database creation (takes 1-2 minutes)

### Step 2: Verify Rules Are Applied

After database is created:

```bash
cd /Users/gauthierrobe/cursorProjects/personalResumeBuilder
firebase deploy --only firestore:rules
```

### Step 3: Test Again

1. Clear browser cache (Cmd+Shift+R on Mac)
2. Visit https://simpleresumebuilder.web.app
3. Try signing in again

## Alternative: If Database Already Exists

If Firestore database already exists, this might be a Chrome Private Network Access issue:

### Option A: Use Different Browser (Quick Test)

Try Firefox or Safari to confirm it's a Chrome-specific issue.

### Option B: Update Chrome

Make sure you're on the latest Chrome version:
- Chrome menu → Help → About Google Chrome
- Update if available
- Restart Chrome

### Option C: Check Firestore Connection in Code

The error might also occur if Firebase isn't properly initialized. Verify in browser console:

```javascript
// Open Console (F12) and run:
console.log(window.firebase)
```

## Still Having Issues?

### Check Firebase Console

1. **Authentication Status:**
   - Firebase Console → Authentication → Users
   - Verify you can see your user after sign-in

2. **Firestore Status:**
   - Firebase Console → Firestore Database
   - Check if database is active and accessible

3. **Network Tab:**
   - Open DevTools → Network tab
   - Filter by "firestore"
   - Look for failed requests and their status codes

### Common Causes

| Issue | Solution |
|-------|----------|
| Database not created | Create database in Firebase Console |
| Wrong region | Recreate with correct region (nam5) |
| Rules not deployed | Run `firebase deploy --only firestore:rules` |
| Chrome policy | Try different browser or update Chrome |
| Network/Proxy | Check firewall/proxy settings |

## Technical Details

The "unknown address space" error is part of Chrome's **Private Network Access** feature, which restricts how public websites can access resources. This shouldn't affect Firestore (a public API), but can occur if:

1. Firestore isn't properly initialized
2. Database doesn't exist
3. There's a configuration mismatch
4. Chrome's security policy is being overly strict

## Prevention

After fixing, to prevent this in the future:

1. Always create Firestore database before deploying
2. Deploy rules immediately after creating database
3. Test with multiple browsers
4. Keep Chrome updated

---

**Most Common Fix:** Creating the Firestore database in Firebase Console solves this 90% of the time.

