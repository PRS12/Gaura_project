import React, { useState, useRef } from 'react';
import styles from '../../styles/Dropbox.module.css';
import { FaFileUpload, FaCheckCircle } from 'react-icons/fa';

const DropboxUploader = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // IMPORTANT: Replace with your actual Dropbox File Request URL
  const FILE_REQUEST_URL = 'https://www.dropbox.com/request/pTk7YIk8a3hUrZcGS9b1';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsUploaded(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setIsUploaded(false);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (response.ok) {
        setIsUploaded(true);
        setFile(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Upload failed. Please try again.');
      }
        } catch (error) {
      console.error('Upload failed:', error);
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.uploaderContainer}>
      <form onSubmit={handleSubmit} className={styles.uploaderForm}>
        <input 
          type="file" 
          onChange={handleFileChange}
          disabled={isUploading}
          ref={inputRef}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload" className={styles.fileLabel}>
          <FaFileUpload />
          <span>{file ? file.name : 'Choose a file'}</span>
        </label>
        <button 
          type="submit" 
          className={styles.uploadButton}
          disabled={isUploading || !file}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      
      {isUploaded && (
        <p className={styles.successMessage}>
          <FaCheckCircle /> File uploaded successfully!
        </p>
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default DropboxUploader;