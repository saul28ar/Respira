import { pets } from './data.js';

// Se lee el canal alfa del PNG original; el dibujo no se modifica.
const masks = new Map();
function readMask(image, id) {
  if (!masks.has(id)) {
    const pending = (async () => {
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently:true });
      if (!context) throw new Error('Contorno no disponible');
      context.drawImage(image, 0, 0);
      return { width:canvas.width, height:canvas.height, data:context.getImageData(0, 0, canvas.width, canvas.height).data };
    })();
    masks.set(id, pending);
    pending.catch(() => masks.delete(id));
  }
  return masks.get(id);
}

function painted(mask, image, event) {
  const rect = image.getBoundingClientRect();
  if (!rect.width || !rect.height) return false;
  const x = Math.floor((event.clientX - rect.left) / rect.width * mask.width);
  const y = Math.floor((event.clientY - rect.top) / rect.height * mask.height);
  return x >= 0 && y >= 0 && x < mask.width && y < mask.height && mask.data[(y * mask.width + x) * 4 + 3] >= 40;
}

// Solo busca el personaje de los Home aprobados. Devuelve la limpieza para cada render.
export function bindHomePetInteractions(root) {
  const cleanups = [];
  for (const button of root.querySelectorAll('.home-mobile-jardin [data-interactive-pet], .home-desktop-jardin [data-interactive-pet]')) {
    const id = button.dataset.interactivePet;
    if (!Object.hasOwn(pets, id) || button.dataset.bound) continue;
    const image = button.querySelector('img');
    const response = button.closest('[data-selected-companion]')?.querySelector('[data-companion-response]');
    if (!image || !response) continue;
    button.dataset.bound = 'true';
    button.dataset.tapCount = '0';
    let mask = null;
    let timeout = null;
    let disposed = false;
    const events = new AbortController();
    const ready = readMask(image, id).then(value => {
      if (!disposed) { mask = value; button.dataset.contourReady = 'true'; }
      return value;
    }).catch(() => {
      if (!disposed) button.dataset.contourReady = 'false';
      return null;
    });
    button.addEventListener('pointermove', event => {
      if (mask) button.style.cursor = painted(mask, image, event) ? 'pointer' : 'default';
    }, { signal:events.signal });
    button.addEventListener('click', async event => {
      event.preventDefault();
      event.stopPropagation();
      const contour = await ready;
      if (!contour || disposed || !button.isConnected) return;
      const keyboard = event.detail === 0;
      if (!keyboard && !painted(contour, image, event)) return;
      const count = Number(button.dataset.tapCount) + 1;
      button.dataset.tapCount = String(count);
      button.classList.remove('is-petted');
      void button.offsetWidth;
      button.classList.add('is-petted');
      response.textContent = pets[id].messages[(count - 1) % pets[id].messages.length];
      response.hidden = false;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        response.hidden = true;
        button.classList.remove('is-petted');
      }, 3500);
      root.dispatchEvent(new CustomEvent('companion-tap', { detail:{ id, count, keyboard } }));
    }, { signal:events.signal });
    cleanups.push(() => {
      disposed = true;
      events.abort();
      clearTimeout(timeout);
      delete button.dataset.bound;
      button.classList.remove('is-petted');
      response.hidden = true;
    });
  }
  return () => cleanups.forEach(cleanup => cleanup());
}
