import { pets } from '../data.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';

const pathways = [
  {title:'Respiración',subtitle:'Ejercicios para relajarte',image:'lago',symbol:'breath',color:'blue',action:'data-open="breath"'},
  {title:'Meditación',subtitle:'Encuentra un momento de calma',image:'meditacion',symbol:'lotus',color:'pink',action:'data-go="meditation"'},
  {title:'Técnicas rápidas',subtitle:'Para cuando lo necesites',image:'tecnicas',symbol:'bolt',color:'green',action:'data-go="quick"'},
  {title:'Consejos',subtitle:'Pequeñas ideas para ti',image:'consejos',symbol:'bulb',color:'yellow',action:'data-go="advice"'}
];

function companion(petId, message) {
  const pet = pets[petId];
  if (pet) return `<button class="hd3-choose hd3-has-pet" type="button" data-pet-view="${petId}" aria-label="Conocer a ${safe(pet.name)}, tu compañía de hoy" aria-describedby="hd3-companion-message"><span class="hd3-choose-title">Tu compañía</span><span class="hd3-selected-art" aria-hidden="true"><img src="./imagenes/mascotas/${petId}.png" alt="" width="724" height="724"></span><span class="hd3-choose-label">${safe(pet.name)} ${icon('chevron')}</span><span class="hd3-visually-hidden" id="hd3-companion-message" data-pet-message>${safe(message || pet.messages[0])}</span></button>`;
  return `<button class="hd3-choose" type="button" data-go="pet-select" aria-label="Elegir mascota"><span class="hd3-choose-title">Tu compañía</span><span class="hd3-trio" aria-hidden="true">${['brotecito','nubecita','lunita'].map(id=>`<img src="./imagenes/mascotas/${id}.png" alt="" width="724" height="724">`).join('')}</span><span class="hd3-choose-label">Elegir mascota ${icon('chevron')}</span></button>`;
}

// Home 3 · Jardín: texto, navegación y botones reales sobre el arte aprobado.
export function renderDesktopHome({petId=null,message=''}={}) {
  const chosen = Object.hasOwn(pets,petId) ? petId : null;
  const tabs = [['home','Inicio','home'],['methods','Métodos','methods'],['favorites','Favoritos','heart'],['more','Más','settings']];
  return `<div class="home-desktop-jardin">
    <main class="hd3-shell">
      <header class="hd3-topbar"><a class="hd3-brand" href="#welcome" data-go="welcome" aria-label="Respira. Tu espacio de calma."><img src="./imagenes/welcome/logo-aprobado-v2.png" alt="Respira. Tu espacio de calma." width="1774" height="887"></a><nav class="hd3-top-nav" aria-label="Navegación principal">${tabs.map(([route,text,symbol],i)=>`<a href="#${route}" data-go="${route}" class="${i===0?'active':''}" ${i===0?'aria-current="page"':''}>${icon(symbol)}<span>${text}</span></a>`).join('')}</nav><button class="hd3-menu" type="button" data-go="more" aria-label="Abrir opciones">${icon('menu')}</button></header>
      <div class="hd3-layout">
        <section class="hd3-intro" aria-labelledby="hd3-title"><div class="hd3-greeting"><small class="hd3-eyebrow">TU ESPACIO DE CALMA</small><h1 id="hd3-title">¡Qué bueno<br>verte aquí! <i aria-hidden="true">${icon('leaf')}</i></h1><p>Hoy también es un buen día<br>para cuidar de ti.</p></div></section>
        ${companion(chosen,message)}
        <button class="hd3-calm" type="button" data-open="grounding"><span class="hd3-calm-icon">${icon('lotus')}</span><span class="hd3-calm-copy"><strong>Necesito calma</strong><span>Comienza un ejercicio ahora</span></span><span class="hd3-calm-arrow">${icon('chevron')}</span></button>
        <section class="hd3-cards" aria-label="Elige un momento para ti"><div class="hd3-card-grid">${pathways.map(card=>`<button class="hd3-pathway hd3-pathway-${card.color}" type="button" ${card.action}><img class="hd3-card-art" src="./imagenes/inicio-web/${card.image}-hd.png" alt="" width="2048" height="1024"><span class="hd3-card-panel"><span class="hd3-symbol">${icon(card.symbol)}</span><span class="hd3-card-copy"><strong>${card.title}</strong><small>${card.subtitle}</small></span><span class="hd3-card-arrow">${icon('chevron')}</span></span></button>`).join('')}</div></section>
        <button class="hd3-journal" type="button" data-open="journal"><span class="hd3-journal-icon">${icon('journal')}</span><span class="hd3-journal-copy"><strong>Mi espacio para escribir</strong><small>Comparte lo que sientes</small></span><img class="hd3-cat" src="./imagenes/inicio-web/gatito-hd.png" alt="" width="1536" height="1024"><span class="hd3-journal-arrow">${icon('chevron')}</span></button>
      </div>
    </main>
  </div>`;
}
