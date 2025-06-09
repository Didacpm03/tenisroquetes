import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { supabase } from "../../supabaseClient";
import Navbar from "../components/Navbar";
import Lluvia from '../assets/png/mojado.jpeg';
import Vacaciones from '../assets/png/vacaciones.jpg';
import { sendReservationReminder } from './emailService';



dayjs.locale("es");

const pistasTierra = [1, 2];
const pistasRapida = [3, 4];
const pistasPadel = [5];

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

// Ajustar los horarios para permitir reservas de 1h30
const horariosEntreSemana = generarIntervalos("9:00", "21:00"); // Última reserva a las 20:30 (termina a las 22:00)
const horariosFinSemana = generarIntervalos("09:00", "13:00"); // Última reserva a las 12:30 (termina a las 14:00)

type Reserva = {
  id: number;
  pista: number;
  fecha: string;
  hora: string;
  duracion: number;
  jugador1: string;
  jugador2: string;
};

interface Amigo {
  id: string;
  username: string;
}

export default function Reservar() {
  const hoy = dayjs().startOf("day");
  const [diaSeleccionado, setDiaSeleccionado] = useState(hoy);
  const [tipoPista, setTipoPista] = useState<"tierra" | "rapida" | "padel">("tierra");
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
  const [advertencias, setAdvertencias] = useState<any[]>([]);
  const [loadingAdvertencias, setLoadingAdvertencias] = useState(false);
  const [amigos, setAmigos] = useState<Amigo[]>([]);
  const [loadingAmigos, setLoadingAmigos] = useState(false);
  const [showAmigosDropdown, setShowAmigosDropdown] = useState(false);

  const proximosDias = Array(7).fill(0).map((_, i) => hoy.add(i, "day"));

  const horarios = diaSeleccionado.day() >= 1 && diaSeleccionado.day() <= 5
    ? horariosEntreSemana
    : horariosFinSemana;

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  // Obtener advertencias para la fecha seleccionada
  useEffect(() => {
    const fetchAdvertencias = async () => {
      setLoadingAdvertencias(true);
      try {
        const { data, error } = await supabase
          .from('advertencias')
          .select('*')
          .eq('fecha', diaSeleccionado.format('YYYY-MM-DD'));

        if (error) throw error;

        setAdvertencias(data || []);
      } catch (err) {
        console.error('Error al obtener advertencias:', err);
      } finally {
        setLoadingAdvertencias(false);
      }
    };

    fetchAdvertencias();
  }, [diaSeleccionado]);

  useEffect(() => {
    const fetchAmigos = async () => {
      if (!user) return;

      setLoadingAmigos(true);
      try {
        // Consulta similar a la de Amigos.tsx
        const { data: amigosData, error } = await supabase
          .from('amigos')
          .select(`
          id,
          estado,
          amigo:amigo_id(id, username)
        `)
          .eq('usuario_id', user.id)
          .eq('estado', 'aceptado');

        if (error) throw error;

        // Formatear los datos como en Amigos.tsx
        const amigosFormateados = (amigosData || []).map((relacion: any) => ({
          id: relacion.amigo.id,
          username: relacion.amigo.username
        }));

        setAmigos(amigosFormateados);
      } catch (err) {
        console.error('Error al cargar amigos:', err);
      } finally {
        setLoadingAmigos(false);
      }
    };

    fetchAmigos();
  }, [user]);

  useEffect(() => {
    async function cargarReservas() {
      const fechaISO = diaSeleccionado.format("YYYY-MM-DD");

      // Determinar la tabla según el tipo de pista
      const tableName = tipoPista === "padel" ? "reservas_padel" : "reservas";

      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("fecha", fechaISO);

      if (error) {
        setMensaje("Error cargando reservas");
        return;
      }

      const reservasFiltradas = (data || []).filter(reserva =>
        tipoPista === "tierra" ? pistasTierra.includes(reserva.pista) :
          tipoPista === "rapida" ? pistasRapida.includes(reserva.pista) :
            pistasPadel.includes(reserva.pista)
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
    const horaActual = h * 60 + m; // Convertir a minutos

    return reservas.some(r => {
      if (r.pista !== pista || r.fecha !== diaSeleccionado.format("YYYY-MM-DD")) {
        return false;
      }

      const [rh, rm] = r.hora.split(":").map(Number);
      const horaReserva = rh * 60 + rm; // Minutos de inicio de la reserva
      const horaFinReserva = horaReserva + r.duracion; // Minutos de fin de la reserva

      // Comprobar si la hora actual está dentro del intervalo de la reserva
      return horaActual >= horaReserva && horaActual < horaFinReserva;
    });
  }

  function horaPasada(hora: string): boolean {
    if (!diaSeleccionado.isSame(hoy, "day")) return false;

    const [h, m] = hora.split(":").map(Number);
    const ahora = dayjs();
    const horaReserva = dayjs().hour(h).minute(m);

    return ahora.isAfter(horaReserva);
  }

  function excedeHorario(hora: string): boolean {
    const [h, m] = hora.split(":").map(Number);
    const horaReserva = dayjs().hour(h).minute(m);
    const horaFinReserva = horaReserva.add(duracion, 'minute');

    if (diaSeleccionado.day() >= 1 && diaSeleccionado.day() <= 5) {
      // Entre semana: cierre a las 22:00
      const cierre = dayjs().hour(22).minute(0);
      return horaFinReserva.isAfter(cierre);
    } else {
      // Fin de semana: cierre a las 14:00
      const cierre = dayjs().hour(14).minute(0);
      return horaFinReserva.isAfter(cierre);
    }
  }

  async function existeUsuario(username: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("userstenis")
      .select("username")
      .eq("username", username);

    return !error && (data?.length ?? 0) > 0;
  }

  async function maxReservasSemana(jugador: string) {
    if (!jugador) return false;

    const semanaInicio = diaSeleccionado.startOf("week").format("YYYY-MM-DD");
    const semanaFin = diaSeleccionado.endOf("week").format("YYYY-MM-DD");

    const tableName = tipoPista === "padel" ? "reservas_padel" : "reservas";
    const pistasFiltro =
      tipoPista === "tierra" ? pistasTierra :
        tipoPista === "rapida" ? pistasRapida :
          pistasPadel;

    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .or(`jugador1.eq.${jugador},jugador2.eq.${jugador}`)
      .gte("fecha", semanaInicio)
      .lte("fecha", semanaFin)
      .in("pista", pistasFiltro);

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

    if (excedeHorario(horaSeleccionada)) {
      setMensaje("La reserva excede el horario de cierre del club");
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

    if (await maxReservasSemana(jugador1)) {
      setMensaje(`Jugador 1 ha alcanzado el máximo de 2 reservas esta semana en pistas de ${tipoPista}.`);
      setLoading(false);
      return;
    }
    if (jugador2 && await maxReservasSemana(jugador2)) {
      setMensaje(`Jugador 2 ha alcanzado el máximo de 2 reservas esta semana en pistas de ${tipoPista}.`);
      setLoading(false);
      return;
    }

    const horaDB = `${horaSeleccionada}:00`;

    const nuevaReserva = {
      fecha: diaSeleccionado.format("YYYY-MM-DD"),
      hora: horaDB,
      duracion,
      pista: pistaSeleccionada,
      jugador1,
      jugador2,
      estado_pago: 'pendiente' // Añadir este campo
    };

    const tableName = tipoPista === "padel" ? "reservas_padel" : "reservas";
    const { error } = await supabase.from(tableName).insert(nuevaReserva);

    if (error) {
      setMensaje("Error al guardar reserva");
      setLoading(false);
      return;
    }

    // Enviar notificación de reserva
    try {
      await sendReservationReminder({
        ...nuevaReserva,
        user_id: user.id,
        tipo: tipoPista,
      });
    } catch (err) {
      console.error('Error enviando notificación:', err);
    }

    setMensaje("Reserva realizada con éxito!");
    setLoading(false);

    const fechaISO = diaSeleccionado.format("YYYY-MM-DD");
    const { data } = await supabase
      .from(tableName)
      .select("*")
      .eq("fecha", fechaISO);

    const reservasFiltradas = (data || []).filter(reserva =>
      tipoPista === "tierra" ? pistasTierra.includes(reserva.pista) :
        tipoPista === "rapida" ? pistasRapida.includes(reserva.pista) :
          pistasPadel.includes(reserva.pista)
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

  const pistasDisponibles =
    tipoPista === "tierra" ? pistasTierra :
      tipoPista === "rapida" ? pistasRapida :
        pistasPadel;

  // Verificar si hay advertencia para la fecha actual
  const tieneAdvertencia = advertencias.length > 0;
  const motivoAdvertencia = tieneAdvertencia ? advertencias[0].motivo : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 pt-24">
        {/* Título */}
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-green-800">
            Reserva tu pista {tipoPista === "padel" ? "de pádel" : "de tennis"}
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
            <button
              onClick={() => setTipoPista("padel")}
              className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${tipoPista === "padel"
                ? "bg-gradient-to-r from-black to-gray-800 text-white shadow-lg"
                : "bg-white text-black hover:bg-gray-100 border-2 border-gray-300"
                }`}
            >
              Pádel
            </button>
          </div>

          {/* Selector de día */}
          <div className="flex justify-center gap-4 mb-6 overflow-x-auto pb-4">
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

          {/* Mostrar advertencia si existe */}
          {loadingAdvertencias ? (
            <div className="flex justify-center items-center h-32 mb-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-green-600"></div>
            </div>
          ) : tieneAdvertencia ? (
            <div className="relative rounded-xl overflow-hidden shadow-lg mb-10">
              <img
                src={motivoAdvertencia === 'vacaciones' ? Vacaciones : Lluvia}
                alt={motivoAdvertencia === 'vacaciones' ? "Club cerrado por vacaciones" : "Pista mojada"}
                className="w-full h-[550px] object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                <div className="bg-red-600 bg-opacity-90 rounded-2xl shadow-lg p-8 max-w-md text-white text-center border-4 border-red-300 animate-fade-in">

                  <div className="flex justify-center mb-4">
                    <div className="bg-white rounded-full p-3 shadow-md">
                      <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.763-1.36 2.681-1.36 3.444 0l6.518 11.636c.75 1.34-.213 3.02-1.723 3.02H3.462c-1.51 0-2.473-1.68-1.723-3.02L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-.25-4a.75.75 0 00-1.5 0v2a.75.75 0 001.5 0V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-2">⚠️ Reservas Canceladas</h2>
                  <p className="text-lg font-semibold mb-4">Motivo: {motivoAdvertencia}</p>

                  <p className="text-base">
                    {motivoAdvertencia === 'vacaciones'
                      ? `El club estará cerrado el día ${diaSeleccionado.format('dddd, D [de] MMMM')} por vacaciones.`
                      : `Las reservas para el día ${diaSeleccionado.format('dddd, D [de] MMMM')} han sido canceladas debido a ${motivoAdvertencia}.`}
                  </p>
                </div>
              </div>
            </div>
          ) : (
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
                        const fueraHorario = excedeHorario(hora);
                        const reserva = reservas.find(r =>
                          r.pista === p &&
                          r.hora.startsWith(hora) &&
                          r.fecha === diaSeleccionado.format("YYYY-MM-DD")
                        );

                        return (
                          <div key={p} className="relative">
                            <button
                              disabled={ocupada || pasada || fueraHorario || tieneAdvertencia}
                              onClick={() => {
                                if (!pasada && !ocupada && !fueraHorario && !tieneAdvertencia) {
                                  setHoraSeleccionada(hora);
                                  setPistaSeleccionada(p);
                                  setFormVisible(true);
                                }
                              }}
                              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-between ${ocupada
                                ? "bg-red-50 text-red-800 border border-red-200 cursor-not-allowed"
                                : pasada
                                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                  : fueraHorario
                                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                    : tieneAdvertencia
                                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                      : seleccionada
                                        ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                                        : "bg-green-50 text-green-800 hover:bg-green-100 border border-green-200"
                                }`}
                            >
                              <span>Pista {p}</span>
                              <span className="text-sm font-normal">
                                {ocupada
                                  ? "Pista Reservada"
                                  : pasada
                                    ? "No disponible"
                                    : fueraHorario
                                      ? "Fuera de horario"
                                      : tieneAdvertencia
                                        ? "Cancelado"
                                        : "Disponible"}
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
          )}
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

                <label className="block relative">
                  <span className="text-gray-700 font-medium">Jugador 2 (Opcional)</span>
                  <div className="relative">
                    <input
                      type="text"
                      value={jugador2}
                      onChange={(e) => setJugador2(e.target.value)}
                      onFocus={() => setShowAmigosDropdown(true)}
                      onBlur={() => setTimeout(() => setShowAmigosDropdown(false), 200)}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                      placeholder="Nombre de usuario del amigo"
                    />
                    {showAmigosDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {loadingAmigos ? (
                          <div className="px-4 py-2 text-center text-gray-500">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                          </div>
                        ) : amigos.length === 0 ? (
                          <div className="px-4 py-2 text-gray-500">
                            No tienes amigos agregados
                          </div>
                        ) : (
                          amigos.map((amigo) => (
                            <div
                              key={amigo.id}
                              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                setJugador2(amigo.username);
                                setShowAmigosDropdown(false);
                              }}
                            >
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                {amigo.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium">{amigo.username}</div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
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