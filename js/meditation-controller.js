import { meditationMethods } from './components/meditation.js';
import { bindCircularSeek } from './circular-seek.js';

// El tiempo transcurrido guía las etapas; la mascota permanece estática.
export function bindMeditation(scope, { announce = () => {} } = {}) {
  const root = scope?.matches?.('.meditation-session-page')
    ? scope : scope?.querySelector?.('.meditation-session-page');
  const method = root && meditationMethods[root.dataset.meditationId];
  if (!method) return () => {};

  const document = root.ownerDocument;
  const view = document.defaultView;
  const totalMs = method.duration * 1000;
  const phases = method.phases;
  const find = selector => root.querySelector(selector);
  const clock = find('[data-med-clock]');
  const title = find('[data-med-stage-title]');
  const hint = find('[data-med-stage-text]');
  const elapsedLabel = find('[data-med-elapsed]');
  const toggle = find('[data-med-toggle]');
  const progress = find('[data-med-progress]');
  const ring = find('[data-med-ring]');
  const stageItems = [...root.querySelectorAll('[data-med-stage]')];
  const examples = Array.isArray(method.examples) ? method.examples.filter(value => typeof value === 'string' && value.trim()) : [];
  const exampleText = find('[data-med-example]');
  let state = 'idle';
  let elapsedMs = 0;
  let startedAt = null;
  let timeout = null;
  let disposed = false;
  let announcedKey = '';
  let lastStageCue = null;
  let exampleBag = [];
  let lastExample = null;
  let seeking = null;
  let seek = null;

  const text = (element, value) => {
    if (element && element.textContent !== value) element.textContent = value;
  };
  const format = (seconds, padded = false) => {
    const whole = Math.max(0, Math.ceil(seconds));
    const minutes = String(Math.floor(whole / 60));
    return `${padded ? minutes.padStart(2, '0') : minutes}:${String(whole % 60).padStart(2, '0')}`;
  };
  const now = () => view.performance.now();
  const elapsed = () => Math.min(totalMs, elapsedMs + (state === 'running' ? Math.max(0, now() - startedAt) : 0));
  function phaseIndex(milliseconds) {
    let index = 0;
    for (let step = 1; step < phases.length; step++) {
      if (milliseconds >= phases[step].at * 1000) index = step;
    }
    return index;
  }
  const stop = () => {
    if (timeout !== null) view.clearTimeout(timeout);
    timeout = null;
  };
  const say = (key, message) => {
    if (key === announcedKey) return;
    announcedKey = key;
    announce(message);
  };

  function nextExample(shouldAnnounce = false) {
    if (!examples.length || !exampleText) return;
    if (!exampleBag.length) {
      exampleBag = examples.map((_, index) => index);
      for (let index = exampleBag.length - 1; index > 0; index--) {
        const other = Math.floor(Math.random() * (index + 1));
        [exampleBag[index], exampleBag[other]] = [exampleBag[other], exampleBag[index]];
      }
      if (exampleBag.length > 1 && exampleBag[0] === lastExample) {
        [exampleBag[0], exampleBag[1]] = [exampleBag[1], exampleBag[0]];
      }
    }
    lastExample = exampleBag.shift();
    text(exampleText, examples[lastExample]);
    if (shouldAnnounce) announce('Puedes probarlo así: ' + examples[lastExample]);
  }

  function paint() {
    if (disposed) return;
    const currentMs = elapsed();
    const done = state === 'complete';
    const index = phaseIndex(currentMs);
    const phase = phases[index];
    const remaining = Math.max(0, method.duration - currentMs / 1000);
    root.dataset.state = state;
    text(clock, format(remaining, true));
    clock?.setAttribute('aria-live', 'off');
    clock?.setAttribute('aria-label', `${format(remaining)} restantes`);
    text(elapsedLabel, `Transcurrido ${format(Math.floor(currentMs / 1000))} de ${format(method.duration)}`);
    text(title, done ? 'Práctica completada' : phase.label);
    text(hint, done ? phases.at(-1).text : phase.text);
    if (progress) {
      progress.max = method.duration;
      progress.value = currentMs / 1000;
    }
    if (ring) {
      ring.setAttribute('pathLength', '1');
      ring.setAttribute('stroke-dasharray', '1');
      ring.setAttribute('stroke-dashoffset', String(1 - currentMs / totalMs));
    }
    seek?.update(currentMs / 1000, `${format(Math.floor(currentMs / 1000))} transcurridos de ${format(method.duration)}; ${format(remaining)} restantes`);
    if (toggle) {
      const label = state === 'running' ? 'Pausar' : done ? 'Repetir' : state === 'paused' ? 'Continuar' : 'Iniciar';
      text(toggle.querySelector('[data-med-toggle-label]') || toggle, label);
      toggle.setAttribute('aria-label', label + ' meditación');
      toggle.setAttribute('aria-pressed', String(state === 'running'));
    }
    stageItems.forEach(item => {
      const step = Number(item.dataset.medStage);
      const active = !done && step === index;
      item.classList.toggle('is-active', active);
      item.classList.toggle('is-complete', done || step < index);
      if (active) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    if (!seeking) {
      if (done) say('complete', 'Práctica completada. ' + phases.at(-1).text);
      else if (state === 'running') {
        if (!document.hidden && lastStageCue !== index) {
          lastStageCue = index;
          view.navigator.vibrate?.(90);
        }
        say('phase-' + index, phase.label + '. ' + phase.text);
      }
    }
  }

  function complete() {
    stop();
    elapsedMs = totalMs;
    startedAt = null;
    state = 'complete';
    paint();
  }

  function schedule() {
    stop();
    if (disposed || state !== 'running') return;
    const currentMs = elapsed();
    if (currentMs >= totalMs) { complete(); return; }
    const nextSecond = (Math.floor(currentMs / 1000) + 1) * 1000;
    timeout = view.setTimeout(tick, Math.max(1, Math.ceil(Math.min(nextSecond, totalMs) - currentMs)));
  }

  function tick() {
    timeout = null;
    if (disposed || state !== 'running') return;
    if (elapsed() >= totalMs) { complete(); return; }
    if (document.hidden) { pause(); return; }
    paint();
    schedule();
  }

  function start() {
    if (disposed || document.hidden || state === 'running') return;
    if (state === 'complete') elapsedMs = 0;
    if (state === 'complete' || state === 'idle') lastStageCue = null;
    startedAt = now();
    state = 'running';
    announcedKey = '';
    paint();
    schedule();
  }

  function pause() {
    if (disposed || state !== 'running') return;
    const currentMs = elapsed();
    if (currentMs >= totalMs) { complete(); return; }
    stop();
    elapsedMs = currentMs;
    startedAt = null;
    state = 'paused';
    paint();
    say('paused', 'Meditación en pausa. Puedes continuar cuando quieras.');
  }

  function reset() {
    if (disposed) return;
    stop();
    elapsedMs = 0;
    startedAt = null;
    state = 'idle';
    lastStageCue = null;
    paint();
    say('reset', 'Meditación reiniciada. Lista para comenzar.');
  }

  function seekInput(seconds) {
    if (disposed) return;
    if (!seeking) {
      seeking = { state, wasRunning: state === 'running' };
      stop();
    }
    elapsedMs = Math.max(0, Math.min(totalMs, seconds * 1000));
    startedAt = null;
    state = elapsedMs >= totalMs ? 'complete' : seeking.state === 'idle' ? 'idle' : 'paused';
    paint();
  }

  function seekCommit(seconds) {
    if (disposed || !seeking) return;
    const resume = seeking.wasRunning && !document.hidden && seconds < method.duration;
    elapsedMs = Math.max(0, Math.min(totalMs, seconds * 1000));
    state = elapsedMs >= totalMs ? 'complete' : resume ? 'running' : seeking.state === 'idle' ? 'idle' : 'paused';
    startedAt = resume ? now() : null;
    const index = phaseIndex(elapsedMs);
    announcedKey = state === 'complete' ? 'complete' : state === 'running' ? 'phase-' + index : '';
    seeking = null;
    paint();
    announce(`Tiempo ajustado: ${format(Math.floor(elapsedMs / 1000))} de ${format(method.duration)}. ${state === 'complete' ? 'Práctica completada.' : phases[index].label + '.'}`);
    if (resume) schedule();
  }

  function click(event) {
    const button = event.target?.closest?.('[data-med-action]');
    if (!button || !root.contains(button) || button.disabled) return;
    const action = button.dataset.medAction;
    if (!['toggle', 'reset', 'example', 'stage'].includes(action)) return;
    event.preventDefault();
    event.stopPropagation();
    if (action === 'example') nextExample(true);
    else if (action === 'reset') reset();
    else if (action === 'stage') {
      const stage = phases[Number(button.dataset.medStage)];
      if (!stage) return;
      seekInput(stage.at);
      seekCommit(stage.at);
    }
    else if (state === 'running') pause();
    else start();
  }
  function visibility() { if (document.hidden) pause(); }

  root.addEventListener('click', click);
  document.addEventListener('visibilitychange', visibility);
  view.addEventListener('pagehide', pause);
  seek = bindCircularSeek(find('.med-time-orbit'), {
    duration: method.duration,
    getValue: () => elapsed() / 1000,
    onInput: seekInput,
    onCommit: seekCommit
  });
  paint();
  nextExample();
  return () => {
    if (disposed) return;
    disposed = true;
    stop();
    seek.dispose();
    startedAt = null;
    root.removeEventListener('click', click);
    document.removeEventListener('visibilitychange', visibility);
    view.removeEventListener('pagehide', pause);
  };
}
