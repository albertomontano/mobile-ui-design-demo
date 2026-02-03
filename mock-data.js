/* ============================================
   CALIBEB APP - DATOS MOCK
   Base de datos simulada para la demo
   ============================================ */

/**
 * ESTADO GLOBAL DE LA APLICACIÓN
 * Centraliza todos los datos para facilitar testing y futuras integraciones
 */
const AppData = {
    
    // ===== INFORMACIÓN DEL TÉCNICO =====
    technician: {
        id: 'TECH-001',
        name: 'Miguel López',
        initials: 'ML',
        email: 'tecnico@calibeb.com',
        phone: '+52 442 123 4567',
        zone: 'Zona Bajío',
        avatar: null,
        activeSince: '2024-03-15',
        rating: 4.8,
        completedServices: 247
    },
    
    // ===== ÓRDENES DE TRABAJO =====
    workOrders: [
        {
            id: 'MNT-2026-123',
            type: 'preventive',
            status: 'pending',
            priority: 'normal',
            client: {
                id: 'CLI-005',
                name: 'Aptiv Planta 5',
                location: 'Nave B',
                address: 'Parque Industrial Querétaro',
                contact: 'Ing. Roberto Mendoza',
                email: 'roberto@aptiv.com',
                phone: '+52 442 987 6543'
            },
            equipment: {
                id: 'EQ-2024-45',
                type: 'Dispensador Crathco',
                brand: 'Crathco',
                model: 'D25-3',
                serialNumber: 'DISP-2024-45',
                installDate: '2024-06-10',
                lastMaintenance: '2025-12-02'
            },
            schedule: {
                date: '2026-02-02',
                startTime: '09:00',
                endTime: '10:30',
                duration: 90 // minutos
            },
            tasks: [
                { id: 1, name: 'Exterior de Máquina', completed: false, required: true },
                { id: 2, name: 'Válvulas', completed: false, required: true },
                { id: 3, name: 'Sistema Eléctrico', completed: false, required: true }
            ],
            notes: '',
            photos: [],
            signature: null,
            createdAt: '2026-01-28T10:30:00',
            updatedAt: '2026-02-02T08:00:00'
        },
        {
            id: 'MNT-2026-120',
            type: 'corrective',
            status: 'completed',
            priority: 'high',
            client: {
                id: 'CLI-008',
                name: 'Comedor Industrial Bajío',
                location: 'Área de Servicio',
                address: 'Boulevard Bernardo Quintana 4050',
                contact: 'Lic. Carmen Sánchez',
                email: 'carmen@cib.com',
                phone: '+52 442 555 1234'
            },
            equipment: {
                id: 'EQ-2023-12',
                type: 'Máquina de Hielo',
                brand: 'Manitowoc',
                model: 'IY-0525A',
                serialNumber: 'ICE-2023-12',
                installDate: '2023-09-20',
                lastMaintenance: '2026-02-02'
            },
            schedule: {
                date: '2026-02-02',
                startTime: '07:00',
                endTime: '08:15',
                duration: 75
            },
            issue: 'Producción de hielo intermitente',
            solution: 'Reemplazo de válvula solenoide y limpieza de filtros',
            tasks: [
                { id: 1, name: 'Diagnóstico', completed: true, required: true },
                { id: 2, name: 'Reparación', completed: true, required: true },
                { id: 3, name: 'Pruebas', completed: true, required: true }
            ],
            notes: 'Cliente reporta problema desde hace 2 días. Se realizó cambio de válvula y pruebas exitosas.',
            photos: ['before.jpg', 'after.jpg'],
            signature: 'data:image/png;base64,...',
            completedAt: '2026-02-02T08:15:00',
            createdAt: '2026-02-01T16:45:00',
            updatedAt: '2026-02-02T08:15:00'
        },
        {
            id: 'MNT-2026-124',
            type: 'preventive',
            status: 'pending',
            priority: 'normal',
            client: {
                id: 'CLI-012',
                name: 'Universidad Aeronáutica',
                location: 'Cafetería Principal',
                address: 'Carretera Estatal 200',
                contact: 'Mtro. José Ramírez',
                email: 'jose.ramirez@unaq.edu.mx',
                phone: '+52 442 192 1200'
            },
            equipment: {
                id: 'EQ-2024-67',
                type: 'Enfriador de Agua',
                brand: 'Elkay',
                model: 'LZSTL8WSK',
                serialNumber: 'COOL-2024-67',
                installDate: '2024-08-15',
                lastMaintenance: '2026-01-05'
            },
            schedule: {
                date: '2026-02-02',
                startTime: '11:00',
                endTime: '12:00',
                duration: 60
            },
            tasks: [
                { id: 1, name: 'Limpieza Externa', completed: false, required: true },
                { id: 2, name: 'Cambio de Filtro', completed: false, required: true },
                { id: 3, name: 'Verificación de Temperatura', completed: false, required: true }
            ],
            notes: '',
            photos: [],
            signature: null,
            createdAt: '2026-01-29T14:20:00',
            updatedAt: '2026-02-01T10:00:00'
        },
        {
            id: 'MNT-2026-125',
            type: 'preventive',
            status: 'pending',
            priority: 'low',
            client: {
                id: 'CLI-015',
                name: 'Hotel Plaza Querétaro',
                location: 'Lobby',
                address: 'Constituyentes 2 Pte',
                contact: 'Sr. Alberto Vega',
                email: 'alberto.vega@hotelplaza.com',
                phone: '+52 442 224 4300'
            },
            equipment: {
                id: 'EQ-2025-03',
                type: 'Dispensador de Café',
                brand: 'Bunn',
                model: 'AXIOM-15-3',
                serialNumber: 'CAFE-2025-03',
                installDate: '2025-01-10',
                lastMaintenance: '2026-01-10'
            },
            schedule: {
                date: '2026-02-02',
                startTime: '14:00',
                endTime: '15:00',
                duration: 60
            },
            tasks: [
                { id: 1, name: 'Descalcificación', completed: false, required: true },
                { id: 2, name: 'Limpieza de Boquillas', completed: false, required: true },
                { id: 3, name: 'Calibración', completed: false, required: true }
            ],
            notes: '',
            photos: [],
            signature: null,
            createdAt: '2026-01-30T09:15:00',
            updatedAt: '2026-02-01T11:30:00'
        }
    ],
    
    // ===== ESTADÍSTICAS =====
    stats: {
        today: {
            date: '2026-02-02',
            completed: 1,
            pending: 3,
            inProgress: 0,
            cancelled: 0,
            hoursWorked: 1.25,
            efficiency: 95
        },
        week: {
            startDate: '2026-01-27',
            endDate: '2026-02-02',
            completed: 14,
            pending: 8,
            inProgress: 2,
            cancelled: 1,
            hoursWorked: 42,
            efficiency: 92
        },
        month: {
            month: 'Febrero',
            year: 2026,
            completed: 14,
            pending: 18,
            inProgress: 2,
            cancelled: 1,
            hoursWorked: 42,
            efficiency: 91
        }
    },
    
    // ===== CATÁLOGOS =====
    catalogs: {
        // Tipos de equipos
        equipmentTypes: [
            'Dispensador de Bebidas',
            'Máquina de Hielo',
            'Enfriador de Agua',
            'Dispensador de Café',
            'Máquina Expendedora',
            'Refrigerador Comercial',
            'Congelador',
            'Otro'
        ],
        
        // Tipos de mantenimiento
        maintenanceTypes: [
            { id: 'preventive', name: 'Preventivo', color: 'orange' },
            { id: 'corrective', name: 'Correctivo', color: 'red' },
            { id: 'installation', name: 'Instalación', color: 'blue' },
            { id: 'removal', name: 'Retiro', color: 'gray' }
        ],
        
        // Estados de órdenes
        orderStatuses: [
            { id: 'pending', name: 'Pendiente', color: 'orange' },
            { id: 'in-progress', name: 'En Progreso', color: 'blue' },
            { id: 'completed', name: 'Completado', color: 'green' },
            { id: 'cancelled', name: 'Cancelado', color: 'gray' },
            { id: 'on-hold', name: 'En Espera', color: 'yellow' }
        ],
        
        // Prioridades
        priorities: [
            { id: 'low', name: 'Baja', color: 'gray' },
            { id: 'normal', name: 'Normal', color: 'blue' },
            { id: 'high', name: 'Alta', color: 'orange' },
            { id: 'urgent', name: 'Urgente', color: 'red' }
        ],
        
        // Problemas comunes
        commonIssues: [
            'No enciende',
            'Fuga de agua',
            'No enfría',
            'Ruido excesivo',
            'Falta de presión',
            'Error en display',
            'Producción deficiente',
            'Otro'
        ]
    },
    
    // ===== CHECKLIST TEMPLATES =====
    checklistTemplates: {
        exteriorMachine: [
            { id: 'ext-1', label: 'Limpiar parte superior', required: true },
            { id: 'ext-2', label: 'Limpiar costados', required: true },
            { id: 'ext-3', label: 'Limpiar parte trasera', required: true },
            { id: 'ext-4', label: 'Limpieza base y patas', required: true },
            { id: 'ext-5', label: 'Revisión clavija y tomacorriente', required: true }
        ],
        valves: [
            { id: 'val-1', label: 'Limpieza boquillas y difusor', required: true },
            { id: 'val-2', label: 'Limpieza ranura interna', required: true },
            { id: 'val-3', label: 'Revisión de micros', required: true },
            { id: 'val-4', label: 'Estado de bobinas', required: true },
            { id: 'val-5', label: 'Revisión de palancas', required: true },
            { id: 'val-6', label: 'Lavado de cuerpo de válvulas', required: true }
        ],
        electrical: [
            { id: 'elec-1', label: 'Revisión de conexiones', required: true },
            { id: 'elec-2', label: 'Verificación de voltaje', required: true },
            { id: 'elec-3', label: 'Estado de cables', required: true },
            { id: 'elec-4', label: 'Prueba de componentes', required: true }
        ]
    },
    
    // ===== CONFIGURACIÓN DE LA APP =====
    appConfig: {
        version: '3.0.0',
        environment: 'demo',
        features: {
            offlineMode: false,
            gpsValidation: true,
            photoRequired: true,
            signatureRequired: true,
            autoBackup: false
        },
        limits: {
            maxPhotosPerOrder: 10,
            maxNotesLength: 500,
            checkInRadius: 500 // metros
        },
        company: {
            name: 'Calibeb',
            logo: 'calibeb_logo-removebg-preview.png',
            primaryColor: '#F97316',
            supportPhone: '+52 442 000 0000',
            supportEmail: 'soporte@calibeb.com'
        }
    }
};

/**
 * FUNCIONES DE ACCESO A DATOS
 * Abstraen el acceso a los datos para facilitar futuras integraciones con API
 */
const DataService = {
    
    /**
     * Obtiene información del técnico actual
     */
    getTechnician() {
        return { ...AppData.technician };
    },
    
    /**
     * Obtiene órdenes de trabajo filtradas
     * @param {Object} filters - Filtros a aplicar
     */
    getWorkOrders(filters = {}) {
        let orders = [...AppData.workOrders];
        
        // Filtrar por estado
        if (filters.status) {
            orders = orders.filter(order => order.status === filters.status);
        }
        
        // Filtrar por tipo
        if (filters.type) {
            orders = orders.filter(order => order.type === filters.type);
        }
        
        // Filtrar por fecha
        if (filters.date) {
            orders = orders.filter(order => order.schedule.date === filters.date);
        }
        
        // Filtrar por prioridad
        if (filters.priority) {
            orders = orders.filter(order => order.priority === filters.priority);
        }
        
        // Ordenar por hora de inicio
        orders.sort((a, b) => {
            return a.schedule.startTime.localeCompare(b.schedule.startTime);
        });
        
        return orders;
    },
    
    /**
     * Obtiene una orden específica por ID
     */
    getWorkOrderById(orderId) {
        return AppData.workOrders.find(order => order.id === orderId);
    },
    
    /**
     * Obtiene estadísticas por período
     * @param {string} period - 'today', 'week', 'month'
     */
    getStats(period = 'today') {
        return { ...AppData.stats[period] };
    },
    
    /**
     * Actualiza una orden de trabajo
     * @param {string} orderId - ID de la orden
     * @param {Object} updates - Datos a actualizar
     */
    updateWorkOrder(orderId, updates) {
        const orderIndex = AppData.workOrders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
            AppData.workOrders[orderIndex] = {
                ...AppData.workOrders[orderIndex],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            return true;
        }
        return false;
    },
    
    /**
     * Obtiene template de checklist
     * @param {string} type - Tipo de checklist
     */
    getChecklistTemplate(type) {
        return AppData.checklistTemplates[type] || [];
    },
    
    /**
     * Obtiene catálogo
     * @param {string} catalogName - Nombre del catálogo
     */
    getCatalog(catalogName) {
        return AppData.catalogs[catalogName] || [];
    },
    
    /**
     * Obtiene configuración de la app
     */
    getAppConfig() {
        return { ...AppData.appConfig };
    }
};

// Exponer API global
window.AppData = AppData;
window.DataService = DataService;

console.log('✓ Sistema de datos mock cargado');
console.log(`📊 Órdenes disponibles: ${AppData.workOrders.length}`);
console.log(`👤 Técnico: ${AppData.technician.name}`);
