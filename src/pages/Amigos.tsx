import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import Navbar from '../components/Navbar';
import ConfirmModal from '../components/ConfirmModal';
import dayjs from 'dayjs';

interface Usuario {
    id: string;
    username: string;
    password?: string; // Solo para el tipo, no deberías exponer esto
}

interface RelacionAmigo {
    id: number;
    estado: 'pendiente' | 'aceptado' | 'rechazado';
    creado_en: string;
    usuario: Usuario;
    amigo: Usuario;
}

interface SolicitudAmistad {
    id: number;
    estado: 'pendiente' | 'aceptado' | 'rechazado';
    creado_en: string;
    solicitante: Usuario;
}

interface AmigoFormateado {
    id: number;
    amigo: Usuario;
    fecha: string;
}

export default function Amigos() {
    const [amigos, setAmigos] = useState<AmigoFormateado[]>([]);
    const [solicitudes, setSolicitudes] = useState<SolicitudAmistad[]>([]);
    const [nuevoAmigo, setNuevoAmigo] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [user, setUser] = useState<Usuario | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [amigoToDelete, setAmigoToDelete] = useState<number | null>(null);
    const [busquedaUsuarios, setBusquedaUsuarios] = useState<Usuario[]>([]);
    const [mostrarBusqueda, setMostrarBusqueda] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            window.location.href = '/login';
            return;
        }
        const userData = JSON.parse(userStr) as Usuario;
        setUser(userData);
        fetchAmigos(userData);
        fetchSolicitudes(userData);
    }, []);

    async function fetchAmigos(user: Usuario) {
        setLoading(true);
        setError('');
        try {
            const { data: amigosData, error: amigosError } = await supabase
                .from('amigos')
                .select(`
                id,
                estado,
                creado_en,
                usuario:usuario_id(id, username),
                amigo:amigo_id(id, username)
            `)
                .or(`usuario_id.eq.${user.id},amigo_id.eq.${user.id}`)
                .eq('estado', 'aceptado');

            if (amigosError) throw amigosError;

            const amigosFormateados = (amigosData as RelacionAmigo[]).map(relacion => {
                const esUsuario = relacion.usuario.id === user.id;
                return {
                    id: relacion.id,
                    amigo: esUsuario ? relacion.amigo : relacion.usuario,
                    fecha: relacion.creado_en
                };
            });

            setAmigos(amigosFormateados);
        } catch (err) {
            setError('Error al cargar amigos: ' + (err instanceof Error ? err.message : 'Error desconocido'));
        } finally {
            setLoading(false);
        }
    }

    async function fetchSolicitudes(user: Usuario) {
        try {
            const { data: solicitudesData, error: solicitudesError } = await supabase
                .from('amigos')
                .select(`
                id,
                estado,
                creado_en,
                usuario:usuario_id(id, username)
            `)
                .eq('amigo_id', user.id)
                .eq('estado', 'pendiente');

            if (solicitudesError) throw solicitudesError;

            const solicitudesFormateadas = (solicitudesData || []).map(solicitud => ({
                id: solicitud.id,
                estado: solicitud.estado,
                creado_en: solicitud.creado_en,
                solicitante: solicitud.usuario as Usuario
            }));

            setSolicitudes(solicitudesFormateadas);
        } catch (err) {
            console.error('Error al cargar solicitudes:', err);
        }
    }

    async function buscarUsuarios(termino: string) {
        if (termino.length < 3) {
            setBusquedaUsuarios([]);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('userstenis')
                .select('id, username')
                .ilike('username', `%${termino}%`)
                .neq('id', user?.id || '')
                .limit(5);

            if (error) throw error;

            const usuariosFiltrados = (data || []).filter(usuario =>
                !amigos.some(a => a.amigo.id === usuario.id) &&
                !solicitudes.some(s => s.solicitante.id === usuario.id)
            );

            setBusquedaUsuarios(usuariosFiltrados as Usuario[]);
            setMostrarBusqueda(true);
        } catch (err) {
            console.error('Error al buscar usuarios:', err);
        }
    }

    async function enviarSolicitud(amigoId: string) {
        if (!user) return;

        setError('');
        setLoading(true);

        try {
            const { data: existeSolicitud, error: existeError } = await supabase
                .from('amigos')
                .select('id')
                .eq('usuario_id', user.id)
                .eq('amigo_id', amigoId)
                .single();

            if (!existeError && existeSolicitud) {
                throw new Error('Ya has enviado una solicitud a este usuario');
            }

            const { error } = await supabase
                .from('amigos')
                .insert([{
                    usuario_id: user.id,
                    amigo_id: amigoId,
                    estado: 'pendiente'
                }]);

            if (error) throw error;

            setSuccess('Solicitud enviada correctamente');
            setNuevoAmigo('');
            setMostrarBusqueda(false);
            fetchSolicitudes(user);
        } catch (err) {
            setError('Error: ' + (err instanceof Error ? err.message : 'Error desconocido'));
        } finally {
            setLoading(false);
        }
    }

    async function responderSolicitud(solicitudId: number, aceptar: boolean) {
        if (!user) return;

        try {
            const { error } = await supabase
                .from('amigos')
                .update({ estado: aceptar ? 'aceptado' : 'rechazado' })
                .eq('id', solicitudId);

            if (error) throw error;

            setSuccess(`Solicitud ${aceptar ? 'aceptada' : 'rechazada'} correctamente`);
            fetchAmigos(user);
            fetchSolicitudes(user);
        } catch (err) {
            setError('Error al responder solicitud: ' + (err instanceof Error ? err.message : 'Error desconocido'));
        }
    }

    const handleDeleteClick = (id: number) => {
        setAmigoToDelete(id);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!amigoToDelete || !user) return;

        setDeletingId(amigoToDelete);
        setError('');
        setSuccess('');

        try {
            const { error } = await supabase
                .from('amigos')
                .delete()
                .eq('id', amigoToDelete);

            if (error) throw error;

            setAmigos(prev => prev.filter(a => a.id !== amigoToDelete));
            setSuccess('Amigo eliminado correctamente');
        } catch (err) {
            setError('Error al eliminar amigo: ' + (err instanceof Error ? err.message : 'Error desconocido'));
        } finally {
            setDeletingId(null);
            setShowConfirm(false);
            setAmigoToDelete(null);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 pt-24">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                            Mis Amigos
                        </h1>
                        {user && (
                            <p className="text-xl text-blue-600">
                                Gestiona tus amigos y solicitudes de amistad
                            </p>
                        )}
                    </div>

                    {/* Mensajes */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                            {success}
                        </div>
                    )}

                    {/* Solicitudes pendientes */}
                    {solicitudes.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Solicitudes pendientes</h2>
                            <div className="space-y-3">
                                {solicitudes.map((solicitud) => (
                                    <div key={solicitud.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                {solicitud.solicitante.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium">{solicitud.solicitante.username}</div>
                                                <div className="text-xs text-gray-500">
                                                    {dayjs(solicitud.creado_en).format('DD/MM/YYYY')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => responderSolicitud(solicitud.id, true)}
                                                className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm"
                                            >
                                                Aceptar
                                            </button>
                                            <button
                                                onClick={() => responderSolicitud(solicitud.id, false)}
                                                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm"
                                            >
                                                Rechazar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Formulario para agregar amigos */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Enviar solicitud de amistad</h2>
                        <div className="relative">
                            <input
                                type="text"
                                value={nuevoAmigo}
                                onChange={(e) => {
                                    setNuevoAmigo(e.target.value);
                                    buscarUsuarios(e.target.value);
                                }}
                                placeholder="Buscar usuario..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {mostrarBusqueda && busquedaUsuarios.length > 0 && (
                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {busquedaUsuarios.map((usuario) => (
                                        <div
                                            key={usuario.id}
                                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                                            onClick={() => {
                                                enviarSolicitud(usuario.id);
                                                setNuevoAmigo(usuario.username);
                                            }}
                                        >
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                {usuario.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium">{usuario.username}</div>
                                                {usuario.nombre && (
                                                    <div className="text-xs text-gray-500">{usuario.nombre}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lista de amigos */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Mis amigos ({amigos.length})
                            </h2>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : amigos.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No tienes amigos agregados aún.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {amigos.map((amigo) => (
                                    <div key={amigo.id} className="p-4 hover:bg-gray-50 transition flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                {amigo.amigo.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium">{amigo.amigo.username}</div>
                                                {amigo.amigo.nombre && (
                                                    <div className="text-xs text-gray-500">{amigo.amigo.nombre}</div>
                                                )}
                                                <div className="text-xs text-gray-400">
                                                    Amigos desde: {dayjs(amigo.fecha).format('DD/MM/YYYY')}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteClick(amigo.id)}
                                            disabled={deletingId === amigo.id}
                                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm disabled:opacity-50"
                                        >
                                            {deletingId === amigo.id ? 'Eliminando...' : 'Eliminar'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={showConfirm}
                title="Eliminar amigo"
                message="¿Estás seguro de que quieres eliminar este amigo de tu lista?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
}