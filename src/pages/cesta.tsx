// src/pages/Cesta.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Cesta = () => {
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('cart') || '[]';
    setCart(JSON.parse(stored));
  }, []);

  const handleVaciarCesta = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  const handleIrAlPago = () => {
    navigate('/pago');
  };

  return (
    <>
      <Navbar 
        loggedUser={JSON.parse(localStorage.getItem('loggedUser') || 'null')} 
        onCartClick={() => {}} 
        handleLogout={() => {}} 
      />

      <div className="max-w-5xl mx-auto px-4 py-8"> <br></br>
        <h1 className="text-2xl font-bold mb-6">🛒 Tu Cesta</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">No hay productos en la cesta.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-4 flex flex-col justify-between"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-xl mb-4 transition-transform duration-300 hover:scale-105"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                </div>
                <div className="mt-auto">
                  <p className="text-lg font-bold text-indigo-600">{item.price} €</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleVaciarCesta}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200"
            >
              Vaciar Cesta
            </button>
            <button
              onClick={handleIrAlPago}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Ir al pago
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cesta;
