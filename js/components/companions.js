import { pets, petProfiles } from '../data.js';
import { renderMobileWelcome } from './welcome-mobile.js';
import { renderDesktopWelcome } from './welcome-desktop.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';
import { brand, backButton } from './common.js';

const petIds = ['brotecito', 'nubecita', 'lunita'];
const petActivities = {
  brotecito: ['breath', 'journal', 'move'],
  nubecita: ['breath', 'calm', 'grounding'],
  lunita: ['calm', 'journal', 'muscle']
};
const activityIcons = {
  brotecito: ['breath', 'journal', 'sun'],
  nubecita: ['breath', 'leaf', 'spark'],
  lunita: ['moon', 'journal', 'leaf']
};
const petEmblems = { brotecito: 'leaf', nubecita: 'breath', lunita: 'moon' };
const petHomes = {
  brotecito: 'Brotecito en un valle con flores silvestres',
  nubecita: 'Nubecita flotando sobre el océano al amanecer',
  lunita: 'Lunita en el lago del bosque bajo la luna'
};

function petArtwork(id, className = '', loading = 'lazy') {
  return `<img class="companion-art ${className}" src="./imagenes/mascotas/${id}.png" width="724" height="724" alt="" loading="${loading}">`;
}

export function renderWelcome() {
  return `<main class="page welcome-page">${renderDesktopWelcome()}${renderMobileWelcome()}</main>`;
}

export function renderPetSelect({ petId = null } = {}) {
  const chosen = pets[petId] ? petId : null;
  return `<main class="page companion-select-page">
    <div class="companion-topline">${backButton('Volver')}</div>
    <header class="companion-intro">
      <span class="eyebrow">Un poquito de compañía</span>
      <h1>${chosen ? 'Tu compañía de hoy' : '¿Quién te acompañará hoy?'}</h1>
      <p>${chosen ? `Hoy te acompaña ${safe(pets[chosen].name)}. Mañana podrás elegir nuevamente.` : 'Elige a quien quieras tener cerquita hoy. Sin prisas y a tu manera.'}</p>
    </header>
    <div class="companion-grid">${petIds.map(id => {
      const p = pets[id];
      const isChosen = chosen === id;
      return `<article class="companion-choice companion-${id} ${isChosen ? 'is-chosen' : ''}" aria-labelledby="choose-${id}">
        <div class="companion-portrait">${petArtwork(id, '', 'eager')}${isChosen ? `<span class="companion-chosen-badge">${icon('check')}Tu compañía de hoy</span>` : ''}</div>
        <div class="companion-choice-copy"><h2 id="choose-${id}">${safe(p.name)}</h2><p>${safe(p.subtitle)}</p>
          ${!chosen ? `<button class="primary companion-pick" type="button" data-action="pet-pick" data-pet-id="${id}" aria-label="Elegir a ${safe(p.name)}">Elegir ${icon('arrow')}</button>` : ''}
          <button class="text-button" type="button" data-pet-view="${id}" aria-label="Conocer a ${safe(p.name)}">Conocer su historia ${icon('chevron')}</button>
        </div>
      </article>`;
    }).join('')}</div>
    <footer class="companion-select-footer">
      <p>${chosen ? 'Cada día es una nueva oportunidad para elegir tu compañía.' : 'Tu compañía es opcional. Puedes entrar a Respira sin elegir.'}</p>
      <button class="secondary" type="button" data-go="home">${chosen ? 'Volver al inicio' : 'Ahora no, ir al inicio'} ${icon('arrow')}</button>
      <button class="text-button" type="button" data-go="pet-library">Conoce a tus acompañantes ${icon('chevron')}</button>
    </footer>
  </main>`;
}

export function renderPetLibrary() {
  return `<main class="page companion-library-page">
    <div class="companion-library-foliage" aria-hidden="true">
      <svg class="companion-library-waves" viewBox="0 800 941 872" focusable="false"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg>
      <svg class="companion-library-leaves companion-library-leaves-left" viewBox="0 950 300 722" focusable="false"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg>
      <svg class="companion-library-leaves companion-library-leaves-right" viewBox="670 1120 271 552" focusable="false"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg>
    </div>
    <div class="companion-topline">${backButton('Volver')}</div>
    <header class="companion-intro"><span class="eyebrow">Si quieres, conoce su historia</span><h1>Conoce a tus acompañantes</h1><p>Cada uno tiene una historia para compartir contigo.</p></header>
    <div class="companion-library-list">${petIds.map(id => {
      const p = pets[id];
      return `<button class="companion-library-card companion-${id}" type="button" data-pet-view="${id}">
        <span class="companion-library-portrait"><img class="companion-art" src="./imagenes/mascotas/reacciones/acompanantes-${id}.webp" width="768" height="768" alt="" decoding="async"></span>
        <span class="companion-library-copy"><strong>${safe(p.name)}</strong><span>${safe(p.subtitle)}</span><em>Conocer su historia ${icon('arrow')}</em></span>
      </button>`;
    }).join('')}</div>
  </main>`;
}

export function renderPetDetail({ petId = 'brotecito', chosen = null, returnView = 'pet-select' } = {}) {
  const id = pets[petId] ? petId : 'brotecito';
  const p = pets[id];
  const f = petProfiles[id];
  const chosenId = pets[chosen] ? chosen : null;
  const isChosen = chosenId === id;
  const chosenText = isChosen
    ? 'Mañana podrás elegir nuevamente.'
    : chosenId
      ? `Hoy te acompaña ${pets[chosenId].name}. Mañana podrás elegir nuevamente.`
      : 'Puedes elegir a tu compañía de hoy o seguir explorando Respira.';
  return `<main class="page companion-profile-page companion-${id}">
    <div class="companion-topline"><button class="back-button" type="button" data-go="${safe(returnView)}">${icon('back')}<span>Volver</span></button></div>
    <section class="companion-profile-hero" aria-labelledby="profile-name">
      <div class="companion-profile-copy">
        ${isChosen ? `<span class="companion-profile-chosen">${icon('check')}Tu compañía de hoy</span>` : ''}
        <h1 id="profile-name">${safe(p.name)}</h1>
        <p class="companion-profile-subtitle">${safe(p.subtitle)}</p>
        <blockquote class="companion-message">${icon(petEmblems[id])}<p>“${safe(f.message)}”</p></blockquote>
      </div>
      <div class="companion-profile-scene">
        <img class="companion-profile-art" src="./imagenes/perfiles/perfil-${id}-integrado.webp" width="1536" height="1024" alt="${safe(petHomes[id])}">
      </div>
    </section>
    <div class="companion-profile-sections">
      <section class="companion-profile-details" aria-labelledby="companion-story-title">
        <div class="companion-story"><h2 id="companion-story-title">Su historia</h2><p>${safe(f.short)}</p>
          <details class="companion-full-story"><summary>Leer la historia completa ${icon('chevron')}</summary><p>${safe(f.long)}</p></details>
        </div>
        <details class="companion-detail"><summary>${icon('heart')}<span>Su personalidad</span>${icon('chevron', 'companion-expand')}</summary><div class="companion-detail-copy"><p>${safe(f.personality)}</p></div></details>
        <details class="companion-detail"><summary>${icon('spark')}<span>Lo que representa</span>${icon('chevron', 'companion-expand')}</summary><div class="companion-detail-copy"><p>${safe(f.meaning)}</p><blockquote>“${safe(f.quote)}”</blockquote></div></details>
      </section>
      <section class="companion-activities" aria-labelledby="companion-activities-title"><h2 id="companion-activities-title">Para hacer juntos</h2><div class="companion-activity-list">${f.activities.map(([,title,subtitle], index) => `<button class="companion-activity" type="button" data-open="${petActivities[id][index]}"><span class="companion-activity-icon">${icon(activityIcons[id][index])}</span><span><strong>${safe(title)}</strong><small>${safe(subtitle)}</small></span>${icon('chevron')}</button>`).join('')}</div></section>
    </div>
    <footer class="companion-profile-footer"><p>${safe(chosenText)}</p>${!chosenId ? `<button class="primary" type="button" data-action="pet-pick" data-pet-id="${id}">Elegir a ${safe(p.name)} ${icon('arrow')}</button>` : `<button class="primary" type="button" data-go="home">Volver al inicio ${icon('arrow')}</button>`}</footer>
  </main>`;
}

export function renderPetConfirm({ petId = 'brotecito', saveOk = true } = {}) {
  const id = pets[petId] ? petId : 'brotecito';
  const p = pets[id];
  return `<main class="page companion-confirm-page companion-${id}">
    <div class="companion-confirm-content"><span class="eyebrow">A tu ritmo, con compañía</span>${petArtwork(id, 'companion-confirm-art', 'eager')}<h1>¡${safe(p.name)} te acompañará hoy!</h1><p>Qué bonito tenerte por aquí.<br>Hoy podemos avanzar a tu ritmo.</p><blockquote>“${safe(p.quote)}”</blockquote>${!saveOk ? '<p class="companion-storage-warning" role="status">Tu elección funciona ahora, pero no se pudo guardar para la próxima visita en este dispositivo.</p>' : ''}<button class="primary" type="button" data-go="home">Comenzar ${icon('arrow')}</button><span class="muted">Mañana podrás elegir de nuevo.</span></div>
  </main>`;
}
