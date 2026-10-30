# Entregas de Respira

Preferencia actualizada del usuario, 28 de octubre de 2026: entregar **solo los cambios** y mantener **un único respaldo completo que se actualiza con cada entrega**, para reducir duplicaciones.

Cada actualización aprobada se prepara así:

1. Entregar al usuario únicamente un ZIP de archivos nuevos o modificados, con sus carpetas y la versión anterior sobre la que se aplica.
2. Mantener un solo respaldo completo activo: `respaldo/Respira_RESPALDO_ACTUAL.zip`.
3. Actualizar ese mismo archivo automáticamente al preparar y verificar la siguiente entrega. No crear respaldos completos con nombres de versión ni enviar otro completo salvo petición explícita del usuario.

El respaldo representa la última versión entregada, no los cambios de trabajo pendientes. El ZIP de cambios se compara con ese respaldo: aplicar el parche debe producir exactamente los archivos de la nueva app. Los gráficos sin modificaciones no se repiten.

El respaldo se reemplaza solo después de guardar y validar el parche y la nueva copia completa temporal. Si hay un fallo, se conserva la base anterior. La herramienta del proyecto es `herramientas/preparar_entrega.py`; `--verificar` comprueba el respaldo y la entrega requiere versión, título y fecha explícitos.

La base inicial del nuevo flujo es la última app entregada: Respira 4.6, Métodos 10. Los cambios en estas instrucciones se incluirán en el siguiente parche aprobado. Las descargas anteriores fuera del proyecto y los originales del usuario se conservan.

Entrega conjunta autorizada el 29 de octubre de 2026: Home móvil Jardín sereno 1, Favoritos 4, Más 3 y corrección de las franjas del welcome móvil. Se prepara Respira 4.7 en un solo ZIP de cambios desde 4.6. Sus diseños se conservan conforme a HOME_MOVIL_APROBADO.md, FAVORITOS_APROBADO.md y MAS_APROBADO.md.

El 29 de octubre de 2026, el usuario eligió Pet Select 4 para celular y computadora, con corrección de las hojas en computadora. Respira 4.8 se entrega como un solo ZIP de cambios desde 4.7. El diseño y su corrección quedan fijados en PET_SELECT_APROBADO.md.

Criterio fijado después de la entrega 4.8: utilizar la misma copia maestra del fondo compartido con la mejor calidad disponible, sin cambiar los diseños. Véase FONDOS_APROBADO.md. La auditoría confirmó que las seis pantallas aprobadas ya comparten el PNG HD; no se genera otra entrega por esta revisión sin cambios visuales.

Por petición de reunir todos los cambios, se prepara un único parche acumulado Respira 4.8 desde 4.6. Contiene los cambios de 4.7 y 4.8, con sus guías de aplicación unificadas. No cambia el código ni los recursos de la app 4.8; la variante del paquete se identifica como acumulada en los manifiestos. Se comprueba su aplicación sobre 4.6 y también sobre 4.7 y 4.8 antes de actualizar el respaldo único.
