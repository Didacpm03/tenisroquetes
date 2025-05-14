// src/pages/AdminLogin.tsx
import React from 'react';
import AdminLoginForm from '../components/AdminLoginForm';
import Navbar from '../components/Navbar'; // Si quieres mostrar la barra de navegación

const AdminLogin: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => {}} />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;
