import { Flame, MapPin, Phone, Clock, Instagram, Facebook, Mail } from 'lucide-react';
import { restaurantInfo } from '@/data';
import type { Page } from '@/App';

export default function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <footer className="bg-charcoal-900 text-cream-100/70 pt-12 sm:pt-16 pb-8 mediterranean-pattern">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-7 h-7 text-saffron-500" />
              <span className="font-serif text-2xl font-bold text-cream-50">
                Casa <span className="text-saffron-400">Paella</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              Auténtica paella valenciana y cocina mediterránea en Bucaramanga.
              Tradición, fuego y sabor en cada plato.
            </p>
            <div className="flex gap-3 mt-4 sm:mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-cream-50/10 hover:bg-saffron-500 hover:text-cream-50 flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-cream-50/10 hover:bg-saffron-500 hover:text-cream-50 flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-cream-50/10 hover:bg-saffron-500 hover:text-cream-50 flex items-center justify-center transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold text-cream-50 mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
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
            <h4 className="font-serif text-lg font-bold text-cream-50 mb-4">Horario</h4>
            <ul className="space-y-3 text-sm">
              {restaurantInfo.hours.map((h) => (
                <li key={h.days} className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-saffron-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>{h.days}</p>
                    <p>{h.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-cream-50 mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('inicio')} className="hover:text-saffron-400 transition-colors">Inicio</button></li>
              <li><button onClick={() => onNavigate('menu')} className="hover:text-saffron-400 transition-colors">Menú</button></li>
              <li><button onClick={() => onNavigate('reservas')} className="hover:text-saffron-400 transition-colors">Reservas</button></li>
              <li><button onClick={() => onNavigate('eventos')} className="hover:text-saffron-400 transition-colors">Eventos en vivo</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-saffron-500/30 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
          <p>© 2026 Casa Paella. Todos los derechos reservados. Hecho con pasión en Bucaramanga.</p>
        </div>
      </div>
    </footer>
  );
}
