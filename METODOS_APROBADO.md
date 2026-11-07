# Métodos aprobado · Por secciones 1

El 29 de octubre de 2026, el usuario aprobó la propuesta 1 de organización por secciones para celular y computadora: «la 1 está perfecto, guárdalo para la siguiente entrega». Esta aprobación actualiza la distribución de Métodos 10 y conserva su estilo. Queda integrada en el código de trabajo, pendiente de la siguiente entrega conjunta; no preparar otro ZIP por esta aprobación aislada.

Referencia visual: `work/metodos-categorias-tres/index.html?v=1` y las capturas `Respira_Metodos_Categorias_01_Movil.png` y `Respira_Metodos_Categorias_01_Web.png` de esa misma carpeta. Sus huellas y las fuentes aprobadas se registran en `referencias/aprobadas/metodos-por-secciones-1.json` sin duplicar imágenes.

Mantener las cinco secciones abiertas, accesos de categoría, tarjetas originales, dos columnas en computadora, lista en celular y barra aprobada. Cada método aparece una sola vez:

- Respiración: Respiración 4-4-4-4.
- Meditación: Calma en 5 minutos, Reducir la ansiedad, Dormir mejor y Amor propio.
- Técnicas rápidas: Técnica 5-4-3-2-1, Relajación muscular y Reencuadre mental.
- Consejos: Evita la cafeína en exceso, Muévete un poco, Desconéctate un rato y Habla con alguien.
- Escribe lo que sientes: diario.

La clasificación de `js/method-categories.js` se comparte con los listados abiertos desde el Home. Los corazones guardan favoritos reales y las tarjetas abren los ejercicios actuales. `css/method-details.css` lleva el mismo fondo maestro aprobado a los trece métodos y a sus listados, sin reescribir textos, tiempos o controles.

La mascota del encabezado depende de la compañía elegida, conforme a `MASCOTAS_APROBADO.md`. Con Nubecita elegida, la composición coincide con la propuesta mostrada. Las ilustraciones originales se conservan.

El 30 de octubre de 2026 el usuario solicita la entrega conjunta. Esta aprobación se incorpora a Respira 4.9 acumulada junto con el resto de cambios aprobados.

## Aprobación anterior

El 28 de octubre de 2026, el usuario eligió la propuesta 10 para la página de Métodos en computadora y celular.

Se conservan el paisaje de fondo, el encabezado con Nubecita, los colores, las dos columnas web, la lista móvil, las tarjetas, los iconos y la barra de navegación de la propuesta elegida. Los 13 métodos mantienen sus títulos y descripciones originales.

El diseño se implementa con HTML, CSS y JavaScript. Los botones abren los ejercicios existentes y los corazones usan los favoritos reales de Respira. No se utiliza el diálogo de demostración de las propuestas.

Archivos de esta parte:

- `js/components/methods.js`: contenido de Métodos y controles.
- `css/methods.css`: diseño adaptable y estilos aislados.
- `js/app.js`: conexión con las rutas, favoritos y ejercicios.
- `js/components/interface.js`: evita duplicar la cabecera y la barra de navegación en esta página.

Se reutilizan los archivos de `imagenes/inicio-web/`, `imagenes/mascotas/` y `imagenes/welcome/`, sin modificarlos. El Home y los welcome aprobados se conservan.

La entrega histórica 4.6 incluyó la aplicación completa y un ZIP con solo cambios respecto de Respira 4.5. La política vigente para entregas posteriores es `ENTREGAS.md`.

## Ilustraciones aprobadas el 6 de noviembre de 2026

El usuario aprobó las imágenes 1–12 de personas acompañadas por las mascotas y eligió la opción 3 del gatito para «Escribe lo que sientes». Solicitó integrarlas únicamente en las trece tarjetas de la página Métodos, sin cambiar las demás páginas.

Los originales y sus huellas están registrados en `referencias/aprobadas/metodos-personas-mascotas-v2.json`. Las copias para la app se guardan en `imagenes/metodos/` como WebP sin pérdida, con los mismos píxeles y resolución de los PNG aprobados. Cada escena se muestra completa dentro del marco existente. Se conservan títulos, descripciones, categorías, tamaños de tarjetas, controles y encabezado con la compañía elegida.

No se sustituyen recursos compartidos de `imagenes/inicio-web/`: el Home, Favoritos, Más, welcome, selector y detalles de ejercicios conservan sus imágenes. El caché sin conexión incorpora los trece archivos nuevos. Esta integración se entrega en Respira 4.11 sobre 4.10.1, con un único ZIP de cambios y el mismo respaldo completo actualizado después de verificarlo.

El usuario pidió después cuadrar las fotos también en celular, sin franjas ni relleno difuminado. Los marcos quedan cuadrados, de 120 × 120 px en computadora y tablet y de 114 × 114 px en celular, llenos con la imagen original completa. Se mantienen el alto de las tarjetas, sus textos y controles; el ajuste está aislado en los estilos de Métodos. No se regeneran ni recortan los archivos aprobados.
