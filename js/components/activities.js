import { catalog, groups, groundSteps, muscleSteps, pets } from '../data.js';
import { methodCategories } from '../method-categories.js';
import { favorites } from '../storage.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';
import { backButton } from './common.js';
import { renderBreathingCompanion } from './breathing-companion.js';
import { renderMeditationDetail, meditationMethods } from './meditation.js';
import { renderQuickDetail, quickMethods } from './quick-techniques.js';
import { renderAdviceCollection } from './advice-infographics.js';
import { renderAdviceDetail } from './advice.js';

export function favoriteButton(id) {
  const selected = favorites().includes(id);
  return `<button class="icon-button favorite-button ${selected ? 'is-favorite' : ''}" type="button" data-fav="${id}" aria-label="${selected ? 'Quitar de' : 'Añadir a'} favoritos: ${safe(catalog[id].title)}" aria-pressed="${selected}">${icon('heart')}</button>`;
}
function listItem(id) {
  const x = catalog[id];
  return `<article class="activity-row"><button class="activity-open" type="button" data-open="${id}"><span class="activity-symbol tone-${x.color}" aria-hidden="true">${x.emoji}</span><span class="activity-copy"><strong>${safe(x.title)}</strong><small>${safe(x.sub)}</small></span>${icon('chevron')}</button>${favoriteButton(id)}</article>`;
}

const practiceMenus = {
  breathing: {
    intro: ['Haz una pausa y respira a tu ritmo.'],
    section: 'Un ritmo suave',
    count: '1 práctica',
    emotion: 'exhala suavemente',
    note: 'Aquí no hay prisa.',
    card: id => ({ ...catalog[id], icon: 'breath', subtitle: catalog[id].sub, time: '1 min 4 s', tone: 'breath' }),
  },
  meditation: {
    intro: ['Una pausa para escucharte. Elige', 'lo que te venga bien hoy.'],
    section: 'Un momento para ti',
    count: '4 prácticas',
    emotion: 'medita en calma',
    note: 'No hace falta hacerlo perfecto. Este momento es tuyo.',
    card: id => ({ ...meditationMethods[id], time: `${meditationMethods[id].duration / 60} min`, tone: id }),
  },
  quick: {
    intro: ['Pequeñas pausas para volver a ti.', 'Elige lo que te venga bien hoy.'],
    section: 'Una pausa en tu día',
    count: '3 técnicas',
    emotion: 'observa con atención lo que tiene cerca',
    note: 'Un paso a la vez, con el tiempo que necesites.',
    card(id) {
      const method = quickMethods[id];
      return { ...method, time: method.paceLabel || `${method.minutes} min orientativos`, tone: `quick-${id}` };
    },
  },
};

function renderPracticeMenu(view, petId) {
  const menu = practiceMenus[view];
  const category = methodCategories.find(item => item.group === view);
  const selected = typeof petId === 'string' && Object.hasOwn(pets, petId);
  const artwork = selected ? `<img class="med-category-pet" src="./imagenes/mascotas/reacciones/${category.id}-${petId}.webp" width="640" height="640" alt="${safe(pets[petId].name)} ${menu.emotion}">` : '';
  return `<main class="page collection-page practice-collection ${view}-collection">
    ${backButton()}
    <header class="med-category-heading${selected ? ' has-companion' : ''}">
      <div class="med-category-copy"><span class="eyebrow">A TU RITMO</span><h1>${category.title}</h1><p>${menu.intro.map(safe).join('<br>')}</p></div>
      ${artwork}
    </header>
    <div class="med-section-heading"><h2>${menu.section}</h2><span>${menu.count}</span></div>
    <div class="med-method-list">${category.ids.map(id => {
      const method = menu.card(id);
      return `<article class="med-method-row med-tone-${method.tone}"><button type="button" data-open="${id}" class="med-method-open"><span class="med-symbol">${icon(method.icon)}</span><span class="med-method-copy"><small>${safe(method.time)}</small><strong>${safe(method.title)}</strong><span>${safe(method.subtitle)}</span></span>${icon('chevron')}</button>${favoriteButton(id)}</article>`;
    }).join('')}</div>
    <p class="med-quiet">${menu.note}</p>
  </main>`;
}

export function renderCollection(view, { petId = null } = {}) {
  if (Object.hasOwn(practiceMenus, view)) return renderPracticeMenu(view, petId);
  if (view === 'advice') return renderAdviceCollection({petId, favoriteIds:favorites()});
  const titles = {methods:'Encuentra tu momento',meditation:'Meditación',quick:'Técnicas rápidas',advice:'Pequeñas ideas para ti',favorites:'Mis favoritos'};
  const ids = view === 'favorites' ? favorites() : view === 'methods' ? Object.keys(catalog) : groups[view];
  return `<main class="page collection-page">${['meditation','quick','advice'].includes(view) ? backButton() : ''}<div class="page-intro"><span class="eyebrow">${view==='favorites'?'CERQUITA DE TI':'A TU RITMO'}</span><h1>${titles[view]}</h1><p class="muted">${view==='favorites'?'Tus ejercicios guardados, a mano para cuando los necesites.':'No tienes que hacerlo todo. Elige algo que te venga bien hoy.'}</p></div><div class="activity-list">${ids.length ? ids.map(listItem).join('') : `<div class="empty-state">${icon('heart')}<h2>Un lugar para tus favoritos</h2><p>Guarda un ejercicio tocando su corazón y lo encontrarás aquí.</p><button type="button" class="primary" data-go="methods">Explorar métodos ${icon('arrow')}</button></div>`}</div></main>`;
}
function stepBody(kind) {
  const steps = kind === 'ground' ? groundSteps : muscleSteps;
  const note = kind === 'ground' ? 'Avanza con tranquilidad. Si alguna sensación es difícil de identificar, puedes pasar a la siguiente.' : 'No fuerces músculos o zonas doloridas. Evita tensar áreas lesionadas y detente si aparece dolor.';
  return `<section class="exercise-panel step-panel"><span class="eyebrow" id="${kind}-count">Paso 1 de ${steps.length}</span><h2 id="${kind}-title">${safe(steps[0][0])}</h2><p id="${kind}-desc">${safe(steps[0][1])}</p><progress id="${kind}-progress" max="${steps.length}" value="1" aria-label="Avance del ejercicio"></progress></section><p class="note">${note}</p><div class="actions"><button type="button" class="secondary" data-action="${kind}-prev" disabled>Anterior</button><button type="button" class="primary" data-action="${kind}-next" id="${kind}-next">Siguiente ${icon('arrow')}</button></div>`;
}
export function renderDetail(id, { draft = '', petReturn = null, petId = null, mobile = false } = {}) {
  const x = catalog[id];
  if (x.kind === 'breath') return renderBreathingCompanion({ petId, mobile, petReturn, favoriteHtml: favoriteButton(id) });
  if (Object.hasOwn(meditationMethods, id)) return renderMeditationDetail(id, {petId, petReturn, favoriteHtml:favoriteButton(id)});
  if (Object.hasOwn(quickMethods, id)) return renderQuickDetail(id, {petId, petReturn, favoriteHtml:favoriteButton(id)});
  if (x.kind === 'advice') return renderAdviceDetail(id, {petId, favoriteIds:favorites()});
  let body = '';
  if (x.kind === 'ground' || x.kind === 'muscle') body = stepBody(x.kind);
  if (x.kind === 'reframe') body = `<section class="content-card reflection"><h2>1. Identifica el pensamiento</h2><p>¿Qué me estoy diciendo ahora?</p><h2>2. Pregúntate</h2><p>¿Tengo pruebas de que eso siempre es cierto? ¿Existe otra explicación?</p><h2>3. Prueba una alternativa</h2><p>En lugar de “todo va a salir mal”, intenta “es difícil, pero puedo avanzar paso a paso”.</p></section><button type="button" class="primary" data-open="journal">${icon('journal')} Escribir lo que siento</button>`;
  if (x.kind === 'journal') body = `<p class="muted">Este espacio es tuyo. Escribe sin juzgar lo que sientes.</p><div class="journal-panel"><label for="journal-text">¿Cómo me siento hoy?</label><textarea id="journal-text" class="journal-field" maxlength="10000" rows="9" placeholder="Hoy me siento…">${safe(draft)}</textarea><div class="journal-meta"><span id="journal-status" role="status">Tu nota se guarda al pulsar Guardar.</span><span id="journal-count">${draft.length}/10000</span></div></div><div class="actions"><button type="button" class="primary" data-action="journal-save">Guardar nota ${icon('check')}</button><button type="button" class="secondary" data-action="journal-clear">Borrar nota</button></div><p class="note">Tu texto se guarda solo en este navegador y dispositivo. Evita dejar información privada en un dispositivo compartido.</p>`;
  if (x.kind === 'advice') body = `<article class="content-card advice-card"><span class="advice-symbol" aria-hidden="true">${x.emoji}</span><p>${safe(x.script)}</p></article><p class="note">Cada persona es distinta. Elige las recomendaciones que sean adecuadas para ti.</p>`;
  return `<main class="page detail-page">${backButton()}<div class="detail-heading"><div><span class="eyebrow">UN ESPACIO PARA TI</span><h1>${safe(x.title)}</h1></div>${favoriteButton(id)}</div>${body}${petReturn ? `<button type="button" class="text-button return-companion" data-pet-view="${safe(petReturn)}">${icon('back')} Volver a mi compañía</button>` : ''}</main>`;
}
