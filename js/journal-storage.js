import { dateAtDevice } from './utils.js';

// Esta agenda es independiente de la nota y de todas las claves anteriores.
const agendaKey = 'respira_journalAgenda_v1';
const legacyKey = 'respira_journal';
const unavailableMessage = 'No se pudo guardar la agenda en este dispositivo. Tus cambios siguen en esta pantalla.';
const invalidMessage = 'La agenda guardada no se pudo leer. Se conservó intacta; los cambios de esta pantalla todavía no se pueden guardar.';
const unreadMessage = 'No se pudo leer la agenda de este dispositivo. Conserva una copia de tus cambios y recarga la página antes de guardarlos.';
// Un fallo de lectura no demuestra que la agenda esté vacía. Aunque el acceso
// vuelva más tarde, este documento no debe reemplazar los datos que no se leyeron.
const unreadDocuments = new WeakSet();

function emptyDocument() {
  return { version: 1, days: {}, legacyImported: false };
}

function plainObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function hasFields(value, required, optional = []) {
  return plainObject(value)
    && required.every(key => Object.hasOwn(value, key))
    && Object.keys(value).every(key => required.includes(key) || optional.includes(key));
}

export function isJournalDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return day <= [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

function validTimestamp(value) {
  if (typeof value !== 'string') return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString() === value;
}

function denseArray(value) {
  return Array.isArray(value) && Object.getPrototypeOf(value) === Array.prototype
    && Object.keys(value).length === value.length
    && Object.keys(value).every((key, index) => key === String(index));
}

function validDates(value, allowEmpty = true) {
  return denseArray(value) && value.length <= 50000 && (allowEmpty || value.length > 0)
    && value.every(isJournalDate) && new Set(value).size === value.length;
}

function validDocument(document) {
  if (!hasFields(document, ['version', 'days', 'legacyImported'], ['routines'])
    || document.version !== 1 || typeof document.legacyImported !== 'boolean'
    || !plainObject(document.days)) return false;
  const ids = new Set();
  const acceptId = id => {
    if (typeof id !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(id) || ids.has(id)) return false;
    ids.add(id);
    return true;
  };
  const routines = new Map();
  if (Object.hasOwn(document, 'routines')) {
    if (!denseArray(document.routines) || document.routines.length > 10000) return false;
    for (const routine of document.routines) {
      if (!hasFields(routine, ['id', 'text', 'mode', 'start', 'end', 'dates', 'doneDates', 'skipDates'])
        || !acceptId(routine.id) || typeof routine.text !== 'string'
        || !['daily', 'dates'].includes(routine.mode) || !isJournalDate(routine.start)
        || (routine.end !== null && !isJournalDate(routine.end))
        || !validDates(routine.dates, routine.mode === 'daily')
        || (routine.mode === 'daily' && routine.dates.length !== 0)
        || !validDates(routine.doneDates) || !validDates(routine.skipDates)
        || routine.dates.some(date => date < routine.start)) return false;
      routines.set(routine.id, routine);
    }
  }
  for (const [date, day] of Object.entries(document.days)) {
    if (!isJournalDate(date) || !hasFields(day, ['pages', 'tasks'])
      || !denseArray(day.pages) || day.pages.length === 0 || !denseArray(day.tasks)) return false;
    for (const page of day.pages) {
      if (!hasFields(page, ['id', 'text'], ['title', 'createdAt', 'updatedAt'])
        || !acceptId(page.id) || typeof page.text !== 'string'
        || (Object.hasOwn(page, 'title') && typeof page.title !== 'string')
        || (Object.hasOwn(page, 'createdAt') && !validTimestamp(page.createdAt))
        || (Object.hasOwn(page, 'updatedAt') && !validTimestamp(page.updatedAt))) return false;
    }
    const linkedRoutines = new Set();
    for (const task of day.tasks) {
      if (!hasFields(task, ['id', 'text', 'done'], ['routineId']) || !acceptId(task.id)
        || typeof task.text !== 'string' || typeof task.done !== 'boolean'
        || (Object.hasOwn(task, 'routineId') && (!routines.has(task.routineId)
          || linkedRoutines.has(task.routineId)))) return false;
      if (Object.hasOwn(task, 'routineId')) linkedRoutines.add(task.routineId);
    }
  }
  return true;
}

function parseDocument(raw) {
  try {
    const document = JSON.parse(raw);
    return validDocument(document) ? document : null;
  } catch {
    return null;
  }
}

function nextId(document) {
  const ids = new Set((document.routines ?? []).map(routine => routine.id));
  for (const day of Object.values(document.days)) {
    for (const entry of [...day.pages, ...day.tasks]) ids.add(entry.id);
  }
  const base = globalThis.crypto?.randomUUID?.()
    ?? `entry-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
  let id = base;
  let suffix = 0;
  while (ids.has(id)) id = `${base}-${++suffix}`;
  return id;
}

function newPage(document) {
  return { id: nextId(document), text: '', createdAt: new Date().toISOString() };
}

// Devuelve null ante argumentos inválidos, sin modificar el documento.
export function ensureDay(document, date) {
  if (!isJournalDate(date) || !validDocument(document)) return null;
  if (!Object.hasOwn(document.days, date)) {
    document.days[date] = { pages: [newPage(document)], tasks: [] };
  }
  return document.days[date];
}

export function addPage(document, date) {
  const existed = plainObject(document?.days) && Object.hasOwn(document.days, date);
  const day = ensureDay(document, date);
  if (!day) return null;
  if (!existed) return day.pages[0];
  const page = newPage(document);
  day.pages.push(page);
  return page;
}

export function addTask(document, date, text) {
  if (typeof text !== 'string' || !text.trim()) return null;
  const day = ensureDay(document, date);
  if (!day) return null;
  const task = { id: nextId(document), text, done: false };
  day.tasks.push(task);
  return task;
}

function routineApplies(routine, date) {
  return date >= routine.start && (routine.end === null || date <= routine.end)
    && (routine.mode === 'daily' || routine.dates.includes(date))
    && !routine.skipDates.includes(date);
}

function occurrenceId(routine, date) {
  return `routine-${routine.id}-${date}`;
}

// Las ocurrencias no crean páginas vacías ni copian una plantilla a cada día.
export function getTasksForDate(document, date) {
  if (!isJournalDate(date) || !validDocument(document)) return [];
  const tasks = document.days[date]?.tasks ?? [];
  const routines = document.routines ?? [];
  const byId = new Map(routines.map(routine => [routine.id, routine]));
  const linked = new Set();
  const result = [];
  for (const task of tasks) {
    if (!Object.hasOwn(task, 'routineId')) {
      result.push({ id: task.id, text: task.text, done: task.done });
      continue;
    }
    const routine = byId.get(task.routineId);
    linked.add(routine.id);
    if (routineApplies(routine, date)) result.push({
      id: task.id, text: routine.text, done: routine.doneDates.includes(date),
      routineId: routine.id, routineMode: routine.mode, scheduled: true
    });
  }
  for (const routine of routines) {
    if (linked.has(routine.id) || !routineApplies(routine, date)) continue;
    result.push({
      id: occurrenceId(routine, date), text: routine.text, done: routine.doneDates.includes(date),
      routineId: routine.id, routineMode: routine.mode, scheduled: true
    });
  }
  return result;
}

function taskOccurrence(document, date, taskId) {
  const task = getTasksForDate(document, date).find(item => item.id === taskId);
  if (!task) return null;
  return {
    task,
    source: document.days[date]?.tasks.find(item => item.id === taskId),
    routine: task.routineId ? document.routines.find(item => item.id === task.routineId) : null
  };
}

function setDateInList(list, date, included) {
  const index = list.indexOf(date);
  if (included && index === -1 && list.length >= 50000) return false;
  if (included && index === -1) { list.push(date); list.sort(); }
  if (!included && index !== -1) list.splice(index, 1);
  return true;
}

export function pinTask(document, date, taskId, options) {
  if (!isJournalDate(date) || !validDocument(document) || !plainObject(options)
    || !['daily', 'dates'].includes(options.mode)) return null;
  const dates = options.dates ?? [];
  if (!validDates(dates, options.mode === 'daily')) return null;
  const occurrence = taskOccurrence(document, date, taskId);
  if (!occurrence) return null;
  const start = occurrence.routine?.start ?? date;
  if (options.mode === 'dates' && dates.some(item => item < start)) return null;
  let routine = occurrence.routine;
  if (!routine) {
    if ((document.routines?.length ?? 0) >= 10000) return null;
    routine = {
      id: nextId(document), text: occurrence.task.text, mode: options.mode, start,
      end: null, dates: [], doneDates: [], skipDates: []
    };
    document.routines ??= [];
    document.routines.push(routine);
    occurrence.source.routineId = routine.id;
  }
  routine.mode = options.mode;
  routine.end = null;
  routine.dates = options.mode === 'dates' ? [...dates].sort() : [];
  setDateInList(routine.skipDates, date, false);
  setDateInList(routine.doneDates, date, occurrence.task.done);
  return routine;
}

export function setTaskDone(document, date, taskId, done) {
  if (typeof done !== 'boolean' || !isJournalDate(date) || !validDocument(document)) return false;
  const occurrence = taskOccurrence(document, date, taskId);
  if (!occurrence) return false;
  if (occurrence.routine && !setDateInList(occurrence.routine.doneDates, date, done)) return false;
  if (occurrence.source) occurrence.source.done = done;
  return true;
}

export function removeTask(document, date, taskId) {
  if (!isJournalDate(date) || !validDocument(document)) return false;
  const occurrence = taskOccurrence(document, date, taskId);
  if (!occurrence) return false;
  if (occurrence.routine) {
    return setDateInList(occurrence.routine.skipDates, date, true);
  }
  const tasks = document.days[date].tasks;
  const index = tasks.findIndex(task => task.id === taskId);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function previousDate(date) {
  const [year, month, day] = date.split('-').map(Number);
  const value = new Date(0);
  value.setUTCFullYear(year, month - 1, day);
  value.setUTCHours(0, 0, 0, 0);
  value.setUTCDate(value.getUTCDate() - 1);
  return value.toISOString().slice(0, 10);
}

// Finaliza la repetición desde este día. El historial anterior sigue derivándose
// de la misma plantilla y la tarea de hoy queda como una tarea común.
export function unpinTask(document, date, taskId) {
  if (!isJournalDate(date) || !validDocument(document)) return false;
  const occurrence = taskOccurrence(document, date, taskId);
  if (!occurrence?.routine) return false;
  // No existe una fecha ISO válida anterior al primer día admitido.
  if (date === '0001-01-01') {
    const routine = occurrence.routine;
    for (const day of Object.values(document.days)) {
      for (const task of day.tasks) {
        if (task.routineId !== routine.id) continue;
        task.text = routine.text;
        delete task.routineId;
      }
    }
    document.routines.splice(document.routines.indexOf(routine), 1);
  } else {
    occurrence.routine.end = previousDate(date);
  }
  if (occurrence.source) {
    occurrence.source.text = occurrence.task.text;
    occurrence.source.done = occurrence.task.done;
    delete occurrence.source.routineId;
  } else {
    const day = ensureDay(document, date);
    day.tasks.push({ id: nextId(document), text: occurrence.task.text, done: occurrence.task.done });
  }
  return true;
}

export function saveAgenda(document) {
  try {
    if (unreadDocuments.has(document) || !validDocument(document)) return false;
    const raw = localStorage.getItem(agendaKey);
    // No se pisa información desconocida, corrupta o de una versión futura.
    if (raw !== null && !parseDocument(raw)) return false;
    localStorage.setItem(agendaKey, JSON.stringify(document));
    return true;
  } catch {
    return false;
  }
}

function importLegacy(document) {
  const raw = localStorage.getItem(legacyKey);
  let text = '';
  if (raw !== null) {
    const value = JSON.parse(raw);
    if (typeof value !== 'string') throw new Error('legacy-invalid');
    text = value;
  }
  if (text !== '') {
    const date = dateAtDevice();
    const existed = Object.hasOwn(document.days, date);
    const day = ensureDay(document, date);
    const page = existed ? newPage(document) : day.pages[0];
    page.text = text;
    page.title = 'Nota anterior';
    if (existed) day.pages.unshift(page);
  }
  document.legacyImported = true;
  return text !== '';
}

export function loadAgenda() {
  let raw;
  try {
    raw = localStorage.getItem(agendaKey);
  } catch {
    const document = emptyDocument();
    unreadDocuments.add(document);
    return { document, saved: false, recoveredLegacy: false, error: unreadMessage };
  }
  const stored = raw === null ? null : parseDocument(raw);
  const invalidStored = raw !== null && !stored;
  const document = stored ?? emptyDocument();
  let recoveredLegacy = false;
  if (!document.legacyImported) {
    try {
      recoveredLegacy = importLegacy(document);
    } catch {
      return {
        document, saved: false, recoveredLegacy,
        error: invalidStored ? invalidMessage : 'No se pudo recuperar la nota anterior. La nota original se conservó intacta.'
      };
    }
  } else {
    return { document, saved: true, recoveredLegacy: false };
  }
  if (invalidStored) return { document, saved: false, recoveredLegacy, error: invalidMessage };
  const saved = saveAgenda(document);
  return { document, saved, recoveredLegacy, ...(saved ? {} : { error: unavailableMessage }) };
}
