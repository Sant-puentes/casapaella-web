import { Flame, MapPin, Phone, Clock, Instagram, Facebook, Mail } from 'lucide-react';
import { restaurantInfo } from '@/data';
import type { Page } from '@/App';

export default function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <footer className="bg-charcoal-900 mediterranean-pattern-dark text-cream-100/80 pt-14 sm:pt-20 pb-8 relative">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-saffron" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-8 h-8 text-saffron-500" />
              <span className="font-serif text-2xl font-bold text-cream-50">
                Casa <span className="text-saffron-400">Paella</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-cream-100/70">
              Auténtica paella valenciana y cocina mediterránea en Bucaramanga.
              Tradición, fuego y sabor en cada plato.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-10 h-10 rounded-full bg-saffron-500/15 border border-saffron-500/30 hover:bg-saffron-500 hover:text-cream-50 flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-saffron-500/15 border border-saffron-500/30 hover:bg-saffron-500 hover:text-cream-50 flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-saffron-500/15 border border-saffron-500/30 hover:bg-saffron-500 hover:text-cream-50 flex items-center justify-center transition-all">
                <Mail className="w-4 h-4" />
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
              <li><button onClick={() => onNavigate('inicio')} className="hover:text-saffron-400 transition-colors">Inicio</button></li>
              <li><button onClick={() => onNavigate('menu')} className="hover:text-saffron-400 transition-colors">Menú</button></li>
              <li><button onClick={() => onNavigate('reservas')} className="hover:text-saffron-400 transition-colors">Reservas</button></li>
              <li><button onClick={() => onNavigate('eventos')} className="hover:text-saffron-400 transition-colors">Eventos en vivo</button></li>
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
