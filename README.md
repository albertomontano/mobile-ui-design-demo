# 📱 Calibeb App - Prototipo Móvil para Técnicos de Campo

<div align="center">

![Calibeb Logo](https://via.placeholder.com/200x80/F97316/FFFFFF?text=CALIBEB)

**Aplicación móvil demo para gestión de mantenimiento de equipos de bebidas**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

[Demo en vivo](#-inicio-rápido) • [Documentación](#-estructura-del-proyecto) • [Características](#-características-principales)

</div>

---

## 📋 Descripción

**Calibeb App** es un prototipo de aplicación móvil completamente funcional diseñado para técnicos de campo que realizan mantenimiento preventivo y correctivo en equipos dispensadores de bebidas. Implementado como una **Single Page Application (SPA)** con JavaScript vanilla, simula un flujo completo de trabajo desde el login hasta la firma digital del cliente.

### 🎯 Propósito

- **Demo funcional** para presentación a clientes y stakeholders
- **Prototipo de alta fidelidad** con interacciones reales
- **Código bien documentado** con comentarios exhaustivos para facilitar comprensión y mantenimiento
- **Referencia de diseño** para equipos de desarrollo

### 🏗️ Arquitectura

- **SPA (Single Page Application):** Todas las pantallas en un solo archivo HTML
- **Navegación controlada:** Sistema de pantallas con función `goTo(screenId)`
- **Estado persistente:** LocalStorage para guardar progreso de checklists
- **Diseño responsive:** Mobile-first con simulador de iPhone integrado

---

## ✨ Características Principales

### 🔐 Autenticación
- Login simulado con validación de formulario
- Interfaz oscura elegante con branding Calibeb
- Navegación automática al Dashboard tras login

### 📊 Dashboard Inteligente
- **Selector de rango temporal:** Visualiza trabajos de "Hoy" o "Esta Semana"
- **Estadísticas en tiempo real:** Mantenimientos completados vs pendientes
- **Lista de órdenes:** Tarjetas clickeables con información detallada
- **Acceso rápido:** Botón destacado para mantenimiento correctivo de emergencia

### 🛠️ Flujo de Mantenimiento Preventivo (7 Pasos Consolidados)
1. **Check-in GPS:** Validación de ubicación simulada con geolocalización
2. **Paso 1 - Exterior:** Inspección visual, limpieza y estado de gabinete
3. **Paso 2 - Válvulas:** Revisión de válvulas de producto y dispensado
4. **Paso 3 - Refrigeración:** Unidad de refrigeración, temperatura, condensador, compresor y motores (con "No Aplica")
5. **Paso 4 - Filtración y Desagüe:** Sistema de filtración de agua y sistema de drenaje (fusionado)
6. **Paso 5 - Bombas:** Revisión de bombas de agua y jarabe
7. **Paso 6 - Componentes Adicionales:** Carbonatador, manómetro, bomba de agua y compresor de aire (con checkboxes "Aplica")
8. **Paso 7 - Calibración:** Ajuste final de válvulas, presiones y temperaturas
9. **Firma Digital:** Captura de firma del cliente con canvas interactivo

### 🚨 Mantenimiento Correctivo
- Flujo paralelo para atención de urgencias y fallas
- **Captura de 3 fotos:** Antes, durante y después de la reparación
- **Descripción detallada:** Campos para registrar falla y solución aplicada
- **Validación de campos:** Formulario con requisitos mínimos

### 📸 Captura de Fotos Simulada
- Generación automática de imágenes mock usando Canvas API
- Persistencia en localStorage para mantener fotos entre sesiones
- Visualización con miniaturas y opción de eliminar
- Actualización visual inmediata sin recargar página

### ✅ Checklists Persistentes
- **Auto-guardado:** Estado de checkboxes guardado automáticamente en localStorage
- **Restauración automática:** Al recargar, recupera el progreso exacto
- **Tracking visual:** Indicadores de progreso por cada paso
- **Sincronización:** Cambios reflejados instantáneamente

### ✍️ Firma Digital
- Canvas HTML5 interactivo con eventos touch y mouse
- Soporte completo para dispositivos táctiles y computadoras
- Exportación a imagen PNG
- Botón de limpieza para reiniciar firma
- Validación antes de continuar

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Navegador moderno actualizado:
  - Chrome 90+ / Edge 90+
  - Firefox 88+
  - Safari 14+
- Servidor web local (opcional pero recomendado para evitar problemas con CORS)

### Opción 1: Abrir directamente en navegador

```bash
# Windows - Doble click o ejecutar desde cmd
start calibeb_demo.html

# macOS - Desde Terminal
open calibeb_demo.html

# Linux - Desde Terminal
xdg-open calibeb_demo.html
```

### Opción 2: Con Live Server (VSCode)

1. Instala la extensión "Live Server" en Visual Studio Code
2. Click derecho en `calibeb_demo.html`
3. Selecciona "Open with Live Server"
4. La app se abrirá automáticamente en `http://127.0.0.1:5500`

### Opción 3: Servidor Python

```bash
# Python 3
python -m http.server 8000

# Abre en navegador: http://localhost:8000/calibeb_demo.html
```

### Opción 4: Node.js http-server

```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar en el directorio del proyecto
http-server -p 8000

# Abre: http://localhost:8000/calibeb_demo.html
```

---

## 📁 Estructura del Proyecto

# Node.js (http-server)
npx http-server

# PHP
php -S localhost:8000
```

Luego abrir: `http://localhost:8000/calibeb_demo.html`

---

## 📂 Estructura del Proyecto

```
c:\mobile-ui-design-demo\
│
├── 📄 calibeb_demo.html          # Aplicación principal (1148 líneas)
├── 🎨 styles.css                 # Estilos globales (696 líneas)
├── 🧠 app.js                     # Lógica de la app (717 líneas)
├── 🧩 components.js              # Componentes reutilizables (383 líneas)
├── 💾 mock-data.js               # Datos simulados (440 líneas)
│
└── 📚 Documentación
    ├── README.md                 # Este archivo
    ├── DOCUMENTACION_TECNICA.md  # Documentación técnica completa
    ├── FASE_5_6_IMPLEMENTACION.md
    └── VERIFICACION_FINAL.md
```

**Total:** 3,319 líneas de código

---

## 🎨 Capturas de Pantalla

### Login
<div align="center">
  <img src="https://via.placeholder.com/390x844/0F172A/FFFFFF?text=LOGIN+SCREEN" alt="Login" width="250"/>
</div>

### Dashboard
<div align="center">
  <img src="https://via.placeholder.com/390x844/F8FAFC/0F172A?text=DASHBOARD" alt="Dashboard" width="250"/>
</div>

### Firma Digital
<div align="center">
  <img src="https://via.placeholder.com/390x844/FFFFFF/0F172A?text=SIGNATURE+PAD" alt="Firma" width="250"/>
</div>

---

## 🗺️ Flujo de Navegación

```
LOGIN
  │
  ↓
DASHBOARD ←─────────┐
  │                 │
  ├→ DETAIL         │
  │    │            │
  │    ↓            │
  │  CHECKIN        │
  │    │            │
  │    ↓            │
  │  STEP1          │
  │    │            │
  │    ↓            │
  │  STEP2          │
  │    │            │
  │    ↓            │
  │  SIGNATURE ─────┘
  │
  └→ CORRECTIVE ────┘
       (urgencias)
```

---

## 💡 Guía de Uso

### Para Usuarios (Demo)

1. **Abrir `calibeb_demo.html`** en un navegador
2. **Usar el panel superior** para navegar entre pantallas
3. **Interactuar con los elementos:**
   - Marcar checkboxes
   - Capturar fotos (simuladas)
   - Dibujar firma con mouse/touch
   - Cambiar filtros del dashboard

### Para Desarrolladores

#### Navegar programáticamente

```javascript
// Desde la consola del navegador
goTo('dashboard');          // Ir a una pantalla
goBack();                   // Volver atrás
```

#### Acceder a los Managers

```javascript
// API global disponible
CalibekApp.Navigation.goTo('step1');
CalibekApp.Form.validate('loginForm');
CalibekApp.Checklist.getProgress('step1');
CalibekApp.Signature.clear();
CalibekApp.Photo.getAllPhotos();
```

#### Ver datos persistidos

```javascript
// localStorage
localStorage.getItem('calibeb_photos');
localStorage.getItem('calibeb_checklist_step1');
```

---

## 🔧 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos con Custom Properties
- **JavaScript ES6+** - Lógica de la aplicación (Vanilla JS)
- **Tailwind CSS** - Framework de utilidades CSS (CDN)
- **Font Awesome 6.4.0** - Iconografía
- **Google Fonts (Inter)** - Tipografía

### APIs del Navegador
- **Canvas API** - Firma digital y fotos simuladas
- **localStorage** - Persistencia de datos
- **Touch Events** - Soporte táctil

### Herramientas de Desarrollo
- **VS Code** - Editor de código
- **Node.js** - Validación de sintaxis
- **Git** - Control de versiones

---

## 📱 Compatibilidad

### Navegadores Desktop
| Chrome | Firefox | Safari | Edge | Opera |
|--------|---------|--------|------|-------|
| ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ | ✅ 76+ |

### Navegadores Móviles
| Chrome Android | Safari iOS | Samsung Internet |
|----------------|------------|------------------|
| ✅ 90+         | ✅ 14+     | ✅ 15+          |

### Características Requeridas
- ✅ ES6+ (Arrow Functions, Template Literals)
- ✅ CSS Custom Properties
- ✅ Canvas API
- ✅ localStorage
- ✅ Touch Events

---

## 🏗️ Arquitectura

### Patrón de Diseño
**Modular Object-Oriented** con separación de responsabilidades:

- **NavigationController:** Gestión de rutas
- **DashboardManager:** Estadísticas y agenda
- **FormManager:** Validación de formularios
- **ChecklistManager:** Checklists con persistencia
- **SignatureManager:** Firma digital
- **PhotoManager:** Captura de fotos
- **NotificationManager:** Sistema de notificaciones

### Capa de Datos
**DataService:** API mock que simula backend

```javascript
DataService.getWorkOrders()      // Órdenes de trabajo
DataService.getStats('today')    // Estadísticas
DataService.getTechnician()      // Info del técnico
```

---

## 📦 Características Técnicas

### Persistencia de Datos

```javascript
// localStorage keys
"calibeb_photos"                  // Array de fotos capturadas
"calibeb_checklist_checkin"       // Estado de checkboxes
"calibeb_checklist_step1"         // Estado de checkboxes
"calibeb_checklist_step2"         // Estado de checkboxes
```

### Event Listeners

- ✅ 19 botones de navegación (`onclick="goTo()"`)
- ✅ 1 selector de rango del dashboard
- ✅ Auto-inicialización de checkboxes
- ✅ Auto-inicialización de placeholders de fotos
- ✅ Canvas con eventos touch y mouse

### Validaciones

- ✅ Campos requeridos
- ✅ Formato de email
- ✅ Longitud mínima de texto
- ✅ Feedback visual (borders rojos)

---

## 🧪 Testing

### Validar Sintaxis

```powershell
# JavaScript
node --check app.js
node --check components.js
node --check mock-data.js

# Resultado esperado: (sin output = sin errores)
```

### Pruebas Manuales

**Checklist básico:**
- [ ] Login redirige a Dashboard
- [ ] Filtro Today/Week actualiza stats
- [ ] Click en orden abre Detail
- [ ] Checkboxes persisten después de F5
- [ ] Fotos se capturan y muestran
- [ ] Firma digital funciona con mouse
- [ ] Firma digital funciona con touch (móvil)
- [ ] Botón "Borrar" limpia la firma
- [ ] Validación muestra errores en campos vacíos
- [ ] No hay errores en consola

---

## 🚀 Personalización

### Cambiar Colores

Editar variables en [styles.css](styles.css):

```css
:root {
    --color-primary: #F97316;        /* Naranja Calibeb */
    --color-primary-dark: #EA580C;   /* Hover states */
    --color-dark-bg: #0F172A;        /* Fondo oscuro */
}
```

### Agregar Nueva Pantalla

1. **HTML:** Agregar `<div id="mi-pantalla" class="screen">...</div>`
2. **Navegación:** Usar `onclick="goTo('mi-pantalla')"`
3. **Estilos:** Agregar en `styles.css` si es necesario

### Conectar a API Real

Reemplazar `DataService` en [mock-data.js](mock-data.js):

```javascript
const DataService = {
    async getWorkOrders() {
        const response = await fetch('/api/work-orders');
        return await response.json();
    }
    // ...más métodos
};
```

---

## 📚 Documentación

- **[DOCUMENTACION_TECNICA.md](DOCUMENTACION_TECNICA.md)** - Arquitectura completa, API reference, guías de extensión
- **[FASE_5_6_IMPLEMENTACION.md](FASE_5_6_IMPLEMENTACION.md)** - Detalles de implementación de funcionalidades avanzadas
- **[VERIFICACION_FINAL.md](VERIFICACION_FINAL.md)** - Checklist de calidad y testing

---

## 🐛 Problemas Conocidos

### Limitaciones del Prototipo

1. **Fotos simuladas:** No accede a la cámara real del dispositivo
2. **Autenticación mock:** No valida credenciales reales
3. **Datos estáticos:** DataService retorna datos hardcoded
4. **Sin backend:** Todo funciona en el cliente
5. **localStorage limitado:** ~5-10 MB de capacidad

### Próximas Mejoras

- [ ] Integración con cámara real (getUserMedia API)
- [ ] Autenticación con JWT
- [ ] API REST real
- [ ] Progressive Web App (PWA)
- [ ] Modo offline completo
- [ ] Notificaciones push
- [ ] Compresión de imágenes

---

## 🤝 Contribuir

### Reportar Bugs

Crear un issue describiendo:
- Pasos para reproducir
- Comportamiento esperado vs actual
- Navegador y versión
- Screenshots si aplica

### Sugerir Mejoras

Abrir un issue con:
- Descripción de la mejora
- Casos de uso
- Mockups si es UI

---

## 📄 Licencia

Este proyecto es un **prototipo demo** propiedad de **Calibeb**.  
Uso exclusivo para fines de demostración y desarrollo interno.

---

## 👥 Equipo

**Desarrollado por:** Equipo Calibeb  
**Diseño UX/UI:** Calibeb Design Team  
**Fecha de creación:** Febrero 2026  
**Versión actual:** 2.0

---

## 📞 Contacto

**Empresa:** Calibeb  
**Email:** contacto@calibeb.com  
**Website:** www.calibeb.com  
**Soporte:** soporte@calibeb.com

---

## 🎉 Agradecimientos

- **Tailwind CSS** por el framework de utilidades
- **Font Awesome** por la iconografía
- **Google Fonts** por la tipografía Inter

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella ⭐**

Hecho con ❤️ por el equipo de Calibeb

[Volver arriba](#-calibek-app---prototipo-móvil-para-técnicos-de-campo)

</div>
