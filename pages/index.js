import Timeline from '../components/timeline';
import timelineData from '../data/timelineData';
import Link from 'next/link';
import { FaDropbox } from 'react-icons/fa';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h1>Gauranshi Beta lifeline</h1>
        <Link href="/dropbox" className={styles.dropboxLink}>
          <FaDropbox />
          <span> Upload photos</span>
        </Link>
      </div>
      <Timeline data={timelineData} />
    </div>
  );
}