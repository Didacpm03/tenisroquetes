import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { HiEye, HiEyeOff } from 'react-icons/hi';


export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) throw new Error('No hay usuario logueado');

      const user = JSON.parse(userStr);
      const { data, error: fetchError } = await supabase
        .from('userstenis')
        .select('*')
        .eq('username', user.username)
        .eq('password', currentPassword)
        .single();

      if (fetchError || !data) throw new Error('Contraseña actual incorrecta');

      const { error: updateError } = await supabase
        .from('userstenis')
        .update({ password: newPassword })
        .eq('username', user.username);

      if (updateError) throw updateError;

      setSuccess('Contraseña cambiada con éxito');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4 pt-24 bg-gradient-to-br from-black via-indigo-900 to-black text-white">
        <div className="w-full max-w-md rounded-2xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 transition-all duration-500 hover:shadow-[0_0_20px_#00f0ff] overflow-hidden">

          {/* Encabezado */}
          <div className="p-6 text-center border-b border-white/20 bg-white/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-red-350 tracking-wide drop-shadow-[0_0_6px_#00f0ff]">
              Cambiar Contraseña
            </h2>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">

            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-500/20 border-l-4 border-red-400 text-red-200 p-4 rounded-lg">
                <p>{error}</p>
              </div>
            )}

            {/* Mensaje de éxito */}
            {success && (
              <div className="bg-green-500/20 border-l-4 border-green-400 text-green-200 p-4 rounded-lg">
                <p>{success}</p>
              </div>
            )}

            {/* Contraseña actual */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Contraseña Actual
              </label>
              <div className="relative rounded-lg overflow-hidden border border-white/20 bg-white/5">
                <input
                  id="currentPassword"
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent placeholder-gray-400 text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none transition pr-10 rounded-lg"
                  required
                />
                <span
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-3 cursor-pointer text-cyan-400 hover:text-white transition text-xl select-none"
                >
                  {showCurrent ? <HiEye /> : <HiEyeOff />}
                </span>
              </div>
            </div>

            {/* Nueva contraseña */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Nueva Contraseña
              </label>
              <div className="relative rounded-lg overflow-hidden border border-white/20 bg-white/5">
                <input
                  id="newPassword"
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent placeholder-gray-400 text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none transition pr-10 rounded-lg"
                  required
                  minLength={6}
                />
                <span
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-3 cursor-pointer text-cyan-400 hover:text-white transition text-xl select-none"
                >
                  {showNew ? <HiEye /> : <HiEyeOff />}
                </span>
              </div>
            </div>

            {/* Confirmar nueva contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirmar Nueva Contraseña
              </label>
              <div className="relative rounded-lg overflow-hidden border border-white/20 bg-white/5">
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent placeholder-gray-400 text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none transition pr-10 rounded-lg"
                  required
                  minLength={6}
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 cursor-pointer text-cyan-400 hover:text-white transition text-xl select-none"
                >
                  {showConfirm ? <HiEye /> : <HiEyeOff />}
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                disabled={loading}
                className="flex-1 py-3 px-4 bg-gray-400/30 hover:bg-gray-400/50 text-white font-semibold rounded-lg shadow-md transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-md transition-all hover:shadow-[0_0_10px_#00f0ff] ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );

}



