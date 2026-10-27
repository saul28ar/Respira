// Ventanas decorativas de los PNG originales, sin textos ni controles dibujados.
const source = './imagenes/inicio/arte-inicio-original.png';
const windows = {respiracion:[45,756,408,126],meditacion:[488,756,410,126],tecnicas:[45,1037,408,103],consejos:[488,1037,410,103],diario:[598,1292,248,118]};
export function homeArtwork(name, className = '') {
  const window = windows[name];
  if (!window) return '';
  return `<svg class="home-art-window ${className}" viewBox="${window.join(' ')}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><image href="${source}" width="941" height="1671"/></svg>`;
}
export function renderHomeBackdrop() {
  return `<div class="home-backdrop" aria-hidden="true"><img class="home-backdrop-lake" src="./imagenes/paisajes/lago.png" width="941" height="1672" alt="" fetchpriority="high"><svg class="home-backdrop-waves" viewBox="0 800 941 872" preserveAspectRatio="xMidYMid meet" focusable="false"><image href="./imagenes/paisajes/ondas-original.png" width="941" height="1672"/></svg></div>`;
}
