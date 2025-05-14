import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<any>(null);
  const navigate = useNavigate();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/category/men' },
    { name: 'Women', path: '/category/women' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Sale', path: '/sale' },
    { name: 'Tarjetas Regalo', path: '/giftcards' }, // Página para mandar y comprar regalos
  ];

  useEffect(() => {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      setLoggedUser(JSON.parse(user));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            SNKR<span className="text-orange-500">HUB</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm text-gray-700 hover:text-orange-500 font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/admin-login"
            className="text-sm text-gray-700 hover:text-orange-500 font-medium transition-colors hidden md:block"
          >
            Admin Login
          </Link>

          <div className="flex items-center space-x-6">
            <button
              onClick={onCartClick}
              className="p-1 rounded-full text-gray-700 hover:text-orange-500 transition-colors relative"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {loggedUser ? (
              <div className="relative group">
                <button className="p-1 rounded-full text-gray-700 hover:text-orange-500 flex items-center gap-1">
                  <User size={20} />
                  <span>{loggedUser.username}</span>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-md hidden group-hover:block z-10">
                  <div className="px-4 py-2 border-b text-sm text-gray-700">
                    <strong>💰 Saldo:</strong> {loggedUser.saldo?.toFixed(2) ?? '0.00'} €
                  </div>
                  <TarjetasInfo />
                  <button
                    onClick={() => navigate('/configuracion')}
                    className="w-full px-4 py-2 flex items-center gap-2 text-left text-gray-700 hover:bg-gray-100 text-sm"
                  >
                    <Settings size={16} /> Configuración
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 flex items-center gap-2 text-left text-red-500 hover:bg-gray-100 text-sm"
                  >
                    <LogOut size={16} /> Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <a href="/login" className="p-1 rounded-full text-gray-700 hover:text-orange-500">
                <User size={20} />
              </a>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-1 rounded-full text-gray-700 hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-base text-gray-700 hover:text-orange-500 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-3 mt-2">
              {!loggedUser ? (
                <>
                  <Link
                    to="/login"
                    className="block text-base text-gray-700 hover:text-orange-500 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-base text-gray-700 hover:text-orange-500 font-medium transition-colors mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-4 text-sm text-gray-700 mb-2">
                    <strong>💰 Saldo:</strong> {loggedUser.saldo?.toFixed(2) ?? '0.00'} €
                  </div>
                  <TarjetasInfo />
                  <button
                    onClick={() => {
                      navigate('/configuracion');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left text-gray-700 hover:bg-gray-100 px-4 py-2 rounded text-sm flex gap-2 items-center"
                  >
                    <Settings size={16} /> Configuración
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-500 hover:bg-gray-100 px-4 py-2 rounded text-sm flex gap-2 items-center"
                  >
                    <LogOut size={16} /> Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Componente para mostrar total gastado en tarjetas
const TarjetasInfo = () => {
  const [totalTarjetas, setTotalTarjetas] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('purchasedCards');
    if (stored) {
      try {
        const cards = JSON.parse(stored);
        const total = cards.reduce((sum: number, card: any) => sum + (card?.price || 0), 0);
        setTotalTarjetas(total);
      } catch (e) {
        console.error('Error al leer purchasedCards:', e);
      }
    }
  }, []);

  return (
    <div className="px-4 py-2 border-b text-sm text-gray-700">
      <strong>🎟️ Tarjetas:</strong> {totalTarjetas.toFixed(2)} €
    </div>
  );
};

export default Navbar;
