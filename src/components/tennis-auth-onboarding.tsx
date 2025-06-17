import { useState, useEffect } from 'react';
import { HiEye, HiEyeOff, HiPlay, HiCalendar, HiChartBar, HiTrendingUp, HiStar } from 'react-icons/hi';
import { supabase } from '../../supabaseClient';

// Componente de Onboarding
const TennisOnboarding = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);


  // Verificar si hay usuario logueado
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const steps = [
    {
      title: "Bienvenido a Club Tennis Roquetes",
      subtitle: "El sistema más avanzado para reservar pistas de tenis y pádel en tu club",
      icon: <HiPlay className="w-12 h-12" />,
      gradient: "from-purple-600 via-blue-600 to-cyan-500"
    },
    {
      title: "Reserva Online",
      subtitle: "¡Pistas disponibles cada dia!",
      description: "Reserva en cualquier momento desde tu dispositivo",
      icon: <HiCalendar className="w-12 h-12" />,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500"
    },
    {
      title: "Revisa tus partidos",
      subtitle: "Revisa todos tus partidos jugados, tus victorias, derrotas, % victorias entre otras!",
      icon: <HiChartBar className="w-12 h-12" />,
      gradient: "from-orange-500 via-red-500 to-pink-500"
    },
    {
      title: "Sigue tu Progreso",
      subtitle: "Revisa tu sitio en la clasificación",
      icon: <HiTrendingUp className="w-12 h-12" />,
      gradient: "from-yellow-500 via-amber-500 to-orange-500"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = (userData: any) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    onLoginSuccess();
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
        <div className="text-center text-white max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">
            <HiStar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">¡Bienvenido!</h1>
          <p className="text-xl mb-8">Hola, {user.nombre || user.username}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Ir al Inicio
          </button>
        </div>
      </div>
    );
  }

  if (showLogin) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} onBack={() => setShowLogin(false)} />;
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 5 + 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 text-center">
        <div className={`transform transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          {/* Icono */}
          <div className="mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${currentStepData.gradient} shadow-xl`}>
              {currentStepData.icon}
            </div>
          </div>

          {/* Contenido */}
          <h1 className={`text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${currentStepData.gradient}`}>
            {currentStepData.title}
          </h1>
          <h2 className="text-xl text-gray-300 mb-4">{currentStepData.subtitle}</h2>
          <p className="text-gray-400 mb-8">{currentStepData.description}</p>

          {/* Indicadores */}
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${i <= currentStep
                  ? `bg-gradient-to-r ${currentStepData.gradient} w-6`
                  : 'bg-gray-700 w-2'
                  }`}
              />
            ))}
          </div>

          {/* Botón */}
          <button
            onClick={nextStep}
            className={`px-8 py-3 bg-gradient-to-r ${currentStepData.gradient} rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all`}
          >
            {currentStep === steps.length - 1 ? 'Iniciar Sesión' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Login
const LoginForm = ({ onLoginSuccess, onBack }: { onLoginSuccess: (user: any) => void, onBack: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: supabaseError } = await supabase
        .from('userstenis')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (supabaseError || !data) {
        throw supabaseError || new Error('Credenciales incorrectas');
      }

      onLoginSuccess(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-950 relative overflow-hidden p-4">

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/5 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl shadow-[0_0_40px_#0ff3] p-8 transition-all duration-500">
          {/* Encabezado */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_20px_#0ff] animate-pulse">
              <HiStar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-wide">Iniciar Sesión</h2>
            <p className="text-sm text-cyan-200 mt-2">Accede a tu cuenta de socio</p>
            <p className="text-xs text-pink-300 mt-4">
              ¿No tienes una cuenta? Contacta con <span className="underline">609 494 339 (Didac)</span>.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-600/20 border-l-4 border-red-500 p-4 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm text-cyan-100 mb-1">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-cyan-300/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="paquito_lopez"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-cyan-100 mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-300/10 rounded-xl text-white placeholder-gray-400 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-300 hover:text-white"
                >
                  {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={onBack}
                className="text-sm text-cyan-300 hover:text-white transition"
              >
                ← Volver al onboarding
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};




export default TennisOnboarding;