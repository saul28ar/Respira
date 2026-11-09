import { icon } from '../icons.js';
import { renderMobileNavigation } from './mobile-navigation.js';

// Las tres piezas comparten un único tema en css/interface.css.
// La marca conserva el arte original; menú y navegación son controles reales.
export function brand() {
  return `<a class="brand interface-brand" href="#home" aria-label="Respira · Tu espacio de calma. Ir al inicio"><span class="interface-wordmark" aria-hidden="true"><img src="./imagenes/interfaz/marco-original.png" class="interface-wordmark-art" alt="" width="941" height="1672" draggable="false"></span></a>`;
}

function menu() {
  return `<button class="icon-button interface-menu" type="button" data-go="more" aria-label="Abrir menú de opciones">${icon('menu')}</button>`;
}

function desktopNavigation(active) {
  const tabs = [['home','Inicio','home'],['methods','Métodos','methods'],['favorites','Favoritos','heart'],['more','Más','settings']];
  return `<nav class="interface-desktop-nav" aria-label="Navegación principal">
    ${tabs.map(([id,label,symbol]) => `<a class="${id === active ? 'is-active' : ''}" href="#${id}" data-go="${id}"${id === active ? ' aria-current="page"' : ''}>${icon(symbol)}<span>${label}</span></a>`).join('')}
  </nav>`;
}

export function renderFrame(content, { active = 'home', welcome = false, home = false, desktopHome = false, mobileHome = false, methods = false, ownInterface = false, backdrop = '' } = {}) {
  return `<div class="app-shell${home ? desktopHome ? ' app-shell-desktop-home' : mobileHome ? ' app-shell-mobile-jardin' : ' app-shell-home' : methods ? ' app-shell-methods' : ''}" data-interface-theme="botanico">
    ${backdrop}
    <div class="app-interface" data-component="respira-interface">
      ${welcome || desktopHome || mobileHome || methods || ownInterface ? '' : `<header class="app-header interface-header">${brand()}${desktopNavigation(active)}${menu()}</header>`}
    </div>
    ${content}
    ${welcome ? '' : renderMobileNavigation(active)}
  </div>`;
}
