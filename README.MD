# ⚡ MASANZ DUNGEONS — Edición definitiva (V3)

Un RPG de texto absurdo ambientado en un centro de FP. Todo el proyecto es **HTML + CSS + JavaScript puro**. No usa frameworks, módulos ES, CDN, APIs externas ni backend.

## Jugar

1. Descomprime el ZIP completo.
2. Abre **`index.html` con doble clic** en un navegador moderno (Chrome, Firefox o Edge).
3. ¡Sobrevive al centro! No es necesario localhost, servidor web, instalar paquetes o tener conexión a internet.

## Controles

- Haz clic en las decisiones.
- Pulsa **1–9** para elegir las primeras nueve acciones que aparecen en pantalla.
- Pulsa **Esc** para cerrar configuración.
- Guarda/carga en el navegador o exporta/importa tu partida con un archivo JSON desde Ajustes.
- Sonidos opcionales (desactivados por defecto).

## Novedades

- Renovación completa de interfaz, barras de recursos, panel de misión, indicador de combate y mapa con zonas visitadas.
- 15 salas conectadas, desde el atrio y las aulas hasta el CPD, la azotea y la salida de emergencia.
- Los aliados originales **Luis, Saúl, Iker, Ian y Renzo** se mantienen.
- Los enemigos originales **Iñigo Romanos y Félix** se mantienen. **Alberto (tutor / ChatGPT / bases de datos / GTA VI)** y **Javi (Java / programación / exámenes)** son los únicos enemigos nuevos.
- Nuevo equipo utilizable y arreglos a inventario, inicio, estadísticas, precisión, encuentros y recompensas.
- Dos finales: reunir tarjeta, plano y llave para escapar; o superar el curso.
- Nueva partida+.

## Guardado

El guardado del navegador utiliza `localStorage`, que normalmente está disponible para archivos locales en navegadores de escritorio. Su comportamiento depende de la política de seguridad del navegador. **Para conservar tus partidas entre navegadores, usa Exportar/Importar JSON.** No se sube ningún dato a internet.

## Arquitectura

- `index.html`: estructura de la interfaz y carga de scripts locales.
- `css/styles.css`: diseño visual y adaptación móvil.
- `js/gameState.js`: recursos, inventario y progreso.
- `js/map.js`: ubicaciones y conexiones.
- `js/events.js`: encuentros y decisiones.
- `js/characters.js`: aliados y enemigos.
- `js/items.js`: armas y armaduras.
- `js/combat.js`: combates.
- `js/ui.js`: representación visual.
- `js/main.js`: ciclo principal del juego.
- `js/storage.js`: guardado en navegador.
- `js/extras.js`: atajos, notificaciones, sonido y exportación/importación.

Juego de parodia ficticia. No representa hechos reales ni juicios sobre las personas aludidas.
