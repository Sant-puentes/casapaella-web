import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';
import { restaurantInfo } from '@/data';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 mediterranean-pattern-dark text-cream-100/80 pt-14 sm:pt-20 pb-8 relative">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-saffron" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src="/logo/logo-completo-blanco.svg"
              alt="Casa Paella"
              className="h-20 sm:h-24 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed text-cream-100/70">
              Auténtica paella valenciana y cocina mediterránea en Bucaramanga.
              Tradición, fuego y sabor en cada plato.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.instagram.com/casapaella.bucaramanga/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Casa Paella"
                className="w-10 h-10 rounded-full bg-saffron-500/15 border border-saffron-500/30 hover:bg-saffron-500 hover:text-cream-50 flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@casapaella.bga"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Casa Paella"
                className="w-10 h-10 rounded-full bg-saffron-500/15 border border-saffron-500/30 hover:bg-saffron-500 hover:text-cream-50 flex items-center justify-center transition-all"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${restaurantInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Casa Paella"
                className="w-10 h-10 rounded-full bg-saffron-500/15 border border-saffron-500/30 hover:bg-saffron-500 hover:text-cream-50 flex items-center justify-center transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold text-saffron-400 mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-cream-100/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-saffron-500 mt-0.5 flex-shrink-0" />
                <span>{restaurantInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-saffron-500 flex-shrink-0" />
                <span>{restaurantInfo.phone}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg font-bold text-saffron-400 mb-4">Horario</h4>
            <ul className="space-y-3 text-sm text-cream-100/80">
              {restaurantInfo.hours.map((h) => (
                <li key={h.days} className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-saffron-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-cream-50 font-medium">{h.days}</p>
                    <p className="text-cream-100/60">{h.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-saffron-400 mb-4">Navegación</h4>
            <ul className="space-y-2.5 text-sm text-cream-100/80">
              <li><Link to="/" className="hover:text-saffron-400 transition-colors">Inicio</Link></li>
              <li><Link to="/menu" className="hover:text-saffron-400 transition-colors">Menú</Link></li>
              <li><Link to="/reservas" className="hover:text-saffron-400 transition-colors">Reservas</Link></li>
              <li><Link to="/eventos" className="hover:text-saffron-400 transition-colors">Eventos en vivo</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-saffron-500/25 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-cream-100/50">
          <p>© 2026 Casa Paella. Todos los derechos reservados. Hecho con pasión en Bucaramanga.</p>
        </div>
      </div>
    </footer>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6 5.82c-.9-.98-1.4-2.26-1.4-3.62h-3.02v13.98c0 1.64-1.33 2.97-2.97 2.97a2.97 2.97 0 0 1-2.97-2.97 2.97 2.97 0 0 1 2.97-2.97c.3 0 .59.05.86.13V9.4a6.03 6.03 0 0 0-.86-.06 6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6V8.34a9.1 9.1 0 0 0 5.31 1.7V7.02a5.62 5.62 0 0 1-3.92-1.2Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}
