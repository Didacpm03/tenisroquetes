import { useEffect, useState } from 'react';
import './Loader.css';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Actualizar hora cada segundo
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    }, 1000);

    // Barra de progreso
    const duration = 5000; // 5 segundos
    const steps = 100; // 100%
    const intervalTime = duration / steps;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => {
      clearInterval(timeInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="loader-background"></div>
      <div className="loader-content">
        {/* Hora actual */}
        <div className="digital-clock">
          <div className="time">{currentTime}</div>
          <div className="date">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>

        <h1 className="loader-text">
          <span className="text-flicker">INICIALIZANDO SISTEMA</span>
        </h1>

        <div className="loader-percentage">
          <span className="percentage-label">PROGRESO:</span>
          <span className="percentage-value">{progress}%</span>
        </div>

        {/* Grid futurista */}
        <div className="cyber-grid">
          {Array.from({ length: 64 }).map((_, index) => (
            <div 
              key={index} 
              className="grid-pixel"
              style={{ 
                opacity: Math.random() > 0.7 ? 1 : 0.3,
                animationDelay: `${index * 0.05}s`
              }}
            />
          ))}
        </div>

        {/* Barra de progreso mejorada */}
        <div className="cyber-progress-container">
          <div 
            className="cyber-progress-bar" 
            style={{ width: `${progress}%` }}
          >
            <div className="progress-glare"></div>
          </div>
          <div className="progress-ticks">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="progress-tick"></div>
            ))}
          </div>
        </div>

        {/* Mensaje de estado */}
        <div className="system-message">
          {progress < 30 && "CARGANDO MÓDULOS PRINCIPALES..."}
          {progress >= 30 && progress < 70 && "INICIALIZANDO COMPONENTES..."}
          {progress >= 70 && progress < 100 && "PREPARANDO INTERFAZ..."}
          {progress === 100 && "SISTEMA LISTO"}
        </div>
      </div>
    </div>
  );
};

export default Loader;