/** Bind the mobile advice-card stack and restore the original DOM on cleanup. */
export function bindInfographicStack(root, { onChange = () => {}, initialIndex = 0 } = {}) {
  const track = root.querySelector('[data-info-track]');
  const slides = track ? [...track.querySelectorAll('[data-info-slide]')] : [];
  if (!track || !slides.length) return () => {};

  const view = track.ownerDocument.defaultView;
  const document = track.ownerDocument;
  const total = slides.length;
  const dots = [...root.querySelectorAll('[data-info-dot]')];
  const previous = [...root.querySelectorAll('[data-info-prev]')];
  const next = [...root.querySelectorAll('[data-info-next]')];
  const positions = [...root.querySelectorAll('[data-info-position]')];
  const titles = [...root.querySelectorAll('[data-info-current-title]')];
  const live = [...root.querySelectorAll('[data-info-live]')];
  const reducedMotion = view.matchMedia('(prefers-reduced-motion: reduce)');
  const interactive = 'button, a, input, select, textarea, label, summary, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="link"], audio[controls], video[controls]';
  const slideClasses = ['is-stack-active', 'is-stack-next', 'is-stack-after', 'is-stack-dragging', 'is-stack-leaving'];
  const rootClasses = ['is-info-stack', 'is-stack-dragging', 'is-stack-leaving'];
  const listeners = [];
  const restores = [];
  let index = Math.max(0, Math.min(total - 1, Number.isFinite(Number(initialIndex)) ? Math.trunc(Number(initialIndex)) : 0));
  let pointer = null;
  let pendingIndex = null;
  let leavingSlide = null;
  let leaveTimer = 0;
  let dragFrame = 0;
  let measureFrame = 0;
  let suppressClickUntil = 0;
  let destroyed = false;

  const clamp = value => Math.max(0, Math.min(total - 1, value));
  const titleOf = slide => slide.dataset.infoTitle
    || slide.querySelector('[data-info-title], h1, h2, h3')?.textContent.trim()
    || '';
  const listen = (target, type, handler, options) => {
    target.addEventListener(type, handler, options);
    listeners.push(() => target.removeEventListener(type, handler, options));
  };
  const preserveAttribute = (element, name) => {
    const original = element.getAttribute(name);
    restores.push(() => original === null ? element.removeAttribute(name) : element.setAttribute(name, original));
  };
  const preserveProperty = (element, name) => {
    const value = element.style.getPropertyValue(name);
    const priority = element.style.getPropertyPriority(name);
    restores.push(() => value ? element.style.setProperty(name, value, priority) : element.style.removeProperty(name));
  };
  const preserveClasses = (element, names) => {
    const values = names.map(name => element.classList.contains(name));
    restores.push(() => names.forEach((name, i) => element.classList.toggle(name, values[i])));
  };

  preserveClasses(root, rootClasses);
  preserveProperty(root, '--stack-height');
  preserveProperty(track, 'touch-action');
  slides.forEach(slide => {
    preserveClasses(slide, slideClasses);
    ['aria-hidden', 'inert', 'hidden'].forEach(name => preserveAttribute(slide, name));
    ['--stack-x', '--stack-angle'].forEach(name => preserveProperty(slide, name));
  });
  dots.forEach(dot => preserveAttribute(dot, 'aria-current'));
  [...previous, ...next].forEach(button => {
    preserveAttribute(button, 'disabled');
    preserveAttribute(button, 'aria-disabled');
  });
  [...positions, ...titles, ...live].forEach(label => {
    const original = label.textContent;
    restores.push(() => { label.textContent = original; });
  });

  function setTransform(slide, x = 0, angle = 0) {
    slide.style.setProperty('--stack-x', `${x}px`);
    slide.style.setProperty('--stack-angle', `${angle}deg`);
  }

  function clearMotion() {
    if (leaveTimer) view.clearTimeout(leaveTimer);
    leaveTimer = 0;
    pendingIndex = null;
    leavingSlide = null;
    root.classList.remove('is-stack-leaving');
    slides.forEach(slide => {
      slide.classList.remove('is-stack-leaving');
      setTransform(slide);
    });
  }

  function releasePointer() {
    if (dragFrame) view.cancelAnimationFrame(dragFrame);
    dragFrame = 0;
    const captured = pointer;
    pointer = null;
    if (captured && track.hasPointerCapture?.(captured.id)) track.releasePointerCapture(captured.id);
    root.classList.remove('is-stack-dragging');
    captured?.slide.classList.remove('is-stack-dragging');
    return captured;
  }

  function render() {
    const slide = slides[index];
    const title = titleOf(slide);
    const focusedSlide = slides.find(candidate => candidate !== slide && candidate.contains(document.activeElement));
    if (focusedSlide) track.focus({ preventScroll: true });
    slides.forEach((candidate, candidateIndex) => {
      const distance = candidateIndex - index;
      candidate.classList.toggle('is-stack-active', distance === 0);
      candidate.classList.toggle('is-stack-next', distance === 1);
      candidate.classList.toggle('is-stack-after', distance === 2);
      candidate.hidden = distance < 0 || distance > 2;
      candidate.inert = distance !== 0;
      candidate.setAttribute('aria-hidden', String(distance !== 0));
      setTransform(candidate);
    });
    dots.forEach(dot => {
      if (Number(dot.dataset.infoDot) === index) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    previous.forEach(button => {
      button.disabled = index === 0;
      button.setAttribute('aria-disabled', String(index === 0));
    });
    next.forEach(button => {
      button.disabled = index === total - 1;
      button.setAttribute('aria-disabled', String(index === total - 1));
    });
    positions.forEach(label => { label.textContent = `${index + 1} de ${total}`; });
    titles.forEach(label => { label.textContent = title; });
    live.forEach(label => { label.textContent = `${index + 1} de ${total}${title ? `: ${title}` : ''}`; });
    onChange(index, { id: slide.dataset.infoId || '', title, slide, total });
  }

  function measure() {
    measureFrame = 0;
    if (destroyed || pointer?.axis === 'horizontal' || leavingSlide) return;
    let height = 0;
    // Measure every card at its current stacked width, including hidden cards.
    // Temporary inline overrides are restored before the next painted frame.
    slides.forEach(slide => {
      const wasHidden = slide.hidden;
      const properties = ['display', 'visibility'];
      const original = properties.map(name => [slide.style.getPropertyValue(name), slide.style.getPropertyPriority(name)]);
      slide.hidden = false;
      slide.style.setProperty('display', 'flex', 'important');
      slide.style.setProperty('visibility', 'hidden');
      // Layout dimensions exclude rotation and preserve any spring-back motion.
      height = Math.max(height, slide.scrollHeight, slide.offsetHeight);
      properties.forEach((name, i) => {
        const [value, priority] = original[i];
        if (value) slide.style.setProperty(name, value, priority);
        else slide.style.removeProperty(name);
      });
      slide.hidden = wasHidden;
    });
    if (height) root.style.setProperty('--stack-height', `${Math.ceil(height)}px`);
  }

  function scheduleMeasure() {
    if (!destroyed && !measureFrame) measureFrame = view.requestAnimationFrame(measure);
  }

  function goTo(requestedIndex) {
    if (destroyed || !Number.isFinite(requestedIndex)) return;
    const destination = clamp(Math.trunc(requestedIndex));
    releasePointer();
    clearMotion();
    if (destination !== index) {
      index = destination;
      render();
    }
    scheduleMeasure();
  }

  function step(amount) {
    goTo((pendingIndex ?? index) + amount);
  }

  function paintDrag() {
    dragFrame = 0;
    if (!pointer || pointer.axis !== 'horizontal') return;
    const outside = pointer.dx > 0 ? index === 0 : index === total - 1;
    const x = pointer.dx * (outside ? 0.28 : 1);
    const angle = Math.max(-12, Math.min(12, x / pointer.width * 12));
    setTransform(pointer.slide, x, angle);
  }

  function handlePointerDown(event) {
    if (destroyed || pointer || leavingSlide || event.isPrimary === false || (event.pointerType === 'mouse' && event.button !== 0)) return;
    // A new deliberate press is independent of the previous drag's click.
    suppressClickUntil = 0;
    const slide = slides[index];
    if (!slide.contains(event.target) || event.target.closest?.(interactive)) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, axis: 'pending', width: Math.max(1, slide.getBoundingClientRect().width), slide };
  }

  function handlePointerMove(event) {
    if (!pointer || event.pointerId !== pointer.id) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (pointer.axis === 'pending') {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
      if (Math.abs(dy) >= Math.abs(dx)) {
        releasePointer();
        return;
      }
      if (Math.abs(dx) < Math.abs(dy) * 1.15) return;
      pointer.axis = 'horizontal';
      root.classList.add('is-stack-dragging');
      pointer.slide.classList.add('is-stack-dragging');
      track.setPointerCapture?.(event.pointerId);
    }
    if (event.cancelable) event.preventDefault();
    pointer.dx = dx;
    if (!dragFrame) dragFrame = view.requestAnimationFrame(paintDrag);
  }

  function handlePointerEnd(event) {
    if (!pointer || event.pointerId !== pointer.id) return;
    if (pointer.axis === 'horizontal' && event.type === 'pointerup') pointer.dx = event.clientX - pointer.x;
    const gesture = releasePointer();
    if (gesture.axis !== 'horizontal') return;
    suppressClickUntil = view.performance.now() + 350;
    const destination = clamp(index + (gesture.dx < 0 ? 1 : -1));
    const threshold = Math.max(60, Math.min(100, gesture.width * 0.2));
    if (event.type !== 'pointerup' || Math.abs(gesture.dx) < threshold || destination === index) {
      setTransform(gesture.slide);
      scheduleMeasure();
      return;
    }
    if (reducedMotion.matches) {
      goTo(destination);
      return;
    }
    pendingIndex = destination;
    leavingSlide = gesture.slide;
    root.classList.add('is-stack-leaving');
    leavingSlide.classList.add('is-stack-leaving');
    const direction = gesture.dx < 0 ? -1 : 1;
    setTransform(leavingSlide, direction * Math.max(gesture.width + 80, view.innerWidth * 1.1), direction * 12);
    leaveTimer = view.setTimeout(() => goTo(destination), 220);
  }

  previous.forEach(button => listen(button, 'click', () => step(-1)));
  next.forEach(button => listen(button, 'click', () => step(1)));
  dots.forEach(dot => listen(dot, 'click', () => {
    const destination = Number(dot.dataset.infoDot);
    if (Number.isInteger(destination)) goTo(destination);
  }));
  listen(root, 'keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    const control = event.target.closest?.('[data-info-prev], [data-info-next], [data-info-dot]');
    if (event.target !== track && (!control || !root.contains(control))) return;
    event.preventDefault();
    step(event.key === 'ArrowLeft' ? -1 : 1);
  });
  listen(track, 'pointerdown', handlePointerDown, { passive: true });
  listen(view, 'pointermove', handlePointerMove, { passive: false });
  listen(view, 'pointerup', handlePointerEnd);
  listen(view, 'pointercancel', handlePointerEnd);
  listen(track, 'lostpointercapture', event => {
    // Touch initially captures to its exact descendant target. Its capture-loss
    // event bubbles here when horizontal lock transfers capture to the track.
    if (event.target === track && pointer?.id === event.pointerId) handlePointerEnd(event);
  });
  listen(track, 'click', event => {
    if (event.detail && view.performance.now() < suppressClickUntil) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  listen(track, 'dragstart', event => {
    if (!event.target.closest?.(interactive)) event.preventDefault();
  });
  listen(root, 'load', scheduleMeasure, true);
  listen(view, 'resize', scheduleMeasure, { passive: true });
  if (document.fonts?.addEventListener) listen(document.fonts, 'loadingdone', scheduleMeasure);

  root.classList.add('is-info-stack');
  track.style.setProperty('touch-action', 'pan-y');
  render();
  measure();
  const observer = view.ResizeObserver ? new view.ResizeObserver(scheduleMeasure) : null;
  observer?.observe(track);
  slides.forEach(slide => observer?.observe(slide));

  return () => {
    if (destroyed) return;
    destroyed = true;
    listeners.forEach(remove => remove());
    observer?.disconnect();
    releasePointer();
    clearMotion();
    if (measureFrame) view.cancelAnimationFrame(measureFrame);
    measureFrame = 0;
    restores.reverse().forEach(restore => restore());
  };
}
