import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface GiftCard {
  name: string;
  price: number;
  color: string;
}

const MisTarjetas: React.FC = () => {
  const [cards, setCards] = useState<GiftCard[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('purchasedCards');
    if (stored) {
      setCards(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (index: number) => {
    const updated = [...cards];
    updated.splice(index, 1);
    setCards(updated);
    localStorage.setItem('purchasedCards', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => {}} />
      <main className="flex-grow bg-gray-100 p-6"> <br></br>
        <h1 className="text-3xl font-bold text-center mb-6">Tus Tarjetas Compradas</h1>

        {cards.length === 0 ? (
          <p className="text-center text-gray-600">No has comprado ninguna tarjeta aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 shadow-md flex flex-col items-center ${card.color}`}
              >
                <h2 className="text-xl font-semibold mb-2">{card.name}</h2>
                <p className="mb-4 text-lg font-bold">{card.price} €</p>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MisTarjetas;
