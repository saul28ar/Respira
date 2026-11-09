// Guías editoriales: los momentos organizan el temporizador, no son un protocolo clínico.
export const meditationMethods = {
  calm: {
    title:'Calma en 5 minutos', duration:300, icon:'leaf',
    subtitle:'Un momento para volver al presente.',
    intro:'Una pausa sencilla. Sin tener que dejar la mente en blanco.',
    guide:['Siéntate con apoyo y encuentra una postura cómoda.','Observa cómo entra y sale el aire, sin cambiarlo.','Si te distraes, vuelve con amabilidad. Distraerse también forma parte de la práctica.'],
    benefits:'Practicar esta pausa puede ayudarte a reconocer la tensión y volver tu atención al presente. No hace falta terminar sintiéndote de una forma concreta.',
    source:'https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/how-to-meditate-for-beginners/',
    phases:[{at:0,label:'Llegar',text:'Nota dónde se apoya tu cuerpo.'},{at:60,label:'Observar',text:'Sigue una respiración natural. Si te distraes, vuelve despacio.'},{at:270,label:'Volver',text:'Mira a tu alrededor y retoma tu día sin prisa.'}],
    examples:[
      'Entre dos tareas, apoya los pies y nota el contacto con el suelo. Observa una respiración natural y vuelve a ella cuando te distraigas.',
      'Después de estudiar, deja el material a un lado. Nota el apoyo de la silla y cómo entra y sale el aire, sin hacerlo más profundo.',
      'Antes de comenzar el día, siéntate cómodamente. Si aparece tu lista de pendientes, reconócelo y vuelve a notar una respiración.',
      'En un lugar tranquilo, escucha los sonidos cercanos. Cuando tu atención se vaya, regresa al sonido que puedas oír ahora.',
      'Durante una pausa, mira un objeto y observa un detalle de su forma. Después nota tu postura y una respiración, sin apurarte.'
    ]
  },
  anxiety: {
    title:'Reducir la ansiedad', duration:600, icon:'sun',
    subtitle:'Encuentra apoyo aquí y ahora.',
    intro:'No necesitas resolverlo todo en este momento.',
    guide:['Siente los pies en el suelo o el contacto con el asiento.','Elige algo que puedas notar: un sonido, un objeto o tu respiración natural.','Cuando aparezca una preocupación, reconócela y vuelve a ese punto de apoyo.'],
    benefits:'Puede ayudarte a tomar distancia de las preocupaciones y notar lo que ocurre ahora. La meta es acompañar lo que sientes, sin exigirte eliminarlo.',
    source:'https://www.nhs.uk/mental-health/self-help/tips-and-support/mindfulness/',
    phases:[{at:0,label:'Encontrar apoyo',text:'Nota el contacto de tus pies o del respaldo.'},{at:120,label:'Volver al presente',text:'Escucha un sonido o mira un objeto. Vuelve a él cuando lo necesites.'},{at:540,label:'Dar un paso',text:'Elige una pequeña acción posible para después.'}],
    examples:[
      'Antes de una exposición, nota tus pies dentro del calzado. Mira un objeto cercano y vuelve a ese detalle cuando aparezca una preocupación.',
      'Si piensas muchas veces en lo que podría pasar, nómbralo como una preocupación. Nota el apoyo del asiento y escucha un sonido de ahora.',
      'Mientras esperas una respuesta, deja el teléfono a un lado. Observa algo frente a ti y elige una pequeña tarea posible para después.',
      'Si te cuesta empezar una tarea, nota el contacto de las manos con la mesa. Regresa a esa sensación y decide solo el primer paso.',
      'Cuando una preocupación ocupe tu atención, mira el color de un objeto cercano. Puedes sentir lo que sientes y volver a observarlo sin discutir con el pensamiento.'
    ]
  },
  sleep: {
    title:'Dormir mejor', duration:600, icon:'moon',
    subtitle:'Baja el ritmo para cerrar el día.',
    intro:'No tienes que conseguir dormirte. Solo darte espacio para descansar.',
    guide:['Acomódate en un lugar tranquilo y reduce el brillo de la pantalla.','Recorre el cuerpo, notando y aflojando la tensión que puedas, sin forzar.','Si aparece un pensamiento, deja que pase y vuelve a una sensación cómoda.'],
    benefits:'Esta práctica puede facilitar la transición del movimiento del día al descanso. No necesitas conseguir dormirte antes de que termine el contador.',
    source:'https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/how-to-fall-asleep-faster-and-sleep-better/how-can-meditation-help-with-sleep/',
    phases:[{at:0,label:'Acomodarte',text:'Busca una postura cómoda y deja descansar los hombros.'},{at:120,label:'Soltar tensión',text:'Recorre el cuerpo despacio, de los pies al rostro.'},{at:540,label:'Descansar',text:'Deja que el descanso continúe. No hace falta mirar la pantalla.'}],
    examples:[
      'Al acostarte, encuentra una postura cómoda. Nota los pies, las piernas y el apoyo de la espalda, dejando aflojar lo que puedas.',
      'Después de un día activo, baja el brillo e inicia la práctica. Descansa los hombros y permite que la mandíbula quede cómoda, sin apretarla.',
      'Si repasas lo que pasó durante el día, nota que estás pensando. Vuelve al contacto de la almohada o de la manta, sin obligarte a dormir.',
      'Antes de descansar, recorre el cuerpo lentamente desde los pies. Si una zona sigue tensa, puedes pasar a otra sin intentar forzarla.',
      'Deja la pantalla a un lado tras iniciar el contador. Nota una sensación cómoda y respira naturalmente; no necesitas vigilar el tiempo.'
    ]
  },
  selflove: {
    title:'Amor propio', duration:480, icon:'heart',
    subtitle:'Un momento para tratarte con amabilidad.',
    intro:'Háblate como hablarías a alguien que quieres.',
    guide:['Reconoce cómo estás hoy, sin buscar una respuesta correcta.','Piensa qué le dirías a alguien querido que se sintiera así.','Prueba dirigirte esas palabras y elige un cuidado pequeño que puedas darte.'],
    benefits:'Puede ayudarte a reconocer la autocrítica y responderte de una forma más amable y realista. No tienes que negar lo difícil ni sentirte bien a la fuerza.',
    source:'https://www.cci.health.wa.gov.au/Resources/Looking-After-Yourself/Self-Compassion',
    phases:[{at:0,label:'Reconocer',text:'¿Cómo estás hoy? Puedes nombrarlo con una palabra.'},{at:96,label:'Hablarte con amabilidad',text:'¿Qué le dirías a alguien querido en tu situación?'},{at:432,label:'Cuidarte',text:'Elige un gesto de cuidado pequeño y posible.'}],
    examples:[
      'Si algo no salió como esperabas, reconoce que te dolió. Prueba decirte: «Puedo equivocarme y dar un siguiente paso pequeño».',
      'Después de un día exigente, nombra cómo estás. Piensa qué descanso le ofrecerías a alguien querido y considera darte ese mismo espacio.',
      'Si te comparas con otra persona, nota esa comparación. Pregúntate qué necesitas hoy, en lugar de exigirte estar donde está alguien más.',
      'Cuando te critiques por estar cansado, imagina a una persona querida en tu lugar. Ensaya las palabras comprensivas que le dirías.',
      'Recuerda algo pequeño que intentaste hoy, aunque no saliera perfecto. Reconoce el esfuerzo y elige un gesto de cuidado posible para ti.'
    ]
  }
};
