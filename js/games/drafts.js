import { pets } from '../data.js';
import { getStore, setStore, storeKeys } from '../storage.js';

const types = new Set(['sopa', 'crucigrama', 'frase']);
const session = new Map();

function prefixFor(petId, type) {
  if (!types.has(type) || (petId != null && !Object.hasOwn(pets, petId))) return null;
  return `games_draft_${petId ?? 'guest'}_${type}_`;
}

function validLevel(level) {
  return Number.isSafeInteger(level) && level > 0;
}

function object(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function stored(key) {
  return session.has(key) ? session.get(key) : getStore(key, null);
}

function save(key, value) {
  const saved = setStore(key, value);
  if (saved) session.delete(key);
  else session.set(key, value);
  return saved;
}

function recordFor(key) {
  const record = stored(key);
  return object(record) && object(record.data) && Object.keys(record.data).length ? record : null;
}

export function readDraft(petId, type, level) {
  const prefix = prefixFor(petId, type);
  if (!prefix || !validLevel(level)) return {};
  return recordFor(prefix + level)?.data ?? {};
}

export function writeDraft(petId, type, level, patch) {
  const prefix = prefixFor(petId, type);
  if (!prefix || !validLevel(level) || !object(patch) || !Object.keys(patch).length) return false;
  const data = { ...readDraft(petId, type, level), ...patch };
  const draftSaved = save(prefix + level, { data, updatedAt: Date.now() });
  const pointerSaved = save(prefix + 'latest', level);
  return draftSaved && pointerSaved;
}

export function clearDraft(petId, type, level) {
  const prefix = prefixFor(petId, type);
  if (!prefix || !validLevel(level)) return false;
  const draftCleared = save(prefix + level, null);
  const pointerCleared = stored(prefix + 'latest') !== level || save(prefix + 'latest', null);
  return draftCleared && pointerCleared;
}

export function latestDraftLevel(petId, type) {
  const prefix = prefixFor(petId, type);
  if (!prefix) return null;
  const latest = stored(prefix + 'latest');
  if (validLevel(latest) && recordFor(prefix + latest)) return latest;

  // If the most recent draft was completed, resume the last remaining one.
  const keys = new Set([...storeKeys(prefix), ...[...session.keys()].filter(key => key.startsWith(prefix))]);
  let best = null;
  let bestTime = -Infinity;
  for (const key of keys) {
    const level = Number(key.slice(prefix.length));
    if (!validLevel(level)) continue;
    const record = recordFor(key);
    if (!record || !Number.isFinite(record.updatedAt) || record.updatedAt < bestTime) continue;
    best = level;
    bestTime = record.updatedAt;
  }
  return best;
}
