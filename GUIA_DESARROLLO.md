# 🛠️ Guía de Desarrollo - Calibeb App

## ⚠️ ADVERTENCIAS CRÍTICAS

### 🚫 NO HACER - Errores Comunes que Rompen la Aplicación

#### 1. ❌ NO Modularizar las Pantallas en Archivos Separados
**NUNCA** separes las pantallas (`login`, `dashboard`, `detail`, `checkin`, etc.) en archivos HTML individuales.

**❌ INCORRECTO:**
```
detail.html
checkin.html
step1.html
```

**✅ CORRECTO:**
```html
<!-- Todas las pantallas DEBEN estar en calibeb_demo.html -->
<div id="detail" class="screen">...</div>
<div id="checkin" class="screen">...</div>
```

**RAZÓN:** La función `goTo()` depende de que todas las pantallas estén en el mismo documento. Si separas las pantallas, `document.getElementById()` no podrá encontrarlas y la navegación se romperá.

---

#### 2. ❌ NO Cambiar el Viewport sin Probar en Todos los Archivos
Si modificas el viewport en un archivo HTML, **DEBES** aplicar el mismo cambio en TODOS los archivos HTML del proyecto.

**✅ Viewport estándar en TODOS los archivos:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**RAZÓN:** Diferentes configuraciones de viewport causan cambios de zoom entre páginas, creando una experiencia inconsistente.

---

#### 3. ❌ NO Modificar la Estructura del mobile-frame
El contenedor `.mobile-frame` en `styles.css` tiene dimensiones específicas de iPhone:

```css
.mobile-frame {
    width: var(--device-width);  /* 390px */
    height: var(--device-height); /* 844px */
}
```

**NO** cambies estas dimensiones sin actualizar TODAS las referencias en:
- `styles.css` (variables CSS)
- Media queries responsive
- Posicionamiento de elementos internos

---

#### 4. ❌ NO Usar window.location.href para Navegación Interna
**DENTRO de calibeb_demo.html**, usa SIEMPRE `goTo()` para navegar:

**❌ INCORRECTO:**
```javascript
onclick="window.location.href='detail.html'"
```

**✅ CORRECTO:**
```javascript
onclick="goTo('detail')"
```

**RAZÓN:** `goTo()` maneja la navegación SPA correctamente, mientras que `window.location.href` recargará la página.

---

#### 5. ❌ NO Borrar o Renombrar IDs de Pantallas
Los IDs de las pantallas son **CRÍTICOS** para el sistema de navegación:

```html
<!-- IDs OBLIGATORIOS - NO CAMBIAR -->
<div id="login" class="screen active">...</div>
<div id="dashboard" class="screen">...</div>
<div id="detail" class="screen">...</div>
<div id="checkin" class="screen">...</div>
<!-- ... steps 1-10, signature, success, corrective -->
```

Si necesitas renombrar un ID, debes actualizar:
1. El `<div id="...">`
2. Todas las llamadas a `goTo('...')`
3. El menú de navegación del demo

---

## ✅ MEJORES PRÁCTICAS

### 1. Sistema de Navegación SPA

**Función Central:** `goTo(screenId)`
```javascript
// Definida en app.js línea ~702
window.goTo = (screenId) => NavigationController.goTo(screenId);
```

**Cómo funciona:**
1. Oculta todas las pantallas removiendo clase `active`
2. Muestra la pantalla objetivo agregando clase `active`
3. Actualiza el historial de navegación
4. Ejecuta callbacks específicos de la pantalla

**Uso correcto:**
```html
<!-- Botón que navega al dashboard -->
<button onclick="goTo('dashboard')">Ir al Dashboard</button>

<!-- Formulario que navega tras submit -->
<form onsubmit="event.preventDefault(); goTo('step2');">
```

---

### 2. Persistencia con LocalStorage

**Ubicación:** `app.js` - ChecklistManager y PhotoManager

**Checklists:**
```javascript
// Auto-guarda cuando cambias un checkbox
ChecklistManager.saveChecklist(screenId, state);

// Auto-restaura al cargar pantalla
ChecklistManager.loadChecklist(screenId);
```

**Fotos:**
```javascript
// Guarda foto en localStorage
PhotoManager.savePhoto(screenId, photoIndex, dataURL);

// Recupera al cargar
PhotoManager.loadPhotos(screenId);
```

**Clave de Storage:** `calibeb_app_${screenId}_${tipo}`

**Limpiar datos de prueba:**
```javascript
// En consola del navegador
localStorage.clear();
```

---

### 3. Estructura de una Pantalla

Todas las pantallas siguen el mismo patrón:

```html
<div id="nombre-pantalla" class="screen bg-slate-50">
    <!-- Header con navegación -->
    <div class="bg-white pt-12 pb-4 px-4">
        <button onclick="goTo('pantalla-anterior')">
            <i class="fas fa-arrow-left"></i>
        </button>
        <h2>Título de Pantalla</h2>
    </div>

    <!-- Contenido scrolleable -->
    <div class="p-5 overflow-y-auto no-scrollbar pb-24 flex-1">
        <!-- Tu contenido aquí -->
    </div>

    <!-- Footer fijo (opcional) -->
    <div class="absolute bottom-0 w-full">
        <button onclick="goTo('siguiente-pantalla')">
            Siguiente
        </button>
    </div>
</div>
```

**Clases importantes:**
- `screen`: Clase base para todas las pantallas
- `active`: Pantalla actualmente visible
- `no-scrollbar`: Oculta scrollbar pero mantiene scroll
- `pb-24`: Padding bottom para evitar que navbar tape contenido

---

### 4. Agregar una Nueva Pantalla

**Paso 1:** Agrega el HTML dentro de `.mobile-frame`:
```html
<div id="mi-nueva-pantalla" class="screen bg-slate-50">
    <div class="bg-white pt-12 pb-4 px-4">
        <button onclick="goTo('dashboard')">
            <i class="fas fa-arrow-left"></i>
        </button>
        <h2>Mi Nueva Pantalla</h2>
    </div>
    
    <div class="p-5 overflow-y-auto no-scrollbar pb-24 flex-1">
        <p>Contenido de tu nueva pantalla</p>
    </div>
</div>
```

**Paso 2:** Agrega botón en el menú de navegación:
```html
<button onclick="goTo('mi-nueva-pantalla')" class="text-xs bg-slate-100 hover:bg-slate-200 p-2 rounded text-left">
    Mi Pantalla
</button>
```

**Paso 3:** Crea navegación desde otra pantalla:
```html
<button onclick="goTo('mi-nueva-pantalla')">
    Ir a Mi Pantalla
</button>
```

---

### 5. Modificar Estilos Globales

**Archivo:** `styles.css`

**Variables CSS (líneas 10-58):**
```css
:root {
    --color-primary: #F97316;      /* Naranja Calibeb */
    --color-dark-bg: #0F172A;       /* Fondo oscuro */
    --device-width: 390px;          /* Ancho del iPhone */
    --device-height: 844px;         /* Alto del iPhone */
}
```

**Para cambiar el color primario:**
```css
:root {
    --color-primary: #E11D48; /* Nuevo color rojo */
}
```

Todos los elementos que usen `btn-primary`, `text-calibeb`, etc. se actualizarán automáticamente.

---

### 6. Agregar Validación a Formularios

**Patrón recomendado:**
```javascript
function validateForm() {
    const requiredField = document.getElementById('campo-requerido').value;
    
    if (!requiredField || requiredField.trim() === '') {
        NotificationManager.show('Por favor completa todos los campos', 'error');
        return false;
    }
    
    return true;
}
```

**Uso en formulario:**
```html
<form onsubmit="event.preventDefault(); if(validateForm()) goTo('siguiente');">
    <input id="campo-requerido" type="text" required>
    <button type="submit">Continuar</button>
</form>
```

---

### 7. Testing y Debugging

**Consola del navegador (F12):**
```javascript
// Ver pantalla actual
NavigationController.currentScreen

// Ver historial de navegación
NavigationController.history

// Navegar programáticamente
goTo('step5')

// Ver datos guardados
localStorage.getItem('calibeb_app_step1_checklist')

// Limpiar todo
localStorage.clear()
```

**Verificar que una pantalla existe:**
```javascript
document.getElementById('nombre-pantalla') !== null
```

---

## 🔧 Flujo de Trabajo Recomendado

### Para Agregar Funcionalidad Nueva:

1. ✅ **Planifica:** Define qué pantallas necesitas y cómo navegarás entre ellas
2. ✅ **Crea HTML:** Agrega las nuevas pantallas en `calibeb_demo.html`
3. ✅ **Agrega navegación:** Usa `goTo()` para conectar pantallas
4. ✅ **Prueba navegación:** Verifica que puedas ir y volver sin errores
5. ✅ **Agrega lógica:** Implementa funcionalidad en `app.js`
6. ✅ **Prueba con datos reales:** Usa datos de `mock-data.js`
7. ✅ **Documenta:** Agrega comentarios explicando qué hace tu código

### Para Modificar Funcionalidad Existente:

1. ✅ **Lee comentarios:** Entiende qué hace el código actual
2. ✅ **Busca dependencias:** Verifica qué otras partes usan esa función
3. ✅ **Haz cambios pequeños:** Modifica una cosa a la vez
4. ✅ **Prueba inmediatamente:** Recarga y verifica que funcione
5. ✅ **Actualiza comentarios:** Si cambias lógica, actualiza documentación

---

## 📚 Archivos Clave del Proyecto

### calibeb_demo.html (1126 líneas)
- **Contenido:** TODAS las pantallas de la aplicación
- **Estructura:** SPA con navegación controlada por JS
- **NO SEPARAR:** Mantener todo en un solo archivo

### app.js (718 líneas)
- **NavigationController:** Sistema de navegación (línea ~6)
- **DashboardManager:** Lógica del dashboard (línea ~80)
- **FormManager:** Validaciones de formularios (línea ~155)
- **ChecklistManager:** Persistencia de checklists (línea ~200)
- **SignatureManager:** Canvas de firma (línea ~280)
- **PhotoManager:** Captura de fotos (línea ~380)
- **NotificationManager:** Mensajes toast (línea ~480)
- **API Global:** `window.goTo()` (línea ~702)

### styles.css (697 líneas)
- **Variables CSS:** Colores y dimensiones (línea ~10)
- **Mobile Frame:** Simulador de iPhone (línea ~99)
- **Pantallas:** Sistema de screens (línea ~128)
- **Componentes:** Botones, inputs, cards (línea ~150+)
- **Animaciones:** Fade-in, pulse (línea ~600)

### mock-data.js
- **Datos de prueba:** Órdenes, clientes, equipos
- **Fácil de modificar:** Cambiar nombres, fechas, etc.

### components.js
- **Funciones helper:** Generación de HTML dinámico
- **Reutilización:** Componentes comunes

---

## 🐛 Troubleshooting

### Problema: "goTo is not defined"
**Causa:** `app.js` no se cargó correctamente
**Solución:** Verifica que el orden de scripts sea:
1. `mock-data.js`
2. `components.js`
3. `app.js`

### Problema: "La pantalla no se muestra"
**Causa:** ID incorrecto o pantalla no existe
**Solución:**
```javascript
// En consola
document.getElementById('tu-pantalla-id')
// Si devuelve null, el ID está mal
```

### Problema: "Los estilos no se aplican"
**Causa:** Conflicto con Tailwind CSS CDN
**Solución:** Tailwind tiene prioridad. Usa `!important` en CSS personalizado:
```css
.mi-clase {
    color: red !important;
}
```

### Problema: "LocalStorage no guarda"
**Causa:** Navegación privada o límite de storage
**Solución:**
```javascript
// Verificar espacio disponible
console.log('Storage usado:', JSON.stringify(localStorage).length, 'bytes');

// Limpiar datos viejos
localStorage.removeItem('calibeb_app_old_screen_checklist');
```

---

## 📝 Checklist Pre-Commit

Antes de hacer commit de cambios, verifica:

- [ ] ✅ Todas las pantallas están en `calibeb_demo.html`
- [ ] ✅ Navegación usa `goTo()` para SPA
- [ ] ✅ Viewport idéntico en todos los HTML externos
- [ ] ✅ Scripts cargados en orden correcto
- [ ] ✅ IDs de pantallas no cambiaron
- [ ] ✅ Comentarios actualizados
- [ ] ✅ Probado en Chrome/Firefox/Safari
- [ ] ✅ LocalStorage funciona correctamente
- [ ] ✅ Sin errores en consola (F12)
- [ ] ✅ Navegación completa funciona (login → success)

---

## 🎓 Para Nuevos Desarrolladores

1. **Lee primero:** README.md y esta guía
2. **Explora:** Abre `calibeb_demo.html` en navegador
3. **Prueba navegación:** Usa el menú lateral (solo visible en desktop)
4. **Inspecciona código:** Lee comentarios en cada sección
5. **Haz cambios pequeños:** Empieza modificando textos o colores
6. **Pregunta antes de refactorizar:** Arquitectura SPA es intencional
7. **Documenta tus cambios:** Agrega comentarios explicativos

---

## 🆘 Soporte

Si encuentras un bug o necesitas ayuda:

1. Abre DevTools (F12) y revisa consola
2. Verifica que el navegador sea compatible (Chrome 90+)
3. Limpia localStorage: `localStorage.clear()`
4. Recarga forzando cache: Ctrl+Shift+R
5. Consulta esta guía y los comentarios en código
6. Compara con versión en repositorio

---

**Última actualización:** Febrero 2026
**Versión:** 4.0 (SPA Completa con 10 pasos)
