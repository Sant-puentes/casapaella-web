import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import InicioPage from '@/pages/Inicio';
import MenuPage from '@/pages/MenuPage';
import ReservasPage from '@/pages/Reservas';
import EventosPage from '@/pages/Eventos';

export type Page = 'inicio' | 'menu' | 'reservas' | 'eventos';

function App() {
  const [page, setPage] = useState<Page>('inicio');

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-cream-50">
        <Navbar currentPage={page} onNavigate={navigate} />
        <main key={page} className="animate-fade-in">
          {page === 'inicio' && <InicioPage onNavigate={navigate} />}
          {page === 'menu' && <MenuPage />}
          {page === 'reservas' && <ReservasPage />}
          {page === 'eventos' && <EventosPage />}
        </main>
        <Footer onNavigate={navigate} />
      </div>
    </CartProvider>
  );
}

export default App;
