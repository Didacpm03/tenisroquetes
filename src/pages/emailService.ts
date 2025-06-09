import { supabase } from '../../supabaseClient';
import dayjs from 'dayjs';

interface ReservaConUsuario {
  id?: number;
  fecha: string;
  hora: string;
  pista: number;
  jugador1: string;
  jugador2: string;
  tipo: string;
  user_id: string;
}

export async function sendReservationReminder(reserva: ReservaConUsuario) {
  try {
    // 1. Verificar configuración de notificaciones
    const { data: settings, error: settingsError } = await supabase
      .from('notification_settings')
      .select('reservation_reminder, email')
      .eq('user_id', reserva.user_id)
      .single();

    if (settingsError || !settings?.reservation_reminder) {
      console.log('Notifications disabled or settings error');
      return;
    }

    // 2. Obtener email del usuario
    const { data: userData, error: userError } = await supabase
      .from('userstenis')
      .select('email')
      .eq('id', reserva.user_id)
      .single();

    if (userError) {
      console.error('Error fetching user email:', userError);
      return;
    }

    const userEmail = userData?.email || settings.email;
    if (!userEmail) {
      console.log('No email found for user');
      return;
    }

    // 3. Construir contenido del email
    const emailContent = `
      <h1>Confirmación de reserva</h1>
      <p>Tu reserva ha sido realizada con éxito:</p>
      <p><strong>Fecha:</strong> ${dayjs(reserva.fecha).format('DD/MM/YYYY')}</p>
      <p><strong>Hora:</strong> ${reserva.hora.substring(0, 5)}</p>
      <p><strong>Pista:</strong> ${reserva.pista} (${reserva.tipo === 'padel' ? 'Pádel' : reserva.tipo === 'tierra' ? 'Tierra batida' : 'Pista rápida'})</p>
      <p><strong>Jugadores:</strong> ${reserva.jugador1} ${reserva.jugador2 ? 'y ' + reserva.jugador2 : ''}</p>
      <p><br></p>
      <p>Recibirás un recordatorio 1 hora antes de tu partido.</p>
    `;

    // 4. Guardar email en la base de datos
    const { error: emailError } = await supabase
      .from('emails')
      .insert([{
        to_email: userEmail,
        subject: `Confirmación de reserva - ${dayjs(reserva.fecha).format('DD/MM')}`,
        html_content: emailContent,
        status: 'pending'
      }]);

    if (emailError) throw emailError;

    console.log('Email queued successfully');
  } catch (error) {
    console.error('Error in sendReservationReminder:', error);
  }
}

export async function sendReminderEmails() {
  try {
    // Obtener reservas que empiezan en la próxima hora
    const now = dayjs();
    const oneHourLater = now.add(1, 'hour');
    
    const { data: upcomingReservations } = await supabase
      .from('reservas')
      .select('*')
      .gte('fecha', now.format('YYYY-MM-DD'))
      .lte('fecha', oneHourLater.format('YYYY-MM-DD'))
      .gte('hora', now.format('HH:mm:ss'))
      .lte('hora', oneHourLater.format('HH:mm:ss'));

    const { data: upcomingPadelReservations } = await supabase
      .from('reservas_padel')
      .select('*')
      .gte('fecha', now.format('YYYY-MM-DD'))
      .lte('fecha', oneHourLater.format('YYYY-MM-DD'))
      .gte('hora', now.format('HH:mm:ss'))
      .lte('hora', oneHourLater.format('HH:mm:ss'));

    const allReservations = [
      ...(upcomingReservations || []).map(r => ({ ...r, tipo: 'tenis' })),
      ...(upcomingPadelReservations || []).map(r => ({ ...r, tipo: 'padel' }))
    ];

    for (const reserva of allReservations) {
      try {
        // Obtener user_id para cada reserva
        const { data: userData } = await supabase
          .from('userstenis')
          .select('id')
          .eq('username', reserva.jugador1)
          .single();

        if (userData) {
          await sendReservationReminder({
            ...reserva,
            user_id: userData.id
          });
        }
      } catch (err) {
        console.error(`Error enviando recordatorio para reserva ${reserva.id}:`, err);
      }
    }
  } catch (error) {
    console.error('Error en sendReminderEmails:', error);
  }
}

