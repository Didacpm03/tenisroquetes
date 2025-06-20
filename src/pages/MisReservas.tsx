// pages/MisReservas.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';
import ConfirmModal from '../components/ConfirmModal';

interface Reserva {
  id: number;
  jugador1: string;
  jugador2: string;
  jugador3?: string;
  jugador4?: string;
  duracion: number;
  hora: string;
  fecha: string;
  pista: number;
  creado_en: string;
  tipo?: string;
  estado_pago?: string;
  tipo_partido?: "normal" | "abierto";
  modalidad?: "individual" | "dobles";
  estado?: "abierto" | "completo";
  victoria?: string | null;
  derrota?: string | null;
}

export default function MisReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<any>(null);
  const [cancelandoId, setCancelandoId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [reservaToCancel, setReservaToCancel] = useState<{ id: number, tipo: string } | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Debes iniciar sesión para ver tus reservas.');
      window.location.href = '/login';
      return;
    }

    const user = JSON.parse(userStr);
    setUser(user);
    fetchReservas(user);
  }, []);

  async function fetchReservas(user: any) {
    setLoading(true);
    setError('');
    try {
      const { data: tenisData, error: tenisError } = await supabase
        .from('reservas')
        .select('*')
        .or(`jugador1.eq.${user.username},jugador2.eq.${user.username},jugador3.eq.${user.username},jugador4.eq.${user.username}`)
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true });

      if (tenisError) throw tenisError;

      const { data: padelData, error: padelError } = await supabase
        .from('reservas_padel')
        .select('*')
        .or(`jugador1.eq.${user.username},jugador2.eq.${user.username},jugador3.eq.${user.username},jugador4.eq.${user.username}`)
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true });

      if (padelError) throw padelError;

      const reservasTenis = (tenisData || []).map(r => ({ ...r, tipo: 'tenis' }));
      const reservasPadel = (padelData || []).map(r => ({ ...r, tipo: 'padel' }));

      setReservas([...reservasTenis, ...reservasPadel].sort((a, b) => {
        const fechaA = dayjs(`${a.fecha} ${a.hora}`);
        const fechaB = dayjs(`${b.fecha} ${b.hora}`);
        return fechaA.diff(fechaB);
      }));
    } catch (err) {
      setError('Error al cargar reservas: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  }

  async function puntuarPartido(id: number, tipo: string, ganador: string, perdedor: string) {
    if (!user) return;

    try {
      const tableName = tipo === 'padel' ? 'reservas_padel' : 'reservas';
      const { error } = await supabase
        .from(tableName)
        .update({ victoria: ganador, derrota: perdedor })
        .eq('id', id);

      if (error) throw error;

      setReservas(prev => prev.map(r =>
        r.id === id ? { ...r, victoria: ganador, derrota: perdedor } : r
      ));
      setSuccess('Partido puntuado correctamente');
    } catch (err) {
      setError('Error al puntuar partido: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    }
  }

  async function cancelarReserva(id: number, tipo: string = 'tenis') {
    setCancelandoId(id);
    setError('');
    setSuccess('');

    try {
      const tableName = tipo === 'padel' ? 'reservas_padel' : 'reservas';
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      setReservas(prev => prev.filter(r => r.id !== id));
      setSuccess('Reserva cancelada correctamente');
    } catch (err) {
      setError('Error al cancelar reserva: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setCancelandoId(null);
    }
  }

  const handleCancelClick = (id: number, tipo: string = 'tenis') => {
    setReservaToCancel({ id, tipo });
    setShowConfirm(true);
  };

  const handleConfirmCancel = async () => {
    if (reservaToCancel) {
      await cancelarReserva(reservaToCancel.id, reservaToCancel.tipo);
      setShowConfirm(false);
      setReservaToCancel(null);
    }
  };

  function formatearFecha(fecha: string) {
    return dayjs(fecha).format('DD/MM/YYYY');
  }

  function formatearHora(hora: string) {
    return hora.substring(0, 5);
  }

  function getTipoPista(pista: number, tipo?: string) {
    if (tipo === 'padel') return 'Pádel';
    return pista <= 2 ? 'Tierra batida' : 'Pista rápida';
  }

  function getEstadoPagoBadge(estado: string = 'pendiente') {
    const styles = {
      pendiente: 'bg-yellow-900/30 text-yellow-400 border border-yellow-800',
      pagado: 'bg-green-900/30 text-green-400 border border-green-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[estado as keyof typeof styles]}`}>
        {estado === 'pendiente' ? 'Pago pendiente' : 'Pagado'}
      </span>
    );
  }

  // Separar reservas pasadas y futuras
  const now = dayjs();
  const upcomingReservas = reservas.filter(r => dayjs(`${r.fecha} ${r.hora}`).isAfter(now));
  const pastReservas = reservas.filter(r => dayjs(`${r.fecha} ${r.hora}`).isBefore(now));

  // Agrupar por mes
  const groupByMonth = (reservas: Reserva[]) => {
    return reservas.reduce((acc: Record<string, Reserva[]>, reserva) => {
      const monthYear = dayjs(reserva.fecha).format('MMMM YYYY');
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(reserva);
      return acc;
    }, {});
  };

  const pastByMonth = groupByMonth(pastReservas);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Encabezado mejorado */}
          <div className="mb-12 text-center relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl blur-2xl opacity-30 animate-pulse"></div>
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient-x relative">
              MIS RESERVAS
            </h1>
            {user && (
              <p className="text-xl text-gray-300 relative">
                Bienvenido, <span className="font-medium text-cyan-400">{user.nombre || user.username || user.email.split('@')[0]}</span>
              </p>
            )}
          </div>

          {/* Mensajes con animación */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-800 text-red-400 rounded-lg backdrop-blur-sm animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-800 text-green-400 rounded-lg backdrop-blur-sm animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {success}
              </div>
            </div>
          )}

          {/* Contenido principal */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : reservas.length === 0 ? (
            <div className="text-center py-20 relative">
              <div className="inline-block p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 mb-6 transform transition-all hover:scale-105">
                <svg className="w-16 h-16 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-xl text-gray-400 mb-6">No tienes reservas actualmente</p>
              <a
                href="/reservar"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/30"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Haz una reserva ahora
              </a>
            </div>
          ) : (
            <>
              {/* PRÓXIMOS PARTIDOS - Tarjetas mejoradas */}
              {upcomingReservas.length > 0 && (
                <div className="mb-16 relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-xl blur-xl opacity-20"></div>
                  <div className="relative">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        PRÓXIMOS PARTIDOS
                      </span>
                      <span className="ml-3 text-sm bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded-full animate-pulse">
                        {upcomingReservas.length}
                      </span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {upcomingReservas.map((reserva) => (
                        <div
                          key={`${reserva.tipo || 'tenis'}-${reserva.id}`}
                          className={`bg-gray-800/50 rounded-xl shadow-xl backdrop-blur-sm border border-gray-700 overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/10 relative group
                          ${reserva.tipo === 'padel' ? 'hover:border-purple-400/50' : 'hover:border-blue-400/50'}`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="p-5 relative z-10">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${reserva.tipo === 'padel' ?
                                  'bg-purple-900/50 text-purple-400 border border-purple-700/50' :
                                  'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                                }`}>
                                {reserva.tipo === 'padel' ? 'PÁDEL' : 'TENIS'} - Pista {reserva.pista}
                              </span>
                              <span className="text-sm text-gray-400">
                                {getTipoPista(reserva.pista, reserva.tipo)}
                              </span>
                              <div className="ml-auto">
                                {getEstadoPagoBadge(reserva.estado_pago)}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-white">
                                  {formatearFecha(reserva.fecha)}
                                </h3>
                                <div className="flex items-center text-gray-400 mt-1">
                                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{formatearHora(reserva.hora)} - {reserva.duracion} min</span>
                                </div>
                              </div>

                              {reserva.jugador1 === user?.username && (
                                <button
                                  onClick={() => handleCancelClick(reserva.id, reserva.tipo)}
                                  disabled={cancelandoId === reserva.id}
                                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${cancelandoId === reserva.id
                                      ? 'bg-gray-700 text-gray-400'
                                      : 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-lg'
                                    }`}
                                >
                                  {cancelandoId === reserva.id ? (
                                    <>
                                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                      </svg>
                                      Cancelando...
                                    </>
                                  ) : (
                                    <>
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                      Cancelar
                                    </>
                                  )}
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {[reserva.jugador1, reserva.jugador2, reserva.jugador3, reserva.jugador4]
                                .filter(Boolean)
                                .map((jugador, i) => (
                                  <div key={i} className="flex items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 ${i === 0 ? 'bg-gradient-to-br from-teal-500 to-cyan-600' :
                                        i === 1 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                                          i === 2 ? 'bg-gradient-to-br from-yellow-500 to-amber-600' :
                                            'bg-gradient-to-br from-pink-500 to-rose-600'
                                      }`}>
                                      {jugador?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                      <p className="text-gray-200 font-medium">{jugador}</p>
                                      {jugador === user?.username && (
                                        <p className="text-xs text-cyan-400">(Tú)</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PARTIDOS JUGADOS - Timeline mejorado */}
              {pastReservas.length > 0 && (
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-600/10 rounded-xl blur-xl opacity-20"></div>
                  <div className="relative">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        HISTORIAL DE PARTIDOS
                      </span>
                      <span className="ml-3 text-sm bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded-full">
                        {pastReservas.length}
                      </span>
                    </h2>

                    {Object.entries(pastByMonth).map(([monthYear, monthReservas]) => (
                      <div key={monthYear} className="mb-12">
                        <div className="flex items-center mb-6">
                          <div className="w-3 h-3 rounded-full bg-cyan-500 mr-3 animate-pulse"></div>
                          <h3 className="text-xl font-semibold text-gray-300">{monthYear}</h3>
                        </div>

                        <div className="relative">
                          {/* Línea de timeline */}
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>

                          <div className="space-y-6 pl-10">
                            {monthReservas.map((reserva) => (
                              <div
                                key={`past-${reserva.tipo || 'tenis'}-${reserva.id}`}
                                className="relative group"
                              >
                                {/* Punto del timeline */}
                                <div className="absolute -left-10 top-5 w-3 h-3 rounded-full bg-cyan-500 border-2 border-cyan-300 transform group-hover:scale-150 transition-transform"></div>

                                <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-3">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${reserva.tipo === 'padel' ?
                                          'bg-purple-900/50 text-purple-400 border border-purple-700/50' :
                                          'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                                        }`}>
                                        {reserva.tipo === 'padel' ? 'PÁDEL' : 'TENIS'} - Pista {reserva.pista}
                                      </span>
                                      <span className="text-xs text-gray-400">
                                        {formatearHora(reserva.hora)} - {reserva.duracion} min
                                      </span>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                      {formatearFecha(reserva.fecha)}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3 mb-4">
                                    {[reserva.jugador1, reserva.jugador2, reserva.jugador3, reserva.jugador4]
                                      .filter(Boolean)
                                      .map((jugador, i) => (
                                        <div key={i} className="flex items-center">
                                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2 ${i === 0 ? 'bg-gradient-to-br from-teal-500 to-cyan-600' :
                                              i === 1 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                                                i === 2 ? 'bg-gradient-to-br from-yellow-500 to-amber-600' :
                                                  'bg-gradient-to-br from-pink-500 to-rose-600'
                                            }`}>
                                            {jugador?.charAt(0).toUpperCase()}
                                          </div>
                                          <span className="text-sm text-gray-200 truncate">{jugador}</span>
                                        </div>
                                      ))}
                                  </div>

                                  {reserva.victoria && reserva.derrota ? (
                                    <div className="mt-3 pt-3 border-t border-gray-700">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-green-400 flex items-center">
                                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                          </svg>
                                          {reserva.victoria}
                                        </span>
                                        <span className="text-sm text-red-400 flex items-center">
                                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                          {reserva.derrota}
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="mt-3 space-y-2">
                                      <select
                                        className="w-full bg-gray-700 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        onChange={(e) => {
                                          const [ganador, perdedor] = e.target.value.split('|');
                                          puntuarPartido(reserva.id, reserva.tipo || 'tenis', ganador, perdedor);
                                        }}
                                      >
                                        <option value="">Seleccionar ganador</option>
                                        {reserva.modalidad === 'dobles' ? (
                                          <>
                                            <option
                                              value={`${reserva.jugador1},${reserva.jugador2}|${reserva.jugador3},${reserva.jugador4}`}
                                            >
                                              {reserva.jugador1} y {reserva.jugador2}
                                            </option>
                                            <option
                                              value={`${reserva.jugador3},${reserva.jugador4}|${reserva.jugador1},${reserva.jugador2}`}
                                            >
                                              {reserva.jugador3} y {reserva.jugador4}
                                            </option>
                                          </>
                                        ) : (
                                          [reserva.jugador1, reserva.jugador2, reserva.jugador3, reserva.jugador4]
                                            .filter(j => j)
                                            .map(jugador => (
                                              <option
                                                key={jugador}
                                                value={`${jugador}|${[reserva.jugador1, reserva.jugador2, reserva.jugador3, reserva.jugador4]
                                                    .filter(j => j && j !== jugador).join(',')
                                                  }`}
                                              >
                                                {jugador}
                                              </option>
                                            ))
                                        )}
                                      </select>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Cancelar Reserva"
        message="¿Estás seguro de que quieres cancelar esta reserva?"
        onConfirm={handleConfirmCancel}
        onCancel={() => setShowConfirm(false)}
        confirmText="Sí, cancelar"
        cancelText="No, mantener"
        confirmColor="red"
      />
    </>
  );
}