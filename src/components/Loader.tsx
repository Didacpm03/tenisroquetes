import { useEffect, useState } from 'react';
import './Loader.css';
import Pelota from "../assets/png/pelota.png";

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
    const duration = 3000; // 3 segundos
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
    <div className="tenis-loader-container">
      {/* Fondo con efecto de pista de tenis */}
      <div className="court-background">
        <div className="court-line horizontal"></div>
        <div className="court-line vertical"></div>
        <div className="court-circle"></div>
      </div>
      
      {/* Contenido principal */}
      <div className="tenis-loader-content">
        {/* Imagen de la pelota con animación */}
        <div className="tennis-ball-loader">
          <img 
            src={Pelota} 
            alt="Pelota de tenis" 
            className="tennis-ball-image"
          />
        </div>

        {/* Texto con efecto */}
        <h1 className="tenis-loader-text neon-text">
          <span className="letter" style={{ '--delay': '0.1s' } as React.CSSProperties}>C</span>
          <span className="letter" style={{ '--delay': '0.2s' } as React.CSSProperties}>A</span>
          <span className="letter" style={{ '--delay': '0.3s' } as React.CSSProperties}>R</span>
          <span className="letter" style={{ '--delay': '0.4s' } as React.CSSProperties}>G</span>
          <span className="letter" style={{ '--delay': '0.5s' } as React.CSSProperties}>A</span>
          <span className="letter" style={{ '--delay': '0.6s' } as React.CSSProperties}>N</span>
          <span className="letter" style={{ '--delay': '0.7s' } as React.CSSProperties}>D</span>
          <span className="letter" style={{ '--delay': '0.8s' } as React.CSSProperties}>O</span>
        </h1>

        {/* Barra de progreso con estilo de red de tenis */}
        <div className="tennis-progress-container">
          <div 
            className="tennis-progress-bar" 
            style={{ width: `${progress}%` }}
          >
            <div className="net-pattern"></div>
          </div>
          <div className="progress-percentage">{progress}%</div>
        </div>

        {/* Mensajes contextuales */}
        <div className="tennis-status-message">
          {progress < 30 && "Preparando pistas..."}
          {progress >= 30 && progress < 60 && "Cargando raquetas..."}
          {progress >= 60 && progress < 90 && "Calibrando sensores..."}
          {progress >= 90 && "¡Listo para jugar!"}
        </div>

        {/* Hora y fecha */}
        <div className="tennis-time-display">
          <div className="time">{currentTime}</div>
          <div className="date">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;