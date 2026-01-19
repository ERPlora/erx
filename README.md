# ERX - ERPlora eXtensions

<p align="center">
  <img src="https://img.shields.io/npm/v/@erplora/erx?style=flat-square" alt="npm version">
  <img src="https://img.shields.io/npm/l/@erplora/erx?style=flat-square" alt="license">
  <img src="https://img.shields.io/badge/components-94-blue?style=flat-square" alt="components">
  <img src="https://img.shields.io/badge/framework-Stencil.js-purple?style=flat-square" alt="framework">
  <img src="https://img.shields.io/badge/Ionic-Compatible-blue?style=flat-square&logo=ionic" alt="Ionic compatible">
</p>

**ERX** is a comprehensive Web Components library built with Stencil.js, designed to **complement Ionic Framework** for enterprise ERP desktop/web applications. It provides **94 specialized components** not available in Ionic, while using Ionic's design system for perfect integration.

## ✨ Features

- **94 Enterprise Components** - POS, HR, Manufacturing, Data Grids, Scheduling, and more
- **🎨 Ionic Design System** - Components inherit Ionic's look and feel automatically
- **✨ iOS 26 Liquid Glass** - Glassmorphism effect with `.liquid-glass` class
- **📱 Bootstrap Grid** - Responsive grid system with Ionic spacing
- **🌓 iOS & Android Modes** - Platform-specific styling (rounded vs sharp corners, shadows, etc.)
- **🌙 Dark Mode Support** - Follows Ionic's dark theme automatically
- **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JS
- **TypeScript** - Full type definitions included
- **Accessible** - WCAG 2.1 compliant with ARIA support
- **Touch Optimized** - 44px touch targets (iOS standard), gesture support

## 🎮 Interactive Demos

- **[Interactive Playground](https://erplora.github.io/erx/playground/)** - Test components with live JSON editing
- **[Component Showcase](https://erplora.github.io/erx/showcase/)** - Browse all 94 components with examples
- **[Documentation](https://erplora.github.io/erx/)** - Full API documentation

---

## 📦 Installation

### NPM

```bash
npm install @erplora/erx @ionic/core
```

### CDN

```html
<!-- Ionic Core (required) -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css">

<!-- ERX Components -->
<script type="module" src="https://unpkg.com/@erplora/erx/dist/erx/erx.esm.js"></script>
```

---

## 🚀 Quick Start

### With Ionic + Bootstrap Grid

ERX components work perfectly inside Ionic layouts with Bootstrap Grid for responsive design:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Ionic Core -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css">
  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>

  <!-- ERX Components -->
  <script type="module" src="https://unpkg.com/@erplora/erx/dist/erx/erx.esm.js"></script>

  <!-- ERX Grid System (Bootstrap Grid + Ionic spacing) -->
  <link rel="stylesheet" href="https://unpkg.com/@erplora/erx/dist/erx/ionic-bootstrap-grid.css">
</head>
<body>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-title>POS Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Bootstrap Grid with Ionic spacing -->
      <div class="container">
        <div class="row g-3">
          <!-- Responsive columns -->
          <div class="col-12 col-md-6 col-lg-4">
            <!-- Ionic Card -->
            <ion-card>
              <ion-card-header>
                <ion-card-title>Shopping Cart</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <!-- ERX Component inside Ionic Card -->
                <erx-cart id="cart"></erx-cart>
              </ion-card-content>
            </ion-card>
          </div>

          <div class="col-12 col-md-6 col-lg-8">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Products</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <erx-data-grid id="products"></erx-data-grid>
              </ion-card-content>
            </ion-card>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-app>

  <script>
    // Configure components
    const grid = document.getElementById('products');
    grid.columns = [
      { field: 'name', header: 'Product' },
      { field: 'price', header: 'Price' }
    ];
    grid.data = [
      { name: 'Widget', price: '$29.99' }
    ];
  </script>
</body>
</html>
```

### React + Ionic

```bash
npm install @erplora/erx @erplora/erx-react @ionic/react
```

```tsx
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { ErxDataGrid, ErxCart } from '@erplora/erx-react';
import '@erplora/erx/dist/erx/ionic-bootstrap-grid.css';

function Dashboard() {
  return (
    <div className="container">
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Shopping Cart</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <ErxCart items={cartItems} />
            </IonCardContent>
          </IonCard>
        </div>

        <div className="col-12 col-md-6">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Products</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <ErxDataGrid columns={columns} data={products} />
            </IonCardContent>
          </IonCard>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎨 Design System Integration

ERX is designed to **complement Ionic**, not replace it:

### ✅ Use Ionic For:
- Basic UI: `<ion-button>`, `<ion-input>`, `<ion-card>`
- Navigation: `<ion-tabs>`, `<ion-menu>`, `<ion-toolbar>`
- Layout: `<ion-content>`, `<ion-grid>`, `<ion-list>`
- Overlays: `<ion-modal>`, `<ion-alert>`, `<ion-toast>`

### ✅ Use ERX For:
- **Enterprise Components**: Data grids, Gantt charts, Kanban boards
- **POS Components**: Cart, receipt, payment, order tickets
- **HR Components**: Org chart, timesheets, shift calendar
- **Manufacturing**: BOM tree, work orders, production line
- **Advanced Inputs**: Rich text editor, signature pad, color picker

### CSS Variables

ERX uses Ionic's CSS variables for perfect integration:

```css
/* ERX automatically uses Ionic variables */
--ion-color-primary: #667eea;      /* ERX inherits this */
--ion-color-success: #22c55e;      /* ERX inherits this */
--ion-padding: 16px;               /* ERX uses this for spacing */
--ion-margin: 16px;                /* ERX uses this for margins */

/* Dark mode automatically supported */
body.dark {
  --ion-background-color: #0f172a;
  --ion-text-color: #f1f5f9;
  /* ERX components adapt automatically */
}
```

### iOS vs Android Styling

ERX automatically inherits Ionic's platform-specific styles:

```html
<!-- iOS mode - rounded corners (10px-12px), softer shadows, 44px buttons -->
<html class="ios">
  <erx-cart></erx-cart>
  <!-- Buttons: rounded, no uppercase, soft feel -->
  <!-- Cards: 12px border-radius, subtle shadow -->
</html>

<!-- Material Design mode - sharp corners (4px), elevation shadows, 36px buttons -->
<html class="md">
  <erx-cart></erx-cart>
  <!-- Buttons: 4px corners, UPPERCASE text, material elevation -->
  <!-- Cards: 4px border-radius, pronounced shadow -->
</html>
```

**How it works:** ERX components detect the `.ios` or `.md` class on `<html>` and apply platform-specific styles automatically using CSS variables and `:host-context()` selectors. No JavaScript detection needed!

### Automatic Style Inheritance

ERX components automatically inherit Ionic styles based on CSS class naming conventions:

| Element Type | CSS Pattern | Inherits From | Example |
|--------------|-------------|---------------|---------|
| **Buttons** | `*erx-*btn` or `*erx-*button` | `ion-button` | `.erx-cart__checkout-btn` |
| **Cards** | `*erx-*card` or `*erx-*__container` | `ion-card` | `.erx-product-card` |
| **List Items** | `*erx-*item` or `*erx-*__item` | `ion-item` | `.erx-cart__item` |
| **Inputs** | `input[class*="erx-"]` | `ion-input` | `<input class="erx-search">` |
| **Badges** | `*erx-*badge` | `ion-badge` | `.erx-quantity-badge` |
| **Headers** | `*erx-*header` or `*erx-*toolbar` | `ion-toolbar` | `.erx-cart__header` |

**Example:**
```tsx
// This button automatically looks like ion-button
<button class="erx-cart__checkout-btn">Checkout</button>

// This card automatically looks like ion-card
<div class="erx-product-card">...</div>

// Both adapt to iOS/MD modes automatically!
```

See [IONIC_MIGRATION.md](./IONIC_MIGRATION.md) for detailed technical documentation.

### ✨ iOS 26 Liquid Glass Effect

Add Apple's Vision Pro-inspired glassmorphism to any component with a simple class:

```html
<!-- Basic liquid glass -->
<erx-cart class="liquid-glass"></erx-cart>

<!-- Apply to any element -->
<div class="liquid-glass">
  <h2>Beautiful Glass Effect</h2>
  <p>Works with backdrop-filter blur and vibrancy</p>
</div>
```

**Variants:**

| Class | Effect |
|-------|--------|
| `.liquid-glass` | Default glass effect (20px blur, 72% opacity) |
| `.liquid-glass-subtle` | Lighter effect (12px blur, 60% opacity) |
| `.liquid-glass-intense` | Maximum vibrancy (32px blur, 85% opacity) |
| `.liquid-glass-frosted` | Classic frosted glass with brightness boost |
| `.liquid-glass-tinted` | Colored glass with hue rotation |

**Features:**
- ✅ Automatic iOS/MD adaptation (iOS gets more blur)
- ✅ Dark mode support
- ✅ Hover/active states
- ✅ GPU-accelerated (`will-change`, `transform3d`)
- ✅ Fallback for unsupported browsers
- ✅ Respects `prefers-reduced-motion`

```html
<!-- iOS mode: 24px blur, 16px border-radius -->
<html class="ios">
  <erx-product-card class="liquid-glass"></erx-product-card>
</html>

<!-- MD mode: 16px blur, 8px border-radius -->
<html class="md">
  <erx-product-card class="liquid-glass"></erx-product-card>
</html>
```

See [Liquid Glass Demo](./docs/liquid-glass-demo.html) for live examples.

---

## 📐 Bootstrap Grid Integration

ERX includes a custom Bootstrap Grid configured for Ionic:

```html
<!-- Import the grid -->
<link rel="stylesheet" href="https://unpkg.com/@erplora/erx/dist/erx/ionic-bootstrap-grid.css">

<!-- Use Bootstrap classes with Ionic spacing -->
<div class="container">
  <div class="row g-3">  <!-- g-3 uses --ion-padding -->
    <div class="col-12 col-md-6 col-lg-4">
      <ion-card>...</ion-card>
    </div>
  </div>
</div>
```

### Gutter Spacing (Ionic scale)

- `g-0` - No gutters (0px)
- `g-1` - Extra small (4px)
- `g-2` - Small (8px)
- `g-3` - Medium (16px) - **Default Ionic padding**
- `g-4` - Large (24px)
- `g-5` - Extra large (32px)

### Breakpoints (Same as Ionic)

- `xs`: 0px
- `sm`: 576px
- `md`: 768px
- `lg`: 992px
- `xl`: 1200px

---

## 📚 Component Categories

ERX includes **94 components** organized into categories:

| Category | Count | Components |
|----------|-------|------------|
| **POS/Retail** | 12 | Cart, Calculator, Payment, Receipt, Product Card, Order Ticket, Quantity Badge, etc. |
| **HR/Workforce** | 7 | Org Chart, Employee Card, Time Clock, Shift Calendar, Leave Request, etc. |
| **Manufacturing** | 7 | BOM Tree, Work Order, Production Line, Quality Check, Batch Tracker, etc. |
| **Data Display** | 15 | Data Grid, Tree, Table, JSON Viewer, Diff, Sparkline, Gauge, Chart, etc. |
| **Forms (Advanced)** | 10 | Rich Text, Color Picker, Phone Input, Signature Pad, Rating, Upload, etc. |
| **Layout** | 12 | Kanban, Dashboard Grid, Master-Detail, Resizable Panels, Masonry, etc. |
| **Media** | 11 | Video Player, Audio Player, QR Code, Barcode Scanner, Gallery, Image Crop, etc. |
| **Navigation** | 6 | Mega Menu, Pagination, Dropdown, Context Menu, Command Palette, etc. |
| **Feedback** | 4 | State (Empty/Error), Banner, Callout, Status Indicator |
| **Calendar** | 4 | Calendar, Calendar Views, Scheduler, Gantt Chart |
| **Overlays** | 4 | Drawer, Sheet, Lightbox, Fullscreen Modal |
| **Others** | 2 | Split Pane, Divider |

---

## 🎨 Theming

### Use Ionic Theme Variables

```css
:root {
  /* Modify Ionic variables - ERX inherits them */
  --ion-color-primary: #667eea;
  --ion-color-success: #22c55e;
  --ion-color-warning: #eab308;
  --ion-color-danger: #ef4444;

  --ion-padding: 16px;
  --ion-margin: 16px;

  --ion-background-color: #ffffff;
  --ion-text-color: #111827;
}

/* Dark Mode */
body.dark {
  --ion-background-color: #0f172a;
  --ion-text-color: #f1f5f9;
  /* ERX components automatically adapt */
}
```

### ERX-Specific Overrides (Optional)

```css
/* Override specific ERX components if needed */
erx-data-grid::part(container) {
  border-radius: 12px;
}

erx-cart::part(header) {
  background: var(--ion-color-primary);
}
```

---

## 🛠 Development

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Generate new component
npm run generate erx-my-component
```

---

## 📖 Documentation

- **[Full API Reference](./docs/API.md)** - Complete component documentation
- **[Component Comparison](./COMPONENTS_COMPARISON.md)** - ERX vs UX components
- **[Interactive Playground](https://erplora.github.io/erx/playground/)** - Live testing
- **[Component Showcase](https://erplora.github.io/erx/showcase/)** - All 94 components

---

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 60+ |
| Firefox | 63+ |
| Safari | 10.1+ |
| Edge | 79+ |
| iOS Safari | 10.3+ |
| Android Chrome | 60+ |

---

## 🔌 ERPlora Hub Integration

Components integrate with the ERPlora Hub API bridge:

```tsx
import { getErploraApi, isInErploraHub } from '@erplora/erx';

if (isInErploraHub()) {
  const api = getErploraApi('my-module');

  // Query data
  const result = await api.query({
    action: 'select',
    table: 'products',
    orderBy: 'name ASC',
  });

  // Navigate
  api.navigate('/products/123');

  // Show toast
  api.toast('Product saved!', 'success');
}
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🔗 Links

- [GitHub Repository](https://github.com/ERPlora/erx)
- [Interactive Playground](https://erplora.github.io/erx/playground/)
- [Component Showcase](https://erplora.github.io/erx/showcase/)
- [NPM Package](https://www.npmjs.com/package/@erplora/erx)
- [Ionic Framework](https://ionicframework.com/)
- [ERPlora Website](https://erplora.com)

---

<p align="center">
  Built with ❤️ by the ERPlora Team<br>
  <strong>Complementary to Ionic Framework</strong>
</p>
