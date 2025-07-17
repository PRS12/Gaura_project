import Timeline from '../components/timeline';
import timelineData from '../data/timelineData';

export default function Home() {
  return (
    <div className="container">
      <h1>Gauranshi Beta lifeline</h1>
      <Timeline data={timelineData} />
    </div>
  );
}