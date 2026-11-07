# Mi espacio para escribir · diseño elegido

El 6 de noviembre de 2026 se eligió la propuesta 1 «Mi agenda»: calendario, lista de fechas y hoja crema con lomo y cinta lavanda. Se pidió añadir varias páginas por día y únicamente «Mi lista de hoy» de la propuesta 5. Mantener el gatito, logo y paisaje aprobados.

La implementación de trabajo abre `#detail/journal`. Cada fecha conserva páginas independientes y tareas con casillas; permite añadir páginas, escribir, guardar y volver a una fecha con el calendario. «Guardar página» guarda el documento completo; editar y cambiar una tarea conserva el borrador sin guardarlo todavía. Al cambiar de fecha/página o salir, «Recuerda guardar tu página» permite seguir escribiendo o guardar y continuar. Un error conserva el borrador y bloquea la salida; Atrás/adelante respetan el aviso y recargar/cerrar usa el aviso nativo. La ocultación o salida efectiva de la app mantiene un guardado de respaldo para cierres abruptos del móvil. No se añade eliminación de páginas.

La agenda usa `respira_journalAgenda_v1`. La nota antigua `respira_journal` se conserva intacta y se importa una sola vez como «Nota anterior». Las notas, favoritos, elección de compañía y demás claves existentes no se borran. Un fallo de cuota conserva el borrador en memoria e informa del error. Si la lectura inicial falla o la agenda tiene un formato desconocido, se impide sobrescribir datos no recuperados.

Después se solicitaron cinco ejemplos de la combinación y hojas de fondo más pequeñas en PC. Las vistas en `work/diario-agenda-cinco-ajustes/` conservan la base y varían la posición de lista, días y páginas. Son ejemplos en memoria, sin escribir notas reales. La distribución elegida es «Pequeños pasos» con el acabado 2 «Pestañas de cuaderno». No se genera ZIP ni se sustituye el respaldo 4.11 hasta la próxima descarga solicitada.

Pruebas de funciones: `work/qa-diario-agenda/`. Vistas y verificación de 320, 390, 768 y 1600 px: `work/diario-agenda-cinco-ajustes/informe.json`.

Siguiente selección: se eligió «Pequeños pasos», propuesta 3. Se pidieron solo dos ejemplos con las páginas trasladadas arriba del papel (marca verde) y quitar la leyenda «Días con una página», el icono de hoja junto a la cabecera del editor, la frase al pie de la hoja y el icono de hoja del pie general (marcas amarillas). Vistas en `work/diario-agenda-dos-ajustes/`; sin nueva entrega ni cambio de producción por estos dos acabados. Se conserva todo lo demás del diseño 3, incluido el fondo con hojas pequeñas en PC.

Selección final: ajuste 2, integrado en producción de trabajo. Nombre de la página y etiquetas accesibles: «Mi espacio para escribir». En PC se conserva la distribución elegida. En celular el orden es «Mi lista de hoy», «Calendario», «Mis páginas» y la hoja; los tres primeros son desplegables compactos. Aclaración del 7 de noviembre: el calendario queda abierto inicialmente, mientras tareas y páginas quedan cerradas. Conservan su estado al editar, con preferencias independientes de escritorio. Las pestañas continúan arriba de la hoja. Mantener papel crema, lomo, cinta lavanda, gatito, logo y paisaje aprobados.

Validación final: 28 pruebas de almacenamiento/controlador y 26 comprobaciones reales de navegador, incluidas PC, 390/320 px y teléfono horizontal. Informe y capturas en `work/qa-espacio-escribir-final/`. Referencia: `referencias/aprobadas/espacio-escribir-final.json`. Datos ficticios en navegador de prueba aislado. Cambio reservado para la próxima entrega conjunta, sin nuevo ZIP ni reemplazo del respaldo 4.11.

Entregado el 7 de noviembre de 2026 en Respira 4.12, solo cambios desde4.11. Paquete limpio, calendario movil abierto y respaldo unico actualizado; verificaciones en work/qa-entrega-412/.
