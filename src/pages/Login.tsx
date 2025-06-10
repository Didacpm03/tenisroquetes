import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import Navbar from '../components/Navbar';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: supabaseError } = await supabase
        .from('userstenis')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (supabaseError || !data) {
        throw supabaseError || new Error('Credenciales incorrectas');
      }

      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
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
            Iniciar Sesión
          </h2>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="p-8 space-y-6">

          {error && (
            <div className="bg-red-500/20 border-l-4 border-red-400 text-red-200 p-4 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre de Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 placeholder-gray-400 text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <div className="relative rounded-lg overflow-hidden border border-white/20 bg-white/5">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-transparent placeholder-gray-400 text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none transition pr-10 rounded-lg"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-cyan-400 hover:text-white transition text-xl select-none"
              >
                {showPassword ? <HiEye /> : <HiEyeOff />}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-md transition-all hover:shadow-[0_0_10px_#00f0ff] ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
);

}