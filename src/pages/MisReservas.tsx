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
      // Obtener reservas de tenis
      const { data: tenisData, error: tenisError } = await supabase
        .from('reservas')
        .select('*')
        .or(`jugador1.eq.${user.username},jugador2.eq.${user.username},jugador3.eq.${user.username},jugador4.eq.${user.username}`)
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true });

      if (tenisError) throw tenisError;

      // Obtener reservas de pádel
      const { data: padelData, error: padelError } = await supabase
        .from('reservas_padel')
        .select('*')
        .or(`jugador1.eq.${user.username},jugador2.eq.${user.username},jugador3.eq.${user.username},jugador4.eq.${user.username}`)
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true });

      if (padelError) throw padelError;

      // Combinar y marcar el tipo de reserva
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Encabezado futurista */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient-x">
              MIS RESERVAS
            </h1>
            {user && (
              <p className="text-xl text-gray-300">
                Bienvenido, <span className="font-medium text-cyan-400">{user.nombre || user.username || user.email.split('@')[0]}</span>
              </p>
            )}
          </div>

          {/* Mensajes */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-800 text-red-400 rounded-lg backdrop-blur-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-800 text-green-400 rounded-lg backdrop-blur-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {success}
              </div>
            </div>
          )}

          {/* Contenido */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : reservas.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 mb-6">
                <svg className="w-16 h-16 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-xl text-gray-400 mb-6">No tienes reservas actualmente</p>
              <a
                href="/reservar"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Haz una reserva ahora
              </a>
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-xl shadow-xl backdrop-blur-sm border border-gray-700 overflow-hidden">
              {/* Lista de reservas futurista */}
              <div className="divide-y divide-gray-700">
                {reservas.map((reserva) => (
                  <div
                    key={`${reserva.tipo || 'tenis'}-${reserva.id}`}
                    className="p-6 hover:bg-gray-700/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      {/* Información de la reserva */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${reserva.tipo === 'padel'
                              ? 'bg-purple-900/50 text-purple-400'
                              : 'bg-blue-900/50 text-blue-400'
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

                        <h3 className="text-2xl font-bold text-white mb-1">
                          {formatearFecha(reserva.fecha)}
                          <span className="text-gray-400 mx-2">|</span>
                          {formatearHora(reserva.hora)}
                        </h3>

                        <div className="flex items-center text-gray-400 mb-4">
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{reserva.duracion} minutos</span>
                        </div>

                        {/* Jugadores con avatares futuristas */}
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm mr-2">
                              {reserva.jugador1.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-gray-200">{reserva.jugador1}</span>
                          </div>

                          {reserva.jugador2 && (
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm mr-2">
                                {reserva.jugador2.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-gray-200">{reserva.jugador2}</span>
                            </div>
                          )}

                          {reserva.jugador3 && (
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm mr-2">
                                {reserva.jugador3.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-gray-200">{reserva.jugador3}</span>
                            </div>
                          )}

                          {reserva.jugador4 && (
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm mr-2">
                                {reserva.jugador4.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-gray-200">{reserva.jugador4}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Acciones */}
                      {reserva.jugador1 === user?.username && (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => handleCancelClick(reserva.id, reserva.tipo)}
                            disabled={cancelandoId === reserva.id}
                            className={`px-5 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${cancelandoId === reserva.id
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
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pie de página */}
              <div className="bg-gray-800/50 px-6 py-4 text-center border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  Mostrando <span className="text-cyan-400">{reservas.length}</span> reserva{reservas.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
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