import { useNavigate } from 'react-router-dom';
import PdfCarouselViewer from '@/components/PdfCarouselViewer';
import { sendWhatsApp } from '@/utils/whatsapp';

// Ruta del PDF dentro de /public. Para reemplazar la carta en el futuro,
// solo hay que subir el nuevo PDF a /public con este mismo nombre
// (o cambiar este valor si usas otro nombre de archivo).
const MENU_PDF_PATH = '/carta-casapaella.pdf';

export default function MenuPage() {
  const navigate = useNavigate();

  const handleOrder = () => {
    sendWhatsApp('🥘 *Hola Casa Paella!*\n\nYa vi la carta y quiero hacer un pedido.');
  };

  return (
    <section className="h-dvh pt-[60px] sm:pt-16 bg-charcoal-900 flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0">
        <PdfCarouselViewer
          file={MENU_PDF_PATH}
          headerLabel="Nuestra carta"
          onOrder={handleOrder}
          onSecondaryCta={() => navigate('/reservas')}
        />
      </div>
    </section>
  );
}
