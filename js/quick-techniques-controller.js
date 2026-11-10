import { quickMethods } from './components/quick-techniques.js';

// Los pasos cambian solo cuando la persona elige avanzar, volver o seleccionarlos.
export function bindQuickTechniques(scope, { announce = () => {} } = {}) {
  const root = scope?.matches?.('.quick-session-page')
    ? scope : scope?.querySelector?.('.quick-session-page');
  const id = root?.dataset.quickId;
  const method = id && Object.hasOwn(quickMethods, id) ? quickMethods[id] : null;
  if (!method) return () => {};

  const find = selector => root.querySelector(selector);
  const title = find('[data-quick-title]');
  const description = find('[data-quick-text]');
  const count = find('[data-quick-count]');
  const progress = find('[data-quick-progress]');
  const caption = find('[data-quick-progress-caption]');
  const previous = find('[data-quick-action="previous"]');
  const nextLabel = find('[data-quick-next-label]');
  const note = find('[data-quick-note]');
  const chips = [...root.querySelectorAll('[data-quick-action="step"]')];
  let index = 0;
  let complete = false;
  let disposed = false;

  const text = (element, value) => {
    if (element && element.textContent !== value) element.textContent = value;
  };

  function paint(shouldAnnounce = false) {
    if (disposed) return;
    const step = method.steps[index];
    root.dataset.state = complete ? 'complete' : 'step';
    root.dataset.quickStep = String(index);
    text(count, complete ? 'Recorrido completado' : `Paso ${index + 1} de ${method.steps.length}`);
    text(caption, complete ? 'A tu ritmo' : 'Sin prisa');
    text(title, complete ? 'Un momento para ti' : step[0]);
    text(description, complete ? method.complete : step[1]);
    text(nextLabel, complete ? 'Volver a empezar' : index === method.steps.length - 1 ? 'Finalizar' : 'Siguiente');
    text(note, complete ? 'Puedes repetir el recorrido o quedarte aquí un momento.' : method.note);
    if (previous) previous.disabled = !complete && index === 0;
    if (progress) {
      progress.max = method.steps.length;
      progress.value = complete ? method.steps.length : index + 1;
      progress.setAttribute('aria-valuetext', complete ? 'Recorrido completado' : `Paso ${index + 1} de ${method.steps.length}`);
    }
    chips.forEach(chip => {
      const number = Number(chip.dataset.quickStep);
      const active = !complete && number === index;
      chip.classList.toggle('is-active', active);
      chip.classList.toggle('is-complete', complete || number < index);
      if (active) chip.setAttribute('aria-current', 'step');
      else chip.removeAttribute('aria-current');
    });
    if (shouldAnnounce) announce(complete
      ? `Recorrido completado. ${method.complete}`
      : `Paso ${index + 1} de ${method.steps.length}. ${step[0]}. ${step[1]}`);
  }

  function click(event) {
    const button = event.target?.closest?.('[data-quick-action]');
    if (disposed || !button || !root.contains(button) || button.disabled) return;
    const action = button.dataset.quickAction;
    if (!['step', 'previous', 'next'].includes(action)) return;
    event.preventDefault();
    event.stopPropagation();
    if (action === 'step') {
      const selected = Number(button.dataset.quickStep);
      if (!Number.isInteger(selected) || selected < 0 || selected >= method.steps.length) return;
      index = selected;
      complete = false;
    } else if (action === 'previous') {
      if (complete) complete = false;
      else index = Math.max(0, index - 1);
    } else if (complete) {
      complete = false;
      index = 0;
    } else if (index === method.steps.length - 1) complete = true;
    else index++;
    paint(true);
  }

  root.addEventListener('click', click);
  paint();
  return () => {
    if (disposed) return;
    disposed = true;
    root.removeEventListener('click', click);
  };
}
