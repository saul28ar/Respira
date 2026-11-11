function round(parts, options, correct, hint, feedback) {
  return { parts, options, correct, hint, feedback };
}

export const phraseRounds = [
  // Hechos e incertidumbre
  round(
    ['Mi mensaje sigue sin respuesta. Para separar lo que sé de lo que imagino, el hecho es ', ' y mi interpretación es ', '.'],
    [['que lo vio', 'que está ocupado'], ['que no he recibido respuesta', 'que está molesto conmigo'], ['que está molesto conmigo', 'que no ha respondido'], ['que necesita espacio', 'que mañana responderá']],
    1, 'Busca primero algo que se pueda comprobar.', 'La falta de respuesta es observable. El motivo sigue siendo una posibilidad.'
  ),
  round(
    ['Mañana pueden cambiar el horario y hoy ya hice la consulta. Mientras espero, puedo ', ' y ', ' cuando llegue la respuesta.'],
    [['revisar el chat cada diez minutos', 'dejar el plan decidido'], ['organizar solo para el horario nuevo', 'avisar que ya cambió'], ['posponer toda preparación', 'resolverlo todo de inmediato'], ['preparar lo que sirve para ambos horarios', 'ajustar lo que dependa del cambio']],
    3, 'Distingue lo que ya puedes preparar de lo que depende de la respuesta.', 'Preparar lo común te deja avanzar y conserva el margen para cambiar el resto.'
  ),
  round(
    ['La reunión se movió al viernes. Para no tratar una suposición como una noticia, puedo ', ' y ', '.'],
    [['anotar el cambio de fecha', 'preguntar qué debo preparar'], ['asumir que están inconformes', 'rehacer mi trabajo antes de preguntar'], ['consultar si alguien también se inquietó', 'tomar su reacción como confirmación'], ['comprobar la fecha nueva', 'atribuir el cambio a mi intervención']],
    0, 'La nueva fecha está confirmada. El motivo aún puede ser una pregunta.', 'Puedes responder a lo confirmado y aclarar directamente qué necesitas saber.'
  ),
  round(
    ['Me preocupa llegar tarde y sí puedo revisar la ruta. Para cerrar esa parte del plan, voy a ', ' y ', '.'],
    [['imaginar todos los retrasos posibles', 'decidir cuando ya esté afuera'], ['preparar una ruta', 'seguir buscando una que garantice llegar a tiempo'], ['revisar una ruta y elegir una hora de salida', 'dejar el resto para cuando haya información nueva'], ['preguntar a tres personas qué harían', 'esperar a que todas coincidan']],
    2, 'El objetivo es resolver la decisión disponible, aunque el trayecto conserve alguna incertidumbre.', 'Una ruta y una hora de salida forman un plan que puedes usar.'
  ),
  round(
    ['Estoy esperando una nota. Ya sé a qué hora se publicará. Si quiero volver a mi tarea actual, puedo ', ' y ', '.'],
    [['quedarme en la página de notas', 'estudiar entre una actualización y otra'], ['anotar cuándo podré consultarla', 'volver a un paso concreto de la tarea'], ['intentar calcular mi nota exacta', 'estudiar cuando termine la cuenta'], ['decidir qué nota merezco', 'buscar comentarios que confirmen mi cálculo']],
    1, 'Puedes decidir cuándo mirar la nota, aunque todavía no puedas conocerla.', 'Separar el momento de consultar del momento de trabajar te permite dar el siguiente paso.'
  ),
  // Tareas y tiempo
  round(
    ['Ya sé qué tarea toca y tengo diez minutos. Si quiero dejar una parte hecha, puedo ', ' y ', '.'],
    [['volver a revisar todos mis pendientes', 'ordenarlos del más al menos difícil'], ['empezar por la parte más larga', 'seguir hasta terminarla'], ['elegir una acción que quepa en ese rato', 'hacer esa parte antes de pasar a otra'], ['preparar un plan detallado', 'buscar una forma más rápida de hacer cada paso']],
    2, 'Busca una acción que puedas completar dentro del tiempo disponible.', 'Una acción pequeña puede dejar un avance concreto en diez minutos.'
  ),
  round(
    ['Tengo una entrega mañana y dos tareas para la próxima semana. Para usar bien esta tarde, voy a ', ' y ', '.'],
    [['reservar primero un bloque para la entrega próxima', 'anotar cuándo retomaré las otras tareas'], ['empezar por la tarea más agradable', 'repartir el resto del tiempo por igual'], ['alternar entre las tres a intervalos iguales', 'terminar con la que quede más corta'], ['hacer primero las tareas de la próxima semana', 'dejar el bloque más largo para la noche']],
    0, 'La fecha más cercana importa y las otras tareas también necesitan un lugar en el plan.', 'Dar prioridad a la entrega cercana y dejar fechas para el resto reduce decisiones repetidas.'
  ),
  round(
    ['El plan de la mañana cambió y ahora me queda la mitad de tiempo. Si quiero conservar lo esencial, puedo ', ' y ', '.'],
    [['mantener todas las tareas', 'hacerlas en la mitad de tiempo'], ['mover todo al día siguiente', 'empezar desde cero entonces'], ['cumplir el orden original', 'dejar para el final lo que falte'], ['elegir lo imprescindible para hoy', 'dar otra fecha a lo que pueda esperar']],
    3, 'Ajusta tanto el alcance de hoy como el lugar de los pendientes.', 'Puedes cuidar el objetivo principal y reprogramar el resto sin borrar lo ya planeado.'
  ),
  round(
    ['Tengo un encargo amplio y no sé qué espera quien me lo pidió. Antes de dedicarle una tarde, conviene ', ' y ', '.'],
    [['empezar el formato que más me gusta', 'preguntar por los requisitos al terminar'], ['seguir el último ejemplo que conozco', 'dar por hecho que sirve para este encargo'], ['confirmar el resultado y el plazo', 'definir el primer paso con esa información'], ['pedir todos los detalles posibles', 'esperar a tener la versión final del plan']],
    2, 'La primera decisión depende de dos datos que la otra persona puede aclarar.', 'Conocer el resultado esperado y el plazo ayuda a elegir por dónde empezar.'
  ),
  round(
    ['Esta semana quiero probar un hábito pequeño. Para comprobar si cabe en mis días, puedo ', ' y ', '.'],
    [['elegir cinco hábitos relacionados', 'marcarlos todos al final de la semana'], ['unirlo a una rutina que ya hago', 'observar qué días puedo sostenerlo'], ['dejarlo para cuando tenga un rato libre', 'evaluar el hábito por el primer día'], ['fijarlo siempre a la misma hora', 'duplicarlo cuando se me pase']],
    1, 'Piensa en una señal fácil de reconocer y en lo que aprenderías de varios días.', 'Usar una rutina como señal te permite observar cómo encaja el hábito en tu horario.'
  ),
  // Pantallas y atención
  round(
    ['Quiero una pausa de las notificaciones sin perder un aviso de mi familia. Puedo ', ' y ', '.'],
    [['silenciar los avisos que me distraen', 'permitir los del contacto importante'], ['poner el teléfono en modo avión', 'revisar los mensajes al terminar'], ['bajar el brillo de la pantalla', 'dejar todos los avisos activos'], ['activar el silencio para todos', 'consultar el teléfono a cada rato']],
    0, 'Busca una pausa que conserve el canal importante.', 'Puedes limitar las interrupciones y mantener disponible el contacto que necesitas.'
  ),
  round(
    ['Al abrir la aplicación para contestar un mensaje termino desplazándome por el inicio. Si quiero responder y salir, puedo ', ' y ', '.'],
    [['revisar primero lo nuevo', 'contestar cuando llegue al mensaje'], ['apagar todas las notificaciones', 'buscar el chat entre las novedades'], ['abrir el inicio y poner un límite de tiempo', 'dejar la conversación para otro momento'], ['abrir directamente la conversación', 'cerrar la aplicación al enviar la respuesta']],
    3, 'Una decisión afecta dónde entras y la otra cuándo sales.', 'Ir al chat y cerrar después conecta el uso de la aplicación con tu propósito.'
  ),
  round(
    ['Un contenido me altera y quiero elegir qué veo al volver. Antes de seguir, puedo ', ' y ', '.'],
    [['comparar más videos del mismo tema', 'decidir si estaba exagerando'], ['cerrar la aplicación un momento', 'silenciar ese contenido si sigue apareciendo'], ['silenciar toda la aplicación de forma indefinida', 'recuperar las alertas cuando se me olvide'], ['seguir leyendo los comentarios', 'cerrar solo al llegar al final']],
    1, 'Distingue una pausa inmediata de un ajuste para la próxima vez.', 'Puedes apartarte ahora y usar los controles de contenido si vuelve a aparecer.'
  ),
  round(
    ['Voy a comer con alguien y necesito responder un mensaje antes de sentarme. Para dedicarle la comida a la conversación, puedo ', ' y ', '.'],
    [['avisar que contestaré durante la comida', 'tener el móvil al lado'], ['mirar el chat al sentarme', 'responder solo si llegan más mensajes'], ['enviar la respuesta antes de la comida', 'guardar el móvil para conversar'], ['pedir que me escriban después', 'revisar el teléfono por si llega una respuesta']],
    2, 'Ya sabes qué mensaje necesita respuesta y cuándo quieres apartar el teléfono.', 'Cerrar la tarea pendiente antes facilita que el teléfono tenga su propio momento.'
  ),
  round(
    ['El grupo de clase sigue enviando memes, pero allí también confirman las entregas. Si quiero menos interrupciones sin perder fechas, puedo ', ' y ', '.'],
    [['silenciar el grupo por un rato', 'revisarlo a una hora prevista para anotar las fechas'], ['archivar el chat hasta el fin de semana', 'preguntar por las fechas cuando venza el plazo'], ['dejar todos los avisos', 'entrar cada vez que vibre el teléfono'], ['salir del grupo', 'esperar que alguien me reenvíe lo importante']],
    0, 'Reducir avisos funciona mejor si conservas una forma concreta de enterarte a tiempo.', 'Consultar el grupo en un momento previsto mantiene el acceso a los avisos con menos interrupciones.'
  ),
  // Pedir apoyo
  round(
    ['Quiero hablar de lo que me pasa y todavía no quiero sugerencias. Puedo pedir ', ' y dejar para después ', '.'],
    [['que elijan por mí qué hacer', 'contar cómo me siento'], ['una opinión rápida', 'aclarar si quiero consejos'], ['que me cuenten qué harían', 'decidir qué solución prefiero'], ['que me escuchen un momento', 'pensar en posibles soluciones']],
    3, 'En este momento buscas escucha. Las decisiones pueden tener su espacio luego.', 'Pedir escucha aclara qué apoyo te vendría bien en ese momento.'
  ),
  round(
    ['Una amiga quiere acompañarme a una cita y yo quiero poder hablar por mí. Podemos acordar que ', ' y ', '.'],
    [['explique toda la situación', 'yo complete lo que falte'], ['esté conmigo al llegar', 'intervenga solo si se lo pido'], ['espere fuera aunque me gustaría que entre', 'decida después qué cree que dije'], ['hable primero por mí', 'me pregunte al final cómo fue']],
    1, 'La compañía puede ser útil sin quitarte la palabra.', 'Acordar de antemano cómo quieres que participe deja espacio para tu propia voz.'
  ),
  round(
    ['Quiero pedir orientación sobre algo que lleva días afectando mi rutina. Para explicarme con claridad, puedo preparar ', ' y ', '.'],
    [['una conclusión sobre lo que tengo', 'una lista de tratamientos que ya decidí'], ['todos los mensajes de esta semana', 'solo lo que ocurrió ayer'], ['cuándo empezó y cómo afecta mi día', 'las preguntas que quiero hacer'], ['lo que opinan los demás de mí', 'solo una palabra para describirlo']],
    2, 'En una consulta ayuda describir lo que ocurre y lo que deseas aclarar.', 'Contar el inicio y el efecto cotidiano da contexto. Tus preguntas también orientan la conversación.'
  ),
  round(
    ['La persona con la que pensaba hablar hoy está ocupada. Si todavía quiero compañía esta tarde, puedo ', ' y ', '.'],
    [['preguntar a otra persona de confianza', 'decirle qué tipo de apoyo me serviría'], ['dejarle varios mensajes seguidos', 'suponer que me responderá pronto'], ['esperar hasta que pueda esa misma persona', 'retomar la idea solo si pregunta'], ['contarle a alguien que no me inspira confianza', 'pedirle que decida qué hacer por mí']],
    0, 'Que una persona no esté disponible cambia el plan de hoy, no lo que necesitas.', 'Puedes buscar otra compañía y comunicar qué apoyo deseas.'
  ),
  round(
    ['No me sale explicar todo lo que pasó, pero quiero abrir la conversación. Puedo ', ' y ', '.'],
    [['esperar hasta tener la historia completa', 'ensayar cada detalle antes de pedir tiempo'], ['empezar por lo más difícil', 'seguir hablando aunque quiera parar'], ['contar primero lo que esperan escuchar', 'dejar fuera lo que me preocupa'], ['contar una parte que pueda compartir', 'decir que por ahora prefiero dejar el resto']],
    3, 'Abrir una conversación puede consistir en decir algo breve y poner un límite.', 'Compartir a tu ritmo te permite iniciar el contacto y conservar tu privacidad.'
  ),
  // Límites
  round(
    ['Ya terminé mi parte del trabajo y hoy necesito descansar. Si quiero ser claro sin prometer más, puedo ', ' y ', '.'],
    [['decir que trataré de ayudar hoy', 'ver después si me alcanza el tiempo'], ['decir que hoy no puedo asumir otra tarea', 'ofrecer otro momento solo si tengo margen'], ['aceptar una parte pequeña', 'mover mi descanso si hace falta'], ['pedir que me cuenten toda la tarea', 'dejar mi respuesta para más tarde']],
    1, 'Busca una respuesta que aclare tu disponibilidad sin crear otro compromiso.', 'Un límite claro dice qué puedes ofrecer. La alternativa es opcional.'
  ),
  round(
    ['Quiero asistir a la reunión, pero solo puedo quedarme media hora. Para evitar confusiones, puedo ', ' y ', '.'],
    [['llegar un poco antes', 'irme al llegar a mi límite sin avisar'], ['avisar de mi horario', 'quedarme mientras los demás quieran continuar'], ['aceptar la reunión completa', 'buscar una excusa si necesito salir'], ['decir desde el principio hasta qué hora puedo', 'despedirme cuando llegue ese momento']],
    3, 'El límite tiene una parte que se comunica y otra que se cumple.', 'Avisar la hora facilita organizar la reunión y te deja salir en el momento acordado.'
  ),
  round(
    ['Me invitaron a un plan y todavía no sé si tengo tiempo. Si quiero responder sin comprometerme antes de revisar, puedo ', ' y ', '.'],
    [['pedir un plazo breve para confirmar', 'dar mi respuesta a la hora que acuerde'], ['decir que sí por ahora', 'avisar a última hora si no puedo'], ['pedir que me aparten un lugar', 'esperar a que pregunten de nuevo'], ['dar una respuesta vaga', 'confirmar solo si finalmente voy']],
    0, 'Busca una forma de pedir tiempo y de cerrar el compromiso de responder.', 'Un plazo concreto cuida tu decisión y le permite a la otra persona organizarse.'
  ),
  round(
    ['Un compañero quiere usar mi cuaderno. Me parece bien prestarlo y lo necesito mañana. Para que el acuerdo funcione, puedo ', ' y ', '.'],
    [['prestarlo ahora', 'esperar que recuerde devolvérmelo'], ['decirle que lo necesito pronto', 'confiar en que entienda cuándo'], ['proponer una hora de devolución', 'confirmar si puede cumplirla antes de prestarlo'], ['prestarlo solo un rato', 'pedirlo cuando me haga falta']],
    2, 'El préstamo necesita un momento de devolución que ambas personas entiendan.', 'Una hora clara y confirmada convierte tu condición en un acuerdo práctico.'
  ),
  round(
    ['Me gustaría ayudar en el proyecto, pero esta semana solo puedo revisar una página. Al aceptar, voy a ', ' y ', '.'],
    [['decir que puedo revisarlo', 'explicar el límite cuando me manden el archivo'], ['delimitar qué parte puedo revisar', 'acordar cuándo enviaré esa revisión'], ['prometer comentarios generales', 'añadir otra parte si me la piden'], ['pedir que elijan todas las páginas importantes', 'resolver el alcance al terminar']],
    1, 'El alcance y la fecha se pueden acordar antes de empezar.', 'Con una parte y una fecha claras, la otra persona sabe con qué ayuda cuenta.'
  ),
  // Descanso
  round(
    ['Mañana tengo que madrugar y me queda una tarea que puede esperar. Para reservar tiempo de descanso, puedo ', ' y ', '.'],
    [['terminar lo pendiente esta noche', 'recuperar tiempo de descanso mañana'], ['dejar el trabajo abierto', 'retomarlo desde la cama si recuerdo algo'], ['fijar una hora de cierre', 'anotar el primer paso para mañana'], ['anotar lo que falta', 'seguir hasta que me entre sueño']],
    2, 'Piensa en cómo cerrar el día sin perder el hilo de la tarea.', 'Una hora de cierre protege el descanso. La nota te deja un punto de partida.'
  ),
  round(
    ['A la hora de acostarme sigo pensando en un trámite de mañana. Si quiero dejarlo preparado y cerrar, puedo ', ' y ', '.'],
    [['anotar la hora y el material que necesito', 'pasar a una actividad tranquila'], ['repasar el trámite completo una vez más', 'buscar nuevos detalles desde la cama'], ['intentar quitarme la idea a toda costa', 'dejar la preparación para el último minuto'], ['hacer una lista de todos mis trámites', 'empezar hoy los que tengo para otro día']],
    0, 'Basta con dejar a mano la información que vas a usar mañana.', 'Dejar el trámite por escrito te permite dar por terminada su preparación de hoy.'
  ),
  round(
    ['Comparto habitación y hay luz cuando intento descansar. Si quiero probar un ajuste que respete a ambos, puedo ', ' y ', '.'],
    [['pedir que apague todo a mi hora', 'decidir yo cada noche qué luz puede usar'], ['usar una luz de mi lado', 'dejar abierta la conversación para otro día'], ['pedir que siempre se mude a otra habitación', 'guardar el tema hasta que me moleste otra vez'], ['acordar una luz más localizada', 'probar si una barrera cómoda me sirve']],
    3, 'Busca un ajuste acordado y una alternativa que dependa de ti.', 'Una luz localizada y una opción propia permiten probar un arreglo para el espacio compartido.'
  ),
  round(
    ['Si me cuesta bajar el ritmo al final de la tarde y quiero cambiar una sola cosa, puedo ', ' y ', '.'],
    [['adoptar una rutina nueva completa', 'juzgarla por lo que pase esta noche'], ['probar una actividad tranquila antes de acostarme', 'observar durante varios días cómo encaja'], ['esperar a que el día esté perfectamente organizado', 'elegir la actividad al final de la semana'], ['probar una actividad tranquila', 'hacerla solo si me garantiza dormir pronto']],
    1, 'Elige una prueba concreta y una forma de observarla con margen.', 'Probar un ajuste durante varios días da más contexto que exigir un resultado inmediato.'
  ),
  round(
    ['Me despierto cansado con frecuencia y eso ya dificulta mi día. Para buscar orientación, puedo ', ' y ', '.'],
    [['cambiar varias cosas a la vez', 'esperar a saber con certeza cuál era el problema'], ['describir mis horarios y cómo me afecta el cansancio', 'consultar a un profesional de salud'], ['decidir por mi cuenta por qué pasa', 'llevar solo esa conclusión a la consulta'], ['apuntar la hora de acostarme de una noche', 'usar solo ese dato para decidir qué me ocurre']],
    1, 'No hace falta identificar la causa antes de pedir orientación.', 'Los horarios y el efecto durante el día son información útil para una consulta.'
  ),
  // Movimiento a tu ritmo
  round(
    ['Llevo bastante rato sentado y solo tengo unos minutos antes de la siguiente clase. Si quiero moverme un poco, puedo ', ' y ', '.'],
    [['esperar a disponer de una hora', 'compensar después con más intensidad'], ['copiar la actividad de quien tenga más energía', 'probar a mantener su ritmo'], ['hacer el recorrido más largo del edificio', 'apurarme para no llegar tarde'], ['elegir un recorrido breve o moverme en mi sitio', 'ajustarlo al tiempo y a cómo me siento']],
    3, 'La pausa debe caber en el tiempo real y adaptarse a ti.', 'Moverte un poco puede ser un cambio de postura, unos pasos o una opción en tu asiento.'
  ),
  round(
    ['Quería salir a caminar, pero está lloviendo. Si quiero mantener la idea de moverme con comodidad, puedo ', ' y ', '.'],
    [['buscar una opción cubierta o en casa', 'elegir una duración razonable para hoy'], ['hacer el mismo recorrido al aire libre', 'mantener la distancia aunque no sea cómodo'], ['cambiar por una rutina más intensa', 'mantener la duración original'], ['dejar el movimiento para otro día', 'duplicar el tiempo cuando salga el sol']],
    0, 'Puedes conservar el propósito y cambiar el lugar o la duración.', 'Adaptar el plan al entorno te deja hacer una versión posible hoy.'
  ),
  round(
    ['Una amiga va más rápido que yo y quiero acompañarla sin forzar mi ritmo. Podemos ', ' y ', '.'],
    [['elegir su ritmo habitual', 'hacer pausas solo al final'], ['hacer la misma distancia', 'mantener el paso aunque me resulte incómodo'], ['acordar un tramo que podamos compartir', 'avisar si necesitamos cambiar de ritmo'], ['partir al mismo tiempo', 'dar por hecho que iremos siempre juntos']],
    2, 'Acompañarse requiere un acuerdo que sirva para las dos personas.', 'Un tramo compartido y la libertad de ajustar el ritmo hacen el plan más flexible.'
  ),
  round(
    ['Hoy tengo menos energía que cuando hice el plan. Si quiero mantener un momento de movimiento, puedo ', ' y ', '.'],
    [['hacer toda la sesión', 'descansar solo cuando la termine'], ['probar una versión más breve y cómoda', 'permitirme parar si no me sienta bien'], ['mantener la sesión prevista', 'decidir mañana si era demasiado'], ['cambiar el ejercicio por uno más exigente', 'hacerlo rápido para acabar antes']],
    1, 'Ajusta el esfuerzo antes de empezar y conserva la opción de detenerte.', 'La duración y el esfuerzo pueden cambiar según cómo estés ese día.'
  ),
  round(
    ['Quiero moverme un poco más y no sé qué actividad me gusta. Para explorar sin comprometerme, puedo ', ' y ', '.'],
    [['elegir la actividad más popular', 'comprar lo necesario antes de probarla'], ['repetir la rutina que menos disfruté', 'medir si llego al ritmo de los demás'], ['pedir que otra persona elija por mí', 'dar por hecho que tendrá el mismo efecto para ambos'], ['probar dos opciones accesibles en días distintos', 'notar cuál me resulta más agradable']],
    3, 'Busca una prueba reversible y un criterio que puedas valorar por ti.', 'Una prueba breve te permite observar qué disfrutas y qué cabe en tu rutina.'
  ),
  // Reconocer emociones
  round(
    ['Después de la reunión noto la mandíbula tensa y me cuesta decir qué siento. Puedo ', ' y ', '.'],
    [['describir lo que noto en el cuerpo', 'probar un nombre sin darlo por definitivo'], ['elegir de inmediato una emoción', 'tomar la tensión como prueba de que acerté'], ['preguntar a otra persona qué siente', 'usar su emoción para nombrar la mía'], ['esperar a poder nombrarlo con precisión', 'evitar mirar lo que noto hasta entonces']],
    0, 'Primero puedes describir una señal. El nombre puede ser provisional.', 'Observar y ensayar un nombre son dos pasos distintos. Puedes revisar la palabra más adelante.'
  ),
  round(
    ['Me alegró recibir una oportunidad y también me asusta el cambio. Para nombrar lo que me pasa, puedo ', ' y ', '.'],
    [['quedarme con la emoción más intensa', 'considerar que la otra no cuenta'], ['escoger la emoción que suena mejor', 'intentar sentir solo esa'], ['reconocer las dos emociones', 'dar tiempo para ver qué necesita cada una'], ['separar cuál emoción es correcta', 'actuar como si la otra no existiera']],
    2, 'Dos emociones pueden aparecer en la misma situación.', 'Puedes sentir ilusión y miedo a la vez y atenderlos de formas diferentes.'
  ),
  round(
    ['Estoy molesto y tengo listo un mensaje que quizá diga más de lo que quiero. Si mi objetivo es responder con cuidado, puedo ', ' y ', '.'],
    [['enviarlo y aclarar después lo que quiso decir', 'esperar a ver si causó un problema'], ['dejarlo en borrador un momento', 'revisar qué quiero comunicar antes de enviarlo'], ['esperar a sentirme completamente bien', 'evitar el tema hasta entonces'], ['revisar solo la ortografía', 'enviarlo si está escrito sin errores']],
    1, 'Una pausa breve puede servirte para distinguir el propósito del mensaje de la urgencia de enviarlo.', 'El borrador te deja revisar si tus palabras transmiten lo que quieres decir.'
  ),
  round(
    ['Me preguntan cómo estoy y todavía no tengo una palabra clara. Si quiero contestar con honestidad, puedo decir ', ' y ', '.'],
    [['«estoy bien» por costumbre', 'hacer como que ya no quiero hablar'], ['«sé exactamente lo que me pasa»', 'elegir una explicación después'], ['«no tengo nada»', 'esperar que la otra persona adivine'], ['«todavía estoy tratando de entenderlo»', 'contar lo que sí puedo describir']],
    3, 'La respuesta puede reconocer la duda y aportar una observación concreta.', 'Puedes hablar de lo que notas sin tener que encontrar una etiqueta definitiva.'
  ),
  round(
    ['Siento inquietud y no quiero sacar conclusiones apresuradas sobre por qué. En mi nota puedo registrar ', ' y ', '.'],
    [['lo que noto ahora', 'qué estaba ocurriendo antes'], ['la causa que me parece más probable', 'un dato que encaje con esa causa'], ['lo que me dijeron que debía sentir', 'una explicación que suene convincente'], ['lo más incómodo que podría pasar', 'la prueba de que seguro pasará']],
    0, 'Registra observaciones antes de decidir si tienen una explicación común.', 'Lo que notas y el contexto son datos que puedes revisar con calma.'
  ),
  // Trato amable
  round(
    ['Me equivoqué al explicar una idea y quiero corregirla sin juzgarme como persona. Puedo decir ', ' y ', '.'],
    [['«siempre me pasa»', '«mejor evito volver a explicar algo»'], ['«no importa lo que dije»', '«prefiero que quede así»'], ['«ese ejemplo se entendió mal»', '«puedo aclararlo con otro»'], ['«fue culpa de la audiencia»', '«volveré a usar el mismo ejemplo»']],
    2, 'Busca una descripción específica y una acción que se pueda intentar.', 'Un ejemplo que no salió como querías puede revisarse sin sacar una conclusión sobre tu capacidad.'
  ),
  round(
    ['Hoy no completé un hábito que me importa. Si quiero volver mañana sin imponerme una deuda, puedo ', ' y ', '.'],
    [['anotar qué se interpuso hoy', 'retomar mañana en una escala posible'], ['compensar mañana haciendo el doble', 'medir el hábito por la suma de ambos días'], ['borrar todo el progreso anterior', 'contar una nueva racha desde cero'], ['retomar mañana solo si tengo un día libre', 'esperar un momento ideal']],
    0, 'Una interrupción ofrece información. Volver no exige compensarla.', 'Puedes ajustar el siguiente intento sin convertir el día anterior en una obligación extra.'
  ),
  round(
    ['A una amiga en mi situación le diría que hizo lo que pudo. Para darme el mismo trato y aprender, puedo ', ' y ', '.'],
    [['decirme que todo salió bien', 'pasar por alto lo que quiero cambiar'], ['repasar solo lo que falló', 'usar un tono más duro para recordarlo'], ['pedir que otras personas juzguen mi esfuerzo', 'aceptar solo el comentario más exigente'], ['reconocer el esfuerzo que hice', 'elegir una mejora concreta']],
    3, 'Reconocer el esfuerzo y revisar un detalle pueden ir juntos.', 'Puedes tratarte con amabilidad y decidir qué harías de otra forma la próxima vez.'
  ),
  round(
    ['Escuché un comentario crítico y quiero sacar algo útil sin quedarme con el tono. Puedo ', ' y ', '.'],
    [['copiar el comentario completo', 'usarlo como evaluación general de mí'], ['separar la observación concreta del tono', 'decidir si hay una mejora que quiera probar'], ['rechazar cualquier observación', 'evitar volver a pedir opinión'], ['poner en práctica todo lo que me dijeron', 'cambiar lo demás por si también molestó']],
    1, 'La observación puede ser útil aunque el tono no te sirva.', 'Puedes evaluar un detalle concreto y elegir qué hacer con él.'
  ),
  round(
    ['Quiero anotar un logro pequeño sin minimizarlo ni exagerarlo. Puedo escribir ', ' y ', '.'],
    [['«esto fue demasiado fácil para contar»', '«solo apuntaré algo cuando sea importante»'], ['«si pude hoy, siempre debo poder»', '«mañana me toca hacer el doble»'], ['«hoy hice la llamada que posponía»', '«me costó empezar y aun así la hice»'], ['«todos habrían hecho lo mismo»', '«solo valdrá si sale como espero»']],
    2, 'Describe el hecho y reconoce el esfuerzo que sí tuvo para ti.', 'Anotar una acción concreta deja constancia de lo que hiciste hoy.'
  ),
  // Perfeccionismo
  round(
    ['El borrador de bajo riesgo cumple lo acordado y tengo que enviarlo hoy. Para cerrar la revisión, puedo ', ' y ', '.'],
    [['comprobar la lista de requisitos una vez', 'enviarlo cuando estén cubiertos'], ['hacer una revisión más cada vez que dude', 'enviarlo cuando desaparezca la duda'], ['enviarlo sin mirar los requisitos', 'preguntar luego qué faltaba'], ['cambiar el objetivo de la entrega', 'avisar después de que ya lo haya cambiado']],
    0, 'El criterio de cierre puede ser observable y no depender de cómo te sientas.', 'Los requisitos acordados sirven para decidir cuándo está listo un borrador de bajo riesgo.'
  ),
  round(
    ['Estoy haciendo un dibujo para disfrutar y llevo rato rehaciendo una esquina. Si quiero probar otra forma de seguir, puedo ', ' y ', '.'],
    [['borrar todo el dibujo', 'empezar de nuevo con una idea más fácil'], ['buscar más referencias para esa esquina', 'seguir corrigiéndola hasta que quede idéntica'], ['guardar el dibujo sin terminar', 'retomarlo solo si encuentro una técnica perfecta'], ['pasar a otra zona durante un rato', 'decidir al final si esa esquina necesita otro ajuste']],
    3, 'Puedes cambiar dónde pones tu atención sin decidir ahora que el detalle está terminado.', 'Avanzar en otra zona te permite valorar el conjunto antes de volver a ese detalle.'
  ),
  round(
    ['Una parte de mi exposición salió torpe, pero el resto se entendió. Para evaluar con proporción, puedo ', ' y ', '.'],
    [['calificar toda la exposición por ese momento', 'preparar otra desde cero'], ['anotar qué sí quedó claro', 'practicar únicamente el pasaje que quiero mejorar'], ['quedarme con lo que salió bien', 'evitar revisar cualquier cosa incómoda'], ['pedir una nota general', 'usar esa nota para decidir qué frase falló']],
    1, 'Elige una revisión que reconozca el conjunto y ubique un cambio puntual.', 'Un pasaje difícil y varios pasajes claros pueden coexistir en la misma exposición.'
  ),
  round(
    ['El grupo necesita una versión de trabajo, y las correcciones se harán entre todos. Antes de enviarla puedo ', ' y ', '.'],
    [['dejarla en privado hasta pulir todos los detalles', 'pedir comentarios solo cuando sea final'], ['enviar el archivo sin contexto', 'esperar que adivinen qué revisar'], ['marcar qué partes están pendientes', 'compartirla para recibir comentarios sobre lo acordado'], ['pedir una evaluación final', 'cambiar después el alcance sin comunicarlo']],
    2, 'La revisión compartida necesita un borrador con su estado claro.', 'Mostrar qué queda abierto permite usar el borrador para el propósito que acordaron.'
  ),
  round(
    ['Quiero aprender una receta sencilla y ya comparé varias versiones. Para hacer una primera prueba de poco riesgo, puedo ', ' y ', '.'],
    [['elegir una receta que pueda seguir', 'anotar qué ajustaría después de probarla'], ['combinar todas las versiones', 'decidir al probar si seguí alguna correctamente'], ['seguir buscando hasta encontrar la mejor', 'cocinar solo si todas las fuentes coinciden'], ['cambiar de receta a mitad de camino', 'usar el resultado para juzgar la primera versión']],
    0, 'Una prueba manejable te da información que comparar recetas por sí solo no te da.', 'Puedes aprender de una versión concreta y decidir cambios para la próxima.'
  ),
  // Comparación
  round(
    ['Vi el resultado de alguien en redes y empecé a medir mi progreso con esa publicación. Para revisar la comparación, puedo ', ' y ', '.'],
    [['averiguar cuánto tardó exactamente', 'usar ese tiempo para medir el mío'], ['recordar qué parte del proceso no conozco', 'revisar mi propio avance con un criterio claro'], ['buscar a alguien que esté más atrás', 'usar su resultado para sentirme mejor'], ['dejar de ver todas las publicaciones', 'decidir después si lo mío cuenta']],
    1, 'La publicación muestra una parte. Tu progreso se puede mirar con datos propios.', 'Puedes reconocer lo que ignoras del contexto ajeno y elegir una referencia que sí conoces.'
  ),
  round(
    ['Me gusta cómo alguien organiza sus mañanas, pero mi horario es distinto. Si quiero aprender sin copiarle el ritmo, puedo ', ' y ', '.'],
    [['probar su horario completo', 'medir si logro lo mismo en una semana'], ['descartar todas sus ideas', 'seguir con lo que hago aunque quiera probar un cambio'], ['elegir solo lo que lleva más tiempo', 'buscar luego un espacio donde acomodarlo'], ['identificar una idea que sí cabe en mi día', 'probarla con mi propio horario']],
    3, 'Puedes tomar una idea sin adoptar las condiciones de la otra persona.', 'Una idea adaptada es más fácil de evaluar en tu vida cotidiana.'
  ),
  round(
    ['Un amigo logró algo que deseo y me alegra por él, aunque también me comparo. Para cuidar ambas cosas, puedo ', ' y ', '.'],
    [['felicitarlo por lo que consiguió', 'anotar qué parte de mi propio objetivo quiero retomar'], ['dejar de hablarle del tema', 'ponerme su misma fecha como meta'], ['felicitarlo', 'convertir su resultado en una regla para medir el mío'], ['pedirle su plan completo', 'decidir que ese es el único camino que funciona']],
    0, 'Puedes compartir su alegría y elegir una acción que tenga sentido para tu situación.', 'Celebrar a alguien y cuidar tu objetivo son decisiones que pueden convivir.'
  ),
  round(
    ['Me recomendaron comparar mi avance con el mío. Para que la comparación sea concreta y justa, puedo mirar ', ' y ', '.'],
    [['mi mejor día del año', 'el resultado más flojo de esta semana'], ['la cantidad de horas de todos', 'la que me habría gustado tener'], ['un intento previo en condiciones similares', 'un cambio específico que pueda observar'], ['un recuerdo de cómo me sentía al empezar', 'una meta tomada de otra persona']],
    2, 'Compara ejemplos parecidos y define qué cambio quieres observar.', 'Una referencia comparable y una mejora concreta dicen más que una impresión general.'
  ),
  round(
    ['La cuenta que sigo a veces me inspira y otras veces me deja comparándome durante horas. Si quiero observar ese efecto, puedo ', ' y ', '.'],
    [['buscar más cuentas parecidas', 'decidir por el promedio cuál me afecta'], ['silenciarla por un tiempo acordado conmigo', 'notar si cambia cómo uso ese rato'], ['seguir viéndola igual', 'evaluarla solo por la publicación que más me gustó'], ['dejar de seguirla y buscarla por separado cada día', 'anotar solo si publicó algo nuevo']],
    1, 'Prueba un cambio reversible y observa tu experiencia, además del contenido.', 'Una pausa breve te permite valorar qué espacio quieres darle a esa cuenta.'
  ),
  // Acompañar una pérdida
  round(
    ['Después de la pérdida de mi mascota, hoy quiero recordar y también hacer algo cotidiano. Puedo ', ' y ', '.'],
    [['esperar a que el recuerdo deje de doler', 'hacer planes solo después'], ['hacer planes todo el día', 'evitar cualquier recuerdo hasta mañana'], ['elegir entre recordar y hacer mi rutina', 'seguir solo una de las dos cosas'], ['dedicar un rato a un recuerdo que quiera guardar', 'retomar una actividad cotidiana cuando me apetezca']],
    3, 'Las dos necesidades pueden tener espacio el mismo día.', 'Recordar a alguien querido y seguir con una actividad cotidiana pueden ir juntos.'
  ),
  round(
    ['Una persona cercana está de duelo. Quiero ofrecer compañía sin presionarla para hablar. Puedo ', ' y ', '.'],
    [['proponerle una forma concreta de acompañarla', 'dejarle espacio para elegir o decir que no'], ['preguntarle si ya se siente mejor', 'esperar a que cambie de tema para ofrecer ayuda'], ['contarle primero cómo viví mi propia pérdida', 'pedirle que diga si le pasa lo mismo'], ['anunciar que pasaré a verla', 'decidir al llegar de qué vamos a hablar']],
    0, 'Una oferta concreta deja a la otra persona decidir si le sirve.', 'Puedes proponer una visita o un paseo y respetar el ritmo de la persona.'
  ),
  round(
    ['Creí que ya estaba más tranquilo y un recuerdo me entristeció otra vez. Para hacerle espacio a lo que siento, puedo ', ' y ', '.'],
    [['decidir que volví al principio', 'comparar cuándo debería haber pasado esto'], ['apartar el recuerdo de inmediato', 'evaluar si lo hice bien al final del día'], ['reconocer que hoy apareció la tristeza', 'elegir una forma de cuidarme en este momento'], ['identificar qué etapa corresponde hoy', 'esperar pasar a la siguiente antes de pedir apoyo']],
    2, 'Un cambio en lo que sientes no impone un orden al duelo.', 'La tristeza puede aparecer en distintos momentos. Puedes atender lo que necesitas hoy.'
  ),
  round(
    ['Se acerca una fecha que me hace recordar una pérdida. Para prepararme sin fijar cómo me debo sentir ese día, puedo ', ' y ', '.'],
    [['planear todo el día en detalle', 'mantener cada actividad aunque cambien mis ganas'], ['dejar abierta una opción de compañía', 'darme permiso para cambiar el plan'], ['decidir desde hoy si voy a hablar del tema', 'evitar avisar si luego necesito apoyo'], ['esperar que el día sea como el anterior', 'medir si cumplí la expectativa']],
    1, 'Preparar apoyo no requiere saber con anticipación cómo te sentirás.', 'Un plan flexible ofrece compañía si la quieres y margen para elegir ese día.'
  ),
  round(
    ['Alguien perdió a un ser querido y me pregunta si puedo ayudar con una tarea. Para ofrecer una ayuda que pueda cumplir, puedo ', ' y ', '.'],
    [['prometer que resolveré todo', 'avisar si no alcanzo a hacerlo'], ['pedirle que explique primero cómo se siente', 'decidir luego si ayudaré'], ['encargarme de algo sin consultar', 'informarle cuando esté hecho'], ['acordar una tarea concreta', 'confirmar cuándo podré hacerla']],
    3, 'La persona ya hizo una petición. Define qué parte puedes asumir y cuándo.', 'Una ayuda concreta y acordada permite contar con tu apoyo sin añadir incertidumbre.'
  ),
  // Escucha y reparación
  round(
    ['Una amiga me cuenta algo y no sé si quiere compañía o ideas. Antes de responder, puedo ', ' y ', '.'],
    [['preguntar qué le serviría ahora', 'adaptar mi respuesta a lo que me diga'], ['empezar por mi mejor idea', 'preguntar si quería escucharla al final'], ['decirle lo que me funcionó a mí', 'tomar su silencio como acuerdo'], ['preguntar qué necesita', 'dar consejos si tarda en contestar']],
    0, 'Es posible preguntar y respetar la respuesta, aunque no sea la que esperabas.', 'Preguntar primero te permite ofrecer el tipo de apoyo que la persona busca.'
  ),
  round(
    ['Discutí con alguien y levanté la voz. Quiero reparar esa parte de la conversación. Puedo ', ' y ', '.'],
    [['explicar por qué me alteré', 'esperar que la otra persona se disculpe primero'], ['pedir disculpas en general', 'cambiar de tema para evitar nombrar lo ocurrido'], ['reconocer que levanté la voz', 'preguntar si podemos retomar la conversación con más calma'], ['expresar que lamento que se molestara', 'repetir lo que dije en el mismo tono']],
    2, 'La reparación se vuelve concreta cuando nombras tu acción y propones un paso posible.', 'Reconocer lo que hiciste y abrir una conversación distinta deja claro qué quieres reparar.'
  ),
  round(
    ['En una conversación entendí algo que quizá la otra persona no quiso decir. Para comprobarlo con respeto, puedo ', ' y ', '.'],
    [['dar por buena mi primera lectura', 'preguntar solo si estoy en desacuerdo'], ['decir qué entendí con mis palabras', 'preguntar si interpreté bien su mensaje'], ['pedirle que repita exactamente la frase', 'usar la misma interpretación que antes'], ['explicar que su mensaje fue confuso', 'dejarle a ella toda la tarea de aclararlo']],
    1, 'Dale a la otra persona la oportunidad de corregir tu interpretación.', 'Una paráfrasis y una pregunta permiten comprobar el sentido sin asumirlo.'
  ),
  round(
    ['Estoy conversando sobre algo importante y necesito una pausa. Quiero retomar el tema después. Puedo ', ' y ', '.'],
    [['cambiar de tema sin decir por qué', 'esperar que la otra persona decida cuándo volver'], ['aguantar hasta acabar la conversación', 'explicar mañana que necesitaba parar'], ['pedir una pausa', 'dejar el tema abierto hasta que se olvide'], ['decir que necesito detenerme un rato', 'proponer cuándo podemos seguir']],
    3, 'Una pausa y un cierre definitivo son cosas distintas. Haz visible cómo quieres continuar.', 'Proponer cuándo retomar ayuda a que la pausa sea clara para ambas personas.'
  ),
  round(
    ['Una amistad me ofreció apoyo y ahora no puedo seguir hablando. Si quiero reconocer su gesto y cerrar por hoy, puedo ', ' y ', '.'],
    [['agradecer que me haya escuchado', 'decir que necesito dejar la conversación por hoy'], ['prometer que contaré todo esta noche', 'seguir cuando me sienta con más energía'], ['responder con otra pregunta', 'esperar que note que quiero terminar'], ['agradecerle el apoyo', 'seguir hasta responder todo para que no se preocupe']],
    0, 'Puedes reconocer el gesto y poner el límite en el mismo mensaje.', 'Agradecer y decir que necesitas parar deja claro lo que valoras y lo que te hace falta.'
  ),
  // Volver al momento
  round(
    ['Estoy en la fila y mi mente salta de pendiente en pendiente. Quiero orientarme a lo que está pasando aquí. Puedo notar ', ' y ', '.'],
    [['lo que hice antes de llegar', 'la próxima tarea en el orden del día'], ['la explicación más probable de mi inquietud', 'cuándo se me va a pasar'], ['un sonido cercano', 'el contacto de mis pies con el suelo'], ['los dos lugares a los que tengo que ir después', 'qué podría pasar si llego tarde']],
    2, 'Elige señales que estén ocurriendo en este momento.', 'Un sonido cercano y el contacto con el suelo son detalles del entorno presente.'
  ),
  round(
    ['Al intentar seguir el aire, me distraigo con un pensamiento. Para volver a la práctica, puedo ', ' y ', '.'],
    [['examinar el pensamiento hasta resolverlo', 'volver cuando ya no aparezca'], ['notar que mi atención se fue', 'volver a una respiración natural'], ['volver a empezar el ejercicio', 'considerar que lo anterior no cuenta'], ['tratar de empujar el pensamiento fuera', 'contener el aire hasta recuperar la atención']],
    1, 'Volver puede ser un gesto simple. No hace falta reiniciar la práctica.', 'Puedes notar la distracción y retomar tu punto de atención con la respiración de siempre.'
  ),
  round(
    ['En el autobús quiero probar una pausa con los ojos abiertos. Puedo observar ', ' y ', ' sin perder de vista mi parada.'],
    [['qué dirán las personas al verme', 'cada pensamiento que me cruza'], ['una imagen que imagino lejos de aquí', 'lo que espero que pase al bajar'], ['el viaje completo en el mapa', 'todas las notificaciones que lleguen'], ['un color a mi alrededor', 'el apoyo de mi cuerpo en el asiento']],
    3, 'Hay señales del presente que puedes notar con los ojos abiertos y sin dejar de atender tu entorno.', 'Puedes usar un detalle visual y un punto de apoyo mientras sigues pendiente de la parada.'
  ),
  round(
    ['Quiero escuchar una canción con atención. Si me voy a otra idea, puedo ', ' y ', '.'],
    [['notar que me distraje', 'volver a un instrumento que esté sonando'], ['detener la canción cada vez', 'volver al inicio hasta no distraerme'], ['buscar la letra en otra pestaña', 'seguir leyendo cuando cambie la melodía'], ['tratar de reconocer todos los instrumentos', 'evaluar si me faltó alguno al final']],
    0, 'Busca una forma de volver a lo que suena ahora, sin convertirlo en una prueba.', 'Elegir un sonido concreto te da un punto al que volver cuando lo desees.'
  ),
  round(
    ['Antes de entrar a clase quiero hacer una pausa breve sin dejar de estar disponible. Puedo ', ' y ', '.'],
    [['cerrar los ojos hasta que todo quede en silencio', 'entrar solo cuando deje de estar nervioso'], ['revisar mentalmente todo lo que diré', 'intentar recordar cada detalle'], ['notar cómo sostengo mi mochila', 'observar qué puedo ver desde donde estoy'], ['medir cuánto tarda en irse mi inquietud', 'decidir si entro según ese resultado']],
    2, 'La pausa puede usar señales que ya tienes a mano y durar solo unos instantes.', 'Tu postura y lo que ves son dos formas sencillas de notar el lugar donde estás.'
  ),
  // Cuidados cotidianos
  round(
    ['Quiero retomar la lectura y hoy solo tengo unos minutos. Si quiero disfrutar del rato sin ponerme una cuota, puedo ', ' y ', '.'],
    [['calcular cuántas páginas debería leer al día', 'continuar hasta llegar a esa cifra'], ['leer un fragmento que me interese', 'marcar dónde quedé al cerrar el libro'], ['buscar el libro ideal para empezar', 'dejar para otro día la lectura'], ['leer deprisa el capítulo más corto', 'medir el rato por cuánto avancé']],
    1, 'El rato puede tener un comienzo sencillo y un cierre que te permita volver.', 'Puedes leer por interés y detenerte donde tenga sentido hoy.'
  ),
  round(
    ['Llevo un rato estudiando y quiero hacer una pausa que me permita volver sin perder el hilo. Puedo ', ' y ', '.'],
    [['cambiar a otra tarea difícil', 'regresar cuando termine la segunda'], ['descansar hasta que sienta ganas de seguir', 'buscar el punto de inicio cuando vuelva'], ['seguir hasta resolver todo', 'hacer una pausa después de la sesión'], ['dejar anotado el siguiente paso', 'hacer una pausa breve antes de retomarlo']],
    3, 'La pausa puede empezar con una marca que te ahorre reconstruir lo que estabas haciendo.', 'Una nota del siguiente paso facilita retomar la tarea después de descansar.'
  ),
  round(
    ['Hoy una comida no salió como planeé y me estoy hablando con dureza. Para continuar con cuidado, puedo ', ' y ', '.'],
    [['describir qué ocurrió sin insultarme', 'seguir con mis comidas habituales'], ['decidir que perdí el control de todo el día', 'hacer reglas más estrictas para mañana'], ['repetirme que no debió pasar', 'posponer la próxima comida hasta sentirme mejor'], ['comparar mi plato con el de otra persona', 'usar su elección como regla para mí']],
    0, 'Busca una respuesta que separe un hecho de un juicio y cuide lo que viene después.', 'Una comida no define tu valor. Puedes volver a tu rutina y hablarte con respeto.'
  ),
  round(
    ['Quiero saber si la cafeína de la tarde coincide con que me cueste descansar. Para observarlo sin concluir por un solo día, puedo anotar ', ' y ', '.'],
    [['solo las noches en las que descansé mal', 'la explicación que me parece más convincente'], ['lo que toma otra persona por la tarde', 'si a ella le ocurre lo mismo que a mí'], ['qué bebidas con cafeína tomé y a qué hora', 'cómo descansé y qué otros cambios hubo esos días'], ['si compré café durante la semana', 'un único horario de sueño para todos los días']],
    2, 'Registra la exposición y el descanso. Otros cambios también pueden aportar contexto.', 'Las notas ayudan a observar coincidencias con más contexto. Una coincidencia por sí sola no identifica la causa.'
  ),
  round(
    ['Hace semanas que no dibujo y hoy quiero probar otra vez sin convertirlo en una prueba. Puedo ', ' y ', '.'],
    [['elegir un objeto sencillo para dibujar', 'observar cómo me resulta sin exigirme disfrutar enseguida'], ['buscar un curso completo', 'aplazar el primer intento hasta elegirlo'], ['repetir mi dibujo más difícil', 'decidir si sigo según el resultado'], ['planear una racha de un mes', 'calificar el intento por si completé la primera hora']],
    0, 'La primera prueba puede ser breve. El disfrute no es una condición que tengas que cumplir.', 'Una versión sencilla te permite probar la actividad y decidir con calma si quieres volver.'
  ),
];
