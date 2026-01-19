# Ionic UX Theme - ERPlora Colors

This document explains how to use the Ionic UX theme with ERX components.

---

## 🎨 Overview

The **Ionic UX Theme** is a complete Ionic color palette customized with ERPlora brand colors. It provides:

- ✅ Full Ionic color system (primary, secondary, success, warning, danger, etc.)
- ✅ Custom colors (info, favorite, star)
- ✅ iOS and Material Design mode support
- ✅ Dark mode support
- ✅ ERX component integration

---

## 📦 Installation

The theme is included in ERX components automatically. No installation needed.

---

## 🚀 Usage

### Basic Usage

Simply import ERX components and they will use the UX theme:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Import ERX Components -->
  <script type="module" src="https://unpkg.com/@erplora/erx/dist/erx/erx.esm.js"></script>
</head>
<body>
  <!-- Components automatically use UX colors -->
  <erx-rating value="4" color="primary"></erx-rating>
  <erx-cart tax-rate="0.21"></erx-cart>
</body>
</html>
```

### With Ionic Framework

If you're using Ionic Framework, the theme integrates seamlessly:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Ionic Core -->
  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />

  <!-- ERX Components -->
  <script type="module" src="https://unpkg.com/@erplora/erx/dist/erx/erx.esm.js"></script>
</head>
<body>
  <!-- Ionic components use UX colors -->
  <ion-button color="primary">Primary Button</ion-button>
  <ion-button color="success">Success Button</ion-button>

  <!-- ERX components match Ionic styling -->
  <erx-rating value="5" color="primary"></erx-rating>
</body>
</html>
```

---

## 🎨 Color Palette

### Standard Colors

| Color | Value | Use Case |
|-------|-------|----------|
| **Primary** | `#667eea` | Main brand color, primary actions |
| **Secondary** | `#6366f1` | Secondary actions, accents |
| **Tertiary** | `#8b5cf6` | Additional accents |
| **Success** | `#22c55e` | Success states, positive actions |
| **Warning** | `#eab308` | Warnings, cautions |
| **Danger** | `#ef4444` | Errors, destructive actions |
| **Dark** | `#111827` | Dark text, dark surfaces |
| **Medium** | `#6b7280` | Secondary text, disabled states |
| **Light** | `#e5e7eb` | Light surfaces, borders |

### Custom Colors

| Color | Value | Use Case |
|-------|-------|----------|
| **Info** | `#06b6d4` | Informational messages |
| **Favorite** | `#ec4899` | Favorites, likes, hearts |
| **Star** | `#fbbf24` | Ratings, highlights |

---

## 📝 CSS Variables

### Using Colors

All Ionic color variables are available:

```css
/* Primary color */
.my-element {
  background: var(--ion-color-primary);
  color: var(--ion-color-primary-contrast);
}

/* Success color */
.my-success {
  background: var(--ion-color-success);
  border: 1px solid var(--ion-color-success-shade);
}

/* Custom info color */
.my-info {
  background: var(--ion-color-info);
  color: var(--ion-color-info-contrast);
}
```

### ERX Variables

ERX components also provide aliases for convenience:

```css
.erx-component {
  color: var(--erx-text);
  background: var(--erx-surface);
  border-color: var(--erx-border-color);
}

.erx-primary {
  color: var(--erx-color-primary);
}
```

---

## 🌓 Dark Mode

The theme includes automatic dark mode support:

### Automatic (Prefers Color Scheme)

```css
/* Automatically activates based on system preference */
@media (prefers-color-scheme: dark) {
  /* Dark mode colors applied automatically */
}
```

### Manual Dark Mode

```html
<!-- Add 'dark' class to body -->
<body class="dark">
  <!-- All components use dark mode colors -->
</body>
```

```javascript
// Toggle dark mode
document.body.classList.toggle('dark');
```

---

## 📱 iOS vs Material Design

The theme supports both iOS and Material Design modes:

### iOS Mode

```html
<body class="ios">
  <!-- Rounded corners, softer shadows, 44px touch targets -->
</body>
```

**Characteristics:**
- Border radius: 10px
- Touch targets: 44px
- Softer shadows
- More padding

### Material Design Mode

```html
<body class="md">
  <!-- Sharper corners, elevation shadows, 36px touch targets -->
</body>
```

**Characteristics:**
- Border radius: 4px
- Touch targets: 36px
- Elevation shadows
- UPPERCASE text on buttons

### Auto-Detection

```javascript
// Detect platform and apply class
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
document.body.classList.add(isIOS ? 'ios' : 'md');
```

---

## 🎯 Component Color Props

Most ERX components support the `color` prop:

```html
<!-- Rating with different colors -->
<erx-rating value="4" color="primary"></erx-rating>
<erx-rating value="5" color="success"></erx-rating>
<erx-rating value="3" color="warning"></erx-rating>
<erx-rating value="2" color="danger"></erx-rating>

<!-- Badges with colors -->
<erx-badge color="primary">New</erx-badge>
<erx-badge color="success">In Stock</erx-badge>
<erx-badge color="warning">Low Stock</erx-badge>
<erx-badge color="danger">Out of Stock</erx-badge>
```

---

## 🛠 Customization

### Override Colors

You can override any color by redefining CSS variables:

```css
:root {
  /* Change primary color */
  --ion-color-primary: #ff6b6b;
  --ion-color-primary-rgb: 255, 107, 107;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-shade: #e05e5e;
  --ion-color-primary-tint: #ff7b7b;
}
```

### Add Custom Colors

```css
:root {
  /* Define custom color */
  --ion-color-custom: #9333ea;
  --ion-color-custom-rgb: 147, 51, 234;
  --ion-color-custom-contrast: #ffffff;
  --ion-color-custom-shade: #8129ce;
  --ion-color-custom-tint: #a14bed;
}

/* Create color class */
.ion-color-custom {
  --ion-color-base: var(--ion-color-custom);
  --ion-color-base-rgb: var(--ion-color-custom-rgb);
  --ion-color-contrast: var(--ion-color-custom-contrast);
  --ion-color-shade: var(--ion-color-custom-shade);
  --ion-color-tint: var(--ion-color-custom-tint);
}
```

```html
<!-- Use custom color -->
<ion-button color="custom" class="ion-color-custom">Custom</ion-button>
```

---

## 📊 Color Generation

Need to generate shade and tint values? Use these formulas:

```javascript
// Shade (darker): Multiply RGB by 0.88
shade = rgb(R * 0.88, G * 0.88, B * 0.88)

// Tint (lighter): Mix with white (increase brightness by 12%)
tint = rgb(R + (255 - R) * 0.12, G + (255 - G) * 0.12, B + (255 - B) * 0.12)
```

Or use the [Ionic Color Generator](https://ionicframework.com/docs/theming/colors#new-color-creator):

1. Enter your hex color
2. Copy the generated CSS variables
3. Paste into your stylesheet

---

## 🔧 Advanced

### Themed Components

Create components that adapt to theme colors:

```css
/* Component uses theme colors automatically */
.my-card {
  background: var(--ion-card-background);
  color: var(--ion-text-color);
  border: 1px solid var(--ion-border-color);
}

/* Adapts to dark mode automatically */
@media (prefers-color-scheme: dark) {
  .my-card {
    /* Variables update automatically */
  }
}
```

### Platform-Specific Styles

```css
/* iOS-specific styling */
.ios .my-button {
  border-radius: 10px;
  height: 44px;
}

/* MD-specific styling */
.md .my-button {
  border-radius: 4px;
  height: 36px;
  text-transform: uppercase;
}
```

---

## 📚 Examples

### Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ERX with UX Theme</title>

  <!-- Ionic Core -->
  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />

  <!-- ERX Components -->
  <script type="module" src="https://unpkg.com/@erplora/erx/dist/erx/erx.esm.js"></script>

  <style>
    body {
      background: var(--ion-background-color);
      color: var(--ion-text-color);
      padding: 20px;
    }
  </style>
</head>
<body class="ios">
  <h1>ERX Components with UX Theme</h1>

  <!-- Ionic Buttons -->
  <ion-button color="primary">Primary</ion-button>
  <ion-button color="success">Success</ion-button>
  <ion-button color="danger">Danger</ion-button>

  <!-- ERX Rating -->
  <erx-rating value="4" color="primary"></erx-rating>

  <!-- ERX Cart -->
  <erx-cart id="cart" tax-rate="0.21"></erx-cart>

  <!-- Dark Mode Toggle -->
  <ion-button onclick="document.body.classList.toggle('dark')">
    Toggle Dark Mode
  </ion-button>

  <script>
    // Initialize cart
    setTimeout(() => {
      document.getElementById('cart').items = [
        { id: '1', name: 'Product', price: 29.99, quantity: 2 }
      ];
    }, 100);
  </script>
</body>
</html>
```

---

## 🔗 Resources

- [Live Demo](./ionic-ux-theme-demo.html)
- [Ionic Theming Docs](https://ionicframework.com/docs/theming/basics)
- [Ionic Color Generator](https://ionicframework.com/docs/theming/colors#new-color-creator)
- [ERX Component Showcase](./showcase/)

---

## ✅ Verification Checklist

- [x] All Ionic standard colors defined (primary, secondary, success, warning, danger)
- [x] Custom colors added (info, favorite, star)
- [x] Dark mode support (automatic + manual)
- [x] iOS mode support (rounded, 44px targets)
- [x] MD mode support (sharp, 36px targets, UPPERCASE)
- [x] ERX components inherit Ionic colors
- [x] Color props work on ERX components
- [x] Theme variables cascade correctly
- [x] Shade and tint values calculated
- [x] Contrast colors ensure readability

---

**Last Updated:** 2026-01-19
