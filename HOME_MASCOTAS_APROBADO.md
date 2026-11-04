# Mascotas del Home · regla final aprobada

El 2 de noviembre de 2026 el usuario aprueba la mascota elegida sin recuadro y la interacción al tocar su figura en el Home. Aclara que aplica a las tres mascotas y únicamente a esa página; el resto conserva la concordancia con la elegida y muestra imágenes estáticas.

Reglas fijadas para celular y computadora:

- Brotecito, Nubecita y Lunita comparten el mismo comportamiento, usando sus PNG originales transparentes.
- En el Home, la mascota elegida se muestra sin panel, fondo rectangular, borde o sombra de tarjeta. Solo la parte visible del personaje reacciona al toque; el espacio transparente no activa nada. Conservar acceso con teclado y movimiento reducido.
- El botón para elegir aparece solo cuando todavía no hay una mascota elegida, debajo de las figuras del selector actual. Se conserva tal cual ese control con sus tres mascotas y su recuadro.
- Con mascota elegida no se muestra «Volver a elegir». Esta última aclaración sustituye ese botón de la primera vista previa y su propuesta de cambio manual el mismo día.
- En Métodos, Favoritos, Más y demás espacios personales se mantiene la imagen estática de la mascota elegida, sin reacción táctil del personaje ni botón añadido. No extender el comportamiento del Home a esas pantallas.
- Los controles propios de selección, biblioteca e historias conservan su finalidad; las escenas de categorías con tres personajes aprobadas y el gatito del diario no cambian.
- Mantener el aviso automático de elección una vez al día y la regla existente de una compañía elegida por día. No crear otra selección distinta por página.

La referencia funcional está en `work/home-mascota-libre/`. La vista previa se ajusta a esta aclaración; la app y el respaldo 4.9 aún no se modifican. Se reserva este cambio para la siguiente entrega conjunta.

Integrado en Respira 4.10 para la entrega solicitada el 4 de noviembre de 2026. Se conserva la composición de la vista aprobada, con interacción sobre el canal alfa de los PNG originales, acceso con teclado y limpieza de temporizadores al navegar.

## Corrección solicitada después de probar 4.10

El 4 de noviembre de 2026 el usuario aclara que tocar la figura debe abrir el perfil personal de la mascota elegida. Se retiran los mensajes emergentes y la animación añadida. Debajo de la figura elegida aparece un botón pequeño «Volver a elegir», dentro de la misma zona del Home indicada por el usuario. Esta instrucción sustituye la regla anterior que ocultaba ese botón.

Aplica a las tres mascotas, en celular y computadora. Los píxeles transparentes no abren el perfil; el teclado sí. «Volver a elegir» abre el selector existente y permite cambiar manualmente la compañía del día; cancelar conserva la actual. La oferta automática continúa siendo una vez al día. El selector sin elección y los demás diseños se conservan. Cambios de trabajo pendientes de revisión y próxima entrega; el respaldo entregado sigue siendo 4.10.
