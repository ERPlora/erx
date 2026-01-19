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

## 🎮 Live Demos & Examples

### 🌟 Main Demos
- **[Component Showcase](https://erplora.github.io/erx/showcase/)** - Browse all 94 components with live examples
- **[Interactive Playground](https://erplora.github.io/erx/playground/)** - Test components with live JSON editing
- **[Full API Documentation](https://erplora.github.io/erx/)** - Complete technical reference

### 🎨 Feature Demos
- **[Ionic UX Theme Demo](./docs/ionic-ux-theme-demo.html)** - ERPlora brand colors with Ionic components
- **[Ionic Integration Demo](./docs/ionic-demo.html)** - See iOS vs Material Design modes in action
- **[Liquid Glass Demo](./docs/liquid-glass-demo.html)** - iOS 26 glassmorphism effects

### 📸 Component Examples

<details>
<summary><strong>POS & Retail Components</strong> (12 components)</summary>

| Component | Preview | Demo |
|-----------|---------|------|
| `<erx-cart>` | Shopping cart with items, totals, tax | [View Demo](./docs/showcase/#erx-cart) |
| `<erx-product-card>` | Product cards with images, prices, badges | [View Demo](./docs/showcase/#erx-product-card) |
| `<erx-calculator>` | POS calculator with operations | [View Demo](./docs/showcase/#erx-calculator) |
| `<erx-payment>` | Payment methods selector | [View Demo](./docs/showcase/#erx-payment) |
| `<erx-receipt>` | Digital receipt printer | [View Demo](./docs/showcase/#erx-receipt) |
| `<erx-order-ticket>` | Kitchen/bar order tickets | [View Demo](./docs/showcase/#erx-order-ticket) |
| `<erx-quantity-badge>` | Animated quantity indicators | [View Demo](./docs/showcase/#erx-quantity-badge) |
| `<erx-barcode-scanner>` | Barcode/QR scanner | [View Demo](./docs/showcase/#erx-barcode-scanner) |
| `<erx-cash-drawer>` | Cash drawer management | [View Demo](./docs/showcase/#erx-cash-drawer) |
| `<erx-price-tag>` | Price display with formatting | [View Demo](./docs/showcase/#erx-price-tag) |
| `<erx-discount-badge>` | Discount/sale badges | [View Demo](./docs/showcase/#erx-discount-badge) |
| `<erx-loyalty-card>` | Customer loyalty cards | [View Demo](./docs/showcase/#erx-loyalty-card) |

</details>

<details>
<summary><strong>Data Display Components</strong> (15 components)</summary>

| Component | Preview | Demo |
|-----------|---------|------|
| `<erx-data-grid>` | Advanced data tables with sorting, filtering | [View Demo](./docs/showcase/#erx-data-grid) |
| `<erx-tree>` | Hierarchical tree view | [View Demo](./docs/showcase/#erx-tree) |
| `<erx-table>` | Responsive tables | [View Demo](./docs/showcase/#erx-table) |
| `<erx-list>` | Virtual scrolling lists | [View Demo](./docs/showcase/#erx-list) |
| `<erx-card-list>` | Card-based lists | [View Demo](./docs/showcase/#erx-card-list) |
| `<erx-timeline>` | Event timelines | [View Demo](./docs/showcase/#erx-timeline) |
| `<erx-stats-card>` | Statistics cards | [View Demo](./docs/showcase/#erx-stats-card) |
| `<erx-metric-display>` | KPI metrics | [View Demo](./docs/showcase/#erx-metric-display) |
| `<erx-progress-ring>` | Circular progress | [View Demo](./docs/showcase/#erx-progress-ring) |
| `<erx-gauge>` | Gauge charts | [View Demo](./docs/showcase/#erx-gauge) |
| `<erx-sparkline>` | Mini trend charts | [View Demo](./docs/showcase/#erx-sparkline) |
| `<erx-json-viewer>` | JSON tree viewer | [View Demo](./docs/showcase/#erx-json-viewer) |
| `<erx-diff-viewer>` | Text diff comparison | [View Demo](./docs/showcase/#erx-diff-viewer) |
| `<erx-code-block>` | Syntax highlighted code | [View Demo](./docs/showcase/#erx-code-block) |
| `<erx-badge>` | Status badges | [View Demo](./docs/showcase/#erx-badge) |

</details>

<details>
<summary><strong>Form Components</strong> (10 components)</summary>

| Component | Preview | Demo |
|-----------|---------|------|
| `<erx-rich-text>` | WYSIWYG editor | [View Demo](./docs/showcase/#erx-rich-text) |
| `<erx-color-picker>` | Color selection | [View Demo](./docs/showcase/#erx-color-picker) |
| `<erx-rating>` | Star ratings (with half-stars) | [View Demo](./docs/showcase/#erx-rating) |
| `<erx-signature-pad>` | Digital signatures | [View Demo](./docs/showcase/#erx-signature-pad) |
| `<erx-phone-input>` | International phone numbers | [View Demo](./docs/showcase/#erx-phone-input) |
| `<erx-date-range>` | Date range picker | [View Demo](./docs/showcase/#erx-date-range) |
| `<erx-file-upload>` | Drag & drop file uploads | [View Demo](./docs/showcase/#erx-file-upload) |
| `<erx-slider>` | Range sliders | [View Demo](./docs/showcase/#erx-slider) |
| `<erx-toggle-group>` | Toggle button groups | [View Demo](./docs/showcase/#erx-toggle-group) |
| `<erx-search>` | Advanced search with filters | [View Demo](./docs/showcase/#erx-search) |

</details>

<details>
<summary><strong>HR & Workforce Components</strong> (7 components)</summary>

| Component | Preview | Demo |
|-----------|---------|------|
| `<erx-org-chart>` | Organization hierarchy | [View Demo](./docs/showcase/#erx-org-chart) |
| `<erx-employee-card>` | Employee profiles | [View Demo](./docs/showcase/#erx-employee-card) |
| `<erx-time-clock>` | Clock in/out widget | [View Demo](./docs/showcase/#erx-time-clock) |
| `<erx-timesheet>` | Time tracking sheets | [View Demo](./docs/showcase/#erx-timesheet) |
| `<erx-shift-calendar>` | Shift scheduling | [View Demo](./docs/showcase/#erx-shift-calendar) |
| `<erx-leave-request>` | Leave/vacation requests | [View Demo](./docs/showcase/#erx-leave-request) |
| `<erx-attendance>` | Attendance tracking | [View Demo](./docs/showcase/#erx-attendance) |

</details>

<details>
<summary><strong>Manufacturing Components</strong> (7 components)</summary>

| Component | Preview | Demo |
|-----------|---------|------|
| `<erx-bom-tree>` | Bill of Materials tree | [View Demo](./docs/showcase/#erx-bom-tree) |
| `<erx-work-order>` | Work order cards | [View Demo](./docs/showcase/#erx-work-order) |
| `<erx-production-line>` | Production line status | [View Demo](./docs/showcase/#erx-production-line) |
| `<erx-quality-check>` | Quality inspection forms | [View Demo](./docs/showcase/#erx-quality-check) |
| `<erx-batch-tracker>` | Batch/lot tracking | [View Demo](./docs/showcase/#erx-batch-tracker) |
| `<erx-inventory-status>` | Inventory levels | [View Demo](./docs/showcase/#erx-inventory-status) |
| `<erx-machine-status>` | Machine monitoring | [View Demo](./docs/showcase/#erx-machine-status) |

</details>

<details>
<summary><strong>Layout Components</strong> (12 components)</summary>

| Component | Preview | Demo |
|-----------|---------|------|
| `<erx-kanban>` | Kanban boards (drag & drop) | [View Demo](./docs/showcase/#erx-kanban) |
| `<erx-dashboard-grid>` | Dashboard layouts | [View Demo](./docs/showcase/#erx-dashboard-grid) |
| `<erx-master-detail>` | Master-detail views | [View Demo](./docs/showcase/#erx-master-detail) |
| `<erx-split-pane>` | Resizable split views | [View Demo](./docs/showcase/#erx-split-pane) |
| `<erx-tabs>` | Tab navigation | [View Demo](./docs/showcase/#erx-tabs) |
| `<erx-accordion>` | Collapsible sections | [View Demo](./docs/showcase/#erx-accordion) |
| `<erx-stepper>` | Multi-step forms | [View Demo](./docs/showcase/#erx-stepper) |
| `<erx-sidebar>` | Collapsible sidebars | [View Demo](./docs/showcase/#erx-sidebar) |
| `<erx-panel>` | Resizable panels | [View Demo](./docs/showcase/#erx-panel) |
| `<erx-masonry>` | Masonry layouts | [View Demo](./docs/showcase/#erx-masonry) |
| `<erx-card-stack>` | Stacked cards (swipeable) | [View Demo](./docs/showcase/#erx-card-stack) |
| `<erx-carousel>` | Image carousels | [View Demo](./docs/showcase/#erx-carousel) |

</details>

<details>
<summary><strong>Calendar & Scheduling</strong> (4 components)</summary>

| Component | Preview | Demo |
|-----------|---------|------|
| `<erx-calendar>` | Full calendar view | [View Demo](./docs/showcase/#erx-calendar) |
| `<erx-scheduler>` | Resource scheduler | [View Demo](./docs/showcase/#erx-scheduler) |
| `<erx-gantt-chart>` | Gantt project timelines | [View Demo](./docs/showcase/#erx-gantt-chart) |
| `<erx-date-picker>` | Date selection | [View Demo](./docs/showcase/#erx-date-picker) |

</details>

<details>
<summary><strong>View All 94 Components</strong></summary>

See the complete list with live demos in the [Component Showcase](https://erplora.github.io/erx/showcase/).

**Categories:**
- POS/Retail: 12 components
- Data Display: 15 components
- Forms (Advanced): 10 components
- HR/Workforce: 7 components
- Manufacturing: 7 components
- Layout: 12 components
- Media: 11 components
- Navigation: 6 components
- Calendar: 4 components
- Feedback: 4 components
- Overlays: 4 components
- Others: 2 components

**Total: 94 Components**

</details>

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

### ⚡ One-Minute Examples

**POS Shopping Cart:**
```html
<erx-cart id="cart"></erx-cart>

<script>
  cart.items = [
    { id: '1', name: 'Laptop', price: 999, quantity: 1 },
    { id: '2', name: 'Mouse', price: 29, quantity: 2 }
  ];
  cart.taxRate = 0.21; // 21% tax
</script>
```
[Try it live →](./docs/showcase/#erx-cart)

**Product Card with Liquid Glass:**
```html
<erx-product-card class="liquid-glass" id="product"></erx-product-card>

<script>
  product.product = {
    name: 'iPhone 26 Pro',
    price: 1299.99,
    stock: 15,
    image: 'product.jpg',
    badge: 'New'
  };
</script>
```
[Try it live →](./docs/liquid-glass-demo.html)

**Star Rating:**
```html
<!-- Simple -->
<erx-rating value="4.5" allow-half="true"></erx-rating>

<!-- With hearts -->
<erx-rating value="5" icon="heart" color="danger"></erx-rating>
```
[Try it live →](./docs/showcase/#erx-rating)

**Data Grid with Sorting:**
```html
<erx-data-grid id="grid"></erx-data-grid>

<script>
  grid.columns = [
    { field: 'name', header: 'Product', sortable: true },
    { field: 'price', header: 'Price', sortable: true }
  ];
  grid.data = [
    { name: 'Laptop', price: '$999' },
    { name: 'Mouse', price: '$29' }
  ];
</script>
```
[Try it live →](./docs/showcase/#erx-data-grid)

### 🎨 With Ionic + Bootstrap Grid

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
