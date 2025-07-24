import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBaby, FaSmile, FaWalking, FaBirthdayCake, FaEye ,FaDownload,FaCaravan,FaCarAlt,FaBahai} from 'react-icons/fa';
import { SiGithubsponsors } from "react-icons/si";
import styles from '../../styles/Timeline.module.css';
import { useState } from 'react';

const TimelineItem = ({ item, isLast }) => {
  const [isImageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [noteText, setNoteText] = useState('');

  const handleImageClick = (imageSrc = item.image) => {
    setSelectedImage(imageSrc);
    setImageOpen(!isImageOpen);
  };

  const handleNoteChange = (e) => {
    e.stopPropagation();
    setNoteText(e.target.value);
  };
  
  return (
    <motion.div 
      className={styles.timelineItem}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
    <div className={styles.timelineContent}>
      <motion.div 
        className={styles.icon}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {item.icon === 'baby' && <FaBaby />}
        {item.icon === 'smile' && <FaSmile />}
        {item.icon === 'walking' && <FaWalking />}
        {item.icon === 'walking' && <FaWalking />}
        {item.icon === 'View' && <FaEye />}
        {item.icon === 'Vacation' && <FaCaravan/>}
        {item.icon === 'Drive' && <FaCarAlt />}
        {item.icon === 'Celebrate' && <FaBahai />}
      </motion.div>
      <motion.div 
        className={styles.textContent}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {item.title}
        </motion.h3>
        <motion.time 
          className={styles.timeText}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {item.date}
        </motion.time>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {item.description}
        </motion.p>
        {(item.images || item.image) && (
          <div className={styles.imagesContainer}>
            {item.images ? (
              // Multiple images
              item.images.map((imageSrc, index) => (
                <motion.div 
                  key={index}
                  className={styles.imageContainer}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className={styles.imageActions}>
                    <motion.button 
                      className={styles.actionButton}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleImageClick(imageSrc)}
                    >
                      <FaEye />
                    </motion.button>
                    <motion.button 
                      className={styles.actionButton}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => window.open(imageSrc, '_blank')}
                    >
                      <FaDownload />
                    </motion.button>
                  </div>
                  <Image 
                    src={imageSrc}
                    alt={`${item.title} - ${index + 1}`}
                    width={600}
                    height={400}
                    className={styles.timelineImage}
                    priority={item.id === 1 && index === 0}
                  />
                </motion.div>
              ))
            ) : (
              // Single image (backward compatibility)
              <motion.div 
                className={styles.imageContainer}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className={styles.imageActions}>
                  <motion.button 
                    className={styles.actionButton}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleImageClick(item.image)}
                  >
                    <FaEye />
                  </motion.button>
                  <motion.button 
                    className={styles.actionButton}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => window.open(item.image, '_blank')}
                  >
                    <FaDownload />
                  </motion.button>
                </div>
                <Image 
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className={styles.timelineImage}
                  priority={item.id === 1}
                />
              </motion.div>
            )}
          </div>
        )}
        {item.video && (
          <motion.div 
            className={styles.videoContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <video
              src={item.video}
              title={item.title}
              className={styles.videoPlayer}
              controls
            />
          </motion.div>
        )}
        <AnimatePresence>
          {isImageOpen && (
            <motion.div 
              className={styles.modal}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleImageClick}
            >
              <motion.div 
                className={styles.modalContent}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 500 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalImageWrapper}>
                  <Image 
                    src={selectedImage}
                    alt={item.title}
                    width={800}
                    height={800}
                    className={styles.modalImage}
                  />
                  <motion.div 
                    className={styles.modalTextBox}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <textarea
                      value={noteText}
                      onChange={handleNoteChange}
                      placeholder="Write your notes here..."
                      className={styles.modalTextArea}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    {!isLast && (
      <motion.div 
        className={styles.connectorLine}
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
      />
    )}  
    </motion.div>
  );
};

export default TimelineItem;