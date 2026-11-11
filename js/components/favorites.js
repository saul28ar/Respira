import { catalog, pets } from '../data.js';
import { favorites } from '../storage.js';
import { safe } from '../utils.js';
import { icon } from '../icons.js';
import { methodArtwork } from '../method-art.js';

// Propuesta 4 aprobada: «Un refugio para volver».
const asset = name => './imagenes/' + name;
const symbols = {breath:'breath',calm:'lotus',anxiety:'sun',sleep:'moon',selflove:'heart',grounding:'leaf',muscle:'bolt',reframe:'spark',journal:'journal',caffeine:'bulb',move:'sun',unplug:'leaf',talk:'heart'};
function isolate(markup) { return markup.replace(/class="([^"]*)"/g, (_, names) => 'class="' + names.split(/\s+/).filter(Boolean).map(name => 'f4-' + name).join(' ') + '"'); }
const nav = className => `<nav class="${className}" aria-label="Navegación principal">${[['home','Inicio','home'],['methods','Métodos','methods'],['favorites','Favoritos','heart'],['more','Más','settings']].map(([route,label,symbol])=>`<a class="${route==='favorites'?'active':''}" href="#${route}" data-go="${route}" ${route==='favorites'?'aria-current="page"':''}>${icon(symbol)}<span>${label}</span>${route==='favorites'?'<i class="active-dot" aria-hidden="true"></i>':''}</a>`).join('')}</nav>`;
function card(id, sortable) {
  const method = catalog[id];
  const title = safe(method.title);
  const advice = method.kind === 'advice';
  const artwork = advice
    ? ''
    : `<span class="picture${id === 'journal' ? ' picture-cat' : ''}"><img src="${methodArtwork(id)}" alt="" width="1254" height="1254" decoding="async"><span class="symbol">${icon(symbols[id] || 'leaf')}</span></span>`;
  return `<article class="favorite-card tone-${method.color}${advice ? ' favorite-advice' : ''}${sortable ? ' favorite-sortable' : ''}" data-card="${id}">
    <button class="card-open" type="button" data-open="${id}" aria-label="Abrir ${title}">${artwork}<span class="card-copy"><strong>${title}</strong><small>${safe(method.sub)}</small></span>${advice ? '' : `<span class="card-arrow">${icon('chevron')}</span>`}</button>
    <button class="favorite" type="button" data-fav="${id}" aria-label="Quitar de favoritos: ${title}" aria-pressed="true">${icon('heart')}</button>
    ${sortable ? `<button class="favorite-grip" type="button" data-favorite-grip aria-label="Mover ${title}" aria-describedby="f4-reorder-help"><span aria-hidden="true"></span></button>` : ''}
  </article>`;
}

function reaction(id, hasFavorites) {
  const portrait = hasFavorites ? `mascotas/reacciones/favoritos-${id}.webp` : `mascotas/${id}.png`;
  return `<div class="intro-art" ${hasFavorites ? `data-favorites-reaction="${id}"` : ''} aria-hidden="true">
    <img data-companion-id="${id}" src="${asset(portrait)}" alt="" width="480" height="480">
  </div>`;
}

export function renderFavorites({ petId = null } = {}) {
  const selected = favorites();
  const chosen = Object.hasOwn(pets, petId) ? petId : null;
  const sortable = selected.length > 1;
  const cards = selected.length
    ? `<div class="section-line"><h2>Un refugio para volver</h2><span>${selected.length} ${selected.length === 1 ? 'guardado' : 'guardados'}</span></div>
      ${sortable ? `<p class="reorder-note">Arrastra para ordenar</p><span id="f4-reorder-help" hidden>Arrastra desde este botón o usa las flechas arriba y abajo para mover la tarjeta.</span>` : ''}
      <section class="favorite-grid" aria-label="Tus ejercicios favoritos">${selected.map(id => card(id, sortable)).join('')}</section>
      <a class="explore" href="#methods"><span>${icon('leaf')} Sigue encontrando tu calma</span><span>Explorar métodos ${icon('arrow')}</span></a>
      <div class="quiet-note">Lo que te hace bien también merece un lugar.</div>`
    : `<section class="empty-state"><div class="empty-heart">${icon('heart')}</div><h2>Un lugar para tus favoritos</h2><p>Guarda un ejercicio tocando su corazón y lo encontrarás aquí.</p><a class="primary" href="#methods">Explorar métodos ${icon('arrow')}</a></section>`;
  return '<div class="favorites-jardin">' + isolate(`
    <div class="page">
      <div class="ambient" aria-hidden="true"></div>
      <svg class="waves" viewBox="0 800 941 872" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><image href="${asset('paisajes/ondas-original.png')}" width="941" height="1672"/></svg>
      <div class="container">
        <header class="topbar"><a class="brand" href="#welcome" aria-label="Respira, tu espacio de calma"><img src="${asset('welcome/logo-aprobado-v2.png')}" alt="Respira. Tu espacio de calma." width="1774" height="887"></a>${nav('top-nav')}<button class="menu" type="button" data-go="more" aria-label="Más opciones">${icon('menu')}</button></header>
        <main>
          <section class="intro${chosen ? ' intro-with-pet' : ''}">
            <div class="intro-copy"><span class="eyebrow">CERQUITA DE TI</span><h1>Mis favoritos</h1><p><span>Tus ejercicios guardados, a mano</span> <span>para cuando los necesites.</span></p></div>
            ${chosen ? reaction(chosen, selected.length > 0) : ''}
          </section>
          ${cards}
        </main>
      </div>
      ${nav('bottom-nav')}
    </div>`) + '</div>';
}
