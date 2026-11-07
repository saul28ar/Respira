# Entrada y compañía · una vez cada día

El 2 de noviembre de 2026 el usuario pide evitar que el selector de mascotas se abra cada vez que se entra y aclara expresamente «Una vez cada día». Se reserva el cambio para la próxima entrega junto con el welcome móvil de bordes difuminados, opción 3.

Regla de integración:

- Los tres accesos Iniciar del welcome deben utilizar una misma acción de entrada.
- Ofrecer el selector automáticamente solo la primera entrada de cada día y marcarlo como visto al mostrarlo.
- Si hoy ya se vio el selector, aunque se haya omitido elegir, Iniciar abre el Home.
- Si ya existe una mascota válida elegida hoy, abrir el Home directamente, también para usuarios de 4.9 que aún no tengan la nueva marca diaria.
- Al día siguiente se ofrece otra vez una sola vez, usando la fecha del dispositivo.
- Conservar el acceso manual para elegir desde el Home y la regla existente de una compañía elegida al día. Conservar notas, favoritos, selección actual y estilos aprobados.
- Validar fecha e identificador y mantener una alternativa de sesión si el navegador impide guardar.

El prototipo aislado de `work/entrada-diaria-preview/` usa almacenamiento propio de prueba. Ocho comprobaciones pasaron sin fallos, incluidas omisión, recarga, cambio de día y elecciones vigentes de las tres mascotas. No incorporar sus controles de demostración ni sus claves de almacenamiento a la app.

Estado: requisito fijado, preparado como prototipo para la próxima actualización; la app y el respaldo de la entrega 4.9 no se modifican por este registro.

Integrado en Respira 4.10, entrega conjunta del 4 de noviembre de 2026. La clave nueva `respira_petOfferDay` registra la oferta vista; las claves de notas, favoritos y compañía se conservan. La elección válida de 4.9 sigue vigente y los identificadores corruptos se rechazan sin borrar los demás datos.

Corrección posterior de ese día: el usuario exige «Volver a elegir» debajo de la mascota en el Home. Este acceso manual puede reemplazar la compañía actual; la oferta automática sigue limitada a una vez al día. El resto de accesos mantiene el comportamiento existente. Véase HOME_MASCOTAS_APROBADO.md.
