import { renderApprovedWelcomePoster } from './welcome-poster.js';

// La versión Esmeralda conserva el diseño aprobado con texto y navegación reales.
export function renderDesktopWelcome() {
  return `<section class="welcome-desktop welcome-desktop-v2" aria-labelledby="welcome-desktop-title">
    <div class="wd2-shell">
      <header class="wd2-topbar">
        <a class="wd2-brand" href="#welcome" data-go="welcome" aria-label="Respira, tu espacio de calma"><img src="./imagenes/welcome/logo-aprobado-v2.png" alt="Respira. Tu espacio de calma." width="1774" height="887" draggable="false"></a>
        <nav class="wd2-toplinks" aria-label="Principal"><a href="#methods" data-go="methods">Métodos</a><a href="#pet-library" data-go="pet-library">Tu compañía</a></nav>
        <a class="wd2-backlink" href="#home" data-go="home">Ir al inicio <span aria-hidden="true">↗</span></a>
      </header>
      <div class="wd2-hero">
        <section class="wd2-copy">
          <div class="wd2-eyebrow"><span aria-hidden="true"></span>UN MOMENTO PARA TI</div>
          <h1 class="wd2-headline" id="welcome-desktop-title">Respira.<br>Estás en tu espacio<br>de calma.</h1>
          <p class="wd2-description">Pequeños momentos para una vida más tranquila. Encuentra una pausa, escucha cómo te sientes y avanza a tu ritmo.</p>
          <div class="wd2-actions"><a class="wd2-primary" href="#pet-select" data-go="pet-select">Iniciar <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a><a class="wd2-quiet-link" href="#methods" data-go="methods">Explorar métodos</a></div>
          <p class="wd2-gentle">Sin prisas. Sin tener que hacerlo perfecto.</p>
        </section>
        <figure class="wd2-art-area"><div class="wd2-art-frame">${renderApprovedWelcomePoster({ imageClass: 'wd2-poster', startId: 'welcome-desktop-start' })}</div></figure>
      </div>
      <footer class="wd2-features" aria-label="Lo que encontrarás en Respira">
        <div class="wd2-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 8h12a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h5a3 3 0 1 1-3 3"/></svg><span>Respira con calma</span></div>
        <div class="wd2-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 3h13v18H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 0v18m4-12h5m-5 4h5"/></svg><span>Dale espacio a lo que sientes</span></div>
        <div class="wd2-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 4C8 1 1 10 7 17c7 6 15-1 13-13Z"/><path d="m5 21 10-11M9 16v-5m0 5h5"/></svg><span>Encuentra tu compañía</span></div>
      </footer>
    </div>
  </section>`;
}
