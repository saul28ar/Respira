import { icon } from '../icons.js';

// Un pequeño comienzo: diseño aprobado con las tres mascotas en un mismo paisaje.
export function renderDesktopWelcome() {
  return `<section class="welcome-desktop welcome-desktop-camino" aria-labelledby="welcome-desktop-title">
    <header class="cam-header"><a href="#welcome" data-go="welcome" aria-label="Respira, tu espacio de calma"><img class="cam-logo" src="./imagenes/welcome/logo-aprobado-v2.png" alt="Respira. Tu espacio de calma." width="1774" height="887" draggable="false"></a><nav class="cam-nav" aria-label="Descubre Respira"><button type="button" data-welcome-panel="espacio">Tu espacio</button><button type="button" data-welcome-panel="compania">Tu compañía ${icon('arrow')}</button></nav></header>
    <div class="cam-intro"><p class="cam-kicker">${icon('leaf')}Un lugar para volver a ti</p><h1 id="welcome-desktop-title">Tu calma puede empezar<br>en <em>algo pequeño.</em></h1><p>Respira, escribe lo que llevas dentro o encuentra una compañía.<br>Hay muchas maneras de hacerte un espacio.</p></div>
    <div class="cam-landscape" aria-hidden="true"></div>
    <div class="cam-paths" aria-label="Explora tu primer paso">
      <button class="cam-path" type="button" data-welcome-path="respira" aria-pressed="false">${icon('breath')}<span><strong>Respira</strong><small>Encuentra tu propio ritmo.</small></span></button>
      <button class="cam-path" type="button" data-welcome-path="escribe" aria-pressed="false">${icon('journal')}<span><strong>Escribe</strong><small>Dale un lugar a lo que sientes.</small></span></button>
      <button class="cam-path" type="button" data-welcome-path="compania" aria-pressed="false">${icon('heart')}<span><strong>Encuentra tu compañía</strong><small>Conoce a quien irá contigo.</small></span></button>
    </div>
    <div class="cam-center"><p data-welcome-output aria-live="polite" aria-atomic="true"><strong>¿Por dónde te gustaría empezar?</strong>Toca una opción y descubre tu primer paso.</p><button class="cam-enter" type="button" data-action="start">Entrar a mi espacio ${icon('arrow')}</button><small>A tu ritmo · Sin prisa por hacerlo todo</small></div>
    <p class="cam-footer">${icon('leaf')}Un pequeño momento también cuenta.</p>
    <dialog class="cam-panel" data-welcome-dialog aria-labelledby="welcome-panel-title"><div class="cam-panel-inner"><img src="./imagenes/welcome/logo-aprobado-v2.png" alt="Respira" width="1774" height="887" draggable="false"><h2 id="welcome-panel-title"></h2><p data-welcome-panel-copy></p><button class="cam-enter" type="button" data-action="start">Entrar a Respira ${icon('arrow')}</button><button type="button" class="cam-panel-close" data-welcome-close>Volver a la bienvenida</button></div></dialog>
  </section>`;
}
