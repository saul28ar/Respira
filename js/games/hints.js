import { clock } from '../utils.js';
import { getStore, setStore } from '../storage.js';

const chargeTime = 120000;
const capacity = 3;
const unsaved = new Map();

function saveBank(key, bank) {
  if (setStore(key, bank)) unsaved.delete(key);
  else unsaved.set(key, bank);
}

function readBank(key, legacyKey, now) {
  const bank = unsaved.get(key) ?? getStore(key, null);
  if (Number.isInteger(bank?.charges) && bank.charges >= 0 && bank.charges < capacity &&
      Number.isFinite(bank.refillAt)) {
    if (bank.refillAt > now) return bank;
    const regained = Math.floor((now - bank.refillAt) / chargeTime) + 1;
    const charges = Math.min(capacity, bank.charges + regained);
    return { charges, refillAt: charges === capacity ? null : bank.refillAt + regained * chargeTime };
  }
  const legacy = bank === null ? getStore(legacyKey, null) : null;
  if (Number.isFinite(legacy) && legacy >= 0 && legacy < chargeTime) {
    const migrated = { charges: 0, refillAt: now + chargeTime - legacy };
    saveBank(key, migrated);
    return migrated;
  }
  return { charges: capacity, refillAt: null };
}

export function bindGameHint({ button, label, status, petId, type, onHint }) {
  const scope = `${petId || 'guest'}_${type}`;
  const key = 'games_hint_bank_' + scope;
  const legacyKey = 'games_hint_' + scope;
  let timeout;

  function refresh() {
    clearTimeout(timeout);
    const now = Date.now();
    const { charges, refillAt } = readBank(key, legacyKey, now);
    const available = refillAt === null ? '' : clock((refillAt - now) / 1000).slice(1);
    button.disabled = charges === 0;
    button.toggleAttribute('data-hint-refilling', charges > 0 && refillAt !== null);
    const labelText = 'Pista · ' + charges;
    if (label.textContent !== labelText) label.textContent = labelText;
    if (status.textContent !== available) status.textContent = available;
    button.setAttribute('aria-label', charges === 0
      ? 'Próxima pista en ' + available
      : `Usar pista. ${charges} de ${capacity} disponibles${available ? '. Próxima en ' + available : ''}`);
    if (!document.hidden && refillAt !== null) timeout = setTimeout(refresh, Math.min(1000, refillAt - now));
  }

  function requestHint() {
    if (document.hidden) return;
    const now = Date.now();
    const { charges, refillAt } = readBank(key, legacyKey, now);
    if (charges && onHint()) saveBank(key, { charges: charges - 1, refillAt: refillAt ?? now + chargeTime });
    refresh();
  }

  function sync(event) {
    if (event.key === null || event.key === 'respira_' + key) refresh();
  }

  button.addEventListener('click', requestHint);
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('pageshow', refresh);
  window.addEventListener('storage', sync);
  refresh();

  return () => {
    clearTimeout(timeout);
    button.removeEventListener('click', requestHint);
    document.removeEventListener('visibilitychange', refresh);
    window.removeEventListener('pageshow', refresh);
    window.removeEventListener('storage', sync);
  };
}
