import { dateAtDevice } from './utils.js';
import { companionToday, getStore, setStore } from './storage.js';

// La oferta y la elección son independientes: omitir también cuenta como verla.
// La memoria mantiene la regla durante esta sesión si el navegador bloquea guardar.
let sessionSeenDay = null;

function validDay(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(0);
  parsed.setFullYear(year, month - 1, day);
  return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day;
}

export function markPetOfferSeen() {
  const today = dateAtDevice();
  sessionSeenDay = today;
  setStore('petOfferDay', today);
}

export function welcomeDestination() {
  const today = dateAtDevice();
  const savedDay = getStore('petOfferDay', null);
  const seenToday = sessionSeenDay === today || (validDay(savedDay) && savedDay === today);
  // Una elección vigente de versiones anteriores evita repetir la oferta al actualizar.
  const next = companionToday() || seenToday ? 'home' : 'pet-select';
  markPetOfferSeen();
  return next;
}
