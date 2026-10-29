# Revisión de Respira 4.6 · Métodos 10 aprobado

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
