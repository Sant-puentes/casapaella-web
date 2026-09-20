// src/utils/calendar.ts
//
// Envía la reserva a un Web App de Google Apps Script, que la guarda
// directamente en Google Calendar con CalendarApp.createEvent(...).
//
// IMPORTANTE: reemplaza APPS_SCRIPT_URL de abajo por la URL que te da
// Google al implementar tu proyecto de Apps Script (termina en /exec).
//
// Usamos mode: 'no-cors' porque Apps Script no agrega cabeceras CORS a su
// respuesta. Esto significa que no podemos leer si tuvo éxito o no desde
// aquí, pero el envío sí llega y el evento sí se crea; por eso este flujo
// es "dispara y olvida", en paralelo a la apertura de WhatsApp.

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/TU_ID_DE_IMPLEMENTACION/exec';

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

export function saveReservationToCalendar(data: ReservationData): void {
  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    // text/plain evita que el navegador dispare un preflight OPTIONS,
    // que Apps Script no maneja bien.
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data),
  }).catch((err) => {
    // No bloqueamos el flujo de WhatsApp si esto falla (ej. sin internet momentáneo);
    // solo lo dejamos registrado en consola.
    console.error('No se pudo conectar con Apps Script:', err);
  });
}
