# Guía de Migración a Estilos Ionic

Esta guía explica cómo los componentes ERX heredan los estilos de Ionic Framework.

---

## 📋 Resumen

ERX ahora utiliza el sistema de diseño de Ionic Framework, lo que significa que:

✅ Los componentes se ven y comportan como Ionic
✅ Soporta modo iOS (rounded, soft shadows) y MD (Material Design)
✅ Usa variables CSS de Ionic (`--ion-color-*`, `--ion-padding`, etc.)
✅ Se integra perfectamente con apps Ionic existentes
✅ Dark mode automático siguiendo el tema de Ionic

---

## 🎨 Clases CSS Automáticas

Los componentes ERX ahora heredan estilos basados en sus nombres de clase:

### Botones

Cualquier elemento `<button>` con clase que contenga `erx-` y `btn` o `button` hereda estilos de Ionic:

```css
/* Automáticamente aplicados: */
.erx-cart__checkout-btn      ✅ Se ve como ion-button
.erx-product__add-button      ✅ Se ve como ion-button
.erx-form__submit-btn         ✅ Se ve como ion-button
```

**iOS vs MD:**
- **iOS**: Botones redondeados (10px), sin sombra, altura 44px
- **MD**: Botones con esquinas suaves (4px), con elevation shadow, altura 36px, texto en UPPERCASE

### Cards/Containers

Elementos con clase que contenga `erx-` y `card` o `__container`:

```css
.erx-cart                     ✅ Se ve como ion-card
.erx-product-card             ✅ Se ve como ion-card
.erx-dashboard__container     ✅ Se ve como ion-card
```

**iOS vs MD:**
- **iOS**: Border-radius 12px, sombra suave, margen 10px
- **MD**: Border-radius 4px, elevation shadow, margen 8px

### Items de Lista

Elementos con clase que contenga `erx-` y `item` o `__item`:

```css
.erx-cart__item               ✅ Se ve como ion-item
.erx-list__item               ✅ Se ve como ion-item
.erx-menu-item                ✅ Se ve como ion-item
```

**iOS vs MD:**
- **iOS**: Sin borde en último elemento, hover suave
- **MD**: Efecto ripple en click, bordes en todos

### Inputs

Todos los `<input>`, `<textarea>`, `<select>` con clase `erx-`:

```css
input[class*="erx-"]          ✅ Se ve como ion-input
textarea[class*="erx-"]       ✅ Se ve como ion-textarea
select[class*="erx-"]         ✅ Se ve como ion-select
```

**iOS vs MD:**
- **iOS**: Border redondeado completo, padding uniforme
- **MD**: Solo underline, sin border superior/lateral

### Badges

Elementos con clase que contenga `erx-` y `badge`:

```css
.erx-product__badge           ✅ Se ve como ion-badge
.erx-quantity-badge           ✅ Se ve como ion-badge
```

**iOS vs MD:**
- **iOS**: Muy redondeado (12px), padding generoso
- **MD**: Menos redondeado (4px), más compacto, font bold

### Headers/Toolbars

Elementos con clase que contenga `erx-` y `header` o `toolbar`:

```css
.erx-cart__header             ✅ Se ve como ion-toolbar
.erx-dashboard__toolbar       ✅ Se ve como ion-toolbar
```

**iOS vs MD:**
- **iOS**: Altura 44px, borde delgado (0.55px)
- **MD**: Altura 56px, elevation shadow en lugar de borde

---

## 🔄 Detección de Modo (iOS vs MD)

El modo se detecta automáticamente por la clase en `<html>` o `:host-context`:

```html
<!-- iOS Mode -->
<html class="ios">
  <erx-cart></erx-cart>  <!-- Se renderiza con estilos iOS -->
</html>

<!-- Material Design Mode -->
<html class="md">
  <erx-cart></erx-cart>  <!-- Se renderiza con estilos MD -->
</html>
```

### En Componentes Web (Shadow DOM)

Los estilos usan `:host-context()` para detectar el modo:

```css
/* Automáticamente aplicado según el contexto */
:host-context(.ios) .erx-button {
  border-radius: 10px;
  height: 44px;
}

:host-context(.md) .erx-button {
  border-radius: 4px;
  height: 36px;
  text-transform: uppercase;
}
```

---

## 🎨 Variables CSS Disponibles

Los componentes ahora usan variables de Ionic:

### Colores

```css
var(--ion-color-primary)              /* Color principal */
var(--ion-color-primary-shade)        /* Hover/active */
var(--ion-color-primary-tint)         /* Lighter variant */
var(--ion-color-primary-contrast)     /* Text color on primary */

var(--ion-color-success)              /* Verde */
var(--ion-color-warning)              /* Amarillo */
var(--ion-color-danger)               /* Rojo */

var(--ion-background-color)           /* Background */
var(--ion-text-color)                 /* Text */
var(--ion-border-color)               /* Borders */
```

### Espaciado

```css
var(--ion-padding)                    /* 16px por defecto */
var(--ion-margin)                     /* 16px por defecto */
```

### Tamaños de Toque

```css
var(--erx-touch-target)               /* 44px (iOS standard) */
var(--erx-touch-target-sm)            /* 36px */
var(--erx-touch-target-lg)            /* 52px */
```

---

## 🌓 Dark Mode

El dark mode se activa automáticamente:

### Automático (Media Query)

```css
@media (prefers-color-scheme: dark) {
  /* Variables de Ionic cambian automáticamente */
  --ion-background-color: #0f172a;
  --ion-text-color: #f1f5f9;
}
```

### Manual (Clase .dark)

```html
<body class="dark">
  <!-- Todos los componentes ERX e Ionic cambian a dark mode -->
</body>
```

---

## ✅ Checklist de Componentes

Estado de migración de componentes ERX:

### Core Components (Alta Prioridad)
- ✅ Botones (automático vía clase)
- ✅ Cards (automático vía clase)
- ✅ Badges (automático vía clase)
- ✅ Headers (automático vía clase)
- ✅ Items (automático vía clase)
- ✅ Inputs (automático vía selector)

### POS Components
- 🔄 erx-cart (parcial)
- 🔄 erx-product-card (parcial)
- ⬜ erx-calculator
- ⬜ erx-payment
- ⬜ erx-receipt
- ⬜ erx-order-ticket
- ⬜ erx-quantity-badge

### Data Display
- ⬜ erx-data-grid
- ⬜ erx-tree
- ⬜ erx-table

### Forms
- ⬜ erx-rich-text
- ⬜ erx-color-picker
- ⬜ erx-rating
- ⬜ erx-signature-pad

**Leyenda:**
- ✅ = Completamente migrado
- 🔄 = Parcialmente migrado (usa algunas clases Ionic)
- ⬜ = Pendiente

---

## 🔧 Cómo Actualizar un Componente

### Paso 1: Actualizar Clases CSS

**Antes:**
```tsx
render() {
  return (
    <div class="my-custom-card">
      <button class="my-button">Click</button>
    </div>
  );
}
```

**Después:**
```tsx
render() {
  return (
    <div class="erx-my-component__container">  {/* Hereda estilos de card */}
      <button class="erx-my-component__btn">Click</button>  {/* Hereda estilos de button */}
    </div>
  );
}
```

### Paso 2: Usar Variables de Ionic en CSS

**Antes:**
```css
.my-button {
  background: #667eea;
  color: white;
  border-radius: 8px;
  padding: 12px 24px;
}
```

**Después:**
```css
.erx-my-component__btn {
  /* Los estilos base vienen automáticamente de ionic-components.css */
  /* Solo override si necesitas algo específico */
  --padding-start: 24px;
  --padding-end: 24px;
}
```

### Paso 3: Eliminar Estilos Redundantes

Si el componente ya hereda estilos de Ionic, elimina CSS redundante:

```css
/* ❌ ELIMINAR - Ya viene de ionic-components.css */
.erx-my-component__btn {
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  background: var(--ion-color-primary);
  color: white;
  height: 44px;
  /* ... etc */
}

/* ✅ MANTENER - Solo customizaciones específicas */
.erx-my-component__btn {
  min-width: 120px;  /* Específico del componente */
}
```

---

## 🧪 Testing

### Probar Modo iOS

```html
<!DOCTYPE html>
<html class="ios">
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css">
  <script type="module" src="./dist/erx/erx.esm.js"></script>
</head>
<body>
  <erx-cart></erx-cart>
</body>
</html>
```

### Probar Modo MD

```html
<html class="md">
```

### Probar Dark Mode

```html
<html class="dark">
<!-- O -->
<body class="dark">
```

---

## 📚 Recursos

- [Ionic CSS Variables](https://ionicframework.com/docs/theming/css-variables)
- [Ionic Platform Styles](https://ionicframework.com/docs/theming/platform-styles)
- [Ionic Dark Mode](https://ionicframework.com/docs/theming/dark-mode)
- [Bootstrap Grid Integration](./README.md#bootstrap-grid-integration)

---

## 🚀 Próximos Pasos

1. ✅ Sistema de estilos Ionic implementado
2. ✅ Clases automáticas funcionando
3. 🔄 Migrar componentes POS (prioridad)
4. ⬜ Migrar componentes de Data Display
5. ⬜ Migrar componentes de Forms
6. ⬜ Actualizar todos los demos en showcase
7. ⬜ Documentar ejemplos de integración con Ionic

---

**Última actualización:** 2026-01-19
