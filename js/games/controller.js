import { companionToday } from '../storage.js';
import { dateAtDevice, safe } from '../utils.js';
import { gameCalendar, nextGameLevel } from '../components/games.js';
import { games } from './catalog.js';
import { gameProgress, recordGame } from './progress.js';
import { normalizeWordSearchWord as normalize } from './word-search-bank.js';
import { trackGameTime } from './play-time.js';
import { clearDraft, readDraft, writeDraft } from './drafts.js';
import { bindGameHint, getHintCharge, saveHintCharge } from './hints.js';

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

function lineCells(first, last, size) {
  const rows = Math.floor(last / size) - Math.floor(first / size);
  const columns = last % size - first % size;
  if (rows && columns && Math.abs(rows) !== Math.abs(columns)) return [];
  const step = Math.sign(rows) * size + Math.sign(columns);
  const length = Math.max(Math.abs(rows), Math.abs(columns)) + 1;
  return Array.from({ length }, (_, index) => first + index * step);
}

function bindWordSearch(board, puzzle, say, finish, { draft, save, note }) {
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
  const matches = [];
  let shownHint = null;
  let firstTap;
  let pointer;
  let highlighted = [];

  function highlight(indices) {
    highlighted.forEach(index => cells[index].setAttribute('aria-pressed', 'false'));
    indices.forEach(index => cells[index].setAttribute('aria-pressed', 'true'));
    highlighted = indices;
  }

  function matchingWord(first, last) {
    const path = lineCells(first, last, size);
    const value = path.map(index => letters[index]);
    const forward = value.join('');
    const answer = targets.has(forward) ? forward : value.reverse().join('');
    return { answer, path };
  }

  function markWord(answer, path, ends) {
    const target = targets.get(answer);
    found.add(answer);
    matches.push(ends);
    target.dataset.found = '';
    target.append(Object.assign(document.createElement('span'), { className: 'sr-only', textContent: ', encontrada' }));
    path.forEach(index => { cells[index].dataset.found = ''; });
    board.querySelector('[data-puzzle-count]').textContent = found.size + ' de ' + words.length + ' palabras';
  }

  function showHint(hint) {
    if (shownHint) delete cells[shownHint.start].dataset.hint;
    shownHint = hint;
    if (hint) cells[hint.start].dataset.hint = '';
    note(hint ? 'Busca ' + targets.get(hint.word).textContent + ' desde la casilla marcada.' : '');
  }

  if (Array.isArray(draft.matches)) {
    for (const ends of draft.matches) {
      if (!Array.isArray(ends) || ends.length !== 2 || !ends.every(index => Number.isInteger(index) && cells[index])) continue;
      const { answer, path } = matchingWord(...ends);
      if (targets.has(answer) && !found.has(answer)) markWord(answer, path, ends);
    }
  }
  if (draft.wordHint && targets.has(draft.wordHint.word) && !found.has(draft.wordHint.word) &&
      Number.isInteger(draft.wordHint.start) && cells[draft.wordHint.start]) showHint(draft.wordHint);

  function check(first, last) {
    const { answer, path } = matchingWord(first, last);
    firstTap = undefined;
    highlight([]);
    const target = targets.get(answer);
    if (!target) { say('Ese tramo no forma una palabra de la lista.'); return; }
    if (found.has(answer)) { say('Esa palabra ya está marcada.'); return; }
    markWord(answer, path, [first, last]);
    if (shownHint?.word === answer) showHint(null);
    if (found.size === words.length) {
      cells.forEach(cell => { cell.disabled = true; });
      finish('Encontraste todas las palabras.');
    } else {
      save({ matches, wordHint: shownHint });
      say('Encontraste ' + words[wordElements.indexOf(target)] + '.');
    }
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

  return () => {
    const word = [...targets.keys()].find(value => !found.has(value) && value !== shownHint?.word);
    if (!word) { say('Ya tienes marcada la pista para la palabra que falta.'); return false; }
    for (let start = 0; start < letters.length; start++) {
      if (letters[start] !== word[0]) continue;
      for (let end = 0; end < letters.length; end++) {
        const path = lineCells(start, end, size);
        if (path.length !== word.length || path.map(index => letters[index]).join('') !== word) continue;
        showHint({ start, word });
        save({ wordHint: shownHint });
        say('');
        return true;
      }
    }
    return false;
  };
}

function bindCrossword(board, { rows, columns, entries }, say, finish, { draft, save, note }) {
  const byCell = Array.from({ length: rows * columns }, () => []);
  entries.forEach((entry, index) => entry.cells.forEach(cell => byCell[cell].push(index)));
  const solved = new Set();
  const hints = new Set();
  const answers = entries.map((entry, index) => typeof draft.answers?.[index] === 'string' ? draft.answers[index].slice(0, entry.answer.length) : '');
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
  const positions = cells.map(cell => cell.getAttribute('aria-label'));

  function select(index) {
    selected = index;
    const entry = entries[index];
    const done = solved.has(index);
    label.textContent = entry.number + (entry.direction === 'H' ? ' horizontal' : ' vertical') + ' · ' + entry.answer.length + ' letras. ' + entry.clue;
    input.value = done ? entry.answer : answers[index];
    input.maxLength = entry.answer.length;
    input.readOnly = done;
    submit.disabled = done;
    clueButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.crossClue) === index)));
    cells.forEach(cell => {
      if (cell.tagName === 'BUTTON') cell.setAttribute('aria-pressed', String(entry.cells.includes(Number(cell.dataset.crossCell))));
    });
    say(done ? 'Ya resolviste esta pista.' : '');
  }

  function saveCross() {
    save({ answers, solved: [...solved], crossHints: [...hints], selected });
  }

  function reveal(index, letter, isHint = false) {
    const cell = cells[index];
    cell.setAttribute('aria-label', positions[index] + ', ' + letter);
    cell.querySelector('[data-cross-letter]').textContent = letter;
    cell.dataset[isHint ? 'hint' : 'found'] = '';
    if (!isHint) delete cell.dataset.hint;
  }

  function markSolved(index) {
    if (solved.has(index)) return;
    solved.add(index);
    const entry = entries[index];
    entry.cells.forEach((cell, position) => reveal(cell, entry.answer[position]));
    const button = clueButtons.find(item => Number(item.dataset.crossClue) === index);
    button.textContent = entry.number + ' ✓';
    button.setAttribute('aria-label', button.getAttribute('aria-label') + ', resuelta');
    board.querySelector('[data-puzzle-count]').textContent = solved.size + ' de ' + entries.length + ' respuestas';
  }

  if (Array.isArray(draft.solved)) {
    for (const index of draft.solved) if (Number.isInteger(index) && entries[index]) markSolved(index);
  }
  if (Array.isArray(draft.crossHints)) {
    for (const cell of draft.crossHints) {
      if (!Number.isInteger(cell) || !byCell[cell]?.length) continue;
      hints.add(cell);
      if (cells[cell].hasAttribute('data-found')) continue;
      const entry = entries[byCell[cell][0]];
      reveal(cell, entry.answer[entry.cells.indexOf(cell)], true);
    }
  }

  board.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || solved.size === entries.length) return;
    if (button.dataset.crossClue !== undefined) select(Number(button.dataset.crossClue));
    if (button.dataset.crossCell !== undefined) {
      const choices = byCell[Number(button.dataset.crossCell)];
      select(choices[(choices.indexOf(selected) + 1) % choices.length]);
    }
    if (button.dataset.crossClue !== undefined || button.dataset.crossCell !== undefined) saveCross();
  });

  input.addEventListener('input', () => {
    if (solved.has(selected)) return;
    answers[selected] = input.value;
    saveCross();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (solved.has(selected)) return;
    const entry = entries[selected];
    if (normalize(input.value) !== entry.answer) { say('Aún no encaja. Revisa la pista y los cruces.'); return; }
    markSolved(selected);
    select(selected);
    if (solved.size === entries.length) finish('Completaste el crucigrama.');
    else {
      saveCross();
      say('¡Correcto! Elige otra pista.');
    }
  });
  select(Number.isInteger(draft.selected) && entries[draft.selected] ? draft.selected : 0);
  return () => {
    const entry = entries[selected];
    const cell = entry.cells.find(index => !cells[index].querySelector('[data-cross-letter]').textContent);
    if (cell === undefined) { say('Esta palabra ya muestra todas sus letras. Puedes elegir otra.'); return false; }
    const position = entry.cells.indexOf(cell);
    reveal(cell, entry.answer[position], true);
    hints.add(cell);
    saveCross();
    note(`Letra ${position + 1} de esta palabra: ${entry.answer[position]}.`);
    say('');
    return true;
  };
}

function bindPhrase(board, round, say, finish, { draft, save, note }) {
  const parts = round.parts.map(safe);
  const prompt = (pair = ['____', '____']) => parts[0] + '<strong>' + safe(pair[0]) + '</strong>' + parts[1] + '<strong>' + safe(pair[1]) + '</strong>' + parts[2];
  board.innerHTML = `<p class="games-phrase-prompt">${prompt()}</p><div class="games-options" role="group" aria-label="Elige un par para completar la frase">
    ${round.options.map((pair, index) => `<button type="button" data-phrase-answer="${index}" aria-pressed="false"><span>${safe(pair[0])}</span><span aria-hidden="true"> / </span><span>${safe(pair[1])}</span></button>`).join('')}</div>`;
  const options = [...board.querySelectorAll('[data-phrase-answer]')];
  const wrong = options.map((_, index) => index).filter(index => index !== round.correct);
  let hints = Number.isInteger(draft.phraseHints) ? Math.max(0, Math.min(3, draft.phraseHints)) : 0;
  let choice = wrong.includes(draft.phraseChoice) ? draft.phraseChoice : null;

  function updateHints() {
    const eliminated = wrong.slice(0, Math.max(0, hints - 1));
    if (eliminated.includes(choice)) choice = null;
    options.forEach((item, index) => {
      item.disabled = eliminated.includes(index);
      item.toggleAttribute('data-eliminated', item.disabled);
      item.setAttribute('aria-pressed', String(index === choice));
    });
    if (hints) note(round.hint + (eliminated.length ? ` Opciones descartadas: ${eliminated.length}.` : ''));
  }
  updateHints();
  for (const button of options) button.addEventListener('click', () => {
    const index = Number(button.dataset.phraseAnswer);
    options.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    if (index !== round.correct) {
      choice = index;
      save({ phraseChoice: choice });
      say('Ese par no encaja. Prueba otra opción.');
      return;
    }
    board.querySelector('.games-phrase-prompt').innerHTML = prompt(round.options[index]);
    options.forEach(item => { item.disabled = true; });
    finish(round.feedback);
  });
  return () => {
    if (hints >= 3) { say('Ya tienes las pistas de esta frase. Elige entre las opciones restantes.'); return false; }
    hints++;
    updateHints();
    save({ phraseHints: hints, phraseChoice: choice });
    say('');
    return true;
  };
}

const bindPuzzle = { sopa: bindWordSearch, crucigrama: bindCrossword, frase: bindPhrase };

export function bindGames(page, { type, level, petId }) {
  if (!type) { bindCalendar(page, petId); return; }
  const board = page.querySelector('[data-games-board]');
  const result = page.querySelector('[data-games-result]');
  const done = page.querySelector('[data-games-finish]');
  const dayResult = done.querySelector('[data-games-day-result]');
  const hintBar = page.querySelector('.games-hint-bar');
  const hintNote = page.querySelector('[data-games-hint-note]');
  const draft = readDraft(petId, type, level);
  const save = patch => writeDraft(petId, type, level, patch);
  const note = text => { hintNote.textContent = text; hintNote.hidden = !text; };
  const say = text => { result.textContent = text; };
  let stopTime;
  let stopHint;

  function finish(text) {
    if (!done.hidden) return;
    stopTime?.();
    stopHint?.();
    clearDraft(petId, type, level);
    hintBar.hidden = true;
    note('');
    const progress = recordGame(petId, type, level, dateAtDevice(), { countDay: companionToday() === petId });
    say(text);
    if (!progress?.saved) dayResult.textContent = 'No se pudo guardar el progreso en este dispositivo.';
    else if (!progress.markDay) dayResult.textContent = 'Reto guardado. Elige tu compañía de hoy para sumar días.';
    else if (!progress.newDay) dayResult.textContent = 'El día de hoy ya estaba marcado en tu calendario.';
    else if (progress.total % 10 === 0) dayResult.textContent = '¡Ganaste la insignia de ' + progress.total + ' días!';
    else dayResult.textContent = 'Sumaste un día al calendario de tu mascota.';
    const total = games[type].levels.length;
    const allSolved = progress && [...progress.levels].filter(key => key.startsWith(type + '_')).length >= total;
    const next = allSolved ? level % total + 1 : nextGameLevel(type, petId);
    done.querySelector('[data-games-next]').href = '#games/' + type + '/' + next;
    done.hidden = false;
    done.querySelector('a').focus({ preventScroll: true });
  }

  const hint = bindPuzzle[type](board, games[type].levels[level - 1], say, finish, { draft, save, note });
  stopTime = trackGameTime(() => {
    stopHint?.();
    board.hidden = true;
    hintBar.hidden = true;
    note('');
    say('Llegaste al límite de 4 horas de juego de hoy. Puedes volver mañana.');
  });
  if (!board.hidden) {
    stopHint = bindGameHint({
      button: hintBar.querySelector('button'),
      status: hintBar.querySelector('[data-games-hint-status]'),
      elapsed: getHintCharge(petId, type),
      save: elapsed => saveHintCharge(petId, type, elapsed),
      onHint: hint
    });
  }
  return () => { stopHint?.(); stopTime?.(); };
}
