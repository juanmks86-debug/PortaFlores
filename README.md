# ❖ Bento Grid — Portafolio Interactivo Profesional

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)

Un portafolio web de nivel internacional diseñado con la estética **Bento Grid / Neo-Brutalist**, micro-interacciones avanzadas, síntesis de audio, terminal CLI interactiva, asistente de IA integrado y sincronización en vivo con la API de GitHub.

---

## 🌟 Características Principales

- **🎨 Diseño Bento Grid Réplica Exacta**: Estructura modular basada en tarjetas Bento con esquinas redondeadas, insignias giratorias de 360°, halo magenta resplandeciente en la foto de perfil y paleta de colores cuidadosamente seleccionada.
- **🌙 Modo Oscuro / Modo Claro (Dark & Light Theme)**: Transición fluida entre temas con persistencia de preferencia en `localStorage`.
- **🤖 Asistente de IA (Chatbot de Perfil)**: Widget flotante de inteligencia artificial para responder preguntas de reclutadores y clientes sobre experiencia, proyectos, tarifas y disponibilidad.
- **💻 Consola CLI Interactiva (Easter Egg para Devs)**: Terminal retro-futurista accesible con la tecla **`~`** con efecto **Matrix Rain** y comandos interactivos (`help`, `about`, `skills`, `projects`, `contact`, `matrix`, `clear`).
- **🔮 Esfera 3D Iridiscente en Canvas**: Animación interactiva en Canvas 2D/WebGL dentro de la tarjeta dual split.
- **🐙 Sincronización en Vivo con GitHub API**: Consulta en tiempo real de repositorios públicos, estrellas, forks y estadísticas de cualquier usuario de GitHub.
- **🎧 Reproductor de Audio para Podcast**: Widget con ecualizador animado (*sound visualizer*) y control de reproducción para episodios.
- **🔊 Efectos de Sonido de UI (Web Audio API)**: Síntesis de sonido ligera tipo videojuego para la navegación con botón para silenciar/activar.
- **📄 Descarga e Previsualización de CV**: Modal con resumen ejecutivo y botón de descarga de Curriculum Vitae en PDF.
- **📩 Formulario Conectado a Correo Real**: Integración directa con Formspree / Web3Forms.

---

## 📁 Estructura del Proyecto

```
portfolio/
├── index.html            # Estructura semántica HTML5, metadatos SEO y modales
├── css/
│   └── style.css         # Design system Bento Grid, variables CSS y animaciones
├── js/
│   └── app.js            # Lógica interactiva, canvas 3D, Chatbot IA y API GitHub
├── assets/
│   ├── profile.jpg       # Foto de perfil del desarrollador
│   └── project1.jpg      # Arte y capturas de proyectos 3D
├── favicon.svg           # Ícono vectorial para la pestaña del navegador
├── package.json          # Scripts de ejecución rápida
├── vercel.json           # Configuración de despliegue en Vercel
├── netlify.toml          # Configuración de despliegue en Netlify
└── README.md             # Documentación del proyecto
```

---

## 🚀 Ejecución en Local

### Opción 1: Con Python (Sin instalaciones requeridas)
```bash
# Navega a la carpeta del proyecto
cd portfolio

# Inicia el servidor de desarrollo en el puerto 8080
python3 -m http.server 8080
```
Abre tu navegador en: **`http://localhost:8080`**

### Opción 2: Con Node.js / NPX
```bash
# Ejecuta un servidor local rápido
npx serve .
```

---

## 🌐 Publicación Gratis en Internet (Despliegue en 1 Clic)

### Despliegue en Vercel
1. Instala Vercel CLI (opcional): `npm i -g vercel`
2. Ejecuta `vercel` dentro de la carpeta o conecta tu repositorio de GitHub directamente en [Vercel.com](https://vercel.com).

### Despliegue en Netlify
Sube la carpeta a [Netlify Drop](https://app.netlify.com/drop) o conecta el repositorio de GitHub. El archivo `netlify.toml` gestionará la configuración automáticamente.

### Despliegue en GitHub Pages
1. Sube el código a un repositorio público en GitHub.
2. Ve a **Settings > Pages** y selecciona la rama `main` / `root`.

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. ¡Siéntete libre de adaptarlo y usarlo para tu propio portafolio personal!
