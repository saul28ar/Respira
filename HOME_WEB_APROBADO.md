# Home web aprobado · Jardín 3

El 28 de octubre de 2026, el usuario eligió la propuesta 3 para el Home de computadora e indicó conservarla tal cual.

Referencia visual: propuesta Jardín, 1600×1000 píxeles CSS, exportada a 2400×1500. Se conservan la cabecera, el paisaje superior y de fondo, el saludo, el botón azul de calma, la elección de compañía, las cuatro tarjetas y el diario lavanda con gatito.

El Home de computadora se implementa con HTML, CSS y JavaScript reales. Los paisajes y el gatito utilizan los mismos PNG de mayor resolución de la propuesta elegida, copiados sin modificar a `imagenes/inicio-web/`.

- Componente: `js/components/home-desktop.js`.
- Estilos aislados: `css/home-desktop.css`.
- Selección de pantalla y acciones: `js/app.js`.
- Marco de la aplicación: `js/components/interface.js`.

El Home anterior de celular permanece en `js/components/home.js` y `css/home.css`. La presentación de computadora se activa desde 768 píxeles; los teléfonos táctiles horizontales de hasta 1024×600 conservan el Home móvil.

Si ya hay una compañía elegida para hoy, el mismo panel muestra esa mascota y abre su perfil. El resto del diseño y las funciones se mantienen. Los welcome aprobados de computadora y celular conservan su diseño.

Esta entrega se prepara para cargarla manualmente; no publica el sitio automáticamente.
