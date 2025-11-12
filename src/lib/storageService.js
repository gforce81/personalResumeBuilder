/**
 * Firebase Storage service for profile picture uploads
 */

import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Upload profile picture to Firebase Storage
 * @param {File} file - The image file to upload
 * @param {string} userId - User ID for organizing uploads
 * @returns {Promise<string>} - Download URL of uploaded image
 */
export const uploadProfilePicture = async (file, userId = 'main') => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image must be less than 5MB');
    }

    // Create a unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `profile-${userId}-${timestamp}.${extension}`;
    
    // Upload to Firebase Storage
    const storageRef = ref(storage, `profile-pictures/${filename}`);
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

/**
 * Delete profile picture from Firebase Storage
 * @param {string} imageUrl - The full download URL of the image
 */
export const deleteProfilePicture = async (imageUrl) => {
  try {
    if (!imageUrl) return;
    
    // Extract path from URL
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/';
    if (!imageUrl.startsWith(baseUrl)) return;
    
    const path = imageUrl.split('/o/')[1]?.split('?')[0];
    if (!path) return;
    
    const decodedPath = decodeURIComponent(path);
    const storageRef = ref(storage, decodedPath);
    
    await deleteObject(storageRef);
  } catch (error) {
    // Silent fail - image might not exist or be external
    console.warn('Could not delete profile picture:', error);
  }
};

