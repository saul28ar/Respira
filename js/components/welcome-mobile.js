import { renderApprovedWelcomePoster } from './welcome-poster.js';

// La portada es el archivo aprobado; el botón visible conserva sus píxeles.
export function renderMobileWelcome() {
  return `<section class="welcome-mobile" aria-labelledby="welcome-mobile-title">
    <div class="welcome-mobile-stage">
      <h1 class="sr-only" id="welcome-mobile-title">Respira. Tu espacio de calma.</h1>
      ${renderApprovedWelcomePoster({ imageClass: 'welcome-mobile-art', startId: 'welcome-mobile-start' })}
    </div>
  </section>`;
}

