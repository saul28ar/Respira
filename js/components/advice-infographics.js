import { icon } from '../icons.js';
import { safe } from '../utils.js';
import { pets } from '../data.js';
import { adviceMethods } from '../advice-data.js';
const summaries = {
 caffeine:{tag:'Un cambio pequeño también cuenta',points:[['Observa cómo te sienta','Nota si te altera o interfiere con tu descanso.'],['Prueba algo pequeño','Una porción menor puede ser un comienzo.'],['Ve gradualmente','Si decides reducirla, hazlo poco a poco.']],scene:'coffee'},
 move:{tag:'Tu forma de moverte también cuenta',points:[['Encuentra tu forma','Camina, mueve las manos o estírate sentado.'],['Empieza sin exigirte','Un minuto puede ser un comienzo.'],['Escucha tu cuerpo','Adapta la intensidad o descansa.']],scene:'steps'},
 unplug:{tag:'Que el ruido espere un momento',points:[['Baja el ruido','Silencia los avisos que puedan esperar.'],['Mira a tu alrededor','Aparta la pantalla un momento.'],['Elige cómo volver','Conserva los contactos importantes para ti.']],scene:'phone'},
 talk:{tag:'No hace falta explicarlo todo',points:[['Elige a alguien seguro','Busca a quien te escuche con respeto.'],['Di lo que necesitas','«¿Puedes escucharme un rato?».'],['Comparte a tu ritmo','Puedes poner límites o detenerte.']],scene:'talk'},
 food:{tag:'Escucharte sin juzgarte',points:[['Escucha tus necesidades','Hambre y emociones pueden aparecer juntas.'],['Date permiso','No necesitas justificar que tienes hambre.'],['Cuídate sin castigos','Evita compensar saltándote comidas.']],scene:'plate'},
 grief:{tag:'Un espacio para lo que sientes',points:[['Dale espacio a lo que aparece','Las reacciones pueden mezclarse o volver.'],['Sigue tu propio ritmo','No hay etapas que debas completar.'],['Busca compañía','Puedes pedir un pequeño apoyo.']],scene:'memory'}
};
const ids = Object.keys(summaries);
function sceneMarkup(scene, petId) {
 const illustrations = {
  coffee:'<div class="info-coffee"><span class="info-steam"></span><span class="info-steam second"></span><span class="info-cup"></span><span class="info-saucer"></span></div>',
  steps:'<div class="info-footprints"><span></span><span></span><i></i><i></i></div>',
  phone:`<div class="info-phone"><span>${icon('leaf')}</span><small>Una pausa</small></div>`,
  talk:'<div class="info-bubbles"><span>Te escucho</span><span>A tu ritmo</span></div>',
  plate:`<div class="info-plate"><span>${icon('leaf')}</span><i></i><b></b></div>`,
  memory:`<div class="info-memory">${icon('heart')}<span>Con calma</span></div>`
 };
 return `<div class="info-scene" aria-hidden="true"><div class="info-scene-shade"></div>${illustrations[scene] || ''}${petId ? `<img class="info-scene-pet" data-companion-id="${safe(petId)}" src="./imagenes/mascotas/${petId}.png" alt="" width="724" height="724">` : ''}<span class="info-scene-caption">Un pequeño cuidado también cuenta.</span></div>`;
}
function poster(id, petId, favorites) {
 const method = adviceMethods[id], summary = summaries[id];
 return `<article class="info-poster info-tone-${id}" data-info-slide data-info-id="${id}" data-info-title="${safe(method.title)}" aria-label="${safe(method.title)}">
  <div class="info-poster-top"><span>${icon(method.icon)}UN CUIDADO POSIBLE</span><button type="button" class="info-favorite" data-info-favorite="${id}" aria-label="${favorites.has(id) ? 'Quitar de favoritos' : 'Guardar en favoritos'}: ${safe(method.title)}" aria-pressed="${favorites.has(id)}">${icon('heart')}</button></div>
  <h2>${safe(method.title)}</h2><p class="info-tagline">${safe(summary.tag)}</p>
  <ul class="info-points">${summary.points.map(([title,text])=>`<li><span class="info-point-leaf">${icon('leaf')}</span><span><strong>${safe(title)}</strong><span>${safe(text)}</span></span></li>`).join('')}</ul>
  ${sceneMarkup(summary.scene, petId)}
  <div class="info-poster-bottom"><button type="button" class="info-read" data-info-open="${id}">Ver el consejo completo${icon('arrow')}</button></div>
 </article>`;
}
export function renderAdviceCollection({ petId = null, favoriteIds = [] } = {}) {
 const selectedPet = typeof petId === 'string' && Object.hasOwn(pets, petId) ? petId : null;
 const favorites = new Set(favoriteIds);
 return `<main class="page info-page"><a class="info-mobile-brand" href="#home" aria-label="Respira · Tu espacio de calma. Ir al inicio"><img src="./imagenes/welcome/logo-aprobado-v2.png" alt="Respira. Tu espacio de calma." width="1774" height="887" draggable="false"></a><div class="info-compact-header"><button type="button" class="back-button" data-info-back aria-label="Volver a métodos">${icon('back')}Volver</button><header class="info-heading"><span class="eyebrow">UNA IDEA PARA TU DÍA</span><h1>Consejos</h1><p><span class="info-desktop-hint">Desliza hacia la izquierda y encuentra otra forma de cuidarte.</span><span class="info-mobile-hint">Desliza la tarjeta</span></p></header></div>
  <div class="info-layout"><section class="info-deck" aria-label="Consejos en láminas ilustradas">
   <div class="info-track" data-info-track tabindex="0" role="region" aria-label="Desliza para cambiar de consejo">${ids.map(id => poster(id, selectedPet, favorites)).join('')}</div>
   <div class="info-navigation"><button type="button" data-info-prev class="info-arrow" aria-label="Consejo anterior">${icon('back')}</button><div class="info-position"><span data-info-position>1 de 6</span><div class="info-dots">${ids.map((id,index)=>`<button type="button" data-info-dot="${index}" aria-label="Ver ${safe(adviceMethods[id].title)}"></button>`).join('')}</div></div><button type="button" data-info-next class="info-arrow" aria-label="Consejo siguiente">${icon('arrow')}</button></div><span class="sr-only" data-info-live aria-live="polite"></span>
  </section><aside class="info-desktop-index"><span class="eyebrow">ELIGE UNA LÁMINA</span><h2>Un momento para ti</h2><p>Puedes empezar por la que te venga bien hoy.</p>${ids.map((id,index)=>`<button type="button" data-info-dot="${index}">${icon(adviceMethods[id].icon)}<span>${safe(adviceMethods[id].title)}</span>${icon('chevron')}</button>`).join('')}</aside></div>
 </main>`;
}

