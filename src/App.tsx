import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import InicioPage from '@/pages/Inicio';
import ReservasPage from '@/pages/Reservas';
import EventosPage from '@/pages/Eventos';

// La carta usa pdfjs-dist (visor de PDF), una libreria pesada que no tiene
// sentido cargar en el resto del sitio: se separa en su propio chunk y solo
// se descarga cuando alguien entra a /menu.
const MenuPage = lazy(() => import('@/pages/MenuPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-cream-50">
        <ScrollToTop />
        <Navbar />
        <main className="animate-fade-in">
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route
              path="/menu"
              element={
                <Suspense
                  fallback={
                    <div className="h-dvh pt-[60px] sm:pt-16 flex items-center justify-center bg-charcoal-900">
                      <div className="w-10 h-10 border-[3px] border-saffron-500/25 border-t-saffron-500 rounded-full animate-spin" />
                    </div>
                  }
                >
                  <MenuPage />
                </Suspense>
              }
            />
            <Route path="/reservas" element={<ReservasPage />} />
            <Route path="/eventos" element={<EventosPage />} />
          </Routes>
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </div>
    </CartProvider>
  );
}

export default App;
