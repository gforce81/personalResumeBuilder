/**
 * Database initialization script
 * Run this once to populate your Firestore with initial resume data
 */

import { initializeResume } from './resumeService';
import { initialResumeData } from './initialResumeData';

export const initializeDatabase = async () => {
  try {
    console.log('Initializing database with resume data...');
    await initializeResume(initialResumeData);
    console.log('Database initialized successfully!');
    return true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

// Export for use in development console
if (typeof window !== 'undefined') {
  window.initializeDatabase = initializeDatabase;
}

