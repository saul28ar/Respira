# Barra móvil original confirmada

El usuario confirmó los cuatro PNG de la barra: Inicio, Métodos, Favoritos y Más. Pidió usarlos en absolutamente todas las páginas de celular y conservarlos sin cambiar colores, letras, hojas, iconos ni diseño. Los archivos originales de 1812 × 160 px tienen resolución suficiente; se copian sin modificar a `imagenes/interfaz/barras/` y sus huellas se guardan en `referencias/aprobadas/barra-movil-original.json`.

`js/components/mobile-navigation.js` y `css/mobile-navigation.css` muestran una única barra común en las pantallas móviles, incluidos bienvenida, selección, perfiles, listados y ejercicios. La imagen se conserva entera y proporcional, con cuatro enlaces reales superpuestos y áreas táctiles de al menos 44 px. El estado activo sigue su sección: Inicio para bienvenida y mascotas, Métodos para catálogo y ejercicios, Favoritos y Más para sus páginas. Las barras anteriores quedan ocultas únicamente en teléfonos; PC conserva su presentación.

La bienvenida móvil deja espacio para la misma barra sin tapar Iniciar. Se incluyen los teléfonos táctiles en horizontal con la misma definición que el Home y el welcome. Los originales no se estiran, recortan ni regeneran. La integración y la corrección del fondo móvil de Métodos quedan guardadas para revisión y para la siguiente entrega conjunta solicitada; el respaldo de la última entrega continúa en 4.11.

QA: `work/qa-barra-movil-aprobada/informe.json`, con vistas previas de los cuatro estados y las pantallas principales. Las 28 rutas se comprobaron en celular y PC; los diseños de PC coinciden con el respaldo 4.11.

Entregado el 7 de noviembre de 2026 en Respira 4.12, solo cambios desde4.11. Paquete limpio, calendario movil abierto y respaldo unico actualizado; verificaciones en work/qa-entrega-412/.
