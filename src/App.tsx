import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import InicioPage from '@/pages/Inicio';
import MenuPage from '@/pages/MenuPage';
import ReservasPage from '@/pages/Reservas';
import EventosPage from '@/pages/Eventos';

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
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/reservas" element={<ReservasPage />} />
            <Route path="/eventos" element={<EventosPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
