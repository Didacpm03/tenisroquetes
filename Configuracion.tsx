import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Configuracion: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('loggedUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    navigate('/');
    window.location.reload();
  };

  const handleAddSaldo = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setMessage('❌ Introduce una cantidad válida');
      return;
    }

    const newUser = { ...user, saldo: (user?.saldo || 0) + value };
    setUser(newUser);
    localStorage.setItem('loggedUser', JSON.stringify(newUser));
    setMessage(`✅ Se han añadido ${value.toFixed(2)} € correctamente`);
    setAmount('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar onCartClick={() => {}} loggedUser={user} handleLogout={handleLogout} />

      <main className="flex-grow max-w-xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg"> <br></br>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Configuración de Usuario</h1>

        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Aquí puedes añadir saldo ficticio a tu cuenta para probar la tienda.
          </p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded text-center text-white ${message.startsWith('✅') ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
          </div>
        )}

        <label className="block mb-2 font-semibold text-gray-700">Cantidad a añadir (€):</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Por ejemplo: 20"
          />
          <button
            onClick={handleAddSaldo}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
          >
            Añadir
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Configuracion;
