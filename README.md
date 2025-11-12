# Personal Resume Builder

A **modern, beautiful, single-tenant** resume builder featuring a dynamic two-column design, card-based sections, and visual skill tags. Built with React, Firebase, and Tailwind CSS.

**✨ Version 2.0** - Complete redesign with modern aesthetic, profile pictures, social media links, custom section icons, and Firebase Storage uploads!

**🚀 Quick Start:** See [QUICK_START.md](./QUICK_START.md) for the fastest way to get started!

**📚 Full Documentation:** See [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md) for complete documentation guide.

**Deploy your own:** This project is designed to be easily deployed by anyone. Simply clone, configure your Firebase project, and deploy! See [FIREBASE_CONFIG.md](./FIREBASE_CONFIG.md) for detailed configuration instructions.

## Features

✨ **Modern Two-Column Design** - Dynamic layout with cards, icons, and gradient header  
👤 **Profile & Social Links** - Upload profile picture, GitHub, LinkedIn, Website  
🏷️ **Visual Skill Tags** - Skills displayed as colorful badges (auto-parsed from markdown)  
🔐 **Secure Admin Panel** - Google Sign-in with email whitelist  
📝 **Smooth Markdown Editor** - Zero lag, modern toolbar, live preview  
📋 **Section Templates** - 10 pre-formatted templates in dedicated .md files  
🔄 **Flexible Sections** - Add, remove, and reorder with template selection  
📄 **Dual Export** - Beautiful online view + ATS-optimized PDF  
📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile  
🎨 **Customizable Colors** - Easy theme customization via CSS variables  
🚀 **Firebase Hosting** - One-command deployment

## Tech Stack

- **Frontend:** React 18 with Vite
- **Styling:** Tailwind CSS + Custom CSS Variables
- **Backend:** Firebase (Firestore, Authentication, Storage, Hosting)
- **Markdown:** react-markdown, @uiw/react-md-editor
- **PDF Export:** jsPDF (ATS-optimized)
- **Icons:** Lucide React (20+ customizable icons)
- **Templates:** Individual .md files in `src/templates/`

## Project Structure

```
personalResumeBuilder/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ResumeView.jsx       # Public resume display
│   │   ├── Login.jsx            # Admin login
│   │   └── AdminDashboard.jsx   # Admin interface
│   ├── lib/               # Utilities and services
│   │   ├── firebase.js          # Firebase configuration
│   │   ├── resumeService.js     # Firestore operations
│   │   ├── pdfExport.js         # PDF generation
│   │   ├── markdownExport.js    # Markdown export
│   │   ├── initialResumeData.js # Initial data
│   │   └── initializeDatabase.js# Database setup
│   ├── styles/            # CSS files
│   │   └── resume.css           # Professional resume styles
│   ├── App.jsx            # Main application
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── firebase.json          # Firebase configuration
├── firestore.rules        # Database security rules
└── package.json           # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Firebase project (you'll need to create your own)
- Firebase CLI: `npm install -g firebase-tools`

### Installation

1. **Clone or download this repository**

2. **Create Your Personal Config**
   
   ```bash
   # Copy the example config file
   cp src/config.local.js.example src/config.local.js
   
   # Edit the file with your information
   # (See POST_CLONE_SETUP.md for detailed instructions)
   ```

3. **Create a Firebase Project**
   
   Go to [Firebase Console](https://console.firebase.google.com/) and:
   - Click "Add project" or use an existing project
   - Enable Firestore Database (test mode for development)
   - Enable Authentication → Google Sign-in method
   - Note your project credentials (you'll need them in the next step)

4. **Update Your Config File**
   
   **Important:** Open `src/config.local.js` and update with your Firebase credentials and personal data:
   
   ```javascript
   export default {
     firebase: {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       // ... rest of Firebase config
     },
     adminEmails: ["your-email@example.com"],
     initialResume: { /* your resume data */ },
     seo: { /* your SEO metadata */ }
   };
   ```
   
   📚 **Detailed instructions:** See [POST_CLONE_SETUP.md](./POST_CLONE_SETUP.md) for step-by-step guide.
   
   You can find Firebase values in Firebase Console → Project Settings → Your apps → SDK setup and configuration.

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Login to Firebase**
   ```bash
   firebase login
   ```

6. **Initialize Firebase in your project**
   ```bash
   firebase init
   ```
   - Select: Firestore, Hosting
   - Choose your Firebase project
   - Accept default Firestore rules files (`firestore.rules`)
   - Set public directory: `dist`
   - Configure as single-page app: Yes
   - Set up automatic builds: No

7. **Deploy Firestore Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

### First-Time Setup

#### 1. Enable Google Sign-in

You need to enable Google Sign-in in Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Google** and toggle **Enable**
5. Enter your email as the support email and click **Save**

#### 2. Initialize Resume Data

After creating your admin user, initialize the database with your resume:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the browser console (F12)

3. Run this command:
   ```javascript
   await window.initializeDatabase()
   ```

4. You should see: "Database initialized successfully!"

Your resume is now loaded into Firestore and ready to use!

## Development

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Deploy to Firebase Hosting

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

3. **Your site will be live at:**
   - `https://simpleresumebuilder.web.app`
   - `https://simpleresumebuilder.firebaseapp.com`

### Custom Domain Setup (r0b3.com/resume)

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the instructions to verify domain ownership
4. Add the provided DNS records to your domain registrar
5. Wait for SSL certificate provisioning (can take up to 24 hours)

For subdirectory hosting (like `/resume`), you may need to configure your domain's DNS to use:
- A subdomain redirect, or
- Configure your main domain hosting to proxy `/resume` to Firebase

## Usage

### Public Resume View

- Visit the root URL (`/`) to view the public resume
- Click export buttons to download PDF or Markdown
- Click "Admin Panel" to access the admin interface (requires login)

### Admin Panel

1. **Login:** Navigate to `/admin` or click "Admin Panel"
2. **Edit Header:** Update name, phone, email, location
3. **Manage Sections:**
   - Click "Add Section" to create new sections
   - Edit section titles inline
   - Use the markdown editor for content
   - Toggle preview to see rendered markdown
   - Use arrow buttons to reorder sections
   - Click trash icon to delete sections
4. **Save:** Click "Save" to persist changes
5. **View:** Click "View Resume" to see your public resume

### Markdown Formatting Tips

The editor supports standard markdown:

```markdown
## Heading 2
### Heading 3
#### Heading 4

**Bold text**
*Italic text*

* Bullet list item
* Another item

1. Numbered list
2. Second item

[Link text](https://example.com)
```

## Customization

### Firebase Configuration

To use this with your own Firebase project:
1. Open `src/lib/firebase.js`
2. Replace the `firebaseConfig` object with your project's credentials
3. Get your config from Firebase Console → Project Settings → Your apps

### Styling

All resume styles are in `src/styles/resume.css`. The CSS is well-organized with comments:

- **Colors:** Modify the blue theme by changing `#0284c7` and `#0c4a6e`
- **Fonts:** Change font families in `tailwind.config.js`
- **Spacing:** Adjust padding and margins in `.resume-container` and sections
- **Layout:** Modify max-width in `.resume-container` (default: 850px)

### Tailwind Configuration

Edit `tailwind.config.js` to customize:
- Color palette
- Font families
- Breakpoints
- Spacing scale

## Data Structure

Resume data in Firestore follows this structure:

```javascript
{
  header: {
    name: "Your Name",
    phone: "+1 (555) 123-4567",
    email: "you@example.com",
    location: "City, State"
  },
  sections: [
    {
      id: "unique-id",
      title: "Section Title",
      content: "Markdown content...",
      order: 0
    }
  ],
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## Security

- **Admin Email Whitelist:** Only authorized emails can access admin panel (see [ADMIN_EMAIL_RESTRICTION.md](./ADMIN_EMAIL_RESTRICTION.md))
- **Firestore Rules:** Public read access for resume, admin-only write access enforced server-side
- **Storage Rules:** Public read for profile pictures, authenticated write only
- **Authentication:** Google Sign-in via Firebase Authentication
- **Client + Server Validation:** Three-layer security (client check, Firestore rules, optional blocking functions)
- **Authorized Domains:** Configure in Firebase Console for production domains

## Troubleshooting

### Can't login to admin panel
- Verify Google Sign-in is enabled in Firebase Console → Authentication → Sign-in method
- Check that localhost is in authorized domains (Firebase Console → Authentication → Settings)
- Check browser console for error messages
- Ensure Firebase config is correct
- Try using a different browser or clearing cache

### Resume not loading
- Check browser console for errors
- Verify you ran `window.initializeDatabase()` in the console
- Check Firestore database has a `resume/main` document

### Deployment fails
- Ensure Firebase CLI is installed: `npm install -g firebase-tools`
- Run `firebase login` and select correct account
- Check `firebase.json` configuration
- Ensure you ran `npm run build` first

### PDF export issues
- PDF export works best in Chrome/Edge
- Ensure no console errors when clicking export
- Check that resume data is fully loaded

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source. Feel free to use it for your own resume!

## Documentation

📚 **[See DOCUMENTATION_INDEX.md for complete documentation guide](./DOCUMENTATION_INDEX.md)**

### Quick Links:

**Getting Started:**
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Step-by-step setup instructions
- **[FIREBASE_CONFIG.md](./FIREBASE_CONFIG.md)** - Configure your Firebase project

**Customization:**
- **[MODERN_DESIGN_GUIDE.md](./MODERN_DESIGN_GUIDE.md)** - Customize design and colors ⭐
- **[SECTION_TEMPLATES_GUIDE.md](./SECTION_TEMPLATES_GUIDE.md)** - Use and edit templates

**Security:**
- **[ADMIN_EMAIL_RESTRICTION.md](./ADMIN_EMAIL_RESTRICTION.md)** - Configure admin access

**Reference:**
- **[V2_RELEASE_NOTES.md](./V2_RELEASE_NOTES.md)** - What's new in v2.0 ⭐
- **[CHANGELOG.md](./CHANGELOG.md)** - Complete version history

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review [FIREBASE_CONFIG.md](./FIREBASE_CONFIG.md) for configuration help
3. Review Firebase Console for any errors
4. Check browser console for JavaScript errors

---

**Built with ❤️ using React + Firebase + Tailwind CSS**

