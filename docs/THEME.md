# Ionic Theme - ERPlora UX Colors

Theme SCSS oficial para ERX usando el formato de Ionic Color Generator con los colores de la librería UX.

## 📦 Archivos

- **`theme.scss`** - Theme completo con todas las variables Ionic
- **Fuente**: `/Users/ioan/Desktop/code/ux/css/themes.css`
- **Generado con**: https://ionicframework.com/docs/theming/color-generator

## 🎨 Paleta de Colores

### Colores Principales

| Color | Light | Dark | Uso |
|-------|-------|------|-----|
| **Primary** | `#8b5cf6` (Violet 500) | `#976df7` | Brand, acciones principales |
| **Secondary** | `#6366f1` (Indigo 600) | `#7375f2` | Acciones secundarias |
| **Tertiary** | `#a855f7` (Purple 500) | `#b166f8` | Acentos adicionales |
| **Success** | `#22c55e` (Green 500) | `#4ade80` | Estados positivos |
| **Warning** | `#f59e0b` (Amber 500) | `#fbbf24` | Advertencias |
| **Danger** | `#ef4444` (Red 500) | `#f87171` | Errores, acciones destructivas |

### Colores Adicionales

| Color | Valor | Uso |
|-------|-------|-----|
| **Info** | `#06b6d4` (Cyan 500) | Información |
| **Favorite** | `#ec4899` (Pink 500) | Favoritos, me gusta |
| **Star** | `#facc15` (Yellow 400) | Ratings, destacados |

### Colores de UI

| Color | Light | Dark |
|-------|-------|------|
| **Dark** | `#111827` (Gray 900) | `#f1f5f9` (Gray 100) |
| **Medium** | `#6b7280` (Gray 500) | `#9ca3af` (Gray 400) |
| **Light** | `#e5e7eb` (Gray 200) | `#334155` (Slate 700) |

## 💻 Uso

### En React/Vite

```javascript
import './theme.scss';
```

### En HTML

```html
<link rel="stylesheet" href="theme.css">
```

### Variables CSS

```css
/* Usar color primary */
.my-element {
  background: var(--ion-color-primary);
  color: var(--ion-color-primary-contrast);
}

/* Usar shade/tint */
.my-hover {
  background: var(--ion-color-primary-shade);
}

.my-active {
  background: var(--ion-color-primary-tint);
}
```

## 🎯 Colores Personalizados en Ionic

Para usar colores custom (info, favorite, star) con componentes Ionic:

```jsx
<IonButton color="info" className="ion-color-info">Info</IonButton>
<IonButton color="favorite" className="ion-color-favorite">Favorite</IonButton>
<IonButton color="star" className="ion-color-star">Star</IonButton>
```

## 🌓 Dark Mode

El theme incluye soporte completo para dark mode:

### Automático

```css
@media (prefers-color-scheme: dark) {
  /* Se aplica automáticamente */
}
```

### Manual

```javascript
document.body.classList.add('dark');
```

### En React

```jsx
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  document.body.classList.toggle('dark', darkMode);
}, [darkMode]);
```

## 📐 Variables de Espaciado

```scss
--ion-padding: 16px;
--ion-margin: 16px;
```

## 🎨 Variables de Componentes

```scss
// Toolbar
--ion-toolbar-background: #ffffff;
--ion-toolbar-color: #111827;

// Cards
--ion-card-background: #ffffff;

// Items
--ion-item-background: #ffffff;
--ion-item-border-color: #e5e7eb;

// Tab Bar
--ion-tab-bar-background: #ffffff;
--ion-tab-bar-color: #6b7280;
--ion-tab-bar-color-selected: #8b5cf6;
```

## 🔧 Personalización

### Cambiar Color Primary

```scss
:root {
  --ion-color-primary: #your-color;
  --ion-color-primary-rgb: r, g, b;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-shade: #darker-shade;
  --ion-color-primary-tint: #lighter-tint;
}
```

### Calcular Shade y Tint

```javascript
// Shade (88% del original)
shade = rgb(R * 0.88, G * 0.88, B * 0.88)

// Tint (12% más hacia el blanco)
tint = rgb(R + (255 - R) * 0.12, G + (255 - G) * 0.12, B + (255 - B) * 0.12)
```

### Usar Ionic Color Generator

1. Ir a: https://ionicframework.com/docs/theming/color-generator
2. Ingresar tu color hex
3. Copiar las variables generadas
4. Pegar en tu SCSS

## 📊 Color Steps

El theme incluye 20 steps de gray para crear capas y sombras:

```scss
--ion-color-step-50: #f9fafb;
--ion-color-step-100: #f3f4f6;
// ... hasta
--ion-color-step-950: #000000;
```

**Uso:**
```css
.card {
  background: var(--ion-color-step-50);
  border: 1px solid var(--ion-color-step-150);
}
```

## 📱 iOS vs Material Design

```scss
.ios {
  --ion-default-font: -apple-system, BlinkMacSystemFont;
}

.md {
  --ion-default-font: "Roboto", "Helvetica Neue";
}
```

## ✅ Variables Incluidas

- ✅ 8 colores estándar Ionic (primary, secondary, tertiary, success, warning, danger, dark, medium, light)
- ✅ 3 colores custom (info, favorite, star)
- ✅ Variantes (shade, tint, contrast) para todos los colores
- ✅ RGB values para transparencias
- ✅ 20 color steps para gray
- ✅ Variables de componentes (toolbar, card, item, tab-bar)
- ✅ Variables de espaciado (padding, margin)
- ✅ Variables de tipografía
- ✅ Dark mode completo
- ✅ iOS vs MD mode support

## 📚 Recursos

- [Ionic Color Generator](https://ionicframework.com/docs/theming/color-generator)
- [Ionic Theming Docs](https://ionicframework.com/docs/theming/basics)
- [UX Color Palette](/Users/ioan/Desktop/code/ux/css/themes.css)

---

**Última actualización:** 2026-01-19
