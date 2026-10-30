# Revisión de Respira 4.9 · Todos los cambios aprobados

Actualización del 30 de octubre de 2026:

- 26 comprobaciones de integración aprobadas: cinco categorías, trece métodos sin duplicados, favoritos, navegación de ejercicios, guardado del diario, temporizador y fondo HD compartido. Las tres compañías se mantienen en Home, Métodos, Favoritos y Más después de recargar, tanto en celular como en computadora.
- La página de Métodos de la app coincide píxel por píxel con la propuesta 1 aprobada en las capturas de celular 860×1864 y computadora 2400×1500. El componente también conserva su geometría a 320 y 768 píxeles.
- 30 comprobaciones de las tarjetas nuevas aprobadas en ocho formatos, desde 320 píxeles hasta computadora de 1600 y celular horizontal táctil de 844×390. Se verifican los cuatro recursos, textos, acciones y regreso al Home, sin errores JavaScript ni desbordamientos horizontales.
- Inspección visual de las tarjetas a 320, 430 y 1600 píxeles: las caras de las tres mascotas se mantienen visibles. Los cuatro PNG nuevos coinciden byte por byte con los originales elegidos; no se regeneran ni alteran.
- El módulo compartido de las tarjetas, la clasificación de métodos, el estilo del fondo de ejercicios y las cuatro ilustraciones están incluidos en la nueva caché sin conexión.
- La entrega acumulada compara CRC y SHA256 y simula su aplicación sobre 4.6, 4.7 y las dos variantes entregadas de 4.8 antes de reemplazar el respaldo único. Las imágenes anteriores que no cambian no se repiten.

Informes de trabajo: `work/qa-metodos-secciones-pets/informe.json`, `work/qa-tarjetas-integradas/informe.json` y `work/verificacion-acumulado-49.json`.

La comprobación adicional por HTTP de la actualización de caché quedó limitada por la restricción de acceso a la red local del entorno. Las 56 pruebas funcionales anteriores se ejecutaron con archivos locales; el inventario de la caché y las dependencias del paquete sí están verificados. No se afirma una nueva prueba sin conexión por HTTP para esta entrega.

## Historial: Respira 4.8 · Selección de compañía 4

Actualización del 29 de octubre de 2026:

- Selección de compañía 4 conectada a las acciones y al almacenamiento existentes. Se comprueban las tres elecciones, la persistencia, la regla diaria, las historias, la biblioteca y la entrada opcional.
- 24 comprobaciones del componente aprobadas: sin compañía y con cada mascota a 320, 390, 430, 768, 1024 y 1600 píxeles.
- Celular de referencia 430×932, DPR2: el componente aislado coincide píxel por píxel con la propuesta 4 aprobada. En la app completa hay mínimos redondeos en imágenes filtradas; la geometría y los textos son idénticos.
- En computadora se corrigen exclusivamente los adornos inferiores del fondo: dos ventanas SVG pequeñas del mismo PNG, con proporciones originales y máscaras de transición. Se elimina la ampliación que producía hojas gigantes y borrosas.
- La cabecera y la navegación de esta pantalla se muestran una sola vez. Los estilos están aislados para conservar las otras pantallas aprobadas.
- 25 comprobaciones de integración y 11 comparaciones visuales aprobadas. Las diferencias históricas de rasterizado afectan a menos del 0,05% de píxeles con variación superior a 1/255; no cambian las composiciones ni los PNG originales.
- El paquete se aplica desde 4.7; CRC, hashes y simulación de actualización incremental se verifican antes de reemplazar el respaldo completo único.

## Historial: Respira 4.7 · Home 1, Favoritos 4 y Más 3

Actualización del 29 de octubre de 2026, en Chrome para Windows:

- 25 comprobaciones del conjunto aprobadas: navegación, compañía, favoritos vacíos y completos, persistencia, las tres opciones de Más, diario y temporizador.
- 11 comparaciones visuales aprobadas: nueve exactas y dos con diferencias mínimas de rasterizado del arte. Home móvil 1, Favoritos 4 móvil y web y Más 3 móvil coinciden píxel por píxel. Más 3 web conserva composición y textos exactos; solo 521 píxeles presentan pequeñas variaciones de rasterizado histórico, con RMS de 0,087/255.
- Home móvil verificado con y sin cada una de las tres mascotas a 360, 390 y 430 píxeles: 12 comprobaciones aprobadas.
- Welcome móvil revisado a 360×800, 390×844, 412×915 y 844×390 táctil. La imagen cubre el alto en vertical sin bandas de relleno. En horizontal conserva su proporción y permite llegar a Iniciar mediante desplazamiento.
- Regresión visual del welcome web, Home web y Métodos a 1600×1000 y 1024×768: sin cambios de diseño; únicamente redondeos de hasta 1/255 en una captura del Home web.
- Se reutilizan los PNG aprobados sin alterar sus bytes. Los módulos y estilos nuevos están incluidos en la caché 4.7.
- El empaquetador verifica por CRC y SHA256 que la base 4.6 y el parche produzcan exactamente el respaldo completo actualizado.

## Historial: Respira 4.6 · Métodos 10 aprobado

Actualización del 28 de octubre de 2026:

- 24 comprobaciones por HTTP aprobadas: los 13 métodos en web y celular, títulos y descripciones originales, navegación, teclado, favoritos con persistencia, temporizador y uso sin conexión.
- La app real coincide píxel por píxel con la propuesta 10 en las capturas de referencia web 2400×1650 y celular 860×1864.
- Adaptación comprobada de 320 a 1920 píxeles, sin desbordamiento horizontal ni texto cortado.
- 15 pruebas de regresión aprobadas. El selector de navegación de esa prueba se ajustó a los enlaces visibles, porque Métodos ahora tiene sus versiones web y móvil dentro del mismo componente.
- Los 56 archivos invariantes de la versión 4.5 conservan sus SHA-256; no se modificaron los gráficos aprobados.
- Cuatro Home móviles, Home web y welcome web: capturas idénticas a las anteriores. Welcome móvil: solo redondeos de hasta 1/255 por canal al comparar distintos entornos de captura.
- La entrega se genera completa y como actualización incremental desde 4.5. La combinación de la entrega 4.5 y el ZIP de cambios se compara archivo por archivo y byte por byte con la nueva entrega completa.

## Historial: Respira 4.5 · Home Jardín aprobado

Actualización del 28 de octubre de 2026:

- 22 comprobaciones del Home Jardín aprobadas con servidor HTTP bajo la ruta `/Respira/`: navegación, las siete acciones principales, teclado, compañía diaria, cambios de ancho y uso sin conexión.
- Comparación con la propuesta 3 a 2400×1500: se conserva la geometría y el texto. La diferencia media es inferior a 0,1/255 por canal; solo 27 de 3,6 millones de píxeles superan 2/255, en el muestreo de bordes redondeados de imágenes.
- 15 pruebas de regresión aprobadas, sin errores de JavaScript, consola o recursos.
- Los cuatro Home de celular son idénticos píxel por píxel a las capturas anteriores.
- Los welcome conservan sus archivos, geometría y arte. La comparación entre archivos locales y HTTP presenta únicamente redondeos de hasta 1/255 por canal.
- Los 15 archivos invariantes del Home móvil, welcome, datos y almacenamiento conservan su SHA-256.
- Los cinco PNG HD de Jardín son copias binarias exactas de la propuesta elegida.

## Historial: Respira 4.4 · Welcome aprobado

Actualización del 28 de octubre de 2026, en Chrome para Windows:

- 16 comprobaciones del welcome aprobadas con servidor HTTP bajo la ruta `/Respira/`: enlaces, ambos botones Iniciar, teclado, tamaños y uso sin conexión.
- Escritorio revisado a 768, 1024, 1280, 1440, 1600 y 1920 píxeles de ancho. Captura de comparación a 2400×1500 con el diseño Esmeralda aprobado.
- Móvil revisado a 360×800, 390×844, 430×932 y 600×960; teléfono táctil horizontal a 844×390. La portada se muestra completa y conserva su proporción.
- 15 comprobaciones de regresión aprobadas: mascotas, almacenamiento, navegación, favoritos, diario, respiración, temporizador y pasos de ejercicios.
- Cero errores JavaScript, imágenes rotas o recursos fallidos en los recorridos.
- Los 12 archivos protegidos de estilos, inicio, datos y funciones mantienen su SHA-256 previo.
- Las cuatro capturas del inicio son idénticas píxel por píxel a las capturas anteriores: cero diferencias.
- Foto, logo y botón suministrados conservan sus bytes originales. No se usó generación de imágenes en esta integración.

La prueba sin conexión de esta entrega sí se realizó por HTTP, con instalación de la nueva caché y recarga del welcome sin red.

## Historial: revisión de Respira 4.0

Realizada el 27 de octubre de 2026 con Chrome en Windows, usando el servidor local incluido en el paquete.

**Resultado: 16 recorridos de prueba y 4 comprobaciones adicionales aprobados.** No se detectaron errores de JavaScript ni recursos faltantes durante esos recorridos.

## Comprobado

- Inicio sin compañía y con cada una de las tres mascotas.
- Textos y controles reales, sin antiguas pantallas completas ni zonas invisibles de toque.
- Pantallas principales a 360 y 1280 píxeles de ancho, sin desbordamiento horizontal.
- Selección diaria de mascota y persistencia tras recargar.
- Navegación del menú y las tarjetas principales.
- Respiración: empezar, pausar, reiniciar y completar un ciclo.
- La animación de respiración conserva su posición al pausar.
- Temporizador: empezar, pausar, reiniciar y finalizar después de un salto de tiempo.
- Marcar un favorito mantiene el progreso del temporizador.
- Favoritos: agregar, mostrar, quitar y conservar después de recargar.
- Diario: guardar, recargar, borrar y mostrar las etiquetas HTML como texto.
- Técnica 5-4-3-2-1 y relajación muscular: avanzar y retroceder.
- Apertura de ejercicios sin conexión después de instalar la caché inicial.
- Recuperación ante formatos de datos locales no válidos.
- La mascota del día anterior deja de ser la compañía actual.

También se inspeccionaron visualmente el inicio, la selección y un perfil en tamaños de móvil y escritorio.

## Qué falta revisar contigo

La apariencia y el tamaño de cada pieza, la experiencia en tu teléfono físico, la lectura de los textos y el ritmo que prefieras para los ejercicios. Estas pruebas no equivalen a una revisión clínica ni a certificación para una tienda de aplicaciones.

La versión permanece local, sin publicación. El archivo original 3.18 no fue modificado.

## Actualización: recursos recibidos e interfaz compartida

- Se conservaron y verificaron por SHA-256 los 13 PNG recibidos, sin cambiar sus bytes.
- El lago limpio coincide en píxeles con el paisaje existente y permanece igual.
- Logo, menú superior y barra inferior están agrupados en un componente y tema común.
- Se comprobó en Chrome local la navegación de los cuatro enlaces, su estado activo, el menú y el enlace de marca a 360 y 1280 píxeles de ancho.
- Se verificó que un cambio del filtro del tema afecta simultáneamente a las tres piezas y que no hay desbordamiento horizontal ni errores de JavaScript.
- Se revisaron visualmente el inicio y la barra. Los originales y referencias quedan fuera de la lista de caché; el nuevo módulo, sus estilos y el recurso de marca sí están incluidos.

Esta actualización se revisó con archivos locales. El uso sin conexión indicado arriba corresponde a la prueba de la base anterior; para este ajuste se verificaron las rutas de los nuevos recursos incluidos en su caché.

## Actualización: composición del inicio

- Cuatro variantes (sin compañía, Brotecito, Nubecita y Lunita) revisadas a 320, 360, 400, 600, 768 y 960 píxeles: sin desbordamiento horizontal ni errores de JavaScript.
- Controles del inicio de al menos 44 píxeles de altura, con nombres accesibles y foco visible.
- Revisión visual de las cuatro variantes en móvil y del inicio en escritorio.
- Comprobación de navegación, selección diaria, favoritos, diario, respiración, temporizador y pasos de ejercicios con los archivos locales.
- Se corrigió la separación visible de «Elegir mascota» y se oscureció el fondo del botón de calma para mejorar el contraste de sus textos blancos.
- Las ventanas de arte de las tarjetas excluyen los textos de las referencias. El saludo del fondo no se muestra una segunda vez.
- Los nuevos recursos están incluidos en la lista de caché. Esta revisión no repitió la prueba sin conexión con servidor HTTP.
