import Navbar from "../components/Navbar";
import { Trophy, ChevronsUp, ChevronsDown, Crown, Award, Medal } from "lucide-react";
import { useUser } from "../context/UserContext";

const grupos = ["Grupo 1", "Grupo 2", "Grupo 3", "Grupo 4"];

const grupoColores: Record<string, string> = {
  "Grupo 1": "from-indigo-500 to-blue-600",
  "Grupo 2": "from-yellow-400 to-amber-500",
  "Grupo 3": "from-emerald-400 to-green-500",
  "Grupo 4": "from-rose-500 to-pink-600",
};

const jugadoresData = [
  // Grupo 1
  { nombre: "Carlos A.", user: "carlos_astudillo", puntos: 30, partidos: 12, grupo: "Grupo 1" },
  { nombre: "Sergi Civit", user: "sergi_civit", puntos: 20, partidos: 10, grupo: "Grupo 1" },
  { nombre: "Hector", user: "hector_moreno", puntos: 15, partidos: 9, grupo: "Grupo 1" },
  { nombre: "Enric Canalda", user: "enric_canalda", puntos: 12, partidos: 11, grupo: "Grupo 1" },
  { nombre: "Jaime Perez", user: "jaime_perez", puntos: 11, partidos: 10, grupo: "Grupo 1" },
  { nombre: "David E.", user: "david_escalera", puntos: 9, partidos: 7, grupo: "Grupo 1" },
  { nombre: "Ruben", user: "ruben_buendia", puntos: 7, partidos: 5, grupo: "Grupo 1" },
  { nombre: "Pedro Gil", user: "pedro_gil", puntos: 5, partidos: 4, grupo: "Grupo 1" },
  { nombre: "Javier M.", user: "javier_maldonado", puntos: 3, partidos: 4, grupo: "Grupo 1" },
  { nombre: "Ariel Aron", user: "ariel_aron", puntos: 3, partidos: 3, grupo: "Grupo 1" },
  { nombre: "Jordi Barrio", user: "jordi_barrio", puntos: 2, partidos: 2, grupo: "Grupo 1" },
  { nombre: "Ralph", user: "ralph", puntos: 1, partidos: 1, grupo: "Grupo 1" },

  // Grupo 2
  { nombre: "Toni", user: "Toni", puntos: 36, partidos: 12, grupo: "Grupo 2" },
  { nombre: "Adria", user: "adria_mestres", puntos: 15, partidos: 11, grupo: "Grupo 2" },
  { nombre: "Cristian Bas", user: "cristian_bas", puntos: 14, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Jordi Matas", user: "jordi_matas", puntos: 13, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Nico Cano", user: "nico_cano", puntos: 12, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Jordi Ricarte", user: "jordi_ricarte", puntos: 11, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Joan Benet", user: "joan_benet", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Juan Daza", user: "juan_daza", puntos: 9, partidos: 9, grupo: "Grupo 2" },
  { nombre: "Cristiano", user: "cristiano_granata", puntos: 8, partidos: 9, grupo: "Grupo 2" },
  { nombre: "Quim Llorca", user: "quim_llorca", puntos: 6, partidos: 7, grupo: "Grupo 2" },
  { nombre: "Alfonso Rios", user: "alfonso_rios", puntos: 5, partidos: 6, grupo: "Grupo 2" },
  { nombre: "Javier B.", user: "javier_blanquer", puntos: 4, partidos: 6, grupo: "Grupo 2" },

  // Grupo 3
  { nombre: "Artemio Etxe", user: "artemio_etxe", puntos: 15, partidos: 11, grupo: "Grupo 3" },
  { nombre: "Fernandito", user: "fernandito", puntos: 13, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Didac Paz", user: "Didac", puntos: 12, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Agata", user: "agata_bastenier", puntos: 11, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Orestes", user: "orestes_mateo", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Jaume Canal", user: "jaume_canal", puntos: 9, partidos: 9, grupo: "Grupo 3" },
  { nombre: "Tommy", user: "tommy", puntos: 8, partidos: 9, grupo: "Grupo 3" },
  { nombre: "Fernando G.", user: "fernando_gomez", puntos: 7, partidos: 8, grupo: "Grupo 3" },
  { nombre: "Fernanda B.", user: "fernanda_barrios", puntos: 6, partidos: 7, grupo: "Grupo 3" },
  { nombre: "Rafa Huete", user: "rafa_huete", puntos: 5, partidos: 6, grupo: "Grupo 3" },
  { nombre: "Miguel G.", user: "miguel_gallardo", puntos: 4, partidos: 5, grupo: "Grupo 3" },
  { nombre: "Manfred Frey", user: "manfred_frey", puntos: 3, partidos: 4, grupo: "Grupo 3" },

  // Grupo 4
  { nombre: "Joan Soler", user: "joan_soler", puntos: 15, partidos: 11, grupo: "Grupo 4" },
  { nombre: "Jesus Mingo", user: "jesus_mingo", puntos: 14, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Marc Davis", user: "marc_davis", puntos: 13, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Daniela W.", user: "daniela_watman", puntos: 12, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Javi Rosa", user: "javi_rosa", puntos: 11, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Pepo", user: "pepo", puntos: 10, partidos: 9, grupo: "Grupo 4" },
  { nombre: "Consol", user: "consol", puntos: 9, partidos: 8, grupo: "Grupo 4" },
  { nombre: "Lorenzo Prati", user: "lorenzo_prati", puntos: 8, partidos: 8, grupo: "Grupo 4" },
  { nombre: "Pilar Campos", user: "pilar_campos", puntos: 7, partidos: 7, grupo: "Grupo 4" },
  { nombre: "Joan Pozo", user: "joan_pozo", puntos: 6, partidos: 6, grupo: "Grupo 4" },
  { nombre: "Carlos O.", user: "carlos_ortega", puntos: 5, partidos: 5, grupo: "Grupo 4" },
  { nombre: "Bye", user: "bye", puntos: 0, partidos: 0, grupo: "Grupo 4" }
];

const Clasificaciones = () => {
  const { user } = useUser();

  const datosPorGrupo = grupos.map((grupo) => ({
    nombre: grupo,
    jugadores: jugadoresData
      .filter((j) => j.grupo === grupo)
      .sort((a, b) => b.puntos - a.puntos),
  }));

  // Obtener top 5 jugadores globales
  const top5Global = [...jugadoresData]
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 5);

  // Formatear fecha y hora actual
  const fechaActual = new Date();
  const formatoFechaHora = fechaActual.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado futurista */}
          <div className="text-center mb-12 pt-20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 blur-md"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 animate-pulse">
                LIGA TENIS 25/26
              </span>
            </h1>
            <div className="text-cyan-300 text-lg font-mono tracking-wider flex items-center justify-center gap-2">
              <span className="animate-pulse">⏳</span>
              <span className="drop-shadow-[0_0_4px_#00f0ff]">
                ACTUALIZACIÓN: {formatoFechaHora}
              </span>
            </div>

            {/* Cartel EN DIRECTO - ahora bien posicionado */}
            <div className="absolute top-13 right-1 flex items-center gap-2 bg-red-600/80 text-white text-sm md:text-base font-bold px-3 py-1 rounded-full shadow-lg animate-pulse ring-2 ring-red-500 ring-offset-2 ring-offset-black z-20">
              <span className="animate-ping w-2 h-2 rounded-full bg-white"></span>
              <span>EN DIRECTO</span>
            </div>

          </div>

          {/* Grupos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {datosPorGrupo.map((grupo, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl backdrop-blur-sm hover:shadow-[0_0_30px_#00f0ff20] transition-all duration-300">
                <div className={`p-4 text-white bg-gradient-to-r ${grupoColores[grupo.nombre]} flex justify-between items-center border-b border-white/10`}>
                  <h2 className="text-xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{grupo.nombre}</h2>
                  <span className="text-xs bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    {grupo.jugadores.length} jugadores
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/70 text-gray-300 text-xs uppercase">
                      <tr>
                        <th className="px-4 py-3 text-left">#</th>
                        <th className="px-4 py-3 text-left">Jugador</th>
                        <th className="px-4 py-3 text-center">PTS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {grupo.jugadores.map((jugador, i) => {
                        const isCurrentUser = user && jugador.user === user.username;
                        const top3 = i < 3;
                        const bottom4 = i >= grupo.jugadores.length - 4;

                        return (
                          <tr
                            key={i}
                            className={`
                              ${isCurrentUser ? 'bg-blue-900/30' : 'hover:bg-gray-800/50'} 
                              ${top3 ? 'bg-gradient-to-r from-white/5 to-transparent' : ''}
                              ${bottom4 ? 'border-l-4 border-red-500/70' : ''}
                              transition-colors duration-200
                            `}
                          >
                            <td className="px-4 py-3 font-medium">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`
                                    ${top3 ? 'font-bold text-white' : bottom4 ? 'text-red-400' : 'text-gray-300'}
                                    ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-green-400' : i === 2 ? 'text-blue-400' : ''}
                                  `}
                                >
                                  {i + 1}
                                </span>

                                {i === 0 && <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />}
                                {i === 1 && <Award className="w-4 h-4 text-green-400 fill-green-400/20" />}
                                {i === 2 && <Medal className="w-4 h-4 text-blue-400 fill-blue-400/20" />}
                                {i === 3 && <ChevronsUp className="w-4 h-4 text-emerald-400" />}
                                {bottom4 && <ChevronsDown className="w-4 h-4 text-red-400" />}
                              </div>
                            </td>


                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <span className={`
                                  ${top3 ? 'font-bold' : ''} 
                                  ${isCurrentUser ? 'text-cyan-400' : 'text-white'}
                                  ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-green-400' : i === 2 ? 'text-blue-400' : ''}
                                `}>
                                  {jugador.nombre}
                                </span>
                              </div>
                            </td>

                            <td className="px-4 py-3 text-center font-mono">
                              <span className={`
                                ${top3 ? 'font-bold' : ''} 
                                ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-green-400' : i === 2 ? 'text-blue-400' : bottom4 ? 'text-red-400' : 'text-white'}
                                drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]
                              `}>
                                {jugador.puntos}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Top 5 Global */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl overflow-hidden border border-cyan-400/20 shadow-[0_0_30px_#00f0ff30] backdrop-blur-sm">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 text-center border-b border-cyan-400/30">
              <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-300 fill-yellow-300/20" />
                <span className="drop-shadow-[0_2px_6px_rgba(0,240,255,0.5)]">TOP 5 GLOBAL</span>
                <Trophy className="w-6 h-6 text-yellow-300 fill-yellow-300/20" />
              </h2>
            </div>

            <div className="p-6">
              <div className="grid gap-4">
                {top5Global.map((jugador, index) => (
                  <div key={index} className={`
                    flex items-center justify-between p-4 rounded-lg
                    ${index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border border-yellow-400/30' :
                      index === 1 ? 'bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/30' :
                        index === 2 ? 'bg-gradient-to-r from-amber-700/10 to-amber-800/5 border border-amber-600/30' :
                          'bg-gray-900/50 border border-gray-700/30'}
                    hover:shadow-[0_0_15px_#00f0ff30] transition-all duration-300
                  `}>
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-bold
                        ${index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                            index === 2 ? 'bg-amber-600 text-white' :
                              'bg-gray-700 text-white'}
                        shadow-lg
                      `}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className={`font-bold ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>
                          {jugador.nombre}
                        </h3>
                        <p className="text-xs text-cyan-300">
                          {jugador.grupo}
                        </p>
                      </div>
                    </div>
                    <div className={`
                      text-xl font-mono font-bold
                      ${index === 0 ? 'text-yellow-400' :
                        index === 1 ? 'text-gray-300' :
                          index === 2 ? 'text-amber-400' :
                            'text-white'}
                      drop-shadow-[0_0_6px_currentColor]
                    `}>
                      {jugador.puntos} PTS
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Clasificaciones;