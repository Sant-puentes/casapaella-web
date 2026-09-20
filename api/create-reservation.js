// api/create-reservation.js
//
// Función serverless de Vercel. Se ejecuta en el servidor (no en el navegador),
// así que aquí SÍ es seguro usar las credenciales de la cuenta de servicio de Google.
//
// Variables de entorno requeridas (configúralas en Vercel → Settings → Environment Variables):
//   GOOGLE_CLIENT_EMAIL   -> el "client_email" del JSON de la cuenta de servicio
//   GOOGLE_PRIVATE_KEY    -> el "private_key" del JSON de la cuenta de servicio (con los \n tal cual)
//   GOOGLE_CALENDAR_ID    -> el ID del calendario compartido con esa cuenta de servicio
//
// Requiere el paquete "googleapis" (ya agregado en package.json).

import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, phone, people, date, time, occasion, decoration, decorationType } = req.body || {};

  if (!name || !phone || !date || !time) {
    return res.status(400).json({ error: 'Faltan datos obligatorios de la reserva' });
  }

  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/calendar']
    );

    const calendar = google.calendar({ version: 'v3', auth });

    // Combina fecha ("2026-09-20") y hora ("13:30") interpretándolas en hora de Bogotá (UTC-5).
    const start = new Date(`${date}T${time}:00-05:00`);
    const durationMinutes = 90; // duración estimada de la mesa; ajústala si lo necesitas
    const end = new Date(start.getTime() + durationMinutes * 60000);

    const decorationText = decoration
      ? `Sí (${decorationType === 'dama' ? 'para dama' : decorationType === 'caballero' ? 'para caballero' : 'sin especificar'})`
      : 'No';

    const event = {
      summary: `Reserva Casa Paella: ${name} (${people} personas)`,
      description:
        `Nombre: ${name}\n` +
        `Teléfono: ${phone}\n` +
        `Personas: ${people}\n` +
        `Ocasión: ${occasion || '—'}\n` +
        `Decoración especial: ${decorationText}`,
      start: { dateTime: start.toISOString(), timeZone: 'America/Bogota' },
      end: { dateTime: end.toISOString(), timeZone: 'America/Bogota' },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    return res.status(200).json({ ok: true, eventId: response.data.id });
  } catch (err) {
    console.error('Error creando evento en Google Calendar:', err);
    return res.status(500).json({ error: 'No se pudo guardar la reserva en el calendario' });
  }
}
