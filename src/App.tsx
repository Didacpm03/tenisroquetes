import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reservar from './pages/reservar';
import MisReservas from './pages/MisReservas';
import Clasificaciones from './pages/Clasificaciones';
import Contacto from './pages/contacto';
import Login from './pages/Login';
import SuperAdmin from './pages/SuperAdmin';
import Partidos from './pages/Partidos';
import ChangePassword from './pages/ChangePassword';
import Manual from './pages/manual';
import EstadisticasJugador from './pages/EstadisticasJugador';
import Loader from './components/Loader';
import Notificaciones from './pages/Notificaciones';
import Tutorial from './components/Tutorial'; // 👈 Importa el componente Tutorial

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      {/* Añade el componente Tutorial aquí */}
      <Tutorial />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservar" element={<Reservar />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/clasificaciones" element={<Clasificaciones />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/estadisticas-jugador" element={<EstadisticasJugador />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
      </Routes>
    </Router>
  );
}

export default App;