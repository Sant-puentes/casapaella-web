import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { sendWhatsApp } from '@/utils/whatsapp';

// Configuración obligatoria del worker de PDF.js. Debe ir en el mismo archivo
// donde se usan <Document> / <Page> (ver documentación de react-pdf).
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Ruta del PDF dentro de /public. Para reemplazar la carta en el futuro,
// solo hay que subir el nuevo PDF a /public con este mismo nombre
// (o cambiar este valor si usas otro nombre de archivo).
const MENU_PDF_PATH = '/carta-casapaella.pdf';

// Duración de la animación de paso de página (ms). Debe coincidir con la
// duración definida en los @keyframes de más abajo.
const PAGE_TRANSITION_MS = 320;

type Direction = 'next' | 'prev';

export default function MenuPage() {
  const { ref, visible } = useReveal();
  const containerRef = useRef<HTMLDivElement>(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [loadError, setLoadError] = useState(false);
  const pageWrapperRef = useRef<HTMLDivElement>(null);

  // Se activa cuando el PDF termina de renderizarse por primera vez, para
  // disparar la animación de entrada (fade + slide-up). Es la animación que
  // SIEMPRE se ve, sin importar si la carta tiene 1 o varias páginas.
  const [docLoaded, setDocLoaded] = useState(false);

  // Controla la animación de "pasar página" al usar las flechas: dirección
  // del último cambio y si hay una transición en curso (bloquea clicks
  // repetidos). Solo aplica cuando la carta tiene más de una página.
  const [direction, setDirection] = useState<Direction>('next');
  const [isAnimating, setIsAnimating] = useState(false);

  // Mide el ancho disponible para que el PDF se adapte a cualquier pantalla
  // (celular, tablet, escritorio) sin desbordarse ni verse diminuto.
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Reinicia la animación de "pasar página" sin desmontar <Page>. Antes se
  // usaba key={pageNumber} en el div animado, pero eso forzaba a React a
  // desmontar y volver a montar <Page> en cada cambio, causando que la
  // página renderizada desapareciera brevemente mientras PDF.js la volvía
  // a dibujar desde cero (el "parpadeo"). Con este truco de reflow, <Page>
  // se mantiene montado (React solo actualiza su prop pageNumber) y la
  // animación CSS se reinicia igual.
  useEffect(() => {
    const el = pageWrapperRef.current;
    if (!el) return;
    el.style.animation = 'none';
    // Forzar reflow para que el navegador "olvide" la animación anterior.
    void el.offsetHeight;
    el.style.animation = '';
  }, [pageNumber]);

  const handleOrder = () => {
    sendWhatsApp('🥘 *Hola Casa Paella!*\n\nQuiero hacer un pedido, ¿me ayudan con la carta?');
  };

  const goToPrevPage = () => {
    if (isAnimating || pageNumber <= 1) return;
    setDirection('prev');
    setIsAnimating(true);
    setPageNumber((p) => Math.max(1, p - 1));
  };

  const goToNextPage = () => {
    if (isAnimating || pageNumber >= numPages) return;
    setDirection('next');
    setIsAnimating(true);
    setPageNumber((p) => Math.min(numPages, p + 1));
  };

  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-cream-100 min-h-screen">
      {/* Animaciones del visor de carta:
          - fade-in-up: entrada del visor cuando el PDF termina de cargar
            (se ve siempre, sin importar cuántas páginas tenga la carta).
          - page-turn-next/prev: deslizamiento al cambiar de página con las
            flechas (solo aplica si la carta tiene más de una página). */}
      <style>{`
        @keyframes fade-in-up {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .viewer-fade-in {
          animation: fade-in-up 500ms ease-out both;
        }
        @keyframes page-turn-next {
          from { transform: translateX(36px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes page-turn-prev {
          from { transform: translateX(-36px); opacity: 0; }
          to   { transform: translateX(0);      opacity: 1; }
        }
        .page-turn-next {
          animation: page-turn-next ${PAGE_TRANSITION_MS}ms ease-out both;
        }
        .page-turn-prev {
          animation: page-turn-prev ${PAGE_TRANSITION_MS}ms ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .viewer-fade-in, .page-turn-next, .page-turn-prev {
            animation: none;
          }
        }
      `}</style>

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

        {/* Visor de PDF embebido (renderizado con PDF.js, funciona igual en móvil) */}
        <div
          ref={containerRef}
          className={`rounded-2xl overflow-hidden shadow-xl border border-saffron-500/20 bg-cream-50 flex flex-col items-center ${
            docLoaded ? 'viewer-fade-in' : 'opacity-0'
          }`}
        >
          {loadError ? (
            <div className="flex flex-col items-center justify-center text-center px-6 py-16">
              <p className="text-charcoal-700/70 text-sm sm:text-base mb-4">
                No pudimos cargar la carta aquí, pero puedes verla directamente:
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
          ) : (
            <>
              <Document
                file={MENU_PDF_PATH}
                onLoadSuccess={({ numPages: n }) => {
                  setNumPages(n);
                  setDocLoaded(true);
                }}
                onLoadError={() => setLoadError(true)}
                loading={
                  <p className="text-charcoal-700/60 text-sm py-16">Cargando carta…</p>
                }
                className="max-w-full"
              >
                {containerWidth > 0 && (
                  // overflow-hidden recorta el ligero desplazamiento lateral
                  // de la animación para que no aparezca scroll horizontal.
                  <div className="w-full overflow-hidden">
                    <div
                      // Ya no usa key={pageNumber}: ver el useEffect de más
                      // arriba que reinicia esta animación sin desmontar
                      // <Page>, evitando el parpadeo al cambiar de página.
                      ref={pageWrapperRef}
                      className={direction === 'next' ? 'page-turn-next' : 'page-turn-prev'}
                      onAnimationEnd={() => setIsAnimating(false)}
                    >
                      <Page
                        pageNumber={pageNumber}
                        width={Math.min(containerWidth, 900)}
                        renderAnnotationLayer={false}
                        loading={null}
                      />
                    </div>
                  </div>
                )}
              </Document>

              {/* Controles de navegación entre páginas (solo si hay más de 1) */}
              {numPages > 1 && (
                <div className="flex items-center justify-center gap-4 py-4 border-t border-saffron-500/10 w-full">
                  <button
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1 || isAnimating}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-200 text-charcoal-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-saffron-100 transition-colors"
                    aria-label="Página anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-charcoal-700/70 text-sm font-medium">
                    Página {pageNumber} de {numPages}
                  </span>
                  <button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages || isAnimating}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-200 text-charcoal-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-saffron-100 transition-colors"
                    aria-label="Página siguiente"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
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
