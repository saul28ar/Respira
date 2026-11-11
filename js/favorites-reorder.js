import { favorites, setStore } from './storage.js';

const cardSelector = 'article[data-card]';
const gripSelector = '[data-favorite-grip]';

/** Reorder only the saved list, using the current DOM for placement. */
export function bindFavoriteReorder(scope, { announce = () => {} } = {}) {
  const grid = scope.querySelector('.f4-favorite-grid');
  if (!grid) return () => {};
  const document = grid.ownerDocument;
  const view = document.defaultView;
  let drag;
  let frame = 0;

  const cards = () => [...grid.children].filter(child => child.matches(cardSelector));

  function move(source, target, position, grip, keyboard = false) {
    const id = source.dataset.card;
    const targetId = target.dataset.card;
    // Read membership again at drop time so another tab's saves or removals survive.
    const saved = favorites();
    if (!saved.includes(id) || !saved.includes(targetId)) {
      announce('La lista de favoritos cambió. Vuelve a abrirla para ordenarla.');
      return;
    }
    const order = saved.filter(item => item !== id);
    const index = order.indexOf(targetId) + Number(position === 'after');
    order.splice(index, 0, id);
    if (saved.every((item, slot) => item === order[slot])) return;
    if (!setStore('favorites', order)) {
      announce('No se pudo guardar el orden de tus favoritos.');
      return;
    }
    const nodes = new Map(cards().map(card => [card.dataset.card, card]));
    const visible = order.map(item => nodes.get(item)).filter(Boolean);
    visible.forEach((card, slot) => {
      if (grid.children[slot] !== card) grid.insertBefore(card, grid.children[slot] ?? null);
    });
    if (keyboard) {
      grip.focus({ preventScroll: true });
      grip.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
    }
    const title = source.querySelector('.f4-card-copy strong')?.textContent?.trim() || 'Favorito';
    announce(`${title}, posición ${index + 1} de ${order.length}.`);
  }

  function clearTarget() {
    if (drag?.target) delete drag.target.dataset.favoriteDrop;
    if (drag) drag.target = null;
  }

  function updateTarget() {
    const { x, y, source } = drag;
    const rect = grid.getBoundingClientRect();
    if (x < rect.left - 15 || x > rect.right + 15 || y < rect.top - 32 || y > rect.bottom + 32) {
      clearTarget();
      return;
    }
    let nearest;
    let distance = Infinity;
    for (const card of cards()) {
      const box = card.getBoundingClientRect();
      const dx = Math.max(box.left - x, 0, x - box.right);
      const dy = Math.max(box.top - y, 0, y - box.bottom);
      const offset = Math.hypot(dx, dy);
      if (offset >= distance) continue;
      distance = offset;
      nearest = { card, position: y < (box.top + box.bottom) / 2 ? 'before' : 'after' };
    }
    if (!nearest || nearest.card === source) {
      clearTarget();
      return;
    }
    if (nearest.card !== drag.target) clearTarget();
    drag.target = nearest.card;
    drag.target.dataset.favoriteDrop = nearest.position;
  }

  function scrollDrag() {
    if (!drag?.preview) return;
    const nav = scope.querySelector('.mobile-approved-nav');
    const navBox = nav?.getBoundingClientRect();
    const bottom = navBox?.height ? navBox.top : view.innerHeight;
    const edge = 58;
    const speed = drag.y < edge ? -Math.min(17, (edge - drag.y) / 3)
      : drag.y > bottom - edge ? Math.min(17, (drag.y - bottom + edge) / 3) : 0;
    if (speed) {
      view.scrollBy({ top: speed, behavior: 'instant' });
      updateTarget();
    }
    frame = view.requestAnimationFrame(scrollDrag);
  }

  function startDrag() {
    const { source, origin } = drag;
    const preview = source.cloneNode(true);
    preview.removeAttribute('data-card');
    preview.inert = true;
    preview.setAttribute('aria-hidden', 'true');
    preview.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    Object.assign(preview.style, {
      position: 'fixed',
      inset: '0 auto auto 0',
      width: origin.width + 'px',
      height: origin.height + 'px',
      pointerEvents: 'none',
      zIndex: '41',
      opacity: '.86'
    });
    drag.preview = preview;
    source.dataset.favoriteDragging = '';
    grid.append(preview);
    frame = view.requestAnimationFrame(scrollDrag);
  }

  function onPointerDown(event) {
    if (drag || !event.isPrimary || event.button !== 0 || cards().length < 2) return;
    const grip = event.target.closest(gripSelector);
    const source = grip?.closest(cardSelector);
    if (source?.parentElement !== grid || grip.disabled) return;
    const origin = source.getBoundingClientRect();
    drag = {
      id: event.pointerId, source, grip, origin,
      startX: event.clientX, startY: event.clientY,
      x: event.clientX, y: event.clientY
    };
    grip.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    if (drag?.id !== event.pointerId) return;
    drag.x = event.clientX;
    drag.y = event.clientY;
    const dx = drag.x - drag.startX;
    const dy = drag.y - drag.startY;
    if (!drag.preview && Math.hypot(dx, dy) < 6) return;
    if (!drag.preview) startDrag();
    drag.preview.style.transform = `translate(${drag.origin.left + dx}px, ${drag.origin.top + dy}px)`;
    updateTarget();
  }

  function stopDrag(commit) {
    if (!drag) return;
    const { id, source, grip, preview, target } = drag;
    const position = target?.dataset.favoriteDrop;
    clearTarget();
    drag = null;
    view.cancelAnimationFrame(frame);
    frame = 0;
    delete source.dataset.favoriteDragging;
    preview?.remove();
    if (grip.hasPointerCapture(id)) grip.releasePointerCapture(id);
    if (commit && preview && target) move(source, target, position, grip);
  }

  function onPointerUp(event) {
    if (drag?.id !== event.pointerId) return;
    onPointerMove(event);
    stopDrag(true);
  }

  function onPointerCancel(event) {
    if (drag?.id === event.pointerId) stopDrag(false);
  }

  function onKeydown(event) {
    if (event.key === 'Escape' && drag) {
      event.preventDefault();
      event.stopPropagation();
      stopDrag(false);
      return;
    }
    const grip = event.target.closest(gripSelector);
    if (!grip || event.altKey || event.ctrlKey || event.metaKey) return;
    const directions = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    const source = grip.closest(cardSelector);
    const ordered = cards();
    const target = ordered[ordered.indexOf(source) + direction];
    if (target) move(source, target, direction === -1 ? 'before' : 'after', grip, true);
  }

  const handlers = {
    pointerdown: onPointerDown, pointermove: onPointerMove, pointerup: onPointerUp,
    pointercancel: onPointerCancel, lostpointercapture: onPointerCancel, keydown: onKeydown
  };
  for (const [event, handler] of Object.entries(handlers)) grid.addEventListener(event, handler);
  return () => {
    stopDrag(false);
    for (const [event, handler] of Object.entries(handlers)) grid.removeEventListener(event, handler);
  };
}
