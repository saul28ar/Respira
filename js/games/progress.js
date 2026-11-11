import { pets } from '../data.js';
import { getStore, setStore, storeKeys } from '../storage.js';
import { dateAtDevice } from '../utils.js';

const sessionProgress = new Set();
const numberOfDays = day => Date.parse(day + 'T00:00:00Z') / 86400000;
const petPrefix = petId => 'games_' + petId + '_';

function savedItems(prefix) {
  const stored = storeKeys(prefix).filter(key => getStore(key, false) === true);
  return [...new Set([...stored, ...[...sessionProgress].filter(key => key.startsWith(prefix))])]
    .map(key => key.slice(prefix.length));
}

export function gameProgress(petId, today = dateAtDevice()) {
  const prefix = petPrefix(petId);
  const hasPet = Object.hasOwn(pets, petId);
  const days = hasPet ? savedItems(prefix + 'day_').filter(day => /^\d{4}-\d{2}-\d{2}$/.test(day) && day <= today) : [];
  const dayNumbers = new Set(days.map(numberOfDays));
  let cursor = numberOfDays(today);
  let streak = 0;
  if (!dayNumbers.has(cursor)) cursor--;
  while (dayNumbers.has(cursor)) { streak++; cursor--; }
  const levels = new Set(hasPet ? savedItems(prefix + 'level_') : []);
  return { days: new Set(days), streak, levels, total: days.length, playedToday: dayNumbers.has(numberOfDays(today)) };
}

export function recordGame(petId, type, level, today = dateAtDevice()) {
  if (!Object.hasOwn(pets, petId)) return null;
  const prefix = petPrefix(petId);
  const dayKey = prefix + 'day_' + today;
  const levelKey = prefix + 'level_' + type + '_' + level;
  const newDay = !sessionProgress.has(dayKey) && !getStore(dayKey, false);
  const levelSaved = setStore(levelKey, true);
  const daySaved = setStore(dayKey, true);
  // Use independent keys so finishing two challenges in different tabs can't erase either.
  for (const [key, saved] of [[levelKey, levelSaved], [dayKey, daySaved]]) {
    if (saved) sessionProgress.delete(key);
    else sessionProgress.add(key);
  }
  return { ...gameProgress(petId, today), newDay, saved: levelSaved && daySaved };
}

export function dailyLevel(progress, type, total, today = dateAtDevice()) {
  const next = Array.from({ length: total }, (_, index) => index + 1)
    .find(level => !progress.levels.has(type + '_' + level));
  // Once the library is complete, rotate existing challenges on the local calendar.
  return next ?? ((numberOfDays(today) % total + total) % total + 1);
}
