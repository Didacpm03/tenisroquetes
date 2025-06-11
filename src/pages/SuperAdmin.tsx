import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import dayjs from 'dayjs';
import Navbar from "../components/Navbar";

interface Reserva {
  id: number;
  jugador1: string;
  jugador2: string;
  duracion: number;
  hora: string;
  fecha: string;
  pista: number;
  creado_en: string;
  estado_pago?: string;
  tipo?: string;
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

function MatrixBackground() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops: number[] = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      if (!ctx) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}

function TerminalInput({
  value,
  onChange,
  placeholder,
  type = 'text'
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-black text-green-400 font-mono px-4 py-3 border-b-2 border-green-500 focus:outline-none focus:border-green-300 transition-all duration-300 caret-green-500 tracking-wider"
        placeholder={placeholder}
      />
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 group-hover:w-full transition-all duration-500"></div>
    </div>
  );
}

function TerminalButton({
  onClick,
  children,
  disabled = false
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3 px-6 bg-green-900 bg-opacity-50 border border-green-500 text-green-400 font-mono tracking-wider hover:bg-green-800 hover:text-white hover:shadow-[0_0_15px_#00ff0055] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-900"
    >
      {children}
    </button>
  );
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
      <div className="bg-gray-900 border border-green-500 rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-6 border-b border-green-500">
          <h3 className="text-xl font-bold text-green-400 font-mono mb-2">{title}</h3>
          <p className="text-gray-300 font-mono">{message}</p>
        </div>
        <div className="bg-gray-800 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition font-mono"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-mono"
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
  
  const [nuevaAdvertencia, setNuevaAdvertencia] = useState<Advertencia>({
    fecha: dayjs().format('YYYY-MM-DD'),
    motivo: 'Fenómenos meteorológicos'
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
    setSuccess('');

    try {
      const { data, error } = await supabase
        .from('superadmin')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        throw new Error('Credenciales inválidas');
      }

      if (data.password_hash !== password) {
        throw new Error('Credenciales inválidas');
      }

      await supabase
        .from('superadmin')
        .update({ last_login: new Date().toISOString() })
        .eq('username', username);

      setIsLoggedIn(true);
      fetchData();
      setSuccess('Acceso concedido');
    } catch (err) {
      setError('Error de autenticación: Credenciales incorrectas');
      console.error('Login error:', err);
    }
  };

  async function fetchData() {
    setLoadingReservas(true);
    setLoadingUsuarios(true);
    setLoadingAdvertencias(true);
    setError('');

    try {
      const { data: reservasData, error: reservasError } = await supabase
        .from('reservas')
        .select('*')
        .order('fecha', { ascending: false })
        .order('hora', { ascending: false });

      if (reservasError) throw reservasError;

      const { data: usuariosData, error: usuariosError } = await supabase
        .from('userstenis')
        .select('*');

      if (usuariosError) throw usuariosError;

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
        motivo: 'Fenómenos meteorológicos'
      });
    } catch (err) {
      setError('Error al añadir advertencia: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    }
  };

  const handleUpdatePaymentStatus = async (reserva: Reserva, newStatus: string) => {
    try {
      const tableName = reserva.tipo === 'padel' ? 'reservas_padel' : 'reservas';
      const { error } = await supabase
        .from(tableName)
        .update({ estado_pago: newStatus })
        .eq('id', reserva.id);

      if (error) throw error;

      setReservas(prev => prev.map(r => 
        r.id === reserva.id ? { ...r, estado_pago: newStatus } : r
      ));
      setSuccess('Estado de pago actualizado');
    } catch (err) {
      setError('Error al actualizar estado de pago');
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
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <MatrixBackground />
        
        <div className="w-full max-w-md bg-black bg-opacity-80 rounded-lg border-2 border-green-500 shadow-[0_0_30px_#00ff0055] overflow-hidden z-10">
          <div className="p-6 border-b border-green-500">
            <div className="flex items-center justify-center mb-4">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <h2 className="text-center text-2xl font-mono text-green-400 tracking-wider">
              SYSTEM ADMIN ACCESS
            </h2>
            <p className="text-center text-green-500 text-xs font-mono mt-1">
              Solo administradores
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-900 bg-opacity-50 border-l-4 border-red-500 text-red-400 font-mono p-3 text-sm">
                <span className="text-white">$&gt;</span> {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-mono text-green-400 mb-2 tracking-wider">
                USERNAME
              </label>
              <TerminalInput
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-green-400 mb-2 tracking-wider">
                PASSWORD
              </label>
              <TerminalInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter secure passcode"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-green-900 bg-opacity-50 border border-green-500 text-green-400 font-mono tracking-wider hover:bg-green-800 hover:text-white hover:shadow-[0_0_15px_#00ff0055] transition-all duration-300"
              >
                <span className="blink">_</span> AUTHENTICATE <span className="blink">_</span>
              </button>
            </div>
          </form>

          <div className="px-6 py-4 bg-black bg-opacity-50 border-t border-green-900">
            <p className="text-green-700 text-xs font-mono text-center tracking-wider">
              SYSTEM v2.4.1 | SECURITY LEVEL: MAXIMUM
            </p>
          </div>
        </div>

        <style>{`
          .blink {
            animation: blink-animation 1s steps(2, start) infinite;
          }
          @keyframes blink-animation {
            to { visibility: hidden; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <nav className="bg-gray-900 border-b border-green-500 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold font-mono text-green-400">PANEL DE SUPER ADMIN</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition font-mono"
          >
            CERRAR SESIÓN
          </button>
        </div>
      </nav>

       <Navbar />

      <div className="max-w-7xl mx-auto p-4">
        {error && (
          <div className="mb-6 p-4 bg-red-900 bg-opacity-50 border-l-4 border-red-500 text-red-400 font-mono rounded">
            <span className="text-white">$&gt;</span> {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-900 bg-opacity-50 border-l-4 border-green-500 text-green-400 font-mono rounded">
            <span className="text-white">$&gt;</span> {success}
          </div>
        )}

        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`py-3 px-6 font-mono ${activeTab === 'reservas' ? 'text-green-400 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => setActiveTab('reservas')}
          >
            RESERVAS
          </button>
          <button
            className={`py-3 px-6 font-mono ${activeTab === 'usuarios' ? 'text-green-400 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => setActiveTab('usuarios')}
          >
            USUARIOS
          </button>
          <button
            className={`py-3 px-6 font-mono ${activeTab === 'advertencias' ? 'text-green-400 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => setActiveTab('advertencias')}
          >
            ADVERTENCIAS
          </button>
        </div>

        {activeTab === 'reservas' && (
          <div className="bg-gray-900 border border-green-500 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-green-500">
              <h2 className="text-3xl font-semibold text-white font-mono tracking-wide">TODAS LAS RESERVAS</h2>
              <p className="text-gray-300 mt-1 font-mono">Total: <span className="font-medium text-green-400">{reservas.length}</span> reservas</p>
            </div>

            {loadingReservas ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500 border-opacity-60"></div>
              </div>
            ) : reservas.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400 italic font-mono">No hay reservas registradas aún.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-gray-100 font-mono">
                  <thead>
                    <tr className="bg-gray-800 uppercase tracking-wide text-sm text-green-400">
                      <th className="px-8 py-4 font-bold text-left">ID</th>
                      <th className="px-8 py-4 font-bold text-left">FECHA</th>
                      <th className="px-8 py-4 font-bold text-left">HORA</th>
                      <th className="px-8 py-4 font-bold text-left">PISTA</th>
                      <th className="px-8 py-4 font-bold text-left">JUGADORES</th>
                      <th className="px-8 py-4 font-bold text-left">DURACIÓN</th>
                      <th className="px-8 py-4 font-bold text-left">ESTADO PAGO</th>
                      <th className="px-8 py-4 font-bold text-left">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas.map((reserva) => (
                      <tr
                        key={reserva.id}
                        className="hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                      >
                        <td className="px-8 py-5 whitespace-nowrap tracking-wide">{reserva.id}</td>
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
                          <div className="relative inline-block w-24">
                            <select
                              value={reserva.estado_pago || 'pendiente'}
                              onChange={(e) => handleUpdatePaymentStatus(reserva, e.target.value)}
                              className="block appearance-none w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 font-mono"
                            >
                              <option value="pendiente" className="bg-gray-800">Pendiente</option>
                              <option value="pagado" className="bg-gray-800">Pagado</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                              </svg>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteClick(reserva.id, 'reserva')}
                            disabled={deletingReservaId === reserva.id}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
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
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Eliminar
                              </>
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

        {activeTab === 'usuarios' && (
          <div className="bg-gray-900 border border-green-500 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-green-500">
              <h2 className="text-3xl font-semibold text-white font-mono tracking-wide">USUARIOS REGISTRADOS</h2>
              <p className="text-gray-300 mt-1 font-mono">Total: <span className="font-medium text-green-400">{usuarios.length}</span> usuarios</p>
            </div>

            {loadingUsuarios ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500 border-opacity-60"></div>
              </div>
            ) : usuarios.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400 italic font-mono">No hay usuarios registrados aún.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-gray-100 font-mono">
                  <thead>
                    <tr className="bg-gray-800 uppercase tracking-wide text-sm text-green-400">
                      <th className="px-8 py-4 font-semibold text-left">ID</th>
                      <th className="px-8 py-4 font-semibold text-left">USUARIO</th>
                      <th className="px-8 py-4 font-semibold text-left">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr
                        key={usuario.id}
                        className="hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                      >
                        <td className="px-8 py-5 whitespace-nowrap tracking-wide">{usuario.id}</td>
                        <td className="px-8 py-5 whitespace-nowrap font-medium">{usuario.username || '-'}</td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteClick(usuario.id, 'usuario')}
                            disabled={deletingUsuarioId === usuario.id}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Eliminar
                              </>
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

        {activeTab === 'advertencias' && (
          <div className="bg-gray-900 border border-green-500 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-green-500">
              <h2 className="text-3xl font-semibold text-white font-mono tracking-wide">ADVERTENCIAS METEOROLÓGICAS</h2>
              <p className="text-gray-300 mt-1 font-mono">Total: <span className="font-medium text-green-400">{advertencias.length}</span> advertencias</p>
            </div>

            <div className="p-6 border-b border-green-500">
              <h3 className="text-xl font-semibold text-white mb-4 font-mono">AÑADIR NUEVA ADVERTENCIA</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1 font-mono">FECHA</label>
                  <input
                    type="date"
                    value={nuevaAdvertencia.fecha}
                    onChange={(e) => setNuevaAdvertencia({...nuevaAdvertencia, fecha: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1 font-mono">MOTIVO</label>
                  <select
                    value={nuevaAdvertencia.motivo}
                    onChange={(e) => setNuevaAdvertencia({...nuevaAdvertencia, motivo: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition font-mono"
                  >
                    <option value="Fenómenos meteorológicos">Fenómenos meteorológicos</option>
                    <option value="Vacaciones/fiesta">Vacaciones/fiesta</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleAddAdvertencia}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 w-full flex items-center justify-center font-mono"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    AÑADIR
                  </button>
                </div>
              </div>
            </div>

            {loadingAdvertencias ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500 border-opacity-60"></div>
              </div>
            ) : advertencias.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400 italic font-mono">No hay advertencias registradas aún.</p>
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
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Eliminar
                              </>
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