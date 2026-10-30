# Zealep Soluciones · Sitio web

Sitio estático de [zealepsoluciones.com](https://zealepsoluciones.com): desarrollo de software a medida, apps web y móviles, integración de sistemas y consultoría en Lima, Perú.

## Estructura

```
index.html        Página única (hero, servicios, ruta, stack, proyectos, testimonios, estimador, FAQ, contacto)
css/styles.css    Estilos y tokens de marca
js/main.js        Interacciones (vanilla JS, sin dependencias)
logo/             Logos y favicons (SVG y PNG)
.agents/skills/   Skill Impeccable (guía de diseño usada para el rediseño)
skills-lock.json  Versión registrada de la skill
```

## Cómo abrirlo

- Doble clic en `index.html`, o
- En VS Code, con la extensión Live Server: clic derecho sobre `index.html` → *Open with Live Server*.

No requiere instalación ni compilación. Las fuentes (Archivo) se cargan desde Google Fonts; sin internet se usa una tipografía del sistema.

## Rediseño UI/UX (rama `feature/ui-diseno-interfaz`)

Se aplicó la skill **Impeccable** en este orden: critique → audit → layout → typeset → colorize → polish → adapt → animate. Se mantuvieron el contenido comercial, el logo, los enlaces y las funciones existentes.

### Navegación y responsive
- Entre 721 y 1080 px (tablets) no había enlaces ni botón de menú. Ahora aparece el botón de menú en todo ancho ≤ 1080 px.
- El menú móvil se cierra con `Esc`, actualiza su etiqueta (Abrir/Cerrar menú), admite pantallas bajas (scroll interno) y se cierra solo al pasar a escritorio.
- Corregido un desborde horizontal de 20 px en celular causado por los testimonios.
- La fila de estadísticas del hero y la línea del bloque "Rápido / Eficiente / Bien hecho" ahora se alinean con el contenido.
- Botones, chips, filtros y enlaces del pie con área táctil de al menos 44 px.
- El botón de WhatsApp respeta el área segura de iPhone.

### Color y contraste
- Nuevo token `--red-action` (`#cf270c`) para botones y superficies con texto pequeño: el texto claro supera 4,5:1. El rojo de marca `#ec3013` se conserva en logo, bloque de la Z, franja y fondos de gran tamaño.
- Grises oscurecidos donde el texto no llegaba a 4,5:1 (pasos de la ruta, etiquetas, tags).
- Anillos de foco visibles sobre fondos rojos y oscuros.
- Barra de scroll, selección y `accent-color` con la paleta de marca.

### Tipografía
- Tracking de titulares limitado a -0.04 em; tamaños de display acotados (máx. 96 px).
- Interlineado y ancho de línea (45–75 caracteres) ajustados en párrafos.
- Textos de 11–12 px subidos a 12–15 px.
- Titulares con `text-wrap: balance` (excepto los animados por palabras).

### Componentes (polish)
- Sombras duras sustituidas por sombras suaves (formulario, WhatsApp).
- Estados `:active` y `:disabled` en botones; foco por teclado en tarjetas de proyecto; en táctil la etiqueta "Ver caso" queda visible.
- Texto "Rápido / Eficiente / Bien hecho" con relleno por capa recortada (sin texto con degradado).
- Mensaje de error del formulario sin borde lateral grueso.

### Accesibilidad
- Enlace "Saltar al contenido".
- Formulario con mensajes de error en texto, `aria-invalid` y `aria-describedby`; foco al mensaje de éxito.
- Filtros y chips con `aria-pressed`; pestañas de la ruta con `aria-controls` / `aria-labelledby`.
- Botón de pausa en los testimonios; la rotación se detiene al pasar el mouse o enfocar (WCAG 2.2.2).
- La barra de navegación se muestra al enfocarla con el teclado aunque esté oculta por scroll.
- Bloque `<noscript>`: sin JavaScript el contenido sigue visible.

### Movimiento
- Con `prefers-reduced-motion`: sin desplazamientos, bucles, autoavance ni efectos de scroll; los cambios de estado se conservan con fundidos cortos de 180 ms.
- Animación de la Z sin rebote; inclinación de la franja roja más suave (±4°); autoavance de la ruta en móvil más lento (6 s).

## Verificación realizada

- Render en Chromium a 1440, 820 y 390 px: sin errores de JavaScript ni desborde horizontal.
- Interacciones probadas: menú, filtros, estimador, FAQ, pausa de testimonios, validación y envío (simulado) del formulario, con y sin movimiento reducido.
- Detector de Impeccable: de 50 a 24 hallazgos (contraste de 20 a 5). Los restantes son texto grande y en negrita sobre el rojo de marca (cumple AA para texto grande), falsos positivos de "padding" y dos decisiones deliberadas (ver abajo).

## Pendiente de revisión manual

- Probar en un celular y una tablet reales (el táctil se probó solo emulado).
- Navegación completa solo con teclado y con lector de pantalla.
- Envío real del formulario a Formspree.
- Reemplazar el contenido de relleno antes de publicar: "Nombre del proyecto" y los testimonios de ejemplo en `index.html`.

## Decisiones deliberadas

- Se mantiene la línea de texto sobre el título del hero para no alterar el contenido comercial.
- Se mantiene la cuadrícula tenue de fondo del hero como parte de la identidad visual.

## Despliegue

El sitio se sirve como archivos estáticos (dominio en Namecheap, alojado en DigitalOcean). Basta con publicar `index.html`, `css/`, `js/` y `logo/`.
