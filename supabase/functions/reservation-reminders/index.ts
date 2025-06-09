import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { sendReminderEmails } from '../../../src/pages/emailService';

serve(async () => {
  try {
    await sendReminderEmails();
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
