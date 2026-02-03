/* ============================================
   CALIBEB APP - APLICACIÓN PRINCIPAL
   Sistema de navegación y gestión de estado
   ============================================ */

// ===== CONTROLADOR DE NAVEGACIÓN =====
const NavigationController = {
    currentScreen: 'login',
    history: [],
    
    /**
     * Navega a una pantalla específica
     * @param {string} screenId - ID de la pantalla destino
     */
    goTo(screenId) {
        const screens = document.querySelectorAll('.screen');
        const targetScreen = document.getElementById(screenId);
        
        if (!targetScreen) {
            console.error(`Pantalla "${screenId}" no encontrada`);
            return;
        }
        
        // Guardar en historial
        if (this.currentScreen !== screenId) {
            this.history.push(this.currentScreen);
        }
        
        // Ocultar todas las pantallas
        screens.forEach(screen => screen.classList.remove('active'));
        
        // Mostrar pantalla objetivo con animación
        targetScreen.classList.add('active', 'animate-fade-in');
        
        // Actualizar estado
        this.currentScreen = screenId;
        
        // Callbacks específicos por pantalla
        this.onScreenChange(screenId);
        
        console.log(`✓ Navegado a: ${screenId}`);
    },
    
    /**
     * Volver a la pantalla anterior
     */
    goBack() {
        if (this.history.length > 0) {
            const previousScreen = this.history.pop();
            this.goTo(previousScreen);
        } else {
            console.warn('No hay pantalla anterior en el historial');
        }
    },
    
    /**
     * Callback ejecutado al cambiar de pantalla
     * @param {string} screenId - ID de la nueva pantalla
     */
    onScreenChange(screenId) {
        // Reset del dashboard si salimos de él
        if (screenId !== 'dashboard') {
            const timeRange = document.getElementById('timeRange');
            if (timeRange) {
                timeRange.value = 'today';
                DashboardManager.updateStats('today');
            }
        }
        
        // Scroll al inicio de la nueva pantalla
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.scrollTop = 0;
        }
    }
};

// ===== GESTOR DEL DASHBOARD =====
const DashboardManager = {
    
    /**
     * Actualiza las estadísticas del dashboard
     * @param {string} range - Rango temporal ('today' o 'week')
     */
    updateStats(range) {
        const completedEl = document.getElementById('stat-completed');
        const pendingEl = document.getElementById('stat-pending');
        const titleEl = document.getElementById('agenda-title');
        
        if (!completedEl || !pendingEl) {
            console.warn('Elementos de estadísticas no encontrados');
            return;
        }
        
        // Obtener datos desde DataService si está disponible
        let data;
        if (window.DataService) {
            data = window.DataService.getStats(range);
        } else {
            // Fallback si DataService no está cargado
            const fallbackStats = {
                today: { completed: 1, pending: 3 },
                week: { completed: 14, pending: 8 }
            };
            data = fallbackStats[range] || fallbackStats.today;
        }
        
        // Animación de cambio
        this.animateNumbers(completedEl);
        this.animateNumbers(pendingEl);
        
        // Actualizar valores según el rango
        setTimeout(() => {
            completedEl.textContent = data.completed;
            pendingEl.textContent = data.pending;
            
            // Actualizar título de la agenda
            if (titleEl) {
                titleEl.textContent = range === 'today' ? 'Agenda de Hoy' : 'Agenda de la Semana';
            }
        }, 100);
        
        console.log(`✓ Stats actualizados para: ${range}`, data);
    },
    
    /**
     * Anima el cambio de números
     * @param {HTMLElement} element - Elemento a animar
     */
    animateNumbers(element) {
        element.classList.remove('animate-pulse-once');
        // Forzar reflow para reiniciar la animación
        void element.offsetWidth;
        element.classList.add('animate-pulse-once');
    }
};

// ===== GESTOR DE FORMULARIOS =====
const FormManager = {
    /**
     * Valida un formulario de pantalla
     * @param {string} formId - ID del formulario
     * @returns {boolean} - True si es válido
     */
    validate(formId) {
        const form = document.getElementById(formId);
        if (!form) return false;
        
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('border-red-500', 'ring-red-500');
                input.classList.remove('border-slate-200');
                isValid = false;
            } else {
                input.classList.remove('border-red-500', 'ring-red-500');
                input.classList.add('border-slate-200');
            }
        });
        
        // Validar emails
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (input.value && !this.isValidEmail(input.value)) {
                input.classList.add('border-red-500', 'ring-red-500');
                isValid = false;
            }
        });
        
        // Validar textareas con longitud mínima
        const textareas = form.querySelectorAll('textarea[data-min-length]');
        textareas.forEach(textarea => {
            const minLength = parseInt(textarea.getAttribute('data-min-length')) || 0;
            if (textarea.value.length < minLength) {
                textarea.classList.add('border-red-500', 'ring-red-500');
                isValid = false;
            }
        });
        
        if (!isValid) {
            console.warn('❌ Validación fallida');
        } else {
            console.log('✓ Formulario válido');
        }
        
        return isValid;
    },
    
    /**
     * Valida formato de email
     * @param {string} email - Email a validar
     * @returns {boolean}
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    /**
     * Obtiene los datos de un formulario
     * @param {string} formId - ID del formulario
     * @returns {Object} - Datos del formulario
     */
    getData(formId) {
        const form = document.getElementById(formId);
        if (!form) return {};
        
        const formData = new FormData(form);
        return Object.fromEntries(formData.entries());
    },
    
    /**
     * Limpia un formulario
     * @param {string} formId - ID del formulario
     */
    reset(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
            console.log(`✓ Formulario ${formId} reseteado`);
        }
    }
};

// ===== GESTOR DE CHECKLIST =====
const ChecklistManager = {
    
    /**
     * Inicializa los checkboxes con persistencia
     * @param {string} screenId - ID de la pantalla
     */
    init(screenId) {
        const screen = document.getElementById(screenId);
        if (!screen) return;
        
        const checkboxes = screen.querySelectorAll('input[type="checkbox"]');
        
        // Cargar estado guardado
        const savedState = this.loadState(screenId);
        
        checkboxes.forEach((checkbox, index) => {
            // Restaurar estado
            if (savedState && savedState[index] !== undefined) {
                checkbox.checked = savedState[index];
            }
            
            // Agregar listener para guardar
            checkbox.addEventListener('change', () => {
                this.saveState(screenId);
            });
        });
        
        console.log(`✓ Checklist ${screenId} inicializado con persistencia`);
    },
    
    /**
     * Guarda el estado de checkboxes en localStorage
     * @param {string} screenId - ID de la pantalla
     */
    saveState(screenId) {
        const screen = document.getElementById(screenId);
        if (!screen) return;
        
        const checkboxes = screen.querySelectorAll('input[type="checkbox"]');
        const state = Array.from(checkboxes).map(cb => cb.checked);
        
        localStorage.setItem(`calibeb_checklist_${screenId}`, JSON.stringify(state));
    },
    
    /**
     * Carga el estado guardado de checkboxes
     * @param {string} screenId - ID de la pantalla
     * @returns {Array} - Estado de los checkboxes
     */
    loadState(screenId) {
        const saved = localStorage.getItem(`calibeb_checklist_${screenId}`);
        return saved ? JSON.parse(saved) : null;
    },
    
    /**
     * Obtiene el estado de un checklist
     * @param {string} containerId - ID del contenedor del checklist
     * @returns {Object} - Estado del checklist
     */
    getProgress(containerId) {
        const container = document.getElementById(containerId) || document;
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
        
        return {
            total,
            checked,
            remaining: total - checked,
            percentage,
            isComplete: checked === total
        };
    },
    
    /**
     * Actualiza la barra de progreso
     * @param {string} progressBarId - ID de la barra de progreso
     * @param {number} percentage - Porcentaje de progreso
     */
    updateProgressBar(progressBarId, percentage) {
        const progressBar = document.getElementById(progressBarId);
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    }
};

// ===== GESTOR DE FIRMA DIGITAL =====
const SignatureManager = {
    canvas: null,
    ctx: null,
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    
    /**
     * Inicializa el canvas de firma
     * @param {string} canvasId - ID del canvas
     */
    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.warn(`Canvas ${canvasId} no encontrado`);
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.bindEvents();
        
        console.log('✓ Firma digital inicializada');
    },
    
    /**
     * Configura el canvas
     */
    setupCanvas() {
        // No redimensionar - usar dimensiones del HTML (600x300)
        // Configurar estilo de dibujo
        this.ctx.strokeStyle = '#0F172A';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    },
    
    /**
     * Vincula eventos de dibujo
     */
    bindEvents() {
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.startDrawing(touch.clientX, touch.clientY);
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.draw(touch.clientX, touch.clientY);
        });
        
        this.canvas.addEventListener('touchend', () => {
            this.stopDrawing();
        });
        
        // Mouse events (para testing en desktop)
        this.canvas.addEventListener('mousedown', (e) => {
            this.startDrawing(e.clientX, e.clientY);
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.draw(e.clientX, e.clientY);
        });
        
        this.canvas.addEventListener('mouseup', () => {
            this.stopDrawing();
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.stopDrawing();
        });
    },
    
    /**
     * Inicia el dibujo
     */
    startDrawing(x, y) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        this.lastX = x - rect.left;
        this.lastY = y - rect.top;
    },
    
    /**
     * Dibuja en el canvas
     */
    draw(x, y) {
        if (!this.isDrawing) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const currentX = x - rect.left;
        const currentY = y - rect.top;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(currentX, currentY);
        this.ctx.stroke();
        
        this.lastX = currentX;
        this.lastY = currentY;
    },
    
    /**
     * Detiene el dibujo
     */
    stopDrawing() {
        this.isDrawing = false;
    },
    
    /**
     * Limpia el canvas
     */
    clear() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            console.log('✓ Firma borrada');
        }
    },
    
    /**
     * Obtiene la firma como imagen
     * @returns {string} - Data URL de la imagen
     */
    toDataURL() {
        return this.canvas ? this.canvas.toDataURL('image/png') : null;
    },
    
    /**
     * Verifica si hay una firma
     * @returns {boolean}
     */
    hasSignature() {
        if (!this.canvas) return false;
        
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        return imageData.data.some(channel => channel !== 0);
    }
};

// ===== GESTOR DE FOTOGRAFÍAS =====
const PhotoManager = {
    storageKey: 'calibeb_photos',
    
    /**
     * Simula la captura de una foto
     * @param {string} photoType - Tipo de foto ('before', 'after', 'detail', 'signature')
     * @returns {Object} - Datos de la foto simulada
     */
    capturePhoto(photoType) {
        const timestamp = Date.now();
        const photo = {
            id: `photo_${timestamp}`,
            type: photoType,
            dataURL: this.generateMockPhoto(photoType),
            timestamp: timestamp,
            date: new Date().toISOString()
        };
        
        this.savePhoto(photo);
        console.log(`✓ Foto capturada: ${photoType}`);
        return photo;
    },
    
    /**
     * Genera una imagen mock con Canvas
     * @param {string} type - Tipo de foto
     * @returns {string} - Data URL de la imagen
     */
    generateMockPhoto(type) {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        // Fondo gradiente
        const gradient = ctx.createLinearGradient(0, 0, 400, 300);
        gradient.addColorStop(0, '#F97316');
        gradient.addColorStop(1, '#EA580C');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 300);
        
        // Texto
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`FOTO ${type.toUpperCase()}`, 200, 140);
        
        ctx.font = '16px Inter, sans-serif';
        ctx.fillText(new Date().toLocaleString('es-MX'), 200, 170);
        
        return canvas.toDataURL('image/png');
    },
    
    /**
     * Guarda una foto en localStorage
     * @param {Object} photo - Objeto de foto
     */
    savePhoto(photo) {
        const photos = this.getAllPhotos();
        photos.push(photo);
        localStorage.setItem(this.storageKey, JSON.stringify(photos));
    },
    
    /**
     * Obtiene todas las fotos guardadas
     * @returns {Array} - Array de fotos
     */
    getAllPhotos() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : [];
    },
    
    /**
     * Elimina una foto
     * @param {string} photoId - ID de la foto
     */
    deletePhoto(photoId) {
        const photos = this.getAllPhotos();
        const filtered = photos.filter(p => p.id !== photoId);
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        console.log(`✓ Foto eliminada: ${photoId}`);
    },
    
    /**
     * Limpia todas las fotos
     */
    clearAll() {
        localStorage.removeItem(this.storageKey);
        console.log('✓ Todas las fotos eliminadas');
    }
};

// ===== GESTOR DE NOTIFICACIONES =====
const NotificationManager = {
    /**
     * Muestra una notificación toast
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
     */
    show(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        // TODO: Implementar UI de notificaciones toast
    }
};

// ===== INICIALIZACIÓN DE LA APLICACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Calibeb App inicializada');
    
    // Inicializar estadísticas del dashboard
    DashboardManager.updateStats('today');
    
    // Inicializar checklists con persistencia
    initializeChecklists();
    
    // Inicializar botones de captura de fotos
    initializePhotoButtons();
    
    // Configurar manejadores de eventos
    setupEventListeners();
    
    // Inicializar firma digital si estamos en la pantalla de firma
    initializeSignaturePad();
    
    console.log('✓ Event listeners configurados');
});

/**
 * Inicializa los checklists con persistencia en localStorage
 */
function initializeChecklists() {
    // Pantallas con checklists - ACTUALIZADO con todos los pasos
    const checklistScreens = ['checkin', 'step1', 'step2', 'step4', 'step5', 'step6'];
    
    checklistScreens.forEach(screenId => {
        ChecklistManager.init(screenId);
    });
    
    console.log('✓ Checklists inicializados con persistencia (10 pasos)');
}

/**
 * Inicializa los botones de captura de fotos
 */
function initializePhotoButtons() {
    // Definir mapeo de pantallas y sus tipos de foto
    const photoMap = {
        'step1': ['exterior'],
        'step2': ['valvulas'],
        'corrective': ['antes', 'durante', 'despues']
    };
    
    // Buscar todos los placeholders de foto y agregarles el atributo
    Object.keys(photoMap).forEach(screenId => {
        const screen = document.getElementById(screenId);
        if (!screen) return;
        
        const photoPlaceholders = screen.querySelectorAll('.fa-camera');
        photoPlaceholders.forEach((icon, index) => {
            const container = icon.closest('div[class*="aspect-square"]');
            if (container && !container.hasAttribute('data-photo-type')) {
                const photoType = photoMap[screenId][index] || 'generic';
                container.setAttribute('data-photo-type', photoType);
                container.classList.add('relative', 'overflow-hidden');
            }
        });
    });
    
    // Ahora agregar event listeners a todos los elementos con data-photo-type
    const photoButtons = document.querySelectorAll('[data-photo-type]');
    
    photoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const photoType = this.getAttribute('data-photo-type');
            handlePhotoCapture(photoType, this);
        });
    });
    
    console.log(`✓ ${photoButtons.length} botones de foto inicializados`);
}

/**
 * Maneja la captura de una foto
 * @param {string} photoType - Tipo de foto
 * @param {HTMLElement} buttonElement - Elemento del botón
 */
function handlePhotoCapture(photoType, buttonElement) {
    const photo = PhotoManager.capturePhoto(photoType);
    
    // Actualizar UI del botón con la foto capturada
    if (photo && photo.dataURL) {
        buttonElement.style.backgroundImage = `url(${photo.dataURL})`;
        buttonElement.style.backgroundSize = 'cover';
        buttonElement.style.backgroundPosition = 'center';
        buttonElement.innerHTML = '<div class="absolute inset-0 bg-black/40 flex items-center justify-center"><i class="fas fa-check-circle text-white text-2xl"></i></div>';
        
        NotificationManager.show('Foto capturada exitosamente', 'success');
    }
}

/**
 * Inicializa el pad de firma digital
 */
function initializeSignaturePad() {
    const canvas = document.getElementById('signature-canvas');
    const clearBtn = document.getElementById('clear-signature-btn');
    
    if (canvas) {
        SignatureManager.init('signature-canvas');
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            SignatureManager.clear();
        });
    }
}

/**
 * Configura los event listeners globales
 */
function setupEventListeners() {
    // Manejador para el selector de rango del dashboard
    const timeRangeSelect = document.getElementById('timeRange');
    if (timeRangeSelect) {
        timeRangeSelect.addEventListener('change', (e) => {
            DashboardManager.updateStats(e.target.value);
        });
    }
    
    // Manejadores para checkboxes (tracking de progreso)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Puedes agregar lógica de tracking aquí
            console.log('Checkbox cambiado');
        });
    });
}

// ===== EXPONER API GLOBAL PARA COMPATIBILIDAD =====
// Estas funciones están disponibles globalmente para onclick en el HTML
window.goTo = (screenId) => NavigationController.goTo(screenId);
window.goBack = () => NavigationController.goBack();
window.updateDashboardStats = (range) => DashboardManager.updateStats(range);

// Exportar módulos para uso en otros scripts
window.CalibekApp = {
    Navigation: NavigationController,
    Dashboard: DashboardManager,
    Form: FormManager,
    Checklist: ChecklistManager,
    Signature: SignatureManager,
    Photo: PhotoManager,
    Notification: NotificationManager
};

console.log('✓ API global de Calibek App expuesta');
