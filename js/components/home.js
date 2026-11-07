import { pets } from '../data.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';
import { homeArtwork } from './home-art.js';

const pathways = [
  {title:'Respiración',subtitle:'Ejercicios para relajarte',image:'respiracion',symbol:'breath',route:'data-open="breath"',color:'blue'},
  {title:'Meditación',subtitle:'Encuentra un momento de calma',image:'meditacion',symbol:'lotus',route:'data-go="meditation"',color:'pink'},
  {title:'Técnicas rápidas',subtitle:'Para cuando lo necesites',image:'tecnicas',symbol:'bolt',route:'data-go="quick"',color:'green'},
  {title:'Consejos',subtitle:'Pequeñas ideas para ti',image:'consejos',symbol:'bulb',route:'data-go="advice"',color:'yellow'}
];
function companion(petId) {
  const pet = pets[petId];
  if (pet) return `<button class="home-pet" type="button" data-pet-view="${petId}" aria-label="Conocer a ${safe(pet.name)}, tu compañía de hoy"><img class="home-pet-art" src="./imagenes/mascotas/${petId}.png" alt="" width="724" height="724" fetchpriority="high"><span class="home-pet-name">${safe(pet.name)} ${icon('chevron')}</span></button>`;
  return `<button type="button" class="home-choose" data-go="pet-select" aria-label="Elegir mascota: conocer a Brotecito, Nubecita y Lunita"><span class="home-pet-trio" aria-hidden="true">${['brotecito','nubecita','lunita'].map(id=>`<img src="./imagenes/mascotas/${id}.png" alt="" width="724" height="724">`).join('')}</span><span class="home-choose-label">Elegir <br>mascota</span>${icon('chevron')}</button>`;
}
export function renderHome({petId=null,message=''}={}) {
  const chosen = Object.hasOwn(pets,petId) ? petId : null;
  return `<main class="page home-page ${chosen?'home-with-pet':'home-without-pet'}">
    <section class="home-hero" aria-labelledby="home-title"><div class="home-greeting"><h1 id="home-title"><span>¡Qué bueno</span> <span>verte aquí!<i aria-hidden="true">${icon('leaf')}</i></span></h1><p>Hoy también es un buen día para cuidar de ti.</p></div>${companion(chosen)}</section>
    <button type="button" class="home-calm" data-open="grounding"><span class="home-calm-icon">${icon('lotus')}</span><span class="home-calm-copy"><strong>Necesito calma</strong><span>Comienza un ejercicio ahora</span></span><span class="home-calm-arrow">${icon('chevron')}</span></button>
    <section class="home-pathways" aria-labelledby="home-explore-title"><h2 class="sr-only" id="home-explore-title">Elige un momento para ti</h2><div class="home-card-grid">${pathways.map(card=>`<button type="button" class="home-pathway home-pathway-${card.color}" ${card.route}>${homeArtwork(card.image)}<span class="home-pathway-panel"><span class="home-pathway-symbol">${icon(card.symbol)}</span><span class="home-pathway-copy"><strong>${card.title}</strong><span>${card.subtitle}</span></span><span class="home-pathway-arrow">${icon('chevron')}</span></span></button>`).join('')}</div></section>
    <button type="button" class="home-journal" data-open="journal"><span class="home-journal-icon">${icon('journal')}</span><span class="home-journal-copy"><strong>Mi espacio para escribir</strong><span>Comparte lo que sientes</span></span>${homeArtwork('diario','home-journal-cat')}<span class="home-journal-arrow">${icon('chevron')}</span></button>
    ${chosen?`<p class="home-companion-message" data-pet-message><span>${safe(pets[chosen].name)} te acompaña hoy</span>“${safe(message||pets[chosen].messages[0])}”</p>`:''}
  </main>`;
}

