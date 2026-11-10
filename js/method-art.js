const fallbackArtwork = './imagenes/inicio-web/consejos-hd.png';

// Métodos y Favoritos comparten las mismas ilustraciones aprobadas.
const artwork = Object.freeze({
  breath: './imagenes/metodos/breath.webp',
  calm: './imagenes/metodos/calm.webp',
  anxiety: './imagenes/metodos/anxiety.webp',
  sleep: './imagenes/metodos/sleep.webp',
  selflove: './imagenes/metodos/selflove.webp',
  grounding: './imagenes/metodos/grounding.webp',
  muscle: './imagenes/metodos/muscle.webp',
  reframe: './imagenes/metodos/reframe.webp',
  journal: './imagenes/metodos/journal.webp',
  caffeine: './imagenes/metodos/caffeine.webp',
  move: './imagenes/metodos/move.webp',
  unplug: './imagenes/metodos/unplug.webp',
  talk: './imagenes/metodos/talk.webp',
  food: fallbackArtwork,
  grief: fallbackArtwork
});

export function methodArtwork(id) {
  return Object.hasOwn(artwork, id) ? artwork[id] : fallbackArtwork;
}
