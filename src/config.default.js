/**
 * Default Configuration (Public Template)
 * 
 * This file contains placeholder values for the public GitHub repository.
 * 
 * TO USE THIS PROJECT:
 * 1. Copy this file to `src/config.local.js`
 * 2. Update all values with your own information
 * 3. The local file is git-ignored and won't be committed
 * 
 * See FIREBASE_CONFIG.md for detailed setup instructions.
 */

export default {
  // Firebase Configuration
  // Get these from Firebase Console → Project Settings → Your Apps
  firebase: {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  },

  // Admin Email Whitelist
  // Only these email addresses can access the admin panel
  adminEmails: [
    "your-email@example.com"
  ],

  // Initial Resume Data
  // This will be loaded into Firestore on first setup
  initialResume: {
    header: {
      name: "Your Name",
      title: "Your Professional Title",
      phone: "+1 (555) 123-4567",
      email: "your.email@example.com",
      location: "City, State",
      profilePicture: "",
      socialLinks: {
        github: "",
        linkedin: "",
        website: ""
      }
    },
    sections: [
      {
        id: "summary",
        title: "Summary",
        order: 0,
        blurContent: false,
        content: "Your professional summary here. Highlight your expertise, experience, and key accomplishments."
      },
      {
        id: "experience",
        title: "Experience",
        order: 1,
        blurContent: false,
        content: `## Job Title

### Company Name, Location

Month Year - Present

Brief description of your role and the company.

* Key achievement with measurable impact
* Another significant accomplishment
* Technical or leadership contribution
* Major project or initiative you led`
      },
      {
        id: "education",
        title: "Education",
        order: 2,
        blurContent: false,
        content: `* **Degree Name, Major**  
  University Name, Location  
  Graduation Year`
      },
      {
        id: "skills",
        title: "Skills",
        order: 3,
        blurContent: false,
        content: `* **Technical Skills:** Skill 1, Skill 2, Skill 3, Skill 4
* **Tools:** Tool 1, Tool 2, Tool 3
* **Languages:** Language 1 (proficiency), Language 2 (proficiency)`
      }
    ]
  },

  // SEO Metadata
  // Update these for search engine optimization
  seo: {
    title: "Your Name - Professional Title | Resume",
    description: "Professional with expertise in your field. Highlight your key strengths and experience.",
    keywords: "your skills, your industry, your expertise",
    author: "Your Name"
  }
};

