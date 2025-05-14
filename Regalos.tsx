import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Marquee } from '../components/ui/marquee';

interface GiftCard {
  name: string;
  price: number;
  color: string;
}

const giftCards: GiftCard[] = [
  { name: 'Simple Card', price: 10, color: 'bg-gray-100' },
  { name: 'Gold Card', price: 25, color: 'bg-yellow-300' },
  { name: 'Platinum Card', price: 50, color: 'bg-gray-300' },
  { name: 'Premium Card', price: 100, color: 'bg-purple-300' },
];

const GiftCards: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('loggedUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handlePurchase = async (card: GiftCard) => {
    if (!user || loading) return;

    setLoading(true);
    setMessage(null);

    const { data: userData, error: fetchError } = await supabase
      .from('usersdos')
      .select('saldo')
      .eq('user_id', user.user_id)
      .single();

    if (fetchError || !userData) {
      setMessage({ type: 'error', text: '❌ Error al obtener tu saldo. Intenta de nuevo.' });
      setLoading(false);
      return;
    }

    const currentSaldo = userData.saldo;

    if (currentSaldo < card.price) {
      setMessage({
        type: 'error',
        text: `❌ No tienes suficiente saldo para comprar la ${card.name}. Tu saldo es de ${currentSaldo.toFixed(2)} €`,
      });
      setLoading(false);
      return;
    }

    const newSaldo = currentSaldo - card.price;

    const { error: updateError } = await supabase
      .from('usersdos')
      .update({ saldo: newSaldo })
      .eq('user_id', user.user_id);

    if (updateError) {
      setMessage({ type: 'error', text: '❌ Error al actualizar tu saldo. Inténtalo de nuevo.' });
      setLoading(false);
      return;
    }

    const updatedUser = { ...user, saldo: newSaldo };
    setUser(updatedUser);
    localStorage.setItem('loggedUser', JSON.stringify(updatedUser));

    const purchasedCards = JSON.parse(localStorage.getItem('purchasedCards') || '[]');
    purchasedCards.push(card);
    localStorage.setItem('purchasedCards', JSON.stringify(purchasedCards));

    setMessage({
      type: 'success',
      text: `✅ Has comprado la ${card.name} por ${card.price} €. Tu nuevo saldo es ${newSaldo.toFixed(2)} €`,
    });

    setLoading(false);
  };

  const CardComponent = ({ card }: { card: GiftCard }) => (
    <div
      key={card.name}
      className={`rounded-lg p-6 shadow-md flex flex-col items-center mx-4 min-w-[250px] ${card.color}`}
    >
      <h2 className="text-xl font-semibold mb-2">{card.name}</h2>
      <p className="mb-4 text-lg font-bold">{card.price} €</p>
      <button
        disabled={loading}
        onClick={() => handlePurchase(card)}
        className={`${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } text-white px-4 py-2 rounded text-sm`}
      >
        {loading ? 'Procesando...' : 'Comprar'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => {}} />
      <main className="flex-grow bg-gray-100 p-6">
        <br />
        <h1 className="text-3xl font-bold text-center mb-6">Tarjetas Regalo</h1>

        {message && (
          <div
            className={`max-w-xl mx-auto mb-6 p-4 rounded text-center ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="relative my-8">
          <Marquee pauseOnHover className="[--duration:30s]">
            {giftCards.map((card) => (
              <CardComponent key={card.name} card={card} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="mt-6 [--duration:30s]">
            {giftCards.map((card) => (
              <CardComponent key={card.name + '-rev'} card={card} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-100" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-100" />
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/mis-tarjetas')}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-sm"
          >
            Ver tus Cards
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GiftCards;
