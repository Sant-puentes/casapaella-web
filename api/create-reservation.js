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

// Tu formulario envía la hora en formato de 12 horas, ej. "12:30 PM" o "6:00 PM"
// (así la genera src/utils/schedule.ts). Esta función la convierte a 24 horas
// ("12:30" / "18:00") para poder construir un Date válido.
function to24Hour(time12h) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec((time12h || '').trim());
  if (!match) return null;

  let [, hourStr, minuteStr, period] = match;
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
  if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;

  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

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

    // Convierte "12:30 PM" -> "12:30" antes de armar la fecha/hora en Bogotá (UTC-5).
    const time24 = to24Hour(time);
    if (!time24) {
      return res.status(400).json({ error: `Formato de hora no reconocido: "${time}"` });
    }

    const start = new Date(`${date}T${time24}:00-05:00`);
    if (isNaN(start.getTime())) {
      return res.status(400).json({ error: `Fecha u hora inválida: "${date} ${time}"` });
    }
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
    return res.status(500).json({ error: 'No se pudo guardar la reserva en el calendario', detail: err.message });
  }
}
