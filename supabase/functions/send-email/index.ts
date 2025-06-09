import { serve } from 'https://deno.land/std@0.181.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async () => {
  try {
    // Obtener emails pendientes
    const { data: pendingEmails, error } = await supabase
      .from('emails')
      .select('*')
      .eq('status', 'pending')
      .limit(10);

    if (error) throw error;
    if (!pendingEmails || pendingEmails.length === 0) {
      return new Response(JSON.stringify({ message: 'No pending emails' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Procesar cada email
    for (const email of pendingEmails) {
      try {
        // Aquí deberías integrar con tu servicio de email (SendGrid, Mailgun, etc.)
        // Ejemplo con Supabase SMTP (necesitas configurarlo primero)
        const { error: sendError } = await supabase
          .from('emails')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString()
          })
          .eq('id', email.id);

        if (sendError) throw sendError;
        
        console.log(`Email sent to ${email.to_email}`);
      } catch (err) {
        console.error(`Error sending email ${email.id}:`, err);
        await supabase
          .from('emails')
          .update({ status: 'failed' })
          .eq('id', email.id);
      }
    }

    return new Response(JSON.stringify({ success: true, processed: pendingEmails.length }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});