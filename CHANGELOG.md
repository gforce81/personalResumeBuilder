# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2024-11-11 🎉 Major Redesign

### ✨ Complete Resume View Redesign

**Replaced** the simple plain-text resume view with a modern, dynamic two-column design:

- **Two-Column Layout**: Main content (left) + sidebar (right) for better visual hierarchy
- **Card-Based Sections**: Each section in its own card with subtle shadows and hover effects
- **Section Icons**: Beautiful icons for each section type (briefcase, graduation cap, code, etc.)
- **Gradient Header**: Eye-catching gradient background (blue to purple)
- **Profile Picture Support**: Optional circular profile photo or initial placeholder
- **Social Media Links**: GitHub, LinkedIn, Twitter, Website with icons
- **Skill Tags**: Skills displayed as colorful tags/pills (parsed from markdown)
- **Fully Responsive**: Optimized layouts for desktop, tablet, and mobile
- **Modern Aesthetic**: Professional design reflecting product executive + technical background

### 📋 Section Templates Moved to Files

- **Templates Folder**: All templates now in `src/templates/*.md` files
- **Easy Maintenance**: Edit templates directly in markdown files
- **Better Organization**: One file per template type
- **Vite Integration**: Templates loaded as raw text at build time

### 🎨 Color Scheme System

- **CSS Custom Properties**: All colors defined in `src/styles/colors.css`
- **Easy Customization**: Change entire theme by editing one file
- **Consistent Theming**: Variables used throughout the app
- **Dark Mode Ready**: Structure supports dark mode (not yet implemented)

### 🔒 Enhanced Header Structure

Added new header fields:
- **Professional Title**: Subtitle below name
- **Profile Picture URL**: Optional profile photo
- **Social Links**: GitHub, LinkedIn, Twitter, Website
- **Location**: Now prominently displayed

### 📄 Improved PDF Export

- **ATS-Optimized**: Simpler, cleaner format for applicant tracking systems
- **Centered Header**: Professional centered name and contact info
- **Better Spacing**: Improved readability and structure
- **Section Underlines**: Clear visual separation
- **Smart Page Breaks**: Content doesn't awkwardly split across pages
- **Includes Title**: Professional title now in PDF

### 🚀 Performance & UX

- **New Markdown Editor**: Switched from SimpleMDE to @uiw/react-md-editor
  - ✅ Zero console warnings (fixed passive listener issue)
  - ✅ Smooth, lag-free typing
  - ✅ Modern toolbar with better icons
  - ✅ Built-in preview modes
- **Cleaner Admin Interface**: Updated to support new header fields

## [1.3.0] - 2024-11-11

### Added
- **Section Templates**: Pre-formatted templates for common resume sections
  - 9 template types: Experience, Education, Skills, Summary, Certifications, Projects, Awards, Publications, Volunteer
  - Template selection modal with descriptions
  - Each template includes proper markdown formatting examples
  - Helps users understand how to format their content

### Changed
- **Markdown Editor**: Replaced SimpleMDE with @uiw/react-md-editor
  - ✅ Zero passive event listener warnings
  - ✅ Smooth, responsive typing (no lag)
  - ✅ Modern, clean interface
  - ✅ Built-in preview toggle
  - ✅ Better performance overall
  - Removed SimpleMDE and EasyMDE dependencies

- **Add Section Flow**: Now shows template selection modal
  - Click "Add Section" → Choose template → Section created with example formatting
  - Can still choose "Blank Section" to start from scratch
  - Better UX for first-time users

### Removed
- SimpleMDE editor (replaced with @uiw/react-md-editor)
- EasyMDE dependency
- FontAwesome dependency (no longer needed)

## [1.2.0] - 2024-11-11

### Added
- **Admin Email Whitelist**: Restrict admin panel access to specific email addresses
  - Three-layer security: client-side validation, Firestore rules, optional blocking functions
  - Configurable admin emails in `src/lib/firebase.js`
  - Server-side enforcement in `firestore.rules`
  - Automatic sign-out for unauthorized users
  - Comprehensive documentation in ADMIN_EMAIL_RESTRICTION.md

### Changed
- **App.jsx**: Added email validation on sign-in
  - Checks user email against ADMIN_EMAILS whitelist
  - Automatically signs out unauthorized users
  - Better security with client-side + server-side checks

- **Firestore Rules**: Enhanced security with admin email validation
  - Only whitelisted emails can write to resume data
  - Helper function `isAdmin()` for email verification
  - Server-side enforcement of access control

- **Login Component**: Improved error handling
  - Better error messages for unauthorized access
  - Graceful handling of access denied scenarios

### Security
- ✅ Client-side email validation
- ✅ Server-side Firestore rules enforcement
- ✅ Multiple admin support
- ✅ Automatic unauthorized user sign-out
- 🔒 Optional blocking functions (requires GCIP)

## [1.1.1] - 2024-11-11

### Added
- **FIREBASE_CONFIG.md**: Comprehensive Firebase configuration guide
  - Step-by-step instructions for creating Firebase projects
  - Detailed explanation of where to find and update credentials
  - Security notes explaining why Firebase config is safe to commit
  - Troubleshooting section for common configuration issues

### Changed
- **Firebase Configuration**: Moved from environment variables to hardcoded config
  - Firebase credentials now in `src/lib/firebase.js` (easier for deployment)
  - Removed dependency on `.env` file for production builds
  - Simplified setup process for new users

### Updated
- **README.md**: Added Firebase configuration instructions
  - Clear steps for setting up own Firebase project
  - Links to detailed configuration guide
  - Updated prerequisites and installation steps
- **SETUP_GUIDE.md**: Restructured for better clarity
  - Firebase project creation as Step 1
  - Configuration as Step 2
  - Clear numbering for all 9 steps
- **Documentation**: Added comprehensive documentation index
  - Cross-references between all documentation files
  - Clear guidance for different use cases

### Fixed
- Resolved "invalid-api-key" error when deploying to Firebase Hosting
- Fixed environment variable loading issues in production builds

## [1.1.0] - 2024-11-11

### Changed
- **Authentication System**: Switched from email/password to Google Sign-in
  - More secure and convenient authentication method
  - No need to manage passwords
  - One-click sign-in with Google account
  - Automatically creates user on first sign-in

### Updated
- Login component now uses `signInWithPopup` with Google provider
- Updated all documentation (README, SETUP_GUIDE, PROJECT_SUMMARY)
- Improved error handling for Google Sign-in edge cases
- Modern Google Sign-in button with official Google logo

### Benefits
- **Easier Setup**: No need to manually create users in Firebase Console
- **Better Security**: Leverages Google's secure authentication
- **Better UX**: One-click sign-in, no password to remember
- **Automatic User Creation**: First-time sign-in automatically creates user

### Migration Notes
If you were using email/password authentication:
1. Enable Google Sign-in in Firebase Console (Authentication → Sign-in method)
2. Sign in with your Google account
3. You can disable email/password authentication if desired

## [1.0.0] - 2024-11-11

### Added
- Initial release of Personal Resume Builder
- React + Vite frontend
- Firebase backend (Firestore, Authentication, Hosting)
- Public resume view with export functionality
- Admin dashboard with markdown editor
- Flexible section management
- ATS-optimized PDF export
- Markdown export
- SEO optimization
- Responsive design
- Clean, professional CSS

