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
  duracion: number;
  hora: string;
  fecha: string;
  pista: number;
  creado_en: string;
  tipo?: string;
  estado_pago?: string;
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
        .or(`jugador1.eq.${user.username},jugador2.eq.${user.username}`)
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true });

      if (tenisError) throw tenisError;

      // Obtener reservas de pádel
      const { data: padelData, error: padelError } = await supabase
        .from('reservas_padel')
        .select('*')
        .or(`jugador1.eq.${user.username},jugador2.eq.${user.username}`)
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
      pendiente: 'bg-yellow-100 text-yellow-800',
      pagado: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[estado as keyof typeof styles]}`}>
        {estado === 'pendiente' ? 'Pago pendiente' : 'Pagado'}
      </span>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Encabezado */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Mis Reservas
            </h1>
            {user && (
              <p className="text-xl text-blue-600">
                Hola, {user.nombre || user.username || user.email.split('@')[0]}
              </p>
            )}
          </div>

          {/* Mensajes */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
              {success}
            </div>
          )}

          {/* Contenido */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : reservas.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No tienes reservas actualmente.</p>
              <a
                href="/reservar"
                className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Haz una reserva ahora
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Lista de reservas */}
              <div className="divide-y divide-gray-200">
                {reservas.map((reserva) => (
                  <div key={`${reserva.tipo || 'tenis'}-${reserva.id}`} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Información de la reserva */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            Pista {reserva.pista}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {getTipoPista(reserva.pista, reserva.tipo)}
                          </span>
                          {getEstadoPagoBadge(reserva.estado_pago)}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800">
                          {formatearFecha(reserva.fecha)} a las {formatearHora(reserva.hora)}
                        </h3>

                        <p className="text-gray-600 mt-1">
                          Duración: {reserva.duracion} minutos
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                            {reserva.jugador1}
                          </span>
                          {reserva.jugador2 && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                              {reserva.jugador2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleCancelClick(reserva.id, reserva.tipo)}
                          disabled={cancelandoId === reserva.id}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {cancelandoId === reserva.id ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Cancelando...
                            </>
                          ) : (
                            'Cancelar Reserva'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pie de página */}
              <div className="bg-gray-50 px-6 py-4 text-center">
                <p className="text-gray-500 text-sm">
                  Mostrando {reservas.length} reserva{reservas.length !== 1 ? 's' : ''}
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
      />
    </>
  );
}