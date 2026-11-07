import { icon } from '../icons.js';
import { favorites } from '../storage.js';
import { safe, dateAtDevice } from '../utils.js';

const parseDate = value => new Date(`${value}T12:00:00Z`);
function utcDate(year, monthIndex, day) {
  const value = new Date(0);
  value.setUTCHours(12, 0, 0, 0);
  value.setUTCFullYear(year, monthIndex, day);
  return value;
}
const isoDate = value => value.toISOString().slice(0, 10);
const capital = value => value.replace(/^./u, letter => letter.toUpperCase());
const dateFormat = (value, options) => new Intl.DateTimeFormat('es-PE', { ...options, timeZone: 'UTC' }).format(parseDate(value));
const dateTitle = value => capital(dateFormat(value, { weekday: 'long', day: 'numeric', month: 'long' }));
const shortDate = value => capital(dateFormat(value, { weekday: 'long', day: 'numeric' }));
const validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') && Number.isFinite(parseDate(value).getTime()) && isoDate(parseDate(value)) === value;

function calendar(document, date, month, today) {
  const [year, monthNumber] = month.split('-').map(Number);
  const first = utcDate(year, monthNumber - 1, 1);
  const start = (first.getUTCDay() + 6) % 7;
  const count = utcDate(year, monthNumber, 0).getUTCDate();
  const title = capital(new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(first));
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const day = utcDate(2026, 0, 5 + index);
    const label = new Intl.DateTimeFormat('es-PE', { weekday: 'long', timeZone: 'UTC' }).format(day);
    return `<span title="${safe(capital(label))}">${safe(capital(label).slice(0, 1))}</span>`;
  }).join('');
  let days = '<span aria-hidden="true"></span>'.repeat(start);
  for (let number = 1; number <= count; number += 1) {
    const day = isoDate(utcDate(year, monthNumber - 1, number));
    const hasPage = document.days?.[day]?.pages?.some(page => String(page.text || '').trim());
    days += `<button type="button" data-journal-date="${day}" aria-label="Abrir ${safe(dateTitle(day))}${hasPage ? ', tiene una página escrita' : ''}" aria-pressed="${day === date}"${day === today ? ' aria-current="date"' : ''}><span>${number}</span>${hasPage ? '<i aria-hidden="true"></i>' : ''}</button>`;
  }
  return `<section class="ja-calendar" aria-label="Calendario de ${safe(title)}">
    <div class="ja-calendar-head"><strong>${safe(title)}</strong><div class="ja-month-controls"><button type="button" data-journal-month="-1" aria-label="Mes anterior">${icon('back')}</button><button type="button" data-journal-month="1" aria-label="Mes siguiente">${icon('arrow')}</button></div></div>
    <div class="ja-week-labels" aria-hidden="true">${weekdays}</div><div class="ja-calendar-grid">${days}</div>
    <div class="ja-calendar-bottom"><button type="button" data-journal-action="today">Ir a hoy</button></div>
  </section>`;
}

function dayList(document, date, today) {
  // Keep the opened day visible while leaving recent written days close at hand.
  const dates = new Set([date, ...Object.keys(document.days || {}).filter(validDate)]);
  for (let index = 0; index < 5; index += 1) {
    const recent = parseDate(today);
    recent.setUTCDate(recent.getUTCDate() - index);
    dates.add(isoDate(recent));
  }
  const visible = [date, ...[...dates].filter(day => day !== date).sort().reverse()].slice(0, 5);
  return `<div class="ja-day-list">${visible.map(day => {
    const pages = document.days?.[day]?.pages || [];
    const preview = pages.find(page => String(page.text || '').trim())?.text || 'Una página para ti';
    return `<button class="ja-day-link" type="button" data-journal-date="${day}" aria-pressed="${day === date}"><span class="ja-day-number" aria-hidden="true">${parseDate(day).getUTCDate()}</span><span><strong>${safe(shortDate(day))}</strong><small>${safe(preview.split('\n')[0])}</small></span>${icon('chevron')}</button>`;
  }).join('')}</div>`;
}

function pageList(pages, pageId) {
  return `<div class="ja-page-selector" aria-label="Páginas del día abierto"><p>En este día</p><div class="ja-page-options">${pages.map((page, index) => `<button type="button" class="ja-page-choice" data-journal-page="${safe(page.id)}" aria-pressed="${page.id === pageId}">${safe(page.title || `Página ${index + 1}`)}</button>`).join('')}<button type="button" class="ja-add-page" data-journal-action="add-page">+ Nueva página</button></div></div>`;
}

function checklist(tasks, date) {
  return `<details class="ja-panel ja-tasks" data-journal-fold="tasks" open>
    <summary class="ja-fold-summary"><span>Mi lista de hoy</span>${icon('chevron')}</summary><div class="ja-fold-body">
    <h2 id="journal-tasks-title">Mi lista de hoy</h2><p class="ja-list-intro">Lo pequeño también tiene su lugar.</p>
    <div class="ja-checklist">${tasks.length ? tasks.map(task => `<div class="ja-check-row${task.done ? ' is-done' : ''}"><label><input type="checkbox" data-journal-task-id="${safe(task.id)}"${task.done ? ' checked' : ''}><span>${safe(task.text)}</span></label><button type="button" class="ja-task-delete" data-journal-action="task-delete" data-task-id="${safe(task.id)}" aria-label="Eliminar de mi lista: ${safe(task.text)}">${icon('close')}</button></div>`).join('') : '<p class="ja-list-empty">¿Qué te gustaría hacer hoy?</p>'}</div>
    <form class="ja-add-task" data-journal-task-form><label class="ja-sr-only" for="journal-task">Añadir a mi lista del ${safe(dateTitle(date))}</label><input id="journal-task" name="task" placeholder="Algo que quiero hacer…" maxlength="160" autocomplete="off" required><button type="submit" aria-label="Añadir a mi lista">+</button></form>
    <p class="ja-list-note">No hace falta hacerlo todo hoy.</p>
  </div></details>`;
}

export function renderJournalAgenda({ document = { version: 1, days: {} }, date, pageId, month, status = { kind: 'saved', message: 'Guardado' }, recoveredLegacy = false } = {}) {
  const today = dateAtDevice();
  date = validDate(date) ? date : today;
  month = /^\d{4}-(0[1-9]|1[0-2])$/.test(month || '') ? month : date.slice(0, 7);
  const day = document.days?.[date] || { pages: [], tasks: [] };
  const pages = day.pages || [];
  const page = pages.find(item => item.id === pageId) || pages[0] || { id: '', text: '' };
  const pageIndex = Math.max(0, pages.indexOf(page));
  const text = String(page.text || '');
  const selectedFavorite = favorites().includes('journal');
  const statusKind = ['saved', 'dirty', 'error'].includes(status.kind) ? status.kind : 'saved';
  const statusText = status.message || ({ saved: 'Guardado', dirty: 'Cambios sin guardar', error: 'No se pudo guardar. Inténtalo de nuevo.' })[statusKind];
  const calendarHtml = calendar(document, date, month, today);
  return `<div class="journal-agenda">
    <svg class="ja-waves" viewBox="0 800 941 872" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg>
    <div class="ja-edge-waves" aria-hidden="true"><svg class="ja-edge-left" viewBox="0 800 941 872" focusable="false"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg><svg class="ja-edge-right" viewBox="0 800 941 872" focusable="false"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg></div>
    <header class="ja-topbar"><a class="ja-brand" href="#home" data-go="home" aria-label="Respira · Tu espacio de calma. Ir al inicio"><img src="./imagenes/welcome/logo-aprobado-v2.png" alt="Respira · Tu espacio de calma" width="155" height="70"></a><nav class="ja-topbar-links" aria-label="Navegación principal"><a href="#home" data-go="home">Inicio</a><a href="#methods" data-go="methods">Métodos</a><a href="#favorites" data-go="favorites">Favoritos</a><a href="#more" data-go="more">Más</a></nav><button class="ja-menu" type="button" data-go="more" aria-label="Abrir menú de opciones">${icon('menu')}</button></header>
    <img class="ja-mascot" src="./imagenes/inicio-web/gatito-hd.png" alt="" width="97" height="65" draggable="false">
    <main class="ja-main" id="main-content" tabindex="-1" aria-label="Mi espacio para escribir">
      <div class="ja-toolbar"><button class="ja-back" type="button" data-action="back">${icon('back')}<span>Volver</span></button><button class="ja-favorite${selectedFavorite ? ' is-favorite' : ''}" type="button" data-fav="journal" aria-label="${selectedFavorite ? 'Quitar de' : 'Añadir a'} favoritos: Mi espacio para escribir" aria-pressed="${selectedFavorite}">${icon('heart')}</button></div>
      <header class="ja-intro"><div><span class="ja-eyebrow">UN RATITO PARA TI</span><h1>Mi espacio para escribir</h1><p>Abre un día. Escribe a tu ritmo.</p></div></header>
      <div class="ja-layout">
        ${checklist(day.tasks || [], date)}
        <aside class="ja-sidebar" aria-label="Mis días y mis páginas">
          <details class="ja-panel ja-calendar-panel" data-journal-fold="calendar" open><summary class="ja-fold-summary"><span>Calendario</span>${icon('chevron')}</summary><div class="ja-fold-body"><div class="ja-panel-caption"><span>Busca tu día</span><span class="ja-tiny-star" aria-hidden="true">✧</span></div>${calendarHtml}</div></details>
          <details class="ja-panel ja-days-panel" data-journal-fold="pages" open><summary class="ja-fold-summary"><span>Mis páginas</span>${icon('chevron')}</summary><div class="ja-fold-body"><div class="ja-panel-caption"><h2 id="journal-pages-title">Mis páginas</h2><span>Día a día</span></div>${dayList(document, date, today)}</div></details>
          <p class="ja-sidebar-note">Cada día, todas las páginas que necesites.</p>
        </aside>
        <article class="ja-paper ja-panel" aria-labelledby="journal-date-title">
          ${pageList(pages, page.id)}
          <div class="ja-paper-top"><div><span class="ja-paper-label">MI PÁGINA DEL DÍA</span><h2 id="journal-date-title">${safe(dateTitle(date))}</h2></div><span class="ja-paper-mark" aria-hidden="true">✦</span></div>
          <div class="ja-editor"><div class="ja-editor-head"><span>${safe(shortDate(date))}<span class="ja-page-number"> · ${safe(page.title || `Página ${pageIndex + 1}`)}</span></span></div>
            ${recoveredLegacy && page.title === 'Nota anterior' ? '<p class="ja-recovered">Nota anterior · Tus palabras están aquí.</p>' : ''}
            <label class="ja-editor-title" for="journal-text">¿Qué te gustaría dejar aquí?</label><textarea id="journal-text" maxlength="10000" rows="7" aria-describedby="journal-status journal-count" placeholder="Hoy me siento…">
${safe(text)}</textarea>
            <div class="ja-editor-meta"><span id="journal-count">${text.length}/10000</span><span>Solo en este navegador y dispositivo.</span></div>
            <div class="ja-editor-footer"><button class="ja-primary" type="button" data-journal-action="save">Guardar página ${icon('check')}</button><span class="ja-editor-status is-${statusKind}" id="journal-status" role="status" aria-live="polite">${safe(statusText)}</span></div>
          </div>
        </article>
      </div>
    </main>
    <footer class="ja-site-footer"><span>Un momento para ti también cuenta.</span><span>Mi espacio para escribir</span></footer>
    <dialog class="ja-calendar-dialog" id="journal-calendar" aria-labelledby="journal-calendar-title"><div class="ja-dialog-title"><h2 id="journal-calendar-title">Busca tu día</h2><button type="button" data-journal-action="calendar-close" aria-label="Cerrar calendario">${icon('close')}</button></div>${calendarHtml}</dialog>
    <dialog class="ja-unsaved-dialog" id="journal-unsaved" aria-labelledby="journal-unsaved-title" aria-describedby="journal-unsaved-description"><h2 id="journal-unsaved-title">Recuerda guardar tu página</h2><p id="journal-unsaved-description">Tienes cambios sin guardar. ¿Quieres guardarlos antes de continuar?</p><div class="ja-unsaved-actions"><button class="ja-secondary" type="button" data-journal-action="stay">Seguir escribiendo</button><button class="ja-primary" type="button" data-journal-action="save-continue">Guardar y continuar ${icon('check')}</button></div><p id="journal-unsaved-status" role="status" aria-live="polite"></p></dialog>
  </div>`;
}
