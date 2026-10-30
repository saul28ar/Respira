import { pets } from '../data.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';

const ids = ['brotecito', 'nubecita', 'lunita'];
const tabs = [['home','Inicio','home'],['methods','Métodos','methods'],['favorites','Favoritos','heart'],['more','Más','settings']];
function isolate(markup) {
  return markup.replace(/class="([^"]*)"/g, (_, names) => 'class="' + names.split(/\s+/).filter(Boolean).map(name => 'ps4-' + name).join(' ') + '"');
}
function navigation(className) {
  return `<nav class="${className}" aria-label="Navegación principal">${tabs.map(([id,label,symbol])=>`<a href="#${id}" data-go="${id}" class="${id==='home'?'active':''}" ${id==='home'?'aria-current="page"':''}>${icon(symbol)}<span>${label}</span>${id==='home'?'<i class="active-dot" aria-hidden="true"></i>':''}</a>`).join('')}</nav>`;
}
function trio() {
  return `<div class="intro-trio" aria-hidden="true">${ids.map(id=>`<img src="./imagenes/mascotas/${id}.png" width="724" height="724" alt="">`).join('')}</div>`;
}
function foliage(side, viewBox) {
  return `<svg class="foliage foliage-${side}" viewBox="${viewBox}" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg>`;
}

// Propuesta 4 aprobada. Las elecciones usan las acciones reales de la app.
export function renderPetSelectJardin({ petId = null } = {}) {
  const chosen = Object.hasOwn(pets, petId) ? petId : null;
  return '<div class="pet-select-jardin">' + isolate(`<div class="page"><div class="ambient" aria-hidden="true"></div><svg class="waves" viewBox="0 800 941 872" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg>${foliage('left','0 950 300 722')}${foliage('right','670 1120 271 552')}<div class="frame">
    <header class="topbar"><a class="brand" href="#welcome" data-go="welcome" aria-label="Respira, tu espacio de calma"><img src="./imagenes/welcome/logo-aprobado-v2.png" width="1774" height="887" alt="Respira. Tu espacio de calma."></a>${navigation('top-nav')}<a class="menu" href="#more" data-go="more" aria-label="Más opciones">${icon('menu')}</a></header>
    <main><section class="intro"><div class="intro-copy"><span class="eyebrow">UN POQUITO DE COMPAÑÍA</span><h1>${chosen?'Tu compañía de hoy':'¿Quién te acompañará hoy?'}</h1><p>${chosen?`Hoy te acompaña ${safe(pets[chosen].name)}. Mañana podrás elegir nuevamente.`:'Elige a quien quieras tener cerquita hoy. Sin prisas y a tu manera.'}</p></div>${trio()}</section>
    <section class="pet-grid" aria-label="${chosen?'Tu compañía de hoy':'Elige tu compañía de hoy'}">${ids.map(id=>`<article class="pet-card pet-${id} ${chosen===id?'chosen':''}" aria-labelledby="pet-select-title-${id}"><div class="pet-art"><img src="./imagenes/mascotas/${id}.png" width="724" height="724" alt=""></div>${chosen===id?`<span class="chosen-badge">${icon('check')}Tu compañía de hoy</span>`:''}<div class="pet-copy"><h2 class="pet-name" id="pet-select-title-${id}">${safe(pets[id].name)}</h2><p class="pet-sub">${safe(pets[id].subtitle)}</p><div class="pet-actions">${!chosen?`<button type="button" class="pet-pick" data-action="pet-pick" data-pet-id="${id}" aria-label="Elegir a ${safe(pets[id].name)}">Elegir ${icon('arrow')}</button>`:''}<a class="pet-history" href="#pet-detail/${id}" data-pet-view="${id}">Conocer su historia ${icon('chevron')}</a></div></div></article>`).join('')}</section>
    <footer class="selection-footer"><p>${chosen?'Cada día es una nueva oportunidad para elegir tu compañía.':'Tu compañía es opcional. Puedes entrar a Respira sin elegir.'}</p><a class="skip" href="#home" data-go="home">${chosen?'Volver al inicio':'Ahora no, ir al inicio'} ${icon('arrow')}</a><a class="library" href="#pet-library" data-go="pet-library">Conoce a tus acompañantes ${icon('chevron')}</a></footer>
    </main></div>${navigation('bottom-nav')}</div>`) + '</div>';
}
