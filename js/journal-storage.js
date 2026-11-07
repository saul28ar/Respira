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

function validDocument(document) {
  if (!hasFields(document, ['version', 'days', 'legacyImported'])
    || document.version !== 1 || typeof document.legacyImported !== 'boolean'
    || !plainObject(document.days)) return false;
  const ids = new Set();
  const acceptId = id => {
    if (typeof id !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(id) || ids.has(id)) return false;
    ids.add(id);
    return true;
  };
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
    for (const task of day.tasks) {
      if (!hasFields(task, ['id', 'text', 'done']) || !acceptId(task.id)
        || typeof task.text !== 'string' || typeof task.done !== 'boolean') return false;
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
  const ids = new Set();
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

export function removeTask(document, date, taskId) {
  if (!isJournalDate(date) || !validDocument(document) || !Object.hasOwn(document.days, date)) return false;
  const tasks = document.days[date].tasks;
  const index = tasks.findIndex(task => task.id === taskId);
  if (index === -1) return false;
  tasks.splice(index, 1);
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
