# Energías Renovables - Sitio Web Informativo y Educativo

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

---

## 🌱⚡ Energías Renovables - Sitio Web Educativo

Sitio web **informativo y educativo** sobre energías renovables en Colombia y el mundo.
El proyecto busca explicar conceptos clave de energía limpia, mostrar contexto histórico, presentar tipos de energías renovables y ofrecer herramientas interactivas para consulta y aprendizaje.

## 🎯 Objetivo del proyecto

Brindar una experiencia web clara, visual y didáctica para:

- 📘 Difundir conocimiento sobre energías renovables.
- 🧠 Apoyar procesos de aprendizaje con contenido estructurado.
- 📊 Visualizar datos energéticos con herramientas interactivas.

## 🧭 Secciones principales

- 🏠 **Inicio**: visión general del tema y navegación principal.
- 🕰️ **Historia**: línea de tiempo e hitos de la evolución de las energías renovables.
- ☀️ **Tipos de Energía**: explicación de fuentes renovables y sus características.
- 🇨🇴 **Colombia**: panorama nacional, potencial y contexto local.
- 📩 **Contacto**: canal de comunicación y formulario.
- 🛠️ **Herramientas**:
  - `calculos.html`: hub de herramientas.
  - `calculadora.html`: calculadora de participación energética.
  - `dashboard.html`: visualización de datos y gráficas.

## 💻 Tecnologías implementadas

### 🧱 Frontend
- 🧱 **HTML5** para estructura semántica del sitio.
- 🎨 **CSS3** para estilos, layout y componentes visuales.
- 🧩 **JavaScript (ES6+)** para interactividad y lógica de negocio.
- 🅱️ **Bootstrap 5.3.5** para sistema de diseño responsive.

### 📈 Visualización y datos
- 📈 **Chart.js** para construcción de gráficas en el dashboard.
- 🌐 **Fetch API** para cargar datos desde archivos CSV.
- 🗂️ **CSV** como fuente de datos (`/datos`).

### 🔤 Recursos adicionales
- 🔤 **Google Fonts** para tipografía web.
- 🖼️ **SVG icons** y recursos gráficos propios (`/img`).

## 🗂️ Estructura del proyecto

```text
energias-renovables/
├── index.html                 # Página principal (raíz)
├── css/
│   └── estilos.css           # Estilos del sitio
├── datos/
│   ├── datos_energia_global.csv  # Datos mundiales
│   └── datos_energia_sa.csv      # Datos Sur América
├── html/
│   ├── historia.html         # Historia de energías renovables
│   ├── tipos-energias.html   # Tipos de energías
│   ├── colombia.html        # Contexto colombiano
│   ├── contactos.html       # Formulario de contacto
│   ├── calculos.html        # Hub de herramientas
│   ├── calculadora.html     # Calculadora energética
│   └── dashboard.html       # Visualización de datos
├── img/
│   ├── favicon.png
│   ├── logo-energias.png
│   ├── logo-talento-tech.png
│   └── [imágenes de contenido]
└── js/
    ├── script.js            # Scripts principales
    ├── calculadora.js       # Lógica calculadora
    └── graficas.js          # Gráficas con Chart.js
```

## 🚀 Cómo ejecutar el proyecto

1. Clona o descarga este repositorio.
2. Abre la carpeta del proyecto en tu editor.
3. Ejecuta un servidor local (recomendado) para evitar problemas de rutas al consumir datos.
4. Abre `index.html` desde el navegador (está en la raíz).

> También puedes abrir el archivo directamente, pero para las funciones con `fetch` y carga de CSV se recomienda servidor local.

## 👨‍💻 Autor

**Creado por Edwin Granada | Ingeniero físico y Desarrollador**
