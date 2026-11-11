import { companionToday } from '../storage.js';
import { dateAtDevice, safe } from '../utils.js';
import { gameCalendar, gameLibraryLevels } from '../components/games.js';
import { games } from './catalog.js';
import { gameProgress, recordGame } from './progress.js';
import { normalizeWordSearchWord as normalize } from './word-search-bank.js';
import { trackGameTime } from './play-time.js';

function bindCalendar(page, petId) {
  const calendar = page.querySelector('.games-calendar');
  const month = new Date();
  month.setDate(1);
  calendar.addEventListener('click', event => {
    const button = event.target.closest('[data-games-month]');
    if (!button || button.disabled) return;
    const step = button.dataset.gamesMonth;
    month.setMonth(month.getMonth() + Number(step));
    calendar.innerHTML = gameCalendar(month, gameProgress(petId));
    const next = calendar.querySelector(`[data-games-month="${step}"]`);
    (next.disabled ? calendar.querySelector('[data-games-month="-1"]') : next).focus();
  });
}

function bindLibrary(page, type, petId) {
  const levels = page.querySelector('[data-games-levels]');
  let group = 0;
  levels.addEventListener('click', event => {
    const button = event.target.closest('[data-games-page]');
    if (!button || button.disabled) return;
    const step = button.dataset.gamesPage;
    group += Number(step);
    levels.innerHTML = gameLibraryLevels(type, games[type], gameProgress(petId), group);
    const next = levels.querySelector(`[data-games-page="${step}"]`);
    (next.disabled ? levels.querySelector('.games-levels a') : next).focus();
  });
}

function lineCells(first, last, size) {
  const rows = Math.floor(last / size) - Math.floor(first / size);
  const columns = last % size - first % size;
  if (rows && columns && Math.abs(rows) !== Math.abs(columns)) return [];
  const step = Math.sign(rows) * size + Math.sign(columns);
  const length = Math.max(Math.abs(rows), Math.abs(columns)) + 1;
  return Array.from({ length }, (_, index) => first + index * step);
}

function bindWordSearch(board, puzzle, say, finish) {
  const { size, words } = puzzle;
  const letters = [...puzzle.board];
  board.innerHTML = `<p class="games-progress" data-puzzle-count>0 de ${words.length} palabras</p>
    <h2 class="games-puzzle-title">${safe(puzzle.title)}</h2>
    <p>Desliza de la primera a la última letra o toca ambos extremos. Busca en diagonal y al revés también.</p>
    <div class="games-grid games-word-grid" role="group" aria-label="Sopa de letras de ${size} por ${size}" style="--columns:${size}">${letters.map((letter, index) => `<button type="button" data-word-cell="${index}" aria-pressed="false" aria-label="${safe(letter)}, fila ${Math.floor(index / size) + 1}, columna ${index % size + 1}">${safe(letter)}</button>`).join('')}</div>
    <ul class="games-word-bank" aria-label="Palabras para encontrar">${words.map(word => `<li>${safe(word)}</li>`).join('')}</ul>`;
  const grid = board.querySelector('.games-word-grid');
  const cells = [...grid.children];
  const wordElements = [...board.querySelectorAll('.games-word-bank li')];
  const targets = new Map(words.map((word, index) => [normalize(word), wordElements[index]]));
  const found = new Set();
  let firstTap;
  let pointer;
  let highlighted = [];

  function highlight(indices) {
    highlighted.forEach(index => cells[index].setAttribute('aria-pressed', 'false'));
    indices.forEach(index => cells[index].setAttribute('aria-pressed', 'true'));
    highlighted = indices;
  }

  function check(first, last) {
    const path = lineCells(first, last, size);
    const value = path.map(index => letters[index]);
    const forward = value.join('');
    const answer = targets.has(forward) ? forward : value.reverse().join('');
    firstTap = undefined;
    highlight([]);
    const target = targets.get(answer);
    if (!target) { say('Ese tramo no forma una palabra de la lista.'); return; }
    if (found.has(answer)) { say('Ya encontraste ' + target.textContent + '.'); return; }
    found.add(answer);
    target.dataset.found = '';
    target.append(Object.assign(document.createElement('span'), { className: 'sr-only', textContent: ', encontrada' }));
    path.forEach(index => { cells[index].dataset.found = ''; });
    board.querySelector('[data-puzzle-count]').textContent = found.size + ' de ' + words.length + ' palabras';
    if (found.size === words.length) {
      cells.forEach(cell => { cell.disabled = true; });
      finish('Encontraste todas las palabras.');
    } else say('Encontraste ' + words[wordElements.indexOf(target)] + '.');
  }

  function tap(index) {
    if (found.size === words.length) return;
    if (firstTap === undefined) {
      firstTap = index;
      highlight([index]);
      say('Elige el otro extremo.');
    } else if (firstTap === index) {
      firstTap = undefined;
      highlight([]);
      say('');
    } else check(firstTap, index);
  }

  function indexOfCell(target) {
    const cell = target?.closest('[data-word-cell]');
    return cell && grid.contains(cell) ? Number(cell.dataset.wordCell) : undefined;
  }

  grid.addEventListener('click', event => {
    const index = indexOfCell(event.target);
    if (event.detail === 0 && index !== undefined) tap(index);
  });
  grid.addEventListener('pointerdown', event => {
    const index = indexOfCell(event.target);
    if (!event.isPrimary || event.button !== 0 || index === undefined || found.size === words.length) return;
    pointer = { id: event.pointerId, first: index, last: index };
    grid.setPointerCapture(event.pointerId);
  });
  grid.addEventListener('pointermove', event => {
    if (pointer?.id !== event.pointerId) return;
    const index = indexOfCell(document.elementFromPoint(event.clientX, event.clientY));
    if (index === undefined || pointer.last === index) return;
    pointer.last = index;
    highlight(lineCells(pointer.first, index, size));
  });
  grid.addEventListener('pointerup', event => {
    if (pointer?.id !== event.pointerId) return;
    const { first, last } = pointer;
    pointer = undefined;
    if (first === last) tap(first);
    else check(first, last);
  });
  grid.addEventListener('pointercancel', event => {
    if (pointer?.id !== event.pointerId) return;
    pointer = undefined;
    highlight(firstTap === undefined ? [] : [firstTap]);
  });
}

function bindCrossword(board, { rows, columns, entries }, say, finish) {
  const byCell = Array.from({ length: rows * columns }, () => []);
  entries.forEach((entry, index) => entry.cells.forEach(cell => byCell[cell].push(index)));
  const solved = new Set();
  let selected = 0;

  board.innerHTML = `<p class="games-progress" data-puzzle-count>0 de ${entries.length} respuestas</p>
    <p>Elige una pista y escribe la palabra completa. Las respuestas acertadas revelan letras en los cruces.</p>
    <div class="games-grid games-cross-grid" role="group" aria-label="Crucigrama" style="--columns:${columns}">${byCell.map((indices, cell) => {
      if (!indices.length) return '<span aria-hidden="true"></span>';
      const start = indices.map(index => entries[index]).find(entry => entry.cells[0] === cell);
      return `<button type="button" data-cross-cell="${cell}" aria-pressed="false" aria-label="Fila ${Math.floor(cell / columns) + 1}, columna ${cell % columns + 1}">${start ? `<small aria-hidden="true">${start.number}</small>` : ''}<span data-cross-letter></span></button>`;
    }).join('')}</div>
    <div class="games-clue-groups">${[['H', 'Horizontales'], ['V', 'Verticales']].map(([direction, name]) => `<div class="games-clue-group">
      <h2>${name}</h2><div role="group" aria-label="${name}">${entries.map((entry, index) => entry.direction === direction
        ? `<button type="button" data-cross-clue="${index}" aria-label="Pista ${entry.number}, ${direction === 'H' ? 'horizontal' : 'vertical'}" aria-pressed="false">${entry.number}</button>`
        : '').join('')}</div></div>`).join('')}</div>
    <form class="games-cross-entry">
      <label for="games-cross-answer"></label>
      <div><input id="games-cross-answer" type="text" placeholder="Escribe la palabra" autocapitalize="characters" autocomplete="off" spellcheck="false" required>
      <button class="primary" type="submit">Comprobar</button></div>
    </form>`;

  const cells = [...board.querySelector('.games-cross-grid').children];
  const clueButtons = [...board.querySelectorAll('[data-cross-clue]')];
  const form = board.querySelector('form');
  const label = form.querySelector('label');
  const input = form.querySelector('input');
  const submit = form.querySelector('button');

  function select(index) {
    selected = index;
    const entry = entries[index];
    const done = solved.has(index);
    label.textContent = entry.number + (entry.direction === 'H' ? ' horizontal' : ' vertical') + ' · ' + entry.answer.length + ' letras. ' + entry.clue;
    input.value = done ? entry.answer : '';
    input.maxLength = entry.answer.length;
    input.readOnly = done;
    submit.disabled = done;
    clueButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.crossClue) === index)));
    cells.forEach(cell => {
      if (cell.tagName === 'BUTTON') cell.setAttribute('aria-pressed', String(entry.cells.includes(Number(cell.dataset.crossCell))));
    });
    say(done ? 'Ya resolviste esta pista.' : '');
  }

  board.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || solved.size === entries.length) return;
    if (button.dataset.crossClue !== undefined) select(Number(button.dataset.crossClue));
    if (button.dataset.crossCell !== undefined) {
      const choices = byCell[Number(button.dataset.crossCell)];
      select(choices[(choices.indexOf(selected) + 1) % choices.length]);
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (solved.has(selected)) return;
    const entry = entries[selected];
    if (normalize(input.value) !== entry.answer) { say('Aún no encaja. Revisa la pista y los cruces.'); return; }
    solved.add(selected);
    entry.cells.forEach((index, position) => {
      const cell = cells[index];
      if (!cell.hasAttribute('data-found')) cell.setAttribute('aria-label', cell.getAttribute('aria-label') + ', ' + entry.answer[position]);
      cell.querySelector('[data-cross-letter]').textContent = entry.answer[position];
      cell.dataset.found = '';
    });
    const button = clueButtons.find(item => Number(item.dataset.crossClue) === selected);
    button.textContent = entry.number + ' ✓';
    button.setAttribute('aria-label', button.getAttribute('aria-label') + ', resuelta');
    board.querySelector('[data-puzzle-count]').textContent = solved.size + ' de ' + entries.length + ' respuestas';
    select(selected);
    if (solved.size === entries.length) finish('Completaste el crucigrama.');
    else say('¡Correcto! Elige otra pista.');
  });
  select(0);
}

function bindPhrase(board, round, say, finish) {
  const parts = round.parts.map(safe);
  const prompt = (pair = ['____', '____']) => parts[0] + '<strong>' + safe(pair[0]) + '</strong>' + parts[1] + '<strong>' + safe(pair[1]) + '</strong>' + parts[2];
  board.innerHTML = `<p class="games-phrase-prompt">${prompt()}</p><div class="games-options" role="group" aria-label="Elige un par para completar la frase">
    ${round.options.map((pair, index) => `<button type="button" data-phrase-answer="${index}" aria-pressed="false"><span>${safe(pair[0])}</span><span aria-hidden="true"> / </span><span>${safe(pair[1])}</span></button>`).join('')}</div>`;
  const options = [...board.querySelectorAll('[data-phrase-answer]')];
  for (const button of options) button.addEventListener('click', () => {
    const index = Number(button.dataset.phraseAnswer);
    options.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    if (index !== round.correct) { say(round.hint); return; }
    board.querySelector('.games-phrase-prompt').innerHTML = prompt(round.options[index]);
    options.forEach(item => { item.disabled = true; });
    finish(round.feedback);
  });
}

const bindPuzzle = { sopa: bindWordSearch, crucigrama: bindCrossword, frase: bindPhrase };

export function bindGames(page, { type, level, petId }) {
  if (!type) { bindCalendar(page, petId); return; }
  if (!level) { bindLibrary(page, type, petId); return; }
  const board = page.querySelector('[data-games-board]');
  const result = page.querySelector('[data-games-result]');
  const done = page.querySelector('[data-games-finish]');
  const dayResult = done.querySelector('[data-games-day-result]');
  const say = text => { result.textContent = text; };
  let stopTime;

  function finish(text) {
    if (!done.hidden) return;
    stopTime?.();
    const progress = recordGame(companionToday(), type, level, dateAtDevice());
    say(text);
    if (!progress) dayResult.textContent = 'Elige una mascota para sumar días con ella.';
    else if (!progress.saved) dayResult.textContent = 'No se pudo guardar el progreso en este dispositivo.';
    else if (!progress.newDay) dayResult.textContent = 'El día de hoy ya estaba marcado en tu calendario.';
    else if (progress.total % 10 === 0) dayResult.textContent = '¡Ganaste la insignia de ' + progress.total + ' días!';
    else dayResult.textContent = 'Sumaste un día al calendario de tu mascota.';
    done.hidden = false;
    done.querySelector('a').focus({ preventScroll: true });
  }

  bindPuzzle[type](board, games[type].levels[level - 1], say, finish);
  stopTime = trackGameTime(() => {
    board.hidden = true;
    say('Llegaste al límite de 4 horas de juego de hoy. Puedes volver mañana.');
  });
  return stopTime;
}
