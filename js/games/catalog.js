import { wordSearchBank } from './word-search-bank.js';
import { crosswordBank } from './crossword-bank.js';
import { phraseRounds } from './phrase-bank.js';

export const games = {
  sopa: { name: 'Sopa de letras', description: 'Encuentra 9 palabras en todas las direcciones.', icon: 'methods', levels: wordSearchBank },
  crucigrama: { name: 'Crucigrama', description: 'Resuelve las pistas y cruza tus respuestas.', icon: 'journal', levels: crosswordBank },
  frase: { name: 'Completa la frase', description: 'Elige cómo llenar dos espacios en cada situación.', icon: 'leaf', levels: phraseRounds }
};
