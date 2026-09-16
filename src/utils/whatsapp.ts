import { restaurantInfo } from '@/data';

export function formatPrice(price: number): string {
  return '$' + price.toLocaleString('es-CO');
}

export function sendWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${restaurantInfo.whatsapp}?text=${encoded}`, '_blank');
}

export function buildOrderMessage(
  items: { dish: { name: string; price: number }; quantity: number }[],
  total: number
): string {
  let msg = '🥘 *NUEVO PEDIDO - Casa Paella*\n\n';
  items.forEach((item, i) => {
    msg += `${i + 1}. ${item.dish.name}\n`;
    msg += `   ${item.quantity} x ${formatPrice(item.dish.price)} = ${formatPrice(item.dish.price * item.quantity)}\n\n`;
  });
  msg += `*TOTAL: ${formatPrice(total)}*\n\n`;
  msg += '¡Gracias por tu pedido!';
  return msg;
}

export function buildReservationMessage(data: {
  name: string;
  phone: string;
  people: string;
  date: string;
  time: string;
  occasion: string;
  decoration: boolean;
}): string {
  let msg = '🥘 *NUEVA RESERVA - Casa Paella*\n\n';
  msg += `*Nombre:* ${data.name}\n`;
  msg += `*Teléfono:* ${data.phone}\n`;
  msg += `*Personas:* ${data.people}\n`;
  msg += `*Fecha:* ${data.date}\n`;
  msg += `*Hora:* ${data.time}\n`;
  msg += `*Ocasión:* ${data.occasion}\n`;
  if (data.decoration) {
    msg += `*Decoración especial:* Sí (+$35,000 - mesa decorada y postre de cortesía)\n`;
  } else {
    msg += `*Decoración especial:* No\n`;
  }
  msg += '\n¡Esperamos su confirmación!';
  return msg;
}

export function buildEventQuoteMessage(data: {
  people: string;
  address: string;
  paellaType: string;
  date: string;
}): string {
  let msg = '🥘 *COTIZACIÓN DE EVENTO - Casa Paella*\n\n';
  msg += `*Número de personas:* ${data.people}\n`;
  msg += `*Dirección del evento:* ${data.address}\n`;
  msg += `*Tipo de paella:* ${data.paellaType}\n`;
  msg += `*Fecha del evento:* ${data.date}\n`;
  msg += '\n¡Esperamos su cotización!';
  return msg;
}
