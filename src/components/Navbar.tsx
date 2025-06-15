import { Link } from "react-router-dom";
import Pelota from "../assets/png/pelota.png";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    const handleStorageChange = () => {
      const userStr = localStorage.getItem("user");
      setUser(userStr ? JSON.parse(userStr) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const handleShowTutorial = () => {
    localStorage.removeItem("tutorialCompleted");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-2 px-4 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center z-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105"
          >
            <img src={Pelota} alt="Logo" className="w-8 h-8" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Tennis Roquetes
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - All links visible */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/reservar">Reservar</NavLink>
          <NavLink to="/mis-reservas">Mis Reservas</NavLink>
          <NavLink to="/estadisticas-jugador">Partidos</NavLink>
          <NavLink to="/clasificaciones">Clasificación</NavLink>
          <NavLink to="/manual">Manual</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
          
          {(user?.username === "Dario" || user?.username === "Didac") && (
            <NavLink to="/super-admin" className="bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/30">
              Admin
            </NavLink>
          )}
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-2">
          <div className="relative" ref={userDropdownRef}>
            {user ? (
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 text-sm bg-gradient-to-r from-gray-800 to-gray-700 hover:from-cyan-900/40 hover:to-blue-900/40 px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 border border-gray-700 hover:border-cyan-400/30 group"
              >
                <span className="text-cyan-400 font-medium truncate max-w-[120px] bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                  {user.nombre || user.username || user.email?.split('@')[0]}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 text-cyan-400 ${showUserDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 hover:scale-105"
              >
                Login
              </Link>
            )}

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl py-2 z-50 overflow-hidden">
                <div className="border-b border-gray-700/50 pb-2 mb-2">
                  <div className="px-4 py-2 text-sm text-cyan-400 font-medium">
                    {user.email || user.username}
                  </div>
                </div>
                
                <MobileLink to="/change-password" onClick={() => setShowUserDropdown(false)}>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Cambiar contraseña
                  </div>
                </MobileLink>
                
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-1 rounded-full hover:bg-gray-800 transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-md border-t border-gray-700 mt-2 rounded-b-xl animate-fadeIn">
          <div className="py-3 px-4 grid grid-cols-1 gap-1">
            <MobileLink to="/" onClick={() => setIsMenuOpen(false)}>Inicio</MobileLink>
            <MobileLink to="/reservar" onClick={() => setIsMenuOpen(false)}>Reservar</MobileLink>
            <MobileLink to="/mis-reservas" onClick={() => setIsMenuOpen(false)}>Mis Reservas</MobileLink>
            <MobileLink to="/estadisticas-jugador" onClick={() => setIsMenuOpen(false)}>Partidos Jugados</MobileLink>
            <MobileLink to="/clasificaciones" onClick={() => setIsMenuOpen(false)}>Clasificación</MobileLink>
            <MobileLink to="/manual" onClick={() => setIsMenuOpen(false)}>Manual</MobileLink>
            <MobileLink to="/contacto" onClick={() => setIsMenuOpen(false)}>Contacto</MobileLink>
            <MobileLink to="/change-password" onClick={() => setIsMenuOpen(false)}>Cambiar contraseña</MobileLink>

            {(user?.username === "Dario" || user?.username === "Didac") && (
              <MobileLink to="/super-admin" onClick={() => setIsMenuOpen(false)} className="bg-purple-900/30 hover:bg-purple-900/50">
                Admin
              </MobileLink>
            )}

            <button
              onClick={() => {
                handleShowTutorial();
                setIsMenuOpen(false);
              }}
              className="text-gray-300 hover:text-white px-4 py-2 text-left rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Tutorial
            </button>

            {user && (
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 px-4 py-2 text-left rounded-lg hover:bg-red-900/30 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Componente de enlace para navegación desktop
const NavLink = ({ to, children, className = "" }: { to: string; children: React.ReactNode; className?: string }) => (
  <Link
    to={to}
    className={`text-gray-300 hover:text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition-all duration-300 text-sm border border-transparent hover:border-gray-700 ${className}`}
  >
    {children}
  </Link>
);

// Componente de enlace para móvil
const MobileLink = ({ 
  to, 
  onClick, 
  children,
  className = ""
}: { 
  to: string; 
  onClick: () => void; 
  children: React.ReactNode;
  className?: string;
}) => (
  <Link
    to={to}
    className={`text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition flex items-center gap-2 ${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);