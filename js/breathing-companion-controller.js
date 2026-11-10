// Guía 4-4-4-4: solo texto, tiempos y estado. Las animaciones quedan pendientes.
const PHASE_MS = 4000;
const CYCLE_MS = PHASE_MS * 4;
const TOTAL_CYCLES = 4;
const TOTAL_MS = CYCLE_MS * TOTAL_CYCLES;
const PHASES = [
  { id: 'inhale', label: 'Inhala', hint: 'Toma aire suavemente por la nariz.' },
  { id: 'hold', label: 'Mantén', hint: 'Mantén el aire, sin hacer fuerza.' },
  { id: 'exhale', label: 'Exhala', hint: 'Suelta el aire despacio, sin forzarlo.' },
  { id: 'rest', label: 'Pausa', hint: 'Descansa tras exhalar, sin forzar.' }
];

export function bindBreathingCompanion(scope, { announce = () => {} } = {}) {
  const root = scope?.matches?.('.breath-companion')
    ? scope : scope?.querySelector?.('.breath-companion');
  if (!root) return () => {};

  const document = root.ownerDocument;
  const view = document.defaultView;
  const now = () => view.performance.now();
  const find = id => root.querySelector('#' + id);
  const phase = find('phase');
  const seconds = find('phase-seconds');
  const cycles = find('breath-cycles');
  const status = find('breath-status');
  const toggle = find('breath-toggle');
  const totalClock = find('breath-clock');
  const ring = root.querySelector('[data-breath-ring]');
  const phaseItems = [...root.querySelectorAll('[data-breath-phase]')];
  let state = 'ready';
  let elapsedMs = 0;
  let startedAt = null;
  let timeout = null;
  let disposed = false;
  let announcedKey = null;
  let seeker = null;
  let seekWasRunning = null;
  let seeking = false;
  const timeText = milliseconds => { const value = Math.max(0, Math.ceil(milliseconds / 1000)); return String(Math.floor(value / 60)).padStart(2,'0') + ':' + String(value % 60).padStart(2,'0'); };

  const setText = (element, value) => {
    if (element && element.textContent !== value) element.textContent = value;
  };
  const totalElapsed = () => Math.min(TOTAL_MS, elapsedMs + (state === 'running'
    ? Math.max(0, now() - startedAt) : 0));
  const stopTimeout = () => {
    if (timeout !== null) view.clearTimeout(timeout);
    timeout = null;
  };
  const say = (key, message) => {
    if (announcedKey === key) return;
    announcedKey = key;
    announce(message);
  };

  // El contador sigue siendo accesible, pero no se lee en voz alta cada segundo.
  phase?.setAttribute('aria-live', 'off');
  seconds?.setAttribute('aria-live', 'off');

  function paint() {
    if (disposed) return;
    const elapsed = totalElapsed();
    const completed = Math.min(TOTAL_CYCLES, Math.floor(elapsed / CYCLE_MS));
    const running = state === 'running';
    const paused = state === 'paused';
    const finished = state === 'complete';
    const index = Math.floor((elapsed % CYCLE_MS) / PHASE_MS);
    const current = PHASES[index];
    const remaining = Math.max(1, Math.ceil((PHASE_MS - elapsed % PHASE_MS) / 1000));

    root.dataset.state = state;
    root.dataset.phase = paused ? 'paused' : finished ? 'complete' : current.id;
    setText(phase, finished ? 'Completado' : paused ? 'En pausa' : current.label);
    setText(seconds, paused || finished ? '—' : remaining + ' segundos');
    setText(totalClock, timeText(TOTAL_MS - elapsed));
    ring?.setAttribute('stroke-dashoffset', String(1 - elapsed / TOTAL_MS));
    seeker?.update(elapsed / 1000, 'Transcurrido ' + timeText(elapsed) + ' de 01:04');
    setText(cycles, 'Ciclos completados: ' + completed + ' de ' + TOTAL_CYCLES);
    setText(status, finished ? 'Vuelve a respirar con naturalidad.'
      : paused ? 'Respira con naturalidad. Al continuar, empezamos por inhalar.'
      : running ? current.hint : 'Cuando quieras, empezamos.');

    if (toggle) {
      const label = running ? 'Pausar' : finished ? 'Repetir' : paused ? 'Continuar' : 'Iniciar';
      setText(toggle.querySelector('[data-breath-label]') || toggle, label);
      toggle.setAttribute('aria-label', label + ' ejercicio de respiración');
      toggle.setAttribute('aria-pressed', String(running));
    }
    for (const item of phaseItems) {
      const active = !paused && !finished && Number(item.dataset.breathPhase) === index;
      item.classList.toggle('is-active', active);
      if (active) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    }

    if (seeking) return;
    if (finished) say('complete', 'Has completado cuatro ciclos. Respira con naturalidad.');
    else if (paused) say('paused', 'En pausa. Respira con naturalidad. Al continuar, empezaremos por inhalar.');
    else if (running) say('phase-' + Math.floor(elapsed / PHASE_MS), current.label + ', cuatro segundos. ' + current.hint);
    else say('ready', 'Cuando quieras, pulsa Iniciar. Cuatro ciclos, un minuto y cuatro segundos.');
  }

  function complete() {
    stopTimeout();
    elapsedMs = TOTAL_MS;
    startedAt = null;
    state = 'complete';
    paint();
  }

  function tick() {
    timeout = null;
    if (disposed || state !== 'running') return;
    if (document.hidden) { pause(); return; }
    if (totalElapsed() >= TOTAL_MS) { complete(); return; }
    paint();
    schedule();
  }

  function schedule() {
    stopTimeout();
    if (disposed || state !== 'running') return;
    const elapsed = totalElapsed();
    const nextSecond = (Math.floor(elapsed / 1000) + 1) * 1000;
    timeout = view.setTimeout(tick, Math.max(1, Math.ceil(Math.min(nextSecond, TOTAL_MS) - elapsed)));
  }

  function start() {
    if (disposed || state === 'running' || document.hidden) return;
    if (state === 'complete') elapsedMs = 0;
    startedAt = now();
    state = 'running';
    paint();
    schedule();
  }

  function pause() {
    if (disposed || state !== 'running') return;
    const elapsed = totalElapsed();
    if (elapsed >= TOTAL_MS) { complete(); return; }
    stopTimeout();
    // No se reanuda una retención: solo se conservan ciclos ya completados.
    elapsedMs = Math.floor(elapsed / CYCLE_MS) * CYCLE_MS;
    startedAt = null;
    state = 'paused';
    paint();
  }

  function reset() {
    if (disposed) return;
    stopTimeout();
    elapsedMs = 0;
    startedAt = null;
    state = 'ready';
    announcedKey = null;
    paint();
  }

  function click(event) {
    const control = event.target?.closest?.('[data-breath-action]');
    if (!control || !root.contains(control) || control.disabled) return;
    if (!['toggle', 'reset'].includes(control.dataset.breathAction)) return;
    event.preventDefault();
    event.stopPropagation();
    if (control.dataset.breathAction === 'reset') reset();
    else if (state === 'running') pause();
    else start();
  }

  function visibility() {
    if (document.hidden) pause();
  }

  seeker = bindCircularSeek(root.querySelector('.bc-orbit'), {
    duration:TOTAL_MS / 1000,
    getValue:() => totalElapsed() / 1000,
    onInput(value) {
      if (disposed) return;
      if (seekWasRunning === null) seekWasRunning = state === 'running';
      seeking = true;
      stopTimeout();
      elapsedMs = Math.max(0, Math.min(TOTAL_MS, value * 1000));
      startedAt = null;
      state = elapsedMs >= TOTAL_MS ? 'complete' : 'paused';
      paint();
      if (state !== 'complete') {
        const index = Math.floor((elapsedMs % CYCLE_MS) / PHASE_MS);
        setText(phase, PHASES[index].label);
        setText(seconds, Math.max(1,Math.ceil((PHASE_MS - elapsedMs % PHASE_MS) / 1000)) + ' segundos');
      }
    },
    onCommit(value) {
      if (disposed) return;
      const resume = seekWasRunning === true && !document.hidden;
      elapsedMs = Math.max(0,Math.min(TOTAL_MS,value * 1000));
      seeking = false;
      seekWasRunning = null;
      announcedKey = null;
      startedAt = resume ? now() : null;
      state = elapsedMs >= TOTAL_MS ? 'complete' : resume ? 'running' : elapsedMs === 0 ? 'ready' : 'paused';
      paint();
      if (state === 'paused') setText(status, 'Tiempo ajustado. Respira con naturalidad y continúa cuando quieras.');
      if (state === 'running') schedule();
      else announce('Tiempo ajustado. Quedan ' + timeText(TOTAL_MS - elapsedMs) + '.');
    }
  });

  root.addEventListener('click', click);
  document.addEventListener('visibilitychange', visibility);
  paint();
  return () => {
    if (disposed) return;
    disposed = true;
    stopTimeout();
    seeker?.dispose();
    startedAt = null;
    root.removeEventListener('click', click);
    document.removeEventListener('visibilitychange', visibility);
  };
}
import { bindCircularSeek } from './circular-seek.js';

