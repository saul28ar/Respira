import { icon } from '../icons.js';

// Las tres piezas comparten un único tema en css/interface.css.
// La marca conserva el arte original; menú y navegación son controles reales.
export function brand() {
  return `<a class="brand interface-brand" href="#home" aria-label="Respira · Tu espacio de calma. Ir al inicio"><span class="interface-wordmark" aria-hidden="true"><img src="./imagenes/interfaz/marco-original.png" class="interface-wordmark-art" alt="" width="941" height="1672" draggable="false"></span></a>`;
}

function menu() {
  return `<button class="icon-button interface-menu" type="button" data-go="more" aria-label="Abrir menú de opciones">${icon('menu')}</button>`;
}

function leaves(side) {
  return `<svg class="interface-foliage interface-foliage-${side}" viewBox="0 0 90 72" fill="none" aria-hidden="true" focusable="false"><path d="M4 72C30 51 35 28 48 0" stroke="currentColor" stroke-width="1.3"/><path d="M21 56C1 54-1 36 2 22c17 5 23 17 19 34Z" fill="currentColor" opacity=".5"/><path d="M28 43C24 19 39 7 58 4 59 24 47 39 28 43Z" fill="currentColor" opacity=".72"/><path d="M36 29C51 18 66 22 79 33 61 43 47 41 36 29Z" fill="currentColor" opacity=".4"/><path d="M14 64C35 50 53 56 63 70 41 78 24 77 14 64Z" fill="currentColor" opacity=".35"/></svg>`;
}

function navigation(active) {
  const tabs = [['home','Inicio','home'],['methods','Métodos','methods'],['favorites','Favoritos','heart'],['more','Más','settings']];
  return `<nav class="bottom-nav interface-nav" aria-label="Navegación principal">
    ${leaves('left')}${leaves('right')}
    <div class="interface-tabs">${tabs.map(([id,label,symbol]) => `<a class="nav-item ${id === active ? 'is-active' : ''}" href="#${id}" ${id === active ? 'aria-current="page"' : ''}>${icon(symbol)}<span>${label}</span><i class="interface-active-dot" aria-hidden="true"></i></a>`).join('')}</div>
  </nav>`;
}

export function renderFrame(content, { active = 'home', welcome = false, home = false, desktopHome = false, mobileHome = false, methods = false, ownInterface = false, backdrop = '' } = {}) {
  return `<div class="app-shell${home ? desktopHome ? ' app-shell-desktop-home' : mobileHome ? ' app-shell-mobile-jardin' : ' app-shell-home' : methods ? ' app-shell-methods' : ''}" data-interface-theme="botanico">
    ${backdrop}
    <div class="app-interface" data-component="respira-interface">
      ${welcome || desktopHome || mobileHome || methods || ownInterface ? '' : `<header class="app-header interface-header">${brand()}${menu()}</header>${navigation(active)}`}
    </div>
    ${content}
  </div>`;
}
