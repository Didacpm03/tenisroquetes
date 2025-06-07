// pages/SuperAdmin.tsx
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import dayjs from 'dayjs';

interface Reserva {
  id: number;
  jugador1: string;
  jugador2: string;
  duracion: number;
  hora: string;
  fecha: string;
  pista: number;
  creado_en: string;
}

interface Usuario {
  id: number;
  email: string;
  nombre: string;
  username: string;
}

interface Advertencia {
  id?: number;
  fecha: string;
  motivo: string;
  imagen?: string;
}

function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}: {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SuperAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [advertencias, setAdvertencias] = useState<Advertencia[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingReservas, setLoadingReservas] = useState(false);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  const [loadingAdvertencias, setLoadingAdvertencias] = useState(false);
  const [deletingReservaId, setDeletingReservaId] = useState<number | null>(null);
  const [deletingUsuarioId, setDeletingUsuarioId] = useState<number | null>(null);
  const [deletingAdvertenciaId, setDeletingAdvertenciaId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'reservas' | 'usuarios' | 'advertencias'>('reservas');
  
  // Estado para nueva advertencia
  const [nuevaAdvertencia, setNuevaAdvertencia] = useState<Advertencia>({
    fecha: dayjs().format('YYYY-MM-DD'),
    motivo: 'lluvia'
  });

  const [showConfirmReserva, setShowConfirmReserva] = useState(false);
  const [showConfirmUsuario, setShowConfirmUsuario] = useState(false);
  const [showConfirmAdvertencia, setShowConfirmAdvertencia] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: number, type: 'reserva' | 'usuario' | 'advertencia' } | null>(null);

  const handleDeleteClick = (id: number, type: 'reserva' | 'usuario' | 'advertencia') => {
    setItemToDelete({ id, type });
    if (type === 'reserva') setShowConfirmReserva(true);
    else if (type === 'usuario') setShowConfirmUsuario(true);
    else setShowConfirmAdvertencia(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      if (itemToDelete.type === 'reserva') {
        setDeletingReservaId(itemToDelete.id);
        const { error } = await supabase
          .from('reservas')
          .delete()
          .eq('id', itemToDelete.id);

        if (error) throw error;

        setReservas(prev => prev.filter(r => r.id !== itemToDelete.id));
        setSuccess('Reserva eliminada correctamente');
      } else if (itemToDelete.type === 'usuario') {
        setDeletingUsuarioId(itemToDelete.id);
        const { error } = await supabase
          .from('userstenis')
          .delete()
          .eq('id', itemToDelete.id);

        if (error) throw error;

        setUsuarios(prev => prev.filter(u => u.id !== itemToDelete.id));
        setSuccess('Usuario eliminado correctamente');
      } else {
        setDeletingAdvertenciaId(itemToDelete.id);
        const { error } = await supabase
          .from('advertencias')
          .delete()
          .eq('id', itemToDelete.id);

        if (error) throw error;

        setAdvertencias(prev => prev.filter(a => a.id !== itemToDelete.id));
        setSuccess('Advertencia eliminada correctamente');
      }
    } catch (err) {
      setError('Error al eliminar: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setShowConfirmReserva(false);
      setShowConfirmUsuario(false);
      setShowConfirmAdvertencia(false);
      setItemToDelete(null);
      setDeletingReservaId(null);
      setDeletingUsuarioId(null);
      setDeletingAdvertenciaId(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'superadmin' && password === 'admin123') {
      setIsLoggedIn(true);
      fetchData();
    } else {
      setError('Credenciales incorrectas');
    }
  };

  async function fetchData() {
    setLoadingReservas(true);
    setLoadingUsuarios(true);
    setLoadingAdvertencias(true);
    setError('');

    try {
      // Obtener reservas
      const { data: reservasData, error: reservasError } = await supabase
        .from('reservas')
        .select('*')
        .order('fecha', { ascending: false })
        .order('hora', { ascending: false });

      if (reservasError) throw reservasError;

      // Obtener usuarios
      const { data: usuariosData, error: usuariosError } = await supabase
        .from('userstenis')
        .select('*');

      if (usuariosError) throw usuariosError;

      // Obtener advertencias
      const { data: advertenciasData, error: advertenciasError } = await supabase
        .from('advertencias')
        .select('*')
        .order('fecha', { ascending: false });

      if (advertenciasError) throw advertenciasError;

      setReservas(reservasData || []);
      setUsuarios(usuariosData || []);
      setAdvertencias(advertenciasData || []);
    } catch (err) {
      setError('Error al cargar datos: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setLoadingReservas(false);
      setLoadingUsuarios(false);
      setLoadingAdvertencias(false);
    }
  }

  const handleAddAdvertencia = async () => {
    try {
      const { data, error } = await supabase
        .from('advertencias')
        .insert([nuevaAdvertencia])
        .select();

      if (error) throw error;

      setAdvertencias(prev => [...prev, ...data]);
      setSuccess('Advertencia añadida correctamente');
      setNuevaAdvertencia({
        fecha: dayjs().format('YYYY-MM-DD'),
        motivo: 'lluvia'
      });
    } catch (err) {
      setError('Error al añadir advertencia: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    }
  };

  function formatearFecha(fecha: string) {
    return dayjs(fecha).format('DD/MM/YYYY');
  }

  function formatearHora(hora: string) {
    return hora.substring(0, 5);
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-700 p-6 text-center">
            <h2 className="text-3xl font-bold text-white">Super Admin Login</h2>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Barra de navegación */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Panel de Super Admin</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
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

        {/* Pestañas */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'reservas' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('reservas')}
          >
            Reservas
          </button>
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'usuarios' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('usuarios')}
          >
            Usuarios
          </button>
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'advertencias' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('advertencias')}
          >
            Advertencias
          </button>
        </div>

        {/* Contenido de Reservas */}
        {activeTab === 'reservas' && (
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-3xl font-semibold text-white tracking-wide">Todas las Reservas</h2>
              <p className="text-gray-300 mt-1">Total: <span className="font-medium">{reservas.length}</span> reservas</p>
            </div>

            {loadingReservas ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white border-opacity-60"></div>
              </div>
            ) : reservas.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400 italic">No hay reservas registradas aún.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-gray-100">
                  <thead>
                    <tr className="bg-gray-800 uppercase tracking-wide text-sm text-white">
                      <th className="px-8 py-4 font-bold text-left">ID</th>
                      <th className="px-8 py-4 font-bold text-left">Fecha</th>
                      <th className="px-8 py-4 font-bold text-left">Hora</th>
                      <th className="px-8 py-4 font-bold text-left">Pista</th>
                      <th className="px-8 py-4 font-bold text-left">Jugadores</th>
                      <th className="px-8 py-4 font-bold text-left">Duración</th>
                      <th className="px-8 py-4 font-bold text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas.map((reserva) => (
                      <tr
                        key={reserva.id}
                        className="hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                      >
                        <td className="px-8 py-5 whitespace-nowrap font-mono tracking-wide">{reserva.id}</td>
                        <td className="px-8 py-5 whitespace-nowrap">{formatearFecha(reserva.fecha)}</td>
                        <td className="px-8 py-5 whitespace-nowrap">{formatearHora(reserva.hora)}</td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <span className="px-3 py-1 bg-gray-700 bg-opacity-40 text-gray-300 rounded-full text-xs font-semibold">
                            Pista {reserva.pista}
                          </span>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <div className="flex gap-3">
                            <span className="px-2 py-1 bg-gray-700 bg-opacity-40 text-gray-300 rounded text-xs font-medium">
                              {reserva.jugador1}
                            </span>
                            <span className="px-2 py-1 bg-gray-700 bg-opacity-40 text-gray-300 rounded text-xs font-medium">
                              {reserva.jugador2}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">{reserva.duracion} min</td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteClick(reserva.id, 'reserva')}
                            disabled={deletingReservaId === reserva.id}
                            className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingReservaId === reserva.id ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Eliminando...
                              </>
                            ) : (
                              'Eliminar'
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Contenido de Usuarios */}
        {activeTab === 'usuarios' && (
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-3xl font-semibold text-white tracking-wide">Usuarios Registrados</h2>
              <p className="text-gray-300 mt-1">Total: <span className="font-medium">{usuarios.length}</span> usuarios</p>
            </div>

            {loadingUsuarios ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white border-opacity-60"></div>
              </div>
            ) : usuarios.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400 italic">No hay usuarios registrados aún.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-gray-100">
                  <thead>
                    <tr className="bg-gray-800 uppercase tracking-wide text-sm text-gray-400">
                      <th className="px-8 py-4 font-semibold text-left">ID</th>
                      <th className="px-8 py-4 font-semibold text-left">Usuario</th>
                      <th className="px-8 py-4 font-semibold text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr
                        key={usuario.id}
                        className="hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                      >
                        <td className="px-8 py-5 whitespace-nowrap font-mono tracking-wide">{usuario.id}</td>
                        <td className="px-8 py-5 whitespace-nowrap font-medium">{usuario.username || '-'}</td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteClick(usuario.id, 'usuario')}
                            disabled={deletingUsuarioId === usuario.id}
                            className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingUsuarioId === usuario.id ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Eliminando...
                              </>
                            ) : (
                              'Eliminar'
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Contenido de Advertencias */}
        {activeTab === 'advertencias' && (
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-3xl font-semibold text-white tracking-wide">Advertencias Meteorológicas</h2>
              <p className="text-gray-300 mt-1">Total: <span className="font-medium">{advertencias.length}</span> advertencias</p>
            </div>

            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Añadir Nueva Advertencia</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={nuevaAdvertencia.fecha}
                    onChange={(e) => setNuevaAdvertencia({...nuevaAdvertencia, fecha: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Motivo</label>
                  <select
                    value={nuevaAdvertencia.motivo}
                    onChange={(e) => setNuevaAdvertencia({...nuevaAdvertencia, motivo: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="lluvia">Lluvia</option>
                    <option value="fiesta">Vacaciones/fiesta</option>
                    <option value="viento">Viento fuerte</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleAddAdvertencia}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full"
                  >
                    Añadir Advertencia
                  </button>
                </div>
              </div>
            </div>

            {loadingAdvertencias ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white border-opacity-60"></div>
              </div>
            ) : advertencias.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400 italic">No hay advertencias registradas aún.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-gray-100">
                  <thead>
                    <tr className="bg-gray-800 uppercase tracking-wide text-sm text-white">
                      <th className="px-8 py-4 font-bold text-left">ID</th>
                      <th className="px-8 py-4 font-bold text-left">Fecha</th>
                      <th className="px-8 py-4 font-bold text-left">Motivo</th>
                      <th className="px-8 py-4 font-bold text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advertencias.map((advertencia) => (
                      <tr
                        key={advertencia.id}
                        className="hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                      >
                        <td className="px-8 py-5 whitespace-nowrap font-mono tracking-wide">{advertencia.id}</td>
                        <td className="px-8 py-5 whitespace-nowrap">{formatearFecha(advertencia.fecha)}</td>
                        <td className="px-8 py-5 whitespace-nowrap capitalize">{advertencia.motivo}</td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteClick(advertencia.id!, 'advertencia')}
                            disabled={deletingAdvertenciaId === advertencia.id}
                            className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingAdvertenciaId === advertencia.id ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Eliminando...
                              </>
                            ) : (
                              'Eliminar'
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Modales de confirmación */}
        <ConfirmModal
          isOpen={showConfirmReserva}
          title="Eliminar Reserva"
          message="¿Estás seguro de que quieres eliminar esta reserva?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirmReserva(false)}
        />

        <ConfirmModal
          isOpen={showConfirmUsuario}
          title="Eliminar Usuario"
          message="¿Estás seguro de que quieres eliminar este usuario?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirmUsuario(false)}
        />

        <ConfirmModal
          isOpen={showConfirmAdvertencia}
          title="Eliminar Advertencia"
          message="¿Estás seguro de que quieres eliminar esta advertencia?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirmAdvertencia(false)}
        />
      </div>
    </div>
  );
}