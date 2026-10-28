# Revisión de Respira 4.4 · Welcome aprobado

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
