import { useNavigate } from 'react-router-dom';
import { Star, ChevronRight, ChevronDown, MapPin, Phone, Clock, Calendar } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { featuredDishes, testimonials, restaurantInfo } from '@/data';
import { formatPrice } from '@/utils/whatsapp';

export default function InicioPage() {
  return (
    <>
      <Hero />
      <FlamencoSection />
      <FeaturedDishes />
      <Reviews />
      <EventsPreview />
      <Location />
    </>
  );
}

function Hero() {
  const navigate = useNavigate();
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="relative min-h-dvh flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        {reduceMotion ? (
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/hero-poster-mobile.jpg" />
            <img
              src="/images/hero-poster-desktop.jpg"
              alt="Chef preparando paella en vivo"
              className="w-full h-full object-cover"
            />
          </picture>
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-poster-desktop.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-desktop.mp4" media="(min-width: 768px)" type="video/mp4" />
            <source src="/videos/hero-mobile.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/75 via-charcoal-900/55 to-charcoal-900/85" />
      </div>

      <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-saffron-500/25 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-saffron-500/15 blur-3xl animate-pulse-slow" />

      <div className="relative z-10 flex-1 flex items-center justify-center px-5 sm:px-6 py-6">
        <div className="text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-cream-50/10 backdrop-blur-sm border border-saffron-500/40 rounded-full mb-5 sm:mb-8 animate-fade-in">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-cream-100 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
              4,7/5 en Google · +700 reseñas
            </span>
          </div>

          <h1 className="mb-5 sm:mb-10 animate-fade-in-up">
            <img
              src="/logo/logo-completo-blanco.svg"
              alt="Casa Paella"
              className="mx-auto w-36 xs:w-44 sm:w-[259px] md:w-[288px] h-auto drop-shadow-lg"
            />
          </h1>

          <div
            className="max-w-2xl mx-auto mb-5 sm:mb-10 animate-fade-in-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            <p className="text-cream-50 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-shadow-md">
              Un pedacito de España en Bucaramanga
            </p>
            <p className="text-base sm:text-lg md:text-xl text-cream-100/90 leading-snug text-shadow-md mt-1">
              Arroz, fuego, mariscos y buenos momentos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <button
              onClick={() => navigate('/reservas')}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-saffron-500 hover:bg-saffron-600 text-cream-50 font-bold rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-saffron-500/40 hover:scale-105"
            >
              Reservar mesa
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-cream-50/10 backdrop-blur-sm border border-saffron-500/40 hover:bg-cream-50/20 text-cream-50 font-semibold rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105"
            >
              Ver la carta
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById('show-flamenco')?.scrollIntoView({ behavior: 'smooth' })}
        className="relative z-10 shrink-0 pb-4 sm:pb-8 flex flex-col items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors animate-fade-in"
        style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium">
          Descubre nuestro show en vivo
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}

function FlamencoSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="show-flamenco" className="py-16 sm:py-24 bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl" />
      <div ref={ref} className={`relative max-w-6xl mx-auto px-5 sm:px-6 grid md:grid-cols-2 gap-10 sm:gap-12 items-center ${visible ? 'reveal visible' : 'reveal'}`}>
        <div className="relative order-2 md:order-1">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50 mb-5 leading-tight">
            Show de <span className="text-saffron-400 italic">Flamenco</span>
          </h2>
          <p className="text-cream-100/70 text-base leading-relaxed mb-6">
            Cada sábado en la noche, Casa Paella se transforma con un espectáculo de
            flamenco en vivo. Disfruta de la pasión del baile, el sonido de la guitarra
            y el compás del cante mientras saboreas la mejor paella de Bucaramanga.
            Una experiencia que combina gastronomía y cultura española.
          </p>
          <div className="flex items-center gap-4 text-cream-100/60 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-saffron-400" />
              <span>Sábado</span>
            </div>
            <div className="w-px h-4 bg-cream-50/20" />
            <span>7:30 PM</span>
          </div>
        </div>
        <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl group">
          <img
            src="/images/show-flamenco.jpg"
            alt="Bailarina de flamenco en Casa Paella junto a clientes disfrutando del show"
            className="w-full h-72 sm:h-96 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturedDishes() {
  const navigate = useNavigate();
  const { ref, visible } = useReveal();
  return (
    <section className="py-16 sm:py-24 bg-cream-100">
      <div ref={ref} className={`max-w-7xl mx-auto px-5 sm:px-6 ${visible ? 'reveal visible' : 'reveal'}`}>
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-saffron-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Platos destacados
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mt-3 mb-3 sm:mb-4">
            Nuestras <span className="text-saffron-600 italic">especialidades</span>
          </h2>
          <p className="text-charcoal-700/60 max-w-xl mx-auto text-sm sm:text-base">
            Una muestra de lo que encontrarás en nuestra carta completa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
          {featuredDishes.map((dish) => (
            <div key={dish.id} className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-saffron-200/40">
              <div className="relative h-52 sm:h-56 overflow-hidden">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                {dish.tag && (
                  <span className="absolute top-3 right-3 px-3 py-1 bg-saffron-500 text-cream-50 text-xs font-bold rounded-full shadow-md">
                    {dish.tag}
                  </span>
                )}
                <span className="absolute bottom-3 left-3 px-4 py-1.5 bg-cream-50/95 backdrop-blur-sm text-saffron-700 font-serif text-base font-bold rounded-full shadow-md">
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
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-saffron-500 hover:bg-saffron-600 text-cream-50 font-bold rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-saffron-500/30 hover:scale-105"
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
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-saffron-200/20 rounded-full blur-3xl" />

      <div ref={ref} className={`relative max-w-5xl mx-auto px-5 sm:px-6 ${visible ? 'reveal visible' : 'reveal'}`}>
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-saffron-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Reseñas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mt-3">
            Lo que dicen <span className="text-saffron-600 italic">nuestros clientes</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 shadow-lg border border-saffron-200/40">
              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
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

function EventsPreview() {
  const navigate = useNavigate();
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
              Preparamos la paella para tus <span className="text-saffron-400 italic">eventos</span>
            </h2>
            <p className="text-cream-100/70 text-base leading-relaxed mb-6">
              Llevamos la experiencia de Casa Paella a tu evento. Cocinamos en vivo
              para tus invitados con paellas gigantes, tapas y todo el sabor de España.
              Cumpleaños, bodas, reuniones empresariales y más.
            </p>
            <button
              onClick={() => navigate('/eventos')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-saffron-500 hover:bg-saffron-600 text-cream-50 font-bold rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-saffron-500/30 hover:scale-105"
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
    <section id="ubicacion" className="py-16 sm:py-24 bg-cream-100 mediterranean-pattern">
      <div ref={ref} className={`max-w-5xl mx-auto px-5 sm:px-6 ${visible ? 'reveal visible' : 'reveal'}`}>
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-saffron-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Ubicación
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mt-3 mb-3 sm:mb-4">
            Visítanos en <span className="text-saffron-600 italic">Bucaramanga</span>
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
