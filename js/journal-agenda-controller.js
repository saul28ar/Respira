import { dateAtDevice } from './utils.js';
import { loadAgenda, saveAgenda, ensureDay, addPage, addTask, removeTask, isJournalDate, getTasksForDate, pinTask, unpinTask, setTaskDone } from './journal-storage.js';

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
      folds: { mobile: {}, desktop: {} }, closedPageIds: [], scheduleEditor: null,
      status: loaded.saved ? { kind: 'saved', message: 'Tu agenda se guarda en este dispositivo.' }
        : { kind: 'error', message: loaded.error || failureMessage }
    };
  }
  return state;
}

function currentPage() {
  const value = agenda();
  if (value.pageId === null) return null;
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
  const scheduleDialog = container.querySelector('#journal-task-schedule');
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
    if (count) count.textContent = `${currentPage()?.text.length || 0}/10000`;
    const error = container.querySelector('#journal-unsaved-status');
    if (error) error.textContent = value.unsavedError || '';
  }

  function openUnsaved() {
    if (!unsavedDialog) return;
    if (!unsavedDialog.open) {
      focusBeforeLeave = document.activeElement;
      selectionBeforeLeave = null;
      if (['journal-text', 'journal-title'].includes(focusBeforeLeave?.id)) {
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
    if (selectionBeforeLeave && ['journal-text', 'journal-title'].includes(target?.id)) target.setSelectionRange?.(...selectionBeforeLeave);
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

  function changeDate(date, pageId = null) {
    if (!isJournalDate(date)) return;
    const existing = value.document.days[date]?.pages || [];
    const destination = existing.find(page => page.id === pageId)?.id || existing[0]?.id;
    const change = () => {
      value.date = date;
      value.month = date.slice(0, 7);
      const pages = ensureDay(value.document, date).pages;
      value.pageId = pages.find(page => page.id === pageId)?.id || pages[0].id;
      value.closedPageIds = value.closedPageIds.filter(id => id !== value.pageId);
      value.calendarOpen = false;
      rerender();
    };
    if (date === value.date && destination === value.pageId) { change(); return; }
    requestJournalLeave(change);
  }

  function openSchedule(taskId) {
    const task = getTasksForDate(value.document, value.date).find(item => item.id === taskId);
    if (!task) return;
    const routine = task.routineId ? value.document.routines?.find(item => item.id === task.routineId) : null;
    value.scheduleEditor = {
      taskId, text: task.text, mode: routine?.mode || 'daily',
      dates: routine?.mode === 'dates' ? [...routine.dates] : [value.date],
      month: value.date.slice(0, 7), error: ''
    };
    rerender();
  }

  function renderSchedule(focusSelector) {
    const scroll = container.querySelector('#journal-task-schedule')?.scrollTop || 0;
    rerender();
    const dialog = container.querySelector('#journal-task-schedule');
    if (dialog) dialog.scrollTop = scroll;
    if (focusSelector) container.querySelector(focusSelector)?.focus({ preventScroll: true });
  }

  function cancelSchedule() {
    const taskId = value.scheduleEditor?.taskId;
    value.scheduleEditor = null;
    rerender();
    const button = [...container.querySelectorAll('[data-journal-action="task-pin"]')].find(item => item.dataset.taskId === taskId);
    (button || container.querySelector('[data-journal-fold="tasks"] summary'))?.focus({ preventScroll: true });
  }

  function saveSchedule() {
    const editor = value.scheduleEditor;
    if (!editor) return;
    if (editor.mode === 'dates' && !editor.dates.length) {
      editor.error = 'Elige al menos un día en el calendario.';
      renderSchedule();
      return;
    }
    const routine = pinTask(value.document, value.date, editor.taskId, {
      mode: editor.mode, dates: editor.mode === 'dates' ? editor.dates : []
    });
    if (!routine) {
      editor.error = 'No se pudo fijar la actividad. Elige fechas a partir del día en que empezó.';
      renderSchedule();
      return;
    }
    value.scheduleEditor = null;
    markDirty();
    flushJournalAgenda();
    rerender();
  }

  function onClick(event) {
    const target = event.target.closest('[data-journal-entry],[data-journal-date],[data-journal-month],[data-journal-page],[data-journal-action],[data-journal-schedule-date],[data-journal-schedule-month]');
    if (!target || !container.contains(target) || target.disabled) return;
    if (target.hasAttribute('data-journal-entry')) { changeDate(target.dataset.journalDate, target.dataset.pageId); return; }
    if (target.dataset.journalScheduleDate && value.scheduleEditor) {
      const date = target.dataset.journalScheduleDate;
      if (!isJournalDate(date)) return;
      const dates = new Set(value.scheduleEditor.dates);
      if (dates.has(date)) dates.delete(date); else dates.add(date);
      value.scheduleEditor.dates = [...dates].sort();
      value.scheduleEditor.error = '';
      renderSchedule(`[data-journal-schedule-date="${date}"]`);
      return;
    }
    if (target.dataset.journalScheduleMonth && value.scheduleEditor) {
      const editor = value.scheduleEditor;
      const [year, month] = editor.month.split('-').map(Number);
      const delta = Number(target.dataset.journalScheduleMonth);
      if (!Number.isFinite(delta)) return;
      const total = Math.max(12, Math.min(9999 * 12 + 11, year * 12 + month - 1 + delta));
      editor.month = `${String(Math.floor(total / 12)).padStart(4, '0')}-${String(total % 12 + 1).padStart(2, '0')}`;
      renderSchedule(`[data-journal-schedule-month="${delta}"]`);
      return;
    }
    if (target.dataset.journalDate) { changeDate(target.dataset.journalDate); return; }
    if (target.dataset.journalMonth) { moveMonth(Number(target.dataset.journalMonth)); rerender(); return; }
    if (target.dataset.journalPage) {
      const id = target.dataset.journalPage;
      if (id === value.pageId || !ensureDay(value.document, value.date).pages.some(page => page.id === id)) return;
      requestJournalLeave(() => { value.closedPageIds = value.closedPageIds.filter(closed => closed !== id); value.pageId = id; rerender(); });
      return;
    }
    const action = target.dataset.journalAction;
    if (action === 'stay') { stay(); return; }
    if (action === 'save-continue') { saveAndContinue(); return; }
    if (action === 'today') { changeDate(dateAtDevice()); return; }
    if (action === 'save') { flushJournalAgenda(); rerender(); return; }
    if (action === 'close-page') {
      const id = target.dataset.pageId;
      if (!ensureDay(value.document, value.date).pages.some(page => page.id === id)) return;
      requestJournalLeave(() => {
        if (!value.closedPageIds.includes(id)) value.closedPageIds.push(id);
        if (value.pageId === id) value.pageId = ensureDay(value.document, value.date).pages.find(page => !value.closedPageIds.includes(page.id))?.id || null;
        rerender();
      });
      return;
    }
    if (action === 'pages-open') {
      const mode = media?.matches ? 'mobile' : 'desktop';
      value.folds[mode].pages = true;
      rerender();
      const first = container.querySelector('[data-journal-entry]') || container.querySelector('[data-journal-fold="pages"] summary');
      first?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      first?.focus({ preventScroll: true });
      return;
    }
    if (action === 'add-page') {
      requestJournalLeave(() => {
        const page = addPage(value.document, value.date);
        if (!page) return;
        value.pageId = page.id;
        value.closedPageIds = value.closedPageIds.filter(id => id !== page.id);
        markDirty(); rerender();
        container.querySelector('#journal-text')?.focus({ preventScroll: true });
      });
      return;
    }
    if (action === 'task-delete') {
      if (removeTask(value.document, value.date, target.dataset.taskId)) { markDirty(); rerender(); }
      return;
    }
    if (action === 'task-pin') { openSchedule(target.dataset.taskId); return; }
    if (action === 'schedule-cancel') { cancelSchedule(); return; }
    if (action === 'schedule-save') { saveSchedule(); return; }
    if (action === 'task-unpin') {
      if (unpinTask(value.document, value.date, target.dataset.taskId)) {
        value.scheduleEditor = null;
        markDirty(); flushJournalAgenda(); rerender();
      }
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
    if (!['journal-text', 'journal-title'].includes(event.target.id)) return;
    const page = currentPage();
    if (!page) return;
    if (event.target.id === 'journal-title') page.title = event.target.value;
    else page.text = event.target.value;
    page.updatedAt = new Date().toISOString();
    markDirty(); syncStatus();
  }

  function onChange(event) {
    if (event.target.name === 'journal-repeat-mode' && value.scheduleEditor) {
      const mode = event.target.value;
      if (!['daily', 'dates'].includes(mode)) return;
      value.scheduleEditor.mode = mode;
      value.scheduleEditor.error = '';
      renderSchedule(`input[name="journal-repeat-mode"][value="${mode}"]`);
      return;
    }
    const taskId = event.target.dataset.journalTaskId;
    if (!taskId) return;
    if (!setTaskDone(value.document, value.date, taskId, event.target.checked)) return;
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
  function cancelScheduleNative(event) { event.preventDefault(); cancelSchedule(); }
  function closeScheduleNative() { value.scheduleEditor = null; }

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
  scheduleDialog?.addEventListener('cancel', cancelScheduleNative);
  scheduleDialog?.addEventListener('close', closeScheduleNative);
  container.addEventListener('click', onClick);
  container.addEventListener('input', onInput);
  container.addEventListener('change', onChange);
  container.addEventListener('submit', onSubmit);
  document.addEventListener('visibilitychange', onVisibility);
  if (value.calendarOpen && !calendarDialog?.open) calendarDialog?.showModal();
  if (value.unsavedOpen) openUnsaved();
  if (value.scheduleEditor && scheduleDialog && !scheduleDialog.open) scheduleDialog.showModal();
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
    scheduleDialog?.removeEventListener('cancel', cancelScheduleNative);
    scheduleDialog?.removeEventListener('close', closeScheduleNative);
    container.removeEventListener('click', onClick);
    container.removeEventListener('input', onInput);
    container.removeEventListener('change', onChange);
    container.removeEventListener('submit', onSubmit);
    document.removeEventListener('visibilitychange', onVisibility);
    if (activeBinding === binding) activeBinding = null;
  };
}
