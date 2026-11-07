# Ilustraciones del Home · selección aprobada

El 30 de octubre de 2026, el usuario aprobó las cuatro ilustraciones seleccionadas y pidió adaptarlas también al celular e incorporarlas a la próxima actualización conjunta. Se conectan al Home móvil Jardín sereno 1 y al Home web Jardín 3, conservando posiciones, tamaños, textos, iconos, colores y acciones de las tarjetas.

Selección fija, en el orden de las tarjetas:

- Respiración: panel superior izquierdo de la propuesta 1, «Brisa suave».
- Meditación: panel superior derecho de la propuesta 5, «Pequeños rituales».
- Técnicas rápidas: panel inferior izquierdo de la propuesta 2, «Jardín luminoso».
- Consejos: panel inferior derecho de la propuesta 3, «Una pausa juntos».

La selección del usuario está en `work/tarjetas-mascotas-seleccion/seleccion.json`; las referencias y sus huellas quedan fijadas en `referencias/aprobadas/tarjetas-home-mascotas.json`. Los cuatro PNG originales se conservan sin modificar en `imagenes/tarjetas/escenas-01.png`, `escenas-02.png`, `escenas-03.png` y `escenas-05.png`. No se incluyen las otras propuestas en la app.

`js/components/home-card-art.js` define una única ventana SVG por escena y la comparte entre computadora y celular. Esto conserva los píxeles y proporciones de los originales, evita volver a generar las imágenes y deja fuera las líneas divisorias. Las imágenes se adaptan dentro de los mismos espacios de las tarjetas aprobadas.

Estas cuatro escenas muestran a Brotecito, Nubecita y Lunita juntos realizando la actividad, tal como pidió el usuario. El panel personal de compañía del Home y los encabezados de Métodos, Favoritos y Más siguen mostrando únicamente la compañía elegida para hoy; véase MASCOTAS_APROBADO.md.

Estado: integrado y guardado para la siguiente entrega conjunta. Se agregan el módulo y los cuatro recursos al caché sin conexión. No preparar un ZIP ni reemplazar el respaldo de la última entrega por esta aprobación aislada.

El 30 de octubre de 2026 el usuario pide entregar todos los cambios juntos. Las cuatro ilustraciones se incluyen en Respira 4.9 acumulada, junto con Métodos y la compañía elegida, conservando las aprobaciones anteriores.
