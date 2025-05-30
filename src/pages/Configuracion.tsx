import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Props {
  loggedUser: any;
  setLoggedUser: (user: any) => void;
}

const Configuracion: React.FC<Props> = ({ loggedUser, setLoggedUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
    navigate('/');
    window.location.reload();
  };

  const irASeguimiento = () => {
    navigate('/seguimiento');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <Navbar onCartClick={() => {}} loggedUser={loggedUser} handleLogout={handleLogout} />

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200">
          <h1 className="text-4xl font-bold text-center text-gray-800">Centro de Usuario</h1>

          <p className="text-center text-gray-600 text-lg">
            Desde aquí puedes consultar el estado de tus pedidos.
          </p>

          <div className="flex justify-center">
            <button
              onClick={irASeguimiento}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-3 rounded-full shadow-md transition duration-300"
            >
              Ver Seguimiento
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Configuracion;
