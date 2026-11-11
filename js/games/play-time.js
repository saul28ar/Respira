import { getStore, setStore, storeKeys } from '../storage.js';
import { dateAtDevice } from '../utils.js';

const dailyLimit = 4 * 60 * 60 * 1000;
const tabId = globalThis.crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
const unsaved = new Map();
const dayPrefix = day => 'games_time_' + day + '_';

function joinIntervals(intervals) {
  const valid = intervals.filter(pair => Array.isArray(pair) && pair.length === 2 &&
    Number.isFinite(pair[0]) && Number.isFinite(pair[1]) && pair[0] < pair[1]);
  valid.sort((first, second) => first[0] - second[0]);
  const merged = [];
  for (const [start, end] of valid) {
    const latest = merged.at(-1);
    if (latest && start <= latest[1]) latest[1] = Math.max(latest[1], end);
    else merged.push([start, end]);
  }
  return merged;
}

function storedIntervals(key) {
  const data = unsaved.get(key) ?? getStore(key, []);
  return Array.isArray(data) ? data : [];
}

function countTime(now) {
  const day = dateAtDevice(new Date(now));
  const prefix = dayPrefix(day);
  const keys = new Set([...storeKeys(prefix), ...[...unsaved.keys()].filter(key => key.startsWith(prefix))]);
  return joinIntervals([...keys].flatMap(storedIntervals)).reduce((total, [start, end]) => total + end - start, 0);
}

function saveTime(start, end) {
  while (start < end) {
    const date = new Date(start);
    const nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime();
    const until = Math.min(nextDay, end);
    const key = dayPrefix(dateAtDevice(date)) + tabId;
    const data = joinIntervals([...storedIntervals(key), [start, until]]);
    if (setStore(key, data)) unsaved.delete(key);
    else unsaved.set(key, data);
    start = until;
  }
}

export function trackGameTime(onLimit) {
  let started = null;
  let timeout;
  let stopped = false;

  function flush(now) {
    if (started !== null) saveTime(started, now);
    started = null;
  }

  function stop() {
    if (stopped) return;
    stopped = true;
    clearTimeout(timeout);
    flush(Date.now());
    document.removeEventListener('visibilitychange', tick);
    window.removeEventListener('pagehide', suspend);
    window.removeEventListener('pageshow', tick);
  }

  function suspend() {
    clearTimeout(timeout);
    flush(Date.now());
  }

  function tick() {
    if (stopped) return;
    clearTimeout(timeout);
    const now = Date.now();
    flush(now);
    if (document.hidden) return;
    const remaining = dailyLimit - countTime(now);
    if (remaining <= 0) { stop(); onLimit(); return; }
    started = now;
    timeout = setTimeout(tick, Math.min(remaining, 10000));
  }

  document.addEventListener('visibilitychange', tick);
  window.addEventListener('pagehide', suspend);
  window.addEventListener('pageshow', tick);
  tick();
  return stop;
}
