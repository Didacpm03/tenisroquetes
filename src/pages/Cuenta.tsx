import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; 

const Cuenta = () => {
  const [loggedUser, setLoggedUser] = useState<any>(null);
  const [totalTarjetas, setTotalTarjetas] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    const storedTarjetas = localStorage.getItem('purchasedCards');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoggedUser(user);
    }

    if (storedTarjetas) {
      try {
        const cards = JSON.parse(storedTarjetas);
        const total = cards.reduce((sum: number, card: any) => sum + (card?.price || 0), 0);
        setTotalTarjetas(total);
      } catch (e) {
        console.error('Error al leer purchasedCards:', e);
      }
    }
  }, []);

  const handleAddMoney = () => {
    const amount = parseFloat(amountToAdd);
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor ingresa una cantidad válida.');
      return;
    }

    const updatedUser = {
      ...loggedUser,
      saldo: (loggedUser.saldo || 0) + amount,
    };

    setLoggedUser(updatedUser);
    localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
    setAmountToAdd('');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
  };

  return (
    <div>
      <Navbar 
        loggedUser={loggedUser} 
        onCartClick={() => {}}  
        handleLogout={handleLogout} 
      />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> <br></br><br></br><br></br>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Mi Cuenta</h1>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Saldo Actual</h2>
            <p className="text-lg text-gray-700">💰 {loggedUser?.saldo?.toFixed(2) ?? '0.00'} €</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Total en Tarjetas</h2>
            <p className="text-lg text-gray-700">🎟️ {totalTarjetas.toFixed(2)} €</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Añadir Dinero</h2>
            <input
              type="number"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
              placeholder="Cantidad a añadir"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={handleAddMoney}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Añadir Dinero
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default Cuenta;
