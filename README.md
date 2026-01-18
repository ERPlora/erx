# ERX - ERPlora eXtensions

<p align="center">
  <img src="https://img.shields.io/npm/v/@erplora/erx?style=flat-square" alt="npm version">
  <img src="https://img.shields.io/npm/l/@erplora/erx?style=flat-square" alt="license">
  <img src="https://img.shields.io/badge/components-84-blue?style=flat-square" alt="components">
  <img src="https://img.shields.io/badge/framework-Stencil.js-purple?style=flat-square" alt="framework">
</p>

**ERX** is a comprehensive Web Components library built with Stencil.js, designed to complement Ionic Framework for enterprise ERP desktop/web applications. It provides **84 specialized components** not available in Ionic.

## Features

- **84 Enterprise Components** - POS, HR, Manufacturing, Scheduling, and more
- **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JS
- **Dark Mode Support** - Automatic and manual dark mode
- **CSS Custom Properties** - Fully themeable with CSS variables
- **TypeScript** - Full type definitions included
- **Accessible** - WCAG 2.1 compliant with ARIA support
- **Touch Optimized** - 44px touch targets, gesture support
- **Ionic Compatible** - Matches Ionic's design system

---

## Installation

### NPM

```bash
npm install @erplora/erx
```

### CDN

```html
<script type="module" src="https://unpkg.com/@erplora/erx/dist/erx/erx.esm.js"></script>
<script nomodule src="https://unpkg.com/@erplora/erx/dist/erx/erx.js"></script>
```

---

## Quick Start

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://unpkg.com/@erplora/erx/dist/erx/erx.esm.js"></script>
</head>
<body>
  <erx-data-grid id="grid"></erx-data-grid>

  <script>
    const grid = document.getElementById('grid');
    grid.columns = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' }
    ];
    grid.data = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' }
    ];
  </script>
</body>
</html>
```

### React

```bash
npm install @erplora/erx @erplora/erx-react
```

```tsx
import { ErxDataGrid, ErxButton } from '@erplora/erx-react';

function App() {
  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' }
  ];

  const data = [
    { name: 'John Doe', email: 'john@example.com' }
  ];

  return (
    <ErxDataGrid columns={columns} data={data} />
  );
}
```

### Vue

```vue
<template>
  <erx-data-grid :columns="columns" :data="data"></erx-data-grid>
</template>

<script setup>
import { defineCustomElements } from '@erplora/erx/loader';
defineCustomElements();

const columns = [
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' }
];

const data = [
  { name: 'John Doe', email: 'john@example.com' }
];
</script>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { defineCustomElements } from '@erplora/erx/loader';

defineCustomElements();

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

```html
<!-- component.html -->
<erx-data-grid [columns]="columns" [data]="data"></erx-data-grid>
```

---

## Component Categories

ERX includes **84 components** organized into categories:

| Category | Components | Description |
|----------|------------|-------------|
| **Data Display** | 12 | DataGrid, Tree, Table, JSON Viewer, Diff, Code Block, Sparkline, Gauge, etc. |
| **Forms** | 14 | Form Builder, Rich Text, Color Picker, Phone Input, Signature, Slider, etc. |
| **Layout** | 10 | Resizable Panels, Master-Detail, Kanban, Dashboard Grid, Shell, Masonry, etc. |
| **Navigation** | 6 | Mega Menu, Pagination, Dropdown, Context Menu, Command Palette, Load More |
| **Overlays** | 6 | Drawer, Sheet, Lightbox, Fullscreen Modal, Snackbar, Notifications |
| **Feedback** | 3 | State (Empty/Error/Loading), Banner, Callout |
| **Buttons** | 3 | Button Group, Split Button, Status Indicator |
| **POS** | 11 | Cart, Keypad, Payment, Product Grid, Receipt, Cash Drawer, etc. |
| **HR** | 7 | Org Chart, Employee Card, Timesheet, Leave Calendar, etc. |
| **Manufacturing** | 7 | BOM Tree, Work Order, Production Line, Quality Control, etc. |
| **Calendar** | 3 | Calendar, Scheduler, Gantt Chart |
| **Multimedia** | 8 | Video Player, Audio Player, QR Code, Barcode Scanner, Gallery, Carousel, etc. |

---

## Theming

ERX uses CSS custom properties for theming:

```css
:root {
  /* Primary Colors */
  --erx-color-primary: #667eea;
  --erx-color-primary-dark: #5a67d8;
  --erx-color-primary-light: #eef2ff;

  /* Semantic Colors */
  --erx-color-success: #10b981;
  --erx-color-warning: #f59e0b;
  --erx-color-danger: #ef4444;

  /* Surfaces */
  --erx-surface: #ffffff;
  --erx-surface-secondary: #f9fafb;

  /* Text */
  --erx-text: #111827;
  --erx-text-secondary: #6b7280;
  --erx-text-tertiary: #9ca3af;

  /* Borders */
  --erx-border-color: #e5e7eb;
  --erx-border-radius: 8px;

  /* Touch */
  --erx-touch-target: 44px;
}

/* Dark Mode */
.dark {
  --erx-surface: #1f2937;
  --erx-surface-secondary: #374151;
  --erx-text: #f9fafb;
  --erx-text-secondary: #d1d5db;
  --erx-border-color: #4b5563;
}
```

---

## CSS Parts

All ERX components expose CSS parts for styling:

```css
erx-data-grid::part(container) {
  border-radius: 12px;
}

erx-data-grid::part(header) {
  background: #f0f0f0;
}

erx-button::part(button) {
  font-weight: 600;
}
```

---

## Development

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

## Documentation

For full component documentation with all properties, events, and methods, see:

- **[Full API Reference](./docs/API.md)** - Complete component documentation
- **[Demo Page](https://erplora.github.io/erx/)** - Interactive examples

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 60+ |
| Firefox | 63+ |
| Safari | 10.1+ |
| Edge | 79+ |
| iOS Safari | 10.3+ |
| Android Chrome | 60+ |

---

## ERPlora Hub Integration

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

  // Show toast
  api.toast('Data loaded!', 'success');
}
```

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Links

- [GitHub Repository](https://github.com/ERPlora/erx)
- [Demo Page](https://erplora.github.io/erx/)
- [NPM Package](https://www.npmjs.com/package/@erplora/erx)
- [ERPlora Website](https://erplora.com)

---

Built with ❤️ by ERPlora Team
