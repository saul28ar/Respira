/** Bind the native, horizontally scrolling advice pages and return a cleanup. */
export function bindInfographicSwipe(root, { onChange = () => {}, initialIndex } = {}) {
  const track = root.querySelector('[data-info-track]');
  const slides = track ? [...track.querySelectorAll('[data-info-slide]')] : [];
  if (!track || !slides.length) return () => {};

  const dots = [...root.querySelectorAll('[data-info-dot]')];
  const previousButtons = [...root.querySelectorAll('[data-info-prev]')];
  const nextButtons = [...root.querySelectorAll('[data-info-next]')];
  const positions = [...root.querySelectorAll('[data-info-position]')];
  const currentTitles = [...root.querySelectorAll('[data-info-current-title]')];
  const liveRegions = [...root.querySelectorAll('[data-info-live]')];
  const view = track.ownerDocument.defaultView;
  const reducedMotion = view.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = [];
  const total = slides.length;
  let offsets = [];
  let index = -1;
  let navigationIndex = null;
  let lastAnnouncedIndex = 0;
  let frame = 0;
  let settleTimer = 0;
  let destroyed = false;

  const clamp = value => Math.max(0, Math.min(total - 1, value));
  const titleOf = slide => slide.dataset.infoTitle
    || slide.querySelector('[data-info-title], h1, h2, h3')?.textContent.trim()
    || '';
  const listen = (target, type, listener, options) => {
    target.addEventListener(type, listener, options);
    listeners.push(() => target.removeEventListener(type, listener, options));
  };

  function measure() {
    const origin = slides[0].getBoundingClientRect().left;
    const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
    offsets = slides.map(slide => Math.max(0, Math.min(
      maximum, slide.getBoundingClientRect().left - origin
    )));
  }

  function nearestIndex() {
    let nearest = 0;
    let distance = Infinity;
    offsets.forEach((offset, candidate) => {
      const candidateDistance = Math.abs(track.scrollLeft - offset);
      if (candidateDistance < distance) {
        distance = candidateDistance;
        nearest = candidate;
      }
    });
    return nearest;
  }

  function render() {
    frame = 0;
    if (destroyed) return;
    const nextIndex = nearestIndex();
    if (nextIndex === index) return;
    index = nextIndex;
    const slide = slides[index];
    const title = titleOf(slide);
    dots.forEach(dot => {
      if (Number(dot.dataset.infoDot) === index) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
    previousButtons.forEach(button => {
      button.disabled = index === 0;
      button.setAttribute('aria-disabled', String(index === 0));
    });
    nextButtons.forEach(button => {
      button.disabled = index === total - 1;
      button.setAttribute('aria-disabled', String(index === total - 1));
    });
    positions.forEach(position => { position.textContent = `${index + 1} de ${total}`; });
    currentTitles.forEach(label => { label.textContent = title; });
    onChange(index, { id: slide.dataset.infoId || '', title, slide, total });
  }

  function scheduleRender() {
    if (!frame) frame = view.requestAnimationFrame(render);
  }

  function settle() {
    if (destroyed) return;
    view.clearTimeout(settleTimer);
    settleTimer = 0;
    if (frame) view.cancelAnimationFrame(frame);
    render();
    navigationIndex = null;
    if (index !== lastAnnouncedIndex) {
      lastAnnouncedIndex = index;
      const title = titleOf(slides[index]);
      const message = `${index + 1} de ${total}${title ? `: ${title}` : ''}`;
      liveRegions.forEach(region => { region.textContent = message; });
    }
  }

  function handleScroll() {
    scheduleRender();
    view.clearTimeout(settleTimer);
    settleTimer = view.setTimeout(settle, 160);
  }

  function goTo(requestedIndex) {
    navigationIndex = clamp(requestedIndex);
    track.scrollTo({
      left: offsets[navigationIndex],
      behavior: reducedMotion.matches ? 'instant' : 'smooth'
    });
    // A request at an endpoint may not produce a scroll event.
    handleScroll();
  }

  function step(amount) {
    goTo((navigationIndex ?? index) + amount);
  }

  function handleKeydown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    const control = target.closest?.('[data-info-prev], [data-info-next], [data-info-dot]');
    if (target !== track && (!control || !root.contains(control))) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') goTo(0);
    else if (event.key === 'End') goTo(total - 1);
    else step(event.key === 'ArrowLeft' ? -1 : 1);
  }

  previousButtons.forEach(button => listen(button, 'click', () => step(-1)));
  nextButtons.forEach(button => listen(button, 'click', () => step(1)));
  dots.forEach(dot => listen(dot, 'click', () => {
    const target = Number(dot.dataset.infoDot);
    if (Number.isInteger(target)) goTo(target);
  }));
  listen(root, 'keydown', handleKeydown);
  listen(track, 'scroll', handleScroll, { passive: true });
  listen(track, 'scrollend', settle);
  listen(track, 'pointerdown', () => { navigationIndex = null; }, { passive: true });
  listen(track, 'wheel', () => { navigationIndex = null; }, { passive: true });

  measure();
  if (Number.isInteger(initialIndex) && initialIndex >= 0 && initialIndex < total) {
    track.scrollTo({ left: offsets[initialIndex], behavior: 'instant' });
  }
  render();
  lastAnnouncedIndex = index;

  const resizeObserver = view.ResizeObserver ? new view.ResizeObserver(() => {
    if (destroyed) return;
    const destination = navigationIndex ?? Math.max(0, index);
    measure();
    // Keep the same advice visible when the viewport or page width changes.
    track.scrollTo({ left: offsets[destination], behavior: 'instant' });
    scheduleRender();
  }) : null;
  resizeObserver?.observe(track);
  slides.forEach(slide => resizeObserver?.observe(slide));

  return () => {
    destroyed = true;
    listeners.forEach(remove => remove());
    resizeObserver?.disconnect();
    view.clearTimeout(settleTimer);
    if (frame) view.cancelAnimationFrame(frame);
  };
}
