import { pets, petProfiles } from '../data.js';
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

function petArtwork(id, className = '', loading = 'lazy') {
  return `<img class="companion-art ${className}" src="./imagenes/mascotas/${id}.png" width="724" height="724" alt="" loading="${loading}">`;
}

export function renderWelcome() {
  return `<main class="page welcome-page">
    <header class="welcome-header">${brand()}<button class="text-button" type="button" data-go="home">Ir al inicio ${icon('arrow')}</button></header>
    <section class="welcome-hero" aria-labelledby="welcome-title">
      <div class="welcome-copy">
        <span class="eyebrow">Un momento para ti</span>
        <h1 id="welcome-title">Respira.<br>Estás en tu espacio de calma.</h1>
        <p>Pequeños momentos para una vida más tranquila. Encuentra una pausa, escucha cómo te sientes y avanza a tu ritmo.</p>
        <button class="primary welcome-start" type="button" data-go="pet-select">Comenzar ${icon('arrow')}</button>
        <span class="welcome-gentle">Sin prisas. Sin tener que hacerlo perfecto.</span>
      </div>
      <div class="welcome-landscape">
        <img class="welcome-lake" src="./imagenes/paisajes/lago.png" alt="Un lago tranquilo entre montañas, flores y árboles" width="941" height="1672" fetchpriority="high">
        <div class="welcome-friends" aria-hidden="true">${petIds.map(id => petArtwork(id, `welcome-friend welcome-friend-${id}`, 'eager')).join('')}</div>
        <span class="welcome-landscape-caption">Un pequeño refugio, siempre contigo.</span>
      </div>
    </section>
    <div class="welcome-pillars" aria-label="Lo que encontrarás en Respira">
      <div>${icon('breath')}<span>Respira con calma</span></div>
      <div>${icon('journal')}<span>Dale espacio a lo que sientes</span></div>
      <div>${icon('leaf')}<span>Encuentra tu compañía</span></div>
    </div>
  </main>`;
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
    <div class="companion-topline">${backButton('Volver')}</div>
    <header class="companion-intro"><span class="eyebrow">Si quieres, conoce su historia</span><h1>Conoce a tus acompañantes</h1><p>Cada uno tiene una historia para compartir contigo.</p></header>
    <div class="companion-library-list">${petIds.map(id => {
      const p = pets[id];
      return `<button class="companion-library-card companion-${id}" type="button" data-pet-view="${id}">
        ${petArtwork(id)}<span class="companion-library-copy"><strong>${safe(p.name)}</strong><span>${safe(p.subtitle)}</span><em>Conocer su historia ${icon('arrow')}</em></span>
      </button>`;
    }).join('')}</div>
  </main>`;
}

export function renderPetDetail({ petId = 'brotecito', chosen = null, returnView = 'pet-select' } = {}) {
  const id = pets[petId] ? petId : 'brotecito';
  const p = pets[id];
  const f = petProfiles[id];
  const chosenId = pets[chosen] ? chosen : null;
  const chosenText = chosenId === id
    ? 'Es tu compañía de hoy. Mañana podrás elegir nuevamente.'
    : chosenId
      ? `Hoy te acompaña ${pets[chosenId].name}. Mañana podrás elegir nuevamente.`
      : 'Puedes elegir a tu compañía de hoy o seguir explorando Respira.';
  return `<main class="page companion-profile-page companion-${id}">
    <div class="companion-topline"><button class="back-button" type="button" data-go="${safe(returnView)}">${icon('back')}<span>Volver</span></button></div>
    <section class="companion-profile-hero" aria-labelledby="profile-name">
      <div class="companion-profile-copy"><span class="eyebrow">Conoce a tu compañía</span><h1 id="profile-name">${safe(p.name)}</h1><p class="companion-profile-subtitle">${safe(p.subtitle)}</p><div class="companion-message">${icon('heart')}<p>${safe(f.message)}</p></div><span class="companion-essence">${safe(f.meaning)}</span></div>
      <div class="companion-profile-scene"><img src="${p.image}" width="941" height="1672" alt="${safe(p.name)} en su paisaje natural" fetchpriority="high"></div>
    </section>
    <section class="companion-profile-details" aria-label="Descubre más sobre ${safe(p.name)}">
      <details class="companion-detail" open><summary>${icon('leaf')}<span>Su historia</span><span class="companion-expand" aria-hidden="true">+</span></summary><div class="companion-detail-copy"><p>${safe(f.short)}</p><p>${safe(f.long)}</p></div></details>
      <details class="companion-detail"><summary>${icon('heart')}<span>Su personalidad</span><span class="companion-expand" aria-hidden="true">+</span></summary><div class="companion-detail-copy"><p>${safe(f.personality)}</p></div></details>
      <details class="companion-detail"><summary>${icon('spark')}<span>Lo que representa</span><span class="companion-expand" aria-hidden="true">+</span></summary><div class="companion-detail-copy"><p>${safe(f.meaning)}</p><blockquote>“${safe(f.quote)}”</blockquote></div></details>
    </section>
    <blockquote class="companion-quote">“${safe(f.quote)}”</blockquote>
    <section class="companion-activities" aria-labelledby="companion-activities-title"><div class="section-heading"><h2 id="companion-activities-title">Hoy pueden hacer juntos…</h2><p class="muted">Elige algo que te venga bien. Sin ninguna prisa.</p></div><div class="companion-activity-list">${f.activities.map(([,title,subtitle], index) => `<button class="companion-activity" type="button" data-open="${petActivities[id][index]}"><span class="companion-activity-icon">${icon(activityIcons[id][index])}</span><span><strong>${safe(title)}</strong><small>${safe(subtitle)}</small></span>${icon('chevron')}</button>`).join('')}</div></section>
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
