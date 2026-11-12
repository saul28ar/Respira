import { pets } from '../data.js';
import { icon } from '../icons.js';
import { dateAtDevice, safe } from '../utils.js';
import { games } from '../games/catalog.js';
import { dailyLevel, gameProgress } from '../games/progress.js';
import { latestDraftLevel } from '../games/drafts.js';

const monthFormat = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' });
const dayFormat = new Intl.DateTimeFormat('es', { dateStyle: 'full' });
const daysOfWeek = [['L','lunes'], ['M','martes'], ['M','miércoles'], ['J','jueves'], ['V','viernes'], ['S','sábado'], ['D','domingo']];

function gameBack(href, label = 'Volver') {
  return `<a class="back-button games-back" href="${href}">${icon('back')} ${label}</a>`;
}

const gamesLabel = '<span class="home-games-dice" aria-hidden="true"><i><b></b><b></b><b></b></i><i><b></b><b></b><b></b><b></b><b></b></i></span><span>Juegos</span>';

export function homeGamesButton() {
  return `<button class="home-games-button" type="button" data-go="games">${gamesLabel}</button>`;
}

export function homeGamesLink() {
  return `<a class="home-games-link" href="#games" data-go="games">${gamesLabel}</a>`;
}

export function gameCalendar(month, progress, today = dateAtDevice()) {
  const year = month.getFullYear();
  const number = month.getMonth();
  const blanks = (month.getDay() + 6) % 7;
  const length = new Date(year, number + 1, 0).getDate();
  const cells = Array.from({ length }, (_, index) => {
    const date = new Date(year, number, index + 1);
    const day = dateAtDevice(date);
    const marked = progress.days.has(day);
    return `<li class="games-day${marked ? ' games-day-played' : ''}" ${day === today ? 'aria-current="date"' : ''}><time datetime="${day}"><span class="sr-only">${dayFormat.format(date)}${marked ? ', reto completado' : ''}</span><span aria-hidden="true">${index + 1}</span></time></li>`;
  });
  return `<div class="games-month"><button type="button" data-games-month="-1" aria-label="Mes anterior">${icon('chevron')}</button><strong aria-live="polite">${monthFormat.format(month)}</strong><button type="button" data-games-month="1" aria-label="Mes siguiente" ${dateAtDevice(month) >= today.slice(0, 7) + '-01' ? 'disabled' : ''}>${icon('chevron')}</button></div>
    <div class="games-week" aria-hidden="true">${daysOfWeek.map(([letter, day]) => `<abbr title="${day}">${letter}</abbr>`).join('')}</div>
    <ol class="games-days" aria-label="Días del mes">${'<li aria-hidden="true"></li>'.repeat(blanks)}${cells.join('')}</ol>
    <p class="games-calendar-key"><span></span> Día con un reto completado</p>`;
}

function badges(petId, total) {
  const earned = Math.floor(total / 10);
  return `<div class="games-badges">${Array.from({ length: earned + 1 }, (_, index) => {
    const days = (index + 1) * 10;
    const unlocked = index < earned;
    return `<figure class="games-badge" data-badge-tone="${index % 5}" aria-label="${days} días${unlocked ? ', conseguida' : ', por conseguir'}">
      <span class="games-medal">${unlocked ? `<img src="./imagenes/mascotas/${petId}.png" width="724" height="724" loading="lazy" alt=""><i aria-hidden="true">${days}</i>` : icon('spark')}</span>
      <figcaption>${days} días${unlocked ? '' : '<small>Próxima</small>'}</figcaption></figure>`;
  }).join('')}</div>`;
}

function companionArt(petId) {
  return `<div class="games-companion"><img src="./imagenes/mascotas/${petId || 'nubecita'}.png" alt="" width="724" height="724"></div>`;
}

export function nextGameLevel(type, petId, progress = gameProgress(petId)) {
  const total = games[type].levels.length;
  const draft = latestDraftLevel(petId, type);
  return draft && draft <= total ? draft : dailyLevel(progress, type, total);
}

function renderMenu(petId, progress) {
  const pet = pets[petId];
  const now = new Date();
  return `<main class="page games-page" data-games-view="menu">
    ${gameBack('#home')}
    <header class="games-hero">
      <div><h1>Juegos</h1><p>Explora palabras sobre emociones, apoyo y autocuidado.</p><p class="games-limit">Hasta 4 horas al día</p></div>
      ${companionArt(petId)}
    </header>
    <div class="games-summary">
      ${pet ? `<div><strong>${safe(pet.name)}</strong><p>${progress.playedToday ? 'El reto de hoy ya cuenta.' : 'Completa un reto para sumar el día.'}</p></div>
        <div class="games-numbers"><span><b>${progress.streak}</b> seguidos</span><span><b>${progress.total}</b> acumulados</span></div>`
        : `<div><strong>Tu racha</strong><p>Elige una mascota para sumar días con ella.</p></div><a class="games-link" href="#pet-select">Elegir mascota ${icon('chevron')}</a>`}
    </div>
    <div class="games-cards" aria-label="Elige un juego">${Object.entries(games).map(([type, game]) => {
      const draft = latestDraftLevel(petId, type);
      const level = nextGameLevel(type, petId, progress);
      return `<article class="games-card" data-game-type="${type}"><a class="games-card-main" href="#games/${type}/${level}"><span class="games-symbol">${icon(game.icon)}</span><span><strong>${game.name}</strong><small>${draft ? `Continuar reto ${level} de ${game.levels.length}` : game.description}</small></span>${icon('chevron')}</a></article>`;
    }).join('')}</div>
    <details class="games-details" ${pet ? 'open' : ''}>
      <summary>Calendario ${pet ? `de ${safe(pet.name)}` : ''}</summary>
      <div class="games-calendar">${gameCalendar(new Date(now.getFullYear(), now.getMonth(), 1), progress)}</div>
    </details>
    ${pet ? `<details class="games-details"><summary>Insignias <small>${Math.floor(progress.total / 10)} conseguidas</small></summary>${badges(petId, progress.total)}</details>` : ''}
  </main>`;
}

function renderChallenge(level, game, petId) {
  return `<main class="page games-page games-challenge" data-games-view="challenge">
    ${gameBack('#games')}
    <div class="games-panel" data-games-play>
      <header class="games-play-heading"><div><p>Reto ${level} de ${game.levels.length}</p><h1>${game.name}</h1></div>${companionArt(petId)}</header>
      <div data-games-board></div>
      <p class="games-result" role="status" data-games-result></p>
      <div class="games-hint-bar">
        <p class="games-hint-note" data-games-hint-note role="status" hidden></p>
        <button type="button" class="games-hint-button" data-games-hint aria-label="Pista disponible en 2:00" disabled>
          ${icon('bulb')}
          <span class="games-hint-label" aria-hidden="true">Pista</span>
          <span data-games-hint-status aria-hidden="true">2:00</span>
        </button>
      </div>
      <div class="games-finish" data-games-finish hidden><p data-games-day-result></p><a class="primary" href="#games">Volver a Juegos ${icon('arrow')}</a><a class="games-link" data-games-next>Siguiente reto</a></div>
    </div>
  </main>`;
}

export function renderGames({ type, level, petId }) {
  return type ? renderChallenge(level, games[type], petId) : renderMenu(petId, gameProgress(petId));
}
