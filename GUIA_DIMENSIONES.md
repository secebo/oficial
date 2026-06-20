# Guía de cambios, explicaciones y dimensiones

## Corrección aplicada

Esta versión parte de la web original y **no cambia la gama de colores institucional**. Se conserva el verde principal `#003017`, el dorado `#DAAC20`, blanco y grises del diseño base.

## Qué se cambió

### Interfaz de inicio
- Se aplicó una interfaz tipo hero con navegación transparente sobre la imagen.
- Se eliminó del hero el texto largo institucional y se dejó un lema centrado.
- Se mantuvieron las secciones interactivas del inicio: accesos rápidos, bloque expandible, ejes, carrusel, agenda, estadísticas y CTA.

### Interfaz de páginas internas
- Se aplicó una cabecera superior sólida, manteniendo el verde institucional.
- Los encabezados internos ahora son más limpios, con fondo claro y título grande.
- Se quitaron explicaciones técnicas del frontend para que la experiencia sea más institucional.

### Conócenos
- Se dejó el contenido central solicitado:
  - Misión
  - Visión
  - Propósito

### Funcionalidades preservadas
- Menú móvil.
- Animaciones al hacer scroll.
- Bloque expandible de inicio.
- Carrusel de noticias.
- Filtros de equipo.
- Filtros y búsqueda de publicaciones.
- Verificación de certificados por código.
- Foro con publicación de temas y votos.
- Formulario de postulación.

## Qué no se debe tocar sin decisión previa
- `js/main.js`, porque contiene las funciones interactivas.
- `data/certificates.json`, porque alimenta el verificador.
- IDs como `moreAbout`, `expandAbout`, `newsCarousel`, `publicationSearch`, `certificateForm`, `topicForm`, `applicationForm`, porque el JavaScript depende de ellos.

## Dimensiones sugeridas de imágenes

### Logo superior
- Formato recomendado: SVG o PNG transparente.
- Proporción sugerida: horizontal 3:1.
- Tamaño recomendado: 600 × 180 px o superior.

### Imagen principal del inicio
- Proporción recomendada: 16:9.
- Tamaño recomendado: 1920 × 1080 px.
- Alternativa de mayor calidad: 2400 × 1350 px.
- Ruta actual: `img/hero/hero.webp`.

### Imagen institucional secundaria
- Proporción: 4:3.
- Tamaño recomendado: 1200 × 900 px.
- Ruta de referencia: `img/ui/equi.webp`.

### Equipo
- Proporción recomendada: retrato vertical.
- Tamaño recomendado: 1200 × 1350 px.
- Ruta: `img/team/`.

### Publicaciones / noticias
- Proporción recomendada: 16:10 o 16:9.
- Tamaño recomendado: 1600 × 1000 px.
- Ruta: `img/news/`.

### Certificados
- Usar imagen horizontal o vertical según el diseño del certificado final.
- Tamaño recomendado: mínimo 1600 px de ancho.
- Ruta: `img/certificates/`.

## Nota técnica
Las explicaciones visibles se retiraron de la interfaz, pero se documentan aquí para no perder orientación de mantenimiento.
