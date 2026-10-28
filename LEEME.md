# Respira 4.4 · Welcome aprobado

Esta entrega integra el welcome Esmeralda (versión 2 aprobada) para computadora y la portada aprobada para celular. El texto y la navegación de escritorio son HTML, CSS y JavaScript. La portada conserva el gráfico original; su botón Iniciar es un control HTML visible y accesible que reproduce el arte aprobado. Los cuatro inicios anteriores se mantienen iguales.

## Para cargar esta actualización

Extrae todo el ZIP. Copia su contenido a la carpeta principal de la aplicación o del sitio, conservando las carpetas `css/`, `js/`, `imagenes/` e `iconos/`. `index.html` debe quedar en esa raíz. Para el sitio que ya usas, conserva la misma dirección y ruta.

Después de subirlo, recarga la página. Si el navegador muestra la versión anterior, cierra esa pestaña y ábrela nuevamente; en computadora también puedes usar Ctrl+F5. Se actualizó la caché sin conexión para incluir los nuevos archivos.

Los tres archivos recibidos están incluidos sin modificar en `imagenes/welcome/`: `portada-aprobada-v2.png`, `boton-iniciar-original-v2.png` y `logo-aprobado-v2.png`. El botón transparente se conserva por separado para futuras ediciones. El control de la portada usa una ventana del propio arte aprobado para mantener exactamente el tamaño menor de la palabra Iniciar.

## Cómo abrirla en Windows

1. Extrae **todo el ZIP** en una carpeta.
2. Abre **INICIAR_RESPIRA.cmd** con doble clic.
3. Se abrirá el navegador en `http://127.0.0.1:8765/`.
4. Mantén la ventana de Respira abierta mientras la uses. Para detenerla, cierra esa ventana.

El lanzador usa PowerShell incluido en Windows. No requiere instalar paquetes ni herramientas de desarrollo. Si ya está abierto, utiliza la ventana existente. No basta con abrir `index.html` con doble clic: los módulos de la aplicación necesitan el servidor local.

## Qué incluye esta primera reconstrucción

- Bienvenida, inicio, selector de compañía, biblioteca y tres perfiles en código.
- Los cuatro estados del inicio: sin compañía, Brotecito, Nubecita y Lunita.
- Navegación real, con historial del navegador y acceso con teclado.
- Respiración guiada, meditaciones con temporizador, técnica 5-4-3-2-1, relajación muscular, reencuadre y consejos del proyecto original.
- Favoritos y diario que se guardan en este navegador.
- Una mascota por día, como en la versión original. La elección es opcional.
- Distribución adaptable a móvil y escritorio y controles con nombres accesibles.
- Uso sin conexión después de la primera carga completa y preparación del navegador.

## El código, por partes

| Parte | Archivo | Para qué sirve |
| --- | --- | --- |
| Entrada | `index.html` | Carga la aplicación y sus estilos. |
| Contenido | `js/data.js` | Ejercicios, historias, mensajes y datos de mascotas. |
| Inicio | `js/components/home.js` | Saludo, compañía, tarjetas, calma y diario. |
| Arte del inicio | `js/components/home-art.js` | Fondos y ventanas decorativas de las imágenes originales, sin textos ni controles dibujados. |
| Mascotas | `js/components/companions.js` | Bienvenida, selección, biblioteca y perfiles. |
| Welcome de computadora | `js/components/welcome-desktop.js` | Versión Esmeralda aprobada, con texto y enlaces reales. |
| Welcome de celular | `js/components/welcome-mobile.js` | Portada aprobada completa, sin deformarla. |
| Botón de la portada | `js/components/welcome-poster.js` | Control Iniciar visible con el arte original. |
| Diseño de welcome | `css/welcome-desktop.css`, `css/welcome-mobile-v2.css` | Distribución por pantalla y estilos aislados del resto de la app. |
| Ejercicios | `js/components/activities.js` | Listados, ejercicios y formulario del diario. |
| Opciones | `js/components/settings.js` | Más opciones y privacidad. |
| Piezas compartidas | `js/components/common.js` | Reutiliza la marca y define el botón Volver. |
| Interfaz compartida | `js/components/interface.js` | Agrupa logotipo, menú superior y barra inferior bajo un mismo tema. |
| Navegación y acciones | `js/app.js` | Conecta los botones con las pantallas y funciones. |
| Guardado | `js/storage.js` | Valida y guarda notas, favoritos y elección diaria. |
| Tiempo | `js/timer.js` | Inicio, pausa, reinicio y duración de los ejercicios. |
| Iconos | `js/icons.js` | Iconos vectoriales en código, sin imágenes de menús. |
| Diseño general | `css/base.css` | Colores, texto, botones, navegación y ejercicios. |
| Diseño del inicio | `css/home.css` | Distribución y apariencia del inicio. |
| Diseño de mascotas | `css/companions.css` | Distribución de selección y perfiles. |
| Estilo de las tres piezas | `css/interface.css` | Tema, aspecto del logotipo, menú y barra inferior. |
| Sin conexión | `sw.js` | Guarda los archivos necesarios para uso sin conexión. |
| Instalación web | `manifest.webmanifest` | Nombre e iconos de la aplicación web. |

Las imágenes utilizadas están en `imagenes/` y los iconos de instalación en `iconos/`. Las antiguas capturas completas del inicio se conservan como referencias. El welcome utiliza la nueva portada aprobada como arte; el botón se representa dentro de un control HTML con contenido gráfico visible. Los PNG aprobados se copiaron sin modificar sus bytes.

## Recursos recibidos y estilo compartido

Los 13 PNG recibidos el 27 de octubre están conservados, sin editar, en `referencias/originales/`. Su inventario, dimensiones y huellas de integridad están en `referencias/recursos.json`. El adjunto del portapapeles es un duplicado exacto del inicio de Brotecito y se conserva igualmente.

El lago limpio ya coincide con el paisaje que utiliza la aplicación. Se mantiene sin cambios. El fondo con saludo, las cuatro pantallas completas, la bienvenida y los cuatro estados de barra quedan como referencias para las siguientes revisiones. El saludo de la aplicación sigue siendo texto editable en código.

**Logo + menú + barra inferior comparten un tema:** `botanico`, definido al principio de `css/interface.css`. Ahí se agrupan colores, borde, sombra, transparencia, filtro y dimensiones. Cambiar ese tema permite dar un mismo estilo a las tres piezas. Los tamaños del logo y del menú también pueden ajustarse por separado.

El logo conserva el arte recibido: se muestra una pequeña ventana del PNG transparente mediante CSS. El archivo original no se recorta ni se modifica. El menú y los enlaces de la barra tienen sus propios iconos y textos en código, con estado activo y navegación por teclado.

La carpeta `referencias/` no se descarga al usar la aplicación ni se guarda en su caché sin conexión. Los recursos que se utilizan se copian explícitamente a `imagenes/`: marca, paisajes y arte decorativo.

## Inicio, siguiente revisión

El inicio usa ahora el paisaje limpio detrás del encabezado y el saludo. La mascota aparece al lado del texto; sin compañía elegida se muestra el selector de las tres mascotas. Las cuatro tarjetas conservan su distribución de dos columnas, el botón de calma usa azul y el diario incorpora el gatito de la referencia.

Las ilustraciones de las tarjetas y del gatito se muestran mediante ventanas SVG sobre una copia intacta del PNG original. Esas ventanas excluyen las etiquetas, los iconos y las flechas dibujadas en la referencia. Todos esos elementos funcionales son texto, iconos y botones independientes en código.

Para las ondas se muestra únicamente la zona inferior del fondo con saludo, desde la fila 800; el saludo que ya está incrustado en sus píxeles queda fuera de la ventana. El paisaje y las ondas conservan sus proporciones y no se repiten al desplazarse. Los PNG originales permanecen sin editar.

## Datos y alcance

Es una aplicación web con funciones locales, sin cuentas ni sincronización en la nube. El diario no se envía a un servidor. Borrar los datos del navegador puede borrar notas, favoritos y la elección de mascota.

Las claves de almacenamiento son compatibles con Respira 3.18 cuando se usa **el mismo navegador y la misma dirección web**. Los datos no pasan automáticamente de GitHub Pages a esta dirección local, ni entre navegadores o dispositivos.

El ZIP original permanece intacto. Esta versión es una reconstrucción para revisión y no se ha subido a GitHub ni a tiendas de aplicaciones. Publicarla en la dirección existente o preparar una versión para tiendas son trabajos posteriores separados.

## Cómo seguir por partes

1. **Revisar el inicio:** que el estilo, los tamaños, los cuatro estados y el desplazamiento se sientan bien.
2. **Revisar las mascotas:** bienvenida, selección, historias y actividades sugeridas.
3. **Revisar los ejercicios:** ritmo de respiración, textos, tiempos y pasos.
4. **Preparar la publicación:** conservar respaldo y comprobar instalación y actualización en un teléfono real.

La base de esas pantallas ya está implementada. Esta secuencia permite pulir cada parte sin tener que rehacer una imagen completa por cada cambio.

## Nota para continuar el desarrollo

El proyecto usa módulos JavaScript del navegador y no necesita un proceso de compilación. Puede servirse con cualquier servidor de archivos estáticos. Si se cambia un archivo incluido en la caché y se va a distribuir una actualización, también se debe cambiar el identificador `CACHE` de `sw.js`. Si se añaden módulos o recursos, deben añadirse a `ASSETS` para que funcionen sin conexión.
