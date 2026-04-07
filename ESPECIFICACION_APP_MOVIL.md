# ESPECIFICACIÓN TÉCNICA — CALIBEB MOBILE APP (REAL)
**Versión:** 1.2 | **Fecha:** Abril 2026  
**Autor:** Análisis automatizado del prototipo `calibeb_demo.html` V5  
**Destinatarios:** Agente Frontend (CaliWeb) · Agente Backend (calibeb-api) · Agente Mobile

> **v1.2:** Incorpora módulo de Asignación QR/GPS/Fotografías para Gerentes CEDIS, modelo de roles y permisos (RBAC), corrección de dependencias faltantes, y revisión multi-perspectiva (Arquitecto · UI/UX · Product Owner · QA · Seguridad).

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
expo-camera              Cámara + QR scanner (preventivo, correctivo y asignación)
expo-location            GPS / geolocalización
expo-image-picker        Selección de fotos de galería
expo-media-library       Guardar fotos en dispositivo
expo-print               Generación de PDF para reportes
expo-sharing             Compartir PDF por email / WhatsApp
expo-notifications       Push notifications (órdenes nuevas, recordatorios)
expo-secure-store        Almacenamiento seguro de tokens JWT
expo-file-system         Manejo de archivos (fotos temporales)
expo-haptics             Feedback táctil (confirmaciones, errores)
```

### Utilidades Adicionales (REQUERIDAS — faltaban en v1.0)
```
geolib                          Cálculo de distancia Haversine entre coordenadas GPS
@react-native-community/netinfo Detección de estado de red (online/offline)
@react-native-community/datetimepicker   DatePicker nativo iOS/Android
react-native-maps               Mapa embebido (check-in GPS y asignación de ubicación)
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
│       ├── equipment-setup/      # 🔒 Solo GERENTE_CEDIS / ADMIN_GLOBAL
│       │   ├── _layout.tsx       # Stack + guard de roles
│       │   ├── index.tsx         # Lista equipos sin QR/GPS en el CEDIS
│       │   ├── search.tsx        # Buscar equipo por CEDIS + dropdown
│       │   ├── assign-qr.tsx     # Paso 1: Escanear QR del equipo
│       │   ├── assign-location.tsx # Paso 2: Capturar GPS + mapa
│       │   ├── assign-photos.tsx  # Paso 3: Fotografías del equipo
│       │   └── confirm.tsx       # Resumen + confirmación final
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
│   ⚠️  NOTA DE ARQUITECTURA: Expo Router usa layouts anidados para
│      protección de rutas. (app)/equipment-setup/_layout.tsx debe
│      verificar el rol del usuario y redirigir a /dashboard si no
│      tiene permisos antes de renderizar cualquier pantalla hija.
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
│   │   └── PhotoCapture.tsx      # Captura de fotos con preview + reintento
│   ├── signature/
│   │   └── SignatureCanvas.tsx   # Canvas de firma digital
│   ├── gps/
│   │   ├── LocationValidator.tsx # Validador de GPS con distancia
│   │   └── LocationPicker.tsx    # Picker de ubicación para asignación (mapa interactivo)
│   ├── equipment-setup/
│   │   ├── EquipmentCard.tsx     # Tarjeta de equipo con estado de asignación
│   │   └── SetupProgress.tsx    # Indicador de progreso de 3 pasos
│   └── report/
│       ├── ReportPreventive.tsx  # Template reporte preventivo
│       └── ReportIce.tsx         # Template reporte hielo
│
├── hooks/                        # Custom hooks
│   ├── useAuth.ts                # Autenticación, sesión y verificación de rol
│   ├── usePermissions.ts         # RBAC — verifica permisos por recurso/acción
│   ├── useLocation.ts            # GPS y geofencing
│   ├── useCamera.ts              # Cámara y QR
│   ├── useWorkOrders.ts          # CRUD de órdenes (TanStack Query)
│   ├── useEquipmentSetup.ts      # Flujo de asignación QR/GPS/fotos
│   ├── useForm.ts                # Form helpers
│   └── useOffline.ts             # Detección offline + queue
│
├── services/                     # Capa de comunicación con API
│   ├── api.ts                    # Cliente axios configurado
│   ├── auth.service.ts           # Login, logout, refresh token
│   ├── workOrders.service.ts     # CRUD órdenes de trabajo
│   ├── reports.service.ts        # Envío de reportes
│   ├── equipment.service.ts      # CRUD equipos + asignación QR/GPS
│   ├── upload.service.ts         # Upload de fotos/firmas/equipos
│   └── notifications.service.ts  # Push notifications
│
├── stores/                       # Estado global con Zustand
│   ├── auth.store.ts             # Usuario autenticado, token, ROL
│   ├── workOrder.store.ts        # Orden activa, progreso de pasos
│   ├── equipmentSetup.store.ts   # Equipo en proceso de asignación
│   ├── form.store.ts             # Datos del formulario activo
│   └── app.store.ts              # Config, offline status
│
├── types/                        # TypeScript types (COMPARTIDOS con backend)
│   ├── auth.types.ts             # UserRole, Permissions, AuthUser
│   ├── workOrder.types.ts        # WorkOrder, Equipment, Client, Technician
│   ├── report.types.ts           # ReportData, CalibrationRow, ChecklistItem
│   ├── equipment.types.ts        # EquipmentSetupData, AssignmentStatus
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
EXPO_PUBLIC_API_URL_STAGING=https://staging-api.calibeb.com/v1
EXPO_PUBLIC_GPS_RADIUS_METERS=500
EXPO_PUBLIC_MIN_FAULT_DESCRIPTION_CHARS=20
EXPO_PUBLIC_MAX_PHOTOS_PER_ORDER=10
EXPO_PUBLIC_MAX_PHOTO_SIZE_MB=5
EXPO_PUBLIC_EQUIPMENT_SETUP_MIN_PHOTOS=2
```

---

## 6. TIPOS TYPESCRIPT (COMPARTIDOS CON BACKEND)

Estos tipos deben ser revisados con el agente del backend para garantizar compatibilidad exacta con `calibeb-api`.

```typescript
// types/auth.types.ts

export type UserRole =
  | 'TECNICO'           // Solo puede ver sus propias órdenes y ejecutar mantenimientos
  | 'GERENTE_CEDIS'     // Puede asignar QR/GPS a equipos de su CEDIS; ve reportes de su zona
  | 'ADMIN_GLOBAL';     // Acceso total — todos los CEDIS, configuración del sistema

export interface UserPermissions {
  canExecuteMaintenance: boolean;    // TECNICO | GERENTE_CEDIS | ADMIN_GLOBAL
  canAssignEquipmentQR: boolean;     // GERENTE_CEDIS | ADMIN_GLOBAL
  canViewAllCedis: boolean;          // Solo ADMIN_GLOBAL
  canManageUsers: boolean;           // Solo ADMIN_GLOBAL
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cedisId: string | null;   // null solo para ADMIN_GLOBAL
  cedisName: string | null;
  permissions: UserPermissions;
}
```

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
  // Campos de asignación en campo (null = pendiente de asignación por Gerente CEDIS)
  qrCode: string | null;                          // null si aún no asignado
  gpsCoordinates: { lat: number; lng: number } | null;  // Coordenadas fijas del equipo
  locationDescription: string | null;             // Ej: "Comedor Principal, Zona B"
  photos: string[];                               // URLs de fotos del equipo en su ubicación
  setupCompletedAt: string | null;               // ISO datetime de cuándo se completó asignación
  setupCompletedBy: string | null;               // ID del gerente que completó la asignación
  isReadyForMaintenance: boolean;                // true solo cuando qrCode + gpsCoordinates están asignados
  installDate: string;       // ISO date YYYY-MM-DD
  lastMaintenance: string;   // ISO date YYYY-MM-DD
}

// types/equipment.types.ts

export type AssignmentStatus = 'PENDIENTE' | 'PARCIAL' | 'COMPLETADO';

export interface EquipmentSetupData {
  equipmentId: string;
  // Paso 1: QR
  qrCode: string;            // Valor del QR escaneado
  qrScannedAt: string;       // ISO datetime
  // Paso 2: Ubicación GPS
  gpsCoordinates: { lat: number; lng: number };
  gpsAccuracy: number;       // metros
  locationDescription: string;  // Descripción textual (requerida)
  locationCapturedAt: string;
  // Paso 3: Fotografías
  photos: Array<{
    uri: string;            // URI local temporal
    type: 'frontal' | 'lateral' | 'detalle' | 'contexto';
    timestamp: string;
  }>;
  // Auditoría
  assignedBy: string;        // ID del Gerente CEDIS
  assignedAt: string;        // ISO datetime de envío
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

### stores/equipmentSetup.store.ts
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Equipment, EquipmentSetupData } from '@/types';

interface EquipmentSetupStore {
  // Equipo seleccionado para asignar
  targetEquipment: Equipment | null;
  setTargetEquipment: (eq: Equipment | null) => void;

  // Draft del proceso de asignación (persiste entre pasos)
  setupDraft: Partial<EquipmentSetupData>;
  updateSetupDraft: (data: Partial<EquipmentSetupData>) => void;
  clearSetupDraft: () => void;

  // Paso actual del wizard (1=QR, 2=GPS, 3=Fotos, 4=Confirmar)
  currentStep: 1 | 2 | 3 | 4;
  setCurrentStep: (step: 1 | 2 | 3 | 4) => void;
}

export const useEquipmentSetupStore = create<EquipmentSetupStore>()(
  persist(
    (set) => ({
      targetEquipment: null,
      setTargetEquipment: (eq) => set({ targetEquipment: eq }),
      setupDraft: {},
      updateSetupDraft: (data) =>
        set((state) => ({ setupDraft: { ...state.setupDraft, ...data } })),
      clearSetupDraft: () => set({ setupDraft: {}, currentStep: 1, targetEquipment: null }),
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),
    }),
    {
      name: 'equipment-setup-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### stores/auth.store.ts (actualizado con roles)
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import type { AuthUser } from '@/types';

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  // Helpers de permisos (evitan verificar role directamente en componentes)
  canAssignEquipment: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) =>
        set({ user, token, isAuthenticated: true }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),
      // Métodos de conveniencia para RBAC
      canAssignEquipment: () => {
        const role = get().user?.role;
        return role === 'GERENTE_CEDIS' || role === 'ADMIN_GLOBAL';
      },
      isAdmin: () => get().user?.role === 'ADMIN_GLOBAL',
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

El agente de backend debe confirmar o crear los siguientes endpoints.

> **Nota de seguridad:** Todos los endpoints de `/equipment-setup/` deben verificar que el `Authorization` del JWT corresponde a un usuario con rol `GERENTE_CEDIS` o `ADMIN_GLOBAL`. El backend no debe confiar únicamente en el frontend para este control.

```
AUTH
POST   /auth/login                    { email, password } → { token, refreshToken, user: AuthUser }
                                       ⚠️ El objeto user DEBE incluir el campo 'role' y 'permissions'
POST   /auth/refresh                  { refreshToken } → { token }
POST   /auth/logout

ÓRDENES DE TRABAJO
GET    /work-orders?date=&status=     Lista de órdenes del técnico autenticado
GET    /work-orders/:id               Detalle de una orden
PATCH  /work-orders/:id/status        { status: 'EN_PROCESO' | 'COMPLETADO' }

REPORTES
POST   /reports                       Envío del ReportData completo (JSON)
GET    /reports/:id                   Obtener reporte guardado
GET    /reports/:id/pdf               Descargar PDF generado

UPLOADS
POST   /uploads/photo                 FormData { file, orderId, type }  → { url }
POST   /uploads/signature             FormData { file, orderId }         → { url }
POST   /uploads/equipment-photo       FormData { file, equipmentId, photoType } → { url }
                                       photoType: 'frontal' | 'lateral' | 'detalle' | 'contexto'

VALIDACIÓN QR (uso del técnico en mantenimiento)
POST   /equipment/validate-qr         { qrCode } → { equipment, client }
                                       404 si el QR no existe o no está asignado a ningún equipo

ASIGNACIÓN EN CAMPO (solo GERENTE_CEDIS / ADMIN_GLOBAL) 🔒
GET    /equipment?cedisId=&setupStatus=  Lista de equipos del CEDIS con estado de asignación
                                          setupStatus: 'PENDIENTE' | 'PARCIAL' | 'COMPLETADO'
GET    /equipment/:id                    Detalle de un equipo
PATCH  /equipment/:id/assign-qr          { qrCode } → { equipment }
                                          Valida que el QR no esté asignado a otro equipo
PATCH  /equipment/:id/assign-location    { lat, lng, accuracy, locationDescription }
PATCH  /equipment/:id/assign-photos      { photoUrls: string[] }
POST   /equipment/:id/complete-setup     {} → marca equipo como isReadyForMaintenance=true
                                          Solo procede si qrCode + gpsCoordinates están presentes

CATÁLOGOS
GET    /cedis                            Lista de CEDIS (para ADMIN_GLOBAL)
GET    /cedis/:id/equipment              Equipos de un CEDIS específico

PERFIL
GET    /users/me                         Info del usuario autenticado (técnico o gerente)
PATCH  /users/me                         Actualizar perfil (pushToken incluido)
```

---

## 9. CONTROL DE ACCESO BASADO EN ROLES (RBAC)

### Matriz de permisos

| Módulo / Acción | TECNICO | GERENTE_CEDIS | ADMIN_GLOBAL |
|---|:---:|:---:|:---:|
| Ver su agenda / órdenes | ✅ | ✅ | ✅ |
| Ejecutar mantenimiento preventivo | ✅ | ✅ | ✅ |
| Ejecutar mantenimiento correctivo | ✅ | ✅ | ✅ |
| Ver equipos de su CEDIS | ❌ | ✅ | ✅ |
| **Asignar QR a equipo** | ❌ | ✅ (solo su CEDIS) | ✅ |
| **Asignar GPS a equipo** | ❌ | ✅ (solo su CEDIS) | ✅ |
| **Subir fotos de equipo** | ❌ | ✅ (solo su CEDIS) | ✅ |
| Ver equipos de otro CEDIS | ❌ | ❌ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ✅ |

### Implementación del guard de rutas

```typescript
// app/(app)/equipment-setup/_layout.tsx
import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/stores/auth.store';

export default function EquipmentSetupLayout() {
  const canAssign = useAuthStore((state) => state.canAssignEquipment());

  // Redirige silenciosamente si no tiene permisos
  if (!canAssign) {
    return <Redirect href="/(app)/dashboard" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
}
```

### Mostrar/ocultar módulo en el Tab Navigator

```typescript
// app/(app)/_layout.tsx
const { user } = useAuthStore();
const canAssign = user?.permissions.canAssignEquipmentQR;

// Tab de "Equipos" solo visible para GERENTE_CEDIS y ADMIN_GLOBAL
<Tabs.Screen
  name="equipment-setup"
  options={{
    href: canAssign ? '/equipment-setup' : null,  // null oculta el tab
    title: 'Equipos',
    tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
  }}
/>
```

### Hook de permisos reutilizable

```typescript
// hooks/usePermissions.ts
import { useAuthStore } from '@/stores/auth.store';

export function usePermissions() {
  const user = useAuthStore((state) => state.user);

  return {
    canAssignEquipment: user?.permissions.canAssignEquipmentQR ?? false,
    canViewAllCedis: user?.permissions.canViewAllCedis ?? false,
    isAdmin: user?.role === 'ADMIN_GLOBAL',
    isManager: user?.role === 'GERENTE_CEDIS',
    isTechnician: user?.role === 'TECNICO',
    userCedisId: user?.cedisId ?? null,
  };
}
```

---

## 10. MÓDULO DE ASIGNACIÓN EN CAMPO (GERENTE CEDIS)

### Contexto de negocio

Antes de que un técnico pueda realizar un mantenimiento, cada equipo en el sistema **DEBE tener asignado**:
1. **Código QR** — etiqueta física pegada al equipo en la planta del cliente
2. **Coordenadas GPS** — ubicación exacta del equipo para validar el check-in del técnico
3. **Fotografías** — registro visual del equipo instalado en su ubicación real

Este proceso lo realiza el **Gerente de CEDIS** yendo físicamente al sitio del cliente. Sin este proceso previo, la app bloqueará el inicio de mantenimientos en ese equipo.

### Flujo completo — 4 pasos

```
equipment-setup/index.tsx
  └─ Seleccionar CEDIS (solo ADMIN_GLOBAL, GERENTEs ven solo su CEDIS)
  └─ Lista de equipos: PENDIENTE | PARCIAL | COMPLETADO
        ↓ Tap equipo PENDIENTE o PARCIAL
equipment-setup/search.tsx (buscar por nombre/serie/dropdown)
        ↓ Seleccionar equipo
equipment-setup/assign-qr.tsx      → PASO 1: Escaneo QR
        ↓
equipment-setup/assign-location.tsx → PASO 2: GPS + descripción
        ↓
equipment-setup/assign-photos.tsx  → PASO 3: Mínimo 2 fotos
        ↓
equipment-setup/confirm.tsx        → Resumen + confirmar envío
```

### Diseño visual: Tema Violeta/Índigo

Para distinguir este módulo de los flujos de técnicos, usar el color `#7C3AED` (violet-700):
- Header: `bg-violet-700`
- Botones primarios: `bg-violet-600`
- Badges: `bg-violet-50 text-violet-700`
- Progress steps: violeta activo, slate inactivo

### Implementación por pantalla

#### equipment-setup/index.tsx — Lista de equipos del CEDIS
```
Query: useQuery(['equipment', cedisId, 'PENDIENTE'], () =>
  equipmentService.getEquipmentByCedis(cedisId, { setupStatus: 'PENDIENTE' })
)

UI:
  - Header violeta con título "Asignación de Equipos"
  - Resumen stats: X PENDIENTES | X PARCIALES | X COMPLETADOS
  - Tabs: Pendientes / Parciales / Todos
  - FlatList de <EquipmentCard> con badge de estado
  - Badge PENDIENTE: violeta | PARCIAL: ámbar | COMPLETADO: verde
  - Cada card muestra: nombre equipo, marca/modelo, cliente, dirección
  - Tap → navigate to assign-qr con equipmentId como parámetro

Estado vacío (todos completados):
  - Ícono check verde grande
  - "Todos los equipos de tu CEDIS tienen QR y ubicación asignados"
```

#### equipment-setup/assign-qr.tsx — Paso 1: Escaneo QR
```
UI:
  - <SetupProgress step={1} total={3} /> en el header
  - Instrucciones: "Escanea el código QR pegado en el equipo"
  - <QRScanner /> viewfinder con tema violeta
  - Al escanear: verificar que el QR NO esté asignado a otro equipo
      → POST /equipment/validate-qr-availability { qrCode, targetEquipmentId }
      → Si ya asignado: mostrar error con datos del equipo que lo tiene
      → Si disponible: navegar al paso 2
  - Card de confirmación mostrando el código escaneado
  - Botón de linterna

Lógica:
  const { updateSetupDraft } = useEquipmentSetupStore();
  onQRScanned = async (qrCode) => {
    const isAvailable = await equipmentService.checkQRAvailability(qrCode, equipment.id);
    if (!isAvailable) showError('Este QR ya está asignado a otro equipo');
    else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      updateSetupDraft({ qrCode, qrScannedAt: new Date().toISOString() });
      router.push('/equipment-setup/assign-location');
    }
  };
```

#### equipment-setup/assign-location.tsx — Paso 2: GPS y descripción
```
UI:
  - <SetupProgress step={2} total={3} />
  - Mapa embebido (react-native-maps) con marcador en posición actual
  - Botón "Capturar mi ubicación actual" con spinner mientras obtiene GPS
  - Precisión mostrada en tiempo real: badge verde (<10m) / ámbar (<30m) / rojo (>30m)
  - Después de capturar: mostrar lat/lng + precisión en card
  - Campo OBLIGATORIO: TextInput "Descripción de ubicación"
    placeholder: "Ej: Comedor Principal, Pared Norte, junto a la ventana"
    minLength: 10 caracteres
  - Solo habilitar "Continuar" cuando GPS capturado Y descripción >= 10 chars

Lógica:
  const captureLocation = async () => {
    setCapturing(true);
    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      // Exigir precisión mínima de 30 metros
      if (coords.accuracy > 30) {
        showWarning(`Precisión baja (${coords.accuracy}m). Espera mejor señal.`);
        return;
      }
      updateSetupDraft({
        gpsCoordinates: { lat: coords.latitude, lng: coords.longitude },
        gpsAccuracy: coords.accuracy,
        locationCapturedAt: new Date().toISOString(),
      });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } finally {
      setCapturing(false);
    }
  };
```

#### equipment-setup/assign-photos.tsx — Paso 3: Fotografías
```
UI:
  - <SetupProgress step={3} total={3} />
  - Grid 2×2 de slots de fotos con tipos:
    · FRONTAL (requerida) — vista frontal completa del equipo
    · LATERAL (requerida) — vista lateral con contexto del ambiente
    · DETALLE (opcional) — detalle del serial/modelo
    · CONTEXTO (opcional) — foto general del área donde está el equipo
  - Cada slot: botón de cámara o ícono de galería
  - Al tomar foto: preview en el mismo slot + botón para retomar
  - Contador: "2/4 fotos tomadas (mínimo 2 requeridas)"
  - Solo habilitar "Continuar" si al menos FRONTAL + LATERAL están capturadas

Validaciones:
  - Tamaño máximo por foto: 5MB (definido en .env)
  - Comprimir automáticamente con expo-image-manipulator si excede tamaño:
      await ImageManipulator.manipulateAsync(uri, [], { compress: 0.7, format: JPEG })
  - Formato aceptado: JPEG únicamente (para compatibilidad con PDF)
```

#### equipment-setup/confirm.tsx — Paso 4: Confirmación
```
UI:
  - Resumen completo:
    · Tarjeta equipo: nombre, marca, modelo, serie, cliente
    · Tarjeta QR: código escaneado con ícono de check verde
    · Tarjeta Ubicación: lat/lng, precisión, descripción
    · Grid de miniaturas de fotos tomadas
  - Aviso legal: checkbox "Confirmo que la información capturada es correcta y
    corresponde al equipo físico instalado en la ubicación indicada"
  - Botón "Confirmar y Guardar" (violeta, deshabilitado hasta checkbox)
  - Botón "Editar" por sección (vuelve al paso correspondiente)

Lógica al confirmar:
  1. Upload de fotos: POST /uploads/equipment-photo (una por una, show progreso)
  2. PATCH /equipment/:id/assign-qr
  3. PATCH /equipment/:id/assign-location
  4. PATCH /equipment/:id/assign-photos  
  5. POST  /equipment/:id/complete-setup
  6. Limpiar store + navigate a success

Manejo de errores:
  - Si algún paso falla: mostrar el paso que falló con opción de reintentar
  - NO reiniciar todo el flujo — conservar el draft en el store
  - Si falla el upload de fotos por red: guardar URIs locales y reintentar en background
```

### Tipo EquipmentCard — estados visuales

```typescript
// Regla: el técnico debe ver el estado del equipo antes de comenzar mantenimiento
export function getEquipmentReadinessStatus(equipment: Equipment): {
  ready: boolean;
  message: string;
  blocking: boolean;  // si true, el técnico no puede iniciar el mantenimiento
} {
  if (!equipment.qrCode && !equipment.gpsCoordinates) {
    return {
      ready: false,
      message: 'Este equipo requiere asignación de QR y ubicación',
      blocking: true,
    };
  }
  if (!equipment.qrCode) {
    return { ready: false, message: 'Falta asignar código QR', blocking: true };
  }
  if (!equipment.gpsCoordinates) {
    return { ready: false, message: 'Falta asignar ubicación GPS', blocking: true };
  }
  return { ready: true, message: 'Listo para mantenimiento', blocking: false };
}
```

> **Regla de negocio crítica:** El flujo de mantenimiento (checkin.tsx) debe verificar `equipment.isReadyForMaintenance` antes de proceder. Si es `false`, mostrar pantalla de error explicativa con datos del Gerente de CEDIS para contactar, y NO permitir continuar.

---

## 11. IMPLEMENTACIÓN POR PANTALLA

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

## 12. COMPONENTES CLAVE — IMPLEMENTACIÓN

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

## 13. GENERACIÓN DE PDF

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

## 14. MODO OFFLINE

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

## 15. NOTIFICACIONES PUSH

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

## 16. SEGURIDAD

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

## 17. FLUJO DE TRABAJO DE DESARROLLO

### Fase 1: Setup (Día 1)
```bash
npx create-expo-app calibeb-app --template tabs
cd calibeb-app

# UI y animaciones
npx expo install nativewind tailwindcss react-native-reanimated react-native-gesture-handler

# Navegación y módulos nativos core
npx expo install expo-router expo-camera expo-location expo-image-picker expo-haptics

# PDF, archivos y almacenamiento
npx expo install expo-print expo-sharing expo-secure-store expo-file-system
npx expo install expo-image-manipulator    # ← compresión de fotos antes de upload

# AsyncStorage y networking
npx expo install @react-native-async-storage/async-storage
npx expo install @react-native-community/netinfo   # ← detección offline (faltaba en v1.0)

# Mapa para GPS (checkin + asignación de ubicación)
npx expo install react-native-maps

# State y formularios
npm install zustand @tanstack/react-query axios react-hook-form zod

# Firma digital y QR
npm install react-native-signature-canvas

# Utilidades
npm install geolib                                  # ← distancia Haversine (faltaba en v1.0)
npm install @react-native-community/datetimepicker  # ← DatePicker nativo (faltaba en v1.0)
```

### Fase 2: Estructura y tipos (Día 1-2)
- Crear toda la estructura de directorios
- Definir todos los tipos TypeScript — **coordinar con agente backend antes de codear**
- Configurar NativeWind y paleta de colores (incluyendo violeta para módulo gerente)
- Setup de Zustand stores (auth, workOrder, equipmentSetup)
- Configurar axios con interceptors (JWT + refresh)

### Fase 3: Auth, roles y dashboard (Día 2-3)
- Login screen con manejo de `role` en respuesta
- Auth store con helpers `canAssignEquipment()`, `isAdmin()`
- Dashboard con OrderCard y OrderGroup
- Tab navigator con visibilidad condicional por rol
- Route guard para `equipment-setup/`

### Fase 4: Flujo preventivo (Día 3-6)
- Checkin GPS (con verificación `isReadyForMaintenance`)
- QR Scanner
- Steps 1-6 (checklists)
- Step 7 (tabla de calibración 12 válvulas)
- Signature

### Fase 5: Flujo hielo y correctivo (Día 6-8)
- Ice machine screen
- Corrective QR → GPS → Form → Signature

### Fase 6: Módulo Asignación en Campo — Gerente CEDIS (Día 8-10)
- Lista equipos por CEDIS con estados de asignación
- Paso 1: QR scan con validación de disponibilidad
- Paso 2: GPS capture + mapa + descripción
- Paso 3: Fotografías (mínimo 2 tipos: frontal + lateral)
- Paso 4: Confirmación + upload progresivo

### Fase 7: Reportes y PDF (Día 10-12)
- Templates HTML → funciones TypeScript
- expo-print integration
- Success screen con opciones de compartir

### Fase 8: Integración API real (Día 12-14)
- Reemplazar mock data con llamadas a calibeb-api
- Testing de todos los endpoints (incluyendo equipment-setup)
- Manejo de errores de red por pantalla

### Fase 9: Offline y push notifications (Día 14-16)
- Queue de reportes offline
- Push notifications registration
- Queue de asignaciones offline (Gerente puede estar en planta sin señal)

### Fase 10: QA y polish (Día 16-18)
- Testing en iOS y Android reales
- Testing de flujo del Gerente CEDIS con coordinador de permisos
- Ajustes de UI pixel-perfect vs prototipo
- Edge cases: fotos fallidas, GPS sin señal, QR ya asignado, equipo no listo
- KeyboardAvoidingView en formularios con inputs inferiores
- Empty states (sin órdenes, todos los equipos asignados)

### Fase 11: Build de producción (Día 18+)
```bash
eas build --platform all   # Genera APK + IPA
eas submit                 # Subir a App Store / Play Store
# OTA updates para hotfixes sin pasar por review:
eas update --channel production
```

---

## 18. CONVENCIONES DE CÓDIGO (OBLIGATORIAS)

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

## 19. DISEÑO — FIDELIDAD AL PROTOTIPO

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

## 20. PREGUNTAS PARA EL AGENTE BACKEND (calibeb-api)

Antes de iniciar la Fase 8 (integración API real), el agente backend debe responder:

1. **¿Cuál es el URL base de la API?** (staging y producción)
2. **¿Cuál es el mecanismo de auth?** JWT Bearer / OAuth2 / Session?
3. **¿Los tokens JWT tienen refresh?** ¿Cuál es la expiración?
4. **¿El endpoint `/auth/login` ya retorna el campo `role` en el objeto user?** Si no, hay que añadirlo — es crítico para RBAC.
5. **¿Existe endpoint de validación QR para mantenimiento?** (`POST /equipment/validate-qr`)
6. **¿Existe endpoint para verificar disponibilidad de QR?** (`POST /equipment/validate-qr-availability`) — necesario para el flujo de asignación.
7. **¿Los endpoints de asignación de equipos ya existen?** (`PATCH /equipment/:id/assign-qr`, `assign-location`, `assign-photos`, `complete-setup`)
8. **¿Cómo se suben las fotos?** ¿Multipart FormData o base64 en JSON?
9. **¿El reporte PDF se genera en el backend o en el móvil?** (propuesto: en móvil con expo-print)
10. **¿Existe paginación en `/work-orders` y `/equipment`?** ¿Qué parámetros (`page`, `limit`, `cursor`)?
11. **¿Hay WebSockets para updates en tiempo real** (nueva orden, escaner de QR conflictivo)?
12. **¿Los checklist templates vienen del backend** o son fijos en el cliente?
13. **¿Cuál es el formato de campos** en la API: camelCase o snake_case?
14. **¿Hay un ambiente de staging** para pruebas?
15. **¿Qué sucede operacionalmente si un técnico intenta hacer check-in en un equipo sin QR asignado?** ¿El backend lo bloquea o solo el frontend?

---

## 21. PREGUNTAS PARA EL AGENTE FRONTEND (CaliWeb)

El agente que construyó CaliWeb puede añadir valor en:

1. **¿Qué tipos TypeScript ya definiste** para WorkOrder, Client, Equipment? ¿Podemos compartirlos en un paquete `@calibeb/types`?
2. **¿Cómo están estructurados los datos que CaliWeb consume de calibeb-api?** ¿Son los mismos que necesita mobile?
3. **¿El dashboard ejecutivo recibe datos del móvil** en tiempo real o en batch al subir el reporte?
4. **¿Las fotos y firmas (y las nuevas fotos de asignación de equipos) se almacenan en el mismo storage** que usa CaliWeb?
5. **¿Existe un design system** compartido (tokens de color, tipografía)? — El móvil propone añadir `violet-700` (#7C3AED) para el módulo de Gerente CEDIS.
6. **¿Qué features del dashboard ejecutivo** (`DASHBOARD_EJECUTIVO_CALIWEB.md`) dependen directamente de datos generados por la app móvil?
7. **¿CaliWeb tiene una vista para que el Gerente CEDIS vea el estado de asignación de equipos** (cuáles tienen QR, cuáles les falta GPS, etc.)? Si no existe, debe crearse — es el mismo proceso desde la web.

---

## 22. CHECKLIST DE COMPLETITUD — PARA EL AGENTE CONSTRUCTOR

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

### Módulo de Asignación en Campo (Gerente CEDIS)
- [ ] Tab "Equipos" solo visible para GERENTE_CEDIS y ADMIN_GLOBAL
- [ ] Route guard redirige a dashboard si TECNICO intenta acceder
- [ ] Lista equipos del CEDIS con filtros PENDIENTE / PARCIAL / COMPLETADO
- [ ] Paso 1: QR scan con validación de disponibilidad (no asignado a otro equipo)
- [ ] Paso 2: GPS con validación de precisión (<30m), mapa preview, descripción textual
- [ ] Paso 3: Mínimo 2 fotos (frontal + lateral) con preview y opción reintento
- [ ] Fotos comprimidas automáticamente si > 5MB
- [ ] Paso 4: Resumen + checkbox de confirmación legal
- [ ] Upload progresivo con indicador (% fotos subidas)
- [ ] En error de upload: conservar draft, opción de reintentar sin repetir el flujo
- [ ] Equipo con asignación completa: `isReadyForMaintenance = true`
- [ ] Flujo de técnico bloqueado en checkin si equipo no está listo
- [ ] Pantalla informativa de error con datos del Gerente CEDIS para contactar
- [ ] Queue offline para asignaciones (planta sin señal)

### Roles y Seguridad
- [ ] Respuesta de login incluye campo `role` y `permissions`
- [ ] Token JWT en SecureStore (nunca AsyncStorage)
- [ ] canAssignEquipment() retorna false para TECNICO
- [ ] Tabs con `href: null` para rutas sin permiso
- [ ] Backend verifica roles en todos los endpoints de `/equipment-setup/`

### UX / Calidad
- [ ] Loading states en todas las operaciones async (Spinner o Skeleton)
- [ ] Error states por pantalla (no solo toast genérico)
- [ ] Empty states definidos (sin órdenes, todos equipos asignados)
- [ ] Feedback háptico en confirmaciones exitosas y errores
- [ ] Offline banner visible cuando no hay conexión
- [ ] Órdenes del día cacheadas
- [ ] Reporte guardado localmente si falla upload
- [ ] Cola de sincronización automática al recuperar conexión

### Calidad de Código
- [ ] TypeScript sin errores (strict mode)
- [ ] Todos los textos de UI en español
- [ ] Colors fieles al prototipo (#F97316, #DC2626, #1E40AF, #7C3AED para gerente)
- [ ] Fuente Inter en todos los textos
- [ ] Pruebas en iOS y Android reales
- [ ] Safe area (notch, home indicator) respetados en todas las pantallas
- [ ] KeyboardAvoidingView en todos los formularios con inputs

---

---

## 23. REVISIÓN MULTI-PERSPECTIVA

Esta sección documenta los hallazgos del análisis del documento desde 5 ángulos profesionales. Sirve como log de decisiones para los agentes constructores.

### 🏗️ Arquitecto de Software
**Problemas encontrados y resueltos en v1.2:**
- ✅ Dependencias faltantes añadidas: `geolib`, `@react-native-community/netinfo`, `@react-native-community/datetimepicker`, `react-native-maps`, `expo-haptics`, `expo-image-manipulator`
- ✅ Auth store tipado con `AuthUser` (antes `Technician`) para soportar múltiples roles
- ✅ `equipmentSetup.store.ts` separado del `workOrder.store.ts` — responsabilidad única
- ✅ Stageing URL añadida a `.env.local`
- ✅ Variable `EXPO_PUBLIC_MAX_PHOTO_SIZE_MB` para configuración sin re-deploy
- ⚠️ **Pendiente de decisión:** ¿tipos compartidos con CaliWeb via `@calibeb/types` monorepo? — Consultar al agente frontend
- ⚠️ **Pendiente:** ¿El backend genera el PDF o el móvil? Impacta el modelo offline

### 🎨 UI/UX Designer
**Problemas encontrados y resueltos en v1.2:**
- ✅ Módulo Gerente CEDIS tiene color propio (violeta `#7C3AED`) — evita confusión con flujos de técnico
- ✅ Feedback háptico añadido (`expo-haptics`) en confirmaciones y errores
- ✅ Empty states definidos para lista de órdenes y lista de equipos
- ✅ Indicador de precisión GPS en tiempo real (verde/ámbar/rojo) para asignación de ubicación
- ✅ `SetupProgress` stepper de 3 pasos para el flujo de asignación (orientación al usuario)
- ⚠️ **Recomendación:** Añadir skeleton loaders en lugar de spinners para listas (mejor percepción de velocidad)
- ⚠️ **Recomendación:** La pantalla de error "equipo no listo" debe mostrar el nombre y teléfono del Gerente de CEDIS responsable

### 📋 Product Owner
**Problemas encontrados y resueltos en v1.2:**
- ✅ Prerequisito de negocio documentado: equipo necesita QR + GPS antes de poder mantener
- ✅ `isReadyForMaintenance` como flag binario en `Equipment` — simple y verificable
- ✅ Flujo bloqueante para técnico cuando equipo no está configurado
- ✅ `getEquipmentReadinessStatus()` como función reutilizable
- ✅ Gerente puede ver equipos pendientes agrupados por CEDIS
- ⚠️ **Caso de uso pendiente:** ¿Qué pasa si el QR físico se daña en el campo y hay que reasignarlo? ¿Cuál es el proceso de re-asignación? El backend debe contemplar sobreescribir el qrCode de un equipo (solo ADMIN_GLOBAL).
- ⚠️ **Caso de uso pendiente:** ¿Puede un técnico iniciar un correctivo en un equipo sin QR? La decisión es: NO por defecto, pero el Gerente puede hacer override desde la web.

### 🧪 QA Engineer
**Problemas encontrados y resueltos en v1.2:**
- ✅ Validación de precisión GPS mínima: 30 metros para asignación de ubicación
- ✅ Validación QR disponibilidad antes de asignar (no duplicar QRs)
- ✅ Compresión automática de fotos > 5MB
- ✅ Mínimo 2 fotos requeridas (frontal + lateral) validado en frontend y backend
- ✅ Manejo de error granular en upload progresivo (conservar draft si falla)
**Casos de prueba prioritarios a cubrir:**
- [ ] QR ya asignado a otro equipo → mostrar error con nombre de ese equipo
- [ ] GPS con precisión >30m → warning, no bloquear pero advertir
- [ ] Sin permisos de cámara (denegados permanentemente) → instrucciones a Settings
- [ ] Sin permisos de ubicación → instrucciones a Settings
- [ ] Foto > 5MB → compresión automática visible al usuario
- [ ] Red cae durante el upload progresivo → conservar fotos locales, reintentar
- [ ] Técnico intenta acceder a `/equipment-setup/` → redirect silencioso
- [ ] Token expira a mitad del flujo de asignación → refresh + continuar sin perder draft
- [ ] Equipo con `isReadyForMaintenance=false` aparece en orden del técnico → pantalla de error con contexto

### 🔐 Security Engineer
**Problemas encontrados y resueltos en v1.2:**
- ✅ RBAC en frontend (route guard) + exigencia de RBAC en backend
- ✅ SecureStore para JWT (no AsyncStorage)
- ✅ Nota explícita: el backend NO debe confiar solo en el frontend para verificar roles
- ✅ `.env.local` en `.gitignore` implícito
- ⚠️ **Pendiente:** Certificate pinning (SSL pinning) para el cliente axios — añadir en fase de producción con `expo-ssl-pinning` o configuración EAS
- ⚠️ **Pendiente:** Las fotos de equipos son activos corporativos — confirmar con backend que las URLs de almacenamiento requieren autenticación (no sean públicas)
- ⚠️ **Pendiente:** Log de auditoría en backend para cada acción de asignación (quién asignó qué QR, con coordenadas, a qué hora)

---

*Documento v1.2 — Proyecto Calibeb — Abril 2026*  
*Basado en auditoría directa de `calibeb_demo.html` V5 (1,639 líneas) + `app.js` (834 líneas) + `mock-data.js` (441 líneas)*  
*Revisado desde perspectivas: Arquitecto · UI/UX · Product Owner · QA · Seguridad*
