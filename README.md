# Zealep Soluciones - Landing Page

## Descripción General

Sitio web corporativo de **Zealep Soluciones**, una empresa de desarrollo de software con más de 5 años de experiencia en el mercado peruano. La página presenta los servicios, valores y formas de contacto de la empresa.

## Diseño y Estilo

### Tema Tokyo Night
La página utiliza un esquema de colores oscuro inspirado en el tema "Tokyo Night":

- **Fondo Principal**: `#1a1b26` (Deep Night Blue)
- **Tarjetas/Superficies**: `#24283b` (Lighter Night Blue)
- **Acento Primario**: `#7aa2f7` (Neon Blue)
- **Acento Secundario**: `#bb9af7` (Neon Purple)
- **Acento Terciario**: `#ff9e64` (Orange)
- **Texto Principal**: `#c0caf5` (Moonlight White)
- **Texto Secundario**: `#a9b1d6` (Muted Blue)

### Características de Diseño

- **Glassmorphism**: Efectos de vidrio translúcido en el header con `backdrop-filter: blur(12px)`
- **Animaciones Suaves**: Transiciones con `cubic-bezier(0.4, 0, 0.2, 1)` para un efecto premium
- **Scroll Animations**: Elementos que aparecen con fade-up al hacer scroll (AOS library)
- **Hover Effects**: Efectos de elevación y brillo en botones y tarjetas
- **Responsive Design**: Adaptable a dispositivos móviles y desktop

## Secciones de la Página

### 1. Header (Navegación)
- Logo de Zealep Soluciones
- Menú de navegación con enlaces a:
  - Inicio
  - Acerca
  - Servicios
  - Contacto
- Botón CTA "Empezar"
- Menú móvil hamburguesa

### 2. Hero Section
**Título**: "Las mejores soluciones para tu negocio"

**Descripción**: "Nuestro equipo de talento esta diseñado para analisar y implementar cualquier solucion que solicites"

**Elementos**:
- Botón de acción "Empezar"
- Imagen ilustrativa de soluciones tecnológicas
- Animaciones de entrada con fade-up
- Formas abstractas flotantes en el fondo

### 3. Clientes
Logos de clientes destacados:
- JS Consulting
- Osinergmin
- BBVA
- Pointer
- Fractal

### 4. Acerca de Nosotros

**Descripción Principal**:
"Somos una empresa dedicada al desarrollo de software con más de 5 años de experiencia de calidad en el mercado. Contamos con un equipo altamente capacitado y comprometido con la excelencia en cada proyecto."

**Valores Destacados**:
- ✓ Experiencia de calidad en el mercado
- ✓ Equipo altamente capacitado
- ✓ Satisfacción del cliente

**Compromiso**:
"Nos comprometemos con las empresas a trabajar juntos como socios para entender sus necesidades y objetivos tecnológicos, y brindarles soluciones personalizadas que les permitan lograrlos."

### 5. ¿Por Qué Nosotros?

**Título**: "Somos una empresa líder en tecnología de desarrollo de software, con la mejor eficiencia que puedes encontrar para las soluciones de tu empresa"

**Preguntas Frecuentes** (Acordeón):

1. **¿Por qué debo elegir su experiencia en la industria?**
   - Amplia experiencia que permite ofrecer soluciones innovadoras y efectivas
   - Conocimiento profundo de mejores prácticas y tendencias

2. **¿Qué me asegura de la calidad de su trabajo?**
   - Equipo de expertos comprometidos con la alta calidad
   - Comunicación abierta y transparente en cada etapa

3. **¿Qué me asegura de su compromiso con mi éxito?**
   - Servicio excepcional y soporte continuo
   - Compromiso incluso después de la entrega final

### 6. Servicios

**Descripción**: "Ofrecemos una amplia gama de servicios de desarrollo de software, diseñados para satisfacer las necesidades únicas de cada uno de nuestros clientes."

**Servicios Ofrecidos**:

1. **Desarrollo de aplicaciones web y móviles**
   - Aplicaciones personalizadas de alta calidad
   - Mejora de eficiencia y productividad

2. **Integración de sistemas**
   - Especialización en integración de diferentes sistemas
   - Optimización de procesos empresariales

3. **Desarrollo de software a medida**
   - Soluciones ajustadas perfectamente a cada empresa
   - Comprensión profunda de necesidades específicas

4. **Consultoría en tecnología**
   - Asesoramiento experto
   - Ayuda en toma de decisiones informadas

### 7. Contacto

**Información de Contacto**:
- **Dirección**: Jiron Rutherford 191 - San Borja, Lima, Perú
- **Email**: cristhianpelaez@zealepsoluciones.com
- **Celular**: +51 994339535

**Formulario de Contacto**:
- Campos: Nombre, Email, Asunto, Mensaje
- Integración con Formspree para envío de mensajes
- Mapa de Google Maps embebido

### 8. Footer

**Secciones**:
- Información de contacto
- Links rápidos (Inicio, Acerca, Servicios)
- Lista de servicios
- Redes sociales (Twitter, Facebook, Instagram, LinkedIn)
- Copyright © Zealep Soluciones

## Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados con variables CSS
- **JavaScript**: Interactividad y animaciones

### Librerías y Frameworks
- **Bootstrap 5**: Sistema de grid y componentes
- **AOS (Animate On Scroll)**: Animaciones al hacer scroll
- **GLightbox**: Lightbox para imágenes
- **Swiper**: Carruseles
- **Bootstrap Icons**: Iconografía
- **Boxicons**: Iconos adicionales
- **Remixicon**: Más iconos

### Fuentes
- **Google Fonts**: Open Sans, Jost, Poppins

## SEO y Metadatos

### Meta Tags Básicos
- **Title**: "Zealep Soluciones | Desarrollo de Software y Consultoría Tecnológica"
- **Description**: "Zealep Soluciones ofrece desarrollo de software a medida, aplicaciones web y móviles, y consultoría tecnológica para potenciar tu negocio en Perú."
- **Keywords**: software, desarrollo web, tecnologia, empresa, web, programacion, consultoria, aplicaciones moviles, peru, lima

### Open Graph (Redes Sociales)
- Configurado para Facebook, Twitter y LinkedIn
- Imagen de preview: Logo de Zealep
- URL canónica: https://zealepsoluciones.com/

### Accesibilidad
- Atributos `alt` en todas las imágenes
- Estructura semántica HTML5
- Contraste de colores optimizado para legibilidad

## Estructura de Archivos

```
ZEALEP/
├── index.html              # Página principal
├── README.md              # Este archivo
├── assets/
│   ├── css/
│   │   └── style.css      # Estilos personalizados Tokyo Night
│   ├── js/
│   │   └── main.js        # JavaScript principal
│   ├── img/
│   │   ├── zealep-logo-blanco.png
│   │   ├── hero-img.png
│   │   ├── why-us.png
│   │   ├── clients/       # Logos de clientes
│   │   └── undraw/        # Ilustraciones SVG
│   └── vendor/            # Librerías de terceros
│       ├── aos/
│       ├── bootstrap/
│       ├── bootstrap-icons/
│       ├── boxicons/
│       ├── glightbox/
│       ├── remixicon/
│       └── swiper/
```

## Características Destacadas

### Animaciones
- **Fade Up**: Elementos aparecen desde abajo con fade
- **Zoom In**: Efecto de zoom en imágenes y tarjetas
- **Float**: Formas abstractas flotantes en el hero
- **Hover Lift**: Elevación de tarjetas al pasar el mouse
- **Smooth Scroll**: Desplazamiento suave entre secciones

### Interactividad
- Menú sticky que se vuelve translúcido al hacer scroll
- Acordeón en sección "Por qué nosotros"
- Formulario de contacto funcional
- Botón "back to top" con efecto de aparición
- Navegación móvil responsive

### Performance
- Preloader para carga inicial
- Lazy loading de imágenes
- Animaciones optimizadas con CSS
- Código minificado en producción

## Navegación

La navegación utiliza smooth scroll para desplazarse suavemente entre secciones:
- `#hero` - Sección principal
- `#about` - Acerca de nosotros
- `#services` - Servicios
- `#contact` - Contacto

## Contacto y Redes Sociales

- **Email**: cristhianpelaez@zealepsoluciones.com
- **Teléfono**: +51 994339535
- **Ubicación**: San Borja, Lima, Perú
- **Redes**: Twitter, Facebook, Instagram, LinkedIn

---

**Diseñado por**: Zealep Soluciones  
**Última actualización**: Noviembre 2025  
**Versión**: 2.0 (Tokyo Night Theme)
