import { pets } from '../data.js';
import { getStore, setStore, storeKeys } from '../storage.js';
import { dateAtDevice } from '../utils.js';

const sessionProgress = new Set();
const numberOfDays = day => Date.parse(day + 'T00:00:00Z') / 86400000;
const petPrefix = petId => 'games_' + (petId ?? 'guest') + '_';

function savedItems(prefix) {
  const stored = storeKeys(prefix).filter(key => getStore(key, false) === true);
  return [...new Set([...stored, ...[...sessionProgress].filter(key => key.startsWith(prefix))])]
    .map(key => key.slice(prefix.length));
}

export function gameProgress(petId, today = dateAtDevice()) {
  const prefix = petPrefix(petId);
  const hasPet = Object.hasOwn(pets, petId);
  const days = new Set();
  const dayGames = new Map();
  for (const entry of hasPet ? savedItems(prefix + 'day_') : []) {
    const match = /^(\d{4}-\d{2}-\d{2})(?:_(sopa|crucigrama|frase))?$/.exec(entry);
    if (!match) continue;
    const [, day, type] = match;
    if (day > today) continue;
    days.add(day);
    if (type) {
      if (!dayGames.has(day)) dayGames.set(day, new Set());
      dayGames.get(day).add(type);
    }
  }
  const dayNumbers = new Set([...days].map(numberOfDays));
  let cursor = numberOfDays(today);
  let streak = 0;
  if (!dayNumbers.has(cursor)) cursor--;
  while (dayNumbers.has(cursor)) { streak++; cursor--; }
  const levels = new Set(hasPet || petId == null ? savedItems(prefix + 'level_') : []);
  return { days, dayGames, streak, levels, total: days.size, playedToday: days.has(today) };
}

export function recordGame(petId, type, level, today = dateAtDevice(), { countDay = true } = {}) {
  const hasPet = Object.hasOwn(pets, petId);
  if (!hasPet && petId != null) return null;
  const prefix = petPrefix(petId);
  const dayKey = prefix + 'day_' + today;
  const gameDayKey = dayKey + '_' + type;
  const levelKey = prefix + 'level_' + type + '_' + level;
  const markDay = hasPet && countDay;
  const newDay = markDay && !sessionProgress.has(dayKey) && !getStore(dayKey, false);
  const newGameDay = markDay && !sessionProgress.has(gameDayKey) && !getStore(gameDayKey, false);
  const keys = markDay ? [levelKey, dayKey, gameDayKey] : [levelKey];
  let saved = true;
  // Use independent keys so finishing two challenges in different tabs can't erase either.
  for (const key of keys) {
    if (setStore(key, true)) sessionProgress.delete(key);
    else {
      saved = false;
      sessionProgress.add(key);
    }
  }
  return { ...gameProgress(petId, today), newDay, newGameDay, saved, markDay };
}

export function dailyLevel(progress, type, total, today = dateAtDevice()) {
  const next = Array.from({ length: total }, (_, index) => index + 1)
    .find(level => !progress.levels.has(type + '_' + level));
  // Once the library is complete, rotate existing challenges on the local calendar.
  return next ?? ((numberOfDays(today) % total + total) % total + 1);
}
