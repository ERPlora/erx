# ERX Components TODO

> Componentes que NO existen en Ionic y deben implementarse en ERX.
>
> **Implementados:** 3 | **Pendientes:** 84 | **Total:** 87

---

## Estado Actual

| Componente | Estado |
|------------|--------|
| `erx-data-grid` | ✅ Completado |
| `erx-split-pane` | ✅ Completado |
| `erx-pin-pad` | ✅ Completado |

---

## Tier 1 - Alta Prioridad (37 componentes)

### 1.1 POS / Retail (11)

Componentes para punto de venta. Ninguno existe en Ionic.

- [ ] `erx-numpad` - Teclado numerico (base, pin-pad es una variante)
- [ ] `erx-product-card` - Card de producto para POS
- [ ] `erx-category-tabs` - Tabs de categorias con scroll horizontal
- [ ] `erx-cart` - Carrito de compras con items, subtotal, impuestos
- [ ] `erx-order-ticket` - Ticket/comanda de orden
- [ ] `erx-payment` - Selector de metodo de pago (efectivo, tarjeta, etc)
- [ ] `erx-receipt` - Vista previa de recibo para imprimir
- [ ] `erx-variant-selector` - Selector de variantes (talla, color)
- [ ] `erx-calculator` - Calculadora completa
- [ ] `erx-stock-indicator` - Indicador nivel de stock
- [ ] `erx-virtual-keyboard` - Teclado en pantalla multi-idioma

### 1.2 HR / Employees (7)

Componentes para recursos humanos. Ninguno existe en Ionic.

- [ ] `erx-employee-card` - Card de informacion de empleado
- [ ] `erx-time-clock` - Reloj de fichaje (check-in/out)
- [ ] `erx-shift-calendar` - Calendario de turnos/horarios
- [ ] `erx-attendance-list` - Lista de asistencia
- [ ] `erx-leave-request` - Card solicitud de vacaciones/permisos
- [ ] `erx-org-chart` - Organigrama jerarquico
- [ ] `erx-performance-meter` - Medidor de rendimiento

### 1.3 Manufacturing (7)

Componentes para fabricacion. Ninguno existe en Ionic.

- [ ] `erx-work-order` - Card de orden de trabajo
- [ ] `erx-machine-status` - Indicador estado de maquina
- [ ] `erx-production-line` - Vista linea de produccion
- [ ] `erx-quality-check` - Formulario control de calidad
- [ ] `erx-batch-tracker` - Trazabilidad de lotes
- [ ] `erx-bom-tree` - Arbol Bill of Materials
- [ ] `erx-gantt` - Diagrama de Gantt

### 1.4 Data Display (6)

- [ ] `erx-calendar` - Calendario vista mes
- [ ] `erx-calendar-views` - Vistas semana/dia
- [ ] `erx-scheduler` - Componente de reservas/booking
- [ ] `erx-stats` - Cards de KPI/metricas
- [ ] `erx-chart` - Wrapper para Chart.js con tema ERX
- [ ] `erx-progress-steps` - Indicador de pasos (stepper)

### 1.5 Forms - Advanced (6)

- [ ] `erx-autocomplete` - Combobox con busqueda y sugerencias
- [ ] `erx-tag-input` - Input multi-select con chips/tags
- [ ] `erx-currency-input` - Input con formato de moneda
- [ ] `erx-signature-pad` - Captura de firma digital
- [ ] `erx-date-range-picker` - Selector de rango de fechas
- [ ] `erx-form-wizard` - Formulario multi-paso

---

## Tier 2 - Media Prioridad (32 componentes)

### 2.1 Layout & Containers (8)

- [ ] `erx-virtual-list` - Lista virtualizada para grandes datasets
- [ ] `erx-tree` - Vista arbol jerarquico
- [ ] `erx-dashboard-grid` - Grid de widgets arrastrables
- [ ] `erx-kanban` - Tablero Kanban
- [ ] `erx-master-detail` - Layout dos paneles
- [ ] `erx-section` - Seccion con header colapsable
- [ ] `erx-panel` - Panel colapsable
- [ ] `erx-timeline` - Linea de tiempo

### 2.2 Navigation (4)

- [ ] `erx-pagination` - Paginacion numerica
- [ ] `erx-dropdown` - Menu dropdown (diferente a ion-popover)
- [ ] `erx-context-menu` - Menu click derecho
- [ ] `erx-command` - Command palette (Cmd+K)

### 2.3 Overlays (4)

- [ ] `erx-sheet` - Bottom/side sheet
- [ ] `erx-drawer` - Drawer lateral
- [ ] `erx-lightbox` - Visor de imagenes fullscreen
- [ ] `erx-notifications` - Centro de notificaciones

### 2.4 Data Display (6)

- [ ] `erx-progress-circle` - Progreso circular
- [ ] `erx-gauge` - Medidor tipo gauge
- [ ] `erx-sparkline` - Mini graficos inline
- [ ] `erx-event-card` - Card de evento para calendario
- [ ] `erx-table` - Tabla CSS basica (sin JS)
- [ ] `erx-json-viewer` - Visor JSON en arbol

### 2.5 Multimedia (6)

- [ ] `erx-qr-code` - Generador de codigos QR
- [ ] `erx-barcode-scanner` - Scanner de codigos de barras
- [ ] `erx-image-gallery` - Galeria de imagenes
- [ ] `erx-image-crop` - Recortador de imagenes
- [ ] `erx-carousel` - Carrusel/slider
- [ ] `erx-pdf-viewer` - Visor de PDF

### 2.6 Forms (4)

- [ ] `erx-color-picker` - Selector de color
- [ ] `erx-phone-input` - Input telefono con codigo pais
- [ ] `erx-rich-text` - Editor WYSIWYG
- [ ] `erx-upload` - Upload con drag-drop (diferente a nativo)

---

## Tier 3 - Baja Prioridad (15 componentes)

### 3.1 Layout (3)

- [ ] `erx-masonry` - Grid masonry
- [ ] `erx-shell` - App shell layout
- [ ] `erx-divider` - Linea divisora con texto

### 3.2 Navigation (2)

- [ ] `erx-mega-menu` - Mega menu navegacion
- [ ] `erx-load-more` - Boton cargar mas

### 3.3 Overlays (2)

- [ ] `erx-fullscreen-modal` - Modal pantalla completa
- [ ] `erx-snackbar` - Snackbar con accion

### 3.4 Data Display (4)

- [ ] `erx-diff-viewer` - Visor de diferencias
- [ ] `erx-code-block` - Bloque codigo con syntax
- [ ] `erx-image-zoom` - Zoom con lente

### 3.5 Feedback (2)

- [ ] `erx-state` - Estados vacio/error/success
- [ ] `erx-banner` - Banner dismissable
- [ ] `erx-callout` - Callout informativo

### 3.6 Buttons (2)

- [ ] `erx-button-group` - Grupo de botones unidos
- [ ] `erx-split-button` - Boton con dropdown
- [ ] `erx-status-indicator` - Indicador estado (online/offline)

### 3.7 Multimedia (2)

- [ ] `erx-video-player` - Reproductor video
- [ ] `erx-audio-player` - Reproductor audio

---

## Roadmap Sugerido

### Fase 1 - Core ERP (Q1)
1. POS completo (11 componentes)
2. Calendar + Scheduler (3 componentes)
3. Forms avanzados (6 componentes)

### Fase 2 - HR & Manufacturing (Q2)
1. HR completo (7 componentes)
2. Manufacturing completo (7 componentes)
3. Gantt + Timeline (2 componentes)

### Fase 3 - Data & Layout (Q3)
1. Dashboard grid + Kanban (2 componentes)
2. Virtual list + Tree (2 componentes)
3. Charts + Stats (3 componentes)

### Fase 4 - Polish (Q4)
1. Multimedia (6 componentes)
2. Navigation avanzada (4 componentes)
3. Componentes restantes

---

## Notas

### Componentes de Ionic que usamos directamente:
- `ion-button`, `ion-input`, `ion-textarea`, `ion-checkbox`, `ion-radio`, `ion-toggle`
- `ion-select`, `ion-range`, `ion-searchbar`, `ion-datetime`, `ion-input-otp`
- `ion-card`, `ion-list`, `ion-item`, `ion-accordion`, `ion-tabs`, `ion-segment`
- `ion-modal`, `ion-alert`, `ion-popover`, `ion-toast`, `ion-loading`, `ion-picker`
- `ion-avatar`, `ion-badge`, `ion-chip`, `ion-fab`, `ion-spinner`, `ion-skeleton-text`
- `ion-breadcrumbs`, `ion-menu`, `ion-nav`, `ion-refresher`, `ion-reorder`
- `ion-infinite-scroll`, `ion-progress-bar`, `ion-split-pane`

### Criterios de prioridad:
- **Alta**: Necesario para funcionalidad core de ERP/POS
- **Media**: Mejora UX significativamente, uso frecuente
- **Baja**: Nice-to-have, casos de uso especificos

---

*Ultima actualizacion: 2026-01-18*
