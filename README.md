# SECE v4 - Proyecto web optimizado

Sitio web institucional estático de la Sociedad Estudiantil Cruceña de Economía. La versión mantiene el diseño, contenido, estructura e interacciones originales, con mejoras de rendimiento, accesibilidad, seguridad del foro local y organización para despliegue.

## Estructura

- `index.html`: inicio, hero, accesos rápidos, noticias y agenda.
- `about.html`: misión, visión y propósito institucional.
- `team.html`: equipo de trabajo con filtros.
- `publications.html`: publicaciones con filtros y búsqueda.
- `certificates.html`: verificador de certificados.
- `forum.html`: foro/debate estático con temas editables y votos locales por dispositivo.
- `postulacion.html`: postulación institucional con enlace principal a Google Forms.
- `css/style.css`: estilos, animaciones y responsive.
- `js/main.js`: interacciones del sitio.
- `data/certificates.json`: registro editable de certificados.
- `data/forum-topics.json`: temas editables del foro.
- `img/`: imágenes, logo, hero, equipo, noticias y certificados.

## Mejoras incluidas

- Logo optimizado para navegación y pie: `img/logo-optimized.png`.
- Carga diferida de imágenes no críticas.
- Precarga del hero en la página de inicio.
- Animaciones conservadas con soporte para usuarios que prefieren reducir movimiento.
- Menú móvil mejorado con cierre por enlace, clic externo y tecla Escape.
- Carrusel con pausa cuando la pestaña no está visible.
- Foro local protegido contra HTML inyectado.
- Foro adaptado a hosting estático: votos locales por dispositivo y propuestas/opiniones vía formularios externos.
- Verificador de certificados con cache en memoria.
- Recurso faltante del encabezado interno corregido.
- Header del inicio transparente sobre el hero y sólido al hacer scroll.
- Sitio listo para hosting estático sin instalación ni compilación.

## Vista local

1. Abre una terminal en esta carpeta.
2. Ejecuta un servidor local simple:

```bash
python -m http.server 8080
```

3. Abre `http://localhost:8080` en el navegador.

Alternativa sin Python: abre la carpeta con Visual Studio Code e inicia la extensión `Live Server`.

Nota: para que el verificador de certificados cargue `data/certificates.json`, es mejor usar servidor local y no abrir los archivos con doble clic.

## Despliegue en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube todos los archivos y carpetas de este proyecto.
3. En GitHub, entra a `Settings` > `Pages`.
4. En `Build and deployment`, elige `Deploy from a branch`.
5. Selecciona la rama principal y la carpeta `/root`.
6. Guarda. GitHub publicará el sitio en una URL tipo `https://usuario.github.io/repositorio/`.

## Despliegue en Netlify

1. Entra a Netlify y elige `Add new site`.
2. Opción rápida: arrastra esta carpeta completa al área de despliegue.
3. Opción con Git: conecta el repositorio.
4. Deja vacío el comando de build.
5. Usa `.` como carpeta de publicación si Netlify lo solicita.

## Despliegue en Vercel

1. Entra a Vercel y elige `Add New Project`.
2. Importa el repositorio.
3. Framework preset: `Other`.
4. Deja vacío el comando de build.
5. Carpeta de salida: `.`.
6. Despliega.

## Cómo actualizar contenido

- Textos institucionales: edita `about.html` e `index.html`.
- Equipo: edita las tarjetas en `team.html` y reemplaza imágenes en `img/team/`.
- Miembros: edita la sección `Miembros` en `team.html`; reemplaza `Nombre Apellido`, `Área editable` y `href="#"` por el LinkedIn real.
- Publicaciones: edita las tarjetas en `publications.html`.
- Certificados: agrega o cambia registros en `data/certificates.json` y coloca la imagen en `img/certificates/`.
- Foro: edita los temas en `data/forum-topics.json`. Reemplaza `LINK_GOOGLE_FORMS_FORO` en `forum.html` y `LINK_GOOGLE_FORMS_OPINION` en `data/forum-topics.json`.
- Postulación: reemplaza `LINK_GOOGLE_FORMS_POSTULACION` en `postulacion.html`.
- Hero: reemplaza `img/hero/hero.webp` manteniendo una imagen horizontal 16:9.
- Estilos: ajusta colores y medidas desde las variables `:root` en `css/style.css`.

Para actualizar el sitio ya publicado, sube los archivos modificados al hosting o al repositorio conectado. El hosting volverá a publicar la versión nueva automáticamente.
