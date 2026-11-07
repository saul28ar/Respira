const tabs = [
  ['home', 'Inicio', 'inicio'],
  ['methods', 'Métodos', 'metodos'],
  ['favorites', 'Favoritos', 'favoritos'],
  ['more', 'Más', 'mas']
];

// Arte original completo: no se recortan ni redibujan letras, iconos u hojas.
export function renderMobileNavigation(active = 'home') {
  const current = tabs.find(([id]) => id === active) ?? tabs[0];
  return `<nav class="mobile-approved-nav" aria-label="Navegación principal" data-active-section="${current[0]}"><img class="mobile-approved-nav-art" src="./imagenes/interfaz/barras/respira_barra_${current[2]}_activo.png" alt="" width="1812" height="160" draggable="false"><div class="mobile-approved-nav-links">${tabs.map(([id, label]) => `<a href="#${id}" data-go="${id}" aria-label="${label}"${id === current[0] ? ' aria-current="page"' : ''}><span class="sr-only">${label}</span></a>`).join('')}</div></nav>`;
}
