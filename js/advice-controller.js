import { bindAdvice } from './components/advice.js';
import { bindInfographicStack } from './advice-stack.js';
import { bindInfographicSwipe } from './advice-swipe.js';
import { catalog } from './data.js';
import { favorites, setStore } from './storage.js';

const mobileQuery = '(max-width:767px), (max-width:1024px) and (max-height:600px) and (orientation:landscape) and (hover:none) and (pointer:coarse)';
// Keep the selected page when routes rerender or the layout changes.
let selectedIndex = null;

export function bindAdvicePage(scope, { open = () => {}, back = () => {}, announce = () => {} } = {}) {
  const page = scope?.matches?.('.info-page, .consejos-detail')
    ? scope : scope?.querySelector?.('.info-page, .consejos-detail');
  if (!page) return () => {};

  const titleFor = (id, button) => catalog[id]?.title
    || button?.closest('[data-info-slide]')?.dataset.infoTitle
    || page.querySelector('h1')?.textContent.trim()
    || 'Consejo';

  function paintFavorites() {
    const saved = new Set(favorites());
    page.querySelectorAll('[data-info-favorite], [data-advice-favorite]').forEach(button => {
      const id = button.dataset.infoFavorite || button.dataset.adviceFavorite;
      const selected = saved.has(id);
      const label = `${selected ? 'Quitar de favoritos' : 'Guardar en favoritos'}: ${titleFor(id, button)}`;
      button.setAttribute('aria-pressed', String(selected));
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.classList.toggle('is-favorite', selected);
    });
  }

  function toggleFavorite(id, reportSuccess = true) {
    if (typeof id !== 'string' || !Object.hasOwn(catalog, id)) return false;
    const values = favorites();
    const selected = values.includes(id);
    const saved = setStore('favorites', selected ? values.filter(value => value !== id) : [...values, id]);
    paintFavorites();
    if (!saved) announce('No se pudo guardar el favorito en este navegador.');
    else if (reportSuccess) announce(selected ? 'Consejo quitado de favoritos.' : 'Consejo guardado en favoritos.');
    return saved;
  }

  paintFavorites();
  if (page.matches('.consejos-detail')) {
    let suppressFavoriteAnnouncement = false;
    return bindAdvice(page, {
      open,
      back,
      toggleFavorite(id) {
        // The detail binder updates its buttons before invoking this callback.
        // Restore their persisted state if the browser rejects the write.
        suppressFavoriteAnnouncement = !toggleFavorite(id, false);
      },
      announce(message) {
        const favoriteMessage = message === 'Consejo guardado en favoritos.' || message === 'Consejo quitado de favoritos.';
        if (favoriteMessage && suppressFavoriteAnnouncement) {
          suppressFavoriteAnnouncement = false;
          return;
        }
        announce(message);
      }
    });
  }

  const view = page.ownerDocument.defaultView;
  const mobile = view.matchMedia(mobileQuery);
  const slides = [...page.querySelectorAll('[data-info-slide]')];
  let disposeMode = () => {};
  let disposed = false;

  function changeMode() {
    if (disposed) return;
    disposeMode();
    const mobileMode = mobile.matches;
    const options = {
      // El carrusel anterior puede recibir scroll al cambiar el CSS de pantalla.
      // Esa notificación no debe sustituir la tarjeta que eligió la persona.
      onChange(index) { if (mobile.matches === mobileMode) selectedIndex = index; }
    };
    if (Number.isInteger(selectedIndex) && selectedIndex >= 0 && selectedIndex < slides.length) {
      options.initialIndex = selectedIndex;
    }
    disposeMode = mobileMode
      ? bindInfographicStack(page, options)
      : bindInfographicSwipe(page, options);
  }

  function click(event) {
    const button = event.target?.closest?.('[data-info-favorite], [data-info-open], [data-info-back]');
    if (disposed || !button || !page.contains(button) || button.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    if (button.hasAttribute('data-info-favorite')) toggleFavorite(button.dataset.infoFavorite);
    else if (button.hasAttribute('data-info-open')) {
      const index = slides.findIndex(slide => slide.dataset.infoId === button.dataset.infoOpen);
      if (index >= 0) selectedIndex = index;
      open(button.dataset.infoOpen);
    } else back();
  }

  page.addEventListener('click', click);
  mobile.addEventListener('change', changeMode);
  changeMode();
  return () => {
    if (disposed) return;
    disposed = true;
    disposeMode();
    mobile.removeEventListener('change', changeMode);
    page.removeEventListener('click', click);
  };
}
