import { pets } from '../data.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';
import { renderHomeCardArt } from './home-card-art.js';

const pathways = [
  ['Respiración','Ejercicios para relajarte','lago','breath','blue','data-open="breath"'],
  ['Meditación','Encuentra un momento de calma','meditacion','lotus','pink','data-go="meditation"'],
  ['Técnicas rápidas','Para cuando lo necesites','tecnicas','bolt','green','data-go="quick"'],
  ['Consejos','Pequeñas ideas para ti','consejos','bulb','yellow','data-go="advice"']
];
const tabs = [['home','Inicio','home'],['methods','Métodos','methods'],['favorites','Favoritos','heart'],['more','Más','settings']];

function companion(petId) {
  if (petId && Object.hasOwn(pets, petId)) return `<button class="hm1-choose hm1-chosen" type="button" data-pet-view="${petId}" aria-label="Conocer a ${safe(pets[petId].name)}, tu compañía de hoy"><span class="hm1-trio" aria-hidden="true"><img class="hm1-selected-pet" data-companion-id="${petId}" src="./imagenes/mascotas/${petId}.png" width="724" height="724" alt=""></span><span class="hm1-choose-label">${safe(pets[petId].name)} ${icon('chevron')}</span></button>`;
  return `<button class="hm1-choose" type="button" data-go="pet-select"><span class="hm1-trio" aria-hidden="true">${['brotecito','nubecita','lunita'].map(id=>`<img src="./imagenes/mascotas/${id}.png" alt="" width="724" height="724">`).join('')}</span><span class="hm1-choose-label">Elegir mascota ${icon('chevron')}</span></button>`;
}

// Home móvil 1 · Jardín sereno, conservado como composición y controles reales.
export function renderMobileHome({ petId = null, message = '' } = {}) {
  return `<div class="home-mobile-jardin">
    <div class="hm1-ambient" aria-hidden="true"></div><svg class="hm1-waves" viewBox="0 800 941 872" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg>
    <header class="hm1-topbar"><a class="hm1-brand" href="#welcome" data-go="welcome"><img src="./imagenes/welcome/logo-aprobado-v2.png" width="1774" height="887" alt="Respira. Tu espacio de calma."></a><button class="hm1-menu" aria-label="Abrir menú" type="button" data-go="more">${icon('menu')}</button></header>
    <main class="hm1-content"><section class="hm1-hero" aria-labelledby="hm1-title"><div class="hm1-greeting"><span class="hm1-kicker">UN MOMENTO PARA TI</span><h1 id="hm1-title">¡Qué bueno<br>verte aquí! <i aria-hidden="true">${icon('leaf')}</i></h1><p>Hoy también es un buen día<br>para cuidar de ti.</p></div>${companion(petId)}</section>
      <button class="hm1-calm" type="button" data-open="grounding"><span class="hm1-calm-icon">${icon('lotus')}</span><span class="hm1-calm-copy"><strong>Necesito calma</strong><small>Comienza un ejercicio ahora</small></span><span class="hm1-calm-arrow">${icon('chevron')}</span></button>
      <section class="hm1-card-grid" aria-label="Elige un momento para ti">${pathways.map(([title,sub,image,symbol,color,attrs])=>`<button class="hm1-pathway hm1-pathway-${color}" type="button" ${attrs}>${renderHomeCardArt(image,'hm1-card-art')}<span class="hm1-card-panel"><span class="hm1-symbol">${icon(symbol)}</span><span class="hm1-card-copy"><strong>${title}</strong><small>${sub}</small></span><span class="hm1-card-arrow">${icon('chevron')}</span></span></button>`).join('')}</section>
      <button class="hm1-journal" type="button" data-open="journal"><span class="hm1-journal-icon">${icon('journal')}</span><span class="hm1-journal-copy"><strong>Mi espacio para escribir</strong><small>Comparte lo que sientes</small></span><img class="hm1-cat" src="./imagenes/inicio-web/gatito-hd.png" alt="" width="1536" height="1024"><span class="hm1-journal-arrow">${icon('chevron')}</span></button>
    </main><nav class="hm1-bottom-nav" aria-label="Navegación principal"><span class="hm1-nav-leaf hm1-nav-leaf-left" aria-hidden="true">${icon('leaf')}</span><span class="hm1-nav-leaf hm1-nav-leaf-right" aria-hidden="true">${icon('leaf')}</span>${tabs.map(([route,label,symbol],i)=>`<a href="#${route}" data-go="${route}" class="${i===0?'hm1-active':''}" ${i===0?'aria-current="page"':''}>${icon(symbol)}<span>${label}</span>${i===0?'<i class="hm1-active-dot" aria-hidden="true"></i>':''}</a>`).join('')}</nav>
  </div>`;
}
