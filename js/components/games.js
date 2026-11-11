import { pets } from '../data.js';
import { icon } from '../icons.js';
import { dateAtDevice, safe } from '../utils.js';
import { games } from '../games/catalog.js';
import { dailyLevel, gameProgress } from '../games/progress.js';

const monthFormat = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' });
const dayFormat = new Intl.DateTimeFormat('es', { dateStyle: 'full' });
const daysOfWeek = [['L','lunes'], ['M','martes'], ['M','miércoles'], ['J','jueves'], ['V','viernes'], ['S','sábado'], ['D','domingo']];

function gameBack(href, label = 'Volver') {
  return `<a class="back-button games-back" href="${href}">${icon('back')} ${label}</a>`;
}

export function homeGamesButton() {
  return `<button class="home-games-button" type="button" data-go="games"><span class="home-games-dice" aria-hidden="true"><i><b></b><b></b><b></b></i><i><b></b><b></b><b></b><b></b><b></b></i></span><span>Juegos</span></button>`;
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

function renderMenu(petId, progress) {
  const pet = pets[petId];
  const now = new Date();
  return `<main class="page games-page" data-games-view="menu">
    ${gameBack('#home')}
    <header class="games-hero">
      <div><h1>Juegos</h1><p>Explora palabras sobre emociones, apoyo y autocuidado.</p><p class="games-limit">Hasta 4 horas al día</p></div>
      <img src="./imagenes/mascotas/${petId || 'nubecita'}.png" alt="" width="724" height="724">
    </header>
    <div class="games-summary">
      ${pet ? `<div><strong>${safe(pet.name)}</strong><p>${progress.playedToday ? 'El reto de hoy ya cuenta.' : 'Completa un reto para sumar el día.'}</p></div>
        <div class="games-numbers"><span><b>${progress.streak}</b> seguidos</span><span><b>${progress.total}</b> acumulados</span></div>`
        : `<div><strong>Tu racha</strong><p>Elige una mascota para sumar días con ella.</p></div><a class="games-link" href="#pet-select">Elegir mascota ${icon('chevron')}</a>`}
    </div>
    <div class="games-cards" aria-label="Elige un juego">${Object.entries(games).map(([type, game]) => `<article class="games-card" data-game-type="${type}">
      <a class="games-card-main" href="#games/${type}/${dailyLevel(progress, type, game.levels.length)}"><span class="games-symbol">${icon(game.icon)}</span><span><strong>${game.name}</strong><small>${game.description}</small></span>${icon('chevron')}</a>
      <a class="games-library-link" href="#games/${type}">Ver los ${game.levels.length} retos<span class="sr-only"> de ${game.name}</span></a>
    </article>`).join('')}</div>
    <details class="games-details" ${pet ? 'open' : ''}>
      <summary>Calendario ${pet ? `de ${safe(pet.name)}` : ''}</summary>
      <div class="games-calendar">${gameCalendar(new Date(now.getFullYear(), now.getMonth(), 1), progress)}</div>
    </details>
    ${pet ? `<details class="games-details"><summary>Insignias <small>${Math.floor(progress.total / 10)} conseguidas</small></summary>${badges(petId, progress.total)}</details>` : ''}
  </main>`;
}

export function gameLibraryLevels(type, game, progress, page) {
  const perPage = 15;
  const start = page * perPage;
  const end = Math.min(start + perPage, game.levels.length);
  return `<div class="games-levels">${Array.from({ length: end - start }, (_, index) => {
    const level = start + index + 1;
    const done = progress.levels.has(type + '_' + level);
    return `<a href="#games/${type}/${level}" ${done ? 'class="games-level-done"' : ''} aria-label="Reto ${level}${done ? ', completado' : ''}">${level}${done ? icon('check') : ''}</a>`;
  }).join('')}</div>
    <div class="games-page-picker"><button type="button" data-games-page="-1" aria-label="Retos anteriores" ${page === 0 ? 'disabled' : ''}>${icon('chevron')}</button>
      <span aria-live="polite">${start + 1}–${end} de ${game.levels.length}</span>
      <button type="button" data-games-page="1" aria-label="Siguientes retos" ${end === game.levels.length ? 'disabled' : ''}>${icon('chevron')}</button></div>`;
}

function renderLibrary(type, game, progress) {
  const next = dailyLevel(progress, type, game.levels.length);
  const solved = [...progress.levels].filter(key => key.startsWith(type + '_')).length;
  return `<main class="page games-page" data-games-view="library">
    ${gameBack('#games')}
    <header class="games-hero games-hero-compact"><div><h1>${game.name}</h1><p>${solved} de ${game.levels.length} retos completados</p></div><span class="games-symbol" data-game-type="${type}">${icon(game.icon)}</span></header>
    <section class="games-panel games-library">
      <a class="primary games-start" href="#games/${type}/${next}">Jugar reto ${next} ${icon('arrow')}</a>
      <div data-games-levels>${gameLibraryLevels(type, game, progress, 0)}</div>
    </section>
  </main>`;
}

function renderChallenge(type, level, game) {
  return `<main class="page games-page games-challenge" data-games-view="challenge">
    ${gameBack('#games/' + type)}
    <div class="games-panel" data-games-play>
      <header class="games-play-heading"><p>Reto ${level} de ${game.levels.length}</p><h1>${game.name}</h1></header>
      <div data-games-board></div>
      <p class="games-result" role="status" data-games-result></p>
      <div class="games-finish" data-games-finish hidden><p data-games-day-result></p><a class="primary" href="#games">Ver mi calendario ${icon('arrow')}</a><a class="games-link" href="#games/${type}">Elegir otro reto</a></div>
    </div>
  </main>`;
}

export function renderGames({ type, level, petId }) {
  if (type && level) return renderChallenge(type, level, games[type]);
  const progress = gameProgress(petId);
  return type ? renderLibrary(type, games[type], progress) : renderMenu(petId, progress);
}
