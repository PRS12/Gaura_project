import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FaHome, FaGoogleDrive, FaCloudUploadAlt } from 'react-icons/fa';
import styles from '../styles/Dropbox.module.css';
import { FaDropbox } from 'react-icons/fa6';

const DropboxUploader = dynamic(
  () => import('../components/timeline/dropbox'),
  { ssr: false }
);

const DropboxPage = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.homeLink}>
        <FaHome />
      </Link>
      <h1 className={styles.title}>Cloud Storage</h1>
      <p className={styles.description}>
        Upload your precious memories to your preferred cloud storage service.
      </p>
      <div className={styles.buttonContainer}>
        `<a 
          href="https://www.dropbox.com/request/pTk7YIk8a3hUrZcGS9b1" // Replace with your actual Google Drive folder link
          className={`${styles.storageButton} ${styles.googleDriveButton}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDropbox /> Upload to Dropbox

        </a>

        <a 
          href="https://drive.google.com/drive/u/0/folders/xxxxxxxx" // Replace with your actual Google Drive folder link
          className={`${styles.storageButton} ${styles.googleDriveButton}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGoogleDrive /> Upload to Google Drive
        </a>
        <a 
          href="/#" // Replace with another cloud storage link
          className={`${styles.storageButton} ${styles.cloudButton}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCloudUploadAlt /> Other Storage
        </a>
      </div>
    </div>
  );
};

export default DropboxPage;
