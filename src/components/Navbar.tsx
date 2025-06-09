import { Link } from "react-router-dom";
import Pelota from "../assets/png/pelota.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const handleShowTutorial = () => {
    localStorage.removeItem("tutorialCompleted");
    window.location.reload(); // Recargar para mostrar el tutorial
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 shadow-md py-4 px-8 flex justify-between items-center text-white"
      style={{
        background: "linear-gradient(270deg, #8e44ad, #3498db, #1abc9c, #f39c12)",
        backgroundSize: "800% 800%",
        animation: "navbarGradient 15s ease infinite",
      }}
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-extrabold hover:scale-105 transition-transform"
      >
        <img src={Pelota} alt="Logo" className="w-10 h-10" />
        Tennis Roquetes
      </Link>

      {/* Enlaces */}
      <div className="flex space-x-6 font-semibold text-lg items-center">
        <Link to="/" className="hover:text-yellow-200 transition">Inicio</Link>
        <Link to="/manual" className="hover:text-yellow-200 transition">Manual</Link>
        <Link to="/reservar" className="hover:text-yellow-200 transition">Reservar</Link>
        <Link to="/mis-reservas" className="hover:text-yellow-200 transition">Mis Reservas</Link>
        <Link to="/clasificaciones" className="hover:text-yellow-200 transition">Clasificación</Link>
        <Link to="/partidos" className="hover:text-yellow-200 transition">Mis Partidos</Link>
        <Link to="/contacto" className="hover:text-yellow-200 transition">Contacto</Link>

        {/* Botón para volver a mostrar el tutorial */}
        <button 
          onClick={handleShowTutorial}
          className="hover:text-yellow-200 transition"
        >
          Mostrar Tutorial
        </button>

        {/* Solo mostrar Admin si el usuario es Didac */}
        {user?.username === "Didac" && (
          <Link to="/super-admin" className="hover:text-yellow-200 transition">Admin</Link>
        )}

        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 hover:text-yellow-200 transition"
            >
              <span className="text-yellow-200">Hola, {user.nombre || user.username || user.email?.split('@')[0]}</span>
              <svg
                className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/amigos"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  Mis Amigos
                </Link>
                <Link
                  to="/change-password"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  Cambiar contraseña
                </Link>
                <Link
                  to="/notificaciones"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  Notificaciones
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-700 transition"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="hover:text-yellow-200 transition">Login</Link>
        )}
      </div>

      {/* Animaciones globales */}
      <style>
        {`
          @keyframes navbarGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </nav>
  );
}