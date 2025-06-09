import Navbar from "../components/Navbar";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
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
  { nombre: "Carlos Astudillo", user: "carlos_astudillo", puntos: 10, partidos: 10, grupo: "Grupo 1" },
  { nombre: "Sergi Civit", user: "sergi_civit", puntos: 10, partidos: 10, grupo: "Grupo 1" },
  { nombre: "Hector Moreno", user: "hector_moreno", puntos: 10, partidos: 10, grupo: "Grupo 1" },
  { nombre: "Enric Canalda", user: "enric_canalda", puntos: 10, partidos: 10, grupo: "Grupo 1" },
  { nombre: "Jaime Perez", user: "jaime_perez", puntos: 10, partidos: 10, grupo: "Grupo 1" },
  { nombre: "David Escalera", user: "david_escalera", puntos: 10, partidos: 10, grupo: "Grupo 1" },
  { nombre: "Ruben Buendia", user: "ruben_buendia", puntos: 10, partidos: 10, grupo: "Grupo 1" },
  { nombre: "Pedro Gil", user: "pedro_gil", puntos: 10, partidos: 10, grupo: "Grupo 1" },
  { nombre: "Jordi Barrio", user: "jordi_barrio", puntos: 10, partidos: 10, grupo: "Grupo 1" },
  { nombre: "Javier Maldonado", user: "javier_maldonado", puntos: 10, partidos: 10, grupo: "Grupo 1" },
  { nombre: "Ariel Aron", user: "ariel_aron", puntos: 10, partidos: 10, grupo: "Grupo 1" },
  { nombre: "Ralph", user: "ralph", puntos: 10, partidos: 10, grupo: "Grupo 1" },

  // Grupo 2
  { nombre: "Adria Mestres", user: "adria_mestres", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Cristian Bas", user: "cristian_bas", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Jordi Matas", user: "jordi_matas", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Nico Cano", user: "nico_cano", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Jordi Ricarte", user: "jordi_ricarte", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Joan Benet", user: "joan_benet", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Juan Daza", user: "juan_daza", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Cristiano Granata", user: "cristiano_granata", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Toni", user: "Toni", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Quim Llorca", user: "quim_llorca", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Alfonso Rios", user: "alfonso_rios", puntos: 10, partidos: 10, grupo: "Grupo 2" },
  { nombre: "Javier Blanquer", user: "javier_blanquer", puntos: 10, partidos: 10, grupo: "Grupo 2" },

  // Grupo 3
  { nombre: "Artemio Etxe", user: "artemio_etxe", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Fernandito", user: "fernandito", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Didac Paz", user: "Didac", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Agata Bastenier", user: "agata_bastenier", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Orestes Mateo", user: "orestes_mateo", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Jaume Canal", user: "jaume_canal", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Tommy", user: "tommy", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Fernando Gomez", user: "fernando_gomez", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Fernanda Barrios", user: "fernanda_barrios", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Rafa Huete", user: "rafa_huete", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Miguel Gallardo", user: "miguel_gallardo", puntos: 10, partidos: 10, grupo: "Grupo 3" },
  { nombre: "Manfred Frey", user: "manfred_frey", puntos: 10, partidos: 10, grupo: "Grupo 3" },

  // Grupo 4
  { nombre: "Joan Soler", user: "joan_soler", puntos: 10, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Jesus Mingo", user: "jesus_mingo", puntos: 10, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Marc Davis", user: "marc_davis", puntos: 10, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Daniela Watman", user: "daniela_watman", puntos: 10, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Javi Rosa", user: "javi_rosa", puntos: 10, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Pepo", user: "pepo", puntos: 10, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Consol", user: "consol", puntos: 10, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Lorenzo Prati", user: "lorenzo_prati", puntos: 10, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Pilar Campos", user: "pilar_campos", puntos: 10, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Joan Pozo", user: "joan_pozo", puntos: 10, partidos: 10, grupo: "Grupo 4" },
  { nombre: "Carlos Ortega", user: "carlos_ortega", puntos: 10, partidos: 10, grupo: "Grupo 4" },
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

  // Verificar que user y user.username existen
  const usuarioActual = user && user.username 
    ? jugadoresData.find(j => j.user === user.username)
    : null;
  
  // Verificación segura de grupoUsuario
  const grupoUsuario = usuarioActual?.grupo || "Grupo 2";
  
  // Cálculo seguro de posición
  const posicionUsuario = usuarioActual 
    ? (() => {
        const grupo = datosPorGrupo.find(g => g.nombre === grupoUsuario);
        if (!grupo) return null;
        
        const index = grupo.jugadores.findIndex(j => j.user === user?.username);
        return index >= 0 ? index + 1 : null;
      })()
    : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#eef2ff] to-white p-6 md:p-10">
        <br />
        <br />
        <br />
        <h1 className="text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-600 drop-shadow-lg mb-4">
          Clasificación por Grupos
        </h1>
        <p className="text-center text-gray-500 text-lg italic tracking-wide mb-12">
          Actualizado en tiempo real - Última actualización: {new Date().toLocaleDateString()}
        </p>

        {/* Sección del usuario con verificaciones seguras */}
        {user && usuarioActual && (
          <div className="max-w-4xl mx-auto mb-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className={`bg-gradient-to-r ${grupoColores[grupoUsuario] || grupoColores["Grupo 1"]} p-6 text-white`}>
              <h2 className="text-2xl font-bold">Tu posición</h2>
              <p className="opacity-90">En {grupoUsuario}</p>
            </div>
            <div className="p-6 grid grid-cols-4 gap-4 text-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Posición</div>
                <div className="text-3xl font-bold text-indigo-600">
                  {posicionUsuario ? `${posicionUsuario}º` : '-'}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Puntos</div>
                <div className="text-3xl font-bold text-indigo-600">{usuarioActual.puntos}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Partidos</div>
                <div className="text-3xl font-bold text-indigo-600">{usuarioActual.partidos}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Rendimiento</div>
                <div className="text-3xl font-bold text-indigo-600">
                  {usuarioActual.partidos > 0 
                    ? Math.round((usuarioActual.puntos / (usuarioActual.partidos * 10)) * 100)
                    : 0}%
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {datosPorGrupo.map((grupo, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-white/80 border border-gray-200 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div
                className={`text-white px-6 py-4 text-2xl font-semibold rounded-t-3xl bg-gradient-to-r ${grupoColores[grupo.nombre]}`}
              >
                {grupo.nombre}
              </div>
              <table className="w-full text-left text-sm md:text-base">
                <thead className="text-indigo-900 bg-indigo-50 uppercase tracking-wide text-xs font-bold">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Jugador</th>
                    <th className="px-6 py-3">Puntos</th>
                    <th className="px-6 py-3">Partidos</th>
                    <th className="px-6 py-3">Rendimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.jugadores.map((jugador, i) => {
                    const porcentajeVictorias = jugador.partidos > 0 
                      ? Math.round((jugador.puntos / (jugador.partidos * 10)) * 100) 
                      : 0;

                    const top4 = i < 4;
                    const bottom3 = i >= grupo.jugadores.length - 4;

                    let rowClass = "hover:bg-gray-50";
                    let textClass = "";
                    let icon = null;
                    let medal = null;

                    if (top4) {
                      rowClass = "bg-green-50";
                      textClass = "text-green-800 font-semibold";
                      icon = <ArrowUpRight className="w-4 h-4 text-green-600" />;
                    } else if (bottom3) {
                      rowClass = "bg-red-50";
                      textClass = "text-red-800 font-semibold";
                      icon = <ArrowDownRight className="w-4 h-4 text-red-600" />;
                    }

                    if (i === 0) medal = "🥇";
                    else if (i === 1) medal = "🥈";
                    else if (i === 2) medal = "🥉";

                    return (
                      <tr
                        key={i}
                        className={`${rowClass} border-b border-gray-100 ${textClass}`}
                      >
                        <td className="px-6 py-4 flex items-center gap-1">
                          {i + 1} {icon}{" "}
                          {medal && <span className="ml-1">{medal}</span>}
                        </td>
                        <td className="px-6 py-4 font-medium">{jugador.nombre}</td>
                        <td className="px-6 py-4">{jugador.puntos}</td>
                        <td className="px-6 py-4">{jugador.partidos}</td>
                        <td className="px-6 py-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                porcentajeVictorias > 70 ? 'bg-green-500' : 
                                porcentajeVictorias > 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} 
                              style={{ width: `${porcentajeVictorias}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{porcentajeVictorias}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Clasificaciones;