// pages/EstadisticasJugador.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

interface Partido {
    id: number;
    jugador1: string;
    jugador2?: string;
    jugador3?: string;
    jugador4?: string;
    fecha: string;
    hora: string;
    pista: number;
    tipo: 'tenis' | 'padel';
    victoria?: string | null;  // Nombre del jugador que ganó
    derrota?: string | null;   // Nombre del jugador que perdió
}

export default function EstadisticasJugador() {
    const [username, setUsername] = useState('');
    const [jugadorEncontrado, setJugadorEncontrado] = useState<any>(null);
    const [partidos, setPartidos] = useState<Partido[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState<any>(null);
    const [puntuandoId, setPuntuandoId] = useState<number | null>(null);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) setUser(JSON.parse(userStr));
    }, []);

    const buscarJugador = async () => {
        if (!username.trim()) {
            setError('Ingresa un nombre de usuario');
            return;
        }

        setLoading(true);
        setError('');
        setJugadorEncontrado(null);
        setPartidos([]);

        try {
            // Buscar usuario
            const { data: userData, error: userError } = await supabase
                .from('userstenis')
                .select('*')
                .ilike('username', username)
                .single();

            if (userError || !userData) {
                throw new Error('Jugador no encontrado');
            }

            setJugadorEncontrado(userData);

            const { data: tenisData, error: tenisError } = await supabase
                .from('reservas')
                .select('*')
                .or(`jugador1.eq.${username},jugador2.eq.${username},jugador3.eq.${username},jugador4.eq.${username}`)
                .lte('fecha', dayjs().format('YYYY-MM-DD'));

            if (tenisError) throw tenisError;

            // CONSULTA PARA PARTIDOS DE PÁDEL - DEBE IR AQUÍ (justo después de tenisData)
            const { data: padelData, error: padelError } = await supabase
                .from('reservas_padel')
                .select('*')
                .or(`jugador1.eq.${username},jugador2.eq.${username},jugador3.eq.${username},jugador4.eq.${username}`)
                .lte('fecha', dayjs().format('YYYY-MM-DD'));

            if (padelError) throw padelError;

            // Combinar y marcar tipo
            const partidosTenis = (tenisData || []).map(p => ({ ...p, tipo: 'tenis' }));
            const partidosPadel = (padelData || []).map(p => ({ ...p, tipo: 'padel' }));

            const todosPartidos = [...partidosTenis, ...partidosPadel]
                .sort((a, b) => dayjs(`${b.fecha} ${b.hora}`).diff(dayjs(`${a.fecha} ${a.hora}`)));

            setPartidos(todosPartidos);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }


    const puntuarPartido = async (partidoId: number, tipo: 'tenis' | 'padel', resultado: 'victoria' | 'derrota') => {
        if (!user) return;

        setPuntuandoId(partidoId);
        try {
            const tableName = tipo === 'padel' ? 'reservas_padel' : 'reservas';

            // Actualizar la base de datos
            const { error } = await supabase
                .from(tableName)
                .update({
                    [resultado]: user.username,  // Guardamos el nombre del usuario
                    [resultado === 'victoria' ? 'derrota' : 'victoria']: null
                })
                .eq('id', partidoId);

            if (error) throw error;

            // Actualizar estado local
            setPartidos(prev => prev.map(p =>
                p.id === partidoId ? {
                    ...p,
                    [resultado]: user.username,
                    [resultado === 'victoria' ? 'derrota' : 'victoria']: null
                } : p
            ));
        } catch (err) {
            setError('Error al puntuar partido: ' + (err instanceof Error ? err.message : 'Error desconocido'));
        } finally {
            setPuntuandoId(null);
        }
    };

    const getResultadoBadge = (partido: Partido) => {
        if (partido.victoria === jugadorEncontrado?.username) {
            return <span className="px-2 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-medium">VICTORIA</span>;
        }
        if (partido.derrota === jugadorEncontrado?.username) {
            return <span className="px-2 py-1 rounded-full bg-red-900/30 text-red-400 text-xs font-medium">DERROTA</span>;
        }
        return <span className="px-2 py-1 rounded-full bg-gray-700 text-gray-400 text-xs font-medium">SIN PUNTUAR</span>;
    };

    const getPartidosPorMes = () => {
        const partidosPorMes: Record<string, Partido[]> = {};

        partidos.forEach(partido => {
            const mes = dayjs(partido.fecha).format('MMMM YYYY').toUpperCase();
            if (!partidosPorMes[mes]) {
                partidosPorMes[mes] = [];
            }
            partidosPorMes[mes].push(partido);
        });

        return partidosPorMes;
    };

    const puedePuntuar = (partido: Partido) => {
        if (!user) return false;

        const esJugador = (
            partido.jugador1 === user.username ||
            partido.jugador2 === user.username ||
            partido.jugador3 === user.username ||
            partido.jugador4 === user.username
        );

        const yaPuntuado = (
            partido.victoria === user.username ||
            partido.derrota === user.username
        );

        return esJugador && !yaPuntuado && dayjs(partido.fecha).isBefore(dayjs(), 'day');
    };  // <-- Quitar la 's' que está aquí

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 pt-24">
                <div className="max-w-6xl mx-auto">
                    {/* Encabezado futurista */}
                    <div className="mb-12 text-center">
                        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 animate-gradient-x">
                            ESTADÍSTICAS DE JUGADOR
                        </h1>
                        <p className="text-xl text-gray-300">
                            Busca y analiza el rendimiento de cualquier jugador
                        </p>
                    </div>

                    {/* Barra de búsqueda futurista */}
                    <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700 backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Nombre de usuario"
                                className="flex-1 px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button
                                onClick={buscarJugador}
                                disabled={loading}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        BUSCANDO...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        BUSCAR JUGADOR
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-900/30 border border-red-800 text-red-400 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    {/* Resultados */}
                    {jugadorEncontrado && (
                        <div className="space-y-8">
                            {/* Resumen */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                    <h3 className="text-lg text-gray-400 mb-2">TOTAL PARTIDOS</h3>
                                    <p className="text-4xl font-bold text-cyan-400">
                                        {partidos.length}
                                    </p>
                                </div>
                                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                
                                    <h3 className="text-lg text-gray-400 mb-2">VICTORIAS</h3>
                                    <p className="text-4xl font-bold text-green-400">
                                        {partidos.filter(p => p.victoria === jugadorEncontrado.username).length}
                                    </p>
                                </div>
                                 <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                    <h3 className="text-lg text-gray-400 mb-2">% VICTORIAS</h3>
                                    <p className="text-4xl font-bold text-purple-400">
                                        {partidos.length > 0
                                            ? Math.round(
                                                (partidos.filter(p => p.victoria === jugadorEncontrado.username).length /
                                                    partidos.length) * 100
                                            )
                                            : 0}%
                                    </p>
                                </div>
                                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                    <h3 className="text-lg text-gray-400 mb-2">DERROTAS</h3>
                                    <p className="text-4xl font-bold text-red-400">
                                        {partidos.filter(p => p.derrota === jugadorEncontrado.username).length}
                                    </p>
                                </div>
                              
                               
                            </div>

                            {/* Detalle por mes */}
                            {Object.entries(getPartidosPorMes()).map(([mes, partidosMes]) => (
                                <div key={mes} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden backdrop-blur-sm">
                                    <div className="p-5 bg-gray-700/30 border-b border-gray-700">
                                        <h3 className="text-xl font-bold text-purple-400">{mes}</h3>
                                    </div>
                                    <div className="divide-y divide-gray-700">
                                        {partidosMes.map((partido, index) => (
                                            <div key={partido.id} className="p-5 hover:bg-gray-700/30 transition-all">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${partido.tipo === 'padel'
                                                                ? 'bg-purple-900/50 text-purple-400'
                                                                : 'bg-blue-900/50 text-blue-400'
                                                                }`}>
                                                                {partido.tipo === 'padel' ? 'PÁDEL' : 'TENNIS'} - Pista {partido.pista}
                                                            </span>
                                                            {getResultadoBadge(partido)}
                                                        </div>
                                                        <h4 className="text-lg font-bold text-white mb-1">
                                                            {dayjs(partido.fecha).format('DD/MM/YYYY')} - {partido.hora.substring(0, 5)}
                                                        </h4>
                                                        <div className="flex flex-wrap gap-3 mt-3">
                                                            <div className="flex items-center">
                                                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xs mr-2">
                                                                    {partido.jugador1.charAt(0).toUpperCase()}
                                                                </div>
                                                                <span className="text-gray-200">{partido.jugador1}</span>
                                                            </div>
                                                            {partido.jugador2 && (
                                                                <div className="flex items-center">
                                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs mr-2">
                                                                        {partido.jugador2.charAt(0).toUpperCase()}
                                                                    </div>
                                                                    <span className="text-gray-200">{partido.jugador2}</span>
                                                                </div>
                                                            )}
                                                            {partido.jugador3 && (
                                                                <div className="flex items-center">
                                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold text-xs mr-2">
                                                                        {partido.jugador3.charAt(0).toUpperCase()}
                                                                    </div>
                                                                    <span className="text-gray-200">{partido.jugador3}</span>
                                                                </div>
                                                            )}
                                                            {partido.jugador4 && (
                                                                <div className="flex items-center">
                                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-xs mr-2">
                                                                        {partido.jugador4.charAt(0).toUpperCase()}
                                                                    </div>
                                                                    <span className="text-gray-200">{partido.jugador4}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                   
                                                    {puedePuntuar(partido) && (
                                                        <div className="flex flex-col gap-2">
                                                            <button
                                                                onClick={() => puntuarPartido(partido.id, partido.tipo, 'victoria')}
                                                                disabled={puntuandoId === partido.id}
                                                                className={`px-4 py-2 rounded-lg text-sm font-medium ${puntuandoId === partido.id
                                                                    ? 'bg-gray-700 text-gray-400'
                                                                    : 'bg-green-900/30 text-green-400 hover:bg-green-800/50'
                                                                    }`}
                                                            >
                                                                {puntuandoId === partido.id ? 'PUNTUANDO...' : 'VICTORIA'}
                                                            </button>
                                                            <button
                                                                onClick={() => puntuarPartido(partido.id, partido.tipo, 'derrota')}
                                                                disabled={puntuandoId === partido.id}
                                                                className={`px-4 py-2 rounded-lg text-sm font-medium ${puntuandoId === partido.id
                                                                    ? 'bg-gray-700 text-gray-400'
                                                                    : 'bg-red-900/30 text-red-400 hover:bg-red-800/50'
                                                                    }`}
                                                            >
                                                                {puntuandoId === partido.id ? 'PUNTUANDO...' : 'DERROTA'}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}