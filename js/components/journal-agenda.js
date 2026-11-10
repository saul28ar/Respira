import { icon } from '../icons.js';
import { favorites } from '../storage.js';
import { getTasksForDate } from '../journal-storage.js';
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
const isWritten = page => String(page.title || '').trim() || String(page.text || '').trim();

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
    const writtenCount = (document.days?.[day]?.pages || []).filter(isWritten).length;
    const marks = writtenCount ? `<span class="ja-page-dots" aria-hidden="true">${'<i></i>'.repeat(Math.min(5, writtenCount))}${writtenCount > 5 ? `<b>+${writtenCount - 5}</b>` : ''}</span>` : '';
    days += `<button type="button" data-journal-date="${day}" aria-label="Abrir ${safe(dateTitle(day))}${writtenCount ? `, ${writtenCount} ${writtenCount === 1 ? 'página escrita' : 'páginas escritas'}` : ''}" aria-pressed="${day === date}"${day === today ? ' aria-current="date"' : ''}><span>${number}</span>${marks}</button>`;
  }
  return `<section class="ja-calendar" aria-label="Calendario de ${safe(title)}">
    <div class="ja-calendar-head"><strong>${safe(title)}</strong><div class="ja-month-controls"><button type="button" data-journal-month="-1" aria-label="Mes anterior">${icon('back')}</button><button type="button" data-journal-month="1" aria-label="Mes siguiente">${icon('arrow')}</button></div></div>
    <div class="ja-week-labels" aria-hidden="true">${weekdays}</div><div class="ja-calendar-grid">${days}</div>
    <div class="ja-calendar-bottom"><button type="button" data-journal-action="today">Ir a hoy</button></div>
  </section>`;
}

function dayList(document, date, pageId) {
  const entries = Object.keys(document.days || {}).filter(validDate).sort().reverse().flatMap(day =>
    (document.days[day].pages || []).filter(isWritten).map(page => ({ day, page })));
  return `<div class="ja-day-list">${entries.length ? entries.map(({ day, page }) => {
    const title = String(page.title || '').trim() || 'Sin título';
    const dateLabel = capital(dateFormat(day, { day: 'numeric', month: 'short', year: 'numeric' }));
    return `<button class="ja-day-link" type="button" data-journal-entry data-journal-date="${day}" data-page-id="${safe(page.id)}" aria-label="Abrir ${safe(title)}, ${safe(dateTitle(day))}" aria-pressed="${day === date && page.id === pageId}"><span class="ja-day-number" aria-hidden="true">${parseDate(day).getUTCDate()}</span><span><strong>${safe(title)}</strong><small>${safe(dateLabel)}</small></span>${icon('chevron')}</button>`;
  }).join('') : '<p class="ja-pages-empty">Tus páginas guardadas aparecerán aquí, con su fecha y su título.</p>'}</div>`;
}

function pageList(pages, pageId, closedPageIds) {
  const closed = new Set(closedPageIds);
  return `<div class="ja-page-selector" aria-label="Páginas del día abierto"><p>En este día</p><div class="ja-page-options">${pages.map((page, index) => closed.has(page.id) ? '' : `<span class="ja-page-tab${page.id === pageId ? ' is-active' : ''}"><button type="button" class="ja-page-choice" data-journal-page="${safe(page.id)}" aria-pressed="${page.id === pageId}">Página ${index + 1}</button><button type="button" class="ja-page-close" data-journal-action="close-page" data-page-id="${safe(page.id)}" aria-label="Cerrar Página ${index + 1}">${icon('close')}</button></span>`).join('')}<button type="button" class="ja-add-page" data-journal-action="add-page">+ Nueva página</button></div></div>`;
}

function checklist(tasks, date, document) {
  const repeatHint = task => {
    if (!task.routineId) return '';
    const routines = document.routines || [];
    const routine = Array.isArray(routines) ? routines.find(item => item.id === task.routineId) : routines[task.routineId];
    const mode = task.routineMode || task.repeatMode || task.mode || task.routine?.mode || routine?.mode;
    return mode === 'daily' ? 'Diaria' : 'Fechas elegidas';
  };
  return `<details class="ja-panel ja-tasks" data-journal-fold="tasks" open>
    <summary class="ja-fold-summary"><span>Mi lista de hoy</span>${icon('chevron')}</summary><div class="ja-fold-body">
    <h2 id="journal-tasks-title">Mi lista de hoy</h2><p class="ja-list-intro">Lo pequeño también tiene su lugar.</p>
    <div class="ja-checklist">${tasks.length ? tasks.map(task => `<div class="ja-check-row${task.done ? ' is-done' : ''}"><label><input type="checkbox" data-journal-task-id="${safe(task.id)}"${task.done ? ' checked' : ''}><span class="ja-task-copy"><span>${safe(task.text)}</span>${task.routineId ? `<small class="ja-task-repeat">${repeatHint(task)}</small>` : ''}</span></label><div class="ja-task-tools"><button type="button" class="ja-task-pin" data-journal-action="task-pin" data-task-id="${safe(task.id)}" aria-label="Repetir actividad: ${safe(task.text)}" aria-pressed="${Boolean(task.routineId)}">${icon('pin')}</button><button type="button" class="ja-task-delete" data-journal-action="task-delete" data-task-id="${safe(task.id)}" aria-label="Eliminar de mi lista: ${safe(task.text)}">${icon('close')}</button></div></div>`).join('') : '<p class="ja-list-empty">¿Qué te gustaría hacer hoy?</p>'}</div>
    <form class="ja-add-task" data-journal-task-form><label class="ja-sr-only" for="journal-task">Añadir a mi lista del ${safe(dateTitle(date))}</label><input id="journal-task" name="task" placeholder="Algo que quiero hacer…" maxlength="160" autocomplete="off" required><button type="submit" aria-label="Añadir a mi lista">+</button></form>
    <p class="ja-list-note">No hace falta hacerlo todo hoy.</p>
  </div></details>`;
}

function scheduleDialog(editor, date, tasks) {
  const state = editor || { mode: 'daily', dates: [], month: date.slice(0, 7) };
  const month = /^\d{4}-(0[1-9]|1[0-2])$/.test(state.month || '') ? state.month : date.slice(0, 7);
  const [year, monthNumber] = month.split('-').map(Number);
  const first = utcDate(year, monthNumber - 1, 1);
  const start = (first.getUTCDay() + 6) % 7;
  const count = utcDate(year, monthNumber, 0).getUTCDate();
  const selected = new Set(state.dates || []);
  const monthTitle = capital(new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(first));
  let days = '<span aria-hidden="true"></span>'.repeat(start);
  for (let number = 1; number <= count; number += 1) {
    const day = isoDate(utcDate(year, monthNumber - 1, number));
    days += `<button type="button" data-journal-schedule-date="${day}" aria-label="${safe(dateTitle(day))}" aria-pressed="${selected.has(day)}">${number}</button>`;
  }
  const task = tasks.find(item => item.id === state.taskId);
  const text = String(state.text || task?.text || '');
  return `<dialog class="ja-schedule-dialog" id="journal-task-schedule" aria-labelledby="journal-schedule-title" aria-describedby="journal-schedule-task"><div class="ja-dialog-title"><h2 id="journal-schedule-title">Repetir actividad</h2><button type="button" data-journal-action="schedule-cancel" aria-label="Cerrar repetición">${icon('close')}</button></div><p class="ja-schedule-task" id="journal-schedule-task">${safe(text)}</p><fieldset class="ja-repeat-options"><legend class="ja-sr-only">Cuándo repetir esta actividad</legend><label><input type="radio" name="journal-repeat-mode" value="daily"${state.mode !== 'dates' ? ' checked' : ''}><span>Todos los días</span></label><label><input type="radio" name="journal-repeat-mode" value="dates"${state.mode === 'dates' ? ' checked' : ''}><span>Elegir fechas</span></label></fieldset>${state.mode === 'dates' ? `<p class="ja-schedule-date-help">Selecciona los días en que quieras verla en tu lista.</p><section class="ja-schedule-calendar" aria-label="Elegir fechas de ${safe(monthTitle)}"><div class="ja-calendar-head"><strong>${safe(monthTitle)}</strong><div class="ja-month-controls"><button type="button" data-journal-schedule-month="-1" aria-label="Mes anterior">${icon('back')}</button><button type="button" data-journal-schedule-month="1" aria-label="Mes siguiente">${icon('arrow')}</button></div></div><div class="ja-week-labels" aria-hidden="true">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(label => `<span>${label}</span>`).join('')}</div><div class="ja-calendar-grid">${days}</div><p class="ja-schedule-count">${selected.size ? `${selected.size} ${selected.size === 1 ? 'fecha elegida' : 'fechas elegidas'}` : 'Elige los días en el calendario.'}</p></section>` : '<p class="ja-schedule-note">Un pequeño espacio para esta actividad, cada día.</p>'}<p class="ja-schedule-error" id="journal-schedule-error" role="status" aria-live="polite">${safe(state.error || '')}</p><div class="ja-schedule-actions"><button class="ja-secondary" type="button" data-journal-action="schedule-cancel">Cancelar</button><button class="ja-primary" type="button" data-journal-action="schedule-save">Guardar repetición ${icon('check')}</button></div>${task?.routineId ? `<button class="ja-unpin" type="button" data-journal-action="task-unpin" data-task-id="${safe(state.taskId)}">Dejar de repetir</button>` : ''}</dialog>`;
}

export function renderJournalAgenda({ document = { version: 1, days: {} }, date, pageId, month, closedPageIds = [], scheduleEditor = null, status = { kind: 'saved', message: 'Guardado' }, recoveredLegacy = false } = {}) {
  const today = dateAtDevice();
  date = validDate(date) ? date : today;
  month = /^\d{4}-(0[1-9]|1[0-2])$/.test(month || '') ? month : date.slice(0, 7);
  const day = document.days?.[date] || { pages: [], tasks: [] };
  const pages = day.pages || [];
  const page = pageId === null ? null : pages.find(item => item.id === pageId && !closedPageIds.includes(item.id)) || pages.find(item => !closedPageIds.includes(item.id)) || null;
  const pageIndex = Math.max(0, pages.indexOf(page));
  const text = String(page?.text || '');
  const tasks = getTasksForDate(document, date);
  const selectedFavorite = favorites().includes('journal');
  const statusKind = ['saved', 'dirty', 'error'].includes(status.kind) ? status.kind : 'saved';
  const statusText = status.message || ({ saved: 'Guardado', dirty: 'Cambios sin guardar', error: 'No se pudo guardar. Inténtalo de nuevo.' })[statusKind];
  const calendarHtml = calendar(document, date, month, today);
  return `<div class="journal-agenda">
    <svg class="ja-waves" viewBox="0 800 941 872" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg>
    <div class="ja-edge-waves" aria-hidden="true"><svg class="ja-edge-left" viewBox="0 800 941 872" focusable="false"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg><svg class="ja-edge-right" viewBox="0 800 941 872" focusable="false"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg></div>
    <header class="ja-topbar"><a class="ja-brand" href="#home" data-go="home" aria-label="Respira · Tu espacio de calma. Ir al inicio"><img src="./imagenes/welcome/logo-aprobado-v2.png" alt="Respira · Tu espacio de calma" width="155" height="70"></a><nav class="ja-topbar-links" aria-label="Navegación principal"><a href="#home" data-go="home">Inicio</a><a href="#methods" data-go="methods">Métodos</a><a href="#favorites" data-go="favorites">Favoritos</a><a href="#more" data-go="more">Más</a></nav><button class="ja-menu" type="button" data-go="more" aria-label="Abrir menú de opciones">${icon('menu')}</button></header>
    <main class="ja-main" id="main-content" tabindex="-1" aria-label="Mi espacio para escribir">
      <div class="ja-toolbar"><button class="ja-back" type="button" data-action="back">${icon('back')}<span>Volver</span></button><button class="ja-favorite${selectedFavorite ? ' is-favorite' : ''}" type="button" data-fav="journal" aria-label="${selectedFavorite ? 'Quitar de' : 'Añadir a'} favoritos: Mi espacio para escribir" aria-pressed="${selectedFavorite}">${icon('heart')}</button></div>
      <header class="ja-intro"><div><span class="ja-eyebrow">UN RATITO PARA TI</span><h1>Mi espacio para escribir</h1><p>Abre un día. Escribe a tu ritmo.</p></div><img class="ja-mascot" src="./imagenes/inicio-web/gatito-hd.png" alt="" width="150" height="101" draggable="false"></header>
      <div class="ja-layout">
        ${checklist(tasks, date, document)}
        <aside class="ja-sidebar" aria-label="Mis días y mis páginas">
          <details class="ja-panel ja-calendar-panel" data-journal-fold="calendar" open><summary class="ja-fold-summary"><span>Calendario</span>${icon('chevron')}</summary><div class="ja-fold-body"><div class="ja-panel-caption"><span>Busca tu día</span><span class="ja-tiny-star" aria-hidden="true">✧</span></div>${calendarHtml}</div></details>
          <details class="ja-panel ja-days-panel" data-journal-fold="pages" open><summary class="ja-fold-summary"><span>Mis páginas</span>${icon('chevron')}</summary><div class="ja-fold-body"><div class="ja-panel-caption"><h2 id="journal-pages-title">Mis páginas</h2><span>Día a día</span></div>${dayList(document, date, page?.id)}</div></details>
          <p class="ja-sidebar-note">Cada día, todas las páginas que necesites.</p>
        </aside>
        <article class="ja-paper ja-panel" aria-labelledby="journal-date-title">
          ${pageList(pages, page?.id, closedPageIds)}
          <div class="ja-paper-top"><div><span class="ja-paper-label">MI PÁGINA DEL DÍA</span><h2 id="journal-date-title">${safe(dateTitle(date))}</h2></div><span class="ja-paper-mark" aria-hidden="true">✦</span></div>
          ${page ? `<div class="ja-editor"><div class="ja-editor-head"><span>${safe(shortDate(date))}<span class="ja-page-number"> · Página ${pageIndex + 1}</span></span></div>
            ${recoveredLegacy && page.title === 'Nota anterior' ? '<p class="ja-recovered">Nota anterior · Tus palabras están aquí.</p>' : ''}
            <label class="ja-sr-only" for="journal-title">Título de tu página</label><input class="ja-editor-title" id="journal-title" type="text" maxlength="120" value="${safe(page.title || '')}" placeholder="¿Qué te gustaría dejar aquí?" autocomplete="off"><label class="ja-sr-only" for="journal-text">Escribe lo que sientes</label><textarea id="journal-text" maxlength="10000" rows="7" aria-describedby="journal-status journal-count" placeholder="Hoy me siento…">
${safe(text)}</textarea>
            <div class="ja-editor-meta"><span id="journal-count">${text.length}/10000</span><span>Solo en este navegador y dispositivo.</span></div>
            <div class="ja-editor-footer"><button class="ja-primary" type="button" data-journal-action="save">Guardar página ${icon('check')}</button><span class="ja-editor-status is-${statusKind}" id="journal-status" role="status" aria-live="polite">${safe(statusText)}</span></div>
          </div>` : '<div class="ja-empty-editor"><span aria-hidden="true">✧</span><h3>Un espacio para tus palabras</h3><p>Abre una de Mis páginas o empieza una nueva, cuando quieras.</p><div><button class="ja-secondary" type="button" data-journal-action="pages-open">Abrir Mis páginas</button><button class="ja-primary" type="button" data-journal-action="add-page">Crear una página</button></div></div>'}
        </article>
      </div>
    </main>
    <footer class="ja-site-footer"><span>Un momento para ti también cuenta.</span><span>Mi espacio para escribir</span></footer>
    <dialog class="ja-calendar-dialog" id="journal-calendar" aria-labelledby="journal-calendar-title"><div class="ja-dialog-title"><h2 id="journal-calendar-title">Busca tu día</h2><button type="button" data-journal-action="calendar-close" aria-label="Cerrar calendario">${icon('close')}</button></div>${calendarHtml}</dialog>
    <dialog class="ja-unsaved-dialog" id="journal-unsaved" aria-labelledby="journal-unsaved-title" aria-describedby="journal-unsaved-description"><h2 id="journal-unsaved-title">Recuerda guardar tu página</h2><p id="journal-unsaved-description">Tienes cambios sin guardar. ¿Quieres guardarlos antes de continuar?</p><div class="ja-unsaved-actions"><button class="ja-secondary" type="button" data-journal-action="stay">Seguir escribiendo</button><button class="ja-primary" type="button" data-journal-action="save-continue">Guardar y continuar ${icon('check')}</button></div><p id="journal-unsaved-status" role="status" aria-live="polite"></p></dialog>
    ${scheduleDialog(scheduleEditor, date, tasks)}
  </div>`;
}
