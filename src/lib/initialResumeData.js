/**
 * Initial resume data structure
 * This will be used to populate the Firestore database on first setup
 * 
 * Data is loaded from config.local.js (git-ignored file with your personal data)
 * For the public template, data comes from config.default.js
 */

import config from '../config.local.js';

export const initialResumeData = config.initialResume;
