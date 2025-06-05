import { useState } from "react";
import { supabase } from "../../supabaseClient";

type Reserva = {
  id: number;
  jugador1: string;
  jugador2: string;
  pista: number;
  duracion: number;
  fecha: string;
};

export default function AdminReservas() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null);

  // Estado para controlar modal de confirmación
  const [modalReservaId, setModalReservaId] = useState<number | null>(null);

  const handleLogin = async () => {
    setError("");
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      await fetchReservas();
    } else {
      setError("Credenciales incorrectas");
    }
  };

  const fetchReservas = async () => {
    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .order("fecha", { ascending: true });

    if (error) {
      console.error("Error al cargar reservas:", error.message);
      setError("Error al cargar reservas");
      return;
    }

    setReservas(data || []);
  };

  const handleEliminarReserva = async (id: number) => {
    setError("");
    setSuccessMsg("");
    setLoadingDeleteId(id);

    const { error } = await supabase.from("reservas").delete().eq("id", id);

    if (error) {
      setError("Error al eliminar la reserva: " + error.message);
      setLoadingDeleteId(null);
      setModalReservaId(null);
      return;
    }

    setReservas((prev) => prev.filter((r) => r.id !== id));
    setLoadingDeleteId(null);
    setModalReservaId(null);
    setSuccessMsg("Reserva eliminada correctamente");
  };

  const groupByDate = (reservas: Reserva[]) => {
    return reservas.reduce((acc, reserva) => {
      const day = reserva.fecha.split("T")[0];
      if (!acc[day]) acc[day] = [];
      acc[day].push(reserva);
      return acc;
    }, {} as Record<string, Reserva[]>);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Login de Admin</h2>
          <input
            type="text"
            placeholder="Usuario"
            className="w-full mb-2 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full mb-2 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  const reservasPorDia = groupByDate(reservas);
  const diasOrdenados = Object.keys(reservasPorDia).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <main className="min-h-screen bg-gray-50 p-8 relative">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
        Panel de Administración – Reservas
      </h1>

      {/* Mensajes */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-green-100 text-green-700 rounded">
          {successMsg}
        </div>
      )}

      {reservas.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No hay reservas registradas.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-10">
          {diasOrdenados.map((dia) => (
            <section key={dia} className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-center text-3xl font-semibold text-indigo-700 mb-8">
                {new Date(dia).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {reservasPorDia[dia].map((reserva) => (
                  <article
                    key={reserva.id}
                    className="bg-indigo-50 rounded-xl p-5 shadow-sm border border-indigo-100 hover:shadow-md transition-shadow duration-300 relative"
                  >
                    <p className="text-gray-700 text-m">
                      <span className="font-medium">Jugador 1:</span> {reserva.jugador1}
                    </p>
                    <p className="text-gray-700 text-m">
                      <span className="font-medium">Jugador 2:</span> {reserva.jugador2}
                    </p>
                    <p className="text-gray-700 text-m">
                      <span className="font-medium">Pista:</span> {reserva.pista}
                    </p>
                    <p className="text-gray-700 text-m">
                      <span className="font-medium">Duración:</span> {reserva.duracion} minutos
                    </p>

                    <button
                      onClick={() => setModalReservaId(reserva.id)}
                      disabled={loadingDeleteId === reserva.id}
                      className="absolute top-3 right-3 text-red-600 hover:text-red-800 font-semibold"
                      title="Eliminar reserva"
                    >
                      {loadingDeleteId === reserva.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Modal confirmación */}
      {modalReservaId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Confirmar eliminación
            </h3>
            <p className="mb-6 text-gray-700">
              ¿Seguro que quieres eliminar esta reserva? Esta acción no se puede
              deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModalReservaId(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleEliminarReserva(modalReservaId)}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                disabled={loadingDeleteId === modalReservaId}
              >
                {loadingDeleteId === modalReservaId ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
