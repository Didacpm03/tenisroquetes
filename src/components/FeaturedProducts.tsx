import { Link } from "react-router-dom";
import Tenis2 from "../assets/png/rapida.png";
import Tenis3 from "../assets/png/tenis3.jpg";
import Tenis4 from "../assets/png/tenis.png";
import { useUser } from "../context/UserContext"; // Asume que tienes un contexto de usuario

export default function FeaturedProducts() {
  const { user } = useUser(); // Obtener datos del usuario logueado
  
  // Datos de ejemplo del usuario (deberías obtenerlos de tu base de datos)
  const userStats = {
    position: 3,
    group: "Grupo 3",
    wins: 8,
    matches: 11,
    points: 95,
    performance: Math.round((8 / 11) * 100)
  };

  const getPerformanceMessage = () => {
    const ratio = userStats.wins / userStats.matches;
    if (ratio >= 0.8) return "¡Eres una máquina! Sigue dominando la pista.";
    if (ratio >= 0.6) return "Gran rendimiento, ¡vas por buen camino!";
    if (ratio >= 0.4) return "Buen trabajo, pero puedes mejorar.";
    return "Anímate a jugar más partidos para mejorar tu ranking.";
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white">
      {/* HERO SECTION con datos personales */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black bg-opacity-40"></div>
        <img
          src={Tenis3}
          alt="Hero"
          className="absolute w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
            Club de Tennis Roquetes
          </h1>
          
          {/* Sección personalizada */}
          {user && (
            <div className="mb-10 p-6 backdrop-blur-md bg-black/30 rounded-2xl border border-white/10 shadow-xl max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-300">
                ¡Hola, {user.name}!
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                  <div className="text-orange-400 text-sm">Posición</div>
                  <div className="text-3xl font-bold">{userStats.position}º</div>
                  <div className="text-xs text-gray-400">en {userStats.group}</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                  <div className="text-orange-400 text-sm">Partidos</div>
                  <div className="text-3xl font-bold">{userStats.wins}/{userStats.matches}</div>
                  <div className="text-xs text-gray-400">Victorias</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                  <div className="text-orange-400 text-sm">Rendimiento</div>
                  <div className="text-3xl font-bold">{userStats.performance}%</div>
                  <div className="text-xs text-gray-400">Éxito</div>
                </div>
              </div>
              <p className="text-lg text-gray-200 italic">
                {getPerformanceMessage()}
              </p>
            </div>
          )}
          
          <p className="text-xl md:text-2xl max-w-3xl mb-10 text-gray-200 font-light drop-shadow">
            La nueva era del tenis. Reservas inteligentes, estadísticas en tiempo real y experiencia premium.
          </p>
          <Link to="/reservar">
            <button className="relative overflow-hidden group border-2 border-orange-500 hover:border-orange-400 px-10 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 bg-black bg-opacity-30">
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center text-white">
                Reservar ahora
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </section>
      {/* MAIN CONTENT - Futuristic Design */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-32">
        {/* Sección Reservar - Futuristic Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] border-2 border-blue-500/30 group-hover:border-blue-500/50">
              <img
                src={Tenis4}
                alt="Reserva"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-blue-400 font-mono text-sm mb-2">SYSTEM</div>
                <div className="flex space-x-2">
                  <div className="h-1 w-10 bg-blue-500"></div>
                  <div className="h-1 w-5 bg-blue-400/50"></div>
                  <div className="h-1 w-5 bg-blue-400/30"></div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                Reserva inteligente <span className="text-blue-400">AI-Powered</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                Nuestro sistema de reservas con IA analiza tus patrones de juego, preferencias horarias y rendimiento físico para sugerir los horarios óptimos. La confirmación instantánea mediante blockchain garantiza transparencia y seguridad en cada reserva.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
                  <div className="text-blue-400 text-sm mb-1">Smart Scheduling</div>
                  <div className="text-white font-medium">Horarios adaptados</div>
                </div>
                <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
                  <div className="text-blue-400 text-sm mb-1">Blockchain</div>
                  <div className="text-white font-medium">Transacciones seguras</div>
                </div>
              </div>
              <Link to="/reservar">
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group">
                  <span>Reservar ahora</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Sección Clasificación - Holographic Effect */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse relative z-10">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] border-2 border-green-500/30 group-hover:border-green-500/50">
              <img
                src={Tenis2}
                alt="Clasificación"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-green-500/90 text-xs font-mono px-3 py-1 rounded-full animate-pulse">
                LIVE DATA
              </div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-green-400 text-2xl font-bold">87%</div>
                    <div className="text-green-300 text-xs">EFECTIVIDAD</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 text-2xl font-bold">24º</div>
                    <div className="text-green-300 text-xs">RANKING</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
                Estadísticas en vivo <span className="text-green-400">Real-Time</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                Nuestro dashboard holográfico proporciona análisis avanzados de cada movimiento, velocidad de saque y efectividad de golpes. Compara tu rendimiento con otros jugadores y recibe predicciones de ranking basadas en machine learning.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-white text-sm">Análisis de golpes</span>
                </div>
                <div className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-white text-sm">Predicción de ranking</span>
                </div>
                <div className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-white text-sm">Comparativas 3D</span>
                </div>
              </div>
              <Link to="/clasificaciones">
                <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group">
                  <span>Explorar estadísticas</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Sección Contacto - Neon Glow */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] border-2 border-purple-500/30 group-hover:border-purple-500/50">
              <img
                src={Tenis3}
                alt="Contacto"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute top-0 left-0 p-6">
                <div className="text-purple-300 font-mono text-sm bg-black/50 px-3 py-1 rounded-full">VIRTUAL ASSISTANT ONLINE</div>
              </div>
              <div className="absolute bottom-0 right-0 p-6">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                Soporte premium <span className="text-purple-400">24/7</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                Nuestro asistente virtual con IA resuelve el 90% de consultas al instante. Para temas complejos, conecta con nuestros expertos en tenis mediante videollamadas holográficas con realidad aumentada.
              </p>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-purple-300 font-medium">Asistente TENIS-AI</div>
                    <div className="text-gray-400 text-sm mt-1">Disponible ahora. ¿En qué puedo ayudarte hoy?</div>
                  </div>
                </div>
              </div>
              <Link to="/contacto">
                <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group">
                  <span>Conectar con soporte</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}