import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBaby, FaSmile, FaWalking, FaBirthdayCake } from 'react-icons/fa';
import { SiGithubsponsors } from "react-icons/si";
import styles from '../../styles/Timeline.module.css';

const TimelineItem = ({ item, isLast }) => (
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
        {item.icon === 'View' && <SiGithubsponsors />}
        {item.icon === 'cake' && <FaBirthdayCake />}
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
                {item.image && (
          <motion.div 
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
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

export default TimelineItem;