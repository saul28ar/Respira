import { safe } from '../utils.js';

// Ventanas de las cuatro ilustraciones elegidas; los PNG originales no se editan.
const scenes = {
  lago: { file:'escenas-01.png', viewBox:'0 0 887 443' },
  meditacion: { file:'escenas-05.png', viewBox:'890 0 884 441' },
  tecnicas: { file:'escenas-02.png', viewBox:'0 444 887 443' },
  consejos: { file:'escenas-03.png', viewBox:'887 444 887 443' }
};

export function renderHomeCardArt(category, className = '') {
  const scene = Object.hasOwn(scenes, category) ? scenes[category] : null;
  if (!scene) return '';
  return `<svg class="${safe(className)}" data-card-scene="${category}" viewBox="${scene.viewBox}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><image href="./imagenes/tarjetas/${scene.file}" x="0" y="0" width="1774" height="887"/></svg>`;
}
