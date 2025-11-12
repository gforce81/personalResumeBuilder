import { db } from './firebase';
import { doc, getDoc, setDoc, collection, query, getDocs, orderBy } from 'firebase/firestore';

/**
 * Resume data structure:
 * {
 *   header: { name, email, phone, location },
 *   sections: [
 *     {
 *       id: string,
 *       type: 'text' | 'list' | 'experience' | 'education',
 *       title: string,
 *       content: string (markdown),
 *       order: number
 *     }
 *   ]
 * }
 */

const RESUME_DOC_ID = 'main';

export const getResume = async () => {
  try {
    const resumeRef = doc(db, 'resume', RESUME_DOC_ID);
    const resumeSnap = await getDoc(resumeRef);
    
    if (resumeSnap.exists()) {
      return resumeSnap.data();
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching resume:', error);
    throw error;
  }
};

export const saveResume = async (resumeData) => {
  try {
    const resumeRef = doc(db, 'resume', RESUME_DOC_ID);
    await setDoc(resumeRef, {
      ...resumeData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error saving resume:', error);
    throw error;
  }
};

export const initializeResume = async (initialData) => {
  try {
    const existing = await getResume();
    if (!existing) {
      await saveResume(initialData);
    }
    return true;
  } catch (error) {
    console.error('Error initializing resume:', error);
    throw error;
  }
};

