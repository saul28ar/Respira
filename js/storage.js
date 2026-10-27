import { catalog, pets } from './data.js';
import { dateAtDevice } from './utils.js';

// Conserva las claves de Respira 3.18 cuando se instala en la misma dirección.
const prefix = 'respira_';
export function getStore(key, fallback) {
  try { return JSON.parse(localStorage.getItem(prefix + key)) ?? fallback; }
  catch { return fallback; }
}
export function setStore(key, value) {
  try { localStorage.setItem(prefix + key, JSON.stringify(value)); return true; }
  catch { return false; }
}
export function favorites() {
  const value = getStore('favorites', []);
  return Array.isArray(value) ? [...new Set(value.filter(id => typeof id === 'string' && Object.hasOwn(catalog, id)))] : [];
}
export function journal() {
  const value = getStore('journal', '');
  return typeof value === 'string' ? value.slice(0, 10000) : '';
}
let sessionChoice = null;
export function companionToday() {
  const choice = sessionChoice ?? getStore('petOfDay', null);
  return choice && choice.day === dateAtDevice() && Object.hasOwn(pets, choice.id) ? choice.id : null;
}
export function chooseCompanion(id) {
  const existing = companionToday();
  if (existing || !Object.hasOwn(pets, id)) return { id: existing, saved: true };
  sessionChoice = { day: dateAtDevice(), id };
  return { id, saved: setStore('petOfDay', sessionChoice) };
}
