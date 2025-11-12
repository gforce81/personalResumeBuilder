# Publishing to GitHub - Complete Guide

## ✅ Config System Implemented!

Your personal data is now in `src/config.local.js` which is **git-ignored** and will never be committed to GitHub.

## 🎯 How It Works

### What Gets Published (Public on GitHub)
- ✅ All source code
- ✅ All documentation  
- ✅ `src/config.default.js` - Template with placeholders
- ✅ `src/config.local.js.example` - Example for users
- ✅ Placeholder data in `firestore.rules` and `index.html`

### What Stays Private (Never Committed)
- 🔒 `src/config.local.js` - Your Firebase config, email, resume data
- 🔒 `.env` files
- 🔒 `node_modules/`, `dist/`, `.firebase/`

## 🚀 Quick Publish (Automated)

Run this script to prepare everything:

```bash
./scripts/prepare-for-github.sh
```

This will:
1. Update `firestore.rules` with placeholder email
2. Update `index.html` with generic meta tags
3. Remove your personal resume file
4. Verify `.gitignore` is correct
5. Confirm `config.local.js` exists locally

Then:
```bash
git add .
git commit -m "Initial commit - Personal Resume Builder v2.0"
git push
```

## 📝 Manual Publish (Step by Step)

If you prefer to do it manually:

### Step 1: Update firestore.rules

Open `firestore.rules` and change line 8:
```javascript
// FROM:
let adminEmails = ['g23e981@gmail.com'];

// TO:
let adminEmails = ['your-email@example.com'];
```

### Step 2: Update index.html

Open `index.html` and update lines 9-17:
```html
<!-- FROM: -->
<title>Gauthier Robe - Product Management Executive | Resume</title>
<meta name="description" content="Product management executive with 15+ years..." />
<meta name="author" content="Gauthier Robe" />
<meta property="og:title" content="Gauthier Robe - Product Management Executive" />

<!-- TO: -->
<title>Your Name - Your Title | Resume</title>
<meta name="description" content="Your professional summary..." />
<meta name="author" content="Your Name" />
<meta property="og:title" content="Your Name - Your Title" />
```

### Step 3: Remove Personal Resume File

```bash
rm "Gauthier Robe - Resume.md"
```

### Step 4: Verify Config is Git-Ignored

```bash
git status
# config.local.js should NOT appear in the list
```

### Step 5: Push to GitHub

```bash
git add .
git commit -m "Initial commit - Personal Resume Builder v2.0"
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git push -u origin main
```

## 🔄 After Publishing - Your Workflow

### Development & Deployment (No Changes!)
```bash
# Edit code as normal
npm run dev

# Your config.local.js is always used
# Make changes, test locally

# Deploy to Firebase
firebase deploy

# Commit and push to GitHub
git add .
git commit -m "Update feature X"
git push
```

**Your personal data in `config.local.js` is NEVER committed!**

### Pull Updates (Future)
```bash
git pull origin main
# No conflicts with config.local.js (it's ignored)
npm install  # If dependencies changed
npm run build
firebase deploy
```

## 👥 When Others Use Your Template

1. **They clone your repo:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/personal-resume-builder.git
   cd personal-resume-builder
   ```

2. **They see in README: "Create config.local.js"**

3. **They copy the example:**
   ```bash
   cp src/config.local.js.example src/config.local.js
   ```

4. **They edit with their data:**
   - Firebase credentials
   - Their email
   - Their resume content

5. **They build and deploy:**
   ```bash
   npm install
   npm run build
   firebase deploy
   ```

6. **Their data also stays private!**
   - Their `config.local.js` is also git-ignored
   - They can fork and contribute back
   - No personal data in their commits either

## ✅ Verification Checklist

Before publishing, verify:

- [ ] `src/config.local.js` exists (your data)
- [ ] `src/config.local.js` is in `.gitignore`
- [ ] `src/config.default.js` has placeholders
- [ ] `src/config.local.js.example` exists
- [ ] `firestore.rules` has placeholder email
- [ ] `index.html` has generic meta tags
- [ ] Personal resume file removed
- [ ] Run `git status` - config.local.js NOT listed
- [ ] Build succeeds: `npm run build`
- [ ] Deployment works: `firebase deploy`

## 🎉 Benefits Summary

**No more manual reverting:**
- ✅ Edit freely
- ✅ Commit anytime
- ✅ Push without worry
- ✅ Personal data always private
- ✅ Professional open-source setup

**Standard workflow:**
- Make changes → Test → Deploy → Commit → Push
- Everything just works!

---

**Ready to publish?** Run `./scripts/prepare-for-github.sh` and then push to GitHub!
