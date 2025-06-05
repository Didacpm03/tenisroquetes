import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reservar from './pages/reservar';
import MisReservas from './pages/MisReservas';
import Clasificaciones from './pages/Clasificaciones';
import Contacto from './pages/contacto';
import Login from './pages/Login';
import SuperAdmin from './pages/SuperAdmin';
import Partidos from './pages/Partidos';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservar" element={<Reservar />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/clasificaciones" element={<Clasificaciones />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/partidos" element={<Partidos />} />



      </Routes>
    </Router>
  );
}

export default App;