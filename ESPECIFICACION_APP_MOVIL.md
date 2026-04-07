# ESPECIFICACIÓN TÉCNICA — CALIBEB MOBILE APP (REAL)
**Versión:** 1.0 | **Fecha:** Abril 2026  
**Autor:** Análisis automatizado del prototipo `calibeb_demo.html` V5  
**Destinatarios:** Agente Frontend (CaliWeb) · Agente Backend (calibeb-api) · Agente Mobile

---

## PREFACIO PARA EL AGENTE CONSTRUCTOR

Este documento es la fuente de verdad para construir la aplicación móvil real de Calibeb. Existe un prototipo funcional completo en `calibeb_demo.html` (1,639 líneas) que define con exactitud el diseño, flujos, lógica de negocio y estructuras de datos. El objetivo es replicar y superar ese prototipo en tecnología de producción.

**Archivos que debes leer ADEMÁS de este documento:**
1. `CONTEXTO_FRONTEND_CALIWEB.md` — Inventario completo de 22 screens + lógica de negocio
2. `mock-data.js` — Estructuras de datos reales (WorkOrder, Technician, Stats, Catalogs)
3. `calibeb_demo.html` — Referencia de diseño pixel-perfect (obligatorio)
4. `reporte.html` — Diseño del reporte preventivo
5. `reporte-hielo.html` — Diseño del reporte de hielo

---

## 1. RECOMENDACIÓN DE TECNOLOGÍA

### Stack Elegido: **React Native + Expo (SDK 52+)**

#### ¿Por qué no Flutter, Ionic u otras?

| Criterio | React Native + Expo | Flutter | Ionic | PWA |
|---|---|---|---|---|
| Curva de aprendizaje | ✅ Baja (JS/TS) | ❌ Dart (lenguaje nuevo) | ✅ Baja | ✅ Muy baja |
| Desarrollo en VSCode | ✅ Nativo | ✅ Sí | ✅ Sí | ✅ Sí |
| Calidad UI/UX | ✅ Nativa real | ✅ Excelente | ⚠️ WebView | ❌ No nativa |
| Sin Android Studio/Xcode para empezar | ✅ Expo Go | ❌ Requiere | ✅ Parcial | ✅ |
| Ecosistema | ✅ Enorme | ✅ Bueno | ⚠️ Limitado | ❌ |
| Cámara/QR/GPS | ✅ expo-* packages | ✅ plugins | ⚠️ Capacitor | ❌ Limitado |
| Compartir código con CaliWeb (React) | ✅ Máximo | ❌ | ⚠️ Parcial | ✅ |
| Performance | ✅ Nativa | ✅ Excelente | ⚠️ Media | ❌ |

**React Native + Expo es la única opción que permite:**
- Desarrollar en VSCode sin configurar Xcode ni Android Studio
- Probar en tu teléfono real en segundos con la app **Expo Go**
- Usar TypeScript (mismo lenguaje que CaliWeb)
- Compartir tipos, utilidades y lógica de negocio con el frontend web
- Usar NativeWind (Tailwind CSS en React Native) — el MISMO sistema de clases del prototipo

---

## 2. STACK TÉCNICO COMPLETO

### Core
```
React Native       0.76+     Framework base
Expo SDK           52+       Toolchain y módulos nativos
TypeScript         5.x       Tipado estático (obligatorio)
Expo Router        3.x       Navegación basada en archivos (file-based routing)
```

### UI y Estilos
```
NativeWind         4.x       Tailwind CSS para React Native
react-native-svg   13.x      SVGs e íconos vectoriales
@expo/vector-icons           Font Awesome 6 incluido en Expo
expo-linear-gradient         Gradientes (usados en pantallas de hielo/éxito)
react-native-reanimated 3.x  Animaciones fluidas
react-native-gesture-handler Gestos táctiles
```

### Funcionalidades Nativas
```
expo-camera              Cámara + QR scanner (preventivo y correctivo)
expo-location            GPS / geolocalización
expo-image-picker        Selección de fotos de galería
expo-media-library       Guardar fotos en dispositivo
expo-print               Generación de PDF para reportes
expo-sharing             Compartir PDF por email / WhatsApp
expo-notifications       Push notifications (órdenes nuevas, recordatorios)
expo-secure-store        Almacenamiento seguro de tokens JWT
expo-file-system         Manejo de archivos (fotos temporales)
expo-barcode-scanner     (alternativa lightweight para QR)
```

### Estado y Datos
```
Zustand            4.x       Estado global (simple, sin boilerplate)
TanStack Query     5.x       Cache de API, sincronización, loading states
@react-native-async-storage/async-storage   Persistencia offline
axios              1.x       HTTP client para calibeb-api
react-hook-form    7.x       Formularios con validación
zod                3.x       Esquemas de validación TypeScript-first
```

### Firmas Digitales
```
react-native-signature-canvas   Canvas de firma digital touch
```

### Testing
```
Jest + @testing-library/react-native   Tests unitarios e integración
Detox                                  Tests E2E (opcional fase 2)
```

### Herramientas de Desarrollo
```
ESLint + Prettier     Linting y formato de código
TypeScript strict     Modo estricto activado
Expo Dev Tools        Debugging visual
Flipper               Debugging avanzado (red, estado)
```

---

## 3. ENTORNO DE DESARROLLO

### Requisitos Mínimos
- **Node.js** 20 LTS o superior
- **npm** 10+ o **pnpm** 9+ (recomendado pnpm por velocidad)
- **VSCode** con las extensiones:
  - `Expo Tools` (Expo oficial)
  - `React Native Tools` (Microsoft)
  - `Tailwind CSS IntelliSense` (Tailwind Labs)
  - `ESLint` + `Prettier` 
  - `TypeScript` (ya incluido en VSCode)
- **Expo Go** instalado en tu teléfono (iOS App Store o Google Play) — gratis
- **Git** para control de versiones

### Instalación de Expo CLI
```bash
npm install -g expo-cli eas-cli
```

### Crear el proyecto
```bash
npx create-expo-app calibeb-app --template tabs
cd calibeb-app
```

### Verificar que funciona
```bash
npx expo start
# Escanear el QR con Expo Go en tu teléfono
```

---

## 4. ESTRUCTURA DE DIRECTORIOS

```
calibeb-app/
│
├── app/                          # Expo Router — cada archivo es una ruta
│   ├── _layout.tsx               # Root layout (providers globales)
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   └── login.tsx             # Pantalla de login
│   └── (app)/                    # Pantallas protegidas (requieren auth)
│       ├── _layout.tsx           # Bottom tab navigator
│       ├── dashboard/
│       │   ├── index.tsx         # Mi Agenda — pantalla principal
│       │   └── [orderId].tsx     # Detalle de orden (ruta dinámica)
│       ├── preventive/           # Flujo preventivo completo
│       │   ├── _layout.tsx       # Stack navigator del flujo
│       │   ├── checkin.tsx       # Validación GPS
│       │   ├── qr-scan.tsx       # Escaneo QR
│       │   ├── qr-result.tsx     # QR validado / sin QR
│       │   ├── step1.tsx         # Exterior
│       │   ├── step2.tsx         # Válvulas
│       │   ├── step3.tsx         # Refrigeración
│       │   ├── step4.tsx         # Filtración
│       │   ├── step5.tsx         # Bombas
│       │   ├── step6.tsx         # Componentes Adicionales
│       │   ├── step7.tsx         # Calibración (12 válvulas)
│       │   ├── ice-machine.tsx   # Flujo Máquina de Hielo
│       │   └── signature.tsx     # Firma digital
│       ├── corrective/           # Flujo correctivo completo
│       │   ├── _layout.tsx
│       │   ├── qr-scan.tsx
│       │   ├── qr-result.tsx
│       │   ├── gps.tsx
│       │   ├── form.tsx
│       │   └── signature.tsx
│       ├── report/
│       │   ├── success.tsx       # Pantalla de éxito
│       │   ├── preview.tsx       # Vista previa del PDF
│       │   └── [type].tsx        # preventivo | hielo
│       └── profile/
│           └── index.tsx         # Perfil del técnico
│
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Átomos de UI
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Select.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StatusBar.tsx
│   ├── order/                    # Componentes de órdenes
│   │   ├── OrderCard.tsx         # Tarjeta de orden en dashboard
│   │   ├── OrderGroup.tsx        # Grupo de órdenes por cliente
│   │   └── OrderDetail.tsx       # Vista detalle de orden
│   ├── checklist/
│   │   ├── ChecklistItem.tsx     # Ítem individual
│   │   ├── ChecklistGroup.tsx    # Grupo con progreso
│   │   └── NoAplicaToggle.tsx    # Sección colapsable "No Aplica"
│   ├── calibration/
│   │   └── CalibrationTable.tsx  # Tabla de 12 válvulas
│   ├── camera/
│   │   ├── QRScanner.tsx         # Componente de escaneo QR
│   │   └── PhotoCapture.tsx      # Captura de fotos
│   ├── signature/
│   │   └── SignatureCanvas.tsx   # Canvas de firma digital
│   ├── gps/
│   │   └── LocationValidator.tsx # Validador de GPS con mapa
│   └── report/
│       ├── ReportPreventive.tsx  # Template reporte preventivo
│       └── ReportIce.tsx         # Template reporte hielo
│
├── hooks/                        # Custom hooks
│   ├── useAuth.ts                # Autenticación y sesión
│   ├── useLocation.ts            # GPS y geofencing
│   ├── useCamera.ts              # Cámara y QR
│   ├── useWorkOrders.ts          # CRUD de órdenes (TanStack Query)
│   ├── useForm.ts                # Form helpers
│   └── useOffline.ts             # Detección offline + queue
│
├── services/                     # Capa de comunicación con API
│   ├── api.ts                    # Cliente axios configurado
│   ├── auth.service.ts           # Login, logout, refresh token
│   ├── workOrders.service.ts     # CRUD órdenes de trabajo
│   ├── reports.service.ts        # Envío de reportes
│   ├── upload.service.ts         # Upload de fotos/firmas
│   └── notifications.service.ts  # Push notifications
│
├── stores/                       # Estado global con Zustand
│   ├── auth.store.ts             # Usuario autenticado, token
│   ├── workOrder.store.ts        # Orden activa, progreso de pasos
│   ├── form.store.ts             # Datos del formulario activo
│   └── app.store.ts              # Config, offline status
│
├── types/                        # TypeScript types (COMPARTIDOS con backend)
│   ├── auth.types.ts
│   ├── workOrder.types.ts        # WorkOrder, Equipment, Client, Technician
│   ├── report.types.ts           # ReportData, CalibrationRow, ChecklistItem
│   ├── api.types.ts              # Responses, Errors, Pagination
│   └── index.ts                  # Re-exports
│
├── constants/
│   ├── colors.ts                 # Paleta completa (#F97316, #0F172A, etc.)
│   ├── routes.ts                 # Nombres de rutas tipados
│   ├── checklist.ts              # Templates de checklists (extraídos de mock-data.js)
│   └── config.ts                 # API_URL, GPS_RADIUS, timeouts
│
├── utils/
│   ├── date.ts                   # Formateo fechas (es-MX, UTC-6)
│   ├── validation.ts             # Validaciones de formularios
│   ├── report.ts                 # Generación HTML para PDF
│   └── offline-queue.ts          # Cola de operaciones offline
│
├── assets/
│   ├── images/
│   │   ├── logo.png              # Logo Calibeb (calibeb_logo-removebg-preview.png)
│   │   └── splash.png
│   └── fonts/
│
├── app.json                      # Configuración Expo
├── tailwind.config.js            # Configuración NativeWind
├── tsconfig.json                 # TypeScript config (strict: true)
├── .env.local                    # Variables de entorno (no en git)
└── package.json
```

---

## 5. CONFIGURACIÓN ESENCIAL

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Paleta oficial Calibeb (extraída del prototipo)
        calibeb: {
          orange:     '#F97316',  // color primario
          dark:       '#0F172A',  // fondo oscuro
          slate:      '#1E293B',  // headers reportes
          red:        '#DC2626',  // correctivo
          blue:       '#1E40AF',  // hielo/Scotsman
          'blue-light': '#3B82F6',
        }
      },
      fontFamily: {
        inter: ['Inter_400Regular', 'Inter_500Medium', 'Inter_600SemiBold', 'Inter_700Bold'],
      }
    },
  },
  plugins: [],
}
```

### constants/colors.ts
```typescript
export const Colors = {
  primary:     '#F97316',  // naranja Calibeb
  dark:        '#0F172A',  // slate-900
  slate:       '#1E293B',  // slate-800
  corrective:  '#DC2626',  // red-600
  ice:         '#1E40AF',  // blue-800
  iceLight:    '#3B82F6',  // blue-500
  success:     '#16A34A',  // green-600
  warning:     '#D97706',  // amber-600
  background:  '#F8FAFC',  // slate-50
  white:       '#FFFFFF',
  border:      '#E2E8F0',  // slate-200
  text: {
    primary:   '#1E293B',
    secondary: '#64748B',
    muted:     '#94A3B8',
  }
} as const;
```

### .env.local (variables de entorno)
```bash
EXPO_PUBLIC_API_URL=https://api.calibeb.com/v1
EXPO_PUBLIC_GPS_RADIUS_METERS=500
EXPO_PUBLIC_MIN_FAULT_DESCRIPTION_CHARS=20
EXPO_PUBLIC_MAX_PHOTOS_PER_ORDER=10
```

---

## 6. TIPOS TYPESCRIPT (COMPARTIDOS CON BACKEND)

Estos tipos deben ser revisados con el agente del backend para garantizar compatibilidad exacta con `calibeb-api`.

```typescript
// types/workOrder.types.ts

export type OrderStatus = 'PROGRAMADO' | 'EN_PROCESO' | 'RETRASADO' | 'COMPLETADO';
export type OrderType   = 'PREVENTIVO' | 'CORRECTIVO';
export type ReportType  = 'preventivo' | 'hielo' | 'correctivo';
export type AjusteValue = '--' | 'OK' | 'MAL';

export interface Technician {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  zone: string;
  rating: number;
  completedServices: number;
}

export interface Client {
  id: string;
  name: string;
  location: string;
  address: string;
  contact: string;
  email: string;
  phone: string;
}

export interface Equipment {
  id: string;
  type: 'DISPENSADOR' | 'MAQUINA_HIELO' | 'ENFRIADOR' | 'CAFETERA';
  brand: string;
  model: string;
  serialNumber: string;
  qrCode: string | null;
  installDate: string;       // ISO date YYYY-MM-DD
  lastMaintenance: string;   // ISO date YYYY-MM-DD
}

export interface WorkOrder {
  id: string;
  folio: string;
  status: OrderStatus;
  type: OrderType;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  client: Client;
  equipment: Equipment;
  technician: Technician;
  schedule: {
    date: string;       // YYYY-MM-DD
    startTime: string;  // HH:mm
    endTime: string;    // HH:mm
    duration: number;   // minutos
  };
  notes: string;
  createdAt: string;  // ISO datetime
  updatedAt: string;  // ISO datetime
}

// types/report.types.ts

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  required: boolean;
}

export interface ChecklistSection {
  noAplica: boolean;
  items: ChecklistItem[];
}

export interface CalibrationRow {
  valvula: number;      // 1–12
  producto: string;
  caducidad: string;    // YYYY-MM-DD
  ajuste: AjusteValue;
}

export interface QRValidation {
  scanned: boolean;
  qrCode: string | null;
  explanationIfMissing: string;
  validatedAt: string;  // ISO datetime
}

export interface GPSValidation {
  validated: boolean;
  coordinates: { lat: number; lng: number };
  accuracy: number;     // metros
  checkinAt: string;    // ISO datetime
}

export interface Photo {
  type: 'before' | 'after' | 'evidence';
  uri: string;          // URI local
  base64?: string;      // Para upload
  timestamp: string;
}

export interface Signature {
  name: string;
  base64: string;       // data:image/png;base64,...
  timestamp: string;
  emailSentTo: string;
}

export interface ReportData {
  orderId: string;
  folio: string;
  reportType: ReportType;
  serviceDate: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;

  // Flujo preventivo
  checkin?: GPSValidation;
  qrValidation?: QRValidation;
  step1_exterior?: ChecklistItem[];
  step2_valvulas?: ChecklistItem[];
  step3_refrigeracion?: ChecklistSection;
  step4_filtracion?: {
    items: ChecklistItem[];
    filterExpiryDate: string;  // YYYY-MM-DD
  };
  step5_bombas?: ChecklistItem[];
  step6_componentes?: {
    carbonatador: ChecklistSection;
    bombaAgua: ChecklistSection;
    compresorAire: ChecklistSection;
  };
  step7_calibracion?: CalibrationRow[];

  // Flujo hielo
  iceChecklist?: ChecklistItem[];
  iceProductionCycle?: string;

  // Flujo correctivo
  corrective?: {
    qrValidation: QRValidation;
    faultDescription: string;  // mínimo 20 chars
    partsUsed: string;
    photos: Photo[];
  };

  // Todos los flujos
  photos: Photo[];
  signature: Signature;
}
```

---

## 7. ESTADO GLOBAL — ZUSTAND STORES

### stores/workOrder.store.ts
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { WorkOrder, ReportData } from '@/types';

interface WorkOrderStore {
  // Orden actualmente en progreso
  activeOrder: WorkOrder | null;
  setActiveOrder: (order: WorkOrder | null) => void;

  // Reporte siendo construido (se llena paso a paso)
  reportDraft: Partial<ReportData>;
  updateReportDraft: (data: Partial<ReportData>) => void;
  clearReportDraft: () => void;

  // Tipo de reporte activo (para rutear al PDF correcto)
  activeReportType: 'preventivo' | 'hielo' | 'correctivo' | null;
  setActiveReportType: (type: 'preventivo' | 'hielo' | 'correctivo') => void;

  // Estado de completitud de pasos del flujo preventivo
  stepsCompleted: Record<string, boolean>;
  markStepComplete: (step: string) => void;
  resetSteps: () => void;
}

export const useWorkOrderStore = create<WorkOrderStore>()(
  persist(
    (set) => ({
      activeOrder: null,
      setActiveOrder: (order) => set({ activeOrder: order }),

      reportDraft: {},
      updateReportDraft: (data) =>
        set((state) => ({ reportDraft: { ...state.reportDraft, ...data } })),
      clearReportDraft: () => set({ reportDraft: {} }),

      activeReportType: null,
      setActiveReportType: (type) => set({ activeReportType: type }),

      stepsCompleted: {},
      markStepComplete: (step) =>
        set((state) => ({ stepsCompleted: { ...state.stepsCompleted, [step]: true } })),
      resetSteps: () => set({ stepsCompleted: {} }),
    }),
    {
      name: 'workorder-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### stores/auth.store.ts
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import type { Technician } from '@/types';

interface AuthStore {
  technician: Technician | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (technician: Technician, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      technician: null,
      token: null,
      isAuthenticated: false,
      login: (technician, token) =>
        set({ technician, token, isAuthenticated: true }),
      logout: () =>
        set({ technician: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => SecureStore.getItemAsync(name),
        setItem: (name, value) => SecureStore.setItemAsync(name, value),
        removeItem: (name) => SecureStore.deleteItemAsync(name),
      })),
    }
  )
);
```

---

## 8. CAPA DE API — INTEGRACIÓN CON CALIBEB-API

### services/api.ts
```typescript
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'es-MX',
  },
});

// Interceptor: añadir JWT en cada request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: manejo global de errores + refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      // Redirigir a login
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Endpoints requeridos de calibeb-api (PARA REVISIÓN DEL BACKEND)

El agente de backend debe confirmar o crear los siguientes endpoints:

```
AUTH
POST   /auth/login                    { email, password } → { token, refreshToken, technician }
POST   /auth/refresh                  { refreshToken } → { token }
POST   /auth/logout

ÓRDENES DE TRABAJO
GET    /work-orders?date=&status=     Lista de órdenes del técnico
GET    /work-orders/:id               Detalle de una orden
PATCH  /work-orders/:id/status        { status: 'EN_PROCESO' | 'COMPLETADO' }

REPORTES
POST   /reports                       Envío del ReportData completo (JSON)
GET    /reports/:id                   Obtener reporte guardado
GET    /reports/:id/pdf               Descargar PDF generado

UPLOADS
POST   /uploads/photo                 FormData { file, orderId, type }  → { url }
POST   /uploads/signature             FormData { file, orderId }         → { url }

VALIDACIÓN QR
POST   /equipment/validate-qr         { qrCode } → { equipment, client }

PERFIL
GET    /technicians/me                Info del técnico autenticado
PATCH  /technicians/me                Actualizar perfil
```

---

## 9. IMPLEMENTACIÓN POR PANTALLA

### Pantalla: Login (`app/(auth)/login.tsx`)
```
Componentes: TextInput email, TextInput password (secureTextEntry), Button
Lógica: 
  - call authService.login(email, password)
  - on success: guarda token en SecureStore + navega a /dashboard
  - on error: mostrar mensaje con toast
Validación: 
  - email formato válido (zod)
  - password mínimo 6 chars
Diseño: Fondo #0F172A, logo centrado, card blanca con inputs
```

### Pantalla: Dashboard (`app/(app)/dashboard/index.tsx`)
```
Query: useWorkOrders({ date: today, technicianId: me })
Estado: Filtro hoy/semana (tabs)
Componentes clave:
  - Stats strip: Completadas | Pendientes | En progreso
  - FlatList de <OrderGroup> agrupados por cliente
  - FAB button de QR scanner (bottom center, color primario)
Acciones:
  - Tap orden PREVENTIVO → setActiveOrder(order) → router.push('/preventive/checkin')
  - Tap orden CORRECTIVO → setActiveOrder(order) → router.push('/corrective/qr-scan')
Refresco: pull-to-refresh + polling cada 5 minutos
```

### Flujo Preventivo — Pantallas

#### checkin.tsx
```
Funcionalmente: Validar que el técnico esté físicamente cerca del cliente
Librerías: expo-location, react-native-maps (opcional) o LibreMap
Lógica:
  const { coords } = await Location.getCurrentPositionAsync({ accuracy: HIGH })
  const distanceMeters = getDistance(coords, order.client.coordinates)
  if (distanceMeters <= GPS_RADIUS) → navigateTo('qr-scan')
  else → mostrar error "Estás a Xm del punto de servicio"
Guardar: updateReportDraft({ checkin: { validated: true, coordinates, accuracy } })
```

#### qr-scan.tsx
```
Librería: expo-camera con barCodeScannerSettings
UI: Viewfinder (cuadro animado), botón "No tengo QR"
Lógica onQRScanned:
  const result = await validateQR(data)  → POST /equipment/validate-qr
  if success: updateReportDraft({ qrValidation: { scanned: true, qrCode: data } })
             navigateTo('qr-result', { success: true })
  if fail:    navigateTo('qr-result', { success: false })
Sin QR: navigateTo('qr-result', { success: false, manual: true })
Permisos: check camera permission antes de mostrar
```

#### step1.tsx a step6.tsx (Checklists)
```
Componente base: <ChecklistGroup> con <ChecklistItem> (checkbox + label)
Estado local → al completar sync con updateReportDraft({ step1_exterior: items })
Progreso: ProgressBar en header (% de ítems checked)
step3: ChecklistSection con <NoAplicaToggle> que colapsa el contenido
step4: Campo adicional fecha caducidad filtro (DatePicker)
step6: Tres secciones <NoAplicaToggle>:
  - Carbonatador
  - Bomba de Agua  
  - Compresor de Aire
Botón "Continuar" solo activo si todos los required están checked O noAplica=true
```

#### step7.tsx (Calibración — estructura CRÍTICA)
```
Tabla de 12 filas. Cada fila = <CalibrationRow>:
  Válvula #: número estático (1-12)
  Producto:  TextInput
  Caducidad: DatePicker (plataforma nativa)
  A-J:       Picker/Select con opciones ['--', 'OK', 'MAL']
Estado: array de 12 CalibrationRow inicializado con valores vacíos
Guardar: updateReportDraft({ step7_calibracion: rows })
Scroll: FlatList o ScrollView horizontal en tablet
```

#### ice-machine.tsx
```
Activación: Se navega aquí cuando equipment.type === 'MAQUINA_HIELO'
  (en lugar del flujo estándar de steps)
Tema visual: azul (#1E40AF) en lugar de naranja
Checklist de 5 ítems específicos:
  1. Limpieza exterior del equipo
  2. Revisión del depósito de hielo
  3. Inspección de la placa evaporadora
  4. Revisión del sistema de agua
  5. Verificación de ciclos de producción
Campo adicional: TextInput "Ciclo de Producción" (ej: "250 kg/día")
Al continuar: setActiveReportType('hielo') antes de navegar a signature
```

#### signature.tsx (COMPARTIDA por los 3 flujos)
```
Componente: <SignatureCanvas> (react-native-signature-canvas)
  - Canvas touch-enabled
  - Botón "Borrar" limpia el canvas
  - Guardar como base64 PNG
Campo: TextInput "Nombre del cliente" (pre-poblado desde orden)
Checkbox: Consentimiento (requerido para habilitar botón)
Al confirmar:
  const base64 = await signatureCanvas.current.getData()
  updateReportDraft({ signature: { name, base64, emailSentTo, timestamp } })
  await submitReport()  → POST /reports
  if success: router.replace('/report/success')
```

### Flujo Correctivo — Pantallas

#### corrective/qr-scan.tsx
```
Similar a preventivo pero con tema rojo (#DC2626)
Diferencia key: checkbox "No tengo el código QR disponible"
  - Al activar: muestra TextArea para explicación
  - validateCorrectiveQR():
      Si checkbox=true y explicación.length > 0: → corrective-qr-result (no QR)
      Si QR escaneado: → corrective-qr-result (con QR)
```

#### corrective/gps.tsx
```
Validación GPS idéntica a preventivo pero tema rojo
Badges: "Mantenimiento Correctivo" en rojo
```

#### corrective/form.tsx
```
Campos:
  - Cliente (readonly, pre-poblado desde QR/selección manual)
  - Equipo (readonly)
  - Descripción de la falla: TextArea, required, minLength=20
    Validación en tiempo real con contador de caracteres
  - Refacciones utilizadas: TextArea, opcional
  - Evidencia fotográfica: grid 3 fotos (Antes/Después/Extra)
    usar expo-image-picker o expo-camera
Al continuar: router.push('/corrective/signature')
```

---

## 10. COMPONENTES CLAVE — IMPLEMENTACIÓN

### NoAplicaToggle.tsx
```typescript
interface NoAplicaToggleProps {
  label: string;
  children: React.ReactNode;
  onChange?: (noAplica: boolean) => void;
}

// Checkbox en header que colapsa/expande el contenido
// Cuando noAplica=true: contenido oculto con animación, marcado como N/A en reporte
```

### QRScanner.tsx
```typescript
import { CameraView, useCameraPermissions } from 'expo-camera';

// Mostrar solicitud de permisos si no están otorgados
// Viewfinder animado (border corners effect con react-native-svg o border)
// onBarcodeScanned callback una sola vez (prevenir múltiples disparos con ref flag)
// Botón de linterna (expo-camera torch mode)
```

### SignatureCanvas.tsx
```typescript
import SignatureCanvas from 'react-native-signature-canvas';
// Configurar con fondo transparente
// Exportar como PNG base64
// Botón de limpiar externo (ref.current.clearSignature())
// Detectar si está vacío antes de permitir continuar
```

### LocationValidator.tsx
```typescript
import * as Location from 'expo-location';
// Solicitar permisos al montar
// Obtener posición con accuracy: Location.Accuracy.High
// Calcular distancia con la fórmula Haversine o librería geolib
// Estados: 'requesting' | 'validating' | 'success' | 'too-far' | 'error'
// Mostrar animación ping mientras valida (igual al prototipo)
```

### CalibrationTable.tsx
```typescript
// FlatList de 12 filas. Cada fila:
// - Número de válvula (texto fijo)
// - TextInput producto
// - DatePicker para caducidad (usar @react-native-community/datetimepicker)
// - Picker para A-J: ['--', 'OK', 'MAL']
// Estado manejado con react-hook-form useFieldArray (12 ítems)
```

---

## 11. GENERACIÓN DE PDF

### Estrategia Recomendada
Usar `expo-print` que acepta HTML y genera PDF nativo. Los templates HTML de `reporte.html` y `reporte-hielo.html` son la fuente de verdad.

```typescript
// utils/report.ts
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export async function generateAndShareReport(
  reportData: ReportData,
  type: 'preventivo' | 'hielo'
): Promise<void> {
  const html = type === 'hielo'
    ? buildIceReportHTML(reportData)
    : buildPreventiveReportHTML(reportData);

  const { uri } = await Print.printToFileAsync({ html, base64: false });

  // Opción 1: Compartir (WhatsApp, Email, etc.)
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: `Reporte ${reportData.folio}`,
  });

  // Opción 2: Abrir preview nativo del PDF
  await Print.printAsync({ uri });
}
```

**Nota para el agente:** Los templates HTML de `reporte.html` y `reporte-hielo.html` deben convertirse a funciones TypeScript `buildPreventiveReportHTML(data)` y `buildIceReportHTML(data)` que reciban `ReportData` e inyecten los valores reales. La estructura CSS ya está lista en esos archivos.

---

## 12. MODO OFFLINE

La app DEBE funcionar sin conexión a internet ya que los técnicos pueden estar en plantas industriales sin señal.

### Estrategia
```
1. TanStack Query cachea las órdenes del día al hacer login
2. Zustand persiste en AsyncStorage el reportDraft durante el servicio
3. Si no hay conexión al enviar el reporte:
   - Guardar en offline-queue (Array<PendingReport> en AsyncStorage)
   - Mostrar badge "Pendiente de sincronización" en dashboard
   - Reintentar automáticamente cada vez que se detecte conexión
4. Fotos: guardar en FileSystem primero, subir cuando haya conexión
```

```typescript
// utils/offline-queue.ts
interface PendingReport {
  id: string;
  reportData: ReportData;
  createdAt: string;
  retries: number;
}

// usarNetInfo de @react-native-community/netinfo
// Al recuperar conexión → procesar cola
```

---

## 13. NOTIFICACIONES PUSH

```typescript
// Al iniciar la app:
import * as Notifications from 'expo-notifications';

// 1. Solicitar permisos
// 2. Obtener token Expo Push Token
// 3. Registrar token en calibeb-api: PATCH /technicians/me { pushToken }

// Notificaciones a recibir:
// - Nueva orden asignada
// - Orden reprogramada
// - Recordatorio 30 min antes del servicio
// - Confirmación de reporte recibido
```

---

## 14. SEGURIDAD

```
Tokens JWT:
  - Almacenar en expo-secure-store (Keychain iOS / Keystore Android)
  - NUNCA en AsyncStorage ni localStorage
  - Implementar refresh automático antes de expiración

Fotos y firma:
  - No almacenar en galería del dispositivo por defecto
  - Usar FileSystem.cacheDirectory para temporales
  - Borrar archivos temporales después de upload exitoso

Datos sensibles:
  - No loggear información del cliente en producción
  - Ofuscar código JS con expo build (automático)

Certificado:
  - API requests solo a HTTPS
  - Certificate pinning en producción (expo-ssl-pinning)
```

---

## 15. FLUJO DE TRABAJO DE DESARROLLO

### Fase 1: Setup (Día 1)
```bash
npx create-expo-app calibeb-app --template tabs
cd calibeb-app
npx expo install nativewind tailwindcss react-native-reanimated react-native-gesture-handler
npx expo install expo-router expo-camera expo-location expo-image-picker
npx expo install expo-print expo-sharing expo-secure-store @react-native-async-storage/async-storage
npm install zustand @tanstack/react-query axios react-hook-form zod
npm install react-native-signature-canvas
```

### Fase 2: Estructura y tipos (Día 1-2)
- Crear toda la estructura de directorios
- Definir todos los tipos TypeScript (coordinar con agente backend)
- Configurar NativeWind y paleta de colores
- Setup de Zustand stores
- Configurar axios con interceptors

### Fase 3: Screens de autenticación y dashboard (Día 2-3)
- Login screen
- Dashboard con OrderCard y OrderGroup
- ProtectedRoute / auth guard

### Fase 4: Flujo preventivo (Día 3-6)
- Checkin GPS
- QR Scanner
- Steps 1-6 (checklists)
- Step 7 (tabla de calibración)
- Signature

### Fase 5: Flujo hielo y correctivo (Día 6-8)
- Ice machine screen
- Corrective QR → GPS → Form → Signature

### Fase 6: Reportes y PDF (Día 8-10)
- Templates HTML → funciones TypeScript
- expo-print integration
- Success screen con opciones de compartir

### Fase 7: Integración API real (Día 10-12)
- Reemplazar mock data con llamadas a calibeb-api
- Testing de todos los endpoints
- Manejo de errores de red

### Fase 8: Offline y push notifications (Día 12-14)
- Queue de reportes offline
- Push notifications registration

### Fase 9: QA y polish (Día 14-16)
- Testing en iOS y Android
- Ajustes de UI pixel-perfect vs prototipo
- Edge cases (fotos fallidas, GPS sin señal, etc.)

### Fase 10: Build de producción (Día 16+)
```bash
eas build --platform all   # Genera APK + IPA
eas submit                 # Subir a App Store / Play Store
```

---

## 16. CONVENCIONES DE CÓDIGO (OBLIGATORIAS)

### Nomenclatura
```
Components:   PascalCase   → OrderCard.tsx, NoAplicaToggle.tsx
Hooks:        camelCase    → useWorkOrders.ts, useCamera.ts
Services:     camelCase    → workOrders.service.ts
Stores:       camelCase    → workOrder.store.ts
Types:        PascalCase + export interface/type
Constants:    UPPER_SNAKE_CASE para valores, camelCase para objetos
Routes:       kebab-case   → /qr-scan, /ice-machine
```

### Patrones de código
```typescript
// ✅ Siempre tipar los props
interface OrderCardProps {
  order: WorkOrder;
  onPressPrev: () => void;
  onPressCorrective: () => void;
}

// ✅ Usar TanStack Query para llamadas API (no useEffect manual)
const { data: orders, isLoading, refetch } = useQuery({
  queryKey: ['work-orders', today],
  queryFn: () => workOrdersService.getOrdersForToday(),
  staleTime: 5 * 60 * 1000,  // 5 minutos
});

// ✅ Manejo de errores explícito en cada service
// ✅ No usar 'any' — usar 'unknown' + narrowing si necesario
// ✅ Todos los textos de UI en español
// ✅ Comentarios de código en español (alineado con el prototipo)
// ✅ Un componente = un archivo
// ✅ Hooks personalizados para lógica compleja (no lógica en screens)
```

### Commits
```
feat: Nueva funcionalidad
fix: Corrección de bug
screen: Nueva pantalla implementada
api: Cambio en capa de servicios
style: Cambio solo visual (sin lógica)
types: Cambios en tipos TypeScript
chore: Configuración, dependencias
```

---

## 17. DISEÑO — FIDELIDAD AL PROTOTIPO

### Reglas de diseño (extraídas del prototipo)

1. **Color primario** → `#F97316` (naranja) para flujo preventivo
2. **Color correctivo** → `#DC2626` (rojo) en TODOS los elementos del flujo correctivo
3. **Color hielo** → `#1E40AF` (azul) en TODOS los elementos del flujo hielo
4. **Fondo base** → `#F8FAFC` (slate-50)
5. **Cards** → fondo blanco, border `#E2E8F0`, border-radius `xl`
6. **Botones primarios** → full width, py-4, rounded-xl, font-bold, shadow
7. **Headers de pantalla** → padding top de 48px (safe area) + contenido
8. **Bottom buttons** → `absolute bottom-0`, full width, border-top, shadow hacia arriba
9. **Badges de estado** → texto bold uppercase, fondo suave (bg-green-50/amber-50/etc.)
10. **Animaciones** → `animate-ping` en íconos de validación GPS/QR
11. **Fuente** → Inter (todas las variantes de peso)
12. **Íconos** → Font Awesome 6 (mismo set que el prototipo)

### Equivalencias NativeWind ↔ HTML prototipo
```
HTML             →  NativeWind RN
rounded-xl       →  rounded-xl  (igual)
py-4 px-6        →  py-4 px-6   (igual)
text-sm          →  text-sm     (igual)
font-bold        →  font-bold   (igual)
shadow-lg        →  shadow-lg   (igual)
bg-white         →  bg-white    (igual)
text-slate-500   →  text-slate-500 (igual)
```

---

## 18. PREGUNTAS PARA EL AGENTE BACKEND (calibeb-api)

Antes de iniciar la Fase 7 (integración API real), el agente backend debe responder:

1. **¿Cuál es el URL base de la API?** (staging y producción)
2. **¿Cuál es el mecanismo de auth?** JWT Bearer / OAuth2 / Session?
3. **¿Los tokens JWT tienen refresh?** ¿Cuál es la expiración?
4. **¿Existe endpoint de validación QR?** (`POST /equipment/validate-qr`) o ¿el QR es solo el serial number que se busca local?
5. **¿Cómo se suben las fotos?** ¿Multipart FormData o base64 en JSON?
6. **¿El reporte PDF se genera en el backend o en el móvil?** (actualmente propuesto: en el móvil con expo-print)
7. **¿Existe paginación en `/work-orders`?** ¿Qué parámetros?
8. **¿Hay WebSockets para updates en tiempo real** (nueva orden asignada, etc.)?
9. **¿Los checklist templates vienen del backend** o son fijos en el cliente?
10. **¿Cuáles endpoints ya existen** y cuáles hay que crear nuevos para mobile?
11. **¿Cuál es el formato esperado del ReportData** (nombres de campos en la API: camelCase, snake_case)?
12. **¿Hay un ambiente de staging** para pruebas de integración?

---

## 19. PREGUNTAS PARA EL AGENTE FRONTEND (CaliWeb)

El agente que construyó CaliWeb puede añadir valor en:

1. **¿Qué tipos TypeScript ya definiste** para WorkOrder, Client, Equipment? ¿Podemos compartirlos en un paquete `@calibeb/types`?
2. **¿Cómo están estructurados los datos que CaliWeb consume de calibeb-api?** ¿Son los mismos que necesita mobile?
3. **¿El dashboard ejecutivo recibe datos del móvil** en tiempo real o en batch al subir el reporte?
4. **¿Las fotos y firmas se almacenan en el mismo storage** que usa CaliWeb?
5. **¿Existe un design system** compartido (tokens de color, tipografía) o debemos definirlo aquí?
6. **¿Qué features del dashboard ejecutivo** (`DASHBOARD_EJECUTIVO_CALIWEB.md`) dependen directamente de datos generados por la app móvil?

---

## 20. CHECKLIST DE COMPLETITUD — PARA EL AGENTE CONSTRUCTOR

Usar este checklist para verificar que la app está lista:

### Autenticación
- [ ] Login con email/password
- [ ] Token guardado en SecureStore
- [ ] Refresh automático de token
- [ ] Logout limpia todo el estado
- [ ] Ruta protegida (redirect a login si no autenticado)

### Dashboard
- [ ] Lista de órdenes del día agrupadas por cliente
- [ ] 4 badges de estado: PROGRAMADO, EN PROCESO, RETRASADO, COMPLETADO
- [ ] Stats strip (completadas / pendientes)
- [ ] Filtro hoy/semana
- [ ] Pull-to-refresh
- [ ] FAB button para QR correctivo

### Flujo Preventivo
- [ ] Check-in GPS con validación de radio
- [ ] QR scan con viewfinder animado
- [ ] Pantalla QR validado / sin QR
- [ ] Steps 1-6 con checklists y progreso
- [ ] NoAplica en step3 (total) y step6 (3 secciones)
- [ ] Fecha caducidad filtro en step4
- [ ] Step7 tabla 12 válvulas (Producto / Caducidad / A-J)
- [ ] Flujo Máquina de Hielo (ice-machine) con tema azul
- [ ] Firma digital canvas

### Flujo Correctivo
- [ ] QR scan con checkbox "No tengo QR" + explicación
- [ ] Selección manual cliente/equipo si no hay QR
- [ ] Validación GPS
- [ ] Formulario con descripción falla (mín 20 chars)
- [ ] 3 fotos (antes/después/extra)
- [ ] Firma digital

### Reportes
- [ ] Pantalla de éxito post-firma
- [ ] Generación PDF con template correcto (preventivo vs hielo)
- [ ] Opción compartir (email, WhatsApp)
- [ ] PDF fiel al diseño de reporte.html / reporte-hielo.html

### Offline
- [ ] Órdenes del día cacheadas
- [ ] Reporte guardado localmente si falla upload
- [ ] Cola de sincronización automática al recuperar conexión
- [ ] Indicador visual de estado offline

### Calidad
- [ ] TypeScript sin errores (strict mode)
- [ ] Todos los textos en español
- [ ] Colors fieles al prototipo (#F97316, #DC2626, #1E40AF)
- [ ] Fuente Inter en todos los textos
- [ ] Pruebas en iOS y Android
- [ ] Safe area (notch, home indicator) respetados
- [ ] Teclado no oculta inputs (KeyboardAvoidingView)

---

*Documento generado para el proyecto Calibeb — Abril 2026*  
*Basado en auditoría directa de `calibeb_demo.html` V5 (1,639 líneas) + `app.js` (834 líneas) + `mock-data.js` (441 líneas)*
