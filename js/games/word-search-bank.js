const boardSize = 12;
const wordsPerBoard = 9;

const themes = [
  {
    titles: ['Aquí y ahora', 'Lo que noto', 'Una pausa atenta', 'Volver al presente', 'Un momento de quietud'],
    words: 'atención contacto presente silencio escucha anclaje sentidos postura entorno enfoque curiosidad momento conciencia textura sonido observación pausa calma'
  },
  {
    titles: ['Pedir apoyo', 'Buena compañía', 'Red de confianza', 'Hablar con alguien', 'Cuidar los vínculos'],
    words: 'apoyo compañía confianza amistad escucha vínculo respeto comunidad cercanía diálogo empatía paciencia presencia cuidado gratitud amabilidad abrazo ayuda'
  },
  {
    titles: ['Cuidar mi espacio', 'Tiempo para mí', 'Un límite claro', 'Hablar con respeto', 'Lo que puedo ofrecer'],
    words: 'límites respeto acuerdo elección claridad espacio descanso permiso decisión firmeza prioridad diálogo cuidado horario equilibrio pausa petición autonomía'
  },
  {
    titles: ['Cerrar el día', 'Preparar el descanso', 'Bajar el ritmo', 'Una noche tranquila', 'Despertar con calma'],
    words: 'descanso sueño rutina horario silencio lectura oscuridad almohada dormitorio reposo despertar noche mañana serenidad comodidad penumbra luz pausa'
  },
  {
    titles: ['Emociones de hoy', 'Ponerle un nombre', 'Lo que siento', 'Emociones mezcladas', 'Escuchar lo que pasa'],
    words: 'alegría tristeza sorpresa enojo miedo alivio gratitud vergüenza orgullo ternura asombro nostalgia calma frustración curiosidad entusiasmo inquietud culpa'
  },
  {
    titles: ['Moverme a mi ritmo', 'Un paseo corto', 'Pausas en movimiento', 'Un rato al aire libre', 'Actividad que disfruto'],
    words: 'caminar bailar postura movilidad equilibrio descanso ritmo paseo actividad juego pasos flexión brazos piernas fuerza sendero estirar movimiento'
  },
  {
    titles: ['Cuidado cotidiano', 'Hábitos a mi medida', 'Recuperar energía', 'Lo pequeño cuenta', 'Tiempo para cuidarme'],
    words: 'autocuidado hábitos descanso rutina movimiento compañía paseo escucha respiro salud higiene alimento energía horario pausa balance bienestar actividad'
  },
  {
    titles: ['Respirar con calma', 'Un ritmo suave', 'Aire y postura', 'Soltar el aire', 'Atención a la respiración'],
    words: 'respiración inhalar exhalar aire pausa ritmo suavidad hombros postura abdomen pecho comodidad calma nariz diafragma serenidad quietud atención'
  },
  {
    titles: ['Escribir lo que siento', 'Una página propia', 'Ponerlo en palabras', 'Escribir a mi ritmo', 'Dejar un recuerdo'],
    words: 'diario cuaderno página título escritura palabras fecha registro lista emoción recuerdo reflexión gratitud memoria relato experiencia historia expresión'
  },
  {
    titles: ['Amabilidad conmigo', 'Hacer espacio al error', 'Tratarme con cuidado', 'Aprender sin exigirme', 'Darme otra oportunidad'],
    words: 'amabilidad compasión paciencia perdón respeto ternura cuidado comprensión descanso pausa esfuerzo aprendizaje confianza dignidad tolerancia permiso límites ánimo'
  },
  {
    titles: ['Una pausa digital', 'Elegir cuándo mirar', 'Menos interrupciones', 'Un rato sin pantalla', 'Atención sin avisos'],
    words: 'pausa pantalla teléfono conexión avisos silencio mensajes enfoque atención recreo descanso paseo horario sonido brillo límite lectura afición'
  },
  {
    titles: ['Un paso a la vez', 'Ordenar mis pendientes', 'Empezar por algo', 'Prepararme con calma', 'Elegir la próxima tarea'],
    words: 'prioridad objetivo agenda plazo lista horario proyecto tiempo enfoque paso orden margen avance decisión rutina plan progreso tarea'
  },
  {
    titles: ['Cuidarme al estudiar', 'Antes del examen', 'Volver a concentrarme', 'Entre dos tareas', 'Aprender a mi ritmo'],
    words: 'estudio repaso pausa constancia práctica memoria lectura horario claridad paciencia pregunta apoyo apuntes descanso examen hábito enfoque confianza'
  },
  {
    titles: ['Cambiar de perspectiva', 'Ideas y hechos', 'Buscar otra explicación', 'Dejar espacio a la duda', 'Lo que sí puedo hacer'],
    words: 'evidencia hecho supuesto enfoque alternativa perspectiva pregunta matiz contexto opción cambio respuesta duda curiosidad flexibilidad inferencia certeza equilibrio'
  },
  {
    titles: ['Lo que me gusta', 'Elegir algo valioso', 'Disfrutar mi tiempo', 'Volver a mis aficiones', 'Conectar con lo que importa'],
    words: 'valores afición disfrute música lectura dibujo jardín paseo canto baile creatividad juego comunidad curiosidad interés alegría actividad recreo'
  }
];

const extraThemes = [
  ['Texturas y sonidos', 'arena madera algodón piedra agua lluvia viento sonido textura sombra contacto color tacto aroma silencio papel tierra aire'],
  ['Volver al cuerpo', 'postura espalda hombros manos pies piernas apoyo suelo asiento peso contacto respiro pausa equilibrio comodidad cuello brazos reposo'],
  ['Un ritmo de respiración', 'aire pecho nariz abdomen ritmo pausa inhalar exhalar respirar suavidad calma respiro atención postura soltura silencio presencia serenidad'],
  ['Relajar los hombros', 'hombros cuello espalda brazos manos tensión descanso estirar postura comodidad suavidad pausa reposo gesto soltar respirar notar aflojar'],
  ['Preparar una pausa', 'descanso permiso silencio agua asiento música sombra paseo lectura espacio ritmo margen tiempo respiro quietud calma pausa cuidado'],
  ['Escuchar con atención', 'escucha palabras gesto pregunta tono silencio diálogo atención espera respeto presencia cercanía turno mirada confianza vínculo acuerdo apoyo'],
  ['Conversar con calma', 'voz mensaje acuerdo tono diálogo escucha respeto pausa claridad palabra gesto disculpa cercanía intención empatía expresión sinceridad apoyo'],
  ['Límites cotidianos', 'límite tiempo espacio permiso respeto horario claridad acuerdo elección petición energía cuidado decisión necesidad autonomía pausa margen prioridad'],
  ['Pedir una mano', 'apoyo ayuda persona red confianza recursos pregunta ejemplo compañía aliento escucha amigo grupo familia diálogo respeto iniciativa turno'],
  ['Hablarme con cuidado', 'paciencia permiso ternura cuidado respeto pausa gratitud amabilidad aliento dignidad serenidad perdón calma margen consuelo esperanza aprecio descanso'],
  ['Probar otra idea', 'opción enfoque matiz evidencia motivo duda hecho contexto respuesta pregunta cambio hipótesis perspectiva detalle argumento criterio posibilidad certeza'],
  ['Cuidar lo importante', 'valor elección propósito prioridad sentido tiempo interés espacio necesidad actividad compromiso hábito balance energía rumbo pausa decisión'],
  ['Tareas en orden', 'agenda lista papel margen tarea plazo fecha objetivo horario orden tiempo paso enfoque avance descanso bloque pausa progreso'],
  ['Un hábito pequeño', 'señal hábito acción paso rutina intento ensayo elección ajuste semana horario constancia registro avance observación apoyo paciencia práctica'],
  ['Terminar una jornada', 'cierre escritorio pendientes agenda fecha reposo lectura música horario luz silencio descanso calma sueño noche mañana pausa serenidad'],
  ['Antes de dormir', 'almohada cama luz lectura silencio rutina descanso reposo manta penumbra noche comodidad dormitorio horario sueño oscuridad serenidad pausa'],
  ['Tiempo sin pantalla', 'móvil silencio aviso mensaje sonido brillo lectura paseo juego dibujo descanso recreo contacto conexión intervalo enfoque atención límite'],
  ['Notificaciones a mi ritmo', 'aviso contacto permiso alerta teléfono sonido mensaje pantalla agenda pausa enfoque horario silencio turno límite elección tiempo llamada'],
  ['Un paseo atento', 'sendero bosque hojas rama jardín cielo sombra nube viento arena pasos tierra verde piedra césped agua movimiento horizonte'],
  ['Disfrutar de algo creativo', 'dibujo canto papel lápiz música acuarela boceto pincel ritmo color historia relato textura imagen idea juego fotografía collage'],
  ['Historias para recordar', 'diario página cuaderno lápiz fecha título relato recuerdo memoria palabra dibujo carta experiencia detalle reflexión registro emoción gratitud'],
  ['Reconocer una emoción', 'sorpresa tristeza alegría miedo enojo asombro nostalgia alivio ternura orgullo vergüenza calma inquietud culpa entusiasmo nombre emoción gesto'],
  ['Cuando cambia el plan', 'cambio opción ajuste horario margen claridad acuerdo contexto calma alternativa pregunta tarea prioridad tiempo certeza motivo pausa adaptación'],
  ['Aprender con paciencia', 'apuntes estudio repaso lectura práctica duda pregunta ejemplo memoria tarea atención pausa horario ensayo error intento progreso recurso'],
  ['Reparar una conversación', 'disculpa escucha respeto voz pausa mensaje acuerdo diálogo gesto calma pregunta cuidado paciencia sinceridad confianza matiz claridad'],
  ['Hacer espacio a lo nuevo', 'ensayo juego novedad intento práctica curiosidad iniciativa sorpresa comienzo interés aprendizaje proyecto paciencia confianza exploración ánimo'],
  ['Un rato en compañía', 'amistad vínculo compañía apoyo confianza paseo abrazo cercanía charla alegría humor gratitud cariño respeto presencia reunión encuentro'],
  ['Moverme con comodidad', 'movilidad estirar paseo caminar bailar sendero pasos postura piernas brazos manos fuerza flexión ritmo equilibrio movimiento descanso actividad'],
  ['Notar lo que agradezco', 'gratitud aprecio gesto apoyo compañía paisaje detalle recuerdo alegría palabra regalo cuidado presencia vínculo cercanía nota alivio ternura']
];

const extraSettings = ['Al despertar', 'En casa', 'En una pausa', 'Al aire libre', 'A media tarde',
  'Antes de empezar', 'Entre tareas', 'Al bajar el ritmo', 'Al cerrar el día', 'En un rato libre'];

const directions = [
  [0, 1], [0, -1], [1, 0], [-1, 0],
  [1, 1], [1, -1], [-1, 1], [-1, -1]
];
// Every puzzle starts with a diagonal, a reversed word, and a vertical word.
const requiredDirections = [
  [[1, 1], [1, -1], [-1, 1], [-1, -1]],
  [[0, -1]],
  [[1, 0], [-1, 0]]
];
const vowels = {Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', Ü: 'U'};
const fillerLetters = 'AAAAAABCDEEEEEFGHIIIIJLLMMNNOOOOOPQRRSSSTTTUUUVXYZÑ';

export function normalizeWordSearchWord(value) {
  return value.trim().toUpperCase().normalize('NFC').replace(/[ÁÉÍÓÚÜ]/g, letter => vowels[letter]);
}

function createRandom(seed) {
  let state = seed >>> 0;
  return limit => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return Math.floor(state * limit / 4294967296);
  };
}

function shuffle(items, random) {
  for (let index = items.length - 1; index > 0; index--) {
    const choice = random(index + 1);
    [items[index], items[choice]] = [items[choice], items[index]];
  }
  return items;
}

function placeWord(board, word, eligibleDirections, random) {
  for (const [rowStep, columnStep] of shuffle([...eligibleDirections], random)) {
    const rowSpan = rowStep * (word.length - 1);
    const columnSpan = columnStep * (word.length - 1);
    const rows = boardSize - Math.abs(rowSpan);
    const columns = boardSize - Math.abs(columnSpan);
    if (rows <= 0 || columns <= 0) continue;
    const candidates = rows * columns;
    const offset = random(candidates);
    const step = rowStep * boardSize + columnStep;

    for (let position = 0; position < candidates; position++) {
      const candidate = (position + offset) % candidates;
      const row = Math.max(0, -rowSpan) + Math.floor(candidate / columns);
      const column = Math.max(0, -columnSpan) + candidate % columns;
      const start = row * boardSize + column;
      const cells = Array.from(word, (_, index) => start + index * step);
      if (!cells.every((cell, index) => !board[cell] || board[cell] === word[index])) continue;
      cells.forEach((cell, index) => { board[cell] = word[index]; });
      return true;
    }
  }
  return false;
}

function createPuzzle(theme, round, seed) {
  const random = createRandom(seed);
  const words = shuffle(theme.words.toUpperCase().split(' '), random).slice(0, wordsPerBoard);
  const longestFirst = words.map(normalizeWordSearchWord).sort((a, b) => b.length - a.length);

  for (let attempt = 0; attempt < 16; attempt++) {
    const board = Array(boardSize ** 2).fill('');
    const complete = longestFirst.every((word, index) =>
      placeWord(board, word, requiredDirections[index] ?? directions, random)
    );

    if (complete) {
      return {
        size: boardSize,
        board: board.map(letter => letter || fillerLetters[random(fillerLetters.length)]).join(''),
        words: words.sort((a, b) => a.localeCompare(b, 'es')),
        title: theme.titles[round]
      };
    }
  }

  throw new Error('No se pudo generar la sopa de letras «' + theme.titles[round] + '».');
}

export const wordSearchBank = Array.from({length: 5}, (_, round) =>
  themes.map((theme, index) => createPuzzle(theme, round, 1841 + 569 * (round * themes.length + index)))
).flat().concat(extraSettings.flatMap((setting, round) => extraThemes.map(([title, words], index) =>
  createPuzzle({
    titles: [`${title} · ${setting}`],
    words
  }, 0, 100003 + 569 * (round * extraThemes.length + index))
)));
