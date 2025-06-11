import { useEffect, useState } from 'react';
import './Loader.css';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; // 5 segundos
    const steps = 100; // 100%
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="loader-background"></div>
      <div className="loader-content">
        <h1 className="loader-text">CARGANDO TUS RESERVAS</h1>

        <div className="loader-percentage">
          {`CARGANDO ${progress}%`}
        </div>

        <div className="loader-grid">
          {Array.from({ length: 25 }).map((_, index) => (
            <div key={index} className="grid-cell"></div>
          ))}
        </div>

        <div className="loader-progress">
          <div className="loader-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
