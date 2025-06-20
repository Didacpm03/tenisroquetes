import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Reservar from './pages/reservar';
import MisReservas from './pages/MisReservas';
import Clasificaciones from './pages/Clasificaciones';
import Contacto from './pages/contacto';
import SuperAdmin from './pages/SuperAdmin';
import ChangePassword from './pages/ChangePassword';
import Manual from './pages/manual';
import EstadisticasJugador from './pages/EstadisticasJugador';
import Loader from './components/Loader';
import TennisOnboarding from './components/tennis-auth-onboarding';
import Prueba from './pages/Prueba';

function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    const checkAuth = async () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        setAuthenticated(true);
      }
      
      // Simular carga inicial
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    checkAuth();
  }, []);

    useEffect(() => {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-HE2305B7VJ";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-HE2305B7VJ');
    `;
    document.head.appendChild(script2);
  }, []);


  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  if (loading) return <Loader />;

  // Si no está autenticado, mostrar el onboarding
  if (!authenticated) {
    return <TennisOnboarding onLoginSuccess={handleLoginSuccess} />;
  }

  // Si está autenticado, mostrar la aplicación normal
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservar" element={<Reservar />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/clasificaciones" element={<Clasificaciones />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/estadisticas-jugador" element={<EstadisticasJugador />} />
        <Route path="/prueba" element={<Prueba />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;