import { catalog, pets, groundSteps, muscleSteps, breathPhases } from './data.js';
import { clock } from './utils.js';
import { favorites, journal, setStore, companionToday, chooseCompanion } from './storage.js';
import { ExerciseClock } from './timer.js';
import { icon } from './icons.js';
import { renderFrame } from './components/interface.js';
import { renderHome } from './components/home.js';
import { renderDesktopHome } from './components/home-desktop.js';
import { renderHomeBackdrop } from './components/home-art.js';
import { renderWelcome, renderPetSelect, renderPetLibrary, renderPetDetail, renderPetConfirm } from './components/companions.js';
import { renderCollection, renderDetail } from './components/activities.js';
import { renderMore, renderAbout } from './components/settings.js';

const app = document.getElementById('app');
const announcer = document.getElementById('announcer');
// La misma definición de teléfono que en el welcome conserva el Home móvil.
const mobileHomeViewport = window.matchMedia('(max-width: 767px), (max-width: 1024px) and (max-height: 600px) and (orientation: landscape) and (hover: none) and (pointer: coarse)');
const routes = new Set(['welcome','home','pet-select','pet-library','pet-detail','pet-confirm','methods','meditation','quick','advice','favorites','more','about','detail']);
let route = { view: '', id: null };
let sessionClock = null;
let currentStep = 0;
let messageIndex = 0;
let saveOk = true;
let draft = journal();
let dirtyDraft = false;
let activityPet = null;
let petReturn = 'pet-select';
let returnRoute = 'methods';
let toastTimeout = null;
let visited = false;
const historyStack = [];
function routeKey(value) { return value.view + (value.id ? '/' + value.id : ''); }
function readRoute() {
  const [requested, id] = location.hash.slice(1).split('/');
  const view = routes.has(requested) ? requested : 'welcome';
  if (view === 'detail' && !Object.hasOwn(catalog, id)) return { view:'methods', id:null };
  if (view === 'pet-detail' && !Object.hasOwn(pets, id)) return { view:'pet-select', id:null };
  if (view === 'pet-confirm' && !companionToday()) return { view:'pet-select', id:null };
  return { view, id: ['detail','pet-detail'].includes(view) ? id : null };
}
function navigate(view, id) {
  const next = { view, id: id || null };
  if (routeKey(next) === routeKey(route)) return;
  location.hash = routeKey(next);
}
function goBack() {
  if (historyStack.length) history.back();
  else navigate(route.view === 'pet-detail' ? petReturn : route.view === 'about' ? 'more' : route.view === 'detail' ? returnRoute : 'home');
}
function render() {
  const cp = companionToday();
  let html = '';
  const view = route.view;
  const desktopHome = view === 'home' && !mobileHomeViewport.matches;
  if (view === 'welcome') html = renderWelcome();
  if (view === 'home') html = (desktopHome ? renderDesktopHome : renderHome)({ petId:cp, message: cp ? pets[cp].messages[messageIndex % pets[cp].messages.length] : '' });
  if (view === 'pet-select') html = renderPetSelect({ petId:cp });
  if (view === 'pet-library') html = renderPetLibrary();
  if (view === 'pet-detail') html = renderPetDetail({petId:route.id,chosen:cp,returnView:petReturn});
  if (view === 'pet-confirm') html = renderPetConfirm({petId:cp,saveOk});
  if (['methods','meditation','quick','advice','favorites'].includes(view)) html = renderCollection(view);
  if (view === 'more') html = renderMore(cp);
  if (view === 'about') html = renderAbout();
  if (view === 'detail') html = renderDetail(route.id, {draft,petReturn:activityPet});
  const active = ['home','pet-select','pet-library','pet-detail','pet-confirm'].includes(view) ? 'home' : view === 'favorites' ? 'favorites' : ['more','about'].includes(view) ? 'more' : 'methods';
  app.innerHTML = renderFrame(html, { active, welcome:view === 'welcome', home:view === 'home', desktopHome, backdrop:view === 'home' && !desktopHome ? renderHomeBackdrop() : '' });
  const main = app.querySelector('main');
  if (main) { main.id = 'main-content'; main.tabIndex = -1; }
  document.body.classList.toggle('welcome-view', view === 'welcome');
  document.body.classList.toggle('home-view', view === 'home');
  document.body.classList.toggle('home-desktop-view', desktopHome);
  const title = app.querySelector('h1')?.textContent ?? 'Tu espacio de calma';
  document.title = `${title} · Respira`;
  if (!saveOk && cp && view === 'home') notify('Tu compañía funciona ahora, pero no se pudo guardar en este navegador.');
}
function showRoute() {
  const next = readRoute();
  if (route.view && routeKey(next) !== routeKey(route)) {
    const previous = historyStack.at(-1);
    if (previous === routeKey(next)) historyStack.pop();
    else historyStack.push(routeKey(route));
  }
  if (sessionClock) { sessionClock.dispose(); sessionClock = null; }
  route = next;
  currentStep = 0;
  render();
  if (route.view === 'detail') setupExercise();
  window.scrollTo(0, 0);
  if (visited) app.querySelector('main')?.focus({preventScroll:true});
  visited = true;
}
function notify(text) {
  clearTimeout(toastTimeout);
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = text;
  document.body.append(toast);
  announcer.textContent = text;
  toastTimeout = setTimeout(() => toast.remove(), 4000);
}
function setText(id, text) {
  const element = document.getElementById(id);
  if (element && element.textContent !== text) element.textContent = text;
}
function setupExercise() {
  const x = catalog[route.id];
  if (x.kind === 'timer') {
    sessionClock = new ExerciseClock({duration:x.duration, onTick(elapsed, running) {
      setText('clock', clock(x.duration - elapsed));
      document.getElementById('timer-progress').value = elapsed;
      const control = document.getElementById('timer-toggle');
      control.innerHTML = `${icon(running ? 'pause' : 'play')} ${running ? 'Pausar' : elapsed ? 'Continuar' : 'Empezar'}`;
      setText('timer-status', running ? 'Este momento es para ti.' : elapsed ? 'Pausado. Continúa cuando quieras.' : 'Cuando quieras, empezamos.');
    },onComplete() {
      const control = document.getElementById('timer-toggle');
      control.innerHTML = `${icon('check')} Terminado`;
      control.disabled = true;
      setText('timer-status', 'Has completado tu momento de calma.');
      announcer.textContent = 'Ejercicio completado.';
    }});
  }
  if (x.kind === 'breath') {
    sessionClock = new ExerciseClock({onTick(elapsed,running) {
      const ticks = Math.floor(elapsed), position = ticks % 16;
      const phaseIndex = Math.floor(position / 4);
      setText('phase', breathPhases[phaseIndex][0]);
      setText('phase-seconds', `${4 - position % 4} segundos`);
      setText('breath-cycles', `Ciclos completados: ${Math.floor(ticks / 16)}`);
      const progress = (elapsed % 4) / 4;
      const scale = phaseIndex === 0 ? .88 + .24 * progress : phaseIndex === 1 ? 1.12 : phaseIndex === 2 ? 1.12 - .24 * progress : .88;
      document.getElementById('breath-inner').style.transform = `scale(${scale})`;
      setText('breath-status', running ? 'Respira cómodamente. Puedes pausar cuando quieras.' : elapsed ? 'Pausado. Continúa cuando quieras.' : 'Sigue el ritmo que te resulte cómodo.');
      document.getElementById('breath-toggle').innerHTML = `${icon(running ? 'pause' : 'play')} ${running ? 'Pausar' : elapsed ? 'Continuar' : 'Empezar'}`;
    }});
  }
}
function showStep(kind) {
  const steps = kind === 'ground' ? groundSteps : muscleSteps;
  setText(kind + '-count', `Paso ${currentStep + 1} de ${steps.length}`);
  setText(kind + '-title', steps[currentStep][0]);
  setText(kind + '-desc', steps[currentStep][1]);
  document.getElementById(kind + '-progress').value = currentStep + 1;
  document.querySelector(`[data-action="${kind}-prev"]`).disabled = currentStep === 0;
  document.getElementById(kind + '-next').innerHTML = currentStep === steps.length - 1 ? 'Volver a empezar' : `Siguiente ${icon('arrow')}`;
  announcer.textContent = `Paso ${currentStep + 1}. ${steps[currentStep][0]}`;
}
app.addEventListener('click', event => {
  const element = event.target.closest('[data-go],[data-open],[data-fav],[data-action],[data-pet-view]');
  if (!element || element.disabled) return;
  if (element.dataset.go) { navigate(element.dataset.go); return; }
  if (element.dataset.petView) {
    if (route.view !== 'pet-detail' && route.view !== 'detail') petReturn = route.view;
    navigate('pet-detail',element.dataset.petView); return;
  }
  if (element.dataset.open) {
    activityPet = route.view === 'pet-detail' ? route.id : null;
    returnRoute = route.view;
    navigate('detail',element.dataset.open); return;
  }
  if (element.dataset.fav) {
    const id = element.dataset.fav;
    if (!Object.hasOwn(catalog,id)) return;
    const values = favorites();
    const selected = values.includes(id);
    if (!setStore('favorites', selected ? values.filter(value => value !== id) : [...values,id])) { notify('No se pudo guardar el favorito en este navegador.'); return; }
    if (route.view === 'favorites') render();
    else {
      element.classList.toggle('is-favorite',!selected);
      element.setAttribute('aria-pressed',String(!selected));
      element.setAttribute('aria-label',`${selected ? 'Añadir a' : 'Quitar de'} favoritos: ${catalog[id].title}`);
    }
    announcer.textContent = selected ? 'Ejercicio quitado de favoritos.' : 'Ejercicio guardado en favoritos.';
    return;
  }
  const action = element.dataset.action;
  if (action === 'back') goBack();
  if (action === 'start') navigate(companionToday() ? 'home' : 'pet-select');
  if (action === 'pet-pick') {
    const result = chooseCompanion(element.dataset.petId);
    saveOk = result.saved;
    if (result.id) navigate('home');
  }
  if (action === 'pet-message') {
    const cp = companionToday();
    if (!cp) return;
    messageIndex++;
    const message = pets[cp].messages[messageIndex % pets[cp].messages.length];
    const text = app.querySelector('[data-pet-message], .home-pet-message, .pet-message-text');
    if (text) text.textContent = message;
    announcer.textContent = message;
  }
  if (action === 'breath-toggle' || action === 'timer-toggle') {
    if (!sessionClock) return;
    sessionClock.running ? sessionClock.pause() : sessionClock.start();
  }
  if (action === 'breath-reset' || action === 'timer-reset') {
    sessionClock?.reset();
    const toggle = document.getElementById(action === 'breath-reset' ? 'breath-toggle' : 'timer-toggle');
    if (toggle) toggle.disabled = false;
  }
  if (['ground-next','ground-prev','muscle-next','muscle-prev'].includes(action)) {
    const kind = action.split('-')[0];
    const steps = kind === 'ground' ? groundSteps : muscleSteps;
    currentStep = action.endsWith('prev') ? Math.max(0,currentStep-1) : (currentStep+1)%steps.length;
    showStep(kind);
  }
  if (action === 'journal-save') {
    const value = document.getElementById('journal-text').value;
    const saved = setStore('journal',value);
    if (saved) { draft = value; dirtyDraft = false; }
    setText('journal-status',saved ? 'Tu nota se guardó en este dispositivo.' : 'No se pudo guardar. Conserva una copia antes de cerrar.');
  }
  if (action === 'journal-clear' && confirm('¿Quieres borrar tu nota guardada?')) {
    if (setStore('journal','')) {
      draft = ''; dirtyDraft = false;
      document.getElementById('journal-text').value = '';
      setText('journal-count','0/10000');
      setText('journal-status','Nota borrada.');
    } else setText('journal-status','No se pudo borrar la nota en este navegador.');
  }
});
app.addEventListener('input', event => {
  if (event.target.id !== 'journal-text') return;
  draft = event.target.value;
  dirtyDraft = draft !== journal();
  setText('journal-count',`${draft.length}/10000`);
  setText('journal-status',dirtyDraft ? 'Tienes cambios por guardar.' : 'Tu nota está guardada.');
});
window.addEventListener('beforeunload',event => {
  if (dirtyDraft) { event.preventDefault(); event.returnValue = ''; }
});
window.addEventListener('hashchange',() => {
  if (location.hash === '#main-content') {
    history.replaceState(null,'','#' + routeKey(route));
    app.querySelector('main')?.focus(); return;
  }
  showRoute();
});
document.addEventListener('keydown',event => {
  if (event.key !== 'Escape' || event.repeat || event.target.matches('textarea,input,select,[contenteditable]')) return;
  if (['welcome','home','pet-select','pet-confirm'].includes(route.view)) return;
  event.preventDefault(); goBack();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  sessionClock?.tick();
  if (route.view === 'home') render();
});
mobileHomeViewport.addEventListener('change', () => {
  if (route.view === 'home') render();
});
if (!location.hash) history.replaceState(null,'','#welcome');
showRoute();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {
    // La aplicación en línea sigue funcionando si el navegador impide el modo sin conexión.
  }));
}
