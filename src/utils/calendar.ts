// src/utils/calendar.ts
//
// Llama a la función serverless /api/create-reservation.js para guardar
// la reserva en Google Calendar. Se ejecuta desde el navegador, pero
// las credenciales de Google nunca viajan hasta aquí: solo se llama
// a nuestro propio endpoint, que vive en el servidor.

export interface ReservationData {
  name: string;
  phone: string;
  people: string;
  date: string;
  time: string;
  occasion: string;
  decoration: boolean;
  decorationType: string;
}

export async function saveReservationToCalendar(data: ReservationData): Promise<boolean> {
  try {
    const res = await fetch('/api/create-reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error('El servidor no pudo guardar la reserva en Calendar:', await res.text());
      return false;
    }
    return true;
  } catch (err) {
    // No bloqueamos el flujo de WhatsApp si esto falla (ej. sin internet momentáneo);
    // simplemente lo dejamos registrado en consola.
    console.error('No se pudo conectar con el servidor de reservas:', err);
    return false;
  }
}
