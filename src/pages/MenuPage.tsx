import { sendWhatsApp } from '@/utils/whatsapp';

export default function MenuPage() {
  const pdfUrl = '/menu-casa-paella.pdf';

  const handleOrder = () => {
    sendWhatsApp('Hola, ya vi la carta y quiero hacer un pedido 🥘');
  };

  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-saffron-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Nuestra carta
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mt-3 mb-3 sm:mb-4">
            Sabores de <span className="text-saffron-600 italic">España</span>
          </h1>
          <p className="text-charcoal-700/60 max-w-xl mx-auto text-sm sm:text-base">
            Revisa nuestra carta completa y escríbenos por WhatsApp cuando estés listo para pedir.
          </p>
        </div>

        {/* Visor de PDF */}
        <div className="rounded-2xl overflow-hidden bg-white shadow-lg border border-saffron-200/40">
          <iframe
            src={pdfUrl}
            title="Carta Casa Paella"
            className="w-full"
            style={{ height: '80vh', minHeight: '500px', border: 'none' }}
          />
        </div>

        {/* Fallback de descarga, por si el navegador no puede mostrar el PDF inline */}
        <p className="text-center text-charcoal-700/60 text-sm mt-4">
          ¿No se ve la carta?{' '}
          
            href={pdfUrl}
            download
            className="text-saffron-600 font-semibold underline underline-offset-2 hover:text-saffron-700"
          >
            Descárgala aquí
          </a>
        </p>

        {/* CTA de pedido */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <button
            onClick={handleOrder}
            className="flex items-center gap-2 py-3.5 px-8 bg-[#25D366] hover:bg-[#1da851] text-white font-bold rounded-xl text-base transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            Hacer pedido por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
