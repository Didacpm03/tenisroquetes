import { useState, useEffect } from "react";
import "dayjs/locale/es";
import { supabase } from "../../supabaseClient";
import Navbar from "../components/Navbar";
import PadelBackground from '../assets/png/padel.jpg'; // Nueva imagen de fondo futurista
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);
dayjs.locale("es");

const pistasTierra = [1, 2];
const pistasRapida = [3, 4];
const pistasPadel = [5];

// Updated function to accept parameters
function generarIntervalos(inicioManana: string, finManana: string, inicioTarde?: string, finTarde?: string) {
  const intervaloManana = generarBloqueHorario(inicioManana, finManana);
  const intervaloTarde = inicioTarde && finTarde ? generarBloqueHorario(inicioTarde, finTarde) : [];
  return [...intervaloManana, ...intervaloTarde];
}

function generarBloqueHorario(inicio: string, fin: string) {
  const resultado: string[] = [];
  let actual = dayjs().startOf("day").hour(parseInt(inicio.split(":")[0])).minute(parseInt(inicio.split(":")[1]));
  const finHora = dayjs().startOf("day").hour(parseInt(fin.split(":")[0])).minute(parseInt(fin.split(":")[1]));
  while (actual.isBefore(finHora)) {
    resultado.push(actual.format("HH:mm"));
    actual = actual.add(30, "minute");
  }
  return resultado;
}

// Updated horarios definitions
const horariosEntreSemana = generarIntervalos("10:00", "13:00", "16:00", "22:00");
const horariosFinSemana = generarIntervalos("09:00", "12:30"); // Solo mañana hasta las 12:30

type Reserva = {
  id: number;
  pista: number;
  fecha: string;
  hora: string;
  duracion: number;
  jugador1: string;
  jugador2?: string | null;  // Cambiado a opcional
  jugador3?: string;
  jugador4?: string;
  tipo_partido?: "normal" | "abierto";
  modalidad?: "individual" | "dobles";
  estado?: "abierto" | "completo";
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
  const [pistaSeleccionada, setPistaSeleccionada] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [advertencias, setAdvertencias] = useState<any[]>([]);
  const [, setLoadingAdvertencias] = useState(false);
  const [, setAmigos] = useState<Amigo[]>([]);
  const [, setLoadingAmigos] = useState(false);
  const [partidosAbiertos, setPartidosAbiertos] = useState<Reserva[]>([]);
  const [jugador3, setJugador3] = useState("");
  const [jugador4, setJugador4] = useState("");
  const [tipoPartido, setTipoPartido] = useState<"normal" | "abierto">("normal");
  const [modalidadPartido, setModalidadPartido] = useState<"individual" | "dobles">("individual");
  const [unirseLoading, setUnirseLoading] = useState<number | null>(null);

  const cantidadDiasAVisualizar = user && ["dario", "didac"].includes(user.username.toLowerCase()) ? 30 : 7;
  const proximosDias = Array(cantidadDiasAVisualizar).fill(0).map((_, i) => hoy.add(i, "day"));
  



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

      // Cargar partidos abiertos
      const { data: abiertosData, error: abiertosError } = await supabase
        .from(tableName)
        .select("*")
        .eq("fecha", fechaISO)
        .eq("tipo_partido", "abierto")
        .eq("estado", "abierto");

      if (!abiertosError) {
        setPartidosAbiertos(abiertosData || []);
      }
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
    const horaActual = h * 60 + m;
    const usuariosEspeciales = ["dario", "didac"];
    const esUsuarioEspecial = user && usuariosEspeciales.includes(user.username.toLowerCase());

    const reservaEncontrada = reservas.find(r => {
      if (r.pista !== pista || r.fecha !== diaSeleccionado.format("YYYY-MM-DD")) {
        return false;
      }

      const [rh, rm] = r.hora.split(":").map(Number);
      const horaReserva = rh * 60 + rm;
      const horaFinReserva = horaReserva + r.duracion;

      return horaActual >= horaReserva && horaActual < horaFinReserva;
    });

    if (reservaEncontrada) {
      if (esUsuarioEspecial) {
        const jugadores = [
          `Jugador1: ${reservaEncontrada.jugador1}`,
          reservaEncontrada.jugador2 && `Jugador2: ${reservaEncontrada.jugador2}`,
          reservaEncontrada.jugador3 && `Jugador3: ${reservaEncontrada.jugador3}`,
          reservaEncontrada.jugador4 && `Jugador4: ${reservaEncontrada.jugador4}`
        ].filter(Boolean).join(", ");
        return jugadores;
      }
      return true;
    }
    return false;
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
    const horaReserva = dayjs().hour(h).minute(m).second(0);

    // Verificar si es día de semana (lunes a viernes)
    const esDiaSemana = diaSeleccionado.day() >= 1 && diaSeleccionado.day() <= 5;

    if (esDiaSemana) {
      // Verificar si es por la mañana (10:00-13:00)
      const esManana = horaReserva.isBetween(
        dayjs().hour(10).minute(0).second(0),
        dayjs().hour(13).minute(0).second(0),
        null,
        '[)'
      );

      // Verificar si es por la tarde (16:00-22:00)
      const esTarde = horaReserva.isBetween(
        dayjs().hour(16).minute(0).second(0),
        dayjs().hour(22).minute(0).second(0),
        null,
        '[)'
      );

      const duracionPartido = modalidadPartido === "dobles" ? 90 : 90;
      const horaFinReserva = horaReserva.add(duracionPartido, 'minute');

      if (esManana) {
        return horaFinReserva.isAfter(dayjs().hour(13).minute(0).second(0));
      } else if (esTarde) {
        return horaFinReserva.isAfter(dayjs().hour(22).minute(0).second(0));
      }
    } else {
      // Fin de semana (sábado y domingo) - solo mañana hasta 12:30
      const esMananaFinSemana = horaReserva.isBetween(
        dayjs().hour(9).minute(0).second(0),
        dayjs().hour(12).minute(30).second(0),
        null,
        '[)'
      );

      const duracionPartido = modalidadPartido === "dobles" ? 90 : 90;
      const horaFinReserva = horaReserva.add(duracionPartido, 'minute');

      if (esMananaFinSemana) {
        return horaFinReserva.isAfter(dayjs().hour(14).minute(0).second(0));
      }
    }

    return true; // Si no está en ninguno de los bloques horarios permitidos
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

  async function unirseAPartido(partidoId: number) {
    if (!user) return;

    setUnirseLoading(partidoId);
    setMensaje(null);

    try {
      const tableName = tipoPista === "padel" ? "reservas_padel" : "reservas";

      const { data: partidoData, error: partidoError } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", partidoId)
        .single();

      if (partidoError) throw partidoError;

      const partido = partidoData as Reserva;

      if (
        partido.jugador1 === user.username ||
        partido.jugador2 === user.username ||
        partido.jugador3 === user.username ||
        partido.jugador4 === user.username
      ) {
        setMensaje("Ya estás en este partido");
        return;
      }

      let updateData: Partial<Reserva> = {};
      let nuevoEstado = partido.estado;

      if (partido.modalidad === "individual") {
        if (!partido.jugador2) {
          updateData = { jugador2: user.username };
          nuevoEstado = "completo";
        } else {
          setMensaje("No hay espacios disponibles en este partido");
          return;
        }
      } else {
        if (!partido.jugador2) {
          updateData = { jugador2: user.username };
        } else if (!partido.jugador3) {
          updateData = { jugador3: user.username };
        } else if (!partido.jugador4) {
          updateData = { jugador4: user.username };
          nuevoEstado = "completo";
        } else {
          setMensaje("No hay espacios disponibles en este partido");
          return;
        }
      }

      const { error } = await supabase
        .from(tableName)
        .update({ ...updateData, estado: nuevoEstado })
        .eq("id", partidoId);

      if (error) throw error;

      setPartidosAbiertos(prev =>
        prev.map(p =>
          p.id === partidoId
            ? { ...p, ...updateData, estado: nuevoEstado } as Reserva
            : p
        )
      );

      const fechaISO = diaSeleccionado.format("YYYY-MM-DD");
      const { data: nuevasReservas } = await supabase
        .from(tableName)
        .select("*")
        .eq("fecha", fechaISO);

      const reservasFiltradas = (nuevasReservas || []).filter(reserva =>
        tipoPista === "tierra" ? pistasTierra.includes(reserva.pista) :
          tipoPista === "rapida" ? pistasRapida.includes(reserva.pista) :
            pistasPadel.includes(reserva.pista)
      );

      setReservas(reservasFiltradas);

      setMensaje("¡Te has unido al partido con éxito!");
    } catch (err) {
      setMensaje("Error al unirse al partido: " + (err instanceof Error ? err.message : "Error desconocido"));
    } finally {
      setUnirseLoading(null);
    }
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

    if (tipoPartido === "normal") {
      if (modalidadPartido === "individual" && !jugador2) {
        setMensaje("Debe ingresar nombre del Jugador 2");
        return;
      }
      if (modalidadPartido === "dobles" && (!jugador2 || !jugador3 || !jugador4)) {
        setMensaje("Para dobles normales debe ingresar los 4 jugadores");
        return;
      }
    }
    if (tipoPartido === "normal" && !jugador2) {
      setMensaje("Debe ingresar nombre del Jugador 2");
      return;
    }

    setMensaje(null);
    setLoading(true);

    try {
      const verificaciones = [
        existeUsuario(jugador1),
        jugador2 ? existeUsuario(jugador2) : Promise.resolve(true),
        jugador3 ? existeUsuario(jugador3) : Promise.resolve(true),
        jugador4 ? existeUsuario(jugador4) : Promise.resolve(true),
      ];

      const [existeJ1, existeJ2, existeJ3, existeJ4] = await Promise.all(verificaciones);

      if (!existeJ1) {
        setMensaje(`El jugador 1 (${jugador1}) no existe.`);
        setLoading(false);
        return;
      }
      if (jugador2 && !existeJ2) {
        setMensaje(`El jugador 2 (${jugador2}) no existe.`);
        setLoading(false);
        return;
      }
      if (jugador3 && !existeJ3) {
        setMensaje(`El jugador 3 (${jugador3}) no existe.`);
        setLoading(false);
        return;
      }
      if (jugador4 && !existeJ4) {
        setMensaje(`El jugador 4 (${jugador4}) no existe.`);
        setLoading(false);
        return;
      }
    } catch {
      setMensaje("Error al verificar jugadores");
      setLoading(false);
      return;
    }

    if (await maxReservasSemana(jugador1)) {
      setMensaje(`Jugador 1 ha alcanzado el máximo de 2 reservas semanales.`);
      setLoading(false);
      return;
    }
    if (jugador2 && await maxReservasSemana(jugador2)) {
      setMensaje(`Jugador 2 ha alcanzado el máximo de 2 reservas semanales.`);
      setLoading(false);
      return;
    }

    const horaDB = `${horaSeleccionada}:00`;
    const duracionReserva = modalidadPartido === "dobles" ? 90 : 90;

    const nuevaReserva = {
      fecha: diaSeleccionado.format("YYYY-MM-DD"),
      hora: horaDB,
      duracion: duracionReserva,
      pista: pistaSeleccionada,
      jugador1,
      jugador2: jugador2 || null,
      jugador3: modalidadPartido === "dobles" ? jugador3 || null : null,
      jugador4: modalidadPartido === "dobles" ? jugador4 || null : null,
      tipo_partido: tipoPartido,
      modalidad: modalidadPartido,
      estado: tipoPartido === "abierto" ? "abierto" : undefined,
      estado_pago: 'pendiente'
    };

    const tableName = tipoPista === "padel" ? "reservas_padel" : "reservas";
    const { data, error } = await supabase
      .from(tableName)
      .insert(nuevaReserva)
      .select();

    if (error) {
      setMensaje("Error al guardar reserva: " + error.message);
      setLoading(false);
      return;
    }

    if (tipoPartido === "abierto") {
      setPartidosAbiertos(prev => [...prev, data[0] as Reserva]);
    }

    const fechaISO = diaSeleccionado.format("YYYY-MM-DD");
    const { data: nuevasReservas } = await supabase
      .from(tableName)
      .select("*")
      .eq("fecha", fechaISO);

    const reservasFiltradas = (nuevasReservas || []).filter(reserva =>
      tipoPista === "tierra" ? pistasTierra.includes(reserva.pista) :
        tipoPista === "rapida" ? pistasRapida.includes(reserva.pista) :
          pistasPadel.includes(reserva.pista)
    );

    setReservas(reservasFiltradas);
    setMensaje(tipoPartido === "abierto" ? "Partido abierto creado con éxito!" : "Reserva realizada con éxito!");
    setLoading(false);

    setHoraSeleccionada(null);
    setFormVisible(false);
    setJugador1("");
    setJugador2("");
    setJugador3("");
    setJugador4("");
    setPistaSeleccionada(null);
  }

  function diaValido(dia: dayjs.Dayjs) {
    const usuariosEspeciales = ["dario", "didac"];
    const esUsuarioEspecial = user && usuariosEspeciales.includes(user.username.toLowerCase());

    if (esUsuarioEspecial) {
      return true; // Pueden ver todas las fechas
    }
    return dia.isBefore(hoy.add(8, "day"), "day");
  }

  const pistasDisponibles =
    tipoPista === "tierra" ? pistasTierra :
      tipoPista === "rapida" ? pistasRapida :
        pistasPadel;

  const tieneAdvertencia = advertencias.length > 0;

  return (
    <>
      <Navbar />
      <main
        className={`min-h-screen transition-all duration-500 ${tipoPista === "padel" ?
          "bg-black" :
          "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          }`}
        style={tipoPista === "padel" ? {
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), url(${PadelBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        } : {}}
      >
        {/* Efecto de partículas futuristas */}
        <div className="fixed inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-400 animate-float"
              style={{
                width: `${Math.random() * 5 + 1}px`,
                height: `${Math.random() * 5 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          {/* Título holográfico */}
          <div className="text-center mb-16 relative">
            <div className="absolute -inset-4 bg-cyan-500 rounded-xl blur-2xl opacity-20 animate-pulse"></div> <br /><br />
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 animate-gradient-x relative">
              RESERVA {tipoPista === "padel" ? "PÁDEL" : "TENNIS"}
            </h1>
            {user && (
              <p className="text-xl text-gray-300 font-light">
                Bienvenido, <span className="font-medium text-cyan-400">{user.nombre || user.username || user.email.split('@')[0]}</span>
              </p>
            )}
          </div>

          {/* Selector de pista estilo consola */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={() => setTipoPista("tierra")}
              className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center tracking-tight
              relative overflow-hidden group
              ${tipoPista === "tierra" ?
                  "bg-gray-900 text-orange-400 border-2 border-orange-400 shadow-lg shadow-orange-500/20" :
                  "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"
                }`}
            >
              <span className="relative z-10">TENNIS <span className="ml-1 text-orange-400">TIERRA</span></span>
              {tipoPista === "tierra" && (
                <>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400 animate-pulse"></span>
                </>
              )}
            </button>

            <button
              onClick={() => setTipoPista("rapida")}
              className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center tracking-tight
              relative overflow-hidden group
              ${tipoPista === "rapida" ?
                  "bg-gray-900 text-blue-400 border-2 border-blue-400 shadow-lg shadow-blue-500/20" :
                  "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"
                }`}
            >
              <span className="relative z-10">TENNIS <span className="ml-1 text-blue-400">RÁPIDA</span></span>
              {tipoPista === "rapida" && (
                <>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 animate-pulse"></span>
                </>
              )}
            </button>

            <button
              onClick={() => setTipoPista("padel")}
              className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center tracking-tight
              relative overflow-hidden group
              ${tipoPista === "padel" ?
                  "bg-gray-900 text-purple-400 border-2 border-purple-400 shadow-lg shadow-purple-500/20" :
                  "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"
                }`}
            >
              <span className="relative z-10"><span className="text-purple-400">PÁDEL</span></span>
              {tipoPista === "padel" && (
                <>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400 animate-pulse"></span>
                </>
              )}
            </button>
          </div>

          {/* Selector de días estilo terminal */}
          <div className="mb-10 relative">
  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl blur opacity-20"></div>
  <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
    <div className="flex overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex space-x-3">
        {proximosDias.map((dia) => {
          const esSeleccionado = dia.isSame(diaSeleccionado, "day");
          const valido = diaValido(dia);
          return (
            <button
              key={dia.toString()}
              onClick={() => valido && setDiaSeleccionado(dia)}
              disabled={!valido}
              className={`flex flex-col items-center justify-center min-w-[90px] p-3 rounded-lg transition-all duration-300 relative overflow-hidden group
                ${esSeleccionado ?
                  "bg-gradient-to-br from-cyan-600/30 to-blue-600/30 text-white border border-cyan-400/50 shadow-lg shadow-cyan-500/20" :
                  "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600"
                } ${!valido ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              {esSeleccionado && (
                <div className="absolute inset-0 bg-cyan-500/10 animate-pulse"></div>
              )}
              <div className="text-xs uppercase font-medium tracking-wider">
                {dia.format("ddd")}
              </div>
              <div className="text-2xl font-bold my-1">{dia.format("DD")}</div>
              <div className="text-xs opacity-70">{dia.format("MMM")}</div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
</div>
          {/* Partidos abiertos estilo tarjetas futuristas */}
          {partidosAbiertos.length > 0 && (
            <div className="mb-12 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-3 animate-pulse"></span>
                  PARTIDOS ABIERTOS
                  <span className="ml-auto px-3 py-1 bg-gray-800 rounded-full text-xs font-bold text-cyan-400">
                    {partidosAbiertos.length} DISPONIBLES
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {partidosAbiertos.map((partido) => (
                    <div
                      key={partido.id}
                      className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="p-5 relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="inline-block px-3 py-1 bg-gray-700/50 text-cyan-400 rounded-full text-xs font-bold mb-2">
                              PISTA {partido.pista}
                            </span>
                            <h3 className="text-lg font-bold text-white">
                              {dayjs(partido.fecha).format("DD/MM")} | {partido.hora.substring(0, 5)}
                            </h3>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${partido.modalidad === "individual" ?
                            "bg-blue-900/30 text-blue-400 border border-blue-700/50" :
                            "bg-purple-900/30 text-purple-400 border border-purple-700/50"
                            }`}>
                            {partido.modalidad === "individual" ? "INDIVIDUAL" : "DOBLES"}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                              {partido.jugador1.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-200">{partido.jugador1}</span>
                          </div>

                          {partido.jugador2 && (
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                {partido.jugador2.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-gray-200">{partido.jugador2}</span>
                            </div>
                          )}

                          {partido.modalidad === "dobles" && (
                            <>
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${partido.jugador3 ?
                                  "bg-gradient-to-br from-yellow-500 to-amber-600 text-white" :
                                  "bg-gray-700/50 text-gray-500 border border-gray-600"
                                  }`}>
                                  {partido.jugador3 ? partido.jugador3.charAt(0).toUpperCase() : "?"}
                                </div>
                                <span className={partido.jugador3 ? "font-medium text-gray-200" : "text-gray-500"}>
                                  {partido.jugador3 || "DISPONIBLE"}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${partido.jugador4 ?
                                  "bg-gradient-to-br from-pink-500 to-rose-600 text-white" :
                                  "bg-gray-700/50 text-gray-500 border border-gray-600"
                                  }`}>
                                  {partido.jugador4 ? partido.jugador4.charAt(0).toUpperCase() : "?"}
                                </div>
                                <span className={partido.jugador4 ? "font-medium text-gray-200" : "text-gray-500"}>
                                  {partido.jugador4 || "DISPONIBLE"}
                                </span>
                              </div>
                            </>
                          )}
                        </div>

                        <button
                          onClick={() => unirseAPartido(partido.id)}
                          disabled={
                            unirseLoading === partido.id ||
                            (partido.estado === "completo") ||
                            (partido.jugador1 === user?.username) ||
                            (partido.jugador2 === user?.username) ||
                            (partido.jugador3 === user?.username) ||
                            (partido.jugador4 === user?.username)
                          }
                          className={`mt-5 w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 relative overflow-hidden group
                          ${unirseLoading === partido.id ?
                              "bg-gray-700/50 text-gray-400" :
                              partido.estado === "completo" ||
                                (partido.jugador1 === user?.username) ||
                                (partido.jugador2 === user?.username) ||
                                (partido.jugador3 === user?.username) ||
                                (partido.jugador4 === user?.username) ?
                                "bg-gray-700/50 text-gray-500 cursor-not-allowed" :
                                "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg"
                            }`}
                        >
                          <span className="relative z-10">
                            {unirseLoading === partido.id ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                UNIÉNDOSE...
                              </>
                            ) : partido.estado === "completo" ? (
                              "COMPLETO"
                            ) : (partido.jugador1 === user?.username) ||
                              (partido.jugador2 === user?.username) ||
                              (partido.jugador3 === user?.username) ||
                              (partido.jugador4 === user?.username) ? (
                              "YA ESTÁS AQUÍ"
                            ) : (
                              <>
                                UNIRSE AL PARTIDO
                                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Horarios estilo terminal futurista */}
          <div className="space-y-4">
            {horarios.map((hora) => (
              <div key={hora} className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-cyan-400/50 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className={`flex items-center relative z-10 ${tipoPista === "padel" ? "justify-center" : ""}`}>
                  {tipoPista !== "padel" && (
                    <div className="w-24 flex-shrink-0 p-4 bg-gray-800/50 text-center border-r border-gray-700">
                      <span className="text-lg font-bold text-cyan-400">{hora}</span>
                    </div>
                  )}

                  <div className={`${tipoPista === "padel" ? "w-full" : "flex-1"} grid ${tipoPista === "padel" ? "grid-cols-1" : "grid-cols-2"} gap-4 p-4`}>
                    {pistasDisponibles.map((p) => {
                      const ocupada = estaOcupada(hora, p);
                      const seleccionada = hora === horaSeleccionada && p === pistaSeleccionada;
                      const pasada = horaPasada(hora);
                      const fueraHorario = excedeHorario(hora);


                      return (
                        <div key={p} className="relative">
                          {tipoPista === "padel" && (
                            <div className="text-center mb-3">
                              <span className="text-lg font-bold text-cyan-400">{hora}</span>
                            </div>
                          )}
                          <button
                            disabled={!!ocupada || pasada || fueraHorario || tieneAdvertencia}
                            onClick={() => {
                              if (!pasada && !ocupada && !fueraHorario && !tieneAdvertencia) {
                                setHoraSeleccionada(hora);
                                setPistaSeleccionada(p);
                                setFormVisible(true);
                              }
                            }}
                            className={`w-full py-4 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-between relative overflow-hidden
    ${ocupada ?
                                "bg-gray-800/30 text-gray-500 border border-gray-700 cursor-not-allowed" :
                                pasada ?
                                  "bg-gray-800/30 text-gray-500 border border-gray-700 cursor-not-allowed" :
                                  fueraHorario ?
                                    "bg-gray-800/30 text-gray-500 border border-gray-700 cursor-not-allowed" :
                                    tieneAdvertencia ?
                                      "bg-gray-800/30 text-gray-500 border border-gray-700 cursor-not-allowed" :
                                      seleccionada ?
                                        "bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-white border border-cyan-400/50 shadow-lg" :
                                        "bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 border border-gray-600 hover:border-cyan-400/30"
                              }`}
                          >
                            <span className="flex items-center relative z-10">
                              <span className="mr-2"></span> Pista {p}
                            </span>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full relative z-10 ${ocupada ?
                              "bg-red-900/30 text-red-400 border border-red-800/50" :
                              pasada || fueraHorario || tieneAdvertencia ?
                                "bg-gray-800/50 text-gray-500 border border-gray-700" :
                                "bg-cyan-900/30 text-cyan-400 border border-cyan-700/50"
                              }`}>
                              {typeof ocupada === 'string' ? ocupada :
                                ocupada ? "OCUPADA" :
                                  pasada ? "PASADA" :
                                    fueraHorario ? "FUERA HORARIO" :
                                      tieneAdvertencia ? "CERRADO" : "DISPONIBLE"}
                            </span>
                            {!ocupada && !pasada && !fueraHorario && !tieneAdvertencia && !seleccionada && (
                              <span className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulario de reserva estilo holograma */}
          {formVisible && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center p-4 z-50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  reservar();
                }}
                className="bg-gray-900/90 border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-xl shadow-cyan-500/10 space-y-6 relative overflow-hidden"
                style={{
                  boxShadow: '0 0 30px rgba(34, 211, 238, 0.2)'
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-xl blur-sm opacity-50"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    CONFIRMAR RESERVA
                  </h3>

                  <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700 mb-6">
                    <div className="text-lg font-semibold text-cyan-400">Pista {pistaSeleccionada}</div>
                    <div className="text-gray-400">
                      {diaSeleccionado.format("dddd, D [de] MMMM")} a las {horaSeleccionada}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTipoPartido("normal")}
                      className={`py-3 px-4 rounded-lg font-medium transition-all relative overflow-hidden
                      ${tipoPartido === "normal" ?
                          "bg-gradient-to-r from-emerald-600/80 to-teal-600/80 text-white border border-emerald-400/50" :
                          "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                        }`}
                    >
                      <span className="relative z-10">Normal</span>
                      {tipoPartido === "normal" && (
                        <span className="absolute inset-0 bg-white/5"></span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setTipoPartido("abierto")}
                      className={`py-3 px-4 rounded-lg font-medium transition-all relative overflow-hidden
                      ${tipoPartido === "abierto" ?
                          "bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white border border-purple-400/50" :
                          "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                        }`}
                    >
                      <span className="relative z-10">Abierto</span>
                      {tipoPartido === "abierto" && (
                        <span className="absolute inset-0 bg-white/5"></span>
                      )}
                    </button>
                  </div> <br></br>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setModalidadPartido("individual")}
                      className={`py-3 px-4 rounded-lg font-medium transition-all relative overflow-hidden
                      ${modalidadPartido === "individual" ?
                          tipoPartido === "normal" ?
                            "bg-gradient-to-r from-emerald-600/80 to-teal-600/80 text-white border border-emerald-400/50" :
                            "bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white border border-purple-400/50" :
                          "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                        }`}
                    >
                      <span className="relative z-10">Individual</span>
                      {modalidadPartido === "individual" && (
                        <span className="absolute inset-0 bg-white/5"></span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalidadPartido("dobles")}
                      className={`py-3 px-4 rounded-lg font-medium transition-all relative overflow-hidden
                      ${modalidadPartido === "dobles" ?
                          tipoPartido === "normal" ?
                            "bg-gradient-to-r from-emerald-600/80 to-teal-600/80 text-white border border-emerald-400/50" :
                            "bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white border border-purple-400/50" :
                          "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                        }`}
                    >
                      <span className="relative z-10">Dobles</span>
                      {modalidadPartido === "dobles" && (
                        <span className="absolute inset-0 bg-white/5"></span>
                      )}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-gray-400 font-medium mb-1">Jugador 1 (Tú)</span>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={jugador1}
                          onChange={(e) => setJugador1(e.target.value)}
                          className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700 text-gray-200 focus:border-cyan-500 focus:ring focus:ring-cyan-500/30 px-4 py-3 pr-10"
                          placeholder="Tu nombre de usuario"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                    </label>

                    {modalidadPartido === "individual" && (
                      <label className="block">
                        <span className="text-gray-400 font-medium mb-1">Jugador 2</span>
                        <div className="relative">
                          <input
                            type="text"
                            value={jugador2}
                            onChange={(e) => setJugador2(e.target.value)}
                            className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700 text-gray-200 focus:border-cyan-500 focus:ring focus:ring-cyan-500/30 px-4 py-3 pr-10"
                            placeholder="Nombre de usuario"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                      </label>
                    )}

                    {modalidadPartido === "dobles" && (
                      <>
                        <label className="block">
                          <span className="text-gray-400 font-medium mb-1">Jugador 2</span>
                          <div className="relative">
                            <input
                              type="text"
                              required={tipoPartido === "normal"}
                              value={jugador2}
                              onChange={(e) => setJugador2(e.target.value)}
                              className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700 text-gray-200 focus:border-cyan-500 focus:ring focus:ring-cyan-500/30 px-4 py-3 pr-10"
                              placeholder="Nombre de usuario"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                        </label>

                        <label className="block">
                          <span className="text-gray-400 font-medium mb-1">Jugador 3</span>
                          <div className="relative">
                            <input
                              type="text"
                              required={tipoPartido === "normal"}
                              value={jugador3}
                              onChange={(e) => setJugador3(e.target.value)}
                              className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700 text-gray-200 focus:border-cyan-500 focus:ring focus:ring-cyan-500/30 px-4 py-3 pr-10"
                              placeholder="Nombre de usuario"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                        </label>

                        <label className="block">
                          <span className="text-gray-400 font-medium mb-1">Jugador 4</span>
                          <div className="relative">
                            <input
                              type="text"
                              required={tipoPartido === "normal"}
                              value={jugador4}
                              onChange={(e) => setJugador4(e.target.value)}
                              className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700 text-gray-200 focus:border-cyan-500 focus:ring focus:ring-cyan-500/30 px-4 py-3 pr-10"
                              placeholder="Nombre de usuario"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                        </label> <br></br>
                      </>
                    )}
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="flex justify-between text-gray-300">
                      <span>Duración:</span>
                      <span className="font-medium text-cyan-400">
                        {modalidadPartido === "dobles" ? "1 hora 30 minutos" : "1 hora 30 minutos"}
                      </span>
                    </div>
                  </div>

                  {mensaje && (
                    <div className={`p-3 rounded-lg text-center ${mensaje.includes("éxito") ?
                      "bg-green-900/30 text-green-400 border border-green-800" :
                      "bg-red-900/30 text-red-400 border border-red-800"
                      }`}>
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
                      className="flex-1 py-3 px-4 rounded-lg bg-gray-800/50 text-gray-300 font-medium hover:bg-gray-700/50 border border-gray-700 transition-all"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all relative overflow-hidden
                      ${tipoPartido === "abierto" ?
                          "bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-700/80 hover:to-pink-700/80 text-white border border-purple-400/50" :
                          "bg-gradient-to-r from-cyan-600/80 to-blue-600/80 hover:from-cyan-700/80 hover:to-blue-700/80 text-white border border-cyan-400/50"
                        } ${loading ? "opacity-70" : ""}`}
                    >
                      <span className="relative z-10">
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Procesando...
                          </span>
                        ) : tipoPartido === "abierto" ? "ABRIR PARTIDO" : "CONFIRMAR RESERVA"}
                      </span>
                      {!loading && (
                        <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}