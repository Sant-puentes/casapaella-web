import { useEffect, useState } from 'react';
import { Flame, Menu, X } from 'lucide-react';
import type { Page } from '@/App';

interface NavLink {
  label: string;
  page: Page;
}

const links: NavLink[] = [
  { label: 'Inicio', page: 'inicio' },
  { label: 'Menú', page: 'menu' },
  { label: 'Reservas', page: 'reservas' },
  { label: 'Eventos en vivo', page: 'eventos' },
];

export default function Navbar({
  currentPage,
  onNavigate,
}: {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setOpen(false);
  };

  const handleLocation = () => {
    if (currentPage === 'inicio') {
      document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('inicio');
      setTimeout(() => {
        document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open || currentPage !== 'inicio'
          ? 'bg-charcoal-900/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button
          onClick={() => handleNavigate('inicio')}
          className="flex items-center gap-2 group"
        >
          <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-saffron-500 group-hover:text-saffron-400 transition-colors" />
          <span className="font-serif text-xl sm:text-2xl font-bold text-cream-50 tracking-wide">
            Casa <span className="text-saffron-500">Paella</span>
          </span>
        </button>

        <ul className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.page}>
              <button
                onClick={() => handleNavigate(link.page)}
                className={`text-sm font-medium tracking-wide uppercase transition-colors relative group ${
                  currentPage === link.page
                    ? 'text-saffron-400'
                    : 'text-cream-100/90 hover:text-saffron-400'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-saffron-500 transition-all duration-300 ${
                    currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleLocation}
              className="text-sm font-medium tracking-wide uppercase text-cream-100/90 hover:text-saffron-400 transition-colors relative group"
            >
              Ubicación
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron-500 transition-all duration-300 group-hover:w-full" />
            </button>
          </li>
        </ul>

        <button
          onClick={() => handleNavigate('reservas')}
          className="hidden lg:inline-flex items-center px-6 py-2.5 bg-saffron-500 hover:bg-saffron-600 text-charcoal-900 font-semibold rounded-full text-sm transition-all duration-300 hover:shadow-lg hover:shadow-saffron-500/30 hover:scale-105"
        >
          Reservar
        </button>

        <button
          className="lg:hidden text-cream-50 p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 pt-4 pb-8 bg-charcoal-900/98 backdrop-blur-md">
          {links.map((link, i) => (
            <li key={link.page}>
              <button
                onClick={() => handleNavigate(link.page)}
                className={`block w-full text-left font-medium transition-colors py-3 px-2 border-b border-cream-50/5 ${
                  currentPage === link.page
                    ? 'text-saffron-400'
                    : 'text-cream-100 hover:text-saffron-400'
                }`}
                style={{
                  animation: open ? `fadeInUp 0.4s ease-out ${i * 0.05}s both` : 'none',
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleLocation}
              className="block w-full text-left font-medium transition-colors py-3 px-2 border-b border-cream-50/5 text-cream-100 hover:text-saffron-400"
            >
              Ubicación
            </button>
          </li>
          <li className="mt-4">
            <button
              onClick={() => handleNavigate('reservas')}
              className="flex items-center justify-center w-full px-6 py-3.5 bg-saffron-500 text-charcoal-900 font-semibold rounded-full text-sm"
            >
              Reservar mesa
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
