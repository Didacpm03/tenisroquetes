import Navbar from "../components/Navbar";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const grupos = ["Grupo 1", "Grupo 2", "Grupo 3", "Grupo 4"];

const grupoColores: Record<string, string> = {
  "Grupo 1": "from-cyan-400 to-blue-500",
  "Grupo 2": "from-yellow-400 to-yellow-600",
  "Grupo 3": "from-gray-300 to-gray-500",
  "Grupo 4": "from-amber-700 to-amber-900",
};

const jugadoresData = [
  { nombre: "X", grupo: "Grupo 1", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 1", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 1", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 1", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 1", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 1", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 1", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 1", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 1", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 1", puntos: 10, partidos: 3 },

  { nombre: "Toni", grupo: "Grupo 2", puntos: 10, partidos: 2 },
  { nombre: "X", grupo: "Grupo 2", puntos: 10, partidos: 2 },
  { nombre: "X", grupo: "Grupo 2", puntos: 10, partidos: 2 },
  { nombre: "X", grupo: "Grupo 2", puntos: 10, partidos: 2 },
  { nombre: "X", grupo: "Grupo 2", puntos: 10, partidos: 2 },
  { nombre: "X", grupo: "Grupo 2", puntos: 10, partidos: 2 },
  { nombre: "X", grupo: "Grupo 2", puntos: 10, partidos: 2 },
  { nombre: "X", grupo: "Grupo 2", puntos: 10, partidos: 2 },
  { nombre: "X", grupo: "Grupo 2", puntos: 10, partidos: 2 },
  { nombre: "X", grupo: "Grupo 2", puntos: 10, partidos: 2 },

  { nombre: "X", grupo: "Grupo 3", puntos: 10, partidos: 4 },
  { nombre: "X", grupo: "Grupo 3", puntos: 10, partidos: 4 },
  { nombre: "Didac", grupo: "Grupo 3", puntos: 10, partidos: 4 },
  { nombre: "X", grupo: "Grupo 3", puntos: 10, partidos: 4 },
  { nombre: "X", grupo: "Grupo 3", puntos: 10, partidos: 4 },
  { nombre: "X", grupo: "Grupo 3", puntos: 10, partidos: 4 },
  { nombre: "X", grupo: "Grupo 3", puntos: 10, partidos: 4 },
  { nombre: "X", grupo: "Grupo 3", puntos: 10, partidos: 4 },
  { nombre: "X", grupo: "Grupo 3", puntos: 10, partidos: 4 },
  { nombre: "X", grupo: "Grupo 3", puntos: 10, partidos: 4 },

  { nombre: "X", grupo: "Grupo 4", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 4", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 4", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 4", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 4", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 4", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 4", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 4", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 4", puntos: 10, partidos: 3 },
  { nombre: "X", grupo: "Grupo 4", puntos: 10, partidos: 3 },
];

const Clasificaciones = () => {
  const datosPorGrupo = grupos.map((grupo) => ({
    nombre: grupo,
    jugadores: jugadoresData
      .filter((j) => j.grupo === grupo)
      .sort((a, b) => b.puntos - a.puntos),
  }));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#eef2ff] to-white p-6 md:p-10">
        <br />
        <br />
        <br />
        <h1 className="text-5xl md:text-6xl font-extrabold text-center from-indigo-500 drop-shadow-lg mb-4">
          Clasificación por Grupos
        </h1>
        <p className="text-center text-gray-500 text-lg italic tracking-wide mb-12">
          Se actualiza cada domingo.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {datosPorGrupo.map((grupo, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-white/60 border border-gray-200 shadow-xl rounded-3xl overflow-hidden"
            >
              <div
                className={`text-white px-6 py-4 text-2xl font-semibold rounded-t-3xl bg-gradient-to-r ${grupoColores[grupo.nombre]}`}
              >
                {grupo.nombre}
              </div>
              <table className="w-full text-left text-sm md:text-base">
                <thead className="text-indigo-900 bg-indigo-50 uppercase tracking-wide text-xs font-bold">
                  <tr>
                    <th className="px-6 py-3">Ranking</th>
                    <th className="px-6 py-3">Jugador</th>
                    <th className="px-6 py-3">Puntos</th>
                    <th className="px-6 py-3">Partidos</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.jugadores.map((jugador, i) => {
                    const top4 = i < 4 && grupo.nombre !== "Grupo 1";
                    const bottom3 =
                      i >= grupo.jugadores.length - 3 &&
                      grupo.nombre !== "Grupo 4";

                    let rowClass = "hover:bg-gray-50";
                    let textClass = "";
                    let icon = null;
                    let medal = null;

                    if (top4) {
                      rowClass = "bg-green-50";
                      textClass = "text-green-800 font-semibold";
                      icon = (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      );
                    } else if (bottom3) {
                      rowClass = "bg-red-50";
                      textClass = "text-red-800 font-semibold";
                      icon = (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      );
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
                        <td className="px-6 py-4">{jugador.nombre}</td>
                        <td className="px-6 py-4">{jugador.puntos}</td>
                        <td className="px-6 py-4">{jugador.partidos}</td>
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
