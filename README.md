# Casa Paella — Sitio web

Sitio estático (HTML/CSS/JS puro, sin backend) para Casa Paella, Bucaramanga.
Tanto el carrito del menú como el formulario de reservas terminan generando
un link `wa.me` con un mensaje pre-armado — no hay pasarela de pago ni base de datos.

## Estructura

```
/index.html            Home
/menu/index.html        Carta completa (buscador, tabs, carrito → WhatsApp)
/reservas/index.html    Reserva en 3 pasos → WhatsApp
/404.html               Página de error
/assets/css/            style.css (global) + menu.css + reservas.css
/assets/js/             i18n.js, main.js, menu-data.js, menu.js, reservas.js
/vercel.json            Configuración de despliegue en Vercel
```

## Cómo desplegar en Vercel

**Opción A — Vercel CLI (más rápido):**
1. `npm i -g vercel` (si no la tienes instalada)
2. Dentro de la carpeta `casa-paella/`, ejecuta `vercel`
3. En las preguntas del asistente: *Set up and deploy* → sí · *Link to
   existing project* → no (si es la primera vez) · *Framework Preset* →
   **Other** · *Build Command* → déjalo vacío · *Output Directory* → `./`
4. Cuando quieras publicarlo en tu dominio de producción: `vercel --prod`

**Opción B — desde el dashboard de Vercel:**
1. Sube esta carpeta a un repositorio de GitHub/GitLab/Bitbucket.
2. En https://vercel.com → **Add New... → Project** → importa el repo.
3. Framework Preset: **Other**. Build Command: vacío. Output Directory: `.`
4. Deploy.

Gracias a `vercel.json` (`trailingSlash: true`), Vercel sirve automáticamente
`/menu/index.html` en `/menu/` y `/reservas/index.html` en `/reservas/` — no
hace falta ninguna otra configuración de rutas.

Para ver el sitio en local antes de subirlo: `npx serve .` o `vercel dev`
dentro de la carpeta (abrir los `.html` con doble clic no funciona igual de
bien porque las rutas absolutas `/assets/...` requieren un servidor).

## Idioma (ES/EN)

El selector del header cambia el idioma de toda la página (incluyendo la
carta y el wizard de reservas) usando el diccionario en `assets/js/i18n.js`.
La preferencia se guarda en `localStorage` del navegador del visitante.

## WhatsApp

El número está centralizado en `assets/js/main.js`:
```js
const WHATSAPP_NUMBER = "573153877124";
```
Si el número cambia, solo hay que actualizarlo ahí.

---

## ⚠️ Pendientes antes de publicar

Este sitio usa **contenido de ejemplo y placeholders visuales** (no fotos
reales ni imágenes generadas) para que puedas reemplazarlos fácilmente.
Nada de lo siguiente es apto para producción tal cual:

### Fotos (prioridad alta)
Todos los recuadros con rayas diagonales y la etiqueta "Foto pendiente: ..."
son marcadores de posición hechos en CSS — **no hay ninguna imagen real ni
generada por IA en el sitio**. Hay que reemplazarlos por fotografía real:
- Hero de home (paellera humeante / terraza)
- Foto de los fundadores (sección "Creadores")
- 5 fotos de "Espacios" (salón, paellera a la vista, mesas, barra, terraza/flamenco)
- Fotos de las 4 tarjetas de "La carta" en home
- Hero de `/menu/` y de `/reservas/`
- Imágenes `og:image` referenciadas en el `<head>` de cada página
  (`/assets/img/optimized/og-*.webp` — esas rutas aún no existen como archivos)

### Contenido a confirmar
- **Nombres de los fundadores**: quedaron como placeholder
  `[Nombre fundador 1] y [Nombre fundador 2]` en `index.html` (sección
  Creadores) y en `assets/js/i18n.js` (`creadores.names`, ES/EN). También
  conviene reemplazar el texto de su historia por algo más personal si lo
  tienes — dejé una versión basada en la "Historia de Marca" del contexto.
- **Eslogan**: propuse *"Una paella, mil razones para celebrar"* / *"One
  paella, a thousand reasons to celebrate"* (`hero.tagline` en `i18n.js`)
  porque el brief no traía uno definido — ajústalo si ya tienes un eslogan
  propio.
- **Precios de la carta**: los precios en `assets/js/menu-data.js` son
  estimaciones dentro del rango de ticket medio-alto ($60.000–$120.000 por
  persona) mencionado en el contexto de marca. Revísalos contra tu carta real.
- **Dirección / teléfono / Instagram**: tomados tal cual del contexto de
  marca (Calle 48 #23-12, Nuevo Sotomayor, Bucaramanga · 315 387 7124 ·
  @casapaella.bucaramanga). Confírmalos.
- **Mapa embebido**: usa un embed de Google Maps sin API key basado en la
  dirección de texto. Si quieres el pin exacto, reemplaza el `src` del
  `iframe` en `index.html` por el embed oficial desde Google Maps
  ("Compartir" → "Insertar un mapa").

### Técnico
- Falta un dominio real para completar `og:image` con URL absoluta una vez
  publicado (hoy son rutas relativas).
- Los horarios de reserva (almuerzo 12–2:30pm, cena 6–9:30pm como última
  hora de entrada) están fijos en `assets/js/reservas.js` → función
  `getAvailableSlots()`. Ajústalos si el horario real de última reserva es
  distinto al de cierre.
