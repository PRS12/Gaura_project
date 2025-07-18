import TimelineItem from './TimelineItem';
import { motion } from 'framer-motion';
import styles from '../../styles/Timeline.module.css';

const Timeline = ({ data }) => (
  <motion.div 
    className={styles.timelineContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.5,
          delayChildren: 0.5
        }
      }
    }}
  >
    {data.map((item, index) => (
      <TimelineItem 
        key={item.id} 
        item={item} 
        isLast={index === data.length - 1}
      />
    ))}
  </motion.div>
);

export default Timeline;