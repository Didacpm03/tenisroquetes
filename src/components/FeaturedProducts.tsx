import { Link } from "react-router-dom";
import Tenis2 from "../assets/png/rapida.png";
import Tenis3 from "../assets/png/bernd-dittrich-_AYNT8tkRqI-unsplash.jpg";
import Tenis4 from "../assets/png/tenis.png";
import Tenis5 from "../assets/png/IMG_9870__1_-removebg-preview.png";
import { useUser } from "../context/UserContext";

export default function FeaturedProducts() {
  const { user } = useUser();

  // Datos de ejemplo del usuario
  const userStats = {
    position: 3,
    group: "Grupo 3",
    wins: 8,
    losses: 3,
    matches: 11,
    points: 10,
    performance: Math.round((8 / 11) * 100),
    recentMatches: [
      { opponent: "Carlos M.", result: "W", score: "6-3, 6-4", date: "10/06/2025" },
      { opponent: "Ana S.", result: "L", score: "4-6, 7-5, 3-6", date: "04/05/2025" },
      { opponent: "David R.", result: "W", score: "6-2, 6-1", date: "02/05/2025" },
      { opponent: "Laura G.", result: "L", score: "7-5, 6-3", date: "30/04/2025" },
    ]
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
      {/* HERO SECTION con imagen de fondo */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black bg-opacity-40"></div>

        {/* Imagen en lugar de video */}
        <img
          src={Tenis3}
          alt="Fondo club tenis"
          className="absolute w-full h-full object-cover object-center scale-110 z-0"
        />

        {/* Contenido encima */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg animate-fade-in">
            Club de Tennis <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Roquetes</span>
          </h1>

          {/* Sección personalizada */}
          {user && (
            <div className="mb-10 p-6 backdrop-blur-md bg-black/30 rounded-2xl border border-white/10 shadow-xl max-w-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-300">
                ¡Hola, {user.name}!
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 hover:border-orange-400 transition-all duration-300">
                  <div className="text-orange-400 text-sm">Posición</div>
                  <div className="text-3xl font-bold">{userStats.position}º</div>
                  <div className="text-xs text-gray-400">en {userStats.group}</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 hover:border-orange-400 transition-all duration-300">
                  <div className="text-orange-400 text-sm">Partidos</div>
                  <div className="text-3xl font-bold">{userStats.wins}/{userStats.matches}</div>
                  <div className="text-xs text-gray-400">Victorias</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 hover:border-orange-400 transition-all duration-300">
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

          {/* Botón mejorado */}
          <Link to="/reservar">
            <button className="group relative px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center">
                RESERVAR AHORA
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>

              {/* Fondo animado */}
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>

              {/* Efecto de brillo */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="absolute top-0 left-0 w-full h-full bg-white/10 rounded-full animate-pulse"></span>
              </span>

              {/* Borde animado */}
              <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/50 transition-all duration-500"></span>
            </button>
          </Link>
        </div>
      </section>



      {/* MAIN CONTENT - Futuristic Design */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-32">

        {/* Sección Reservar - Futuristic Card */}
        {/* Sección Reservar - Futuristic Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8 order-2 md:order-1">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                HORARIO <span className="text-orange-400">Y RESERVAS</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                Planifica tus reservas hasta 7 días antes
              </p>

              {/* Modern Schedule Cards */}
              <div className="grid grid-cols-1 gap-6">
                <div className="p-5 bg-gray-900/50 border border-blue-800/50 rounded-xl hover:border-blue-400 transition-all duration-300 group-hover:shadow-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-300 flex items-center">
                        Lunes a Viernes
                        <span className="ml-2 text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">DÍAS LABORABLES</span>
                      </h3>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="bg-blue-900/20 p-2 rounded-lg border border-blue-800/30">
                          <div className="text-blue-400 text-xs">MAÑANA</div>
                          <div className="text-white font-medium">10:00 - 13:00</div>
                        </div>
                        <div className="bg-blue-900/20 p-2 rounded-lg border border-blue-800/30">
                          <div className="text-blue-400 text-xs">TARDE</div>
                          <div className="text-white font-medium">16:00 - 22:00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-gray-900/50 border border-cyan-800/50 rounded-xl hover:border-cyan-400 transition-all duration-300 group-hover:shadow-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-300 flex items-center">
                        Fin de Semana
                        <span className="ml-2 text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">SÁBADO/DOMINGO</span>
                      </h3>
                      <div className="mt-2">
                        <div className="bg-cyan-900/20 p-2 rounded-lg border border-cyan-800/30">
                          <div className="text-cyan-400 text-xs">MAÑANA</div>
                          <div className="text-white font-medium">09:00 - 14:00</div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 italic">Tardes: Cerrado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/reservar">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group w-full md:w-auto justify-center">
                    <span>Reservar ahora</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] border-2 border-blue-500/30 group-hover:border-blue-500/50 order-1 md:order-2">
              <img
                src={Tenis4}
                alt="Reserva"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-blue-400 font-mono text-sm mb-2">RESERVE SYSTEM v3.1</div>
                <div className="flex space-x-2">
                  <div className="h-1 w-10 bg-blue-500"></div>
                  <div className="h-1 w-5 bg-blue-400/50"></div>
                  <div className="h-1 w-5 bg-blue-400/30"></div>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-blue-500/90 text-xs font-mono px-3 py-1 rounded-full animate-pulse">
                ONLINE BOOKING
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">

              </div>
            </div>
          </div>
        </div>
        {/* Sección Mis Partidos - Futuristic Hologram */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] border-2 border-amber-500/30 group-hover:border-amber-500/50">
              <div className="h-full w-full bg-gradient-to-br from-black to-gray-900 p-8">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="text-amber-400 font-mono text-sm mb-2">PLAYER STATS v3.2</div>
                    <div className="flex space-x-2 mb-6">
                      <div className="h-1 w-10 bg-amber-500"></div>
                      <div className="h-1 w-5 bg-amber-400/50"></div>
                      <div className="h-1 w-5 bg-amber-400/30"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-amber-400 transition-all duration-300">
                      <div className="text-amber-400 text-sm">Victorias</div>
                      <div className="text-3xl font-bold text-white">{userStats.wins}</div>
                    </div>
                    <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-amber-400 transition-all duration-300">
                      <div className="text-amber-400 text-sm">Derrotas</div>
                      <div className="text-3xl font-bold text-white">{userStats.losses}</div>
                    </div>
                    <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-amber-400 transition-all duration-300">
                      <div className="text-amber-400 text-sm">% Victorias</div>
                      <div className="text-3xl font-bold text-white">{userStats.performance}%</div>
                    </div>
                    <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-amber-400 transition-all duration-300">
                      <div className="text-amber-400 text-sm">Partidos Jugados</div>
                      <div className="text-3xl font-bold text-white">{userStats.points}</div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="text-amber-300 text-sm mb-2">ÚLTIMOS PARTIDOS</div>
                    <div className="space-y-2">
                      {userStats.recentMatches.map((match, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${match.result === "W" ? "border-green-500/30 bg-green-900/10" : "border-red-500/30 bg-red-900/10"}`}>
                          <div className="flex justify-between items-center">
                            <div className="font-medium">{match.opponent}</div>
                            <div className={`px-2 py-1 rounded text-xs font-bold ${match.result === "W" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                              {match.result === "W" ? "VICTORIA" : "DERROTA"}
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{match.score} • {match.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300">
                MIS <span className="text-white">PARTIDOS</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                Revisa tu historial de partidos, porcentaje de victorias y derrotas. <br />
                Buscar tú nombre de usuario para ver tus estadisticas
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-amber-400 transition-all duration-300">
                  <div className="text-amber-400 text-sm mb-1">Mejor racha</div>
                  <div className="text-white font-medium">4 victorias</div>
                </div>
                <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-amber-400 transition-all duration-300">
                  <div className="text-amber-400 text-sm mb-1">Últimos 10</div>
                  <div className="text-white font-medium">7W - 3L</div>
                </div>
              </div>
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-amber-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-amber-300 font-medium">Progresión mensual</div>
                    <div className="text-gray-400 text-sm mt-1">+3 posiciones este mes</div>
                  </div>
                </div>
              </div> <br />
              <Link to="/estadisticas-jugador">
                <button className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group">
                  <span>Ver todos mis partidos</span>
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
              <div className="absolute top-4 right-4 bg-orange-500/90 text-xs font-mono px-3 py-1 rounded-full animate-pulse">
                EN DIRECTO
              </div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-green-400 text-2xl font-bold">2</div>
                    <div className="text-green-300 text-xs">GRUPO</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 text-2xl font-bold">1º</div>
                    <div className="text-green-300 text-xs">POSICIÓN</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
                CLASIFICACIÓN <span className="text-white">ACTUALIZADA</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                ¡Revisa la clasificación y descubre en qué posición estás!
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center hover:border-green-400 transition-all duration-300">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-white text-sm">Revisa tu posición</span>
                </div>
                <div className="p-3 bg-gray-900/50 border border-blue-800 rounded-lg flex items-center hover:border-green-400 transition-all duration-300">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-white text-sm">Asciendes?</span>
                </div>
                <div className="p-3 bg-gray-900/50 border border-red-800 rounded-lg flex items-center hover:border-green-400 transition-all duration-300">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-white text-sm">Desciendes?</span>
                </div>
              </div> <br></br>
              <Link to="/clasificaciones">
                <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group">
                  <span>Ver clasificación</span>
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
                src={Tenis5}
                alt="Contacto"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute top-0 left-0 p-6">
                <div className="text-purple-300 font-mono text-sm bg-black/50 px-3 py-1 rounded-full">AYUDA/SOPORTE</div>
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
                SOPORTE <span className="text-white">24/7</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                ¿Tienes alguna duda o problema? ¡Estamos aquí para ayudarte!
              </p>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-purple-400 transition-all duration-300">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-purple-300 font-medium">Soporte WhatsApp - Telefónico</div>
                    <div className="text-gray-400 text-sm mt-1">Didac - Darío</div>
                  </div>
                </div>
              </div> <br></br>
              <Link to="/contacto">
                <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group">
                  <span>Contactar con soporte</span>
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