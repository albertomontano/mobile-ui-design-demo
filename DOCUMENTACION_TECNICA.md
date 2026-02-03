# 📘 DOCUMENTACIÓN TÉCNICA - CALIBEB APP

**Versión:** 2.0  
**Fecha:** 02 de Febrero de 2026  
**Autor:** Equipo Calibeb  
**Stack:** HTML5, CSS3, Vanilla JavaScript

---

## 📑 TABLA DE CONTENIDOS

1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Módulos y Managers](#módulos-y-managers)
4. [API Global](#api-global)
5. [Flujo de Datos](#flujo-de-datos)
6. [Pantallas y Navegación](#pantallas-y-navegación)
7. [Persistencia de Datos](#persistencia-de-datos)
8. [Guía de Extensión](#guía-de-extensión)

---

## 🏗️ ARQUITECTURA DEL SISTEMA

### Patrón de Diseño
La aplicación utiliza una **arquitectura modular orientada a objetos** con los siguientes principios:

- **Separación de Responsabilidades:** Cada manager maneja una funcionalidad específica
- **Singleton Pattern:** Managers implementados como objetos únicos
- **Event-Driven:** Sistema de eventos para comunicación entre componentes
- **Data Layer:** Capa de datos centralizada con DataService

### Stack Tecnológico

```
Frontend:
├── HTML5 (Semantic)
├── CSS3 (Custom Properties + Tailwind CDN)
├── JavaScript ES6+ (Vanilla)
└── Font Awesome 6.4.0

Persistencia:
└── localStorage API

Herramientas:
├── VS Code
└── Node.js (validación de sintaxis)
```

---

## 📂 ESTRUCTURA DE ARCHIVOS

```
c:\mobile-ui-design-demo\
│
├── 📄 calibeb_demo.html              (507 líneas)
│   └── Estructura principal de la app con 8 pantallas
│
├── 🎨 styles.css                     (697 líneas)
│   ├── Design Tokens (47 variables CSS)
│   ├── Mobile Frame Styles
│   ├── Component Styles
│   ├── Utility Classes
│   └── Accessibility Styles
│
├── 🧠 app.js                         (720 líneas)
│   ├── NavigationController
│   ├── DashboardManager
│   ├── FormManager
│   ├── ChecklistManager
│   ├── SignatureManager
│   ├── PhotoManager
│   ├── NotificationManager
│   └── Initialization Logic
│
├── 🧩 components.js                  (474 líneas)
│   ├── 13 Component Functions
│   ├── RenderUtils
│   └── Templates
│
├── 💾 mock-data.js                   (536 líneas)
│   ├── AppData Object
│   └── DataService API
│
└── 📚 Documentación
    ├── FASE_5_6_IMPLEMENTACION.md
    ├── VERIFICACION_FINAL.md
    └── DOCUMENTACION_TECNICA.md (este archivo)
```

**Total de código:** ~2,934 líneas

---

## 🔧 MÓDULOS Y MANAGERS

### 1. NavigationController

**Responsabilidad:** Gestión de navegación entre pantallas

**Métodos:**
```javascript
NavigationController.goTo(screenId)      // Navega a una pantalla
NavigationController.goBack()            // Vuelve a pantalla anterior
NavigationController.onScreenChange(id)  // Callback al cambiar pantalla
```

**Propiedades:**
- `currentScreen` - ID de pantalla actual
- `history` - Array con historial de navegación

**Flujo:**
```
Usuario → onclick="goTo('detail')" → NavigationController.goTo() 
→ Oculta todas las pantallas → Muestra pantalla target → onScreenChange callback
```

---

### 2. DashboardManager

**Responsabilidad:** Gestión de estadísticas y vista del dashboard

**Métodos:**
```javascript
DashboardManager.updateStats(range)  // Actualiza estadísticas ('today' | 'week')
```

**Integración:**
- Lee datos desde `DataService.getStats(range)`
- Actualiza elementos DOM:
  - `#stat-completed` - Trabajos completados
  - `#stat-pending` - Trabajos pendientes
  - `#agenda-title` - Título de agenda

**Ejemplo de uso:**
```javascript
// HTML
<select id="timeRange" onchange="updateDashboardStats(this.value)">
  <option value="today">Hoy</option>
  <option value="week">Esta Semana</option>
</select>

// JavaScript
window.updateDashboardStats('today');
```

---

### 3. FormManager

**Responsabilidad:** Validación y gestión de formularios

**Métodos:**
```javascript
FormManager.validate(formId)          // Valida formulario completo
FormManager.isValidEmail(email)       // Valida formato de email
FormManager.getData(formId)           // Obtiene datos del formulario
FormManager.reset(formId)             // Resetea formulario
```

**Validaciones implementadas:**
1. **Campos required:** Verifica que no estén vacíos
2. **Formato de email:** Regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
3. **Longitud mínima:** Atributo `data-min-length`

**Feedback visual:**
- Campo inválido: `border-red-500`, `ring-red-500`
- Campo válido: `border-slate-200`

**Ejemplo de uso:**
```javascript
// Validar antes de enviar
if (FormManager.validate('loginForm')) {
    const data = FormManager.getData('loginForm');
    // Procesar datos...
}
```

---

### 4. ChecklistManager

**Responsabilidad:** Gestión de checklists con persistencia

**Métodos:**
```javascript
ChecklistManager.init(screenId)          // Inicializa con persistencia
ChecklistManager.saveState(screenId)     // Guarda estado en localStorage
ChecklistManager.loadState(screenId)     // Carga estado guardado
ChecklistManager.getProgress(screenId)   // Obtiene progreso actual
```

**Persistencia:**
```javascript
// Estructura en localStorage
localStorage['calibeb_checklist_step1'] = [true, false, true, false]
```

**Auto-inicialización:**
```javascript
// En DOMContentLoaded
const checklistScreens = ['checkin', 'step1', 'step2'];
checklistScreens.forEach(screenId => {
    ChecklistManager.init(screenId);
});
```

**Retorno de getProgress():**
```javascript
{
    total: 5,           // Total de checkboxes
    checked: 3,         // Checkboxes marcados
    remaining: 2,       // Sin marcar
    percentage: 60,     // Porcentaje
    isComplete: false   // Si está completo
}
```

---

### 5. SignatureManager

**Responsabilidad:** Gestión de firma digital con Canvas

**Métodos:**
```javascript
SignatureManager.init(canvasId)      // Inicializa canvas
SignatureManager.clear()             // Limpia firma
SignatureManager.toDataURL()         // Exporta como PNG
SignatureManager.hasSignature()      // Verifica si hay firma
```

**Propiedades:**
- `canvas` - Elemento canvas
- `ctx` - Contexto 2D
- `isDrawing` - Estado de dibujo
- `lastX`, `lastY` - Última posición del cursor

**Eventos soportados:**
- **Touch:** `touchstart`, `touchmove`, `touchend`
- **Mouse:** `mousedown`, `mousemove`, `mouseup`, `mouseleave`

**Configuración del canvas:**
```javascript
ctx.strokeStyle = '#000000';
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
```

**Ejemplo de uso:**
```html
<canvas id="signature-canvas" width="600" height="300"></canvas>
<button onclick="CalibekApp.Signature.clear()">Borrar</button>
```

---

### 6. PhotoManager

**Responsabilidad:** Captura simulada y almacenamiento de fotos

**Métodos:**
```javascript
PhotoManager.capturePhoto(type)       // Captura y guarda foto
PhotoManager.generateMockPhoto(type)  // Genera imagen simulada
PhotoManager.savePhoto(photo)         // Guarda en localStorage
PhotoManager.getAllPhotos()           // Obtiene todas las fotos
PhotoManager.deletePhoto(photoId)     // Elimina una foto
PhotoManager.clearAll()               // Limpia todas las fotos
```

**Estructura de Photo:**
```javascript
{
    id: "photo_1675345678901",
    type: "exterior",
    dataURL: "data:image/png;base64,iVBORw0KGgo...",
    timestamp: 1675345678901,
    date: "2026-02-02T10:15:00.000Z"
}
```

**Tipos de foto:**
- `exterior` - Foto exterior de máquina
- `valvulas` - Foto de válvulas
- `antes`, `durante`, `despues` - Fotos de correctivo

**Generación de imágenes mock:**
```javascript
// Canvas 400x300 con gradiente naranja + texto
const gradient = ctx.createLinearGradient(0, 0, 400, 300);
gradient.addColorStop(0, '#F97316');
gradient.addColorStop(1, '#EA580C');
```

---

### 7. NotificationManager

**Responsabilidad:** Sistema de notificaciones (actualmente en consola)

**Métodos:**
```javascript
NotificationManager.show(message, type)  // type: 'info' | 'success' | 'error' | 'warning'
```

**Estado actual:**
- Output a `console.log`
- Preparado para implementación de UI toast

**Uso:**
```javascript
NotificationManager.show('Foto capturada exitosamente', 'success');
```

---

## 🌐 API GLOBAL

### window.goTo()
```javascript
window.goTo(screenId: string) → void
```
Navega a una pantalla específica.

**Ejemplo:**
```html
<button onclick="goTo('dashboard')">Ir al Dashboard</button>
```

---

### window.goBack()
```javascript
window.goBack() → void
```
Vuelve a la pantalla anterior en el historial.

---

### window.updateDashboardStats()
```javascript
window.updateDashboardStats(range: 'today' | 'week') → void
```
Actualiza estadísticas del dashboard.

---

### window.CalibekApp
```javascript
window.CalibekApp = {
    Navigation: NavigationController,
    Dashboard: DashboardManager,
    Form: FormManager,
    Checklist: ChecklistManager,
    Signature: SignatureManager,
    Photo: PhotoManager,
    Notification: NotificationManager
}
```

**Uso desde consola:**
```javascript
// Navegar
CalibekApp.Navigation.goTo('step1');

// Validar formulario
CalibekApp.Form.validate('loginForm');

// Obtener progreso
CalibekApp.Checklist.getProgress('step1');

// Limpiar firma
CalibekApp.Signature.clear();

// Ver fotos
CalibekApp.Photo.getAllPhotos();
```

---

### window.DataService
```javascript
window.DataService = {
    getWorkOrders()           // Obtiene todas las órdenes
    getWorkOrder(id)          // Obtiene una orden específica
    getStats(range)           // Obtiene estadísticas
    getTechnician()           // Obtiene info del técnico
    getCatalogs()             // Obtiene catálogos
    getChecklistTemplate(id)  // Obtiene template de checklist
    getAppConfig()            // Obtiene configuración
    updateWorkOrder(id, data) // Actualiza orden
}
```

---

## 🔄 FLUJO DE DATOS

### Carga Inicial

```
1. HTML carga en navegador
2. ↓
3. Carga styles.css (697 líneas de estilos)
4. ↓
5. Carga mock-data.js → Inicializa window.DataService
6. ↓
7. Carga components.js → Define componentes reutilizables
8. ↓
9. Carga app.js → Define managers y lógica
10. ↓
11. DOMContentLoaded → Ejecuta inicialización
    ├── DashboardManager.updateStats('today')
    ├── initializeChecklists() → 3 pantallas
    ├── initializePhotoButtons() → Auto-mapeo
    ├── setupEventListeners()
    └── initializeSignaturePad()
```

### Navegación entre Pantallas

```
Usuario hace click
    ↓
onclick="goTo('detail')"
    ↓
window.goTo('detail')
    ↓
NavigationController.goTo('detail')
    ↓
1. Guarda 'detail' en history
2. Oculta todas las .screen
3. Muestra #detail con .active
4. Ejecuta onScreenChange('detail')
5. Scroll al inicio de la pantalla
```

### Persistencia de Checkboxes

```
Usuario marca checkbox
    ↓
change event
    ↓
ChecklistManager.saveState(screenId)
    ↓
Lee todos los checkboxes de la pantalla
    ↓
Crea array [true, false, true...]
    ↓
localStorage.setItem('calibeb_checklist_step1', JSON.stringify(array))

--- RECARGA DE PÁGINA ---

DOMContentLoaded
    ↓
ChecklistManager.init('step1')
    ↓
ChecklistManager.loadState('step1')
    ↓
Lee localStorage['calibeb_checklist_step1']
    ↓
Restaura estado de cada checkbox
```

### Captura de Fotos

```
Usuario hace click en placeholder
    ↓
event listener detecta click
    ↓
handlePhotoCapture(photoType, buttonElement)
    ↓
PhotoManager.capturePhoto(photoType)
    ↓
1. Genera imagen mock con Canvas
2. Crea objeto Photo con timestamp
3. Guarda en localStorage['calibeb_photos']
4. Retorna photo object
    ↓
Actualiza UI del botón
    ├── backgroundImage = url(dataURL)
    └── innerHTML = ícono de check
```

---

## 🖥️ PANTALLAS Y NAVEGACIÓN

### Mapa de Navegación

```
┌──────────┐
│  LOGIN   │ (Pantalla inicial)
└────┬─────┘
     │
     ↓ (Iniciar sesión)
┌────────────┐      ┌─────────────┐
│ DASHBOARD  │ ←──→ │ CORRECTIVE  │ (Flujo paralelo)
└──────┬─────┘      └─────────────┘
       │
       ↓ (Click en orden)
   ┌────────┐
   │ DETAIL │
   └───┬────┘
       │
       ↓ (Hacer check-in)
   ┌─────────┐
   │ CHECKIN │
   └────┬────┘
        │
        ↓ (Comenzar mantenimiento)
   ┌───────┐     ┌───────┐     ┌───────────┐
   │ STEP1 │ → → │ STEP2 │ → → │ SIGNATURE │
   └───────┘     └───────┘     └───────────┘
                                      │
                                      ↓
                                 DASHBOARD
```

### Detalle de Pantallas

#### 1. LOGIN
- **ID:** `login`
- **Funcionalidad:** Autenticación (simulada)
- **Elementos clave:** Form con email y password
- **Navegación:** → `dashboard`

#### 2. DASHBOARD
- **ID:** `dashboard`
- **Funcionalidad:** Agenda de trabajos y estadísticas
- **Elementos clave:**
  - Selector de rango (today/week)
  - Estadísticas (completados/pendientes)
  - Lista de órdenes de trabajo
  - Botón de correctivo
- **Navegación:** → `detail`, `corrective`
- **Data binding:** `DataService.getStats()`, `DataService.getWorkOrders()`

#### 3. DETAIL
- **ID:** `detail`
- **Funcionalidad:** Detalles de orden preventiva
- **Elementos clave:** Info del cliente, equipo, ubicación
- **Navegación:** → `checkin`, ← `dashboard`

#### 4. CHECKIN
- **ID:** `checkin`
- **Funcionalidad:** Check-in con GPS simulado
- **Elementos clave:** Checklist de seguridad, datos GPS
- **Persistencia:** ✓ Checkboxes en localStorage
- **Navegación:** → `step1`, ← `dashboard`

#### 5. STEP1 (Exterior)
- **ID:** `step1`
- **Funcionalidad:** Verificación exterior de máquina
- **Elementos clave:**
  - Checklist de verificación
  - Captura de foto
  - Notas del técnico
- **Persistencia:** ✓ Checkboxes, ✓ Fotos
- **Navegación:** → `step2`, ← `dashboard`

#### 6. STEP2 (Válvulas)
- **ID:** `step2`
- **Funcionalidad:** Verificación de válvulas
- **Elementos clave:** Similar a STEP1
- **Persistencia:** ✓ Checkboxes, ✓ Fotos
- **Navegación:** → `signature`, ← `dashboard`

#### 7. CORRECTIVE
- **ID:** `corrective`
- **Funcionalidad:** Mantenimiento correctivo urgente
- **Elementos clave:**
  - Selección de cliente y equipo
  - Descripción de falla (required, min 20 chars)
  - 3 fotos (antes, durante, después)
- **Validación:** ✓ Textarea con longitud mínima
- **Persistencia:** ✓ Fotos
- **Navegación:** → `signature`, ← `dashboard`

#### 8. SIGNATURE
- **ID:** `signature`
- **Funcionalidad:** Firma digital del cliente
- **Elementos clave:**
  - Canvas interactivo (600x300)
  - Botón de limpiar
  - Resumen de trabajo
- **Tecnología:** Canvas API con touch/mouse
- **Navegación:** → `dashboard`

---

## 💾 PERSISTENCIA DE DATOS

### localStorage Schema

```javascript
// Fotos capturadas
"calibeb_photos": [
    {
        id: "photo_1675345678901",
        type: "exterior",
        dataURL: "data:image/png;base64,...",
        timestamp: 1675345678901,
        date: "2026-02-02T10:15:00.000Z"
    },
    // ...más fotos
]

// Estado de checkboxes - Pantalla checkin
"calibeb_checklist_checkin": [true, false, true, true]

// Estado de checkboxes - Pantalla step1
"calibeb_checklist_step1": [true, true, false, true, false]

// Estado de checkboxes - Pantalla step2
"calibeb_checklist_step2": [false, true, true]
```

### Gestión de Espacio

**Límites de localStorage:**
- Típicamente: 5-10 MB por origen
- 1 foto PNG base64: ~50-100 KB
- Capacidad estimada: ~50-100 fotos

**Estrategias de optimización:**
```javascript
// Limpiar fotos antiguas
PhotoManager.clearAll();

// Eliminar checkboxes de pantalla específica
localStorage.removeItem('calibeb_checklist_step1');

// Limpiar todo el almacenamiento
localStorage.clear();
```

---

## 🔌 GUÍA DE EXTENSIÓN

### Agregar Nueva Pantalla

**1. HTML (calibeb_demo.html):**
```html
<div id="mi-pantalla" class="screen bg-slate-50" role="region" aria-label="Mi nueva pantalla">
    <div class="p-6">
        <h2 class="text-xl font-bold">Mi Pantalla</h2>
        <!-- Contenido -->
    </div>
</div>
```

**2. CSS (styles.css):**
```css
/* Estilos específicos si son necesarios */
#mi-pantalla .mi-clase-custom {
    /* ... */
}
```

**3. Navegación (app.js):**
```javascript
// Ya funciona automáticamente con goTo('mi-pantalla')
```

---

### Agregar Nuevo Manager

**1. Definir Manager (app.js):**
```javascript
const MiManager = {
    /**
     * Descripción del método
     * @param {string} param - Descripción del parámetro
     */
    miMetodo(param) {
        // Lógica
        console.log(`✓ Operación completada: ${param}`);
    },
    
    miPropiedad: 'valor inicial'
};
```

**2. Exportar en API Global:**
```javascript
window.CalibekApp = {
    // ...managers existentes
    MiManager: MiManager
};
```

---

### Agregar Nuevo Componente

**1. Definir Componente (components.js):**
```javascript
/**
 * Genera HTML para mi componente
 * @param {Object} props - Propiedades del componente
 * @returns {string} - HTML string
 */
function miComponente(props) {
    return `
        <div class="mi-componente">
            <h3>${props.titulo}</h3>
            <p>${props.contenido}</p>
        </div>
    `;
}
```

**2. Usar Componente:**
```javascript
const html = miComponente({
    titulo: 'Mi Título',
    contenido: 'Mi contenido'
});
RenderUtils.append('mi-contenedor', html);
```

---

### Agregar Validación Custom

**1. Extender FormManager (app.js):**
```javascript
FormManager.validateCustom = function(fieldId, validationFn) {
    const field = document.getElementById(fieldId);
    if (!validationFn(field.value)) {
        this.markFieldAsInvalid(field);
        return false;
    }
    this.markFieldAsValid(field);
    return true;
};
```

**2. Usar:**
```javascript
FormManager.validateCustom('mi-campo', (value) => {
    return value.length >= 10 && value.includes('@');
});
```

---

### Integrar API Real

**1. Reemplazar DataService (mock-data.js):**
```javascript
const DataService = {
    async getWorkOrders() {
        const response = await fetch('/api/work-orders');
        return await response.json();
    },
    
    async updateWorkOrder(id, data) {
        const response = await fetch(`/api/work-orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
    
    // ...más métodos
};
```

**2. Actualizar DashboardManager:**
```javascript
async updateStats(range) {
    try {
        const data = await DataService.getStats(range);
        // Actualizar UI con data
    } catch (error) {
        NotificationManager.show('Error al cargar estadísticas', 'error');
    }
}
```

---

## 🎨 DESIGN TOKENS

### Colores Principales

```css
--color-primary: #F97316;           /* Naranja Calibeb */
--color-primary-dark: #EA580C;      /* Naranja oscuro */
--color-dark-bg: #0F172A;           /* Fondo oscuro */
--color-dark-sidebar: #0F172A;      /* Sidebar */
```

### Estados

```css
--color-success: #10B981;           /* Verde */
--color-warning: #F59E0B;           /* Amarillo */
--color-danger: #EF4444;            /* Rojo */
```

### Espaciados (Sistema 8pt)

```css
--spacing-xs: 0.5rem;    /* 8px */
--spacing-sm: 0.75rem;   /* 12px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
```

---

## 🧪 TESTING

### Validación de Sintaxis

```powershell
# JavaScript
node --check app.js
node --check components.js
node --check mock-data.js

# Balance HTML
# Ver script en terminal
```

### Tests Manuales Recomendados

**Checklist de pruebas:**
- [ ] Todas las pantallas son accesibles
- [ ] Navegación funciona en ambas direcciones
- [ ] Checkboxes persisten después de F5
- [ ] Fotos se capturan y se muestran
- [ ] Firma digital funciona con mouse y touch
- [ ] Validación de formularios muestra errores
- [ ] Estadísticas del dashboard actualizan correctamente
- [ ] No hay errores en consola

---

## 📊 MÉTRICAS DEL PROYECTO

| Métrica | Valor |
|---------|-------|
| **Archivos totales** | 7 |
| **Líneas de código** | 2,934 |
| **Managers** | 7 |
| **Componentes** | 13 |
| **Pantallas** | 8 |
| **Design Tokens** | 47 |
| **Funciones globales** | 3 |
| **API endpoints (mock)** | 8 |
| **localStorage keys** | 4 |

---

## 🔐 SEGURIDAD

### Consideraciones

1. **Datos en localStorage:** No almacenar información sensible
2. **Validación client-side:** Solo para UX, validar en servidor
3. **XSS Protection:** Evitar innerHTML con datos de usuario
4. **HTTPS:** Requerido en producción

---

## 📱 COMPATIBILIDAD

### Navegadores Soportados

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Características Requeridas

- ✅ ES6+ (Arrow functions, const/let, template literals)
- ✅ CSS Custom Properties
- ✅ Canvas API
- ✅ localStorage API
- ✅ Touch Events
- ✅ Flexbox/Grid

---

## 🚀 DEPLOYMENT

### Producción

```bash
# 1. Minificar CSS y JS (opcional)
npm install -g csso-cli terser

csso styles.css -o styles.min.css
terser app.js -o app.min.js
terser components.js -o components.min.js
terser mock-data.js -o mock-data.min.js

# 2. Actualizar referencias en HTML
# 3. Subir a servidor web
# 4. Configurar HTTPS
```

### CDN Externas Usadas

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">
```

---

## 🐛 TROUBLESHOOTING

### Problema: Pantallas no navegan

**Solución:**
```javascript
// Verificar en consola
console.log(typeof window.goTo);  // Debe ser 'function'
console.log(NavigationController); // Debe existir

// Verificar orden de carga de scripts
// mock-data.js → components.js → app.js
```

### Problema: Checkboxes no persisten

**Solución:**
```javascript
// Verificar localStorage
console.log(localStorage.getItem('calibeb_checklist_step1'));

// Re-inicializar
ChecklistManager.init('step1');
```

### Problema: Firma no funciona

**Solución:**
```javascript
// Verificar canvas
const canvas = document.getElementById('signature-canvas');
console.log(canvas, canvas.getContext('2d'));

// Re-inicializar
SignatureManager.init('signature-canvas');
```

---

## 📞 SOPORTE

**Equipo Calibeb**  
**Email:** soporte@calibeb.com  
**GitHub:** github.com/calibeb/mobile-ui-demo

---

**Última actualización:** 02 de Febrero de 2026  
**Versión del documento:** 1.0
