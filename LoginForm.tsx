import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { data, error } = await supabase
      .from('usersdos')
      .select('*') // ✅ Asegúrate que incluye 'saldo'
      .eq('email', email)
      .eq('password', password) // ⚠️ Solo para desarrollo, no en producción
      .single();

    if (error || !data) {
      setError('Email o contraseña incorrectos.');
    } else {
      setSuccess(`Bienvenido, ${data.first_name}!`);
      localStorage.setItem('loggedUser', JSON.stringify(data)); // ✅ Guarda todo, incluido saldo
      window.location.href = '/';
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Iniciar sesión
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
