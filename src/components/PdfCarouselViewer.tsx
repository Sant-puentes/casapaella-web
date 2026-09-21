import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Worker de PDF.js servido desde el propio dominio (Vite lo empaqueta como
// asset local vía import.meta.url), nunca desde un CDN externo: si se carga
// desde otro origen, el navegador lo bloquea y el PDF nunca llega a renderizar.
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const SWIPE_THRESHOLD_RATIO = 0.16;
const TRANSITION_MS = 300;
const MAX_DPR = 2.5;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3.5;
const DOUBLE_TAP_ZOOM = 2.2;
const DOUBLE_TAP_MS = 300;
const PRELOAD_RADIUS = 2;
const THUMB_WIDTH = 90;

interface PdfCarouselViewerProps {
  file: string;
  headerLabel: string;
  onOrder: () => void;
}

export default function PdfCarouselViewer({ file, headerLabel, onOrder }: PdfCarouselViewerProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pdfDocRef = useRef<PDFDocumentProxy | null>(null);
  const canvasRefs = useRef<Record<number, HTMLCanvasElement | null>>({});
  const thumbRefs = useRef<Record<number, HTMLCanvasElement | null>>({});
  const renderedPages = useRef<Set<number>>(new Set());
  const renderingPages = useRef<Set<number>>(new Set());
  const renderedThumbs = useRef<Set<number>>(new Set());

  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingDoc, setLoadingDoc] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [, setRenderTick] = useState(0);

  // Arrastre horizontal (swipe) para cambiar de pagina
  const [dragOffset, setDragOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const draggingRef = useRef(false);
  const mouseDraggingRef = useRef(false);
  const touchStartRef = useRef(0);
  const touchXRef = useRef(0);

  // Zoom (pellizco / doble toque) + pan, solo sobre la pagina activa
  const [zoom, setZoom] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isGesturing, setIsGesturing] = useState(false);
  const pinchRef = useRef({ active: false, startDist: 0, startZoom: 1 });
  const panRef = useRef({ active: false, startX: 0, startY: 0, startPan: { x: 0, y: 0 } });
  const lastTapRef = useRef(0);

  const pages = useMemo(() => Array.from({ length: numPages }, (_, i) => i + 1), [numPages]);

  // --- Cargar el documento una sola vez ---
  useEffect(() => {
    let cancelled = false;
    setLoadingDoc(true);
    setLoadError(false);
    renderedPages.current.clear();
    renderingPages.current.clear();
    renderedThumbs.current.clear();
    setCurrentPage(1);

    const task = pdfjsLib.getDocument(file);
    task.promise
      .then((pdf) => {
        if (cancelled) return;
        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);
        setLoadingDoc(false);
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(true);
          setLoadingDoc(false);
        }
      });

    return () => {
      cancelled = true;
      task.destroy();
    };
  }, [file]);

  // --- Medir el tamaño disponible del stage ---
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStageSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // --- Renderizar una pagina a su canvas (una sola vez, queda en cache) ---
  const renderPage = useCallback(
    async (pageNum: number) => {
      const pdf = pdfDocRef.current;
      const canvas = canvasRefs.current[pageNum];
      if (!pdf || !canvas || stageSize.width === 0 || stageSize.height === 0) return;
      if (renderedPages.current.has(pageNum) || renderingPages.current.has(pageNum)) return;
      renderingPages.current.add(pageNum);
      try {
        const page = await pdf.getPage(pageNum);
        const base = page.getViewport({ scale: 1 });
        // "contain": la pagina completa cabe dentro del stage, sin recortarse
        const scaleToFit = Math.min(
          (stageSize.width - 32) / base.width,
          (stageSize.height - 32) / base.height,
        );
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        const viewport = page.getViewport({ scale: scaleToFit * dpr });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width / dpr}px`;
        canvas.style.height = `${viewport.height / dpr}px`;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        await page.render({ canvasContext: ctx, viewport }).promise;
        renderedPages.current.add(pageNum);
        setRenderTick((t) => t + 1);
      } catch {
        // Si una pagina puntual falla, no tumbamos el visor completo.
      } finally {
        renderingPages.current.delete(pageNum);
      }
    },
    [stageSize],
  );

  // --- Miniatura de baja resolucion (independiente del canvas grande) ---
  const renderThumb = useCallback(async (pageNum: number) => {
    const pdf = pdfDocRef.current;
    const canvas = thumbRefs.current[pageNum];
    if (!pdf || !canvas || renderedThumbs.current.has(pageNum)) return;
    renderedThumbs.current.add(pageNum);
    try {
      const page = await pdf.getPage(pageNum);
      const base = page.getViewport({ scale: 1 });
      const scale = THUMB_WIDTH / base.width;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: scale * dpr });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${THUMB_WIDTH}px`;
      canvas.style.height = `${viewport.height / dpr}px`;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      await page.render({ canvasContext: ctx, viewport }).promise;
      setRenderTick((t) => t + 1);
    } catch {
      renderedThumbs.current.delete(pageNum);
    }
  }, []);

  // --- Precargar pagina actual +/- 2 para que el swipe sea instantaneo ---
  useEffect(() => {
    if (!numPages || stageSize.width === 0) return;
    for (let d = -PRELOAD_RADIUS; d <= PRELOAD_RADIUS; d++) {
      const n = currentPage + d;
      if (n >= 1 && n <= numPages) renderPage(n);
    }
  }, [currentPage, numPages, stageSize, renderPage]);

  // --- Miniaturas: se renderizan todas (bajo costo, cartas de pocas paginas) ---
  useEffect(() => {
    if (!numPages) return;
    pages.forEach((n) => renderThumb(n));
  }, [numPages, pages, renderThumb]);

  // --- Al cambiar de pagina, se resetea el zoom/pan ---
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [currentPage]);

  const goTo = useCallback(
    (n: number) => {
      setCurrentPage(() => Math.min(numPages, Math.max(1, n)));
    },
    [numPages],
  );

  // --- Navegacion por teclado (respaldo de accesibilidad) ---
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(currentPage + 1);
      if (e.key === 'ArrowLeft') goTo(currentPage - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentPage, goTo]);

  const getTouchDist = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const endSwipe = () => {
    draggingRef.current = false;
    mouseDraggingRef.current = false;
    setIsSwiping(false);
    const delta = touchXRef.current - touchStartRef.current;
    const threshold = stageSize.width * SWIPE_THRESHOLD_RATIO;
    if (delta < -threshold && currentPage < numPages) goTo(currentPage + 1);
    else if (delta > threshold && currentPage > 1) goTo(currentPage - 1);
    setDragOffset(0);
  };

  // ---- Gestos tactiles ----
  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      pinchRef.current = { active: true, startDist: getTouchDist(e.touches), startZoom: zoom };
      setIsGesturing(true);
      return;
    }
    if (e.touches.length === 1) {
      if (zoom > 1) {
        panRef.current = {
          active: true,
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          startPan: pan,
        };
        setIsGesturing(true);
        return;
      }
      const now = Date.now();
      if (now - lastTapRef.current < DOUBLE_TAP_MS) {
        lastTapRef.current = 0;
        const rect = stageRef.current?.getBoundingClientRect();
        if (rect) {
          setZoomOrigin({
            x: ((e.touches[0].clientX - rect.left) / rect.width) * 100,
            y: ((e.touches[0].clientY - rect.top) / rect.height) * 100,
          });
        }
        setZoom(DOUBLE_TAP_ZOOM);
        setPan({ x: 0, y: 0 });
        return;
      }
      lastTapRef.current = now;
      touchStartRef.current = e.touches[0].clientX;
      touchXRef.current = touchStartRef.current;
      draggingRef.current = true;
      setIsSwiping(true);
    }
  };

  const handleTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchRef.current.active) {
      const dist = getTouchDist(e.touches);
      const next = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, pinchRef.current.startZoom * (dist / pinchRef.current.startDist)),
      );
      setZoom(next);
      return;
    }
    if (e.touches.length === 1 && zoom > 1 && panRef.current.active) {
      const dx = e.touches[0].clientX - panRef.current.startX;
      const dy = e.touches[0].clientY - panRef.current.startY;
      setPan({ x: panRef.current.startPan.x + dx, y: panRef.current.startPan.y + dy });
      return;
    }
    if (draggingRef.current && zoom <= 1) {
      touchXRef.current = e.touches[0].clientX;
      setDragOffset(touchXRef.current - touchStartRef.current);
    }
  };

  const handleTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) return;
    if (pinchRef.current.active) {
      pinchRef.current.active = false;
      setIsGesturing(false);
      if (zoom <= 1.05) {
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
      return;
    }
    if (panRef.current.active) {
      panRef.current.active = false;
      setIsGesturing(false);
      return;
    }
    if (draggingRef.current) endSwipe();
  };

  // ---- Equivalente con mouse para escritorio ----
  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (zoom > 1) return;
    mouseDraggingRef.current = true;
    touchStartRef.current = e.clientX;
    touchXRef.current = e.clientX;
    setIsSwiping(true);
  };
  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!mouseDraggingRef.current) return;
    touchXRef.current = e.clientX;
    setDragOffset(touchXRef.current - touchStartRef.current);
  };
  const handleMouseUp = () => {
    if (mouseDraggingRef.current) endSwipe();
  };

  const trackTransform =
    stageSize.width > 0
      ? `translateX(${-(currentPage - 1) * stageSize.width + dragOffset}px)`
      : 'translateX(0px)';

  return (
    <div className="relative flex flex-col h-full w-full bg-charcoal-900 overflow-hidden">
      <style>{`
        @keyframes pdfShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .pdf-skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
          animation: pdfShimmer 1.6s ease-in-out infinite;
        }
      `}</style>

      {/* Header fijo */}
      <div
        className="flex-shrink-0 flex items-center justify-center gap-2 py-3 px-4 bg-charcoal-900 border-b border-saffron-500/20"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <img src="/logo/logo-solo-blanco.svg" alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-cream-50 text-xs sm:text-sm font-semibold tracking-widest uppercase">
          {headerLabel}
        </span>
      </div>

      {/* Stage */}
      <div
        ref={stageRef}
        className="relative flex-1 min-h-0 overflow-hidden select-none"
        style={{ touchAction: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {loadingDoc && !loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-charcoal-900 z-20">
            <div className="w-10 h-10 border-[3px] border-saffron-500/25 border-t-saffron-500 rounded-full animate-spin" />
            <span className="text-cream-100/60 text-sm">Cargando carta…</span>
          </div>
        )}

        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center bg-charcoal-900 z-20">
            <p className="text-cream-100/80 text-sm sm:text-base">
              No pudimos cargar la carta aquí, pero puedes verla directamente:
            </p>
            <a
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-saffron-500 text-cream-50 font-semibold rounded-full text-sm hover:bg-saffron-600 transition-colors"
            >
              Ver carta en PDF
            </a>
          </div>
        )}

        {!loadingDoc && !loadError && numPages > 0 && stageSize.width > 0 && (
          <div
            className="flex h-full"
            style={{
              transform: trackTransform,
              transition: isSwiping ? 'none' : `transform ${TRANSITION_MS}ms ease-out`,
            }}
          >
            {pages.map((n) => (
              <div
                key={n}
                className="h-full flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{ width: stageSize.width }}
              >
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    transform:
                      n === currentPage ? `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` : undefined,
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                    transition: isGesturing ? 'none' : 'transform 200ms ease-out',
                  }}
                >
                  {!renderedPages.current.has(n) && (
                    <div className="pdf-skeleton rounded-lg" style={{ width: stageSize.width - 64, height: (stageSize.height - 64) }} />
                  )}
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[n] = el;
                    }}
                    className={`rounded-sm shadow-2xl ${renderedPages.current.has(n) ? '' : 'hidden'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loadingDoc && !loadError && numPages > 1 && (
          <>
            <button
              onClick={() => goTo(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="Página anterior"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-charcoal-900/60 backdrop-blur-sm border border-cream-50/20 text-cream-50 flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none hover:bg-saffron-500 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => goTo(currentPage + 1)}
              disabled={currentPage >= numPages}
              aria-label="Página siguiente"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-charcoal-900/60 backdrop-blur-sm border border-cream-50/20 text-cream-50 flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none hover:bg-saffron-500 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Página X / Y */}
      {!loadingDoc && !loadError && numPages > 0 && (
        <div className="flex-shrink-0 text-center py-1.5 text-cream-100/50 text-xs sm:text-sm">
          Página {currentPage} / {numPages}
        </div>
      )}

      {/* Miniaturas */}
      {!loadingDoc && !loadError && numPages > 1 && (
        <div className="flex-shrink-0 flex gap-2 px-3 py-2 overflow-x-auto bg-charcoal-900/60 border-t border-cream-50/10">
          {pages.map((n) => (
            <button
              key={n}
              onClick={() => goTo(n)}
              aria-label={`Ir a la página ${n}`}
              className={`flex-shrink-0 rounded-md overflow-hidden border-2 transition-all bg-cream-50/5 ${
                n === currentPage ? 'border-saffron-500' : 'border-transparent opacity-60'
              }`}
              style={{ width: THUMB_WIDTH }}
            >
              <canvas
                ref={(el) => {
                  thumbRefs.current[n] = el;
                }}
                className="block w-full"
              />
            </button>
          ))}
        </div>
      )}

      {/* CTA fijo */}
      <div
        className="flex-shrink-0 px-4 py-3 bg-charcoal-900 border-t border-saffron-500/20"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <button
          onClick={onOrder}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1da851] text-white font-bold rounded-xl text-sm sm:text-base transition-all duration-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          Pedir por WhatsApp
        </button>
      </div>
    </div>
  );
}
