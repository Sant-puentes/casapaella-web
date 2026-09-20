export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
}

export const paellas: Dish[] = [
  {
    id: 'paella-valenciana',
    name: 'Paella Valenciana',
    description: 'La receta original: pollo, conejo, garrofón, judía verde y azafrán puro sobre arroz bomba.',
    price: 38000,
    image: 'https://images.pexels.com/photos/14499018/pexels-photo-14499018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Clásica',
  },
  {
    id: 'paella-mariscos',
    name: 'Paella de Mariscos',
    description: 'Gambas, mejillones, almejas y calamar sobre fumet de pescado casero y azafrán.',
    price: 45000,
    image: 'https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Favorita',
  },
  {
    id: 'paella-mixta',
    name: 'Paella Mixta',
    description: 'Lo mejor de la huerta y el mar: pollo, mariscos, verduras y sofrito lentamente cocinado.',
    price: 42000,
    image: 'https://images.pexels.com/photos/36878063/pexels-photo-36878063.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Popular',
  },
  {
    id: 'paella-negra',
    name: 'Paella Negra',
    description: 'Arroz meloso con tinta de calamar, alioli casero y mariscos frescos del día.',
    price: 48000,
    image: 'https://images.pexels.com/photos/31748679/pexels-photo-31748679.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Especial',
  },
  {
    id: 'arroz-pollo',
    name: 'Arroz con Pollo',
    description: 'Arroz cremoso con pollo, verduras y un toque de pimentón de la Vera.',
    price: 32000,
    image: 'https://images.pexels.com/photos/15508173/pexels-photo-15508173.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'fideua',
    name: 'Fideuá de Mariscos',
    description: 'Fideos finos con calamar, gambas y fumet de pescado, servidos con alioli.',
    price: 40000,
    image: 'https://images.pexels.com/photos/5039341/pexels-photo-5039341.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const tapas: Dish[] = [
  {
    id: 'pulpo-gallega',
    name: 'Pulpo a la Gallega',
    description: 'Pulpo tierno sobre patatas, pimentón de la Vera y aceite de oliva virgen extra.',
    price: 28000,
    image: 'https://images.pexels.com/photos/36393691/pexels-photo-36393691.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'jamon-tomate',
    name: 'Jamón con Pan con Tomate',
    description: 'Jamón ibérico sobre pan artesanal con tomate fresco rallado y aceite de oliva.',
    price: 25000,
    image: 'https://images.pexels.com/photos/24706530/pexels-photo-24706530.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pimientos-padron',
    name: 'Pimientos de Padrón',
    description: 'Pimientos verdes salteados con sal gruesa. ¡Algunos pican, otros no!',
    price: 18000,
    image: 'https://images.pexels.com/photos/30877123/pexels-photo-30877123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'tabla-tapas',
    name: 'Tabla de Tapas Variadas',
    description: 'Selección de jamón, queso, croquetas, aceitunas y embutidos españoles.',
    price: 35000,
    image: 'https://images.pexels.com/photos/23358252/pexels-photo-23358252.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Para compartir',
  },
  {
    id: 'mariscos-frescos',
    name: 'Mariscos Frescos del Día',
    description: 'Variado de mariscos con almejas, gambas y especialidades de la casa.',
    price: 38000,
    image: 'https://images.pexels.com/photos/10402479/pexels-photo-10402479.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'tapas-cazuela',
    name: 'Tapas en Cazuela',
    description: 'Tapas calientes servidas en cazuela de barro tradicional con pan artesano.',
    price: 22000,
    image: 'https://images.pexels.com/photos/31148863/pexels-photo-31148863.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const carnesPescados: Dish[] = [
  {
    id: 'costillas-brasa',
    name: 'Costillas a la Brasa',
    description: 'Costillas de cerdo marinadas con especias, asadas a la parrilla con salsa de la casa.',
    price: 35000,
    image: 'https://images.pexels.com/photos/8250732/pexels-photo-8250732.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Parrilla',
  },
  {
    id: 'chuleton',
    name: 'Chuletón a la Brasa',
    description: 'Corte de carne premium a la parrilla con patatas y pimientos asados.',
    price: 48000,
    image: 'https://images.pexels.com/photos/8250685/pexels-photo-8250685.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pescado-brasa',
    name: 'Pescado a la Brasa',
    description: 'Pescado fresco del día asado con limón, hierbas y aceite de oliva virgen.',
    price: 42000,
    image: 'https://images.pexels.com/photos/17010950/pexels-photo-17010950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Fresco',
  },
  {
    id: 'pescado-verduras',
    name: 'Pescado con Verduras',
    description: 'Filete de pescado a la plancha con verduras salteadas y vino blanco.',
    price: 39000,
    image: 'https://images.pexels.com/photos/33144661/pexels-photo-33144661.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'parrilla-mixta',
    name: 'Parrilla Mixta',
    description: 'Selección de carnes y chorizo a la brasa con guarnición de la casa.',
    price: 46000,
    image: 'https://images.pexels.com/photos/37069413/pexels-photo-37069413.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pescado-citrico',
    name: 'Pescado al Cítrico',
    description: 'Pescado fresco con salsa cítrica, servido con cebollín y limón confitado.',
    price: 41000,
    image: 'https://images.pexels.com/photos/28843593/pexels-photo-28843593.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const menuCategories = [
  { id: 'paellas', label: 'Paellas y Arroces', items: paellas },
  { id: 'tapas', label: 'Tapas Españolas', items: tapas },
  { id: 'carnes', label: 'Carnes y Pescados', items: carnesPescados },
] as const;

export const testimonials = [
  {
    name: 'Veronica Uribe',
    role: 'Reseña de Google · hace 4 semanas',
    text: 'La atención muy chévere, nos explicaron y recomendaron lo mejor de la carta, un lugar lindo para disfrutar y celebrar eventos.',
    rating: 5,
  },
  {
    name: 'Leidy Andrea Duarte Saavedra',
    role: 'Reseña de Google · hace 2 meses',
    text: 'Espectacular atención, muy personalizada. Los shows son impecables, lo transportar a uno a una tasca española. La comida es deliciosa!...',
    rating: 5,
  },
  {
    name: 'Luz H. Prada',
    role: 'Reseña de Google · hace 7 meses',
    text: 'Un lugar precioso con una paella excelente. Los precios reflejan la calidad de la comida, lo que hace que la experiencia merezca la pena. Como el restaurante no es muy grande, es mejor reservar con antelación.',
    rating: 5,
  },
];

export const galleryImages = [
  { url: 'https://images.pexels.com/photos/13207675/pexels-photo-13207675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Tres paellas de mariscos con limón' },
  { url: 'https://images.pexels.com/photos/16715741/pexels-photo-16715741.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Bar del restaurante con decoración rústica' },
  { url: 'https://images.pexels.com/photos/19524049/pexels-photo-19524049.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Paella colorida con mariscos' },
  { url: 'https://images.pexels.com/photos/21352824/pexels-photo-21352824.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Interior cálido del restaurante' },
];

export const restaurantInfo = {
  address: 'Calle 48 #23-12, Nuevo Sotomayor, Bucaramanga',
  phone: '+57 315 387 7124',
  whatsapp: '573153877124',
  hours: [
    { days: 'Lunes y domingo', time: '12:00 PM – 3:00 PM' },
    { days: 'Martes a sábado', time: '12:00 PM – 3:00 PM y 6:00 PM – 9:00 PM' },
  ],
  mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.0!2d-73.12!3d7.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMDcnMTIuMCJOIDczwrAwNycxMi4wIlc!5e0!3m2!1ses!2sco!4v1600000000000',
};

export const occasionTypes = [
  'Cumpleaños',
  'Aniversario',
  'En pareja',
  'Reunión de amigos',
  'Ocasión especial',
];

export const eventZones = [
  { name: 'Bucaramanga', price: 350000 },
  { name: 'Floridablanca', price: 400000 },
  { name: 'Ruitoque', price: 450000 },
  { name: 'Piedecuesta', price: 450000 },
  { name: 'Girón', price: 400000 },
  { name: 'Mesa de los Santos', price: 550000 },
  { name: 'Lebrija', price: 550000 },
];

export const eventPaellaTypes = [
  {
    name: 'Paella marinera',
    pricePerPerson: 44000,
    description: 'Pulpo, almejas, calamares (botón y anillos), camarones, mejillones y gambas.',
  },
  {
    name: 'Paella mar y montaña',
    pricePerPerson: 47000,
    description: 'Pollo, costillitas de cerdo, calamares (botón y anillos), camarones, mejillones y gambas.',
  },
  {
    name: 'Paella barbacoa',
    pricePerPerson: 39000,
    description: 'Pollo, costillitas de cerdo, chorizo artesanal y chorizo español.',
  },
];
