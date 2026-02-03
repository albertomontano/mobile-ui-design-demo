/* ============================================
   CALIBEB APP - COMPONENTES REUTILIZABLES
   Funciones helper para renderizado dinámico
   ============================================ */

/**
 * COMPONENTES - Sistema de generación dinámica de UI
 */
const Components = {
    
    /**
     * Genera un header de pantalla con botón de retroceso
     * @param {string} title - Título del header
     * @param {string} backScreen - ID de la pantalla a la que retroceder
     * @param {Object} options - Opciones adicionales
     * @returns {string} HTML del componente
     */
    header(title, backScreen = 'dashboard', options = {}) {
        const { className = '', icon = 'fa-arrow-left' } = options;
        
        return `
            <div class="screen-header ${className}">
                <button onclick="goTo('${backScreen}')" class="back-button" aria-label="Volver a ${backScreen}">
                    <i class="fas ${icon}"></i>
                </button>
                <h2 class="font-bold text-slate-800 text-lg">${title}</h2>
            </div>
        `;
    },
    
    /**
     * Genera una barra de progreso
     * @param {number} percentage - Porcentaje de progreso (0-100)
     * @param {number} currentStep - Paso actual
     * @param {number} totalSteps - Total de pasos
     * @returns {string} HTML del componente
     */
    progressBar(percentage, currentStep, totalSteps) {
        return `
            <div class="bg-white pt-12 pb-4 px-6 shadow-sm border-b border-slate-100 z-10">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-1 rounded">
                        Paso ${currentStep} de ${totalSteps}
                    </span>
                    <span class="text-xs font-bold text-slate-400">${percentage}% completado</span>
                </div>
                <h2 class="text-xl font-bold text-slate-800 mt-3" id="step-title"></h2>
                <div class="progress-bar mt-4">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    },
    
    /**
     * Genera un item de checklist
     * @param {string} id - ID único del checkbox
     * @param {string} label - Etiqueta del item
     * @param {boolean} checked - Estado inicial
     * @returns {string} HTML del componente
     */
    checklistItem(id, label, checked = false) {
        return `
            <label class="checkbox-item">
                <input type="checkbox" 
                       id="${id}" 
                       ${checked ? 'checked' : ''}
                       class="mt-0.5 w-5 h-5 text-orange-500 rounded border-slate-300 focus:ring-orange-500 cursor-pointer">
                <span class="text-sm font-medium text-slate-700 leading-tight">${label}</span>
            </label>
        `;
    },
    
    /**
     * Genera un grupo de radio buttons
     * @param {string} name - Nombre del grupo
     * @param {Array} options - Array de opciones {value, label}
     * @param {string} question - Pregunta/título del grupo
     * @returns {string} HTML del componente
     */
    radioGroup(name, options, question) {
        const radios = options.map((opt, index) => `
            <input type="radio" id="${name}-${opt.value}" name="${name}" ${index === 0 ? 'checked' : ''}>
            <label for="${name}-${opt.value}" class="flex-1 text-center text-sm">${opt.label}</label>
        `).join('');
        
        return `
            <div class="card">
                <p class="text-sm font-medium text-slate-700 mb-3">${question}</p>
                <div class="radio-group">
                    ${radios}
                </div>
            </div>
        `;
    },
    
    /**
     * Genera un placeholder para foto
     * @param {string} label - Etiqueta del botón
     * @param {string} id - ID único
     * @returns {string} HTML del componente
     */
    photoPlaceholder(label = 'AGREGAR FOTO', id = '') {
        return `
            <div class="photo-placeholder" ${id ? `id="${id}"` : ''} 
                 role="button" 
                 aria-label="${label}"
                 tabindex="0">
                <i class="fas fa-camera text-2xl mb-2"></i>
                <span class="text-[10px] font-bold">${label}</span>
            </div>
        `;
    },
    
    /**
     * Genera un textarea para notas
     * @param {string} id - ID del textarea
     * @param {string} placeholder - Texto placeholder
     * @returns {string} HTML del componente
     */
    notesTextarea(id = 'notes', placeholder = 'Observaciones sobre este paso...') {
        return `
            <div>
                <h3 class="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">
                    Notas del Técnico
                </h3>
                <textarea 
                    id="${id}"
                    class="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 h-24 
                           focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 
                           resize-none shadow-sm" 
                    placeholder="${placeholder}"
                    aria-label="Notas del técnico">
                </textarea>
            </div>
        `;
    },
    
    /**
     * Genera un footer de acciones con botones
     * @param {Array} buttons - Array de botones {label, action, type, icon}
     * @returns {string} HTML del componente
     */
    actionFooter(buttons) {
        const buttonsHtml = buttons.map(btn => {
            const btnClass = btn.type === 'primary' ? 'btn-primary' : 'btn-secondary';
            const flex = btn.flex || 1;
            const icon = btn.icon ? `<i class="fas ${btn.icon} text-xs"></i>` : '';
            
            return `
                <button 
                    onclick="${btn.action}" 
                    class="${btnClass} py-3.5 rounded-xl font-bold shadow-lg transition 
                           transform active:scale-[0.99] flex items-center justify-center gap-2"
                    style="flex: ${flex}">
                    ${btn.label} ${icon}
                </button>
            `;
        }).join('');
        
        return `
            <div class="action-footer">
                ${buttonsHtml}
            </div>
        `;
    },
    
    /**
     * Genera una tarjeta de estadística
     * @param {string} label - Etiqueta de la estadística
     * @param {string|number} value - Valor a mostrar
     * @param {string} icon - Clase del icono
     * @param {string} color - Color del tema
     * @returns {string} HTML del componente
     */
    statCard(label, value, icon, color = 'green') {
        return `
            <div class="stat-card">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-slate-500 text-xs font-semibold">${label}</span>
                    <span class="bg-${color}-50 text-${color}-600 p-1.5 rounded-md text-xs">
                        <i class="fas ${icon}"></i>
                    </span>
                </div>
                <p class="stat-value">${value}</p>
            </div>
        `;
    },
    
    /**
     * Genera una tarjeta de orden de trabajo
     * @param {Object} order - Datos de la orden
     * @returns {string} HTML del componente
     */
    workOrderCard(order) {
        const statusColors = {
            pending: { bg: 'orange-50', text: 'orange-600', border: 'orange-500' },
            completed: { bg: 'green-100', text: 'green-700', border: 'green-500' }
        };
        
        const colors = statusColors[order.status] || statusColors.pending;
        const opacity = order.status === 'completed' ? 'opacity-75' : '';
        const strikethrough = order.status === 'completed' ? 'line-through' : '';
        
        return `
            <div class="card card-interactive border-l-4 border-l-${colors.border} ${opacity}"
                 onclick="${order.onClick || ''}">
                <div class="flex justify-between mb-1">
                    <span class="text-xs font-bold text-slate-400">${order.id}</span>
                    <span class="text-xs font-bold text-${colors.text} bg-${colors.bg} px-2 py-0.5 rounded uppercase">
                        ${order.statusLabel}
                    </span>
                </div>
                <h4 class="text-slate-800 font-bold text-base ${strikethrough}">${order.client}</h4>
                <p class="text-sm text-slate-500 mb-2 text-truncate">${order.description}</p>
                <div class="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <i class="${order.timeIcon || 'far fa-clock'} text-${colors.border}"></i>
                    ${order.time}
                </div>
            </div>
        `;
    },
    
    /**
     * Genera un item de navegación inferior
     * @param {string} icon - Clase del icono
     * @param {string} label - Etiqueta del item
     * @param {string} screen - Pantalla destino
     * @param {boolean} active - Si está activo
     * @param {Object} options - Opciones adicionales
     * @returns {string} HTML del componente
     */
    navItem(icon, label, screen, active = false, options = {}) {
        const activeClass = active ? 'active' : '';
        const { badge = null } = options;
        
        const badgeHtml = badge ? `
            <span class="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
        ` : '';
        
        return `
            <button onclick="goTo('${screen}')" 
                    class="nav-item ${activeClass}"
                    aria-label="Navegar a ${label}">
                <i class="${icon} nav-item-icon relative">
                    ${badgeHtml}
                </i>
                <span class="nav-item-label">${label}</span>
            </button>
        `;
    },
    
    /**
     * Genera un campo de input con icono
     * @param {Object} config - Configuración del input
     * @returns {string} HTML del componente
     */
    inputField(config) {
        const {
            id = '',
            type = 'text',
            label = '',
            icon = 'fa-circle',
            placeholder = '',
            value = '',
            required = false
        } = config;
        
        return `
            <div>
                ${label ? `<label class="block text-xs font-bold text-slate-400 uppercase mb-1">${label}</label>` : ''}
                <div class="input-container">
                    ${icon ? `<span class="pl-3 text-slate-400"><i class="fas ${icon}"></i></span>` : ''}
                    <input 
                        type="${type}" 
                        ${id ? `id="${id}"` : ''}
                        value="${value}"
                        placeholder="${placeholder}"
                        ${required ? 'required' : ''}
                        class="input-field">
                </div>
            </div>
        `;
    }
};

/**
 * UTILIDADES DE RENDERIZADO
 */
const RenderUtils = {
    /**
     * Renderiza un componente en un contenedor
     * @param {string} containerId - ID del contenedor
     * @param {string} html - HTML a renderizar
     */
    render(containerId, html) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        } else {
            console.error(`Contenedor ${containerId} no encontrado`);
        }
    },
    
    /**
     * Añade HTML al final de un contenedor
     * @param {string} containerId - ID del contenedor
     * @param {string} html - HTML a añadir
     */
    append(containerId, html) {
        const container = document.getElementById(containerId);
        if (container) {
            container.insertAdjacentHTML('beforeend', html);
        }
    },
    
    /**
     * Limpia el contenido de un contenedor
     * @param {string} containerId - ID del contenedor
     */
    clear(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
        }
    }
};

/**
 * TEMPLATES DE SECCIONES COMPLETAS
 */
const Templates = {
    /**
     * Genera una sección completa de evidencia fotográfica
     * @param {number} photoCount - Número de placeholders de fotos
     * @returns {string} HTML de la sección
     */
    photoEvidenceSection(photoCount = 2) {
        const photos = Array(photoCount)
            .fill(0)
            .map((_, i) => Components.photoPlaceholder('AGREGAR FOTO', `photo-${i + 1}`))
            .join('');
        
        return `
            <div>
                <h3 class="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">
                    Evidencia Fotográfica
                </h3>
                <div class="grid grid-cols-2 gap-4 mb-8">
                    ${photos}
                </div>
            </div>
        `;
    },
    
    /**
     * Genera una sección de checklist completa
     * @param {string} title - Título de la sección
     * @param {Array} items - Array de items {id, label, checked}
     * @returns {string} HTML de la sección
     */
    checklistSection(title, items) {
        const checklistItems = items
            .map(item => Components.checklistItem(item.id, item.label, item.checked))
            .join('');
        
        return `
            <div class="mb-8 space-y-3">
                <h3 class="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">
                    ${title}
                </h3>
                ${checklistItems}
            </div>
        `;
    }
};

// Exponer API global
window.Components = Components;
window.RenderUtils = RenderUtils;
window.Templates = Templates;

console.log('✓ Sistema de componentes cargado');
