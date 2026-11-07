import { catalog, pets, groundSteps, muscleSteps, breathPhases } from './data.js';
import { clock } from './utils.js';
import { favorites, setStore, companionToday, chooseCompanion } from './storage.js';
import { ExerciseClock } from './timer.js';
import { icon } from './icons.js';
import { renderFrame } from './components/interface.js';
import { renderMobileHome } from './components/home-mobile-jardin.js';
import { renderDesktopHome } from './components/home-desktop.js';
import { renderWelcome, renderPetLibrary, renderPetDetail, renderPetConfirm } from './components/companions.js';
import { renderPetSelectJardin } from './components/pet-select-jardin.js';
import { renderCollection, renderDetail } from './components/activities.js';
import { renderMethods } from './components/methods.js';
import { renderFavorites } from './components/favorites.js';
import { renderMoreJardin } from './components/more-jardin.js';
import { renderAbout } from './components/settings.js';
import { markPetOfferSeen, welcomeDestination } from './daily-entry.js';
import { bindHomePetInteractions } from './home-pet-interaction.js';
import { renderJournalAgenda } from './components/journal-agenda.js';
import { journalAgendaView, bindJournalAgenda, flushJournalAgenda, hasPendingJournalChanges, requestJournalLeave } from './journal-agenda-controller.js';

const app = document.getElementById('app');
const announcer = document.getElementById('announcer');
// La misma definición de teléfono que en el welcome activa el Home móvil aprobado.
const mobileHomeViewport = window.matchMedia('(max-width: 767px), (max-width: 1024px) and (max-height: 600px) and (orientation: landscape) and (hover: none) and (pointer: coarse)');
const routes = new Set(['welcome','home','pet-select','pet-library','pet-detail','pet-confirm','methods','meditation','quick','advice','favorites','more','about','detail']);
let route = { view: '', id: null };
let sessionClock = null;
let currentStep = 0;
let messageIndex = 0;
let saveOk = true;
let activityPet = null;
let petReturn = 'pet-select';
let returnRoute = 'methods';
let toastTimeout = null;
let visited = false;
let cleanupHomePet = null;
let cleanupJournal = null;
let homeReselection = false;
const historyStack = [];
let historyIndex = Number.isSafeInteger(history.state?.respiraRouteIndex) ? history.state.respiraRouteIndex : 0;
let restoringJournalNavigation = null;
function isJournalRoute() { return route.view === 'detail' && route.id === 'journal'; }
function leaveJournal(action) {
  if (isJournalRoute() && hasPendingJournalChanges()) return requestJournalLeave(action);
  action();
  return true;
}
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
  leaveJournal(() => { location.hash = routeKey(next); });
}
function goBack() {
  leaveJournal(() => {
    if (historyStack.length) history.back();
    else navigate(route.view === 'pet-detail' ? petReturn : route.view === 'about' ? 'more' : route.view === 'detail' ? returnRoute : 'home');
  });
}
function render() {
  cleanupHomePet?.();
  cleanupHomePet = null;
  cleanupJournal?.();
  cleanupJournal = null;
  const cp = companionToday();
  let html = '';
  const view = route.view;
  const journalView = view === 'detail' && route.id === 'journal';
  const desktopHome = view === 'home' && !mobileHomeViewport.matches;
  const mobileHome = view === 'home' && mobileHomeViewport.matches;
  if (view === 'welcome') html = renderWelcome();
  if (view === 'home') html = (desktopHome ? renderDesktopHome : renderMobileHome)({ petId:cp, message: cp ? pets[cp].messages[messageIndex % pets[cp].messages.length] : '' });
  if (view === 'pet-select') {
    markPetOfferSeen();
    html = renderPetSelectJardin({ petId:cp, reselect:homeReselection });
  }
  if (view === 'pet-library') html = renderPetLibrary();
  if (view === 'pet-detail') html = renderPetDetail({petId:route.id,chosen:cp,returnView:petReturn});
  if (view === 'pet-confirm') html = renderPetConfirm({petId:cp,saveOk});
  if (view === 'methods') html = renderMethods({ petId:cp });
  if (['meditation','quick','advice'].includes(view)) html = renderCollection(view);
  if (view === 'favorites') html = renderFavorites({ petId:cp });
  if (view === 'more') html = renderMoreJardin(cp);
  if (view === 'about') html = renderAbout();
  if (view === 'detail') html = journalView ? renderJournalAgenda(journalAgendaView()) : renderDetail(route.id, {petReturn:activityPet});
  const active = ['welcome','home','pet-select','pet-library','pet-detail','pet-confirm'].includes(view) ? 'home' : view === 'favorites' ? 'favorites' : ['more','about'].includes(view) ? 'more' : 'methods';
  app.innerHTML = renderFrame(html, { active, welcome:view === 'welcome', home:view === 'home', desktopHome, mobileHome, methods:view === 'methods', ownInterface:journalView || ['favorites','more','pet-select'].includes(view) });
  if (view === 'home') cleanupHomePet = bindHomePetInteractions(app);
  if (journalView) cleanupJournal = bindJournalAgenda(app, render);
  const main = app.querySelector('main');
  if (main) { main.id = 'main-content'; main.tabIndex = -1; }
  document.body.classList.toggle('welcome-view', view === 'welcome');
  document.body.classList.toggle('home-view', view === 'home');
  document.body.classList.toggle('home-desktop-view', desktopHome);
  document.body.classList.toggle('home-mobile-jardin-view', mobileHome);
  document.body.classList.toggle('methods-view', view === 'methods');
  document.body.classList.toggle('favorites-jardin-view', view === 'favorites');
  document.body.classList.toggle('more-jardin-view', view === 'more');
  document.body.classList.toggle('pet-select-jardin-view', view === 'pet-select');
  document.body.classList.toggle('journal-agenda-view', journalView);
  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme) theme.content = view === 'welcome' && mobileHomeViewport.matches ? '#147b99' : '#f6f8f2';
  const title = app.querySelector('h1')?.textContent ?? 'Tu espacio de calma';
  document.title = `${title} · Respira`;
  if (!saveOk && cp && view === 'home') notify('Tu compañía funciona ahora, pero no se pudo guardar en este navegador.');
}
function showRoute() {
  const next = readRoute();
  const changed = route.view && routeKey(next) !== routeKey(route);
  const marker = history.state?.respiraRouteIndex;
  if (restoringJournalNavigation && marker === historyIndex && !changed) {
    const continuation = restoringJournalNavigation;
    restoringJournalNavigation = null;
    requestJournalLeave(() => history.go(continuation.delta));
    return;
  }
  let nextIndex = Number.isSafeInteger(marker) ? marker : route.view ? historyIndex + 1 : historyIndex;
  if (changed && nextIndex === historyIndex) nextIndex++;
  history.replaceState({ ...history.state, respiraRouteIndex: nextIndex }, '', location.href);
  if (changed && isJournalRoute() && hasPendingJournalChanges()) {
    restoringJournalNavigation = { delta: nextIndex - historyIndex };
    history.go(historyIndex - nextIndex);
    return;
  }
  historyIndex = nextIndex;
  if (route.view && routeKey(next) !== routeKey(route)) {
    const previous = historyStack.at(-1);
    if (previous === routeKey(next)) historyStack.pop();
    else historyStack.push(routeKey(route));
  }
  if (sessionClock) { sessionClock.dispose(); sessionClock = null; }
  route = next;
  if (!['pet-select','pet-detail','pet-library'].includes(route.view)) homeReselection = false;
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
app.addEventListener('companion-profile', event => {
  const id = event.detail?.id;
  if (route.view !== 'home' || id !== companionToday()) return;
  petReturn = 'home';
  navigate('pet-detail', id);
});
app.addEventListener('click', event => {
  const element = event.target.closest('[data-go],[data-open],[data-fav],[data-action],[data-pet-view],[data-method-category]');
  if (!element || element.disabled) return;
  if (element.dataset.methodCategory) {
    const section = document.getElementById('m10-category-' + element.dataset.methodCategory);
    if (section) {
      section.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'start'});
      section.focus({preventScroll:true});
    }
    return;
  }
  if (element.dataset.go) { event.preventDefault(); navigate(element.dataset.go); return; }
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
  if (action === 'start') {
    event.preventDefault();
    homeReselection = false;
    navigate(welcomeDestination());
    return;
  }
  if (action === 'home-rechoose' && route.view === 'home' && companionToday()) {
    homeReselection = true;
    navigate('pet-select');
    return;
  }
  if (action === 'pet-pick') {
    const result = chooseCompanion(element.dataset.petId, { replace:route.view === 'pet-select' && homeReselection });
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
});
window.addEventListener('beforeunload',event => {
  if (hasPendingJournalChanges()) { event.preventDefault(); event.returnValue = ''; }
});
window.addEventListener('pagehide', flushJournalAgenda);
window.addEventListener('hashchange',() => {
  if (location.hash === '#main-content') {
    history.replaceState(history.state,'','#' + routeKey(route));
    app.querySelector('main')?.focus(); return;
  }
  showRoute();
});
document.addEventListener('keydown',event => {
  if (event.key !== 'Escape' || event.repeat || event.target.matches('textarea,input,select,[contenteditable]')) return;
  if (document.querySelector('dialog[open]')) return;
  if (['welcome','home','pet-select','pet-confirm'].includes(route.view)) return;
  event.preventDefault(); goBack();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  sessionClock?.tick();
  if (route.view === 'home') render();
});
mobileHomeViewport.addEventListener('change', () => {
  if (route.view === 'home' || route.view === 'welcome') render();
});
if (!location.hash) history.replaceState(null,'','#welcome');
showRoute();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {
    // La aplicación en línea sigue funcionando si el navegador impide el modo sin conexión.
  }));
}
