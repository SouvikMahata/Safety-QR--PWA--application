// src/hooks/usePhotoUpload.js
import { useState, useCallback } from 'react';
import { compressImage, fileToBase64 } from '@utils/helpers';
import useProfileStore from '@store/profileStore';
import { notificationService } from '@services/notificationService';

/**
 * Handles student photo selection, compression, preview, and upload.
 * @param {string|null} studentId
 */
export const usePhotoUpload = (studentId) => {
  const { uploadStudentPhoto } = useProfileStore();
  const [preview,   setPreview]   = useState(null);
  const [uploading, setUploading] = useState(false);

  const selectPhoto = useCallback(async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      notificationService.error('Please select an image file');
      return;
    }
    const compressed = await compressImage(file);
    const b64 = await fileToBase64(compressed);
    setPreview(b64);
    return compressed;
  }, []);

  const uploadPhoto = useCallback(async (file) => {
    if (!file || !studentId) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('photo', file, 'student-photo.jpg');
    const res = await uploadStudentPhoto(studentId, fd);
    setUploading(false);
    if (res.success) {
      notificationService.success('Photo updated');
    } else {
      notificationService.error(res.error || 'Photo upload failed');
    }
    return res;
  }, [studentId, uploadStudentPhoto]);

  const clearPreview = useCallback(() => setPreview(null), []);

  return { preview, uploading, selectPhoto, uploadPhoto, clearPreview };
};