// La portada aprobada se conserva intacta. El CTA es un botón HTML visible:
// su ventana SVG reproduce los mismos píxeles de la portada, sin redibujarlos.
const approvedPoster = './imagenes/welcome/portada-aprobada-v2.png';

export function renderApprovedWelcomePoster({ imageClass, startId }) {
  return `<img class="${imageClass}" src="${approvedPoster}" width="941" height="1671" alt="" aria-hidden="true" fetchpriority="high" draggable="false">
    <button class="welcome-poster-start" id="${startId}" type="button" data-go="pet-select" aria-label="Iniciar Respira">
      <svg viewBox="190 1428 562 140" preserveAspectRatio="none" aria-hidden="true" focusable="false"><image href="${approvedPoster}" x="0" y="0" width="941" height="1671" preserveAspectRatio="none"/></svg>
      <span class="sr-only">Iniciar</span>
    </button>`;
}
