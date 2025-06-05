import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale("es");

interface Partido {
  id: number;
  jugador1: string;
  jugador2: string;
  sets_jugador1: number;
  sets_jugador2: number;
  games: Array<{
    set: number;
    games_jugador1: number;
    games_jugador2: number;
  }>;
  fecha: string;
  creado_en: string;
}

export default function Partidos() {
  const [user, setUser] = useState<any>(null);
  const [jugador2, setJugador2] = useState('');
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [games, setGames] = useState<Array<{
    set: number;
    games_jugador1: number;
    games_jugador2: number;
  }>>([
    { set: 1, games_jugador1: 0, games_jugador2: 0 },
    { set: 2, games_jugador1: 0, games_jugador2: 0 },
    { set: 3, games_jugador1: 0, games_jugador2: 0 }
  ]);
  const [setsJugador1, setSetsJugador1] = useState(0);
  const [setsJugador2, setSetsJugador2] = useState(0);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Debes iniciar sesión para registrar partidos.');
      window.location.href = '/login';
      return;
    }

    const user = JSON.parse(userStr);
    setUser(user);
    fetchPartidos(user);
  }, []);

  async function fetchPartidos(user: any) {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('partidos')
        .select('*')
        .or(`jugador1.eq.${user.username},jugador2.eq.${user.username}`)
        .order('fecha', { ascending: false });

      if (error) throw error;

      setPartidos(data || []);
    } catch (err) {
      setError('Error al cargar partidos: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  }

  async function existeUsuario(username: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('userstenis')
      .select('username')
      .eq('username', username);

    return !error && (data?.length ?? 0) > 0;
  }

  function calcularSets() {
    let sets1 = 0;
    let sets2 = 0;

    games.forEach(game => {
      if (game.games_jugador1 > game.games_jugador2) {
        sets1++;
      } else if (game.games_jugador2 > game.games_jugador1) {
        sets2++;
      }
    });

    setSetsJugador1(sets1);
    setSetsJugador2(sets2);
  }

  useEffect(() => {
    calcularSets();
  }, [games]);

  function handleGameChange(setNumber: number, field: 'games_jugador1' | 'games_jugador2', value: number) {
    const newGames = [...games];
    const gameIndex = newGames.findIndex(g => g.set === setNumber);
    
    if (gameIndex !== -1) {
      newGames[gameIndex] = {
        ...newGames[gameIndex],
        [field]: Math.max(0, value)
      };
      setGames(newGames);
    }
  }

  async function guardarPartido() {
    if (!user) return;
    if (!jugador2) {
      setError('Debes ingresar el nombre del oponente');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const existe = await existeUsuario(jugador2);
      if (!existe) {
        setError('El jugador 2 no existe en el sistema');
        setLoading(false);
        return;
      }

      const partidoData = {
        jugador1: user.username,
        jugador2,
        sets_jugador1: setsJugador1,
        sets_jugador2: setsJugador2,
        games,
        fecha: dayjs().format('YYYY-MM-DD')
      };

      if (editandoId) {
        const { error } = await supabase
          .from('partidos')
          .update(partidoData)
          .eq('id', editandoId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('partidos')
          .insert(partidoData);

        if (error) throw error;
      }

      setSuccess(editandoId ? 'Partido actualizado correctamente' : 'Partido registrado correctamente');
      setJugador2('');
      setGames([
        { set: 1, games_jugador1: 0, games_jugador2: 0 },
        { set: 2, games_jugador1: 0, games_jugador2: 0 },
        { set: 3, games_jugador1: 0, games_jugador2: 0 }
      ]);
      setEditandoId(null);
      fetchPartidos(user);
    } catch (err) {
      setError('Error al guardar partido: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  }

  function editarPartido(partido: Partido) {
    setEditandoId(partido.id);
    setJugador2(partido.jugador1 === user?.username ? partido.jugador2 : partido.jugador1);
    setGames(partido.games);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setJugador2('');
    setGames([
      { set: 1, games_jugador1: 0, games_jugador2: 0 },
      { set: 2, games_jugador1: 0, games_jugador2: 0 },
      { set: 3, games_jugador1: 0, games_jugador2: 0 }
    ]);
  }

  function formatearFecha(fecha: string) {
    return dayjs(fecha).format('DD/MM/YYYY');
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Encabezado */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              Registro de Partidos
            </h1>
            {user && (
              <p className="text-xl text-gray-300">
                Hola, <span className="font-semibold text-blue-300">{user.nombre || user.username || user.email.split('@')[0]}</span>
              </p>
            )}
          </div>

          {/* Mensajes */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border-l-4 border-red-500 text-red-200 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-900/50 border-l-4 border-green-500 text-green-200 rounded-lg">
              {success}
            </div>
          )}

          {/* Formulario de registro */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editandoId ? 'Editar Partido' : 'Registrar Nuevo Partido'}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-300 mb-2">Jugador 1 (Tú)</label>
                <div className="bg-gray-700 text-white p-3 rounded-lg font-medium">
                  {user?.nombre || user?.username || user?.email.split('@')[0]}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Jugador 2 (Oponente)</label>
                <input
                  type="text"
                  value={jugador2}
                  onChange={(e) => setJugador2(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Nombre de usuario"
                />
              </div>
            </div>

            {/* Marcador futurista */}
            <div className="bg-gray-900 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">SETS</div>
                  <div className="flex justify-center items-center space-x-4">
                    <div className="text-3xl font-bold text-blue-400">{setsJugador1}</div>
                    <div className="text-gray-500">-</div>
                    <div className="text-3xl font-bold text-purple-400">{setsJugador2}</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">RESULTADO</div>
                  <div className="text-xl font-bold text-white">
                    {setsJugador1 > setsJugador2 ? 'Ganaste' : setsJugador2 > setsJugador1 ? 'Perdiste' : 'Empate'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">FECHA</div>
                  <div className="text-white">{formatearFecha(dayjs().format('YYYY-MM-DD'))}</div>
                </div>
              </div>

              {/* Detalle por sets */}
              <div className="space-y-4">
                {games.map((game) => (
                  <div key={game.set} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Set {game.set}</span>
                      {game.games_jugador1 > game.games_jugador2 ? (
                        <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">Ganado</span>
                      ) : game.games_jugador2 > game.games_jugador1 ? (
                        <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">Perdido</span>
                      ) : (
                        <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded">Empate</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Games Jugador 1</label>
                        <input
                          type="number"
                          min="0"
                          value={game.games_jugador1}
                          onChange={(e) => handleGameChange(game.set, 'games_jugador1', parseInt(e.target.value) || 0)}
                          className="w-full bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Games Jugador 2</label>
                        <input
                          type="number"
                          min="0"
                          value={game.games_jugador2}
                          onChange={(e) => handleGameChange(game.set, 'games_jugador2', parseInt(e.target.value) || 0)}
                          className="w-full bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4">
              {editandoId && (
                <button
                  onClick={cancelarEdicion}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancelar
                </button>
              )}
              <button
                onClick={guardarPartido}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editandoId ? 'Actualizando...' : 'Registrando...'}
                  </>
                ) : (
                  editandoId ? 'Actualizar Partido' : 'Registrar Partido'
                )}
              </button>
            </div>
          </div>

          {/* Lista de partidos */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Mis Partidos</h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : partidos.length === 0 ? (
              <div className="text-center py-12 bg-gray-800/50 rounded-xl">
                <p className="text-gray-400">No has registrado ningún partido aún.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {partidos.map((partido) => {
                  const esJugador1 = partido.jugador1 === user?.username;
                  const oponente = esJugador1 ? partido.jugador2 : partido.jugador1;
                  const setsGanados = esJugador1 ? partido.sets_jugador1 : partido.sets_jugador2;
                  const setsPerdidos = esJugador1 ? partido.sets_jugador2 : partido.sets_jugador1;
                  const resultado = setsGanados > setsPerdidos ? 'victoria' : setsPerdidos > setsGanados ? 'derrota' : 'empate';

                  return (
                    <div key={partido.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${resultado === 'victoria' ? 'bg-green-500' : resultado === 'derrota' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                          <div>
                            <div className="text-sm text-gray-400">vs {oponente}</div>
                            <div className="text-white font-medium">{formatearFecha(partido.fecha)}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center items-center space-x-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400">{setsGanados}</div>
                            <div className="text-xs text-gray-400">sets ganados</div>
                          </div>
                          <div className="text-gray-500 text-xl">-</div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400">{setsPerdidos}</div>
                            <div className="text-xs text-gray-400">sets perdidos</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <button
                            onClick={() => editarPartido(partido)}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-sm"
                          >
                            Editar
                          </button>
                        </div>
                      </div>
                      
                      {/* Detalle de games por set */}
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="grid grid-cols-3 gap-2">
                          {partido.games.map((game) => {
                            const gameGanado = esJugador1 ? 
                              game.games_jugador1 > game.games_jugador2 : 
                              game.games_jugador2 > game.games_jugador1;
                            const gamePerdido = esJugador1 ? 
                              game.games_jugador2 > game.games_jugador1 : 
                              game.games_jugador1 > game.games_jugador2;

                            return (
                              <div key={game.set} className="bg-gray-900/50 rounded p-2 text-center">
                                <div className="text-xs text-gray-400 mb-1">Set {game.set}</div>
                                <div className={`text-sm font-medium ${gameGanado ? 'text-green-400' : gamePerdido ? 'text-red-400' : 'text-gray-400'}`}>
                                  {esJugador1 ? game.games_jugador1 : game.games_jugador2} - {esJugador1 ? game.games_jugador2 : game.games_jugador1}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}