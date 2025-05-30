import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Marquee } from '../components/ui/marquee';
import { supabase } from '../../supabaseClient'; // Ajusta el path si es diferente


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
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);
  const [recipient, setRecipient] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');
  const [purchasedCards, setPurchasedCards] = useState<GiftCard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('loggedUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }

    const storedCards = localStorage.getItem('purchasedCards');
    if (storedCards) {
      setPurchasedCards(JSON.parse(storedCards));
    }
  }, []);

  const handlePurchase = (card: GiftCard) => {
    if (!user || loading) return;

    const currentSaldo = parseFloat(user.saldo || '0');
    if (currentSaldo < card.price) {
      setMessage({
        type: 'error',
        text: `❌ No tienes suficiente saldo para comprar la ${card.name}. Tu saldo es de ${currentSaldo.toFixed(2)} €.`,
      });
      return;
    }

    setLoading(true);
    const newSaldo = currentSaldo - card.price;
    const newTarjeta = (user.tarjeta || 0) + card.price;
    const updatedUser = { ...user, saldo: newSaldo, tarjeta: newTarjeta };
    localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
    setUser(updatedUser);

    const updatedCards = [...purchasedCards, card];
    setPurchasedCards(updatedCards);
    localStorage.setItem('purchasedCards', JSON.stringify(updatedCards));

    setMessage({
      type: 'success',
      text: `✅ Has comprado la ${card.name} por ${card.price} €. Nuevo saldo: ${newSaldo.toFixed(2)} €`,
    });

    setLoading(false);
  };

  const handleGiftCard = async () => {
  if (!selectedCard || !recipient || !messageText) {
    setMessage({ type: 'error', text: '❌ Todos los campos son obligatorios.' });
    return;
  }

  setLoading(true);

  try {
    // Consultar Supabase para verificar si el usuario existe en 'usersdos'
    const { data, error } = await supabase
      .from('usersdos')
      .select('username')
      .eq('username', recipient)
      .single();

    if (error || !data) {
      setMessage({ type: 'error', text: `❌ El usuario "${recipient}" no existe.` });
      setLoading(false);
      return;
    }

    // Usuario encontrado, proceder con el regalo
    const updatedCards = purchasedCards.filter((card) => card.name !== selectedCard.name);
    setPurchasedCards(updatedCards);
    localStorage.setItem('purchasedCards', JSON.stringify(updatedCards));

    setMessage({
      type: 'success',
      text: `✅ Has regalado una tarjeta ${selectedCard.name} a ${recipient}.`,
    });

    setSelectedCard(null);
    setRecipient('');
    setMessageText('');
  } catch (err) {
    setMessage({ type: 'error', text: '❌ Error al conectar con el servidor. Intenta de nuevo.' });
  }

  setLoading(false);
};


  const CardComponent = ({ card }: { card: GiftCard }) => {
    const hasEnough = user?.saldo >= card.price;

    return (
      <div
        className={`rounded-lg p-6 shadow-md flex flex-col items-center mx-4 min-w-[250px] ${card.color}`}
      >
        <h2 className="text-xl font-semibold mb-2">{card.name}</h2>
        <p className="mb-4 text-lg font-bold">{card.price} €</p>
        <button
          disabled={loading || !hasEnough}
          onClick={() => handlePurchase(card)}
          className={`text-white px-4 py-2 rounded text-sm ${
            loading || !hasEnough ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Procesando...' : hasEnough ? 'Comprar' : 'Saldo insuficiente'}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => {}} />
      <main className="flex-grow bg-gray-100 p-6">
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

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">REGALAR TARJETA</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Selecciona una tarjeta</label>
            <select
              value={selectedCard?.name || ''}
              onChange={(e) => {
                const card = purchasedCards.find((c) => c.name === e.target.value);
                setSelectedCard(card || null);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>Elige una tarjeta</option>
              {purchasedCards.map((card) => (
                <option key={card.name} value={card.name}>{card.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Enviar a:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Nombre de usuario"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Mensaje:</label>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Escribe tu mensaje"
            />
          </div>

          <button
            onClick={handleGiftCard}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
          >
            Enviar Tarjeta
          </button>
        </div>

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
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/mis-tarjetas')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Ir a Mis Tarjetas
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GiftCards;
