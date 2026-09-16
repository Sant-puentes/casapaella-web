import { Star, ChevronRight, MapPin, Phone, Clock, Calendar, Music } from 'lucide-react';
import type { Page } from '@/App';
import { useReveal } from '@/hooks/useReveal';
import { featuredDishes, testimonials, restaurantInfo } from '@/data';
import { formatPrice } from '@/utils/whatsapp';

export default function InicioPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <FlamencoSection />
      <FeaturedDishes onNavigate={onNavigate} />
      <Reviews />
      <EventsPreview onNavigate={onNavigate} />
      <Location />
    </>
  );
}

function Hero({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/14499018/pexels-photo-14499018.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Paella de mariscos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/80" />
      </div>

      <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-saffron-500/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-terracotta-500/20 blur-3xl animate-pulse-slow" />

      <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-cream-50/10 backdrop-blur-sm border border-cream-50/20 rounded-full mb-6 sm:mb-8 animate-fade-in">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-saffron-400 fill-saffron-400" />
            ))}
          </div>
          <span className="text-cream-100 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
            Auténtica paella valenciana en Bucaramanga
          </span>
        </div>

        <h1 className="font-serif text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-bold text-cream-50 leading-tight mb-5 sm:mb-6 text-shadow-lg animate-fade-in-up">
          Casa <span className="text-saffron-500 italic">Paella</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-cream-100/90 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed text-shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          El auténtico sabor de España, cocinado a fuego lento con arroz bomba,
          azafrán puro y el mejor marisco fresco del día.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <button
            onClick={() => onNavigate('reservas')}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-saffron-500 hover:bg-saffron-600 text-charcoal-900 font-bold rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-saffron-500/40 hover:scale-105"
          >
            Reservar mesa
          </button>
          <button
            onClick={() => onNavigate('menu')}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-cream-50/10 backdrop-blur-sm border border-cream-50/30 hover:bg-cream-50/20 text-cream-50 font-semibold rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105"
          >
            Ver la carta
          </button>
        </div>
      </div>
    </section>
  );
}

function FlamencoSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="py-16 sm:py-24 bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl" />
      <div ref={ref} className={`relative max-w-6xl mx-auto px-5 sm:px-6 grid md:grid-cols-2 gap-10 sm:gap-12 items-center ${visible ? 'reveal visible' : 'reveal'}`}>
        <div className="relative order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-saffron-500/10 border border-saffron-500/30 rounded-full mb-4">
            <Music className="w-4 h-4 text-saffron-400" />
            <span className="text-saffron-400 text-xs font-semibold tracking-wider uppercase">Show en vivo</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50 mb-5 leading-tight">
            Show de <span className="text-terracotta-400 italic">Flamenco</span>
          </h2>
          <p className="text-cream-100/70 text-base leading-relaxed mb-6">
            Cada viernes y sábado, Casa Paella se transforma con un espectáculo de
            flamenco en vivo. Disfruta de la pasión del baile, el sonido de la guitarra
            y el compás del cante mientras saboreas la mejor paella de Bucaramanga.
            Una experiencia que combina gastronomía y cultura española.
          </p>
          <div className="flex items-center gap-4 text-cream-100/60 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-saffron-400" />
              <span>Vie & Sáb</span>
            </div>
            <div className="w-px h-4 bg-cream-50/20" />
            <span>8:00 PM</span>
          </div>
        </div>
        <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl group">
          <img
            src="https://images.pexels.com/photos/13863662/pexels-photo-13863662.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Bailarina de flamenco"
            className="w-full h-72 sm:h-96 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturedDishes({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { ref, visible } = useReveal();
  return (
    <section className="py-16 sm:py-24 bg-cream-50">
      <div ref={ref} className={`max-w-7xl mx-auto px-5 sm:px-6 ${visible ? 'reveal visible' : 'reveal'}`}>
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-saffron-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Platos destacados
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mt-3 mb-3 sm:mb-4">
            Nuestras <span className="text-terracotta-600 italic">especialidades</span>
          </h2>
          <p className="text-charcoal-700/60 max-w-xl mx-auto text-sm sm:text-base">
            Una muestra de lo que encontrarás en nuestra carta completa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
          {featuredDishes.map((dish) => (
            <div key={dish.id} className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-52 sm:h-56 overflow-hidden">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                {dish.tag && (
                  <span className="absolute top-3 right-3 px-3 py-1 bg-saffron-500 text-charcoal-900 text-xs font-bold rounded-full shadow-md">
                    {dish.tag}
                  </span>
                )}
                <span className="absolute bottom-3 left-3 px-4 py-1.5 bg-cream-50/95 backdrop-blur-sm text-charcoal-900 font-serif text-base font-bold rounded-full shadow-md">
                  {formatPrice(dish.price)}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal-800 mb-1.5">{dish.name}</h3>
                <p className="text-charcoal-700/70 text-xs sm:text-sm leading-relaxed line-clamp-2">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('menu')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-saffron-500 hover:bg-saffron-600 text-charcoal-900 font-bold rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-saffron-500/30 hover:scale-105"
          >
            Ver menú completo
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { ref, visible } = useReveal();
  return (
    <section className="py-16 sm:py-24 bg-gradient-warm relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-saffron-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-terracotta-200/20 rounded-full blur-3xl" />

      <div ref={ref} className={`relative max-w-5xl mx-auto px-5 sm:px-6 ${visible ? 'reveal visible' : 'reveal'}`}>
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-saffron-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Reseñas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mt-3">
            Lo que dicen <span className="text-terracotta-600 italic">nuestros clientes</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-saffron-500 fill-saffron-500" />
                ))}
              </div>
              <p className="text-charcoal-700/80 text-sm leading-relaxed mb-4 font-serif italic">
                "{t.text}"
              </p>
              <p className="font-bold text-charcoal-800 text-sm">{t.name}</p>
              <p className="text-charcoal-700/50 text-xs">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsPreview({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { ref, visible } = useReveal();
  return (
    <section className="py-16 sm:py-24 bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl" />
      <div ref={ref} className={`relative max-w-5xl mx-auto px-5 sm:px-6 ${visible ? 'reveal visible' : 'reveal'}`}>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="https://images.pexels.com/photos/32690711/pexels-photo-32690711.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Paella para eventos"
              className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div>
            <span className="text-saffron-400 font-semibold text-xs sm:text-sm uppercase tracking-widest">
              Eventos en vivo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50 mt-3 mb-5 leading-tight">
              Preparamos la paella para tus <span className="text-saffron-500 italic">eventos</span>
            </h2>
            <p className="text-cream-100/70 text-base leading-relaxed mb-6">
              Llevamos la experiencia de Casa Paella a tu evento. Cocinamos en vivo
              para tus invitados con paellas gigantes, tapas y todo el sabor de España.
              Cumpleaños, bodas, reuniones empresariales y más.
            </p>
            <button
              onClick={() => onNavigate('eventos')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-saffron-500 hover:bg-saffron-600 text-charcoal-900 font-bold rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-saffron-500/30 hover:scale-105"
            >
              Ver eventos en vivo
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Location() {
  const { ref, visible } = useReveal();
  return (
    <section id="ubicacion" className="py-16 sm:py-24 bg-cream-50">
      <div ref={ref} className={`max-w-5xl mx-auto px-5 sm:px-6 ${visible ? 'reveal visible' : 'reveal'}`}>
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-saffron-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Ubicación
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mt-3 mb-3 sm:mb-4">
            Visítanos en <span className="text-terracotta-600 italic">Bucaramanga</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-2xl overflow-hidden shadow-2xl min-h-[300px] bg-charcoal-200">
            <iframe
              title="Ubicación Casa Paella"
              src="https://maps.google.com/maps?q=Calle%2048%20%2323-12%20Bucaramanga&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[300px] border-0"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-saffron-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-saffron-600" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal-800 mb-1">Dirección</h3>
                <p className="text-charcoal-700/70 text-sm">{restaurantInfo.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-saffron-100 flex items-center justify-center">
                <Phone className="w-6 h-6 text-saffron-600" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal-800 mb-1">Teléfono</h3>
                <p className="text-charcoal-700/70 text-sm">{restaurantInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-saffron-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-saffron-600" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal-800 mb-1">Horario</h3>
                {restaurantInfo.hours.map((h) => (
                  <p key={h.days} className="text-charcoal-700/70 text-sm">
                    {h.days}: {h.time}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
