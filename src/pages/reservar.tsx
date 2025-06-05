import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { supabase } from "../../supabaseClient";
import Navbar from "../components/Navbar";

dayjs.locale("es");

const pistasTierra = [1, 2];
const pistasRapida = [3, 4];

function generarIntervalos(inicio: string, fin: string) {
  const resultado: string[] = [];
  let actual = dayjs().startOf("day").hour(parseInt(inicio.split(":")[0])).minute(parseInt(inicio.split(":")[1]));
  const finHora = dayjs().startOf("day").hour(parseInt(fin.split(":")[0])).minute(parseInt(fin.split(":")[1]));
  while (actual.isBefore(finHora)) {
    resultado.push(actual.format("HH:mm"));
    actual = actual.add(30, "minute");
  }
  return resultado;
}

const horariosEntreSemana = generarIntervalos("16:00", "21:00");
const horariosFinSemana = generarIntervalos("09:00", "14:00");

type Reserva = {
  id: number;
  pista: number;
  fecha: string;
  hora: string;
  duracion: number;
  jugador1: string;
  jugador2: string;
};

export default function Reservar() {
  const hoy = dayjs().startOf("day");
  const [diaSeleccionado, setDiaSeleccionado] = useState(hoy);
  const [tipoPista, setTipoPista] = useState<"tierra" | "rapida">("tierra");
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [jugador1, setJugador1] = useState("");
  const [jugador2, setJugador2] = useState("");
  const [duracion] = useState(90);
  const [pistaSeleccionada, setPistaSeleccionada] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const proximosDias = Array(7).fill(0).map((_, i) => hoy.add(i, "day"));

  const horarios = diaSeleccionado.day() >= 1 && diaSeleccionado.day() <= 5
    ? horariosEntreSemana
    : horariosFinSemana;

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  useEffect(() => {
    async function cargarReservas() {
      const fechaISO = diaSeleccionado.format("YYYY-MM-DD");
      const { data, error } = await supabase
        .from("reservas")
        .select("*")
        .eq("fecha", fechaISO);

      if (error) {
        setMensaje("Error cargando reservas");
        return;
      }

      const reservasFiltradas = (data || []).filter(reserva =>
        tipoPista === "tierra"
          ? pistasTierra.includes(reserva.pista)
          : pistasRapida.includes(reserva.pista)
      );

      setReservas(reservasFiltradas);
    }

    cargarReservas();
    setHoraSeleccionada(null);
    setFormVisible(false);
    setMensaje(null);
    setJugador1("");
    setJugador2("");
    setPistaSeleccionada(null);
  }, [diaSeleccionado, tipoPista]);

  function estaOcupada(hora: string, pista: number) {
    const [h, m] = hora.split(":").map(Number);
    const inicio = h * 60 + m;
    const finReserva = inicio + duracion;

    return reservas.some((r) => {
      if (r.pista !== pista) return false;
      const [rh, rm] = r.hora.split(":").map(Number);
      const reservaInicio = rh * 60 + rm;
      const reservaFin = reservaInicio + r.duracion;
      return inicio < reservaFin && finReserva > reservaInicio;
    });
  }

  function horaPasada(hora: string): boolean {
    if (!diaSeleccionado.isSame(hoy, "day")) return false;

    const [h, m] = hora.split(":").map(Number);
    const ahora = dayjs();
    const horaReserva = dayjs().hour(h).minute(m);

    return ahora.isAfter(horaReserva);
  }

  async function existeUsuario(username: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("userstenis")
      .select("username")
      .eq("username", username); // Usamos eq en lugar de ilike para comparación exacta

    return !error && (data?.length ?? 0) > 0;
  }

  async function maxReservasSemana(jugador: string, pista: number) {
    if (!jugador || !pistasTierra.includes(pista)) return false;
    const semanaInicio = diaSeleccionado.startOf("week").format("YYYY-MM-DD");
    const semanaFin = diaSeleccionado.endOf("week").format("YYYY-MM-DD");

    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .or(`jugador1.eq.${jugador},jugador2.eq.${jugador}`)
      .gte("fecha", semanaInicio)
      .lte("fecha", semanaFin)
      .in("pista", pistasTierra);

    if (error) {
      setMensaje("Error comprobando reservas semanales");
      return true;
    }

    return (data?.length ?? 0) >= 2;
  }

  async function reservar() {
    if (!horaSeleccionada || !pistaSeleccionada) {
      setMensaje("Debes seleccionar hora y pista");
      return;
    }

    if (!jugador1) {
      setMensaje("Debe ingresar nombre del Jugador 1");
      return;
    }

    setMensaje(null);
    setLoading(true);

    try {
      const [existeJ1, existeJ2] = await Promise.all([
        existeUsuario(jugador1),
        existeUsuario(jugador2),
      ]);

      if (!existeJ1 || !existeJ2) {
        let errorMsg = "";
        if (!existeJ1) errorMsg += `El jugador 1 (${jugador1}) no existe. `;
        if (!existeJ2) errorMsg += `El jugador 2 (${jugador2}) no existe. `;
        setMensaje(errorMsg + "Por favor, verifica los nombres.");
        setLoading(false);
        return;
      }
    } catch {
      setMensaje("Error al verificar jugadores");
      setLoading(false);
      return;
    }

    if (pistasTierra.includes(pistaSeleccionada)) {
      if (await maxReservasSemana(jugador1, pistaSeleccionada)) {
        setMensaje("Jugador 1 ha alcanzado el máximo de 2 reservas esta semana en pistas de tierra.");
        setLoading(false);
        return;
      }
      if (jugador2 && await maxReservasSemana(jugador2, pistaSeleccionada)) {
        setMensaje("Jugador 2 ha alcanzado el máximo de 2 reservas esta semana en pistas de tierra.");
        setLoading(false);
        return;
      }
    }

    const horaDB = `${horaSeleccionada}:00`;

    const nuevaReserva = {
      fecha: diaSeleccionado.format("YYYY-MM-DD"),
      hora: horaDB,
      duracion,
      pista: pistaSeleccionada,
      jugador1,
      jugador2,
    };

    const { error } = await supabase.from("reservas").insert(nuevaReserva);

    if (error) {
      setMensaje("Error al guardar reserva");
      setLoading(false);
      return;
    }

    setMensaje("Reserva realizada con éxito!");
    setLoading(false);

    const fechaISO = diaSeleccionado.format("YYYY-MM-DD");
    const { data } = await supabase
      .from("reservas")
      .select("*")
      .eq("fecha", fechaISO);

    const reservasFiltradas = (data || []).filter(reserva =>
      tipoPista === "tierra"
        ? pistasTierra.includes(reserva.pista)
        : pistasRapida.includes(reserva.pista)
    );

    setReservas(reservasFiltradas);

    setHoraSeleccionada(null);
    setFormVisible(false);
    setJugador1("");
    setJugador2("");
    setPistaSeleccionada(null);
  }

  function diaValido(dia: dayjs.Dayjs) {
    return dia.isBefore(hoy.add(8, "day"), "day");
  }

  const pistasDisponibles = tipoPista === "tierra" ? pistasTierra : pistasRapida;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 pt-24">
        {/* Título */}
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-green-800">
            Reserva tu pista de tenis
          </h1>
          {user && (
            <p className="text-center text-lg text-green-600 mb-10">
              Bienvenido, <span className="font-semibold">{user.nombre || user.username || user.email.split('@')[0]}</span>
            </p>
          )}

          {/* Selector de tipo de pista */}
          <div className="flex justify-center gap-6 mb-10">
            <button
              onClick={() => setTipoPista("tierra")}
              className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${tipoPista === "tierra"
                ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
                : "bg-white text-green-900 hover:bg-green-50 border-2 border-green-200"
                }`}
            >
              Pista de Tierra
            </button>
            <button
              onClick={() => setTipoPista("rapida")}
              className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${tipoPista === "rapida"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                : "bg-white text-blue-900 hover:bg-blue-50 border-2 border-blue-200"
                }`}
            >
              Pista Rápida (Quick)
            </button>
          </div>

          {/* Selector de día */}
          <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
            {proximosDias.map((dia) => {
              const esSeleccionado = dia.isSame(diaSeleccionado, "day");
              const valido = diaValido(dia);
              return (
                <button
                  key={dia.toString()}
                  onClick={() => valido && setDiaSeleccionado(dia)}
                  disabled={!valido}
                  className={`min-w-[110px] rounded-xl py-4 px-2 font-semibold text-center transition-all ${esSeleccionado
                    ? "bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg"
                    : "bg-white text-green-900 hover:bg-green-50 border border-green-200"
                    } ${!valido ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="text-sm uppercase tracking-wider">
                    {dia.format("dddd").charAt(0).toUpperCase() + dia.format("dddd").slice(1, 3)}
                  </div>
                  <div className="text-xl font-bold mt-1">{dia.format("DD")}</div>
                  <div className="text-xs text-green-600 mt-1">{dia.format("MMM")}</div>
                </button>
              );
            })}
          </div>

          {/* Horarios */}
          <div className="grid gap-4">
            {horarios.map((hora) => (
              <div key={hora} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center">
                  <div className="w-24 flex-shrink-0 p-4 bg-green-50 text-center">
                    <span className="text-lg font-bold text-green-800">{hora}</span>
                  </div>

                  <div className="flex-1 grid grid-cols-2 gap-4 p-4">
                    {pistasDisponibles.map((p) => {
                      const ocupada = estaOcupada(hora, p);
                      const seleccionada = hora === horaSeleccionada && p === pistaSeleccionada;
                      const pasada = horaPasada(hora);
                      const reserva = reservas.find(r =>
                        r.pista === p &&
                        r.hora.startsWith(hora) &&
                        r.fecha === diaSeleccionado.format("YYYY-MM-DD")
                      );

                      return (
                        <div key={p} className="relative">
                          <button
                            disabled={ocupada || pasada}
                            onClick={() => {
                              if (!pasada && !ocupada) {
                                setHoraSeleccionada(hora);
                                setPistaSeleccionada(p);
                                setFormVisible(true);
                              }
                            }}
                            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-between ${ocupada
                              ? "bg-red-50 text-red-800 border border-red-200 cursor-not-allowed"
                              : pasada
                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                : seleccionada
                                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                                  : "bg-green-50 text-green-800 hover:bg-green-100 border border-green-200"
                              }`}
                          >
                            <span>Pista {p}</span>
                            <span className="text-sm font-normal">
                              {ocupada ? "Pista Reservada" : pasada ? "No disponible" : "Disponible"}
                            </span>
                          </button>

                          {ocupada && reserva && (
                            <div className="mt-2 text-xs text-gray-600">
                              <div className="flex justify-between">

                              </div>
                              {reserva.jugador2 && (
                                <div className="flex justify-between">

                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario de reserva */}
        {formVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                reservar();
              }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6"
            >
              <h3 className="text-2xl font-bold text-center text-green-800">
                Confirmar Reserva
              </h3>

              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-lg font-semibold text-green-700">Pista {pistaSeleccionada}</div>
                <div className="text-gray-600">
                  {diaSeleccionado.format("dddd, D [de] MMMM")} a las {horaSeleccionada}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700 font-medium">Jugador 1</span>
                  <input
                    type="text"
                    required
                    value={jugador1}
                    onChange={(e) => setJugador1(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    placeholder="Nombre del jugador"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">Jugador 2</span>
                  <input
                    type="text"
                    value={jugador2}
                    onChange={(e) => setJugador2(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    placeholder="Nombre del jugador"
                  />
                </label>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between text-gray-700">
                    <span>Duración:</span>
                    <span className="font-medium">1 hora 30 minutos</span>
                  </div>
                </div>
              </div>

              {mensaje && (
                <div className={`p-3 rounded-lg text-center ${mensaje.includes("éxito") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {mensaje}
                </div>
              )}

              <div className="flex justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setFormVisible(false);
                    setMensaje(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-medium hover:from-green-700 hover:to-green-800 transition disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </span>
                  ) : "Confirmar Reserva"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </>
  );
}