import { Link } from "react-router-dom";
import Pelota from "../assets/png/pelota.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

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

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 shadow-md py-4 px-8 flex justify-between items-center text-white"
      style={{
        background: "linear-gradient(270deg, #8e44ad, #3498db, #1abc9c, #f39c12)",
        backgroundSize: "800% 800%",
        animation: "navbarGradient 15s ease infinite",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold hover:scale-105 transition-transform"
      >
        Tenis Roquetes
      </Link>

      {/* Enlaces */}
      <div className="flex space-x-6 font-semibold text-lg items-center">
        <Link to="/" className="hover:text-yellow-200 transition">Inicio</Link>
        <Link to="/reservar" className="hover:text-yellow-200 transition">Reservar</Link>
        <Link to="/mis-reservas" className="hover:text-yellow-200 transition">Mis Reservas</Link>
        <Link to="/clasificaciones" className="hover:text-yellow-200 transition">Clasificación</Link>
        <Link to="/partidos" className="hover:text-yellow-200 transition">Mis Partidos</Link>
        <Link to="/contacto" className="hover:text-yellow-200 transition">Contacto</Link>
        <Link to="/super-admin" className="hover:text-yellow-200 transition">Admin</Link>

        {user ? (
          <>
            <span className="text-yellow-200">Hola, {user.nombre || user.username || user.email?.split('@')[0]}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-white transition"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-yellow-200 transition">Login</Link>
        )}
      </div>

      {/* Pelota animada */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 w-10 h-10 pointer-events-none"
        style={{
          animation: "moveBall 10s ease-in-out infinite alternate",
        }}
      >
        <img
          src={Pelota}
          alt="Pelota de tenis"
          className="w-full h-full object-contain drop-shadow-xl"
        />
      </div>

      {/* Animaciones globales */}
      <style>
        {`
          @keyframes navbarGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes moveBall {
            0% { transform: translateX(0) translateY(-50%); }
            100% { transform: translateX(calc(100vw - 40px)) translateY(-50%); }
          }
        `}
      </style>
    </nav>
  );
}
