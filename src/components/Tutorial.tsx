import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TutorialStep {
  id: string;
  target: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  route?: string;
}

export default function Tutorial() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const steps: TutorialStep[] = [
    {
      id: 'welcome',
      target: '',
      title: '¡Bienvenido a Tennis Roquetes!',
      content: 'Vamos a hacer un breve tutorial/recordatorio para que te muevas como en casa!',
    },
    {
      id: 'login',
      target: 'login-link',
      title: 'Acceso a tu cuenta',
      content: 'Es importante que inicies sesión para poder acceder a funcionalidades como: Gestionar mis reservas, cancelar.',
      position: 'bottom',
    },
    {
      id: 'manual',
      target: 'manual-link',
      title: 'Manual de Usuario',
      content: 'Aquí encontrarás el manual con toda la información sobre cómo reservar una pista entre otras (IMPORTANTE).',
      position: 'bottom',
    },
    {
      id: 'reservar',
      target: 'reservar-link',
      title: 'Reservar Pista',
      content: 'Desde aquí podrás reservar pistas de tenis o pádel según disponibilidad.',
      position: 'bottom',
    },
    {
      id: 'mis-reservas',
      target: 'mis-reservas-link',
      title: 'Tus Reservas',
      content: 'Aquí podrás ver y gestionar todas tus reservas activas.',
      position: 'bottom',
    },
    {
      id: 'amigos',
      target: 'amigos-link',
      title: 'Gestión de Amigos',
      content: 'Conecta con otros jugadores, organiza partidos y sigue su actividad.',
      position: 'bottom',
    },
    {
      id: 'notificaciones',
      target: 'notificaciones-link',
      title: 'Notificaciones',
      content: 'Mantente al día con las últimas novedades, invitaciones a partidos y actualizaciones.',
      position: 'bottom',
    },
    {
      id: 'change-password',
      target: 'change-password-link',
      title: 'Cambiar Contraseña',
      content: 'Aquí podrás cambiar tu contraseña para mejorar la seguridad de tu cuenta.',
      position: 'bottom',
    },
    {
      id: 'fin',
      target: '',
      title: '¡Tutorial completado!',
      content: 'Ya estás listo para usar la plataforma. ¡Disfruta del tenis!',
    }
  ];

  useEffect(() => {
    const tutorialSkipped = localStorage.getItem('tutorialSkipped');
    if (!tutorialSkipped) {
      setShowTutorial(true);
    }
  }, []);

  const handleStartTutorial = () => {
    setCurrentStep(1);
  };

  const handleSkipTutorial = () => {
    if (currentStep === 0) {
      localStorage.setItem('tutorialSkipped', 'true');
    }
    setShowTutorial(false);
    setCompleted(true);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      if (steps[currentStep].route) {
        navigate(steps[currentStep].route || '/');
      }
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
      setCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!showTutorial || completed) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo futurista con efecto de partículas */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 opacity-95">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at center, #fff 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Highlight del elemento actual con efecto neón */}
      {steps[currentStep].target && (
        <div className="absolute z-10 rounded-lg shadow-lg"
          style={{
            top: document.getElementById(steps[currentStep].target)?.getBoundingClientRect().top,
            left: document.getElementById(steps[currentStep].target)?.getBoundingClientRect().left,
            width: document.getElementById(steps[currentStep].target)?.getBoundingClientRect().width,
            height: document.getElementById(steps[currentStep].target)?.getBoundingClientRect().height,
            boxShadow: '0 0 15px 5px rgba(59, 130, 246, 0.7)',
            animation: 'pulse 2s infinite'
          }}
        ></div>
      )}

      {/* Contenido del tutorial - Diseño futurista */}
      <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
          {/* Barra de progreso superior */}
          <div className="h-1 bg-gray-700">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          {/* Contenido principal */}
          <div className="p-8">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              {steps[currentStep].title}
            </h3>
            <p className="text-xl text-gray-300 mb-8">{steps[currentStep].content}</p>
            
            {/* Indicadores de pasos */}
            <div className="flex justify-center space-x-3 mb-8">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentStep === index ? 'bg-blue-400 scale-125' : 'bg-gray-600'}`}
                ></div>
              ))}
            </div>
            
            {/* Controles de navegación */}
            <div className="flex justify-between items-center">
              <div>
                {currentStep > 0 && (
                  <button 
                    onClick={handlePrevStep}
                    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg mr-4 hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                  >
                    ← Anterior
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                {currentStep === 0 ? (
                  <>
                    <button 
                      onClick={handleStartTutorial}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Empezar Tutorial
                    </button>
                    <button 
                      onClick={handleSkipTutorial}
                      className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                    >
                      Omitir
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleNextStep}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    {currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente →'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animaciones */}
      <style>
        {`
          @keyframes pulse {
            0% { box-shadow: 0 0 15px 5px rgba(59, 130, 246, 0.7); }
            50% { box-shadow: 0 0 20px 8px rgba(59, 130, 246, 0.9); }
            100% { box-shadow: 0 0 15px 5px rgba(59, 130, 246, 0.7); }
          }
        `}
      </style>
    </div>
  );
}