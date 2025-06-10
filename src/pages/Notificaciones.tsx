import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { FiMail, FiBell, FiClock, FiUser, FiCalendar } from 'react-icons/fi';

export default function Notificaciones() {
    const [email, setEmail] = useState('');
    const [, setSavedEmail] = useState('');
    const [notifications, setNotifications] = useState({
        reservationReminder: true,
        matchChallenge: true,
        newEvents: true,
        paymentReminder: true
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setUser(user);
            setEmail(user.email || '');
            setSavedEmail(user.email || '');
            loadNotificationSettings(user.id);
        }
    }, []);

    async function loadNotificationSettings(userId: string) {
        try {
            const { data, error } = await supabase
                .from('notification_settings')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (data) {
                setNotifications({
                    reservationReminder: data.reservation_reminder,
                    matchChallenge: data.match_challenge,
                    newEvents: data.new_events,
                    paymentReminder: data.payment_reminder
                });
            }
        } catch (err) {
            console.error('Error loading notification settings:', err);
        }
    }

    async function saveSettings() {
        if (!email) {
            setError('Por favor ingresa un correo electrónico válido');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Actualizar el email en la tabla de usuarios
            const { error: updateError } = await supabase
                .from('userstenis')
                .update({ email })
                .eq('id', user.id);

            if (updateError) throw updateError;

            // Actualizar local storage
            const updatedUser = { ...user, email };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setSavedEmail(email);

            // Guardar configuraciones de notificación
            const { error: settingsError } = await supabase
                .from('notification_settings')
                .upsert({
                    user_id: user.id,
                    email,
                    reservation_reminder: notifications.reservationReminder,
                    match_challenge: notifications.matchChallenge,
                    new_events: notifications.newEvents,
                    payment_reminder: notifications.paymentReminder,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' });

            if (settingsError) throw settingsError;

            setSuccess('Configuración guardada correctamente');
        } catch (err) {
            setError('Error al guardar configuración: ' + (err instanceof Error ? err.message : 'Error desconocido'));
        } finally {
            setLoading(false);
        }
    }

    const toggleNotification = (type: keyof typeof notifications) => {
        setNotifications(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    return (
        <>
            <Navbar />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-lg bg-black/60"
            >
                <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text text-center drop-shadow-lg animate-gradient"
                    style={{
                        backgroundImage: 'linear-gradient(-45deg, #00FFFF, #FF00FF, #00FF00, #FFFF00, #FF0000, #00FFFF)',
                    }}
                >
                    PRÓXIMAMENTE!
                </h1>


            </motion.div>



            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 pt-24">
                <div className="max-w-4xl mx-auto">
                    {/* Encabezado futurista */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                            🔔 Notificaciones Push
                        </h1>
                        <p className="text-xl text-gray-300">
                            Configura cómo quieres recibir tus notificaciones
                        </p>
                    </motion.div>

                    {/* Panel de configuración */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-gray-700"
                    >
                        <div className="p-8">
                            {/* Campo de email */}
                            <div className="mb-10">
                                <label className="block text-lg font-medium text-cyan-400 mb-3 flex items-center gap-2">
                                    <FiMail className="text-xl" />
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-xl py-4 px-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                        placeholder="tucorreo@ejemplo.com"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <FiMail className="text-gray-400" />
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-400">
                                    Te enviaremos las notificaciones a este correo electrónico
                                </p>
                            </div>

                            {/* Opciones de notificación */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <FiBell className="text-cyan-400" />
                                    Tipo de Notificaciones
                                </h2>

                                {/* Recordatorio de reserva */}
                                <div className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-xl hover:bg-gray-700 transition cursor-pointer"
                                    onClick={() => toggleNotification('reservationReminder')}>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-cyan-900 bg-opacity-30 text-cyan-400">
                                            <FiClock className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white">Recordatorio de reserva</h3>
                                            <p className="text-sm text-gray-400">
                                                Te avisaremos 1 hora antes de tu partido
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${notifications.reservationReminder ? 'bg-cyan-500' : 'bg-gray-600'}`}>
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${notifications.reservationReminder ? 'translate-x-6' : ''}`}></div>
                                    </div>
                                </div>

                                {/* Retos de partidos */}
                                <div className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-xl hover:bg-gray-700 transition cursor-pointer"
                                    onClick={() => toggleNotification('matchChallenge')}>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-purple-900 bg-opacity-30 text-purple-400">
                                            <FiUser className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white">Retos de partidos</h3>
                                            <p className="text-sm text-gray-400">
                                                Te avisaremos cuando alguien te reta a un partido
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${notifications.matchChallenge ? 'bg-purple-500' : 'bg-gray-600'}`}>
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${notifications.matchChallenge ? 'translate-x-6' : ''}`}></div>
                                    </div>
                                </div>

                                {/* Nuevos eventos */}
                                <div className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-xl hover:bg-gray-700 transition cursor-pointer"
                                    onClick={() => toggleNotification('newEvents')}>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-blue-900 bg-opacity-30 text-blue-400">
                                            <FiCalendar className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white">Nuevos eventos</h3>
                                            <p className="text-sm text-gray-400">
                                                Te informaremos sobre torneos y eventos especiales
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${notifications.newEvents ? 'bg-blue-500' : 'bg-gray-600'}`}>
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${notifications.newEvents ? 'translate-x-6' : ''}`}></div>
                                    </div>
                                </div>

                                {/* Recordatorio de pago */}
                                <div className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-xl hover:bg-gray-700 transition cursor-pointer"
                                    onClick={() => toggleNotification('paymentReminder')}>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-yellow-900 bg-opacity-30 text-yellow-400">
                                            <FiBell className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white">Recordatorio de pago</h3>
                                            <p className="text-sm text-gray-400">
                                                Te recordaremos cuando tengas pagos pendientes
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${notifications.paymentReminder ? 'bg-yellow-500' : 'bg-gray-600'}`}>
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${notifications.paymentReminder ? 'translate-x-6' : ''}`}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Mensajes de estado */}
                            {error && (
                                <div className="mt-8 p-4 bg-red-900 bg-opacity-30 border border-red-700 rounded-xl text-red-200">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="mt-8 p-4 bg-green-900 bg-opacity-30 border border-green-700 rounded-xl text-green-200">
                                    {success}
                                </div>
                            )}

                            {/* Botón de guardar */}
                            <div className="mt-10">
                                <button
                                    onClick={saveSettings}
                                    disabled={loading}
                                    className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Guardando...
                                        </>
                                    ) : (
                                        'Guardar Configuración'
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}