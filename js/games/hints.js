import { clock } from '../utils.js';
import { getStore, setStore } from '../storage.js';

const chargeTime = 120000;
const saveInterval = 5000;
const unsaved = new Map();
const chargeKey = (petId, type) => `games_hint_${petId || 'guest'}_${type}`;

function validCharge(value) {
  return Number.isFinite(value) ? Math.max(0, Math.min(chargeTime, value)) : 0;
}

export function getHintCharge(petId, type) {
  const key = chargeKey(petId, type);
  return validCharge(unsaved.get(key) ?? getStore(key, chargeTime));
}

export function saveHintCharge(petId, type, elapsed) {
  const key = chargeKey(petId, type);
  const charge = validCharge(elapsed);
  if (setStore(key, charge)) unsaved.delete(key);
  else unsaved.set(key, charge);
}

export function bindGameHint({ button, status, elapsed = 0, save, onHint }) {
  let charge = validCharge(elapsed);
  let lastSaved = charge;
  let startedAt = null;
  let timeout;
  let stopped = false;

  function collectTime() {
    if (startedAt === null) return;
    charge = Math.min(chargeTime, charge + Math.max(0, performance.now() - startedAt));
    startedAt = null;
  }

  function persist(force) {
    if (lastSaved === charge) return;
    if (!force && charge - lastSaved < saveInterval) return;
    save(charge);
    lastSaved = charge;
  }

  function render() {
    button.disabled = charge < chargeTime;
    const remaining = clock((chargeTime - charge) / 1000).slice(1);
    if (status.textContent !== remaining) status.textContent = remaining;
    button.setAttribute('aria-label', button.disabled ? 'Pista disponible en ' + remaining : 'Usar pista');
  }

  function update() {
    if (stopped) return;
    clearTimeout(timeout);
    collectTime();
    persist(document.hidden || charge === chargeTime);
    render();
    if (document.hidden || charge === chargeTime) return;
    startedAt = performance.now();
    timeout = setTimeout(update, Math.min(1000, chargeTime - charge));
  }

  function suspend() {
    clearTimeout(timeout);
    collectTime();
    persist(true);
    render();
  }

  function requestHint() {
    if (document.hidden) return;
    update();
    if (charge < chargeTime || !onHint()) return;
    charge = 0;
    persist(true);
    update();
  }

  button.addEventListener('click', requestHint);
  document.addEventListener('visibilitychange', update);
  window.addEventListener('pagehide', suspend);
  window.addEventListener('pageshow', update);
  update();

  return () => {
    if (stopped) return;
    stopped = true;
    suspend();
    button.disabled = true;
    button.removeEventListener('click', requestHint);
    document.removeEventListener('visibilitychange', update);
    window.removeEventListener('pagehide', suspend);
    window.removeEventListener('pageshow', update);
  };
}
