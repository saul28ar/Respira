// Pistas originales de autocuidado, relaciones y bienestar cotidiano.
const clues = {
  ABRAZO: "Gesto de rodear a alguien con los brazos, cuando ambos quieren.",
  ABRIGO: "Prenda que ayuda a sentir calor al salir en una mañana fría.",
  ACCION: "Paso concreto que da forma a una intención.",
  ACEPTACION: "Reconocer lo que ocurre, aunque todavía estés aprendiendo a vivir con ello.",
  ACOGIDA: "Recibimiento que hace sentir a alguien bienvenido.",
  ACTITUD: "Manera de situarte ante lo que pasa o lo que te toca hacer.",
  ACUERDO: "Entendimiento que dos personas alcanzan al conversar sobre sus necesidades.",
  ADAPTACION: "Proceso de ajustar tus costumbres cuando cambian las circunstancias.",
  AFECTO: "Cariño que puedes mostrar con palabras, gestos o presencia.",
  AGENDA: "Lugar para anotar citas, tareas y también ratos libres.",
  ALEGRIA: "Emoción que puede aparecer al reencontrarte con algo que disfrutas.",
  ALIENTO: "Ánimo que das a quien empieza algo difícil.",
  ALIVIO: "Sensación que aparece cuando una carga se vuelve más ligera.",
  AMABILIDAD: "Cualidad de quien trata a los demás con consideración.",
  AMISTAD: "Vínculo elegido que puede crecer al compartir tiempo y confianza.",
  ANCLAJE: "Volver a lo que percibes ahora mediante los sentidos.",
  APOYO: "Ayuda que alguien ofrece al escucharte o echarte una mano.",
  APRECIO: "Valor que reconoces en alguien, en un gesto o en un esfuerzo.",
  AROMA: "Olor que podrías notar al acercar una taza de infusión.",
  ARMONIA: "Concordancia entre partes distintas, como tus horarios y tus necesidades.",
  ASERTIVIDAD: "Habilidad de expresar lo que necesitas con claridad y respeto.",
  ATENCION: "La diriges hacia algo cuando decides observarlo con cuidado.",
  AUTOCUIDADO: "Conjunto de acciones que eliges para atender tus propias necesidades.",
  AUTONOMIA: "Capacidad de tomar decisiones propias y participar en lo que te afecta.",
  BALANCE: "Revisión de cómo te fue y de qué quieres ajustar.",
  BIENESTAR: "Estado general de sentirse y funcionar bien en distintos aspectos de la vida.",
  BOCETO: "Dibujo inicial que puedes explorar sin tener decidido el resultado.",
  BOSQUE: "Lugar arbolado donde puedes escuchar el viento entre las ramas.",
  CALENDARIO: "Organiza los días en semanas y meses.",
  CALIDEZ: "Cercanía que transmites con un gesto atento o un tono amable.",
  CALMA: "Sensación de quietud que puede acompañar una pausa.",
  CAMINATA: "Paseo a pie que puedes hacer a tu propio ritmo.",
  CANCION: "Pieza que puedes cantar, tararear o escuchar para disfrutar el momento.",
  CAUTELA: "Cuidado con el que das un paso cuando necesitas valorar primero la situación.",
  CERCANIA: "Sensación de conexión que puedes tener al compartir algo personal.",
  CLARIDAD: "Cualidad de una idea que resulta fácil de entender.",
  COHERENCIA: "Relación entre lo que dices que valoras y lo que eliges hacer.",
  COMPASION: "Manera de responder con cuidado ante el sufrimiento propio o ajeno.",
  CONEXION: "Sensación de cercanía que puede crecer al compartir algo significativo.",
  CONFIANZA: "Seguridad que se construye cuando alguien cumple su palabra y te respeta.",
  CONSENTIR: "Dar permiso para que algo ocurra, por ejemplo antes de un abrazo.",
  CONSTANCIA: "Cualidad de quien vuelve a una práctica de forma sostenida.",
  CONTEXTO: "Circunstancias que ayudan a entender por qué te sentiste de cierta manera.",
  CONVERSACION: "Intercambio de palabras en el que las personas pueden hablar y escuchar.",
  CORAJE: "Valor que puedes mostrar al pedir ayuda aunque te cueste.",
  CORTESIA: "Consideración que se nota en el trato cotidiano con otras personas.",
  CREATIVIDAD: "Capacidad de encontrar formas nuevas de expresarte o resolver algo.",
  CUIDADO: "Atención que prestas a algo que quieres proteger o mantener bien.",
  CURIOSIDAD: "Impulso de hacer preguntas y explorar lo que sientes.",
  DELEGAR: "Encargar a otra persona parte de una tarea compartida.",
  DESCANSO: "Tiempo de recuperación que puede incluir dormir o bajar el ritmo.",
  DESPEJE: "Sensación de tener la mente más libre para pensar después de una pausa.",
  DETALLE: "Parte pequeña de una experiencia, como el color de una hoja.",
  DIALOGO: "Intercambio en el que las personas exponen y escuchan sus puntos de vista.",
  DIARIO: "Cuaderno donde puedes escribir lo que viviste o sentiste cada día.",
  DISFRUTE: "Placer que puedes encontrar al hacer algo que te gusta.",
  DISTANCIA: "Espacio que puedes tomar para pensar antes de responder.",
  DIVERSION: "Lo que encuentras al hacer algo entretenido por el gusto de hacerlo.",
  EMOCION: "Respuesta afectiva como la sorpresa, la tristeza o la alegría.",
  EMPATIA: "Capacidad de intentar comprender cómo vive otra persona una situación.",
  ENFOQUE: "Dirección que das a tu atención cuando eliges una sola tarea.",
  ENLACE: "Unión entre dos elementos, como un hábito nuevo y otro ya conocido.",
  ENTORNO: "Lo que te rodea y puede influir en cómo te sientes.",
  EQUILIBRIO: "Armonía que buscas al repartir tu energía entre obligaciones y tiempo personal.",
  ESCUCHA: "Atención que ofreces cuando dejas a otra persona terminar de hablar.",
  ESCRITURA: "Forma de poner por escrito tus ideas, emociones o recuerdos.",
  ESPACIO: "Lugar físico o rato disponible que puedes reservar para ti.",
  ESPERANZA: "Expectativa de que algo bueno todavía puede ocurrir.",
  ESTIRAR: "Alargar suavemente una parte del cuerpo, como los brazos al levantarte.",
  ESTRATEGIA: "Plan que ordena tus pasos para afrontar una situación.",
  ETIQUETA: "Palabra breve que pones a una emoción para reconocerla.",
  EXPRESION: "Manera de comunicar lo que sientes mediante palabras, gestos o arte.",
  FLEXIBILIDAD: "Capacidad de ajustar el plan cuando tus necesidades cambian.",
  FOCO: "Punto hacia el que diriges tu atención.",
  FORTALEZA: "Cualidad personal que puede ayudarte a afrontar un reto.",
  GESTO: "Movimiento del cuerpo que expresa algo, como asentir con la cabeza.",
  GRATITUD: "Sentimiento que surge al reconocer algo que aprecias o recibiste.",
  HABITO: "Acción que, por repetirla, se vuelve familiar en tu día a día.",
  HERRAMIENTA: "Recurso práctico que puedes usar para afrontar una dificultad.",
  HUMILDAD: "Disposición a reconocer que tienes algo que aprender.",
  HUMOR: "Manera de encontrar el lado gracioso de una situación.",
  IDENTIDAD: "Conjunto de rasgos, historias y valores con los que te reconoces.",
  IMPULSO: "Ganas repentinas de actuar, antes de pensar qué quieres hacer.",
  INICIATIVA: "Disposición a dar el primer paso por cuenta propia.",
  INSPIRACION: "Idea o estímulo que despierta las ganas de crear algo.",
  INTENCION: "Propósito que orienta lo que decides hacer.",
  INTIMIDAD: "Ámbito personal que compartes solo cuando tú lo eliges.",
  INTERES: "Inclinación a dedicar tiempo y atención a un tema.",
  INVITACION: "Propuesta para compartir una actividad, que puedes aceptar o declinar.",
  JARDIN: "Espacio con plantas que puedes observar, cuidar o recorrer.",
  LECTURA: "Actividad de seguir y comprender un texto.",
  LENGUAJE: "Sistema de palabras o signos que usas para comunicarte.",
  LIMITE: "Condición que pones para cuidar tu tiempo, tu espacio o tu energía.",
  MANUALIDAD: "Objeto o actividad creativa que se hace principalmente con las manos.",
  MATIZ: "Diferencia sutil, como la que separa estar inquieto de estar asustado.",
  MEMORIA: "Capacidad de conservar y traer de vuelta lo vivido.",
  MINUTO: "Sesenta segundos, suficientes para hacer una pausa breve.",
  MODERACION: "Cualidad de ajustar la cantidad o el esfuerzo a lo que te resulta razonable.",
  MOVIMIENTO: "Cambio de posición del cuerpo, incluso al girar los hombros en una silla.",
  MUSICA: "Arte de combinar sonidos y silencios que puedes escuchar o hacer.",
  NECESIDAD: "Algo que te hace falta, como comer, descansar o sentir seguridad.",
  NOVEDAD: "Algo nuevo que puedes probar con curiosidad.",
  OBSERVAR: "Mirar o atender a algo con detenimiento.",
  OPTIMISMO: "Inclinación a considerar posibilidades favorables ante lo incierto.",
  ORDEN: "Disposición que te ayuda a encontrar tus cosas o ubicar tus tareas.",
  ORGANIZAR: "Dar un lugar o un momento a cada cosa según lo que importa.",
  PACIENCIA: "Te ayuda a sostener la espera y aceptar que las cosas llevan tiempo.",
  PANTALLA: "Superficie luminosa de la que puedes apartar la vista un rato.",
  PASEO: "Recorrido tranquilo que haces por el gusto de salir un rato.",
  PAUSA: "Interrupción breve entre dos tareas.",
  PERSPECTIVA: "Punto de vista desde el que interpretas una situación.",
  PINTURA: "Forma de crear con colores sobre una superficie.",
  PLANEAR: "Decidir por adelantado qué pasos darás y en qué orden.",
  POSTURA: "Posición del cuerpo al sentarte, estar de pie o descansar.",
  PREGUNTA: "La haces para aclarar algo o conocer mejor lo que le pasa a alguien.",
  PRESENTE: "Momento al que vuelves cuando observas lo que está pasando ahora.",
  PRIVACIDAD: "Posibilidad de decidir quién accede a tu información o a tu espacio personal.",
  PRIORIDAD: "Lo que eliges atender primero entre varias cosas pendientes.",
  PROPUESTA: "Idea que compartes para que otras personas puedan considerarla.",
  PROPOSITO: "Razón que da dirección a una acción que decides emprender.",
  RECIPROCIDAD: "Correspondencia entre el cuidado que das y el que recibes.",
  RECONOCER: "Identificar algo que está presente, como una emoción o un esfuerzo.",
  RECREO: "Intervalo en el horario escolar para jugar, moverse o descansar.",
  RECUERDO: "Imagen, sensación o idea que vuelve desde una experiencia pasada.",
  RECURSO: "Algo a lo que puedes acudir, como una persona, una práctica o una guía.",
  REENCUADRE: "Cambio de perspectiva para considerar otra lectura de la misma situación.",
  REFLEXION: "Acto de pensar con detenimiento sobre lo que pasó y cómo te afectó.",
  RELAJAR: "Aflojar la tensión de algo, como los hombros o las manos.",
  RELATO: "Manera de contar una experiencia con tus propias palabras.",
  RESPETO: "Consideración que muestras al tomar en cuenta los límites de otra persona.",
  RESPIRAR: "Tomar y soltar aire, un ritmo que puedes observar al hacer una pausa.",
  RESPIRO: "Momento breve en el que una exigencia se interrumpe y puedes descansar.",
  RITMO: "Cadencia a la que haces algo, como caminar o escribir.",
  RUTINA: "Secuencia que se repite y puede ayudarte a incorporar un hábito.",
  SATISFACCION: "Sensación de agrado al completar algo que te importaba.",
  SEGURIDAD: "Sensación de estar a salvo en un lugar o con una persona.",
  SENCILLEZ: "Cualidad de una práctica con pocos pasos y fácil de entender.",
  SERENIDAD: "Estado de calma que puede acompañar un momento sin prisa.",
  SILENCIO: "Se hace cuando cesa el ruido que te rodea.",
  SIMBOLO: "Signo que representa algo, como un corazón para expresar cariño.",
  SONRISA: "Gesto que aparece al levantar suavemente las comisuras de la boca.",
  SOSIEGO: "Quietud interior que puedes asociar con un momento de descanso.",
  TAREA: "Acción pendiente que puedes dividir en pasos pequeños.",
  TEMPLANZA: "Capacidad de moderar un impulso antes de actuar.",
  TERNURA: "Afecto suave que se puede expresar con un gesto delicado.",
  TOLERANCIA: "Capacidad de aceptar diferencias o soportar cierta incomodidad.",
  TRANQUILO: "Adjetivo para quien se encuentra en calma o para un lugar con poco ruido.",
  TRISTEZA: "Emoción que puede aparecer tras una pérdida o una decepción.",
  UMBRAL: "Punto a partir del cual notas que algo empieza a cambiar.",
  VALIDAR: "Reconocer como comprensible lo que alguien siente.",
  VALORES: "Principios que orientan las decisiones que quieres tomar.",
  VINCULO: "Lazo que te une a otra persona o comunidad.",
  VOLUNTAD: "Capacidad de decidir y orientar tus actos hacia algo que eliges."
};

// Cada entrada indica respuesta, fila, columna y dirección.
// Las coordenadas empiezan en cero y los inicios están en orden de lectura.
const layouts = [
  [
    ['AUTOCUIDADO', 0, 3, 'V'], ['SILENCIO', 0, 6, 'V'], ['EQUILIBRIO', 1, 1, 'H'],
    ['RUTINA', 1, 8, 'V'], ['PACIENCIA', 4, 1, 'H'], ['PAUSA', 4, 1, 'V'],
    ['CURIOSIDAD', 6, 0, 'H'], ['APOYO', 7, 10, 'V'], ['DESCANSO', 9, 3, 'H']
  ],
  [
    ['INVITACION', 0, 10, 'V'], ['ESTIRAR', 2, 3, 'V'], ['PACIENCIA', 2, 8, 'V'],
    ['AMISTAD', 3, 0, 'H'], ['ATENCION', 3, 5, 'V'], ['IDENTIDAD', 5, 3, 'H'],
    ['ACCION', 7, 3, 'H'], ['CONFIANZA', 9, 4, 'H']
  ],
  [
    ['AROMA', 0, 5, 'H'], ['REENCUADRE', 0, 6, 'V'], ['POSTURA', 1, 1, 'V'],
    ['ESPERANZA', 3, 0, 'H'], ['ENTORNO', 3, 3, 'V'], ['ALIENTO', 3, 8, 'V'],
    ['ARMONIA', 6, 0, 'H'], ['SOSIEGO', 9, 2, 'H']
  ],
  [
    ['BALANCE', 0, 0, 'V'], ['FLEXIBILIDAD', 1, 6, 'V'], ['INICIATIVA', 2, 3, 'V'],
    ['NECESIDAD', 3, 3, 'H'], ['CERCANIA', 5, 0, 'H'], ['CORAJE', 6, 8, 'V'],
    ['ABRIGO', 7, 3, 'H'], ['PRIORIDAD', 9, 1, 'H'], ['TAREA', 11, 2, 'H']
  ],
  [
    ['PREGUNTA', 0, 4, 'V'], ['HERRAMIENTA', 0, 6, 'V'], ['CORTESIA', 1, 2, 'H'],
    ['AMABILIDAD', 1, 9, 'V'], ['RECUERDO', 3, 1, 'V'], ['LECTURA', 4, 0, 'H'],
    ['ENLACE', 7, 1, 'H'], ['CAUTELA', 9, 3, 'H']
  ],
  [
    ['PINTURA', 0, 3, 'H'], ['INVITACION', 0, 4, 'V'], ['TRISTEZA', 0, 6, 'V'],
    ['CURIOSIDAD', 3, 1, 'H'], ['ACOGIDA', 3, 9, 'V'], ['AFECTO', 5, 4, 'H'],
    ['RESPIRAR', 7, 0, 'H'], ['NOVEDAD', 9, 4, 'H']
  ],
  [
    ['TOLERANCIA', 0, 4, 'V'], ['CREATIVIDAD', 1, 8, 'V'], ['VALIDAR', 2, 2, 'H'],
    ['RESPIRO', 3, 0, 'V'], ['CUIDADO', 3, 11, 'V'], ['ESPERANZA', 4, 0, 'H'],
    ['MANUALIDAD', 6, 2, 'H'], ['PRIVACIDAD', 8, 2, 'H'], ['ABRAZO', 10, 5, 'H']
  ],
  [
    ['INTENCION', 0, 6, 'V'], ['EMOCION', 4, 0, 'H'], ['ESCUCHA', 4, 0, 'V'],
    ['SONRISA', 4, 8, 'V'], ['COMPASION', 6, 0, 'H'], ['PASEO', 6, 3, 'V'],
    ['CONSTANCIA', 8, 0, 'H'], ['AUTONOMIA', 10, 0, 'H']
  ],
  [
    ['ADAPTACION', 0, 4, 'V'], ['PROPUESTA', 1, 1, 'V'], ['FORTALEZA', 1, 6, 'V'],
    ['RELATO', 2, 1, 'H'], ['RESPIRAR', 5, 8, 'V'], ['DIVERSION', 7, 3, 'H'],
    ['CALENDARIO', 9, 0, 'H'], ['MUSICA', 11, 3, 'H']
  ],
  [
    ['PERSPECTIVA', 0, 0, 'H'], ['PRESENTE', 0, 0, 'V'], ['SERENIDAD', 0, 3, 'V'],
    ['ESCRITURA', 0, 5, 'V'], ['TERNURA', 0, 7, 'V'], ['RECURSO', 2, 3, 'H'],
    ['INTERES', 5, 3, 'H'], ['BOCETO', 7, 8, 'V'], ['DIARIO', 8, 3, 'H']
  ],
  [
    ['ETIQUETA', 0, 5, 'V'], ['COHERENCIA', 0, 7, 'V'], ['AGENDA', 1, 1, 'V'],
    ['RITMO', 1, 3, 'H'], ['ENFOQUE', 3, 1, 'H'], ['DESPEJE', 5, 1, 'H'],
    ['CANCION', 7, 4, 'H'], ['SEGURIDAD', 9, 0, 'H']
  ],
  [
    ['MODERACION', 0, 3, 'V'], ['PLANEAR', 0, 7, 'V'], ['ENLACE', 1, 5, 'H'],
    ['ESCRITURA', 1, 5, 'V'], ['DESCANSO', 3, 2, 'H'], ['CAMINATA', 5, 2, 'H'],
    ['ACTITUD', 7, 0, 'H'], ['PANTALLA', 9, 1, 'H']
  ],
  [
    ['VOLUNTAD', 0, 1, 'V'], ['ORGANIZAR', 0, 5, 'V'], ['BIENESTAR', 0, 9, 'V'],
    ['INTIMIDAD', 0, 11, 'V'], ['CONVERSACION', 1, 0, 'H'], ['UMBRAL', 3, 1, 'H'],
    ['VINCULO', 4, 7, 'V'], ['DISTANCIA', 7, 1, 'H'], ['SIMBOLO', 10, 3, 'H']
  ],
  [
    ['TOLERANCIA', 0, 8, 'V'], ['OPTIMISMO', 1, 0, 'H'], ['TRISTEZA', 1, 2, 'V'],
    ['INTIMIDAD', 1, 5, 'V'], ['LIMITE', 3, 1, 'H'], ['ALEGRIA', 6, 0, 'H'],
    ['CALMA', 8, 1, 'H'], ['DETALLE', 9, 5, 'H']
  ],
  [
    ['LIMITE', 0, 6, 'V'], ['CALENDARIO', 0, 8, 'V'], ['AMABILIDAD', 1, 0, 'H'],
    ['ACOGIDA', 1, 0, 'V'], ['CALIDEZ', 3, 3, 'H'], ['ANCLAJE', 3, 4, 'V'],
    ['ACUERDO', 5, 3, 'H'], ['DIVERSION', 9, 1, 'H']
  ],
  [
    ['RECREO', 0, 8, 'V'], ['CONEXION', 2, 10, 'V'], ['RECUERDO', 3, 3, 'H'],
    ['RECONOCER', 3, 3, 'V'], ['ACUERDO', 5, 2, 'H'], ['RUTINA', 5, 6, 'V'],
    ['AUTOCUIDADO', 8, 0, 'H'], ['AROMA', 8, 0, 'V'], ['OBSERVAR', 10, 0, 'H']
  ],
  [
    ['SATISFACCION', 0, 11, 'V'], ['ARMONIA', 1, 5, 'H'], ['APRECIO', 3, 6, 'H'],
    ['PROPUESTA', 3, 7, 'V'], ['RELATO', 5, 5, 'V'], ['EMPATIA', 6, 5, 'H'],
    ['LENGUAJE', 8, 0, 'H'], ['CONTEXTO', 10, 4, 'H']
  ],
  [
    ['FORTALEZA', 0, 9, 'V'], ['CONSENTIR', 1, 3, 'V'], ['ORDEN', 2, 3, 'H'],
    ['ESTRATEGIA', 2, 6, 'V'], ['RESPETO', 4, 1, 'H'], ['REENCUADRE', 6, 0, 'H'],
    ['BIENESTAR', 8, 2, 'H'], ['MEMORIA', 11, 0, 'H']
  ],
  [
    ['ACEPTACION', 0, 0, 'H'], ['OPTIMISMO', 0, 8, 'V'], ['SERENIDAD', 2, 3, 'V'],
    ['TEMPLANZA', 2, 5, 'V'], ['COHERENCIA', 3, 0, 'H'], ['RELAJAR', 5, 1, 'V'],
    ['ESPACIO', 5, 3, 'H'], ['JARDIN', 8, 0, 'H'], ['APOYO', 10, 5, 'H']
  ],
  [
    ['HERRAMIENTA', 0, 3, 'V'], ['MEMORIA', 0, 6, 'V'], ['REFLEXION', 1, 2, 'H'],
    ['PREGUNTA', 2, 1, 'V'], ['RELAJAR', 4, 0, 'H'], ['HUMILDAD', 6, 0, 'H'],
    ['DIALOGO', 6, 5, 'V'], ['PANTALLA', 9, 0, 'H']
  ],
  [
    ['ESCRITURA', 0, 3, 'V'], ['RECIPROCIDAD', 0, 5, 'V'], ['PERSPECTIVA', 1, 0, 'H'],
    ['VALORES', 1, 9, 'V'], ['IMPULSO', 4, 3, 'H'], ['HUMOR', 6, 2, 'H'],
    ['ALIVIO', 8, 3, 'H'], ['DETALLE', 10, 2, 'H']
  ],
  [
    ['DIALOGO', 0, 1, 'H'], ['ALEGRIA', 0, 3, 'V'], ['CLARIDAD', 0, 10, 'V'],
    ['CREATIVIDAD', 2, 1, 'H'], ['TERNURA', 2, 5, 'V'], ['INSPIRACION', 2, 8, 'V'],
    ['MANUALIDAD', 6, 2, 'H'], ['CONFIANZA', 8, 0, 'H'], ['FOCO', 11, 5, 'H']
  ],
  [
    ['ASERTIVIDAD', 0, 0, 'H'], ['EXPRESION', 0, 2, 'V'], ['TRANQUILO', 0, 4, 'V'],
    ['HABITO', 3, 7, 'V'], ['CORAJE', 3, 9, 'V'], ['VALORES', 4, 6, 'H'],
    ['INICIATIVA', 6, 0, 'H'], ['ENTORNO', 8, 1, 'H']
  ],
  [
    ['PINTURA', 0, 4, 'V'], ['GESTO', 1, 0, 'V'], ['CALIDEZ', 3, 6, 'V'],
    ['TERNURA', 4, 0, 'H'], ['RECREO', 4, 2, 'V'], ['CLARIDAD', 6, 2, 'H'],
    ['ALIVIO', 6, 8, 'V'], ['EXPRESION', 8, 2, 'H']
  ],
  [
    ['MUSICA', 0, 5, 'H'], ['CORTESIA', 0, 9, 'V'], ['GRATITUD', 2, 3, 'V'],
    ['ESCUCHA', 2, 7, 'V'], ['PROPOSITO', 3, 2, 'H'], ['LENGUAJE', 4, 11, 'V'],
    ['SATISFACCION', 6, 0, 'H'], ['ACCION', 6, 1, 'V'], ['CAUTELA', 8, 1, 'H']
  ],
  [
    ['CONEXION', 0, 8, 'V'], ['RECURSO', 1, 2, 'H'], ['CANCION', 1, 4, 'V'],
    ['MINUTO', 3, 2, 'V'], ['CONTEXTO', 3, 10, 'V'], ['MATIZ', 4, 6, 'V'],
    ['INVITACION', 5, 1, 'H'], ['INTENCION', 7, 0, 'H']
  ],
  [
    ['DELEGAR', 0, 2, 'V'], ['MOVIMIENTO', 0, 6, 'V'], ['RECONOCER', 1, 1, 'H'],
    ['NECESIDAD', 3, 1, 'H'], ['ESPACIO', 3, 4, 'V'], ['ABRAZO', 3, 8, 'V'],
    ['FORTALEZA', 6, 0, 'H'], ['FOCO', 9, 3, 'H']
  ],
  [
    ['APRECIO', 0, 7, 'V'], ['HUMOR', 2, 1, 'V'], ['DESPEJE', 3, 3, 'H'],
    ['DISFRUTE', 3, 3, 'V'], ['SENCILLEZ', 3, 5, 'V'], ['CONSENTIR', 5, 0, 'H'],
    ['DIARIO', 7, 9, 'V'], ['EQUILIBRIO', 8, 1, 'H'], ['BIENESTAR', 10, 1, 'H']
  ],
  [
    ['CAMINATA', 0, 3, 'V'], ['NOVEDAD', 0, 9, 'V'], ['ADAPTACION', 1, 1, 'H'],
    ['ABRIGO', 1, 6, 'V'], ['DISFRUTE', 3, 2, 'H'], ['PASEO', 4, 0, 'V'],
    ['ACOGIDA', 5, 3, 'H'], ['ENLACE', 7, 0, 'H']
  ],
  [
    ['INICIATIVA', 0, 8, 'V'], ['LECTURA', 1, 0, 'V'], ['CONSTANCIA', 1, 2, 'V'],
    ['BOSQUE', 1, 6, 'V'], ['CONVERSACION', 3, 0, 'H'], ['EMPATIA', 3, 4, 'V'],
    ['PAUSA', 5, 4, 'H'], ['PRIVACIDAD', 9, 0, 'H']
  ],
  [
    ['RECUERDO', 0, 3, 'H'], ['EMOCION', 0, 7, 'V'], ['JARDIN', 2, 3, 'V'],
    ['INSPIRACION', 2, 5, 'V'], ['PROPOSITO', 2, 9, 'V'], ['RESPIRO', 4, 3, 'H'],
    ['MOVIMIENTO', 6, 0, 'H'], ['ALIVIO', 8, 5, 'H'], ['MINUTO', 10, 4, 'H']
  ],
  [
    ['TAREA', 0, 4, 'V'], ['RESPETO', 0, 6, 'V'], ['DISTANCIA', 2, 1, 'V'],
    ['PRESENTE', 2, 3, 'H'], ['TRANQUILO', 2, 9, 'V'], ['ESTRATEGIA', 4, 0, 'H'],
    ['CONSTANCIA', 8, 1, 'H'], ['CALENDARIO', 10, 0, 'H']
  ],
  [
    ['BOCETO', 0, 2, 'V'], ['ORGANIZAR', 1, 2, 'H'], ['AMISTAD', 1, 5, 'V'],
    ['IDENTIDAD', 1, 7, 'V'], ['ACTITUD', 1, 9, 'V'], ['SONRISA', 4, 5, 'H'],
    ['GRATITUD', 6, 3, 'H'], ['VOLUNTAD', 9, 0, 'H']
  ],
  [
    ['ATENCION', 0, 4, 'H'], ['ASERTIVIDAD', 0, 4, 'V'], ['VALIDAR', 2, 8, 'V'],
    ['ALEGRIA', 3, 0, 'H'], ['ALIENTO', 3, 6, 'V'], ['DIARIO', 3, 10, 'V'],
    ['FLEXIBILIDAD', 5, 0, 'H'], ['CONFIANZA', 7, 0, 'H'], ['CUIDADO', 9, 0, 'H']
  ],
  [
    ['VALIDAR', 0, 8, 'V'], ['COMPASION', 3, 2, 'H'], ['ACEPTACION', 3, 6, 'V'],
    ['CERCANIA', 4, 1, 'V'], ['ETIQUETA', 5, 1, 'H'], ['PASEO', 7, 3, 'V'],
    ['ADAPTACION', 8, 1, 'H'], ['SILENCIO', 10, 0, 'H']
  ],
  [
    ['PASEO', 0, 3, 'V'], ['PRIVACIDAD', 0, 8, 'V'], ['SEGURIDAD', 1, 5, 'V'],
    ['PERSPECTIVA', 2, 0, 'H'], ['VOLUNTAD', 4, 2, 'H'], ['GESTO', 5, 0, 'V'],
    ['EQUILIBRIO', 6, 0, 'H'], ['TEMPLANZA', 8, 0, 'H']
  ],
  [
    ['PACIENCIA', 0, 7, 'V'], ['OBSERVAR', 2, 4, 'V'], ['ANCLAJE', 2, 9, 'V'],
    ['SILENCIO', 4, 4, 'H'], ['POSTURA', 5, 1, 'V'], ['COHERENCIA', 6, 0, 'H'],
    ['INTERES', 6, 11, 'V'], ['AFECTO', 8, 7, 'H'], ['UMBRAL', 9, 1, 'H']
  ],
  [
    ['UMBRAL', 0, 2, 'H'], ['ASERTIVIDAD', 0, 6, 'V'], ['CALENDARIO', 1, 8, 'V'],
    ['DELEGAR', 2, 4, 'V'], ['MEMORIA', 4, 1, 'V'], ['REFLEXION', 5, 0, 'H'],
    ['ORGANIZAR', 7, 1, 'H'], ['HABITO', 9, 5, 'H']
  ],
  [
    ['CONSENTIR', 0, 7, 'V'], ['AUTONOMIA', 0, 9, 'V'], ['MINUTO', 2, 5, 'H'],
    ['MATIZ', 2, 5, 'V'], ['AGENDA', 3, 0, 'H'], ['ARMONIA', 3, 0, 'V'],
    ['MOVIMIENTO', 5, 0, 'H'], ['LIMITE', 7, 6, 'H']
  ],
  [
    ['PLANEAR', 0, 10, 'V'], ['CALMA', 1, 8, 'H'], ['ACEPTACION', 1, 12, 'V'],
    ['SOSIEGO', 3, 3, 'V'], ['BALANCE', 3, 6, 'H'], ['AMABILIDAD', 3, 7, 'V'],
    ['ESPERANZA', 5, 2, 'H'], ['MODERACION', 7, 0, 'H'], ['VINCULO', 9, 6, 'H']
  ],
  [
    ['CONTEXTO', 0, 2, 'V'], ['INSPIRACION', 1, 0, 'V'], ['RESPIRO', 1, 4, 'V'],
    ['RECIPROCIDAD', 1, 7, 'V'], ['RITMO', 2, 9, 'V'], ['SATISFACCION', 3, 0, 'H'],
    ['RECREO', 6, 4, 'H'], ['APOYO', 7, 0, 'H']
  ],
  [
    ['TRISTEZA', 0, 2, 'V'], ['ORDEN', 1, 1, 'H'], ['EXPRESION', 1, 4, 'V'],
    ['BOSQUE', 2, 6, 'V'], ['SIMBOLO', 3, 9, 'V'], ['INTERES', 4, 0, 'H'],
    ['CALIDEZ', 7, 1, 'H'], ['TRANQUILO', 9, 1, 'H']
  ],
  [
    ['EXPRESION', 0, 1, 'V'], ['DIVERSION', 1, 3, 'V'], ['DIALOGO', 1, 6, 'V'],
    ['PRIORIDAD', 2, 1, 'H'], ['CORAJE', 4, 8, 'V'], ['LECTURA', 4, 10, 'V'],
    ['RECONOCER', 5, 3, 'H'], ['SOSIEGO', 7, 0, 'H'], ['ENFOQUE', 9, 2, 'H']
  ],
  [
    ['PAUSA', 0, 8, 'V'], ['RELAJAR', 1, 0, 'V'], ['REENCUADRE', 1, 2, 'H'],
    ['RELATO', 1, 2, 'V'], ['ESTIRAR', 1, 4, 'V'], ['AMABILIDAD', 4, 0, 'H'],
    ['DIARIO', 4, 9, 'V'], ['AROMA', 6, 0, 'H']
  ],
  [
    ['PERSPECTIVA', 0, 1, 'H'], ['RECIPROCIDAD', 0, 3, 'V'], ['PROPUESTA', 0, 5, 'V'],
    ['AFECTO', 2, 0, 'H'], ['AUTONOMIA', 2, 0, 'V'], ['ORDEN', 5, 2, 'H'],
    ['MUSICA', 8, 0, 'H'], ['ABRAZO', 10, 0, 'H']
  ],
  [
    ['GRATITUD', 0, 5, 'V'], ['HERRAMIENTA', 1, 3, 'V'], ['RELAJAR', 1, 5, 'H'],
    ['RUTINA', 3, 3, 'H'], ['NECESIDAD', 3, 10, 'V'], ['NOVEDAD', 5, 8, 'V'],
    ['IMPULSO', 6, 2, 'H'], ['MANUALIDAD', 9, 1, 'H'], ['CREATIVIDAD', 11, 0, 'H']
  ],
  [
    ['CAMINATA', 0, 1, 'V'], ['CAUTELA', 1, 0, 'H'], ['SENCILLEZ', 3, 3, 'V'],
    ['SERENIDAD', 3, 5, 'V'], ['INTERES', 4, 0, 'H'], ['HUMILDAD', 4, 9, 'V'],
    ['ALIENTO', 7, 1, 'H'], ['TOLERANCIA', 10, 0, 'H']
  ],
  [
    ['PROPOSITO', 0, 0, 'V'], ['EMOCION', 0, 5, 'V'], ['IDENTIDAD', 2, 9, 'V'],
    ['PRIVACIDAD', 3, 0, 'H'], ['VINCULO', 3, 3, 'V'], ['CONTEXTO', 6, 3, 'H'],
    ['TAREA', 6, 6, 'V'], ['CORTESIA', 9, 2, 'H']
  ],
  [
    ['HERRAMIENTA', 0, 2, 'V'], ['ATENCION', 1, 0, 'H'], ['INTENCION', 1, 5, 'V'],
    ['POSTURA', 3, 8, 'V'], ['APRECIO', 4, 2, 'H'], ['PLANEAR', 4, 11, 'V'],
    ['INICIATIVA', 6, 2, 'H'], ['CANCION', 8, 0, 'H'], ['PAUSA', 9, 7, 'H']
  ],
  [
    ['FLEXIBILIDAD', 0, 4, 'V'], ['MODERACION', 1, 1, 'V'], ['ORDEN', 2, 1, 'H'],
    ['EQUILIBRIO', 4, 1, 'H'], ['JARDIN', 6, 0, 'H'], ['MATIZ', 7, 8, 'V'],
    ['INTIMIDAD', 8, 1, 'H'], ['ANCLAJE', 10, 0, 'H']
  ],
  [
    ['OPTIMISMO', 0, 1, 'V'], ['INTIMIDAD', 1, 8, 'V'], ['EMPATIA', 4, 0, 'H'],
    ['ABRIGO', 4, 3, 'V'], ['INTENCION', 4, 5, 'V'], ['ESTRATEGIA', 6, 0, 'H'],
    ['ORGANIZAR', 8, 1, 'H'], ['BOCETO', 11, 0, 'H']
  ],
  [
    ['INSPIRACION', 0, 6, 'V'], ['PROPUESTA', 1, 2, 'V'], ['GESTO', 1, 10, 'V'],
    ['AGENDA', 3, 0, 'V'], ['CUIDADO', 3, 8, 'V'], ['ETIQUETA', 4, 4, 'H'],
    ['ESPACIO', 4, 4, 'V'], ['DISTANCIA', 7, 0, 'H'], ['HABITO', 9, 1, 'H']
  ],
  [
    ['EQUILIBRIO', 0, 5, 'V'], ['ETIQUETA', 1, 2, 'H'], ['RESPIRAR', 3, 1, 'H'],
    ['RESPETO', 3, 1, 'V'], ['SONRISA', 3, 3, 'V'], ['SENCILLEZ', 5, 1, 'H'],
    ['RECIPROCIDAD', 7, 0, 'H'], ['AROMA', 9, 3, 'H']
  ],
  [
    ['FORTALEZA', 0, 4, 'V'], ['RITMO', 0, 8, 'V'], ['PROPOSITO', 1, 2, 'H'],
    ['PRIORIDAD', 1, 2, 'V'], ['AMISTAD', 3, 0, 'H'], ['RELATO', 5, 2, 'H'],
    ['OBSERVAR', 5, 7, 'V'], ['BALANCE', 8, 1, 'H']
  ],
  [
    ['RECREO', 0, 4, 'H'], ['RESPETO', 0, 4, 'V'], ['CALMA', 0, 6, 'V'],
    ['CERCANIA', 3, 2, 'V'], ['DELEGAR', 4, 1, 'H'], ['RECUERDO', 4, 7, 'V'],
    ['ACCION', 6, 0, 'H'], ['LENGUAJE', 8, 0, 'H'], ['CLARIDAD', 10, 0, 'H']
  ],
  [
    ['FLEXIBILIDAD', 0, 7, 'V'], ['DESPEJE', 2, 3, 'H'], ['EMPATIA', 2, 9, 'V'],
    ['PRESENTE', 4, 2, 'V'], ['CALIDEZ', 5, 5, 'V'], ['AMISTAD', 6, 5, 'H'],
    ['ASERTIVIDAD', 8, 0, 'H'], ['DETALLE', 10, 4, 'H']
  ],
  [
    ['ACTITUD', 0, 1, 'H'], ['AUTONOMIA', 0, 1, 'V'], ['TRISTEZA', 0, 3, 'V'],
    ['OBSERVAR', 3, 1, 'H'], ['VINCULO', 3, 6, 'V'], ['COHERENCIA', 5, 0, 'H'],
    ['APRECIO', 5, 9, 'V'], ['HUMOR', 7, 5, 'H']
  ],
  [
    ['MUSICA', 0, 4, 'V'], ['SEGURIDAD', 3, 0, 'V'], ['ESCUCHA', 4, 0, 'H'],
    ['CONFIANZA', 4, 2, 'V'], ['ACTITUD', 4, 6, 'V'], ['ENTORNO', 6, 8, 'V'],
    ['REFLEXION', 7, 0, 'H'], ['HUMOR', 9, 5, 'H'], ['ACUERDO', 12, 2, 'H']
  ],
  [
    ['CORAJE', 0, 4, 'V'], ['RECURSO', 2, 0, 'H'], ['ENFOQUE', 2, 1, 'V'],
    ['HUMILDAD', 2, 9, 'V'], ['PINTURA', 3, 11, 'V'], ['ESTIRAR', 4, 6, 'V'],
    ['CONVERSACION', 5, 0, 'H'], ['CURIOSIDAD', 7, 0, 'H']
  ],
  [
    ['PACIENCIA', 0, 0, 'V'], ['VALORES', 1, 3, 'V'], ['SILENCIO', 1, 5, 'V'],
    ['CREATIVIDAD', 2, 0, 'H'], ['ANCLAJE', 2, 9, 'V'], ['TOLERANCIA', 4, 2, 'H'],
    ['CUIDADO', 6, 5, 'H'], ['BOSQUE', 8, 4, 'H']
  ],
  [
    ['AUTOCUIDADO', 0, 2, 'H'], ['OPTIMISMO', 0, 5, 'V'], ['AGENDA', 0, 10, 'V'],
    ['CONEXION', 3, 0, 'H'], ['NECESIDAD', 3, 2, 'V'], ['CURIOSIDAD', 5, 2, 'H'],
    ['DESCANSO', 5, 11, 'V'], ['SIMBOLO', 8, 1, 'H'], ['ACEPTACION', 10, 2, 'H']
  ],
  [
    ['CONVERSACION', 0, 5, 'V'], ['PERSPECTIVA', 0, 11, 'V'], ['RECONOCER', 1, 9, 'V'],
    ['PREGUNTA', 2, 0, 'H'], ['PRESENTE', 5, 4, 'H'], ['SONRISA', 5, 7, 'V'],
    ['CORTESIA', 8, 5, 'H'], ['PANTALLA', 11, 3, 'H']
  ],
  [
    ['BOSQUE', 0, 8, 'V'], ['TEMPLANZA', 1, 6, 'V'], ['DIVERSION', 2, 3, 'H'],
    ['INICIATIVA', 2, 4, 'V'], ['SENCILLEZ', 5, 1, 'H'], ['ETIQUETA', 5, 2, 'V'],
    ['RUTINA', 9, 1, 'H'], ['ESTRATEGIA', 11, 0, 'H']
  ],
  [
    ['TRANQUILO', 0, 9, 'V'], ['VALIDAR', 2, 4, 'H'], ['DISFRUTE', 4, 0, 'H'],
    ['RESPIRAR', 4, 4, 'V'], ['ESCUCHA', 4, 7, 'V'], ['SATISFACCION', 6, 0, 'H'],
    ['ALIENTO', 6, 1, 'V'], ['INVITACION', 8, 1, 'H'], ['PANTALLA', 10, 3, 'H']
  ],
  [
    ['SIMBOLO', 0, 9, 'V'], ['MEMORIA', 1, 1, 'V'], ['ATENCION', 1, 7, 'V'],
    ['DISFRUTE', 3, 5, 'V'], ['MOVIMIENTO', 4, 0, 'H'], ['IMPULSO', 4, 3, 'V'],
    ['ACUERDO', 7, 1, 'H'], ['VALORES', 10, 0, 'H']
  ],
  [
    ['SERENIDAD', 0, 4, 'V'], ['ESPACIO', 1, 4, 'H'], ['ACUERDO', 1, 7, 'V'],
    ['TERNURA', 3, 3, 'H'], ['ALIVIO', 3, 9, 'V'], ['DELEGAR', 4, 1, 'V'],
    ['ESTIRAR', 5, 1, 'H'], ['DESCANSO', 7, 0, 'H']
  ],
  [
    ['IMPULSO', 0, 5, 'H'], ['PRIORIDAD', 0, 7, 'V'], ['BIENESTAR', 2, 9, 'V'],
    ['ENTORNO', 3, 1, 'H'], ['NOVEDAD', 3, 2, 'V'], ['ABRIGO', 4, 0, 'V'],
    ['ACCION', 5, 4, 'V'], ['REENCUADRE', 6, 0, 'H'], ['GRATITUD', 8, 0, 'H']
  ],
  [
    ['DISTANCIA', 0, 7, 'V'], ['ESCRITURA', 3, 2, 'H'], ['COMPASION', 3, 4, 'V'],
    ['RECONOCER', 3, 9, 'V'], ['TAREA', 5, 1, 'V'], ['ADAPTACION', 6, 1, 'H'],
    ['CANCION', 9, 0, 'H'], ['REENCUADRE', 11, 1, 'H']
  ],
  [
    ['CURIOSIDAD', 0, 8, 'V'], ['TRANQUILO', 3, 3, 'V'], ['LIMITE', 3, 5, 'H'],
    ['IDENTIDAD', 3, 6, 'V'], ['INTENCION', 6, 2, 'H'], ['CALMA', 7, 1, 'V'],
    ['MANUALIDAD', 8, 0, 'H'], ['ACOGIDA', 11, 1, 'H']
  ],
  [
    ['DIALOGO', 0, 4, 'V'], ['BALANCE', 1, 8, 'V'], ['AGENDA', 1, 12, 'V'],
    ['CLARIDAD', 2, 2, 'H'], ['MINUTO', 3, 10, 'V'], ['MODERACION', 4, 3, 'H'],
    ['ENLACE', 4, 6, 'V'], ['LECTURA', 6, 6, 'H'], ['DESPEJE', 9, 0, 'H']
  ],
  [
    ['BALANCE', 0, 2, 'V'], ['AUTOCUIDADO', 0, 7, 'V'], ['ABRAZO', 3, 11, 'V'],
    ['CONSTANCIA', 4, 0, 'H'], ['TERNURA', 4, 4, 'V'], ['HERRAMIENTA', 6, 1, 'H'],
    ['APOYO', 8, 7, 'H'], ['ARMONIA', 10, 4, 'H']
  ],
  [
    ['ESPERANZA', 0, 10, 'V'], ['DISTANCIA', 1, 6, 'V'], ['MATIZ', 2, 3, 'H'],
    ['CONEXION', 3, 8, 'V'], ['RITMO', 4, 4, 'H'], ['RESPIRO', 4, 4, 'V'],
    ['PRESENTE', 6, 1, 'H'], ['FLEXIBILIDAD', 8, 0, 'H']
  ],
  [
    ['CUIDADO', 0, 8, 'V'], ['GESTO', 2, 1, 'V'], ['AUTONOMIA', 3, 4, 'V'],
    ['DIVERSION', 3, 6, 'V'], ['SEGURIDAD', 4, 1, 'H'], ['SOSIEGO', 5, 10, 'V'],
    ['BOCETO', 6, 3, 'H'], ['CONSENTIR', 8, 3, 'H'], ['RESPIRO', 10, 0, 'H']
  ],
  [
    ['CAUTELA', 0, 3, 'V'], ['CERCANIA', 0, 5, 'H'], ['COMPASION', 0, 5, 'V'],
    ['CONTEXTO', 0, 8, 'V'], ['AFECTO', 0, 12, 'V'], ['ABRAZO', 1, 0, 'H'],
    ['DETALLE', 4, 2, 'H'], ['CAMINATA', 6, 2, 'H']
  ],
  [
    ['MEMORIA', 0, 5, 'V'], ['ACOGIDA', 3, 3, 'V'], ['PINTURA', 3, 9, 'V'],
    ['CERCANIA', 4, 3, 'H'], ['ALEGRIA', 4, 7, 'V'], ['RECURSO', 5, 1, 'V'],
    ['LENGUAJE', 6, 0, 'H'], ['CREATIVIDAD', 9, 0, 'H']
  ]
];

function buildPuzzle(layout) {
  const rows = Math.max(...layout.map(([answer, row, , direction]) =>
    row + (direction === 'V' ? answer.length : 1)
  ));
  const columns = Math.max(...layout.map(([answer, , column, direction]) =>
    column + (direction === 'H' ? answer.length : 1)
  ));
  let number = 0;
  let previousStart = -1;

  const entries = layout.map(([answer, row, column, direction]) => {
    const start = row * columns + column;
    if (start !== previousStart) {
      number++;
      previousStart = start;
    }
    const step = direction === 'H' ? 1 : columns;
    const cells = Array.from({ length: answer.length }, (_, offset) => start + offset * step);
    return { direction, number, answer, clue: clues[answer], cells };
  });

  return { rows, columns, entries };
}

export const crosswordBank = layouts.map(buildPuzzle);
