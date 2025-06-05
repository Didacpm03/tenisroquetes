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
  // Agrega otros campos según tu tabla userstenis
}

export default function SuperAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingReservas, setLoadingReservas] = useState(false);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  const [deletingReservaId, setDeletingReservaId] = useState<number | null>(null);
  const [deletingUsuarioId, setDeletingUsuarioId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'reservas' | 'usuarios'>('reservas');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Credenciales de superadmin (en producción, usaría variables de entorno)
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
    
    try {
      // Obtener todas las reservas
      const { data: reservasData, error: reservasError } = await supabase
        .from('reservas')
        .select('*')
        .order('fecha', { ascending: false })
        .order('hora', { ascending: false });

      if (reservasError) throw reservasError;
      setReservas(reservasData || []);

      // Obtener todos los usuarios
      const { data: usuariosData, error: usuariosError } = await supabase
        .from('userstenis')
        .select('*');

      if (usuariosError) throw usuariosError;
      setUsuarios(usuariosData || []);
      
    } catch (err) {
      setError('Error al cargar datos: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setLoadingReservas(false);
      setLoadingUsuarios(false);
    }
  }

  async function eliminarReserva(id: number) {
    if (!window.confirm('¿Estás seguro de eliminar esta reserva?')) return;
    
    setDeletingReservaId(id);
    setError('');
    setSuccess('');
    
    try {
      const { error } = await supabase
        .from('reservas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setReservas(prev => prev.filter(r => r.id !== id));
      setSuccess('Reserva eliminada correctamente');
    } catch (err) {
      setError('Error al eliminar reserva: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setDeletingReservaId(null);
    }
  }

  async function eliminarUsuario(id: number) {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    setDeletingUsuarioId(id);
    setError('');
    setSuccess('');
    
    try {
      const { error } = await supabase
        .from('userstenis')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setUsuarios(prev => prev.filter(u => u.id !== id));
      setSuccess('Usuario eliminado correctamente');
    } catch (err) {
      setError('Error al eliminar usuario: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setDeletingUsuarioId(null);
    }
  }

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
        </div>

        {/* Contenido de Reservas */}
        {activeTab === 'reservas' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Todas las Reservas</h2>
              <p className="text-gray-600 mt-1">Total: {reservas.length} reservas</p>
            </div>
            
            {loadingReservas ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : reservas.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">No hay reservas registradas.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pista</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jugadores</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reservas.map((reserva) => (
                      <tr key={reserva.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatearFecha(reserva.fecha)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatearHora(reserva.hora)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Pista {reserva.pista}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex gap-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              {reserva.jugador1}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                              {reserva.jugador2}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reserva.duracion} min</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => eliminarReserva(reserva.id)}
                            disabled={deletingReservaId === reserva.id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            {deletingReservaId === reserva.id ? 'Eliminando...' : 'Eliminar'}
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Todos los Usuarios</h2>
              <p className="text-gray-600 mt-1">Total: {usuarios.length} usuarios</p>
            </div>
            
            {loadingUsuarios ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : usuarios.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">No hay usuarios registrados.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                      
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuario.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{usuario.nombre || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{usuario.username || '-'}</td>
                       
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => eliminarUsuario(usuario.id)}
                            disabled={deletingUsuarioId === usuario.id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            {deletingUsuarioId === usuario.id ? 'Eliminando...' : 'Eliminar'}
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
      </div>
    </div>
  );
}