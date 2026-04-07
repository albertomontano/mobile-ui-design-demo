# 📊 DASHBOARD EJECUTIVO CALIWEB — ALTA GERENCIA
**Proyecto:** CaliWeb — Sistema Web Maestro Calibeb  
**Documento dirigido a:** Agente Frontend Web  
**Rol objetivo:** `executive` (Alta Gerencia)  
**Fecha:** 06 de Abril de 2026  
**Versión:** 1.0

---

## 📋 TABLA DE CONTENIDOS

1. [Concepto y Filosofía de Diseño](#1-concepto-y-filosofía-de-diseño)
2. [Especificaciones Técnicas de Diseño](#2-especificaciones-técnicas-de-diseño)
3. [Layout General](#3-layout-general)
4. [Sección 1 — Hero Strip (Pulso Ejecutivo)](#4-sección-1--hero-strip-pulso-ejecutivo)
5. [Sección 2 — Rendimiento General del Negocio](#5-sección-2--rendimiento-general-del-negocio)
6. [Sección 3 — Ranking de Técnicos](#6-sección-3--ranking-de-técnicos)
7. [Sección 4 — Inteligencia por CEDIS / Zona](#7-sección-4--inteligencia-por-cedis--zona)
8. [Sección 5 — Inteligencia de Equipos](#8-sección-5--inteligencia-de-equipos)
9. [Sección 6 — Experiencia del Cliente (VOC)](#9-sección-6--experiencia-del-cliente-voc)
10. [Sección 7 — Análisis Financiero Operacional](#10-sección-7--análisis-financiero-operacional)
11. [Sección 8 — Anomalías e Inteligencia Predictiva](#11-sección-8--anomalías-e-inteligencia-predictiva)
12. [Sección 9 — Órdenes Recientes (Últimas 24hs)](#12-sección-9--órdenes-recientes-últimas-24hs)
13. [Interactividad y Microinteracciones](#13-interactividad-y-microinteracciones)
14. [Librerías Recomendadas](#14-librerías-recomendadas)
15. [Plan de Implementación por Sprints](#15-plan-de-implementación-por-sprints)

---

## 1. Concepto y Filosofía de Diseño

El dashboard ejecutivo **no es una vista operativa más** — es la **sala de mando estratégico** de Calibeb. La alta gerencia necesita leer el estado del negocio completo en segundos, sin ruido operativo, con comparativas claras y alertas que les digan exactamente dónde poner atención.

### Principios de diseño

| Principio | Descripción |
|---|---|
| **Zero-clutter** | Solo información de alto impacto. Sin tablas operativas, sin formularios, sin detalles de órdenes individuales |
| **Dark / Premium aesthetic** | Fondo oscuro (`#0F172A`) con acentos naranja (`#F97316`). Consistente con el branding del app móvil |
| **Progressive disclosure** | Números grandes primero. El detalle aparece en hover, modal o drill-down, nunca en la vista principal |
| **Real-time feel** | Timestamps visibles en cada panel. Indicador de "Actualizado hace X minutos" en el header |
| **Comparativo siempre presente** | Todo KPI lleva su delta vs período anterior. `▲ +8%` en verde o `▼ -3%` en rojo |
| **Solo lectura** | El rol `executive` puede ver todo pero **no puede operar nada**. Botones de acción desactivados o ausentes |

### Acceso y rol

- Ruta protegida: `/executive-dashboard`
- Rol requerido: `executive` (diferente de `admin` y `supervisor`)
- Un ejecutivo ve datos **de todas las zonas y técnicos** sin restricción territorial
- No puede crear, editar ni cancelar órdenes desde esta vista

---

## 2. Especificaciones Técnicas de Diseño

### Paleta de colores

```css
/* ── Fondos ─────────────────────────────── */
--bg-primary:     #0F172A;   /* Fondo principal de la página */
--bg-card:        #1E293B;   /* Fondo de todas las tarjetas */
--bg-card-hover:  #263448;   /* Hover state en tarjetas */
--bg-divider:     #334155;   /* Líneas divisoras / borders */

/* ── Brand ───────────────────────────────── */
--accent-primary: #F97316;            /* Naranja Calibeb (principal) */
--accent-glow:    rgba(249,115,22,0.15); /* Glow sutil en KPIs destacados */

/* ── Semáforo de estados ─────────────────── */
--status-success: #10B981;   /* Verde  — OK / completado */
--status-warning: #F59E0B;   /* Amarillo — advertencia */
--status-danger:  #EF4444;   /* Rojo   — crítico / urgente */
--status-info:    #3B82F6;   /* Azul   — en progreso / info */
--status-neutral: #6B7280;   /* Gris   — cancelado / inactivo */

/* ── Textos ──────────────────────────────── */
--text-primary:   #F8FAFC;   /* Títulos y números grandes */
--text-secondary: #94A3B8;   /* Labels y subtítulos */
--text-muted:     #475569;   /* Metadatos y hints */
```

### Tipografía

- **Familia**: `Inter` (ya usada en el proyecto)
- **KPI Hero número**: `font-size: 2.5rem; font-weight: 800`
- **Títulos de sección**: `font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-secondary)`
- **Labels de métricas**: `font-size: 0.75rem; font-weight: 500`
- **Deltas (▲▼)**: `font-size: 0.8rem; font-weight: 600`

### Responsive

| Breakpoint | Comportamiento |
|---|---|
| `≥ 1440px` | Layout completo de 3 columnas |
| `1024–1439px` | Columnas colapsadas a 2 |
| `< 1024px` | Mostrar pantalla bloqueada: *"Esta vista está optimizada para pantallas de escritorio"*. No renderizar el dashboard. |

### Componente base: KPI Card

Patrón que se repite en todas las métricas del Hero Strip y en tarjetas secundarias:

```
┌──────────────────────────────────┐
│  [ícono FA]   LABEL DE MÉTRICA   │
│                                  │
│         247                      │  ← número: 2.5rem bold blanco
│         ▲ +12% vs ayer           │  ← delta: 0.8rem verde/rojo
│                                  │
│  ──────────────────────────────  │
│  [mini sparkline últimos 7 días] │  ← solo en cards del Hero Strip
└──────────────────────────────────┘
```

- **Fondo**: `var(--bg-card)`
- **Border**: `1px solid var(--bg-divider)`
- **Border-radius**: `12px`
- **Hover**: border cambia a `var(--accent-primary)` + `box-shadow: 0 0 0 1px var(--accent-primary)`
- **Animación de entrada**: el número hace **count-up** desde 0 en `0.8s` con easing `ease-out`

---

## 3. Layout General

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Logo CALIBEB]  EXECUTIVE DASHBOARD          [Período ▾]  [Avatar] [↗] │  ← Header fijo
├─────┬───────────────────────────────────────────────────────────────────┤
│     │  ┌──────┬──────┬──────┬──────┬──────────────────────────────────┐│
│     │  │ KPI1 │ KPI2 │ KPI3 │ KPI4 │         KPI5 (alerta)            ││  ← SECCIÓN 1
│ S   │  └──────┴──────┴──────┴──────┴──────────────────────────────────┘│     Hero Strip
│ I   │  ┌────────────────────────────┬────────────────────────────────┐ │
│ D   │  │  Tendencia de Eficiencia   │   Distribución Prev/Correctivo │ │  ← SECCIÓN 2A/B
│ E   │  │  (área chart)              │   (donut chart)                │ │
│ B   │  ├────────────────────────────┴────────────────────────────────┤ │
│ A   │  │           Mapa de Calor Operacional (heatmap)               │ │  ← SECCIÓN 2C
│ R   │  ├──────────────────┬───────────────────┬──────────────────── ┤ │
│     │  │  Top 5 Técnicos  │  Risk Radar Tech  │  Comparativa CEDIS  │ │  ← SECCIONES 3/4
│     │  │  (podio)         │  (alertas)        │  (tabla + radar)    │ │
│     │  ├──────────────────┴───────────────────┴────────────────────-┤ │
│     │  │          Mapa Geográfico (Leaflet.js)                       │ │  ← SECCIÓN 4C
│     │  ├─────────────────────────────────────────────────────────── ┤ │
│     │  │  Equipos Críticos (Top 10)  │  Heatmap Problemas Comunes   │ │  ← SECCIÓN 5
│     │  ├────────────────────────────┬────────────────────────────── ┤ │
│     │  │  Satisfacción Clientes     │  Respuesta  │  En Riesgo      │ │  ← SECCIÓN 6
│     │  ├────────────────────────────┼─────────────┴─────────────────┤ │
│     │  │  Eficiencia de Agenda      │  Proyección del Mes           │ │  ← SECCIÓN 7
│     │  ├────────────────────────────┴──────────────────────────────-┤ │
│     │  │  🔴 Alertas Inteligentes + Predictor de Correctivos         │ │  ← SECCIÓN 8
│     │  ├─────────────────────────────────────────────────────────── ┤ │
│     │  │  Órdenes Recientes — Últimas 24 horas                      │ │  ← SECCIÓN 9
└─────┴──┴─────────────────────────────────────────────────────────────┴─┘
```

### Header fijo

- Logo Calibeb a la izquierda
- Título "EXECUTIVE DASHBOARD" en `text-secondary` uppercase
- Selector de período global a la derecha: **Hoy / Semana / Mes / Trimestre / Año** (aplica a todo el dashboard a la vez)
- Timestamp: "Actualizado hace 3 min" con indicador de punto verde pulsante
- Botón `[Exportar PDF]` y `[Programar reporte]`
- Avatar del ejecutivo logueado

### Sidebar izquierdo

- Solo íconos con tooltip (sidebar colapsado por defecto)
- Links: Dashboard Ejecutivo (activo), Ir al Sistema Operativo, Configuración, Cerrar Sesión
- Fondo `#0D1526` (ligeramente más oscuro que el fondo principal)

---

## 4. Sección 1 — Hero Strip (Pulso Ejecutivo)

> Zona superior fija. Son los **5 números** que cualquier directivo debe leer en 3 segundos al entrar.

### Métricas

| # | KPI | Cálculo | Alerta |
|---|---|---|---|
| 1 | **Órdenes Completadas Hoy** | `COUNT(work_orders WHERE status='completed' AND date=today)` | Verde si ≥ objetivo diario configurado |
| 2 | **Tasa de Cumplimiento** | `completed / (completed + pending_vencidas) * 100` | Rojo si < 85%, Naranja si 85-92%, Verde si ≥ 93% |
| 3 | **Tiempo Promedio de Servicio** | `AVG(check_out_at - check_in_at)` en minutos, solo órdenes completadas | Naranja si supera el SLA definido por tipo de servicio |
| 4 | **Técnicos Activos Ahora** | `COUNT(work_orders WHERE status='in-progress')` | Indicador en vivo con punto naranja pulsante animado |
| 5 | **Correctivos Sin Cerrar** | `COUNT(work_orders WHERE type='corrective' AND status != 'completed')` | Card con fondo `--status-danger` con opacidad 20% si > 3. Badge rojo pulsante si alguno supera 4 horas abierto. |

### Diseño del KPI 5 (alerta)

El quinto KPI ocupa el **doble de ancho** que los demás y tiene comportamiento especial:
- Si el valor es `0`: fondo verde muy sutil, texto "Todo bajo control ✓"
- Si el valor es `1-3`: fondo naranja sutil
- Si el valor es `≥ 4`: fondo rojo sutil + subtexto "Ver detalle →" (link a reporte operativo, no al dashboard ejecutivo)

---

## 5. Sección 2 — Rendimiento General del Negocio

> Panel central. Cambia completamente según el selector de período del header.

### 2A. Gráfica de Tendencia de Eficiencia Operacional

- **Tipo**: Line chart con área rellena (gradiente naranja → transparente por debajo)
- **Eje X**: Días si "Semana/Mes" está seleccionado, Semanas si "Trimestre/Año"
- **Eje Y**: Porcentaje de eficiencia (0–100%)
- **Dato**: `(completed / (completed + cancelled)) * 100` por cada punto temporal
- **Segunda línea**: Línea punteada del período anterior (mismo rango pero período previo) en `#475569` para comparación visual
- **Zona roja horizontal**: Línea de alerta en el 85% marcada como "Umbral mínimo"
- **Tooltip**: Al hover muestra fecha, eficiencia exacta, y comparativa vs mismo día/semana del período anterior

### 2B. Distribución Preventivo vs Correctivo

- **Tipo**: Donut chart con animación de entrada (los segmentos "crecen" desde el centro)
- **Segmentos y colores**:

| Tipo | Color |
|---|---|
| Preventivo | `#F97316` (naranja) |
| Correctivo | `#EF4444` (rojo) |
| Instalación | `#3B82F6` (azul) |
| Retiro | `#6B7280` (gris) |

- **Centro del donut**: Muestra el número total de órdenes del período + texto "Órdenes totales"
- **Regla de alerta crítica**: Si correctivos superan el **25%** del total, el centro del donut cambia a rojo con texto "⚠ Ratio elevado"
- **Leyenda**: Debajo del donut, cada tipo con su conteo y porcentaje

### 2C. Mapa de Calor de Carga Operacional

- **Tipo**: Heatmap de calendario
- **Estructura**: 7 columnas (Lun–Dom) × 12 filas (horas 07:00–19:00)
- **Dato**: `COUNT(work_orders) GROUP BY day_of_week, hour(scheduled_start)`
- **Escala de color**: Blanco (0 órdenes) → Naranja claro → Naranja intenso → Rojo (`#EF4444`) en máximos
- **Tooltip**: "Martes 09:00 — 14 órdenes programadas (23% del total semanal)"
- **Valor de uso para gerencia**: Identificar cuellos de botella. Si un slot tiene > 20% de las órdenes de la semana, es un cuello de botella que puede causar retrasos.

---

## 6. Sección 3 — Ranking de Técnicos

> Dos paneles lado a lado: el reconocimiento y la alerta.

### Score Compuesto del Técnico

El backend debe calcular y exponer este score. Se compone de 5 variables ponderadas:

| Variable | Peso | Cómo se mide |
|---|---|---|
| Tasa de completación | 30% | `completadas / asignadas * 100` en el período |
| Tiempo promedio de servicio | 25% | Tiempo real vs SLA por tipo de equipo |
| Calificación del cliente | 25% | Rating promedio capturado al momento de la firma |
| Puntualidad (check-in) | 10% | `check_in_at` vs `scheduled_start` (% de veces en tiempo) |
| Completitud del checklist | 10% | `ítems marcados / ítems requeridos * 100` promedio |

**Score final**: Número de 0 a 100 con un decimal. Ej: `94.2`

### 3A. Top 5 Técnicos — El Cuadro de Honor

- **Diseño**: Lista vertical con jerarquía visual de podio
  - 1° lugar: icono de medalla dorada + fondo card ligeramente más brillante
  - 2° lugar: medalla plateada
  - 3° lugar: medalla bronce
  - 4° y 5°: sin medalla, con número de posición

- **Para cada técnico**:
  - Avatar circular (iniciales si no hay foto) con color de zona como fondo
  - Nombre completo
  - Zona asignada en `text-secondary`
  - Score total: número grande con color según rango (≥90 verde, 75-89 naranja, <75 rojo)
  - Mini-barra horizontal de 5 segmentos proporcionales a cada componente del score (con tooltip en hover de cada segmento)
  - Total de servicios completados en el período
  - Delta de posición: `▲ +2 posiciones` o `▼ -1 posición` vs período anterior

- **Hover sobre una fila**: Expande inline mostrando los 5 componentes del score con sus pesos individuales

### 3B. Risk Radar — Técnicos que Requieren Atención

- **Diseño**: Panel con fondo `rgba(239, 68, 68, 0.05)` y borde `rgba(239, 68, 68, 0.2)`
- **Título**: "⚠ Requieren Atención" en `--status-danger`

**Criterios para aparecer** (cualquiera de los siguientes aplica):

| Trigger | Umbral |
|---|---|
| Tasa de completación baja | < 80% en los últimos 30 días |
| Cancelaciones excesivas | ≥ 3 órdenes canceladas en el mes |
| Tiempos fuera de SLA | Tiempo promedio > 150% del SLA del tipo de servicio |
| Calificaciones negativas | ≥ 2 ratings ≤ 3.0 por parte del cliente en el mes |
| Impuntualidad sistemática | Check-in tardío en > 30% de sus órdenes del mes |
| GPS fuera de rango | Check-in con `out_of_range=true` en > 20% de sus órdenes |

- **Para cada técnico en riesgo**:
  - Nombre + zona
  - **Etiqueta específica del trigger** (no genérica — ej: "3 cancelaciones este mes" o "2 calificaciones ≤ 3.0")
  - Indicador visual del trigger (ícono de tipo de problema)
  - Botón "Ver perfil completo →" que abre modal con historial del técnico

- **Si no hay técnicos en riesgo**: Mostrar "✓ Todos los técnicos operando dentro de parámetros" en verde

---

## 7. Sección 4 — Inteligencia por CEDIS / Zona

> CEDIS en Calibeb = zonas regionales de operación (ej: Zona Bajío, Zona Centro, etc.)

### 4A. Tabla Comparativa de Zonas

Tabla con scroll horizontal si hay muchas zonas. Primera columna fija.

| Zona | Técnicos | OTs del período | % Completación | Tiempo Prom. | Ratio Prev:Corr | Clientes Activos | **Score Zona** |
|---|---|---|---|---|---|---|---|
| Zona Bajío | 4 | 127 | `94%` en verde | 78 min | 3.2:1 | 18 | **91.4** |
| ... | | | | | | | |

- **Filas alternadas**: `--bg-card` / `--bg-card-hover` para legibilidad
- **Columnas con valor numérico**: Alineadas a la derecha
- **Score Zona**: Cálculo igual al score del técnico pero agregado por zona
- **Click en una fila**: Expande un panel inline debajo de esa fila con el listado de técnicos de esa zona y sus scores individuales

### 4B. Radar Chart por Zonas

- **Tipo**: Spider / Radar chart
- **Un polígono por cada zona** con colores distintos y transparencia al 40%
- **5 ejes**:
  1. Completación (%)
  2. Velocidad de servicio (inverso del tiempo promedio, normalizado)
  3. Calidad (rating promedio del cliente)
  4. Puntualidad (% de check-ins en tiempo)
  5. Cobertura (clientes activos / clientes totales asignados)
- **Leyenda**: Chips con color de cada zona, togglables (click para mostrar/ocultar esa zona del radar)
- **Tooltip**: Al hover en un vértice muestra el valor exacto de esa zona en ese eje

### 4C. Mapa Geográfico

- **Librería**: Leaflet.js (open source, sin costo de API)
- **Tile layer**: CartoDB Dark Matter (paleta oscura que combina con el dashboard)
- **Puntos de cliente**:
  - Color según estado del mantenimiento preventivo:
    - 🟢 Verde: Preventivo vigente (último mantenimiento < 30 días del siguiente programado)
    - 🟠 Naranja: Próximo a vencer (entre 0 y 15 días para el siguiente)
    - 🔴 Rojo: Vencido (fecha de siguiente mantenimiento ya pasó sin agendar)
  - Click en punto: popup con nombre del cliente, equipo, último mantenimiento y botón al sistema operativo
- **Puntos de técnico (en tiempo real)**:
  - Ícono de persona con color de zona
  - Indicador pulsante si el técnico está en `status=in-progress` ahora mismo
  - Click: nombre del técnico + orden en curso + tiempo transcurrido

---

## 8. Sección 5 — Inteligencia de Equipos

> La sección de mayor valor operativo-estratégico. Permite tomar decisiones de reemplazo, garantías y contratos.

### 5A. Equipos en Estado Crítico (Top 10)

- **Criterios para aparecer en la lista** (cualquiera aplica):
  - **Recurrencia correctiva**: ≥ 3 mantenimientos correctivos en los últimos 90 días en el mismo equipo
  - **Preventivo vencido**: `today - last_maintenance > frecuencia_recomendada × 1.2`
  - **Calibración fuera de spec**: `pressure_psi` o `temperature_c` registrados fuera del rango de norma en el último servicio
  - **Abandono**: Sin ningún tipo de servicio en más de 60 días

- **Para cada equipo crítico**:

| Campo | Descripción |
|---|---|
| ID + Marca + Modelo | Identificador principal |
| Cliente y ubicación | Nombre del cliente + área específica |
| Tipo de alerta | Tag visual: `RECURRENTE` / `VENCIDO` / `CALIBRACIÓN` / `INACTIVO` |
| Correctivos/90 días | Número con fondo rojo si ≥ 3 |
| Días sin mantenimiento | Número con fondo rojo si > frecuencia × 1.2 |
| Técnico asignado | Quien típicamente atiende este equipo |
| Acción | Botón **"Agendar →"** que abre modal al sistema operativo con datos prellenados (solo si el usuario tiene rol que lo permita; en `executive` es solo informativo) |

- **Diseño**: Lista tipo "tabla de alarmas" con fondo de card `--bg-card` y borde izquierdo de 3px en el color del tipo de alerta

### 5B. Treemap de Salud de Flota

- **Tipo**: Treemap (o gráfica de burbujas como alternativa)
- **Cada rectángulo/burbuja = un equipo o tipo de equipo**
- **Tamaño**: Antigüedad del equipo (más grande = más años desde instalación)
- **Color**:
  - Verde `#10B981`: Ratio correctivos/preventivos < 0.3 (saludable)
  - Naranja `#F59E0B`: Ratio 0.3–0.6 (advertencia)
  - Rojo `#EF4444`: Ratio > 0.6 (crítico)
- **Tooltip**: Marca, modelo, cliente, ratio C/P, años de antigüedad
- **Valor gerencial**: Identifica qué equipos son candidatos a reemplazo (grandes + rojos = viejos y problemáticos)

### 5C. Heatmap de Problemas Comunes

- **Tipo**: Matriz de calor
- **Filas**: Tipos de equipo (Dispensador de Bebidas, Máquina de Hielo, Enfriador de Agua, etc.)
- **Columnas**: Tipos de problema del catálogo (No Enciende, Fuga de Agua, No Enfría, Ruido Excesivo, Falta de Presión, Error en Display, Producción Deficiente)
- **Celda**: Frecuencia de combinación. Más oscuro/saturado = más frecuente
- **Escala de color**: Blanco (0) → Naranja claro → Naranja → Rojo
- **Tooltip**: "Máquina de Hielo + Producción Deficiente — 12 incidentes en el período"
- **Valor gerencial**: Si una combinación tipo-equipo / tipo-falla domina, puede indicar un lote defectuoso, un proveedor con problemas de calidad, o una condición de instalación sistémica.

---

## 9. Sección 6 — Experiencia del Cliente (VOC)

> VOC = Voice of Customer. Métricas derivadas directamente de la satisfacción registrada por el cliente en cada visita.

> ⚠️ **Nota para el backend**: El rating de cliente debe capturarse al momento de la firma digital en la app móvil. Es el campo `rating` asociado a cada `work_order` completada.

### 6A. Ranking de Satisfacción por Cliente

- **Métrica base**: Promedio de ratings de las últimas N visitas (donde N = órdenes completadas en el período)
- **Segmentación de clientes**:

| Segmento | Rango de Rating | Color | Acción sugerida |
|---|---|---|---|
| Promotores | ≥ 4.5 | Verde | Mantener |
| Neutros | 3.5–4.4 | Amarillo | Monitorear |
| Detractores | < 3.5 | Rojo | Intervención urgente |

- **Para cada cliente**: Nombre, rating promedio en gauge pequeño (0–5), mini sparkline de las últimas 6 visitas, tendencia (▲/▼)
- **Alerta automática en header**: Si un cliente baja más de 0.8 puntos respecto al mes anterior, aparece un banner de alerta en la parte superior del dashboard al iniciar sesión

### 6B. Tiempo de Respuesta a Correctivos por Cliente

- **Métrica**: `check_in_at − created_at` para órdenes correctivas (tiempo desde que el sistema registró la OT hasta que el técnico hizo check-in)
- **Tipo visualización**: Barras horizontales ordenadas de mayor a menor tiempo de respuesta
- **Línea de SLA**: Línea vertical punteada en naranja marcando el SLA de respuesta (configurable, ej: 4 horas)
- **Color de barra**: Verde si cumple SLA, Rojo si lo excede
- **Tooltip**: Cliente + tiempo exacto de respuesta + nombre del técnico que atendió

### 6C. Clientes en Riesgo

- **Criterios para aparecer** (cualquiera aplica):
  - ≥ 2 visitas consecutivas con rating ≤ 3.0
  - ≥ 3 correctivos en el mes (muchos problemas = cliente frustrado)
  - Preventivos pendientes vencidos ≥ 30 días (el cliente fue desatendido)

- **Para cada cliente**: Nombre, trigger de riesgo con descripción específica ("2 visitas con calificación baja consecutiva"), y sugerencia de acción en texto: *"Contactar al cliente y agendar visita prioritaria"*

---

## 10. Sección 7 — Análisis Financiero Operacional

> Para el CFO y CEO: eficiencia del tiempo y proyecciones.

### 7A. Eficiencia de Agenda por Técnico (Utilización)

- **Métrica**: `horas en campo / horas disponibles × 100`
  - Horas disponibles = horario laboral estándar (ej: 8h × días hábiles del período)
  - Horas en campo = `SUM(check_out_at − check_in_at)`

- **Tipo**: Gauge chart (velocímetro) para cada técnico, agrupados en grilla
- **Rangos del gauge**:
  - `< 60%`: Naranja — técnico subutilizado
  - `60–90%`: Verde — rango óptimo
  - `> 95%`: Rojo — sobrecarga, riesgo de errores por fatiga
- **Valor debajo del gauge**: Nombre del técnico + número exacto de horas trabajadas en el período

### 7B. Proyección de Cumplimiento del Mes

- **Tipo**: Barra de progreso estilo "pace tracker" (¿vamos adelantados o atrasados?)
- **Lógica**:
  - Órdenes completadas hasta hoy + Órdenes agendadas restantes del mes = Proyección final
  - Versus: Objetivo mensual configurado
- **Visual**:
  - Barra larga horizontal
  - Segmento azul = completadas
  - Segmento naranja = agendadas pendientes
  - Segmento gris = gap si proyección < objetivo
  - Línea vertical marcando "hoy" en la barra
- **Subtexto comparativo**: "vs mismo período mes anterior: +12 órdenes" / "vs mismo mes año anterior: −3 órdenes"

### 7C. Distribución de Horas por Tipo de Servicio

- **Tipo**: Barras apiladas horizontales por zona
- **Segmentos**: Horas en preventivo (naranja) + Horas en correctivo (rojo)
- **Valor gerencial**: Qué proporción del tiempo de los técnicos se va en "apagar incendios" (correctivos) vs trabajo planificado (preventivos)

---

## 11. Sección 8 — Anomalías e Inteligencia Predictiva

> La sección más diferenciadora del dashboard. Transforma datos históricos en inteligencia accionable.

### 8A. Feed de Alertas Inteligentes

- **Tipo**: Feed vertical tipo "notificaciones" con scroll propio si hay muchas alertas
- **Sin alertas recientes**: Mostrar "✓ Sin anomalías detectadas en las últimas 24 horas" en verde

**Estructura de cada alerta**:

```
[🔴 CRÍTICO | Hace 2h]
Equipo IY-0525A (Comedor Industrial Bajío) acumula 3 correctivos
en los últimos 45 días. Probabilidad de falla total: Alta.
[Ver equipo →]

[🟠 ADVERTENCIA | Hace 5h]
Técnico Miguel López lleva 12 días con tiempo promedio de servicio
superior al SLA en un 40%. Rendimiento cayó 8% respecto al mes anterior.
[Ver perfil →]

[🟡 ATENCIÓN | Hace 1 día]
Zona Bajío tiene 7 mantenimientos preventivos vencidos esta semana.
[Ver agenda →]

[🟢 LOGRO | Hace 3 días]
Récord histórico: Zona Centro logra 100% de completación por segundo
mes consecutivo (63 órdenes completadas en Marzo 2026).
```

- **Niveles y colores**:
  - `CRÍTICO` → borde izquierdo `--status-danger`, icono 🔴
  - `ADVERTENCIA` → borde izquierdo `--status-warning`, icono 🟠
  - `ATENCIÓN` → borde izquierdo `#F59E0B`, icono 🟡
  - `LOGRO` → borde izquierdo `--status-success`, icono 🟢
- **Lógica de generación**: El backend corre jobs periódicos (cada hora) que evalúan reglas y generan alertas. El frontend solo las consume y las muestra.

### 8B. Predictor de Correctivos — Próximos 30 Días

- **Tipo**: Timeline horizontal con equipos posicionados por probabilidad estimada de falla
- **Lógica del backend** (regla simple): Un equipo aparece en el predictor si su historial muestra correctivos recurrentes con un intervalo promedio, y ese intervalo está próximo a vencer
  - Ej: El equipo X ha tenido correctivos en promedio cada 45 días. El último fue hace 38 días → probabilidad alta en ~7 días
- **Visual**: Línea de tiempo del mes con puntos de equipos en riesgo clasificados por color (naranja = probable, rojo = muy probable)
- **Tooltip**: Equipo, cliente, días hasta falla estimada, tipo de problema histórico más frecuente

### 8C. Benchmarking Interno — Comparativa de Períodos

- **Tipo**: Tabla comparativa con tres columnas de datos:

| Métrica | Mes Actual | Mes Anterior | Mismo mes - 1 año |
|---|---|---|---|
| Órdenes totales | 127 | 118 `▲ +7.6%` | 104 `▲ +22.1%` |
| Tasa de completación | 94% | 91% `▲ +3%` | 88% `▲ +6%` |
| Tiempo promedio servicio | 75 min | 82 min `▲ -8.5%` | 91 min `▲ -17.6%` |
| Ratio Prev/Corr | 3.2:1 | 2.8:1 `▲` | 2.1:1 `▲` |
| Rating promedio cliente | 4.6 | 4.4 `▲` | 4.1 `▲` |

- **Cada celda con delta**: flecha + porcentaje de cambio, color verde si es mejora, rojo si es deterioro
- **Lectura gerencial**: La gerencia ve en 10 segundos si la empresa está mejorando en todas las dimensiones o hay regresiones

---

## 12. Sección 9 — Órdenes Recientes (Últimas 24hs)

> El único panel con detalle operativo. Solo para contextualizar, no para operar.

- **Máximo**: 20 filas. Si hay más, botón "Ver todas en el sistema operativo →"
- **Columnas**:

| Folio | Tipo | Cliente | Técnico | Zona | Inicio | Duración | Status | Rating |
|---|---|---|---|---|---|---|---|---|
| MNT-2026-123 | Preventivo | Aptiv P5 | M. López | Z. Bajío | 09:00 | 78 min | ● Completado | ★ 4.8 |

- **Colores de status** (chips/badges):
  - `completed` → badge verde
  - `in-progress` → badge azul con pulso animado
  - `cancelled` → badge gris tachado
  - `on-hold` → badge amarillo
- **Filtro rápido encima de la tabla**: Chips togglables "Todas / Completadas / En Progreso / Canceladas"
- **En rol `executive`**: Sin ningún botón de acción. El folio es un link de solo lectura que abre modal de detalle (no navega fuera del dashboard)
- **Rating vacío**: Si la orden no tiene rating aún, mostrar "—" en gris

---

## 13. Interactividad y Microinteracciones

### Animaciones de entrada (al cargar o cambiar período)

| Elemento | Animación | Duración |
|---|---|---|
| Números del Hero Strip | Count-up desde 0 con easing `ease-out` | 0.8s |
| Gráficas | Fade-in + grow desde eje (Chart.js native) | 0.6s |
| Filas del ranking de técnicos | Stagger: aparecen una por una con 100ms entre cada una | — |
| Puntos activos en el mapa | Pulse CSS animation continua | Loop |
| Feed de alertas | Slide-in desde la derecha, stagger 80ms | — |

### Interacciones de usuario

| Acción | Resultado |
|---|---|
| Hover en cualquier gráfica | Tooltip con dato exacto + comparativa período anterior |
| Click en técnico (ranking o tabla) | Modal lateral deslizable con perfil completo (score, historial, órdenes del período) |
| Click en equipo crítico | Modal con historial completo de mantenimientos del equipo |
| Click en fila de CEDIS | Expand inline con listado de técnicos de esa zona |
| Click en cliente en riesgo | Modal con historial de visitas, ratings y tendencia |
| Hover en burbuja del treemap | Tooltip con marca, modelo, cliente, ratio C/P, antigüedad |
| Click en alerta del feed | Abre modal o navega al elemento relacionado |
| Cambio de período en header | Todo el dashboard se recarga con animación de fade. Loading skeletons mientras carga. |

### Botones de utilidad globales

| Botón | Función |
|---|---|
| `[Exportar PDF]` | Genera snapshot del dashboard completo en el período seleccionado como PDF. Incluye logo, fecha, nombre del ejecutivo. |
| `[Programar reporte]` | Modal para configurar envío automático por email: frecuencia (semanal/mensual), destinatarios, formato |

### Loading states

- Usar **skeleton screens** (no spinners) mientras cargan los datos de cada sección
- El skeleton debe tener la misma forma y tamaño que el contenido final para evitar layout shift
- Fondo: `--bg-divider` con animación shimmer de izquierda a derecha en `--accent-glow`

---

## 14. Librerías Recomendadas

| Librería | Uso | Peso | Licencia |
|---|---|---|---|
| **Chart.js 4.x** | KPI sparklines, área chart, donut, barras apiladas | ~200KB | MIT |
| **Apache ECharts 5.x** | Heatmaps, radar chart, treemap, gauge | ~800KB | Apache 2.0 |
| **Leaflet.js 1.9** | Mapa geográfico interactivo | ~140KB | BSD 2-Clause |
| **html2canvas + jsPDF** | Exportación a PDF | ~300KB | MIT |

**Alternativa premium (si el frontend es React/Vue):**
- **Recharts** (React) o **Vue-ECharts** — para integración más nativa con el framework
- **Mapbox GL JS** en lugar de Leaflet — si se requiere mayor personalización del mapa (requiere API key de pago)

---

## 15. Plan de Implementación por Sprints

> Orden recomendado: de lo más valioso y visible a lo más complejo.

### Sprint 1 — Estructura Base + Pulso Inmediato
**Objetivo**: La gerencia puede entrar y ver los 5 KPIs principales del día.

- [ ] Layout general: header fijo, sidebar colapsado, grid de contenido
- [ ] Selector de período global con lógica de cambio
- [ ] Sección 1 completa: Hero Strip con los 5 KPI cards + animaciones count-up
- [ ] Sección 2A: Gráfica de tendencia de eficiencia (Chart.js)
- [ ] Sección 2B: Donut chart Preventivo/Correctivo
- [ ] Skeleton screens para todas las secciones

### Sprint 2 — El Corazón del Valor (Rankings y Alertas)
**Objetivo**: La gerencia puede identificar sus mejores técnicos y los problemas críticos.

- [ ] Sección 3A: Top 5 Técnicos con Cuadro de Honor
- [ ] Sección 3B: Risk Radar de técnicos
- [ ] Sección 5A: Equipos Críticos Top 10
- [ ] Sección 8A: Feed de Alertas Inteligentes
- [ ] Interactividad: Modales de detalle de técnico y equipo

### Sprint 3 — Inteligencia de Negocio
**Objetivo**: Visión estratégica por zona y satisfacción del cliente.

- [ ] Sección 4A/B: Tabla comparativa de CEDIS + Radar Chart
- [ ] Sección 6A/B/C: VOC completo (satisfacción, respuesta correctivos, clientes en riesgo)
- [ ] Sección 2C: Heatmap de carga operacional
- [ ] Sección 8C: Benchmarking comparativo de períodos

### Sprint 4 — Premium Completo
**Objetivo**: Dashboard de clase mundial con todas las funcionalidades.

- [ ] Sección 4C: Mapa geográfico (Leaflet.js)
- [ ] Sección 5B/C: Treemap de salud de flota + Heatmap de problemas
- [ ] Sección 7: Análisis financiero completo (utilización, proyección, distribución horas)
- [ ] Sección 8B: Predictor de correctivos
- [ ] Sección 9: Tabla de órdenes recientes
- [ ] Export PDF funcional
- [ ] Modal de "Programar reporte" con envío por email
- [ ] Pulido de animaciones y microinteracciones
- [ ] Modo impresión (CSS `@media print`)

---

## Notas Adicionales para el Agente Frontend

1. **Datos mock para desarrollo**: Solicitar al agente de backend que exponga el endpoint `GET /api/executive/dashboard?period=month` lo antes posible. Mientras tanto, todos los datos deben ser mock que respeten exactamente la estructura que retornará el backend real.

2. **Prefijo de rutas API para el dashboard ejecutivo**: Todos los endpoints exclusivos de esta vista usarán el prefijo `/api/executive/` para facilitar la gestión de permisos en backend.

3. **Consistencia de colores con el app móvil**: Los colores de estado (`--status-success`, `--status-warning`, etc.) y el color primario `#F97316` son los mismos que usa la app móvil. Mantener esta consistencia es clave para la identidad visual de Calibeb.

4. **El dashboard no tiene su propio menú de navegación secundario**: Todo está en scroll vertical en una sola página. El único selector global es el de período en el header.

5. **Datos en tiempo real**: Las secciones que muestran datos "ahora mismo" (técnicos activos, correctivos abiertos) deben hacer polling cada 60 segundos o usar WebSocket si el backend lo soporta.

6. **Nomenclatura de folios**: El formato `MNT-2026-123` debe mostrarse prominentemente siempre que se muestre una orden, incluso en los modales de detalle del dashboard ejecutivo.

---

**Documento generado para:** Agente Frontend CaliWeb  
**Basado en:** Análisis del prototipo móvil Calibeb App v3.0 y estructura de datos definida en la arquitectura del sistema  
**Siguiente paso:** Revisar con el agente de backend los endpoints de la Sección de APIs requeridas para este dashboard
