import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Trash2, ShoppingCart } from 'lucide-react';

interface UserClient {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  saldo: number; // 👈 Añadido saldo
}


const AdminUsers: React.FC = () => {
  const [clients, setClients] = useState<UserClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('usersdos')
.select('user_id, first_name, last_name, email, username, saldo')

      if (error) {
        console.error('Error al obtener usuarios:', error.message);
      } else {
        setClients(data || []);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    const { error } = await supabase.from('usersdos').delete().eq('user_id', userId);
    if (error) {
      console.error('Error al borrar usuario:', error.message);
    } else {
      setClients((prev) => prev.filter((client) => client.user_id !== userId));
      setConfirmDeleteId(null);
    }
  };

  const handleViewPurchases = (userId: number) => {
    console.log('Ver compras del usuario con ID:', userId);
    // Redirige o muestra las compras aquí
  };

  return (
    <div className="min-h-screen flex flex-col"><br></br>
      <Navbar onCartClick={() => {}} /><br></br>
      <main className="flex-grow bg-gray-100 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-center">Clientes Registrados</h1>

        <a
          href="http://localhost:5173/admin"
          className="mb-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          ⬅️ Volver
        </a>

        {loading ? (
          <p className="text-center text-gray-500">Cargando usuarios...</p>
        ) : (
          <div className="w-full max-w-6xl overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg text-sm text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-2">ID</th>
                  <th className="py-2 px-2">Nombre</th>
                  <th className="py-2 px-2">Apellido</th>
                  <th className="py-2 px-2">Username</th>
                  <th className="py-2 px-2">Email</th>
                  <th className="py-2 px-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.user_id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2">{client.user_id}</td>
                    <td className="py-2 px-2">{client.first_name}</td>
                    <td className="py-2 px-2">{client.last_name}</td>
                    <td className="py-2 px-2">{client.username}</td>
                    <td className="py-2 px-2">{client.email}</td>
                    <td className="py-2 px-2">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setConfirmDeleteId(client.user_id)}
                          className="text-red-500 hover:text-red-700"
                          title="Borrar usuario"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => handleViewPurchases(client.user_id)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Ver compras"
                        >
                          <ShoppingCart size={18} />
                        </button>
                      </div>

                      {confirmDeleteId === client.user_id && (
                        <div className="mt-2 bg-red-100 border border-red-300 p-2 rounded text-xs text-center">
                          <p className="mb-1">¿Seguro que quieres borrar al usuario <strong>{client.username}</strong>?</p>
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleDelete(client.user_id)}
                              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                            >
                              Sí
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminUsers;
