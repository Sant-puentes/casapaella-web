// Horario de reservas de Casa Paella:
// - Lunes y domingo: un solo turno, 12:00 PM - 3:00 PM
// - Martes a sábado: dos turnos, 12:00 PM - 3:00 PM y 6:00 PM - 9:00 PM
const STEP_MINUTES = 30;

function minutesTo12Hour(totalMinutes: number): string {
  const h24 = Math.floor(totalMinutes / 60) % 24;
  const min = totalMinutes % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${min.toString().padStart(2, '0')} ${period}`;
}

/** Devuelve las horas disponibles (en formato 12h, ej. "12:30 PM") para una fecha "YYYY-MM-DD". */
export function getReservationSlots(dateStr: string): string[] {
  if (!dateStr) return [];

  // Se parsea como fecha local (no UTC) para que el día de la semana sea correcto
  // sin importar la zona horaria del navegador.
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return [];
  const dow = new Date(year, month - 1, day).getDay(); // 0 = domingo ... 6 = sábado

  const ranges: [number, number][] =
    dow === 0 || dow === 1
      ? [[12 * 60, 15 * 60]] // Lunes y domingo: 12:00 - 15:00
      : [
          [12 * 60, 15 * 60], // 12:00 - 15:00
          [18 * 60, 21 * 60], // 18:00 - 21:00
        ];

  const slots: string[] = [];
  for (const [start, end] of ranges) {
    for (let m = start; m <= end; m += STEP_MINUTES) {
      slots.push(minutesTo12Hour(m));
    }
  }
  return slots;
}

/** Fecha de hoy en formato "YYYY-MM-DD", en hora local (evita el corrimiento de un día que da UTC). */
export function getTodayLocalISODate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = (now.getMonth() + 1).toString().padStart(2, '0');
  const d = now.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}
