import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminLogged'); // o el token que uses
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => {}} />

      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Panel de Administración</h1>
          <p className="text-lg text-gray-600 mb-12">Gestiona tu tienda de forma rápida y sencilla.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/admin/add-product')}
              className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow hover:bg-blue-700 transition"
            >
              ➕ Añadir Producto
            </button>
            <button
              onClick={() => navigate('/admin/users')}
              className="bg-green-600 text-white px-6 py-4 rounded-lg shadow hover:bg-green-700 transition"
            >
              👤 Ver Usuarios
            </button>
            <button
              onClick={() => navigate('/admin/products')}
              className="bg-yellow-500 text-white px-6 py-4 rounded-lg shadow hover:bg-yellow-600 transition"
            >
              📦 Ver Productos
            </button>
            <button
              onClick={handleLogout}
              className="col-span-1 sm:col-span-2 lg:col-span-3 bg-red-500 text-white px-6 py-4 rounded-lg shadow hover:bg-red-600 transition"
            >
              🔒 Cerrar sesión del administrador
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
