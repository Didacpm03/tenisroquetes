import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Asegura que no se recargue la página

    console.log('Formulario enviado'); // Verifica que el formulario se está enviando

    if (!email || !password || !firstName || !lastName || !username) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      // Registra al usuario en Supabase
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error('Error de registro en Supabase:', authError.message);
        setError(authError.message);
        return;
      }

      // Accedemos al user desde data.user
      const user = data?.user;
      console.log('Usuario registrado:', user);

      if (!user) {
        console.error('No se pudo obtener el usuario');
        setError('Hubo un error al obtener el usuario.');
        return;
      }

      // Inserta el usuario en Users_Clients
      const { data: insertData, error: insertError } = await supabase
      .from('users_clients')  // Aquí cambiamos a minúsculas
        .insert([
          {
            user_id: user.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            username: username,
          },
        ]);

      if (insertError) {
        console.error('Error al insertar en Users_Clients:', insertError.message);
        setError('Hubo un error al guardar los datos en la base de datos.');
        return;
      }

      console.log('Usuario registrado y datos añadidos correctamente');
      // Limpiar formulario después de registro exitoso
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setUsername('');
      setError(''); // Limpiar posibles errores
    } catch (error) {
      console.error('Error inesperado:', error);
      setError('Hubo un error inesperado. Inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      {error && <div className="text-red-500">{error}</div>} {/* Mostrar errores */}
      <div>
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          id="first_name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          id="last_name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
