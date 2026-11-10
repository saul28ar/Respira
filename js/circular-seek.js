// A transparent SVG annulus keeps the clock center free for normal interaction.
export function bindCircularSeek(element, {
  duration,
  getValue = () => 0,
  onInput = () => {},
  onCommit = () => {}
} = {}) {
  const target = element?.matches?.('[data-circular-seek]')
    ? element : element?.querySelector?.('[data-circular-seek]');
  if (!target) return { update() {}, dispose() {} };

  const svg = target.ownerSVGElement;
  const view = target.ownerDocument.defaultView;
  const thumb = element.querySelector?.('[data-seek-thumb]') || svg?.querySelector('[data-seek-thumb]');
  const total = Math.max(0, Number(duration) || 0);
  const clamp = value => Math.max(0, Math.min(total, Number(value) || 0));
  const centerX = Number(target.getAttribute('cx')) || 140;
  const centerY = Number(target.getAttribute('cy')) || 140;
  const radius = Number(target.getAttribute('r')) || 130;
  let drag = null;
  let disposed = false;

  target.setAttribute('role', 'slider');
  target.setAttribute('tabindex', '0');
  target.setAttribute('aria-valuemin', '0');
  target.setAttribute('aria-valuemax', String(total));

  function update(seconds, valueText) {
    if (disposed) return;
    const value = clamp(seconds);
    target.setAttribute('aria-valuenow', String(Math.round(value * 1000) / 1000));
    if (valueText !== undefined) target.setAttribute('aria-valuetext', valueText);
    if (thumb) {
      const angle = (total ? value / total : 0) * Math.PI * 2 - Math.PI / 2;
      thumb.setAttribute('cx', String(centerX + radius * Math.cos(angle)));
      thumb.setAttribute('cy', String(centerY + radius * Math.sin(angle)));
    }
  }

  function fractionAt(event) {
    const bounds = svg.getBoundingClientRect();
    const box = svg.viewBox?.baseVal;
    const boxWidth = box?.width || 280;
    const boxHeight = box?.height || 280;
    const scale = Math.min(bounds.width / boxWidth, bounds.height / boxHeight);
    const x = (event.clientX - bounds.left - (bounds.width - boxWidth * scale) / 2) / scale + (box?.x || 0);
    const y = (event.clientY - bounds.top - (bounds.height - boxHeight * scale) / 2) / scale + (box?.y || 0);
    const turn = Math.atan2(x - centerX, centerY - y) / (Math.PI * 2);
    return (turn + 1) % 1;
  }

  function input(value) {
    const next = clamp(value);
    update(next);
    onInput(next);
    return next;
  }

  function move(event) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    event.preventDefault();
    const fraction = fractionAt(event);
    let delta = fraction - drag.fraction;
    // Follow the shortest arc at twelve o'clock without jumping end to start.
    if (delta > 0.5) delta -= 1;
    if (delta < -0.5) delta += 1;
    drag.fraction = fraction;
    drag.value = input(drag.value + delta * total);
  }

  function finish(event, cancelled = false) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (!cancelled) move(event);
    const active = drag;
    drag = null;
    element.classList?.remove('is-seeking');
    try { target.releasePointerCapture?.(active.pointerId); } catch { /* The browser may already have released capture. */ }
    const value = cancelled ? input(active.initialValue) : active.value;
    onCommit(value);
  }

  function down(event) {
    if (disposed || drag || !total || event.isPrimary === false || (event.button !== undefined && event.button !== 0)) return;
    event.preventDefault();
    event.stopPropagation();
    const fraction = fractionAt(event);
    drag = { pointerId: event.pointerId, initialValue: clamp(getValue()), fraction, value: fraction * total };
    element.classList?.add('is-seeking');
    target.focus?.({ preventScroll: true });
    try { target.setPointerCapture?.(event.pointerId); } catch { /* Window listeners also cover pointers without capture. */ }
    drag.value = input(drag.value);
  }

  function key(event) {
    if (disposed || drag || event.altKey || event.ctrlKey || event.metaKey) return;
    const current = clamp(getValue());
    const values = {
      ArrowLeft: current - 5, ArrowDown: current - 5,
      ArrowRight: current + 5, ArrowUp: current + 5,
      PageDown: current - 15, PageUp: current + 15,
      Home: 0, End: total
    };
    if (!Object.hasOwn(values, event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    const value = input(values[event.key]);
    onCommit(value);
  }

  const up = event => finish(event);
  const cancel = event => finish(event, true);
  target.addEventListener('pointerdown', down);
  target.addEventListener('keydown', key);
  target.addEventListener('lostpointercapture', cancel);
  view.addEventListener('pointermove', move, { passive: false });
  view.addEventListener('pointerup', up);
  view.addEventListener('pointercancel', cancel);
  update(getValue());

  return {
    update,
    dispose() {
      if (disposed) return;
      disposed = true;
      const active = drag;
      drag = null;
      element.classList?.remove('is-seeking');
      if (active) {
        try { target.releasePointerCapture?.(active.pointerId); } catch { /* Already released. */ }
      }
      target.removeEventListener('pointerdown', down);
      target.removeEventListener('keydown', key);
      target.removeEventListener('lostpointercapture', cancel);
      view.removeEventListener('pointermove', move);
      view.removeEventListener('pointerup', up);
      view.removeEventListener('pointercancel', cancel);
    }
  };
}
