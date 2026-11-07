import { dateAtDevice } from './utils.js';
import { loadAgenda, saveAgenda, ensureDay, addPage, addTask, removeTask, isJournalDate } from './journal-storage.js';

let state;
let activeBinding;
let pendingLeave;
const pendingMessage = 'Recuerda guardar tu página antes de salir.';
const failureMessage = 'No se pudo guardar en este dispositivo. Tus cambios siguen aquí; conserva una copia antes de cerrar.';
const mobileQuery = '(max-width: 767px), (max-width: 1024px) and (max-height: 600px) and (orientation: landscape) and (hover: none) and (pointer: coarse)';
const foldNames = new Set(['tasks', 'calendar', 'pages']);

function agenda() {
  if (!state) {
    const loaded = loadAgenda();
    const date = dateAtDevice();
    const day = ensureDay(loaded.document, date);
    state = {
      document: loaded.document, date, pageId: day.pages[0].id, month: date.slice(0, 7),
      recoveredLegacy: loaded.recoveredLegacy, dirty: !loaded.saved, calendarOpen: false,
      loadError: loaded.error || '', unsavedOpen: false, unsavedError: '',
      folds: { mobile: {}, desktop: {} },
      status: loaded.saved ? { kind: 'saved', message: 'Tu agenda se guarda en este dispositivo.' }
        : { kind: 'error', message: loaded.error || failureMessage }
    };
  }
  return state;
}

function currentPage() {
  const value = agenda();
  return ensureDay(value.document, value.date).pages.find(page => page.id === value.pageId);
}

export function journalAgendaView() { return agenda(); }
export function hasPendingJournalChanges() { return Boolean(state?.dirty); }

export function flushJournalAgenda() {
  if (!state?.dirty) return true;
  const saved = saveAgenda(state.document);
  state.dirty = !saved;
  state.status = saved ? { kind: 'saved', message: 'Guardado en este dispositivo.' }
    : { kind: 'error', message: state.loadError || failureMessage };
  activeBinding?.syncStatus();
  return saved;
}

// El callback solo se ejecuta al estar guardado. La vista enlazada muestra el
// diálogo cuando hace falta; un rerender conserva la solicitud pendiente.
export function requestJournalLeave(callback) {
  if (typeof callback !== 'function') return false;
  if (!state?.dirty) {
    pendingLeave = null;
    if (state) state.unsavedOpen = false;
    activeBinding?.closeUnsaved(false);
    callback();
    return true;
  }
  pendingLeave = callback;
  state.unsavedOpen = true;
  state.unsavedError = '';
  activeBinding?.openUnsaved();
  return false;
}

function markDirty() {
  const value = agenda();
  value.dirty = true;
  value.status = { kind: 'dirty', message: pendingMessage };
}

function moveMonth(delta) {
  if (!Number.isFinite(delta)) return;
  const [year, month] = agenda().month.split('-').map(Number);
  const total = Math.max(12, Math.min(9999 * 12 + 11, year * 12 + month - 1 + delta));
  state.month = `${String(Math.floor(total / 12)).padStart(4, '0')}-${String(total % 12 + 1).padStart(2, '0')}`;
}

export function bindJournalAgenda(container, rerender) {
  const value = agenda();
  const calendarDialog = container.querySelector('#journal-calendar');
  const unsavedDialog = container.querySelector('#journal-unsaved');
  const media = globalThis.matchMedia?.(mobileQuery);
  const folds = [...container.querySelectorAll('[data-journal-fold]')]
    .filter(detail => foldNames.has(detail.dataset.journalFold));
  let focusBeforeLeave;
  let selectionBeforeLeave;

  function syncStatus() {
    const element = container.querySelector('#journal-status');
    if (element) {
      element.textContent = value.status.message;
      element.dataset.kind = value.status.kind;
      element.classList.remove('is-saved', 'is-dirty', 'is-error');
      element.classList.add(`is-${value.status.kind}`);
    }
    const count = container.querySelector('#journal-count');
    if (count) count.textContent = `${currentPage().text.length}/10000`;
    const error = container.querySelector('#journal-unsaved-status');
    if (error) error.textContent = value.unsavedError || '';
  }

  function openUnsaved() {
    if (!unsavedDialog) return;
    if (!unsavedDialog.open) {
      focusBeforeLeave = document.activeElement;
      selectionBeforeLeave = null;
      if (focusBeforeLeave?.id === 'journal-text') {
        selectionBeforeLeave = [focusBeforeLeave.selectionStart, focusBeforeLeave.selectionEnd, focusBeforeLeave.selectionDirection];
      }
      unsavedDialog.showModal();
    }
    syncStatus();
  }

  function closeUnsaved(restoreFocus) {
    if (unsavedDialog?.open) unsavedDialog.close();
    if (!restoreFocus) return;
    const target = focusBeforeLeave?.isConnected ? focusBeforeLeave : container.querySelector('#journal-text');
    target?.focus({ preventScroll: true });
    if (selectionBeforeLeave && target?.id === 'journal-text') target.setSelectionRange?.(...selectionBeforeLeave);
  }

  function stay() {
    pendingLeave = null;
    value.unsavedOpen = false;
    value.unsavedError = '';
    closeUnsaved(true);
    syncStatus();
  }

  function saveAndContinue() {
    if (!flushJournalAgenda()) {
      value.unsavedError = value.status.message;
      syncStatus();
      return;
    }
    const callback = pendingLeave;
    pendingLeave = null;
    value.unsavedOpen = false;
    value.unsavedError = '';
    closeUnsaved(false);
    callback?.();
  }

  function changeDate(date) {
    if (!isJournalDate(date)) return;
    const destination = value.document.days[date]?.pages[0]?.id;
    const change = () => {
      value.date = date;
      value.month = date.slice(0, 7);
      value.pageId = ensureDay(value.document, date).pages[0].id;
      value.calendarOpen = false;
      rerender();
    };
    if (date === value.date && destination === value.pageId) { change(); return; }
    requestJournalLeave(change);
  }

  function onClick(event) {
    const target = event.target.closest('[data-journal-date],[data-journal-month],[data-journal-page],[data-journal-action]');
    if (!target || !container.contains(target) || target.disabled) return;
    if (target.dataset.journalDate) { changeDate(target.dataset.journalDate); return; }
    if (target.dataset.journalMonth) { moveMonth(Number(target.dataset.journalMonth)); rerender(); return; }
    if (target.dataset.journalPage) {
      const id = target.dataset.journalPage;
      if (id === value.pageId || !ensureDay(value.document, value.date).pages.some(page => page.id === id)) return;
      requestJournalLeave(() => { value.pageId = id; rerender(); });
      return;
    }
    const action = target.dataset.journalAction;
    if (action === 'stay') { stay(); return; }
    if (action === 'save-continue') { saveAndContinue(); return; }
    if (action === 'today') { changeDate(dateAtDevice()); return; }
    if (action === 'save') { flushJournalAgenda(); syncStatus(); return; }
    if (action === 'add-page') {
      requestJournalLeave(() => {
        const page = addPage(value.document, value.date);
        if (!page) return;
        value.pageId = page.id;
        markDirty(); rerender();
        container.querySelector('#journal-text')?.focus({ preventScroll: true });
      });
      return;
    }
    if (action === 'task-delete') {
      if (removeTask(value.document, value.date, target.dataset.taskId)) { markDirty(); rerender(); }
      return;
    }
    if (action === 'calendar-open') {
      value.calendarOpen = true;
      if (!calendarDialog?.open) calendarDialog?.showModal();
    }
    if (action === 'calendar-close') {
      value.calendarOpen = false;
      calendarDialog?.close();
    }
  }

  function onInput(event) {
    if (event.target.id !== 'journal-text') return;
    const page = currentPage();
    page.text = event.target.value;
    page.updatedAt = new Date().toISOString();
    markDirty(); syncStatus();
  }

  function onChange(event) {
    const taskId = event.target.dataset.journalTaskId;
    if (!taskId) return;
    const task = ensureDay(value.document, value.date).tasks.find(item => item.id === taskId);
    if (!task) return;
    task.done = event.target.checked;
    markDirty(); rerender();
  }

  function onSubmit(event) {
    if (!event.target.matches('[data-journal-task-form]')) return;
    event.preventDefault();
    const input = event.target.elements.namedItem('task');
    if (!addTask(value.document, value.date, input.value.trim())) return;
    markDirty(); rerender();
    container.querySelector('[data-journal-task-form] input')?.focus({ preventScroll: true });
  }

  let currentFoldMode = media?.matches ? 'mobile' : 'desktop';
  const foldMode = () => currentFoldMode;
  function rememberFolds() {
    for (const detail of folds) value.folds[foldMode()][detail.dataset.journalFold] = detail.open;
  }
  function applyFolds() {
    const mode = foldMode();
    for (const detail of folds) detail.open = value.folds[mode][detail.dataset.journalFold]
      ?? (mode === 'desktop' || detail.dataset.journalFold === 'calendar');
  }
  function onFoldToggle(event) {
    const detail = event.currentTarget;
    value.folds[foldMode()][detail.dataset.journalFold] = detail.open;
  }
  function onViewportChange() {
    rememberFolds();
    currentFoldMode = media.matches ? 'mobile' : 'desktop';
    applyFolds();
  }
  function onVisibility() { if (document.hidden) { flushJournalAgenda(); syncStatus(); } }
  function closeCalendar() { value.calendarOpen = false; }
  function cancelUnsaved(event) { event.preventDefault(); stay(); }
  function closeUnsavedFromOutside() { if (value.unsavedOpen) stay(); }

  const binding = { syncStatus, openUnsaved, closeUnsaved };
  activeBinding = binding;
  applyFolds();
  for (const detail of folds) detail.addEventListener('toggle', onFoldToggle);
  media?.addEventListener?.('change', onViewportChange);
  if (media && !media.addEventListener) media.addListener?.(onViewportChange);
  calendarDialog?.addEventListener('cancel', closeCalendar);
  calendarDialog?.addEventListener('close', closeCalendar);
  unsavedDialog?.addEventListener('cancel', cancelUnsaved);
  unsavedDialog?.addEventListener('close', closeUnsavedFromOutside);
  container.addEventListener('click', onClick);
  container.addEventListener('input', onInput);
  container.addEventListener('change', onChange);
  container.addEventListener('submit', onSubmit);
  document.addEventListener('visibilitychange', onVisibility);
  if (value.calendarOpen && !calendarDialog?.open) calendarDialog?.showModal();
  if (value.unsavedOpen) openUnsaved();
  syncStatus();
  return () => {
    // Rerenderizar una tarea o un desplegable no equivale a pulsar Guardar.
    rememberFolds();
    for (const detail of folds) detail.removeEventListener('toggle', onFoldToggle);
    media?.removeEventListener?.('change', onViewportChange);
    if (media && !media.removeEventListener) media.removeListener?.(onViewportChange);
    calendarDialog?.removeEventListener('cancel', closeCalendar);
    calendarDialog?.removeEventListener('close', closeCalendar);
    unsavedDialog?.removeEventListener('cancel', cancelUnsaved);
    unsavedDialog?.removeEventListener('close', closeUnsavedFromOutside);
    container.removeEventListener('click', onClick);
    container.removeEventListener('input', onInput);
    container.removeEventListener('change', onChange);
    container.removeEventListener('submit', onSubmit);
    document.removeEventListener('visibilitychange', onVisibility);
    if (activeBinding === binding) activeBinding = null;
  };
}
