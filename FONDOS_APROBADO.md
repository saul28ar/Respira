# Fondos compartidos · criterio fijo de calidad

El 29 de octubre de 2026, el usuario indicó mantener el mismo fondo compartido y utilizar la copia de mejor calidad disponible. Si se requiere mejorar la calidad, conservar el paisaje y el resto del diseño sin cambios.

Archivo maestro actual: `imagenes/inicio-web/lago-hd.png`, PNG de 1942×809 píxeles, SHA256 `b0822edc99c4bd218176dfc500188e0fd6537874d3e4c3a85e3b94cdb65cfc0c`. Es la misma copia utilizada en las propuestas aprobadas de Home, Métodos y las pantallas posteriores. Las copias de trabajo encontradas coinciden byte por byte; no hay una copia de ese mismo fondo con mayor resolución en el proyecto.

Home de celular y computadora, Métodos, Favoritos, Más y selección de compañía ya utilizan ese archivo compartido. Conservar los encuadres, velos suaves, colores y transparencias aprobados en cada pantalla. La suavidad de los velos no debe confundirse con una imagen de menor calidad.

Las ondas y hojas originales comparten `imagenes/paisajes/ondas-original.png`, PNG de 941×1672 píxeles, SHA256 `01ca6a514bac2dd04f1ff87f3f1ba12a441fcb86ebfeee412f86a79e318ec7fd`. Mantener sus proporciones y evitar ampliaciones excesivas, como en la corrección aprobada de Pet Select 4.

La portada y las ilustraciones completas aprobadas conservan su propia composición y sus archivos originales. No sustituirlas por otro paisaje ni regenerar mascotas, logo o controles como consecuencia de una mejora de calidad del fondo compartido.

La auditoría se registra en `work/auditoria-fondos.json`. Esta revisión no cambia los PNG ni el código de la aplicación 4.8. El criterio se incluye como documentación en la entrega acumulada desde 4.6 y en el respaldo único actualizado.

Pendiente para la siguiente entrega: al aprobar Métodos por secciones 1 el 29 de octubre de 2026, el mismo fondo se extiende también a todos los métodos individuales, diario y listados de categorías mediante `css/method-details.css`. Se conservan los paneles y controles de los ejercicios, así como el PNG maestro original.

Corrección solicitada después de la entrega 4.11: eliminar el corte horizontal visible del fondo al final de Métodos en celular, junto a «Habla con alguien» y escritura. Se ajusta únicamente la regla móvil de `.m10-waves` en `css/methods.css`: altura proporcional al `viewBox`, máximo de 430 px y entrada transparente gradual de 96 px. Se conservan el PNG original, escala y posición de hojas/ondas, tarjetas, cabecera y PC. Las capturas e informe están en `work/qa-fondo-metodos-movil/`. Queda integrada para revisión y la próxima entrega junto a la barra móvil original; no se genera un ZIP por esta vista previa.

Revisión posterior de la agenda: el usuario pidió continuidad en PC y celular y hojas pequeñas en computadora. La agenda usa ondas proporcionales, transición suave y hojas de los mismos PNG limitadas a bordes de 440 px, con máscaras graduales; no se vuelve a introducir una columna central con bordes verticales ni se estiran las hojas a todo el escritorio. Las cinco vistas de revisión usan esta misma corrección. También se elimina el máximo de altura de ondas en Home y Métodos móviles y se da altura proporcional a Favoritos móvil: así los teléfonos anchos no dejan franjas laterales. Más y Pet Select conservan sus encuadres y hojas moderadas ya aprobadas. Los maestros PNG no cambian.

Entregado el 7 de noviembre de 2026 en Respira 4.12, solo cambios desde4.11. Paquete limpio, calendario movil abierto y respaldo unico actualizado; verificaciones en work/qa-entrega-412/.
