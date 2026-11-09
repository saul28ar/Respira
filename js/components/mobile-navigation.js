const tabs = [
  ['home', 'Inicio', 'inicio'],
  ['methods', 'Métodos', 'metodos'],
  ['favorites', 'Favoritos', 'favoritos'],
  ['more', 'Más', 'mas']
];

// Hojas originales y controles nítidos a cualquier tamaño, como la barra aprobada.
export function renderMobileNavigation(active = 'home') {
  const current = tabs.find(([id]) => id === active) ?? tabs[0];
  const art = `./imagenes/interfaz/barras/respira_barra_${current[2]}_activo.png`;
  const symbols = {home:'home',methods:'methods',favorites:'heart',more:'settings'};
  return `<nav class="mobile-approved-nav" aria-label="Navegación principal" data-active-section="${current[0]}"><span class="mobile-approved-nav-foliage mobile-approved-nav-foliage-left" aria-hidden="true"><img class="mobile-approved-nav-art" src="${art}" alt="" width="1812" height="160" draggable="false"></span><span class="mobile-approved-nav-foliage mobile-approved-nav-foliage-right" aria-hidden="true"><img class="mobile-approved-nav-art" src="${art}" alt="" width="1812" height="160" draggable="false"></span><div class="mobile-approved-nav-links">${tabs.map(([id, label]) => `<a href="#${id}" data-go="${id}" aria-label="${label}"${id === current[0] ? ' aria-current="page"' : ''}>${icon(symbols[id])}<span>${label}</span></a>`).join('')}</div></nav>`;
}
import { icon } from '../icons.js';

