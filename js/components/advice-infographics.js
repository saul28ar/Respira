import { icon } from '../icons.js';
import { safe } from '../utils.js';
import { adviceMethods } from '../advice-data.js';
import { adviceInfographics } from '../advice-infographic-data.js';

const adviceEntries = Object.entries(adviceInfographics);

function poster(id, infographic, index, favorites) {
  const title = safe(infographic.title);
  const isFavorite = favorites.has(id);
  return `<article class="info-poster" data-info-slide data-info-id="${id}" data-info-title="${title}" aria-label="${title}">
    <img class="info-poster-image" src="${safe(infographic.image)}" alt="Infografía: ${title}" width="1024" height="1536" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" draggable="false">
    <div class="info-poster-bottom">
      <button type="button" class="info-read" data-info-open="${id}" aria-label="Ver el consejo completo: ${title}">Ver el consejo completo${icon('arrow')}</button>
      <button type="button" class="info-favorite" data-info-favorite="${id}" aria-label="${isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}: ${title}" aria-pressed="${isFavorite}">${icon('heart')}</button>
    </div>
  </article>`;
}

export function renderAdviceCollection({ favoriteIds = [] } = {}) {
  const favorites = new Set(favoriteIds);
  return `<main class="page info-page">
    <a class="info-mobile-brand" href="#home" aria-label="Respira · Tu espacio de calma. Ir al inicio"><img src="./imagenes/welcome/logo-aprobado-v2.png" alt="Respira. Tu espacio de calma." width="1774" height="887" draggable="false"></a>
    <div class="info-compact-header">
      <button type="button" class="back-button" data-info-back aria-label="Volver a métodos">${icon('back')}Volver</button>
      <header class="info-heading"><span class="eyebrow">UNA IDEA PARA TU DÍA</span><h1>Consejos</h1><p><span class="info-desktop-hint">Desliza hacia la izquierda y encuentra otra forma de cuidarte.</span><span class="info-mobile-hint">Desliza la tarjeta</span></p></header>
    </div>
    <div class="info-layout">
      <section class="info-deck" aria-label="Consejos en láminas ilustradas">
        <div class="info-track" data-info-track tabindex="0" role="region" aria-label="Desliza para cambiar de consejo">${adviceEntries.map(([id, infographic], index) => poster(id, infographic, index, favorites)).join('')}</div>
        <div class="info-navigation">
          <button type="button" data-info-prev class="info-arrow" aria-label="Consejo anterior">${icon('back')}</button>
          <div class="info-position">
            <span data-info-position>1 de ${adviceEntries.length}</span>
            <div class="info-dots">${adviceEntries.map(([, infographic], index) => `<button type="button" data-info-dot="${index}" aria-label="Ver ${safe(infographic.title)}"></button>`).join('')}</div>
          </div>
          <button type="button" data-info-next class="info-arrow" aria-label="Consejo siguiente">${icon('arrow')}</button>
        </div>
        <span class="sr-only" data-info-live aria-live="polite"></span>
      </section>
      <aside class="info-desktop-index" aria-labelledby="info-index-title">
        <h2 id="info-index-title">Elige una lámina</h2>
        <div class="info-index-list">${adviceEntries.map(([id, infographic], index) => `<button type="button" data-info-dot="${index}">${icon(adviceMethods[id]?.icon || 'leaf')}<span>${safe(infographic.title)}</span>${icon('chevron')}</button>`).join('')}</div>
      </aside>
    </div>
  </main>`;
}
