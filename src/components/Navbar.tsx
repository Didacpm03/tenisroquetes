import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const categories = [
  { name: 'La vida universitària', path: '/universitaria' },
  { name: 'Estudiantina', path: '/estudiantina' },
  { name: 'Austria', path: '/austria' },
  { name: 'Reunions', path: '/reunions' },
  { name: 'Arbres Àustria', path: '/arbres-austria' },
  { name: 'Arbres Vilanova', path: '/arbres-vilanova' },
  { name: 'Viatge final de carrera', path: '/viatge-final' },
  { name: 'Mariatzell', path: '/mariatzell' },
];

const OpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    if (dropdownOpen) setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <>
      {/* Etiqueta toggle fija arriba centro */}
      <div
        onClick={toggleMenu}
        className="fixed top-1 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer
          bg-yellow-400 text-black font-semibold px-4 py-1 rounded-full
          shadow-lg hover:bg-yellow-500 transition-colors select-none
          backdrop-filter backdrop-blur-md flex items-center space-x-2"
        title={menuOpen ? 'Cerrar menú' : 'Mostrar menú'}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleMenu();
        }}
      >
        {menuOpen ? (
          <>
            <span>Cerrar</span>
            <CloseIcon />
          </>
        ) : (
          <>
            <span>Menú</span>
            <OpenIcon />
          </>
        )}
      </div>

      {/* Navbar con slide down/up y fondo animado */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-transform duration-400 ease-in-out
          ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        style={{
          background:
            'linear-gradient(270deg, #ff9a9e, #fad0c4, #a18cd1, #fbc7a4, #ff9a9e)',
          backgroundSize: '800% 800%',
          animation: 'gradientShift 20s ease infinite',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 4px 12px rgb(0 0 0 / 0.4)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-black font-semibold">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-yellow-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            Promo1961
          </Link>

          {/* Desktop menu */}
          <div
            className="hidden md:flex items-center space-x-8 relative"
            ref={dropdownRef}
          >
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 hover:text-yellow-700 transition focus:outline-none"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <span>Pàgines Promoció 61</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2
                 ring-1 ring-black ring-opacity-10 z-50 scale-up"
              >
                {categories.map(({ name, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition font-medium"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Estilos animados */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .scale-up {
          transform-origin: top left;
          animation: scaleUp 0.3s ease forwards;
        }
        @keyframes scaleUp {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
