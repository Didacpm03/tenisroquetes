import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryPage from './pages/CategoryPage';
import AdminLogin from './pages/adminlogin'; // Importa la nueva página
import AdminPage from './pages/adminpage'; // 👈 Asegúrate de importar esto
import AddProduct from './pages/addproduct';
import AdminUsers from './pages/AdminUsers';
import GiftCards from './pages/GiftCards';
import MisTarjetas from './pages/MisTarjetas';
import Configuracion from './pages/Configuracion';
import Regalos from './pages/Regalos'; // Importamos la nueva página









function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/new-arrivals" element={<CategoryPage />} />
        <Route path="/sale" element={<CategoryPage />} />
        <Route path="/admin-login" element={<AdminLogin />} /> {/* Nueva ruta */}
        <Route path="/admin" element={<AdminPage />} /> {/* 👈 Añadida ruta para el panel admin */}
        <Route path="/admin/add-product" element={<AddProduct />} /> {/* Ruta para añadir producto */}
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/giftcards" element={<GiftCards />} />
        <Route path="/mis-tarjetas" element={<MisTarjetas />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/regalos" element={<Regalos />} /> {/* Ruta para la nueva página */}





        {/* Aquí puedes añadir más rutas según sea necesario */}

      </Routes>
    </Router>
  );
}

export default App;