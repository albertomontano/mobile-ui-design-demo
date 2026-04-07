# CONTEXTO COMPLETO — AGENTE FRONTEND CALIWEB
**Versión del documento:** 1.0 (Auditado contra código real — Abril 2026)  
**Fuente de verdad:** `calibeb_demo.html` (1,639 líneas), `app.js` (834 líneas), `mock-data.js` (441 líneas)  
**App móvil actual:** Calibeb Mobile Demo V5 — "Flujo optimizado de 7 pasos consolidados"

> **ADVERTENCIA:** Los documentos `README.md`, `DOCUMENTACION_TECNICA.md`, `VERIFICACION_FINAL.md`, `REVISION_FINAL_FASE_7_8.md` y `REPORTE_PRE_PRUEBA.md` están **DESACTUALIZADOS**. Este documento es el reemplazo unificado y correcto.

---

## 1. ARQUITECTURA DEL PROYECTO MÓVIL

### Stack Técnico
- **HTML5 SPA** — todos los screens en un solo archivo `calibeb_demo.html`
- **Tailwind CSS CDN** — clases utilitarias inline, sin build step
- **Font Awesome 6.4.0** — íconografía
- **Google Fonts Inter** — tipografía
- **JavaScript Vanilla** — `app.js` (NavigationController, FormManager, ChecklistManager, SignatureManager, PhotoManager, NotificationManager)
- **Datos Mock:** `mock-data.js` (define estructuras de datos reales)
- **Componentes:** `components.js` (componentes reutilizables)

### Archivos Existentes Completos
| Archivo | Líneas | Rol |
|---|---|---|
| `calibeb_demo.html` | 1,639 | SPA principal — todos los screens móviles |
| `app.js` | 834 | Lógica de negocio, navegación, validaciones |
| `mock-data.js` | 441 | Estructuras de datos y datos de prueba |
| `components.js` | 383 | Componentes de UI reutilizables |
| `styles.css` | 696 | Estilos custom (animaciones, mobile-frame) |
| `reporte.html` | 325 | Reporte PDF renderizable — Mantenimiento Preventivo |
| `reporte-hielo.html` | 213 | Reporte PDF renderizable — Máquina de Hielo |
| `success.html` | 120 | Pantalla de confirmación post-servicio |

### Identidad Visual
- **Color primario:** `#F97316` (naranja Calibeb)
- **Fondo oscuro:** `#0F172A` (slate-900)
- **Fondo claro:** `#F8FAFC` (slate-50)
- **Color correctivo:** `#DC2626` (red-600)
- **Color hielo:** `#1E40AF` (blue-800)
- **Fuente:** Inter (Google Fonts)

---

## 2. INVENTARIO COMPLETO DE SCREENS (REAL — V5)

### Navegación General
La SPA usa `window.goTo(screenId, options?)` para navegar entre screens. Todos los screens son `<div id="[screen-id]" class="screen">` dentro de `#app-container`.

**Firma especial:** `window.goTo(screenId, {reportType: 'hielo'})` — almacena en `localStorage.setItem('currentReportType', 'hielo')` para ruteo post-servicio.

**Salida de la SPA:** La pantalla `signature` usa `window.location.href='success.html'` al finalizar (rompe la SPA para ir a página separada).

---

### LISTADO COMPLETO DE 22 SCREENS

#### GRUPO 1: Autenticación y Dashboard

| Screen ID | Título | Descripción |
|---|---|---|
| `login` | Acceso Técnico | Login con usuario/contraseña. Color naranja. CTA: "Entrar al Sistema" → `dashboard` |
| `dashboard` | Mi Agenda | Lista de órdenes de trabajo del día. Órdenes agrupadas por cliente. CTA Preventivo → `detail`. CTA Correctivo → `corrective-qr-scan` |

**Estructura de tarjeta de orden en dashboard:**
```
[Badge RETRASADO/PROGRAMADO/EN PROCESO/COMPLETADO] 
Hora: XX:XX AM
Cliente: [Nombre] — [N] Equipos (agrupado)
Dirección
[Botón PREVENTIVO naranja → detail]
[Botón CORRECTIVO rojo → corrective-qr-scan]
```

**Badges de estado en dashboard:**
| Estado | Color | Hex |
|---|---|---|
| PROGRAMADO | Verde | `#16A34A` bg `#DCFCE7` |
| EN PROCESO | Naranja | `#F97316` bg `#FFF7ED` |
| RETRASADO | Ámbar | `#D97706` bg `#FFFBEB` |
| COMPLETADO | Slate | `#475569` bg `#F1F5F9` |

---

#### GRUPO 2: Flujo Preventivo Completo

| Screen ID | Título | Descripción |
|---|---|---|
| `detail` | Detalle Orden | Información completa de la orden. CTA "Iniciar Check-in" → `checkin` |
| `checkin` | Validación GPS | Mapa de fondo, confirma ubicación. CTA "Validar Ubicación" → `qr-scan` |
| `qr-scan` | Escanear QR | Pantalla de cámara para escaneo QR del equipo. "No tengo QR" → `qr-unavailable`. Auto-valida → `qr-validated` |
| `qr-validated` | QR Validado ✓ | Confirmación verde. Muestra código QR y hora. CTA → `step1` |
| `qr-unavailable` | Sin QR | Selección manual de cliente y equipo. Campo de explicación. CTA → `step1` |
| `step1` | Revisión Exterior | Checklist de estado físico exterior. Radio buttons para tapa y etiquetas. CTA → `step2` |
| `step2` | Válvulas | Checklist de estado de válvulas. CTA → `step3` |
| `step3` | Refrigeración | Checklist + toggle "No Aplica" completo para el paso. CTA → `step4` |
| `step4` | Filtración y Desagüe | Checklist + campo fecha de caducidad de filtro (date input). CTA → `step5` |
| `step5` | Bombas | Checklist estándar. CTA → `step6` |
| `step6` | Componentes Adicionales | 3 secciones colapsables "No Aplica": Carbonatador, Bomba de Agua, Compresor de Aire. CTA → `step7` |
| `step7` | Calibración | **Tabla de 12 válvulas** con: Válvula#, Producto (text), Caducidad (date), A-J (select). CTA → `signature` |
| `ice-machine-step` | Máquina de Hielo | Pantalla azul (Scotsman). 5 ítems de checklist específico + campo Ciclo de Producción. CTA → `signature` con `{reportType:'hielo'}` |
| `signature` | Finalizar Servicio | Canvas de firma digital. Input nombre del cliente. Checkbox de consentimiento. CTA → `success.html` (window.location.href) |

---

#### GRUPO 3: Flujo Correctivo Completo

| Screen ID | Título | Descripción |
|---|---|---|
| `corrective-qr-scan` | Escanear QR Correctivo | Header rojo. Cámara para QR. "No tengo QR" (checkbox + explicación). CTA → `validateCorrectiveQR()` |
| `corrective-qr-validated` | QR Validado — Correctivo | Confirmación verde con badge rojo "Mantenimiento Correctivo". CTA → `corrective-gps` |
| `corrective-qr-unavailable` | Selección Manual — Correctivo | Dropdowns de cliente y equipo. Muestra explicación registrada. CTA → `corrective-gps` |
| `corrective-gps` | Ubicación Validada — Correctivo | Validación GPS estilo fondo mapa. Badge rojo. CTA → `corrective-form` |
| `corrective-form` | Nuevo Correctivo | Campos validados de cliente/equipo (readonly). Textarea descripción falla (mín 20 chars). Textarea refacciones. Grid 3 fotos (Antes/Después). CTA → `signature` |

---

#### GRUPO 4: Post-Servicio (Páginas Separadas)

| Archivo | Descripción |
|---|---|
| `success.html` | Pantalla verde animada "¡Servicio Finalizado!". Muestra resumen: Orden, Cliente, Duración, Hora. Badge "Reporte enviado" con email. Botón "Ver Reporte" y "Volver al Dashboard" |
| `reporte.html` | Reporte de Mantenimiento Preventivo. Header slate `#1E293B`. Folio badge naranja. Grid de info, pasos del servicio, tabla de calibración, fotos, firma. Botones Imprimir/Descargar PDF. @media print: oculta toolbar |
| `reporte-hielo.html` | Reporte Máquina de Hielo. Header azul `#1E40AF`. Folio badge azul `#3B82F6`. Misma estructura que reporte.html pero azul temático. Sección "Refacciones Utilizadas" adicional |

---

## 3. MAPA DE NAVEGACIÓN COMPLETO

```
LOGIN
  └─→ DASHBOARD
        ├─→ [PREVENTIVO] → DETAIL → CHECKIN → QR-SCAN
        │                                        ├─→ QR-VALIDATED → STEP1
        │                                        └─→ QR-UNAVAILABLE → STEP1
        │                              STEP1 → STEP2 → STEP3 → STEP4 → STEP5 → STEP6 → STEP7
        │                              ─────────────────────────────────────────────────────── ↓
        │                              [Equipo tipo Hielo] → ICE-MACHINE-STEP
        │                              ─────────────────────────────────────────────────────── ↓
        │                              SIGNATURE → success.html → reporte.html / reporte-hielo.html
        │
        └─→ [CORRECTIVO] → CORRECTIVE-QR-SCAN
                              ├─→ CORRECTIVE-QR-VALIDATED → CORRECTIVE-GPS
                              └─→ CORRECTIVE-QR-UNAVAILABLE → CORRECTIVE-GPS
                                                         ↓
                                                CORRECTIVE-FORM → SIGNATURE → success.html
```

**Nota importante:** La navegación entre `ice-machine-step` y `signature` pasa `{reportType: 'hielo'}`. Esto guarda `currentReportType='hielo'` en localStorage. La pantalla `success.html` y los botones "Ver Reporte" deben leer este valor para redirigir a `reporte-hielo.html` vs `reporte.html`.

---

## 4. LÓGICA DE NEGOCIO — FUNCIONES JS CLAVE

### NavigationController
```javascript
// Navega entre screens, opcionalmente guarda tipo de reporte
window.goTo = (screenId, options = {}) => {
    if (options.reportType) {
        localStorage.setItem('currentReportType', options.reportType);
    }
    NavigationController.goTo(screenId);
};
// Agrega screen al historial y aplica clase 'active'
```

### FormManager
Maneja validación de formularios:
- `validateRequiredFields(screenId)` — valida campos `required` en el screen activo
- `validateMinLength(element)` — para `data-min-length="20"` en textarea de correctivo

### ChecklistManager
Gestiona checklists de múltiples pasos:
```javascript
// Screens con checklists activos (V5):
['checkin', 'step1', 'step2', 'step3', 'step4', 'step5', 'step6']
// Cada checklist tiene progreso % actualizado en tiempo real
```

### initializeNoAplicaCheckboxes()
Gestiona secciones colapsables "No Aplica":
```javascript
// IDs gestionados:
'step3-no-aplica'    → colapsa 'step3-content'     // Refrigeración completa
'carbonatador-no-aplica'  → colapsa 'carbonatador-content'  // en step6
'bomba-agua-no-aplica'    → colapsa 'bomba-agua-content'    // en step6  
'compresor-aire-no-aplica' → colapsa 'compresor-aire-content' // en step6
```

### QR Validation Functions
```javascript
// Flujo Preventivo:
window.validateQR = () => {
    // Simula escaneo. Rutea a:
    // goTo('qr-validated')  ← si el QR es válido
    // goTo('qr-unavailable') ← si no hay QR / error
}

// Flujo Correctivo:
window.validateCorrectiveQR = () => {
    // Lee checkbox "no-tengo-qr" y textarea explicación
    // Rutea a:
    // goTo('corrective-qr-validated')
    // goTo('corrective-qr-unavailable')
}

window.toggleCorrectiveQRExplanation = (checked) => {
    // Muestra/oculta div#corrective-qr-explanation cuando
    // checkbox "No tengo QR" está marcado
}
```

### SignatureManager
- Canvas `#signature-canvas` con soporte touch y mouse
- Botón `#clear-signature-btn` limpia el canvas
- Al confirmar: `window.location.href='success.html'` (no usa goTo)

---

## 5. ESTRUCTURA DE DATOS (DE MOCK-DATA.JS)

### Orden de Trabajo (WorkOrder)
```javascript
{
  id: "ORD-2026-001",
  folio: "MNT-2026-123",
  status: "PROGRAMADO" | "EN_PROCESO" | "RETRASADO" | "COMPLETADO",
  tipo: "PREVENTIVO" | "CORRECTIVO",
  fecha: "2026-04-06",
  hora: "09:00",
  cliente: {
    id: "CLI-001",
    nombre: "Aptiv Planta 5",
    contacto: "Roberto Mendoza",
    email: "roberto@aptiv.com",
    direccion: "Blvd. Interamerican 501, Silao, GTO"
  },
  equipo: {
    id: "EQ-001",
    tipo: "DISPENSADOR" | "MAQUINA_HIELO" | "ENFRIADOR" | "CAFETERA",
    marca: "Crathco" | "Scotsman" | "Manitowoc" | "Elkay" | "Bunn",
    modelo: "D35-4J",
    serie: "CRT-2019-3341",
    qrCode: "DISP-2024-45",
    ubicacion: "Comedor Principal"
  },
  tecnico: {
    id: "TEC-001",
    nombre: "Carlos Hernández",
    zona: "Zona Centro"
  }
}
```

### Estructura de Reporte (datos que fluyen al backend)
```javascript
{
  ordenId: "ORD-2026-001",
  tipoReporte: "preventivo" | "hielo" | "correctivo",
  fechaServicio: "2026-04-06",
  horaInicio: "09:15",
  horaFin: "10:30",
  duracion: "1h 15min",
  
  // Solo preventivo
  checkin: {
    gpsValidado: true,
    coordenadas: { lat: 20.9324, lng: -101.4532 },
    precision: "5m",
    qrEscaneado: true | false,
    codigoQR: "DISP-2024-45" | null,
    explicacionSinQR: "" | "texto"
  },
  
  // Pasos step1-step6: array de items con { id, label, checked: bool }
  paso1_exterior: [ { id: "estado-fisico", label: "...", checked: true } ],
  paso2_valvulas: [ ... ],
  paso3_refrigeracion: { noAplica: false, items: [ ... ] },
  paso4_filtracion: { items: [ ... ], fechaCaducidadFiltro: "2026-10-15" },
  paso5_bombas: [ ... ],
  paso6_componentes: {
    carbonatador: { noAplica: false, items: [ ... ] },
    bombaAgua: { noAplica: false, items: [ ... ] },
    compresorAire: { noAplica: false, items: [ ... ] }
  },
  
  // Step 7: Calibración (12 válvulas)
  paso7_calibracion: [
    {
      valvula: 1,         // número 1-12
      producto: "Cola",   // texto libre
      caducidad: "2026-08-01",  // formato date YYYY-MM-DD
      ajuste: "OK" | "MAL" | "--"  // campo A-J
    }
    // × 12 filas
  ],
  
  // Solo flujo hielo
  hielo: {
    checklist: [ { id: "limpieza-exterior", label: "...", checked: true } ],
    cicloProduccion: "250 kg/día"
  },
  
  // Solo correctivo
  correctivo: {
    descripcionFalla: "texto mínimo 20 chars",
    refaccionesUtilizadas: "texto",
    qrEscaneado: true | false,
    codigoQR: "DISP-2024-45" | null,
    explicacionSinQR: "" | "texto"
  },
  
  // Firma (todos los flujos)
  firma: {
    nombreCliente: "Ing. Roberto Mendoza",
    firmaBase64: "data:image/png;base64,...",
    emailEnvio: "roberto@aptiv.com",
    timestamp: "2026-04-06T10:30:00-06:00"
  },
  
  // Fotos (todos los flujos excepto correctivo que tiene antes/después)
  fotos: [
    { tipo: "antes" | "despues" | "evidencia", base64: "...", timestamp: "..." }
  ]
}
```

---

## 6. STEP 7 — CALIBRACIÓN (CRÍTICO: DATOS REALES)

> ⚠️ La documentación anterior describe incorrectamente el Step 7. La realidad es:

**Tabla de 12 válvulas con las siguientes columnas:**

| Columna | Tipo de Input | Opciones/Formato |
|---|---|---|
| Válvula # | Estático (1–12) | Solo lectura |
| Producto | `<input type="text">` | Texto libre (ej: "Cola", "Naranja", "Limón") |
| Caducidad | `<input type="date">` | Formato YYYY-MM-DD |
| A-J | `<select>` | Opciones: `--` / `OK` / `MAL` |

**NO existen campos de PSI, Temperatura ni Estado (esos son de la versión anterior).**

---

## 7. ICE-MACHINE-STEP — FLUJO MÁQUINA DE HIELO

Screen especial para equipos tipo Scotsman/Manitowoc. Diferencias clave:
- **Tema visual azul** (no naranja)
- **Header:** "Máquina de Hielo — Scotsman" con ícono de copo de nieve
- **Checklist específico de 5 ítems** (diferente a los pasos preventivos estándar):
  1. Limpieza exterior del equipo
  2. Revisión del depósito de hielo
  3. Inspección de la placa evaporadora
  4. Revisión del sistema de agua
  5. Verificación de ciclos de producción
- **Campo adicional:** "Ciclo de Producción" (input text, ej: "250 kg/día")
- **Navegación:** CTA → `goTo('signature', {reportType: 'hielo'})`
- **Reporte resultante:** `reporte-hielo.html` (azul)

---

## 8. FLUJO CORRECTIVO — DETALLE COMPLETO

El flujo correctivo es **completamente independiente** del preventivo. Arranca desde el botón CORRECTIVO en el dashboard.

```
DASHBOARD → CORRECTIVE-QR-SCAN
```

### corrective-qr-scan
- Header rojo ("Mantenimiento Correctivo")
- Viewfinder de cámara para QR
- Checkbox "No tengo el código QR disponible"
  - Al activar: muestra `corrective-qr-explanation` (textarea para explicación)
- `validateCorrectiveQR()` evalúa el estado y navega

### corrective-qr-validated
- Confirmación QR exitosa (fondo verde con badge rojo de correctivo)
- Muestra código QR y hora de validación
- CTA → `corrective-gps`

### corrective-qr-unavailable  
- Dropdowns de selección manual: Cliente + Equipo
- Muestra la explicación registrada en el paso anterior
- CTA → `corrective-gps`

### corrective-gps
- Validación GPS (similar al `checkin` preventivo)
- Badge rojo de correctivo
- CTA → `corrective-form`

### corrective-form
- **Campos cliente/equipo:** readonly (pre-poblados desde QR o selección manual)
- **Descripción de la falla:** textarea requerido, mínimo 20 caracteres
- **Refacciones utilizadas:** textarea opcional
- **Evidencia fotográfica:** grid 3 fotos (Foto Antes, Foto Después, + adicional)
- CTA → `signature` (sin parámetro reportType — usa reporte.html estándar)

---

## 9. ARCHIVOS DE REPORTE HTML

### reporte.html (Mantenimiento General/Preventivo)
- **Tema:** Slate oscuro `#1E293B` + naranja `#F97316`
- **Estructura del documento:**
  - Header con logo Calibeb + folio badge naranja
  - Toolbar: botones Imprimir y Descargar PDF (ocultos en @media print)
  - Grid de 4 info-cards: Orden de Trabajo / Cliente / Equipo / Servicio
  - Sección de pasos (step-cards numerados con `step-number` naranja)
  - Tabla de calibración (si aplica)
  - Grid de fotos (5 columnas)
  - Sección de firma con canvas/imagen
  - Footer con email de envío
- **Print-ready:** `@media print { .toolbar { display: none } }`

### reporte-hielo.html (Máquina de Hielo)
- **Tema:** Azul `#1E40AF` + `#3B82F6` (reemplaza toda la paleta naranja)
- **Diferencias vs reporte.html:**
  - Header azul gradiente (`#1e40af → #1e3a8a`)
  - Folio badge azul `#3B82F6`
  - Sección adicional "Refacciones Utilizadas" (`.refacciones-box` verde)
  - Sin tabla de calibración de 12 válvulas
  - Checklist específico de hielo
  - Campo Ciclo de Producción

### success.html
- **Tema:** Verde gradiente (from-green-50 via-emerald-50 to-teal-50)
- **Contenido:**
  - Ícono check animado (animate-ping)
  - "¡Servicio Finalizado!" — H1
  - Tarjeta resumen: Orden de Trabajo, Cliente, Duración, Hora finalización
  - Badge "Reporte enviado" con email del cliente
  - **Botón "Ver Reporte"** → debe leer `localStorage.getItem('currentReportType')` para redirigir a `reporte.html` o `reporte-hielo.html`
  - **Botón "Volver al Dashboard"** → `calibeb_demo.html` (o ruta de la app web)

---

## 10. REGLAS DE NEGOCIO PARA LA WEB (CALIWEB)

### Dashboard de Técnico (vista móvil equivalente en web)
1. Las órdenes se agrupan por cliente cuando hay múltiples equipos ("Aptiv Planta 5 — 2 Equipos")
2. Los 4 estados posibles son: PROGRAMADO, EN PROCESO, RETRASADO, COMPLETADO
3. RETRASADO = la hora programada ya pasó y el técnico no ha iniciado check-in
4. Cada orden tiene 2 acciones: PREVENTIVO y CORRECTIVO (botones separados)

### Validación de Datos
1. **Step 7 calibración:** Los 12 registros son opcionales individualmente pero el paso se considera completo cuando al menos 1 válvula tiene producto ingresado
2. **No Aplica:** Cuando se activa para un paso/sección, todos sus campos se marcan como N/A en el reporte — no se envían vacíos al backend
3. **Firma digital:** Obligatoria. Base64 del canvas. Tamaño canvas: 600×300px
4. **QR sin escanear:** El campo `explicacionSinQR` es requerido cuando `qrEscaneado = false`
5. **Descripción falla correctivo:** Mínimo 20 caracteres validados en frontend

### Flujo de Reportes
```
Tipo equipo normal  → signature → success.html → reporte.html   (tema naranja)
Tipo equipo hielo   → signature → success.html → reporte-hielo.html (tema azul)
Flujo correctivo    → signature → success.html → reporte.html   (sin reportType especial)
```
El discriminador es `localStorage.getItem('currentReportType')`:
- `'hielo'` → `reporte-hielo.html`
- `null` / cualquier otro → `reporte.html`

### Catálogo de Equipos Soportados
| Tipo | Marcas | Flujo |
|---|---|---|
| DISPENSADOR | Crathco, Cornelius | Preventivo estándar (7 pasos) |
| MAQUINA_HIELO | Scotsman, Manitowoc | Flujo hielo (ice-machine-step) |
| ENFRIADOR | Elkay | Preventivo estándar (7 pasos) |
| CAFETERA | Bunn | Preventivo estándar (7 pasos) |

### Clientes en el Sistema (Mock)
- Aptiv Planta 5
- Hotel Grand Marquis
- Comedor Industrial Bajío
- Centro Comercial Altaria

### Zonas Geográficas
- Zona Centro
- Zona Norte
- Zona Sur
- Zona Oriente

---

## 11. PARA EL DASHBOARD EJECUTIVO (CALIWEB WEB)

Ver documento `DASHBOARD_EJECUTIVO_CALIWEB.md` para la especificación completa. Resumen de KPIs derivados de los datos móviles:

### Métricas Calculables desde los Reportes
| Métrica | Fuente en Reporte |
|---|---|
| Tiempo de servicio | `horaFin - horaInicio` |
| Tasa de QR fallido | `reportes donde qrEscaneado = false` / total |
| Válvulas en estado MAL | `paso7_calibracion[n].ajuste === 'MAL'` |
| Equipos con "No Aplica" | Campos `noAplica: true` en pasos 3/6 |
| Órdenes retrasadas | `status === 'RETRASADO'` |
| Fotos por servicio | `fotos.length` |
| Correctivos vs Preventivos | `tipoReporte` |
| Duración promedio por técnico | Media de `duracion` agrupado por `tecnico.id` |

### Jerarquía de Datos para CaliWeb
```
CEDIS/Región
  └─ Zona
       └─ Técnico
            └─ Cliente
                 └─ Equipo
                      └─ Orden de Trabajo
                           └─ Reporte
                                └─ Pasos / Fotos / Firma
```

---

## 12. LOCALIZACIÓN

- **Idioma:** Español mexicano en toda la UI
- **Zona horaria:** `America/Mexico_City` (UTC-6)
- **Formato de fecha:** `DD/MM/YYYY` para display, `YYYY-MM-DD` para inputs tipo date
- **Formato de hora:** 12h con AM/PM para display (ej: "09:15 AM")
- **Moneda:** MXN (pesos mexicanos) para cualquier costo de refacciones

---

## 13. QUÉ ARCHIVOS DAR AL AGENTE DE FRONTEND

### ✅ DAR — Totalmente vigentes y útiles
| Archivo | Razón |
|---|---|
| **Este documento** (`CONTEXTO_FRONTEND_CALIWEB.md`) | Inventario real y actualizado de todo el sistema |
| `DASHBOARD_EJECUTIVO_CALIWEB.md` | Especificación completa del dashboard gerencial |
| `GUIA_DESARROLLO.md` | Principios arquitecturales del SPA aún validos |
| `mock-data.js` | Define todas las estructuras de datos reales |
| `calibeb_demo.html` | Código fuente real — referencia de diseño |
| `reporte.html` | Diseño del reporte preventivo para replicar en PDF web |
| `reporte-hielo.html` | Diseño del reporte de hielo para replicar en PDF web |
| `success.html` | Diseño de pantalla de éxito |

### ⚠️ DAR CON ADVERTENCIA — Parcialmente desactualizados
| Archivo | Qué advertir |
|---|---|
| `DOCUMENTACION_TECNICA.md` | Screen inventory incompleto (8 screens faltantes), step7 incorrecto. Usar solo para contexto de negocio general |
| `FASE_5_6_IMPLEMENTACION.md` | Lógica de checklists y firma aún útil, pero línea counts y función lists son de versión anterior |

### ❌ NO DAR — Desactualizados y confusos
| Archivo | Razón |
|---|---|
| `README.md` | Métricas todas incorrectas (1,148 vs 1,639 líneas, missing screens) |
| `VERIFICACION_FINAL.md` | Basado en versión anterior, conteos y nombres de funciones erróneos |
| `REVISION_FINAL_FASE_7_8.md` | Todo el inventario de pantallas está mal |
| `REPORTE_PRE_PRUEBA.md` | Tabla de IDs incompleta, falta todo el flujo QR y correctivo nuevo |

---

*Documento generado por auditoría directa del código fuente — Abril 2026*  
*Próxima revisión recomendada: Al detectar cambios en `calibeb_demo.html` o `app.js`*
