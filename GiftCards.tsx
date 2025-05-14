import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
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
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);
  const [recipient, setRecipient] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');
  const [purchasedCards, setPurchasedCards] = useState<GiftCard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('loggedUser');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Asegurar que tenga la propiedad tarjeta
      if (parsed.tarjeta === undefined) {
        parsed.tarjeta = 0;
        localStorage.setItem('loggedUser', JSON.stringify(parsed));
      }
      setUser(parsed);
    }

    // Obtener las tarjetas compradas desde localStorage
    const cards = JSON.parse(localStorage.getItem('purchasedCards') || '[]');
    setPurchasedCards(cards);
  }, []);

  const handlePurchase = async (card: GiftCard) => {
    if (!user || loading) return;

    setLoading(true);
    setMessage(null);

    const currentSaldo = user.saldo || 0;

    if (currentSaldo < card.price) {
      setMessage({
        type: 'error',
        text: `❌ No tienes suficiente saldo para comprar la ${card.name}. Tu saldo es de ${currentSaldo.toFixed(2)} €`,
      });
      setLoading(false);
      return;
    }

    const newSaldo = currentSaldo - card.price;
    const newTarjeta = (user.tarjeta || 0) + card.price;

    const updatedUser = { ...user, saldo: newSaldo, tarjeta: newTarjeta };
    setUser(updatedUser);
    localStorage.setItem('loggedUser', JSON.stringify(updatedUser));

    const updatedPurchasedCards = [...purchasedCards, card];
    setPurchasedCards(updatedPurchasedCards);
    localStorage.setItem('purchasedCards', JSON.stringify(updatedPurchasedCards));

    setMessage({
      type: 'success',
      text: `✅ Has comprado la ${card.name} por ${card.price} €. Tu nuevo saldo es ${newSaldo.toFixed(2)} €, y tienes ${newTarjeta.toFixed(2)} € en tarjetas.`,
    });

    setLoading(false);
  };

  const handleGiftCard = async () => {
    if (!selectedCard || !recipient || !messageText) {
      setMessage({ type: 'error', text: '❌ Todos los campos son obligatorios.' });
      return;
    }

    // Verificar si el destinatario existe en la base de datos
    const { data: userData, error } = await supabase
      .from('usersdos')
      .select('user_id')
      .eq('username', recipient)
      .single();

    if (error || !userData) {
      setMessage({ type: 'error', text: '❌ El usuario no existe.' });
      return;
    }

    // Eliminar la tarjeta de purchasedCards
    const updatedPurchasedCards = purchasedCards.filter((card) => card.name !== selectedCard.name);
    setPurchasedCards(updatedPurchasedCards);
    localStorage.setItem('purchasedCards', JSON.stringify(updatedPurchasedCards));

    // Mostrar mensaje de éxito
    setMessage({
      type: 'success',
      text: `✅ Has regalado una tarjeta ${selectedCard.name} a ${recipient}.`,
    });

    // Limpiar formulario
    setSelectedCard(null);
    setRecipient('');
    setMessageText('');
  };

  const CardComponent = ({ card }: { card: GiftCard }) => {
    const hasEnough = user?.saldo >= card.price;

    return (
      <div
        key={card.name}
        className={`rounded-lg p-6 shadow-md flex flex-col items-center mx-4 min-w-[250px] ${card.color}`}
      >
        <h2 className="text-xl font-semibold mb-2">{card.name}</h2>
        <p className="mb-4 text-lg font-bold">{card.price} €</p>
        <button
          disabled={loading || !hasEnough}
          onClick={() => handlePurchase(card)}
          className={`text-white px-4 py-2 rounded text-sm ${loading || !hasEnough ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
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

        {/* Formulario para regalar tarjeta */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">REGALAR TARJETA</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Selecciona una tarjeta</label>
            <select
              value={selectedCard?.name || ''}
              onChange={(e) => {
                const card = purchasedCards.find((card) => card.name === e.target.value);
                setSelectedCard(card || null);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>Elige una tarjeta</option>
              {purchasedCards.map((card) => (
                <option key={card.name} value={card.name}>
                  {card.name}
                </option>
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
