# Welcome aprobado · Respira 4.4

Aprobación del usuario: 28 de octubre de 2026.

Computadora: propuesta web 2, Esmeralda. Se mantienen el fondo, logo, tipografía, textos, enlaces, márgenes, botón, marco inclinado de la imagen y fila inferior aprobados. La referencia se capturó a 1600×1000 píxeles CSS, exportada a 2400×1500.

Celular: portada final recibida, conservada como PNG de 941×1671. Se muestra completa y proporcional; si la pantalla tiene otra proporción, se centra y los márgenes exteriores se rellenan con los colores del fondo. No se recortan las mascotas ni se estira la imagen.

Archivos originales incluidos:

- `imagenes/welcome/portada-aprobada-v2.png`
- `imagenes/welcome/boton-iniciar-original-v2.png`
- `imagenes/welcome/logo-aprobado-v2.png`

El botón ilustrado tiene un control HTML independiente con foco y nombre accesible. Su contenido visual usa la misma zona del PNG aprobado para conservar la letra menor y su ubicación exacta. El botón original transparente permanece incluido para futuras ediciones. Ambos botones Iniciar de computadora y el de celular abren el selector de compañía.

Los cuatro inicios aprobados se conservan sin cambios visuales. Esta entrega no publica el sitio automáticamente.
# Corrección de encuadre · 29 de octubre de 2026

El usuario pidió quitar las franjas de color que aparecían encima y debajo de la portada en celular. `css/welcome-mobile-v2.css` hace que el mismo PNG aprobado cubra la altura visible, conservando su proporción. En teléfonos altos ajusta el encuadre lateral; en horizontal permite bajar por la portada hasta Iniciar. No se regeneran el logo, las mascotas ni el botón. La presentación de computadora se conserva.

# Bordes móviles aprobados · 2 de noviembre de 2026

El usuario elige la propuesta 3, «Difuminado natural», y pide guardarla para la próxima entrega. Se fija la referencia `work/welcome-bordes-preview/Respira_Welcome_Bordes_03.png` y sus fuentes mediante `referencias/aprobadas/welcome-bordes-difuminado-3.json`.

Conservar la portada, el logo, las mascotas, el botón y el encuadre. El cambio pedido es extender visualmente los colores del paisaje, suavizados, a los bordes superior e inferior del welcome móvil para evitar las franjas blancas. Las barras de sistema de la referencia son una simulación para revisar el acabado; la integración deberá comprobar el resultado real según el teléfono, navegador y modo instalado, sin prometer que CSS controle las barras nativas en todos los dispositivos. No cambiar el welcome de computadora.

Esta aprobación queda reservada para la siguiente entrega junto con la entrada de compañía una vez al día, descrita en ENTRADA_DIARIA_APROBADO.md. La app y el respaldo entregados 4.9 se mantienen hasta preparar esa actualización conjunta; no generar un ZIP por esta aprobación aislada.

Integrado en Respira 4.10 para la entrega conjunta del 4 de noviembre de 2026. Las áreas seguras del welcome móvil prolongan el paisaje con difuminado y el color del navegador acompaña al fondo. No se simulan barras nativas en la aplicación; su acabado real depende del teléfono y navegador. Portada, logo, botón y diseño de computadora conservan sus archivos originales.

