// Cada tema aporta diez situaciones. La posición de la respuesta cambia al recorrer el banco.
const scenarios = [
  {
    contexts: 'Mi amiga se fue antes de despedirse.|El profesor pidió que revise una página.|La respuesta del grupo fue muy breve.|Me cambiaron de asiento al llegar.|Alguien leyó mi mensaje y aún no contesta.|El entrenador movió la práctica a otra hora.|Un compañero pidió que repita mi explicación.|Mi hermano está más callado que de costumbre.|Envié una propuesta y me pidieron cambios.|La reunión terminó antes de lo previsto.',
    lead: 'Si quiero distinguir lo que sé de lo que supongo, puedo ',
    pairs: [['describir lo que ocurrió', 'dejar abierta la explicación'], ['imaginar la causa más probable', 'tratarla como un hecho'], ['preguntar qué creen otras personas', 'dar por cierta la respuesta más repetida'], ['anotar mi primera interpretación', 'usarla como única explicación']],
    hint: '¿Qué parte podrías comprobar directamente?',
    feedback: 'Describir lo observable deja espacio para buscar más información.'
  },
  {
    contexts: 'Todavía no confirman si la feria se hará al aire libre.|El taller puede cambiar de aula.|Aún no sé cuál será mi turno para exponer.|No sé quién podrá ayudarme con la mudanza.|Hay dos fechas posibles para la visita.|Todavía deben confirmar mi hora de salida.|El parque podría cerrar por la lluvia.|La clase puede ser presencial o virtual.|La hora de la cita depende de una confirmación.|La prueba se hará en uno de dos salones.',
    lead: 'Para preparar ambos escenarios, puedo ',
    pairs: [['avanzar en lo que comparten las opciones', 'dejar un margen para ajustar los detalles'], ['decidir por la opción que más quiero', 'anunciarla como confirmada'], ['preparar hasta el último detalle de un solo escenario', 'mantenerlo aunque cambie la información'], ['hacer todo apenas se sepa la respuesta', 'ignorar lo que ya puedo adelantar']],
    hint: 'Busca un paso útil para ambos escenarios.',
    feedback: 'Preparar lo común y reservar un margen te permite avanzar con flexibilidad.'
  },
  {
    contexts: 'Me quedan diez minutos para repasar vocabulario.|Solo tengo un rato antes de salir a hacer compras.|Quiero avanzar en una carta antes de mi cita.|Me quedan quince minutos para ordenar los apuntes.|Tengo una pausa breve entre reuniones.|Puedo dedicar unos minutos a organizar los materiales.|Quiero preparar algo de la exposición antes del almuerzo.|Tengo un rato corto para revisar las fotos de la feria.|Me quedan diez minutos antes de apagar la computadora.|Puedo adelantar una parte del dibujo antes de salir.',
    lead: 'Para aprovechar ese rato con una sola tarea, puedo ',
    pairs: [['elegir un paso que quepa en el tiempo', 'dejar anotado dónde seguir después'], ['iniciar tres cosas a la vez', 'alternar cada minuto entre ellas'], ['empezar por el paso más largo', 'seguir hasta que esté todo terminado'], ['dedicar el rato a decidir el plan completo', 'aplazar el primer avance para otra ocasión']],
    hint: 'Elige un paso pequeño y concreto que puedas retomar.',
    feedback: 'Una meta breve y una nota para continuar dan al rato un principio y un cierre.'
  },
  {
    contexts: 'Debo enviar una solicitud mañana y ordenar fotos el domingo.|Mañana entrego el borrador y la portada se revisará la próxima semana.|Hoy debo confirmar una cita y el resto del viaje puede esperar.|El equipo me pide una respuesta para esta tarde y las notas son para el lunes.|Mañana vence el trámite y el archivo puede organizarse otro día.|Tengo que revisar hoy el mensaje urgente y en unos días actualizar la lista.|La exposición es mañana y el mural se entregará en dos semanas.|Hay que confirmar hoy el lugar de reunión y elegir la merienda el viernes.|Hoy vence mi turno para reservar y todavía hay días para preparar el bolso.|Mañana debo devolver un libro y la reseña se entrega al final de mes.',
    lead: 'Para ordenar los pendientes según sus plazos, puedo ',
    pairs: [['reservar el primer bloque para lo que vence antes', 'agendar el resto para una fecha posible'], ['empezar por el pendiente que más me gusta', 'repartir el tiempo que sobre sin mirar los plazos'], ['alternar entre todos por igual', 'comprobar las fechas cuando termine'], ['atender primero el pendiente lejano', 'dejar el más cercano para cuando tenga ganas']],
    hint: 'Una fecha cercana merece un bloque propio.',
    feedback: 'Una fecha para cada pendiente ayuda a cuidar lo urgente sin olvidar lo demás.'
  },
  {
    contexts: 'Me encargaron diseñar un cartel, pero aún no sé qué debe decir.|Me pidieron llevar materiales sin decirme para qué actividad.|Me solicitaron una presentación y el público aún no está definido.|Me encargaron ordenar una carpeta y no sé cómo esperan encontrarla.|Me pidieron acompañar un trámite sin explicar qué debo llevar.|Me encargaron hacer un resumen y no conozco la extensión esperada.|Me pidieron editar un video y aún no conozco su duración.|Me solicitaron ayuda en un evento y desconozco el horario.|Me pidieron preparar un texto sin aclarar a quién va dirigido.|Tengo que armar un afiche y no sé cuándo debe estar listo.',
    lead: 'Antes de invertir mucho tiempo, puedo ',
    pairs: [['pedir que aclaren el resultado esperado', 'elegir el primer paso con esa información'], ['hacer una versión completa a mi gusto', 'preguntar al entregar si eso era suficiente'], ['copiar lo último que hice', 'dar por hecho que las condiciones son las mismas'], ['esperar una explicación espontánea', 'dejar la tarea para el día del plazo']],
    hint: 'Una pregunta concreta puede cambiar por dónde empiezas.',
    feedback: 'Entender el encargo permite elegir un primer paso que sirva.'
  },
  {
    contexts: 'Me invitaron a conversar justo en el rato que reservé para descansar.|Me pidieron ayudar el día que guardé para una cita.|Un grupo quiere reunirse en mi único rato libre de la semana.|Alguien me llamó mientras estaba en mi pausa.|Me propusieron adelantar la reunión a la hora de mi comida.|Quieren cambiar el turno al tiempo que dedico a mi familia.|Una amistad me pide una visita cuando ya tengo otro compromiso.|Quieren que atienda un asunto fuera del horario que acordamos.|Me piden conversar justo antes de una clase.|Alguien quiere que le acompañe mientras termino algo que necesita atención.',
    lead: 'Para cuidar mi horario y comunicarlo con respeto, puedo ',
    pairs: [['decir qué tiempo tengo disponible', 'ofrecer otra opción si me es posible'], ['aceptar aunque no tenga espacio', 'buscar cómo cumplirlo a última hora'], ['hacer que la otra persona adivine el límite', 'avisar cuando ya no se pueda cambiar'], ['explicar todos mis compromisos privados', 'aceptar si la explicación no convence']],
    hint: 'Un horario claro basta para expresar la disponibilidad.',
    feedback: 'Puedes expresar tu disponibilidad con claridad y ofrecer una alternativa cuando sea posible.'
  },
  {
    contexts: 'Me pidieron revisar todo un trabajo y puedo leer una parte.|El grupo necesita montar una mesa y solo puedo ayudar unos minutos.|Una amistad necesita ordenar varias cajas y solo puedo ayudar con una.|Quieren que prepare todo el evento y puedo encargarme de una tarea.|Me piden cubrir una tarde y solo puedo llegar durante el primer rato.|Una persona quiere que le ayude con varios trámites y puedo hacer uno.|Quieren que corrija un texto largo y hoy puedo revisar dos páginas.|Me invitaron a cocinar todo el almuerzo y puedo aportar un plato.|Me piden participar toda la mañana y puedo estar al comienzo.|Quieren ayuda para llevar muchos materiales y puedo hacer un viaje.',
    lead: 'Para aportar dentro de mis posibilidades, puedo ',
    pairs: [['nombrar la parte que sí puedo hacer', 'aclarar hasta dónde llega mi compromiso'], ['prometer toda la ayuda', 'retirarme cuando se acabe mi tiempo'], ['responder que lo intentaré todo', 'dejar que el grupo calcule mi disponibilidad'], ['encargarme primero de una parte', 'dar por hecho que las otras quedan cubiertas']],
    hint: 'Nombra tanto el aporte concreto como su alcance.',
    feedback: 'Una oferta con un límite claro ayuda a que las demás personas se organicen.'
  },
  {
    contexts: 'La charla sobre los horarios se está calentando.|Me cuesta seguir escuchando durante una discusión familiar.|Estoy apurado y el tema necesita atención.|Me alteré hablando de un trabajo en equipo.|La conversación se cruzó con una llamada urgente.|Estoy cansado y no logro seguir el hilo.|Me siento tenso mientras hablamos de una decisión importante.|El chat de grupo se llenó de mensajes cruzados.|Se me mezclan las ideas durante una llamada.|Me está costando pensar con claridad en esta conversación.',
    lead: 'Si quiero hacer una pausa y retomar el tema, puedo ',
    pairs: [['pedir un rato para calmarme', 'acordar cuándo seguir hablando'], ['cerrar la conversación de golpe', 'esperar que el tema desaparezca'], ['seguir hasta acabar', 'explicar al día siguiente por qué necesitaba parar'], ['cambiar de asunto', 'dejar que la otra persona decida si se retoma']],
    hint: 'La pausa y el regreso pueden quedar claros desde ahora.',
    feedback: 'Una petición de pausa y un momento acordado facilitan retomar la conversación.'
  },
  {
    contexts: 'Un amigo quiere contarme cómo le fue en su nueva clase.|Mi hermana está hablando de un problema con un grupo.|Una compañera me cuenta algo que le sorprendió en la feria.|Una persona cercana está pensando cómo hablar con su familia.|Un vecino me está contando cómo cambió su rutina.|Mi amigo intenta explicar qué sintió al cambiar de equipo.|Una amiga me habla de un malentendido que todavía le pesa.|Una persona del grupo quiere contar por qué se sintió fuera.|Mi prima está hablando de una decisión que le cuesta tomar.|Alguien de casa me cuenta qué le preocupó durante el día.',
    lead: 'Si quiero escuchar antes de dar mi opinión, puedo ',
    pairs: [['dejarle terminar su idea', 'preguntar qué tipo de apoyo le vendría bien'], ['interrumpir para contar algo parecido', 'dar mi consejo antes de oír el resto'], ['pedirle que se concentre en la solución', 'elegir por mi cuenta el siguiente paso'], ['empezar por explicar mi punto de vista', 'preguntarle al final qué necesitaba']],
    hint: 'Dale espacio para terminar y decir qué busca de ti.',
    feedback: 'Escuchar primero y preguntar por el apoyo deseado permite responder con atención.'
  },
  {
    contexts: 'Quiero que una amiga me acompañe hasta la biblioteca.~ir a la biblioteca|Me vendría bien que alguien revise una página conmigo.~revisar una página|Me gustaría tener compañía mientras organizo mis apuntes.~ordenar mis apuntes|Quiero pedir una llamada breve después de clase.~hacer una llamada breve|Me ayudaría contar lo que pasó hoy a alguien que conozco bien.~hablar de lo que pasó hoy|Me vendría bien apoyo para elegir qué asunto abordar primero.~ordenar mis pendientes|Quisiera hacer el trayecto de la tarde en compañía.~hacer el trayecto de la tarde|Me gustaría practicar la explicación con una persona de confianza.~practicar mi explicación|Quiero pedir ayuda para revisar el mensaje que voy a enviar.~revisar un mensaje|Me serviría que alguien me acompañe mientras preparo mi bolso.~preparar mi bolso',
    lead: 'Para pedirlo de manera concreta, puedo ',
    pairs: [['preguntar si podemos @', 'decir cuándo me vendría bien'], ['esperar que note lo que me hace falta', 'interpretar su silencio como respuesta'], ['hablar de todo lo que me preocupa', 'dejar que adivine el tipo de ayuda'], ['enviar un mensaje sin explicar el pedido', 'decidir por la otra persona si tiene tiempo']],
    hint: 'Di qué ayuda buscas y cuándo te serviría.',
    feedback: 'Una petición concreta facilita que la otra persona te dé una respuesta clara.'
  },
  {
    contexts: 'En el ensayo hablé por encima de una compañera.~hablé por encima de ella|En casa levanté la voz al pedir silencio.~levanté la voz|Apuré a una amistad mientras me contaba algo personal.~la apuré al hablar|Hice una broma que dejó incómoda a una persona del grupo.~hice esa broma|Cerré la conversación mientras alguien respondía.~cerré la conversación de golpe|En el chat respondí en un tono brusco.~respondí en un tono brusco|Durante un juego interrumpí cuando alguien explicaba las reglas.~interrumpí la explicación|Me adelanté a corregir a alguien que aún no terminaba.~corregí antes de escuchar todo|Llamé la atención de un compañero frente a todo el equipo.~lo señalé frente al grupo|Dije que una preocupación ajena era exagerada.~minimicé su preocupación',
    lead: 'Para reparar mi parte, puedo ',
    pairs: [['reconocer que @', 'ofrecer una disculpa concreta'], ['hacer como si no hubiera pasado', 'esperar que el ambiente mejore solo'], ['explicar mi intención primero', 'dar por reparado el gesto sin nombrarlo'], ['pedir una disculpa a la otra persona', 'dejar mi parte para otro momento']],
    hint: 'Ponle palabras a la acción que quieres reparar.',
    feedback: 'Una disculpa concreta reconoce qué hiciste y qué quieres cuidar al volver a hablar.'
  },
  {
    contexts: 'Un mensaje dice «luego vemos» y no sé si se refiere a hoy.|Alguien mencionó «el grupo» y no sé cuál era.|Una compañera dijo «lo cambiamos» sin indicar qué parte.|Mi amigo comentó «allá» y no me quedó claro el lugar.|El profesor dijo «revisar» y quiero saber qué espera.|En la nota figura «mañana temprano» y no sé la hora.|Escuché «cuando puedas» y hay una fecha que debo confirmar.|La invitación dice «en el sitio de siempre» y hay dos posibles lugares.|En un audio alguien dijo «el primero» y desconozco la lista.|El grupo dijo «lleva lo necesario» y necesito saber qué llevar.',
    lead: 'Para aclarar el mensaje, puedo ',
    pairs: [['decir con mis palabras lo que entendí', 'hacer una pregunta sobre el dato dudoso'], ['elegir la primera lectura que se me ocurra', 'contarla a los demás como confirmada'], ['buscar a alguien que comparta mi interpretación', 'usar su acuerdo como prueba'], ['responder solo a la parte segura', 'dar por resuelta la parte que no entendí']],
    hint: 'La persona que envió el mensaje puede confirmar qué quiso decir.',
    feedback: 'Una paráfrasis y una pregunta concreta ayudan a entender el mensaje.'
  },
  {
    contexts: 'Estoy sentado en la biblioteca y quiero notar el lugar.~el roce de una página|Espero en un pasillo donde se oye un reloj.~el sonido del reloj|Quiero hacer una pausa en una habitación con cortinas.~la luz sobre la cortina|Estoy en una sala con piso de madera.~la textura de la madera|Estoy sentado cerca de una ventana abierta.~el sonido del aire|Me quedé en clase mientras guardan los materiales.~el ruido de las mochilas|Quiero descansar un momento con una taza tibia.~el calor de la taza|Estoy en un comedor donde alguien pone platos.~el sonido de un plato|Espero mi turno sentado en una banca.~la textura de la banca|Me detuve junto a un escritorio con una lámpara encendida.~el color de la luz',
    lead: 'Para volver a lo que ocurre aquí, puedo notar ',
    pairs: [['@', 'un punto donde mi cuerpo se apoya'], ['lo que podría ocurrir al salir', 'cómo tendré que responder luego'], ['mi lista de pendientes', 'el orden en que quiero resolverla'], ['qué debería estar sintiendo', 'cuánto tiempo tardaré en sentirlo']],
    hint: 'Elige dos señales que puedas percibir ahora.',
    feedback: 'Un detalle del entorno y un punto de apoyo pueden servir como referencias del presente.'
  },
  {
    contexts: 'Estoy caminando por un parque arbolado.~el movimiento de una rama|Me detuve cerca de la orilla de un lago.~las ondas en el agua|Espero junto a un jardín con flores.~un color entre las flores|Camino por un sendero de tierra.~la textura del sendero|Pasé por una plaza en una mañana ventosa.~el viento en la cara|Me senté en una banca bajo un árbol.~la forma de una sombra|Estoy junto a una fuente encendida.~el sonido del agua|Espero en una esquina donde llega el sol.~el calor del sol en las manos|Camino por una calle después de llover.~la luz en un charco|Salí al patio mientras pasa una nube.~el cambio de luz en el suelo',
    lead: 'Para prestar atención al paseo, puedo observar ',
    pairs: [['@', 'otro detalle que esté a mi alcance'], ['qué hará el clima mañana', 'si convendría haber salido otro día'], ['cuántas tareas faltan', 'cómo adelantaré la próxima'], ['qué sensación debería tener', 'si estoy observando de manera perfecta']],
    hint: 'Dirige la atención a un detalle que ya esté ahí.',
    feedback: 'Observar detalles concretos te da una manera sencilla de volver al paseo.'
  },
  {
    contexts: 'Mi atención se fue a la cena mientras notaba mi respiración.~el aire al salir|Pensé en un mensaje mientras escuchaba la música.~un instrumento que sigue sonando|Mientras miraba un árbol recordé un pendiente.~el color de una hoja|Me fui a una preocupación cuando prestaba atención a mi postura.~el contacto con el asiento|Recordé una conversación en mitad de una pausa en silencio.~un sonido cercano|Pensé en una tarea mientras observaba la lluvia.~una gota en la ventana|Se me ocurrió una idea mientras atendía a mis pasos.~el apoyo del pie siguiente|Mi atención se fue al reloj mientras sostenía una taza.~el calor en mis manos|Mientras miraba el cielo pensé en cómo contar el día.~una nube que esté pasando|Me puse a ordenar mentalmente la semana mientras observaba el agua.~una onda en la superficie',
    lead: 'Para retomar mi práctica de atención, puedo ',
    pairs: [['reconocer que me distraje', 'volver a notar @'], ['reiniciar cada vez que aparece un pensamiento', 'exigir que todo el rato sea perfecto'], ['seguir el pensamiento hasta resolverlo', 'volver solo cuando ya no queden ideas'], ['juzgar cuánto me distraje', 'decidir si la práctica de hoy cuenta']],
    hint: 'Puedes volver a la señal que ya estabas observando.',
    feedback: 'Notar una distracción y volver con calma forma parte de practicar la atención.'
  },
  {
    contexts: 'Llevo un rato inclinando el cuello para leer.|Me doy cuenta de que estoy apretando la mandíbula.|Noté que levanté los hombros mientras escribía.|Sostengo el lápiz con más fuerza de la necesaria.|Me siento rígido al terminar una tarea larga.|Me sorprendí encogido al mirar el teléfono.|Tengo los pies cruzados y quiero cambiar de posición.|Me incliné sobre la mesa durante una conversación.|Estoy sujetando la mochila con las manos muy tensas.|Mi espalda quedó en la misma postura durante una clase.',
    lead: 'En una pausa breve para estar más cómodo, puedo ',
    pairs: [['hacer un cambio de postura suave', 'notar cómo se siente sin forzar el movimiento'], ['estirar lo más lejos posible', 'mantener la postura aunque moleste'], ['cambiar de posición deprisa varias veces', 'seguir hasta dejar de notar la tensión'], ['corregir cada parte de mi postura a la vez', 'quedarme inmóvil aunque necesite moverme']],
    hint: 'Busca un cambio cómodo, pequeño y fácil de ajustar.',
    feedback: 'Una postura cómoda se puede ajustar según lo que vas notando.'
  },
  {
    contexts: 'Estoy esperando un mensaje de mi familia y el resto de los avisos me interrumpe.|La persona que me recoge puede llamarme mientras estudio.|Me deben confirmar la hora de una cita por chat.|Necesito enterarme si cambia el lugar de reunión.|Estoy esperando una respuesta importante de mi equipo.|Me avisarán cuando llegue un paquete y quiero concentrarme.|Una persona de casa me llamará si necesita algo.|Mi grupo debe confirmar el aula antes de que salga.|Estoy esperando un mensaje del compañero con quien me reúno.|El tutor puede escribirme para ajustar una hora acordada.',
    lead: 'Para reducir interrupciones y conservar ese contacto, puedo ',
    pairs: [['silenciar los avisos que pueden esperar', 'mantener activo el canal que necesito'], ['apagar por completo el teléfono', 'esperar que llegue de todos modos la llamada'], ['dejar todos los avisos sonando', 'interrumpirme cada vez que llegue uno'], ['mirar el teléfono a cada minuto', 'silenciar justo el contacto del que espero noticias']],
    hint: '¿Qué aviso concreto necesitas conservar?',
    feedback: 'Elegir qué notificaciones mantener permite atender lo importante sin abrir todas las demás.'
  },
  {
    contexts: 'Abrí el teléfono para revisar una dirección.~consultar la dirección|Quiero enviar una foto y seguir con mi tarea.~enviar la foto|Entré al chat para confirmar la hora de salida.~confirmar la hora|Necesito buscar un número de teléfono.~buscar el número|Solo quiero ver un archivo que me enviaron.~abrir el archivo|Entré para poner una alarma.~poner la alarma|Busco el nombre de una canción que quiero oír.~buscar la canción|Necesito revisar cuándo sale el autobús.~consultar el horario|Abrí el chat para responder una pregunta concreta.~responder esa pregunta|Solo voy a comprobar si llegó una confirmación.~ver si llegó la confirmación',
    lead: 'Para usar el teléfono con ese propósito, puedo ',
    pairs: [['ir directamente a @', 'guardar el teléfono al terminar'], ['mirar primero lo nuevo', 'pasar a la tarea cuando se me acaben las novedades'], ['abrir varias aplicaciones', 'decidir qué buscaba mientras navego'], ['leer todos los mensajes pendientes', 'dejar el objetivo para cuando quede tiempo']],
    hint: 'Define a qué vas y en qué momento termina ese uso.',
    feedback: 'Una entrada directa y un cierre concreto conectan el uso del teléfono con tu objetivo.'
  },
  {
    contexts: 'Mañana madrugo y hoy todavía tengo un rato antes de dormir.|He terminado las tareas y quiero cerrar el día con calma.|Esta noche quiero dejar preparada la mañana sin seguir repasando todo.|Acabo de volver de una salida y quiero bajar el ritmo.|Hoy me apetece leer unas páginas antes de acostarme.|Tengo la mochila lista y quiero usar el rato que queda para descansar.|Terminé de conversar y quiero pasar a una actividad más tranquila.|Estoy cerrando la computadora y me gustaría preparar mi espacio para dormir.|Ya anoté lo de mañana y quiero terminar la jornada.|Me queda poco para acostarme y quiero despejar mi mesa.',
    lead: 'Para pasar al descanso, puedo ',
    pairs: [['elegir una actividad tranquila que me resulte cómoda', 'dejar el resto de los pendientes anotados para mañana'], ['iniciar la tarea más exigente', 'seguir hasta terminarla aunque ya sea tarde'], ['abrir los mensajes que dejé pendientes', 'resolver ahora todo lo que aparezca'], ['revisar cada problema del día', 'esperar una solución para cerrar la noche']],
    hint: 'Una transición breve puede ayudarte a dejar la jornada en orden.',
    feedback: 'Un cierre sencillo deja un lugar para los pendientes y tiempo para descansar.'
  },
  {
    contexts: 'Llevo mucho rato leyendo un capítulo y llegué al último subtítulo.~el último subtítulo|Se me están mezclando los apuntes de dos temas.~la primera página por revisar|Terminé los ejercicios fáciles de una lista.~el primer ejercicio pendiente|Llevo rato comparando ideas para un trabajo.~la idea que quiero contrastar después|Avancé en un dibujo y ya tengo el fondo.~la parte del dibujo que sigue|Revisé un audio y todavía me queda el cierre.~el minuto en que me quedé|He corregido la primera mitad del texto.~la línea donde debo retomar|Ensayé el inicio de la exposición varias veces.~la parte que quiero ensayar después|He ordenado una sección de la carpeta.~la siguiente carpeta por ordenar|Completé una parte del problema de matemáticas.~el paso que debo comprobar luego',
    lead: 'Si voy a descansar y quiero volver sin perder el hilo, puedo ',
    pairs: [['anotar @', 'tomar una pausa breve'], ['cambiar enseguida a otra tarea igual de exigente', 'volver cuando termine'], ['seguir hasta perder la concentración', 'buscar desde cero por dónde iba al regresar'], ['cerrar la actividad de golpe', 'confiar en que recordaré todos los detalles']],
    hint: 'Deja una señal de regreso antes de descansar.',
    feedback: 'Una nota corta facilita volver a la tarea después de la pausa.'
  },
  {
    contexts: 'Estoy inquieto antes de un cambio de salón.|Me dio alegría al ver que mi dibujo interesó a alguien.|Sentí enojo cuando cambiaron un acuerdo sin avisar.|Me sorprendió recibir una invitación inesperada.|Siento alivio después de terminar un trámite pendiente.|Echo de menos una rutina que compartía con una amistad.|Me dio vergüenza olvidar un nombre en público.|Me siento orgulloso de haber pedido ayuda.|Me frustré después de varios intentos con la misma tarea.|Noté miedo al pensar en una conversación pendiente.',
    lead: 'Para reconocer lo que siento sin sacar conclusiones apresuradas, puedo ',
    pairs: [['ponerle un nombre aproximado a la emoción', 'notar cuándo apareció'], ['definir cómo soy a partir de una emoción', 'asumir que se repetirá siempre'], ['elegir lo que se supone que debería sentir', 'ignorar lo que estoy percibiendo'], ['buscar una única explicación de inmediato', 'tratarla como la única posible']],
    hint: 'Una emoción puede tener un nombre y un contexto.',
    feedback: 'Nombrar la emoción y recordar el contexto ayuda a describir lo que estás viviendo.'
  },
  {
    contexts: 'Olvidé una parte de la exposición y me estoy criticando.|Me equivoqué al copiar una fecha y me hablé con dureza.|Taché el dibujo porque una línea no salió como esperaba.|Dije mal un nombre y seguí dándole vueltas.|Me confundí de archivo al enviar un trabajo.|No encontré la palabra que quería usar en un debate.|Perdí el hilo en un ejercicio que antes sabía hacer.|Llegué más tarde de lo que había planeado.|Me dejé un material en casa y me molesté conmigo.|No pude seguir el ritmo de una actividad nueva.',
    lead: 'Para darme espacio de aprender de ese momento, puedo ',
    pairs: [['describir el error con palabras respetuosas', 'elegir un ajuste posible para la próxima vez'], ['llamarme incapaz', 'evitar cualquier situación parecida'], ['repasar el error para castigarme', 'exigirme que nunca vuelva a ocurrir'], ['compararme con quien lo hizo mejor', 'usar su desempeño para juzgarme']],
    hint: 'Un error concreto admite un ajuste concreto.',
    feedback: 'Puedes corregir una acción y mantener una forma respetuosa de hablarte.'
  },
  {
    contexts: 'Quiero anotar algo que sentí al terminar la clase.~qué sentí al terminar la clase|Quiero recordar cómo me fue en una conversación difícil.~qué fue lo más difícil de la conversación|Quiero dejar por escrito una decisión que me tomó tiempo.~qué me ayudó a decidir|Quiero recordar la sorpresa de esta mañana.~qué me sorprendió esta mañana|Quiero ordenar lo que pensé después del ensayo.~qué ideas aparecieron después del ensayo|Quiero revisar por qué me costó empezar una tarea.~qué estaba ocurriendo al intentar empezar|Quiero anotar lo que sentí al reencontrarme con alguien.~cómo viví el reencuentro|Quiero dejar una nota sobre una meta pequeña que alcancé.~cómo llegué a esa meta|Quiero recordar un momento tranquilo del paseo.~qué detalle hizo tranquilo ese rato|Quiero entender cómo reaccioné al cambio de horario.~qué noté al enterarme del cambio',
    lead: 'En una página breve, puedo escribir ',
    pairs: [['@', 'qué me gustaría recordar después'], ['solo lo que quedaría bien si lo leyera otra persona', 'qué frase sonaría más correcta'], ['todo el día en orden exacto', 'cada detalle antes de mencionar lo que importa'], ['la versión más dura de lo ocurrido', 'por qué no debí sentirme así']],
    hint: 'La página puede empezar con lo que te gustaría entender o conservar.',
    feedback: 'Puedes escribir sobre un detalle concreto y elegir qué quieres recordar de él.'
  },
  {
    contexts: 'Una compañera guardó un asiento para mí.~que guardara un asiento|Una amistad me devolvió un libro que me importaba.~que me devolviera el libro|Mi hermano dejó la mesa libre para que estudiara.~que despejara la mesa|Un vecino me señaló un camino más cómodo.~que me mostrara otro camino|Alguien esperó a que terminara de hablar.~que me dejara terminar|Un amigo me prestó un lápiz cuando olvidé el mío.~que me prestara un lápiz|Mi familia reservó un momento para llamarme.~que reservaran ese rato|Una persona de mi equipo me avisó de un cambio importante.~que me avisara del cambio|Un compañero compartió sus apuntes conmigo.~que compartiera sus apuntes|Mi amiga se acordó de preguntar cómo me fue.~que se acordara de preguntar',
    lead: 'Para agradecer ese gesto, puedo ',
    pairs: [['nombrar @', 'explicar qué valor tuvo para mí'], ['agradecer de manera genérica', 'dar por hecho que sabrá qué aprecié'], ['centrarme en lo que también podría haber hecho', 'dejar lo que sí hizo sin mencionar'], ['prometer devolverle el gesto de inmediato', 'dejar para después expresar qué aprecié']],
    hint: 'Un agradecimiento específico muestra qué gesto notaste.',
    feedback: 'Nombrar el gesto y su efecto permite expresar tu gratitud con claridad.'
  },
  {
    contexts: 'Hace tiempo que no dibujo y hoy tengo diez minutos.~dibujar un objeto cercano|Quiero volver a leer por gusto durante la tarde.~leer un fragmento breve|Extraño cantar mientras hago tareas en casa.~tararear una canción que conozco|Me gustaría volver a cuidar una planta.~observar una hoja y revisar la tierra|Quiero retomar los paseos que disfrutaba.~caminar un tramo corto que me resulte cómodo|Tengo ganas de volver a escribir historias.~imaginar un personaje en un párrafo|Me apetece escuchar música con calma.~poner una canción que me guste|Quiero retomar un pasatiempo con fotografías.~fotografiar un detalle cerca de casa|Me gustaría volver a jugar un rato.~elegir una partida breve|Echo de menos pintar y hoy tengo una hoja libre.~probar dos colores en una esquina',
    lead: 'Para retomar la actividad en pequeño, puedo ',
    pairs: [['@', 'decidir después si quiero continuar'], ['empezar por la versión más exigente', 'medir si valió por el resultado final'], ['organizar un compromiso para todo el mes', 'aplazar la primera prueba'], ['comparar mi ritmo con el de antes', 'seguir solo si igualo mi mejor resultado']],
    hint: 'Puedes elegir una versión breve que te dé ganas de empezar.',
    feedback: 'Una prueba pequeña te permite descubrir cómo te resulta la actividad hoy.'
  },
  {
    contexts: 'Tengo varias ideas para una carta y ninguna está en orden.~anotar dos ideas principales|Necesito estudiar varios temas y me abruma ver toda la lista.~elegir el primer tema del repaso|La tarea parece grande porque hay mucho material junto.~separar lo que necesito para el primer paso|Mi cuarto tiene varias zonas desordenadas.~empezar por una superficie pequeña|Hay mensajes en distintos grupos y no sé cuál atender primero.~identificar el mensaje con el plazo más cercano|Tengo que preparar la mochila y varias cosas están en otra habitación.~reunir los materiales imprescindibles|Hay muchas notas sobre la mesa y quiero organizarlas.~hacer una pila con las notas de un solo tema|Mi equipo tiene varias decisiones abiertas.~escoger una decisión que podamos tomar hoy|Necesito guardar fotos de varios días.~empezar por las imágenes de una sola fecha|Tengo varios borradores para una presentación.~elegir el borrador que más se parece al encargo',
    lead: 'Para empezar con una parte manejable, puedo ',
    pairs: [['@', 'revisar qué sigue al terminar ese paso'], ['intentar abarcar todos los pendientes a la vez', 'dejar los pequeños para el final'], ['comparar durante un rato todos los planes posibles', 'empezar cuando pueda elegir el mejor'], ['pensar primero en cuánto falta por hacer', 'seguir hasta resolver el conjunto completo']],
    hint: 'Elige una acción que puedas iniciar sin resolver toda la lista.',
    feedback: 'Un primer paso manejable da información para decidir qué hacer después.'
  },
  {
    contexts: 'Hoy prefiero caminar en vez de ir al cine con el grupo.~caminar|Me invitan a una salida larga y prefiero una visita breve.~hacer una visita breve|Mi amiga propone conversar de noche y prefiero otro horario.~hablar en otro horario|El grupo quiere jugar algo que no me gusta y prefiero otro plan.~probar otro plan|Me invitan a una reunión ruidosa y hoy prefiero algo tranquilo.~hacer algo tranquilo|Una persona sugiere estudiar en grupo y hoy prefiero leer solo.~leer por mi cuenta|Me piden elegir una película y me apetece escuchar música.~escuchar música|Quieren encontrarse lejos y hoy prefiero un lugar cercano.~vernos cerca|Una amistad propone salir y hoy prefiero quedarme en casa.~quedarme en casa|Mi familia propone ver una serie y me apetece dibujar un rato.~dibujar un rato',
    lead: 'Para expresar mi preferencia sin decidir por los demás, puedo ',
    pairs: [['decir que hoy prefiero @', 'escuchar qué opción les acomoda a ellos'], ['aceptar el primer plan aunque me incomode', 'esperar que noten mi preferencia'], ['presentar mi preferencia como decisión del grupo', 'anunciarla antes de conversar'], ['enumerar todos los defectos de su idea', 'pedir que elijan la mía por obligación']],
    hint: 'Tu preferencia puede expresarse en primera persona.',
    feedback: 'Decir qué prefieres y escuchar a los demás facilita conversar sobre el plan.'
  },
  {
    contexts: 'La lluvia cambió el plan del paseo y sí puedo elegir un lugar techado.~buscar un lugar techado|Ya envié la propuesta y sí puedo preparar mi explicación.~preparar mi explicación|El horario cambió y puedo revisar qué ruta queda disponible.~revisar una ruta posible|No sé cómo evaluarán el trabajo y puedo consultar los criterios.~consultar los criterios de evaluación|El grupo aún no elige un día y yo puedo decir cuáles tengo libres.~comunicar mis días disponibles|La hora de entrega ya pasó y puedo preguntar qué opciones hay.~preguntar qué opciones quedan|Mi cita depende de una respuesta y puedo revisar los materiales que llevaría.~revisar mis materiales|Una persona no puede venir y yo puedo ajustar la actividad a quienes sí estarán.~ajustar la actividad al grupo|No tengo el resultado del trámite y puedo anotar cuándo consultarlo.~anotar cuándo consultar el resultado|La reunión cambió de lugar y puedo avisar a quien me acompaña.~avisar a quien me acompaña',
    lead: 'Para avanzar con lo que está a mi alcance, puedo ',
    pairs: [['@', 'dejar espacio para lo que se confirmará después'], ['insistir en que todo vuelva al plan original', 'dejar mi parte sin atender'], ['imaginar el resultado exacto', 'organizarme como si ya hubiera ocurrido'], ['esperar a controlar todos los detalles', 'posponer el único paso que sí puedo dar']],
    hint: 'Separa la acción disponible del resultado incierto.',
    feedback: 'Dar un paso que depende de ti permite avanzar mientras lo demás se aclara.'
  },
  {
    contexts: 'Hoy conseguí abrir el libro, aunque solo leí una página.~haber leído esa página|Llegué al primer ensayo, aunque todavía no me sé la canción.~haber ido al ensayo|Escribí el primer párrafo y el texto sigue incompleto.~haber empezado el borrador|Caminé un tramo corto y decidí volver al sentirme cansado.~haber hecho ese tramo|Compartí una idea en una reunión en la que me cuesta hablar.~haber expresado mi idea|Empecé a ordenar los apuntes, aunque solo hice una pila.~haber ordenado la primera parte|Pedí una aclaración en clase en vez de quedarme con la duda.~haber preguntado en clase|Preparé el cuaderno para mañana, aunque no avancé la tarea.~haber preparado el material|Me tomé una pausa después de notar que estaba distraído.~haber hecho una pausa a tiempo|Releí el mensaje antes de enviarlo, aunque todavía podría mejorarlo.~haber revisado el mensaje',
    lead: 'Para reconocer un avance concreto, puedo ',
    pairs: [['valorar @', 'elegir qué quiero retomar en otro momento'], ['medirlo solo por todo lo que falta', 'dar por hecho que no avancé'], ['compararlo con el resultado de otra persona', 'usar esa comparación como nota'], ['prometer duplicar el esfuerzo mañana', 'dejar de lado lo que sí hice hoy']],
    hint: 'El primer espacio puede nombrar algo que efectivamente hiciste.',
    feedback: 'Reconocer una acción concreta permite ver el avance y decidir qué sigue.'
  }
];

const variantsPerScenario = 10;
const contextRows = scenarios.map(scenario => scenario.contexts.split('|'));

export const phraseExtraRounds = Array.from({ length: variantsPerScenario }, (_, variant) =>
  scenarios.map((scenario, topicIndex) => {
    const [context, detail = ''] = contextRows[topicIndex][variant].split('~');
    const correct = (variant * 3 + topicIndex) % 4;
    const options = scenario.pairs.map((_, index) =>
      scenario.pairs[(index - correct + 4) % 4].map(part => part.replaceAll('@', detail))
    );
    return {
      parts: [`${context} ${scenario.lead}`, ' y ', '.'],
      options,
      correct,
      hint: scenario.hint,
      feedback: scenario.feedback
    };
  })
).flat();
