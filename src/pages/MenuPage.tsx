import { Download, ExternalLink } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { sendWhatsApp } from '@/utils/whatsapp';

// Ruta del PDF dentro de /public. Para reemplazar la carta en el futuro,
// solo hay que subir el nuevo PDF a /public con este mismo nombre
// (o cambiar este valor si usas otro nombre de archivo).
const MENU_PDF_PATH = '/carta-casapaella.pdf';

export default function MenuPage() {
  const { ref, visible } = useReveal();

  const handleOrder = () => {
    sendWhatsApp('🥘 *Hola Casa Paella!*\n\nQuiero hacer un pedido, ¿me ayudan con la carta?');
  };

  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-cream-100 min-h-screen">
      <div ref={ref} className={`max-w-5xl mx-auto px-5 sm:px-6 ${visible ? 'reveal visible' : 'reveal'}`}>
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-saffron-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Nuestra carta
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mt-3 mb-3 sm:mb-4">
            Sabores de <span className="text-saffron-600 italic">España</span>
          </h1>
          <p className="text-charcoal-700/60 max-w-xl mx-auto text-sm sm:text-base">
            Descubre toda nuestra carta: entradas, tapas, paellas, carnes, pescados y mucho más.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap justify-center gap-3 mb-6 sm:mb-8">
          <a
            href={MENU_PDF_PATH}
            download
            className="flex items-center gap-2 px-5 py-2.5 bg-cream-50 border border-saffron-500/30 text-charcoal-800 font-semibold rounded-full text-sm hover:border-saffron-500 transition-colors"
          >
            <Download className="w-4 h-4" />
            Descargar carta
          </a>
          <a
            href={MENU_PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-cream-50 border border-saffron-500/30 text-charcoal-800 font-semibold rounded-full text-sm hover:border-saffron-500 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir en pestaña nueva
          </a>
        </div>

        {/* Visor de PDF embebido */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-saffron-500/20 bg-cream-50">
          {/* object con fallback: si el navegador no puede mostrar el PDF embebido
              (frecuente en algunos navegadores móviles), muestra un aviso con enlaces. */}
          <object
            data={MENU_PDF_PATH}
            type="application/pdf"
            className="w-full"
            style={{ height: '80vh', minHeight: 480 }}
          >
            <div className="flex flex-col items-center justify-center text-center px-6 py-16">
              <p className="text-charcoal-700/70 text-sm sm:text-base mb-4">
                Tu navegador no puede mostrar el PDF aquí, pero puedes verlo directamente:
              </p>
              <a
                href={MENU_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-saffron-500 text-cream-50 font-semibold rounded-full text-sm hover:bg-saffron-600 transition-colors"
              >
                Ver carta en PDF
              </a>
            </div>
          </object>
        </div>

        {/* CTA para pedir por WhatsApp */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-charcoal-700/60 text-sm sm:text-base mb-4">
            ¿Ya sabes qué quieres pedir?
          </p>
          <button
            onClick={handleOrder}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] hover:bg-[#1da851] text-white font-bold rounded-xl text-base transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            Pedir por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
