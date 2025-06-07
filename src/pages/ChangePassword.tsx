import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-green-700 p-6 text-center">
            <h2 className="text-3xl font-bold text-white">Cambiar Contraseña</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
                <p>{success}</p>
              </div>
            )}

            {/* Contraseña actual */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña Actual
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition pr-10"
                  required
                />
                <span
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showCurrent ? '👁️' : '🙈'}
                </span>
              </div>
            </div>

            {/* Nueva contraseña */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Nueva Contraseña
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition pr-10"
                  required
                  minLength={6}
                />
                <span
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showNew ? '👁️' : '🙈'}
                </span>
              </div>
            </div>

            {/* Confirmar nueva contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Nueva Contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition pr-10"
                  required
                  minLength={6}
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showConfirm ? '👁️' : '🙈'}
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                disabled={loading}
                className="flex-1 py-3 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-md transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition ${loading ? 'opacity-75' : ''}`}
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
