# ERX Component API Reference

Complete documentation for all 84 ERX components with properties, events, methods, and CSS parts.

---

## Table of Contents

1. [Data Display](#data-display)
   - [erx-data-grid](#erx-data-grid)
   - [erx-tree](#erx-tree)
   - [erx-table](#erx-table)
   - [erx-json-viewer](#erx-json-viewer)
   - [erx-diff-viewer](#erx-diff-viewer)
   - [erx-code-block](#erx-code-block)
   - [erx-progress-circle](#erx-progress-circle)
   - [erx-gauge](#erx-gauge)
   - [erx-sparkline](#erx-sparkline)
   - [erx-image-zoom](#erx-image-zoom)
   - [erx-event-card](#erx-event-card)
   - [erx-avatar-group](#erx-avatar-group)
2. [Forms](#forms)
   - [erx-form-builder](#erx-form-builder)
   - [erx-rich-text](#erx-rich-text)
   - [erx-color-picker](#erx-color-picker)
   - [erx-phone-input](#erx-phone-input)
   - [erx-upload](#erx-upload)
   - [erx-signature](#erx-signature)
   - [erx-date-range](#erx-date-range)
   - [erx-slider](#erx-slider)
   - [erx-rating](#erx-rating)
   - [erx-combobox](#erx-combobox)
   - [erx-autocomplete](#erx-autocomplete)
   - [erx-tags-input](#erx-tags-input)
   - [erx-cascader](#erx-cascader)
   - [erx-transfer](#erx-transfer)
3. [Layout](#layout)
   - [erx-resizable-panels](#erx-resizable-panels)
   - [erx-master-detail](#erx-master-detail)
   - [erx-kanban](#erx-kanban)
   - [erx-dashboard-grid](#erx-dashboard-grid)
   - [erx-masonry](#erx-masonry)
   - [erx-shell](#erx-shell)
   - [erx-divider](#erx-divider)
   - [erx-section](#erx-section)
   - [erx-panel](#erx-panel)
   - [erx-dock](#erx-dock)
4. [Navigation](#navigation)
   - [erx-mega-menu](#erx-mega-menu)
   - [erx-pagination](#erx-pagination)
   - [erx-dropdown](#erx-dropdown)
   - [erx-context-menu](#erx-context-menu)
   - [erx-command](#erx-command)
   - [erx-load-more](#erx-load-more)
5. [Overlays](#overlays)
   - [erx-drawer](#erx-drawer)
   - [erx-sheet](#erx-sheet)
   - [erx-lightbox](#erx-lightbox)
   - [erx-fullscreen-modal](#erx-fullscreen-modal)
   - [erx-snackbar](#erx-snackbar)
   - [erx-notifications](#erx-notifications)
6. [Feedback](#feedback)
   - [erx-state](#erx-state)
   - [erx-banner](#erx-banner)
   - [erx-callout](#erx-callout)
7. [Buttons](#buttons)
   - [erx-button-group](#erx-button-group)
   - [erx-split-button](#erx-split-button)
   - [erx-status-indicator](#erx-status-indicator)
8. [POS](#pos)
   - [erx-pos-cart](#erx-pos-cart)
   - [erx-pos-keypad](#erx-pos-keypad)
   - [erx-pos-payment](#erx-pos-payment)
   - [erx-pos-product-grid](#erx-pos-product-grid)
   - [erx-pos-receipt](#erx-pos-receipt)
   - [erx-cash-drawer](#erx-cash-drawer)
   - [erx-discount-panel](#erx-discount-panel)
   - [erx-customer-display](#erx-customer-display)
   - [erx-order-queue](#erx-order-queue)
   - [erx-quick-keys](#erx-quick-keys)
   - [erx-price-checker](#erx-price-checker)
9. [HR](#hr)
   - [erx-org-chart](#erx-org-chart)
   - [erx-employee-card](#erx-employee-card)
   - [erx-timesheet](#erx-timesheet)
   - [erx-leave-calendar](#erx-leave-calendar)
   - [erx-shift-planner](#erx-shift-planner)
   - [erx-attendance](#erx-attendance)
   - [erx-approval-workflow](#erx-approval-workflow)
10. [Manufacturing](#manufacturing)
    - [erx-bom-tree](#erx-bom-tree)
    - [erx-work-order](#erx-work-order)
    - [erx-production-line](#erx-production-line)
    - [erx-quality-control](#erx-quality-control)
    - [erx-inventory-card](#erx-inventory-card)
    - [erx-machine-status](#erx-machine-status)
    - [erx-batch-tracker](#erx-batch-tracker)
11. [Calendar & Scheduling](#calendar--scheduling)
    - [erx-calendar](#erx-calendar)
    - [erx-scheduler](#erx-scheduler)
    - [erx-gantt](#erx-gantt)
12. [Multimedia](#multimedia)
    - [erx-video-player](#erx-video-player)
    - [erx-audio-player](#erx-audio-player)
    - [erx-qr-code](#erx-qr-code)
    - [erx-barcode-scanner](#erx-barcode-scanner)
    - [erx-image-gallery](#erx-image-gallery)
    - [erx-carousel](#erx-carousel)
    - [erx-image-crop](#erx-image-crop)
    - [erx-pdf-viewer](#erx-pdf-viewer)

---

## Data Display

### erx-data-grid

Advanced data grid with sorting, filtering, pagination, and row selection.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `ErxDataGridColumn[]` | `[]` | Column definitions |
| `data` | `any[]` | `[]` | Row data |
| `selectable` | `boolean` | `false` | Enable row selection |
| `selectMode` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `paginated` | `boolean` | `false` | Enable pagination |
| `pageSize` | `number` | `10` | Rows per page |
| `pageSizeOptions` | `number[]` | `[10,25,50,100]` | Page size options |
| `sortable` | `boolean` | `true` | Enable column sorting |
| `filterable` | `boolean` | `false` | Enable column filtering |
| `loading` | `boolean` | `false` | Show loading state |
| `striped` | `boolean` | `false` | Striped rows |
| `bordered` | `boolean` | `true` | Show borders |
| `compact` | `boolean` | `false` | Compact row height |
| `stickyHeader` | `boolean` | `false` | Sticky header |
| `virtualScroll` | `boolean` | `false` | Virtual scrolling |
| `rowHeight` | `number` | `48` | Row height (px) |
| `emptyText` | `string` | `'No data'` | Empty state text |

#### Column Definition

```typescript
interface ErxDataGridColumn {
  field: string;
  header: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  type?: 'text' | 'number' | 'date' | 'datetime' | 'currency' | 'boolean' | 'badge';
  format?: string;
  align?: 'left' | 'center' | 'right';
  frozen?: 'left' | 'right';
  hidden?: boolean;
  cellClass?: string;
  headerClass?: string;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxRowSelect` | `{ row, selected, index, selectedRows }` | Row selected/deselected |
| `erxRowClick` | `{ row, index, event }` | Row clicked |
| `erxRowDoubleClick` | `{ row, index }` | Row double-clicked |
| `erxSort` | `{ column, direction }` | Column sorted |
| `erxFilter` | `{ column, value, filters }` | Column filtered |
| `erxPageChange` | `{ page, pageSize, total }` | Page changed |
| `erxColumnResize` | `{ column, width }` | Column resized |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `selectAll()` | `void` | Select all rows |
| `deselectAll()` | `void` | Deselect all rows |
| `getSelectedRows()` | `any[]` | Get selected rows |
| `scrollToRow(index)` | `void` | Scroll to row |
| `refresh()` | `void` | Refresh grid |
| `exportToCsv()` | `string` | Export to CSV |

#### CSS Parts

| Part | Description |
|------|-------------|
| `container` | Main container |
| `header` | Header row |
| `header-cell` | Header cell |
| `body` | Body container |
| `row` | Data row |
| `cell` | Data cell |
| `footer` | Footer/pagination |
| `empty` | Empty state |

---

### erx-tree

Hierarchical tree view with expand/collapse, selection, and drag-drop.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `nodes` | `ErxTreeNode[]` | `[]` | Tree node data |
| `selectable` | `boolean` | `false` | Enable selection |
| `selectMode` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `checkable` | `boolean` | `false` | Show checkboxes |
| `cascadeCheck` | `boolean` | `true` | Cascade check to children |
| `draggable` | `boolean` | `false` | Enable drag-drop |
| `expandAll` | `boolean` | `false` | Expand all nodes |
| `showLines` | `boolean` | `true` | Show connecting lines |
| `showIcons` | `boolean` | `true` | Show node icons |
| `filter` | `string` | `''` | Filter text |
| `virtualScroll` | `boolean` | `false` | Virtual scrolling |

#### Node Definition

```typescript
interface ErxTreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: ErxTreeNode[];
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  draggable?: boolean;
  droppable?: boolean;
  data?: any;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxNodeSelect` | `{ node, selected }` | Node selected |
| `erxNodeExpand` | `{ node, expanded }` | Node expanded/collapsed |
| `erxNodeCheck` | `{ node, checked, checkedNodes }` | Node checked |
| `erxNodeDrop` | `{ node, target, position }` | Node dropped |
| `erxNodeContextMenu` | `{ node, event }` | Right-click on node |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `expandAll()` | `void` | Expand all nodes |
| `collapseAll()` | `void` | Collapse all nodes |
| `getSelectedNodes()` | `ErxTreeNode[]` | Get selected nodes |
| `getCheckedNodes()` | `ErxTreeNode[]` | Get checked nodes |
| `findNode(id)` | `ErxTreeNode` | Find node by ID |
| `scrollToNode(id)` | `void` | Scroll to node |

---

### erx-table

Simple, lightweight table component.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `ErxTableColumn[]` | `[]` | Column definitions |
| `data` | `any[]` | `[]` | Row data |
| `striped` | `boolean` | `false` | Striped rows |
| `hoverable` | `boolean` | `true` | Hover effect |
| `bordered` | `boolean` | `true` | Show borders |
| `compact` | `boolean` | `false` | Compact mode |
| `stickyHeader` | `boolean` | `false` | Sticky header |
| `loading` | `boolean` | `false` | Loading state |

---

### erx-json-viewer

Interactive JSON tree viewer.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `any` | `null` | JSON data to display |
| `expanded` | `boolean` | `false` | Expand all by default |
| `showTypes` | `boolean` | `false` | Show data types |
| `showCount` | `boolean` | `true` | Show array/object counts |
| `maxDepth` | `number` | `Infinity` | Max expansion depth |
| `copyable` | `boolean` | `true` | Enable copy button |
| `searchable` | `boolean` | `false` | Enable search |
| `editable` | `boolean` | `false` | Enable editing |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxCopy` | `{ path, value }` | Value copied |
| `erxChange` | `{ path, value, data }` | Value changed (editable mode) |

---

### erx-diff-viewer

Side-by-side or unified diff visualization.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `oldText` | `string` | `''` | Original text |
| `newText` | `string` | `''` | Modified text |
| `oldTitle` | `string` | `'Original'` | Left pane title |
| `newTitle` | `string` | `'Modified'` | Right pane title |
| `mode` | `'split' \| 'unified'` | `'split'` | View mode |
| `showLineNumbers` | `boolean` | `true` | Show line numbers |
| `showHeaders` | `boolean` | `true` | Show file headers |
| `wordWrap` | `boolean` | `false` | Wrap long lines |
| `language` | `string` | `''` | Syntax highlighting |

---

### erx-code-block

Syntax-highlighted code display with copy functionality.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `code` | `string` | `''` | Code content |
| `language` | `string` | `''` | Programming language |
| `showLineNumbers` | `boolean` | `true` | Show line numbers |
| `showCopy` | `boolean` | `true` | Show copy button |
| `showLanguage` | `boolean` | `true` | Show language badge |
| `highlightLines` | `string \| number[]` | `undefined` | Lines to highlight (e.g., "1,3-5,7") |
| `maxHeight` | `string` | `undefined` | Max height with scroll |
| `wordWrap` | `boolean` | `false` | Wrap long lines |
| `fileName` | `string` | `undefined` | File name to display |
| `theme` | `'dark' \| 'light'` | `'dark'` | Color theme |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxCopy` | `{ code, success }` | Code copied |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `copyCode()` | `Promise<boolean>` | Copy code to clipboard |

---

### erx-progress-circle

Circular progress indicator.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `max` | `number` | `100` | Maximum value |
| `size` | `number` | `100` | Diameter in pixels |
| `strokeWidth` | `number` | `8` | Stroke width |
| `showLabel` | `boolean` | `true` | Show percentage label |
| `labelFormat` | `'percent' \| 'value' \| 'fraction'` | `'percent'` | Label format |
| `color` | `string` | `undefined` | Progress color |
| `trackColor` | `string` | `undefined` | Track color |
| `animated` | `boolean` | `true` | Animate on change |
| `indeterminate` | `boolean` | `false` | Indeterminate state |

---

### erx-gauge

Gauge/meter visualization.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `label` | `string` | `undefined` | Label text |
| `unit` | `string` | `''` | Unit suffix |
| `size` | `number` | `200` | Gauge size |
| `startAngle` | `number` | `-135` | Start angle |
| `endAngle` | `number` | `135` | End angle |
| `thresholds` | `ErxGaugeThreshold[]` | `[]` | Color thresholds |
| `showTicks` | `boolean` | `true` | Show tick marks |
| `showValue` | `boolean` | `true` | Show value |
| `animated` | `boolean` | `true` | Animate on change |

#### Threshold Definition

```typescript
interface ErxGaugeThreshold {
  value: number;
  color: string;
  label?: string;
}
```

---

### erx-sparkline

Mini inline charts.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `number[]` | `[]` | Data points |
| `type` | `'line' \| 'bar' \| 'area'` | `'line'` | Chart type |
| `width` | `number` | `100` | Width in pixels |
| `height` | `number` | `30` | Height in pixels |
| `color` | `string` | `undefined` | Line/bar color |
| `fillColor` | `string` | `undefined` | Area fill color |
| `showDots` | `boolean` | `false` | Show data points |
| `showTooltip` | `boolean` | `false` | Show value tooltip |
| `showMinMax` | `boolean` | `false` | Highlight min/max |
| `animated` | `boolean` | `true` | Animate on render |
| `curveType` | `'linear' \| 'smooth'` | `'smooth'` | Line curve type |

---

### erx-image-zoom

Image with hover/click zoom capability.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `src` | `string` | required | Image source |
| `zoomSrc` | `string` | `undefined` | High-res image for zoom |
| `alt` | `string` | `''` | Alt text |
| `trigger` | `'hover' \| 'click' \| 'both'` | `'hover'` | Zoom trigger |
| `zoomLevel` | `number` | `2` | Zoom multiplier |
| `position` | `'overlay' \| 'lens' \| 'side'` | `'overlay'` | Zoom display mode |
| `lensSize` | `number` | `150` | Lens diameter (lens mode) |
| `smooth` | `boolean` | `true` | Smooth transitions |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxZoom` | `{ zoomed, level }` | Zoom state changed |

---

## Forms

### erx-form-builder

Dynamic form generator from JSON schema.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `schema` | `ErxFormField[]` | `[]` | Form field definitions |
| `values` | `object` | `{}` | Initial form values |
| `layout` | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` | Form layout |
| `columns` | `number` | `1` | Grid columns |
| `disabled` | `boolean` | `false` | Disable all fields |
| `readonly` | `boolean` | `false` | Readonly mode |
| `showLabels` | `boolean` | `true` | Show field labels |
| `showErrors` | `boolean` | `true` | Show validation errors |
| `validateOnChange` | `boolean` | `true` | Validate on change |
| `validateOnBlur` | `boolean` | `true` | Validate on blur |

#### Field Schema

```typescript
interface ErxFormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' |
        'textarea' | 'select' | 'multiselect' | 'checkbox' | 'radio' |
        'switch' | 'date' | 'time' | 'datetime' | 'file' | 'color' |
        'slider' | 'rating' | 'hidden';
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  defaultValue?: any;
  options?: { label: string; value: any; disabled?: boolean }[];
  min?: number;
  max?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
  helpText?: string;
  prefix?: string;
  suffix?: string;
  width?: string;
  rows?: number;
  accept?: string;
  multiple?: boolean;
  validators?: ErxValidator[];
  conditions?: ErxCondition[];
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxChange` | `{ name, value, values }` | Field changed |
| `erxSubmit` | `{ values, valid, errors }` | Form submitted |
| `erxValidate` | `{ name, valid, errors }` | Field validated |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getValues()` | `object` | Get all values |
| `setValues(values)` | `void` | Set values |
| `validate()` | `{ valid, errors }` | Validate form |
| `reset()` | `void` | Reset to initial |
| `setFieldValue(name, value)` | `void` | Set field value |
| `getFieldValue(name)` | `any` | Get field value |

---

### erx-rich-text

WYSIWYG rich text editor.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | HTML content |
| `placeholder` | `string` | `''` | Placeholder text |
| `toolbar` | `string \| string[]` | full toolbar | Toolbar buttons |
| `minHeight` | `string` | `'200px'` | Minimum height |
| `maxHeight` | `string` | `undefined` | Maximum height |
| `disabled` | `boolean` | `false` | Disable editing |
| `readonly` | `boolean` | `false` | Readonly mode |
| `autofocus` | `boolean` | `false` | Auto focus |

**Available Toolbar Options:**
`bold`, `italic`, `underline`, `strikethrough`, `subscript`, `superscript`, `heading`, `quote`, `code`, `codeblock`, `link`, `image`, `video`, `table`, `list-ul`, `list-ol`, `indent`, `outdent`, `align-left`, `align-center`, `align-right`, `align-justify`, `color`, `background`, `clear`, `undo`, `redo`, `fullscreen`

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxChange` | `{ value, html, text }` | Content changed |
| `erxFocus` | `void` | Editor focused |
| `erxBlur` | `{ value }` | Editor blurred |
| `erxImageUpload` | `{ file, callback }` | Image upload |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getHTML()` | `string` | Get HTML content |
| `getText()` | `string` | Get plain text |
| `setHTML(html)` | `void` | Set HTML content |
| `focus()` | `void` | Focus editor |
| `blur()` | `void` | Blur editor |
| `insertHTML(html)` | `void` | Insert HTML at cursor |

---

### erx-color-picker

Color selection with HSL/RGB picker.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `'#000000'` | Current color |
| `format` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Color format |
| `showAlpha` | `boolean` | `false` | Show alpha slider |
| `showInput` | `boolean` | `true` | Show color input |
| `showPresets` | `boolean` | `true` | Show preset colors |
| `presets` | `string[]` | default colors | Preset color list |
| `disabled` | `boolean` | `false` | Disable picker |
| `inline` | `boolean` | `false` | Inline mode (no popover) |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxChange` | `{ value, hex, rgb, hsl, alpha }` | Color changed |

---

### erx-phone-input

Phone input with country code selector.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Phone number (E.164) |
| `defaultCountry` | `string` | `'US'` | Default country code |
| `preferredCountries` | `string` | `''` | Comma-separated preferred |
| `onlyCountries` | `string` | `''` | Comma-separated allowed |
| `excludeCountries` | `string` | `''` | Comma-separated excluded |
| `placeholder` | `string` | `''` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable input |
| `required` | `boolean` | `false` | Required field |
| `autoFormat` | `boolean` | `true` | Auto format number |
| `showFlags` | `boolean` | `true` | Show country flags |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxChange` | `{ value, country, formatted, valid }` | Value changed |
| `erxCountryChange` | `{ country, dialCode }` | Country changed |

---

### erx-upload

File upload with drag-and-drop.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `accept` | `string` | `'*'` | Accepted file types |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `maxSize` | `number` | `Infinity` | Max file size (bytes) |
| `maxFiles` | `number` | `Infinity` | Max number of files |
| `disabled` | `boolean` | `false` | Disable upload |
| `showPreview` | `boolean` | `true` | Show file previews |
| `showProgress` | `boolean` | `true` | Show upload progress |
| `autoUpload` | `boolean` | `false` | Auto upload on select |
| `uploadUrl` | `string` | `undefined` | Upload endpoint |
| `headers` | `object` | `{}` | Upload headers |
| `withCredentials` | `boolean` | `false` | Send cookies |
| `dragText` | `string` | `'Drag files here'` | Drag area text |
| `buttonText` | `string` | `'Browse'` | Button text |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxSelect` | `{ files }` | Files selected |
| `erxUpload` | `{ file, progress, loaded, total }` | Upload progress |
| `erxComplete` | `{ file, response }` | Upload complete |
| `erxError` | `{ file, error }` | Upload error |
| `erxRemove` | `{ file }` | File removed |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `upload()` | `Promise<void>` | Start upload |
| `abort()` | `void` | Abort uploads |
| `clear()` | `void` | Clear files |
| `getFiles()` | `File[]` | Get selected files |

---

### erx-signature

Signature capture pad.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `number` | `400` | Canvas width |
| `height` | `number` | `200` | Canvas height |
| `penColor` | `string` | `'#000'` | Pen color |
| `penWidth` | `number` | `2` | Pen width |
| `backgroundColor` | `string` | `'#fff'` | Background color |
| `disabled` | `boolean` | `false` | Disable drawing |
| `showClear` | `boolean` | `true` | Show clear button |
| `showUndo` | `boolean` | `true` | Show undo button |
| `minStrokeWidth` | `number` | `0.5` | Velocity-based min width |
| `maxStrokeWidth` | `number` | `2.5` | Velocity-based max width |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxChange` | `{ empty, dataUrl }` | Signature changed |
| `erxBegin` | `void` | Drawing started |
| `erxEnd` | `void` | Drawing ended |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `clear()` | `void` | Clear signature |
| `undo()` | `void` | Undo last stroke |
| `isEmpty()` | `boolean` | Check if empty |
| `toDataURL(type?, quality?)` | `string` | Get as data URL |
| `toBlob(type?, quality?)` | `Promise<Blob>` | Get as Blob |
| `fromDataURL(dataUrl)` | `void` | Load from data URL |

---

### erx-slider

Range slider with single or dual handles.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number \| [number, number]` | `0` | Current value(s) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `range` | `boolean` | `false` | Enable range mode |
| `showTooltip` | `'always' \| 'hover' \| 'never'` | `'hover'` | Tooltip display |
| `showTicks` | `boolean` | `false` | Show tick marks |
| `showLabels` | `boolean` | `false` | Show min/max labels |
| `marks` | `ErxSliderMark[]` | `[]` | Custom marks |
| `disabled` | `boolean` | `false` | Disable slider |
| `vertical` | `boolean` | `false` | Vertical orientation |
| `color` | `string` | `undefined` | Track color |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxChange` | `{ value }` | Value changed (on release) |
| `erxInput` | `{ value }` | Value changing (while dragging) |

---

## Layout

### erx-resizable-panels

Split view with resizable panels.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Split direction |
| `sizes` | `number[]` | equal split | Panel sizes (%) |
| `minSizes` | `number[]` | `[0]` | Minimum sizes (px) |
| `maxSizes` | `number[]` | `[Infinity]` | Maximum sizes (px) |
| `gutterSize` | `number` | `8` | Gutter width (px) |
| `snapOffset` | `number` | `0` | Snap threshold (px) |
| `disabled` | `boolean` | `false` | Disable resizing |

**Usage:**
```html
<erx-resizable-panels sizes="[30,70]">
  <div slot="panel-0">Left Panel</div>
  <div slot="panel-1">Right Panel</div>
</erx-resizable-panels>
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxResize` | `{ sizes }` | Panels resized |
| `erxResizeStart` | `{ sizes }` | Resize started |
| `erxResizeEnd` | `{ sizes }` | Resize ended |

---

### erx-master-detail

Master-detail layout pattern.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `masterWidth` | `number \| string` | `'300px'` | Master panel width |
| `minMasterWidth` | `number` | `200` | Minimum width (px) |
| `maxMasterWidth` | `number` | `500` | Maximum width (px) |
| `resizable` | `boolean` | `true` | Allow resizing |
| `collapsible` | `boolean` | `true` | Allow collapsing |
| `collapsed` | `boolean` | `false` | Initial collapsed state |
| `breakpoint` | `number` | `768` | Mobile breakpoint |
| `position` | `'left' \| 'right'` | `'left'` | Master position |
| `showDetail` | `boolean` | `false` | Detail visible (mobile) |

**Usage:**
```html
<erx-master-detail>
  <div slot="master">List items...</div>
  <div slot="detail">Detail view...</div>
  <div slot="empty">Select an item</div>
</erx-master-detail>
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxCollapse` | `{ collapsed }` | Collapse toggled |
| `erxResize` | `{ width }` | Panel resized |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `collapse()` | `void` | Collapse master |
| `expand()` | `void` | Expand master |
| `toggle()` | `void` | Toggle collapse |

---

### erx-kanban

Kanban board with drag-and-drop.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `ErxKanbanColumn[]` | `[]` | Column definitions |
| `items` | `ErxKanbanItem[]` | `[]` | Card items |
| `draggable` | `boolean` | `true` | Enable drag-drop |
| `collapsible` | `boolean` | `true` | Collapsible columns |
| `showCount` | `boolean` | `true` | Show item counts |
| `showAddCard` | `boolean` | `true` | Show add card button |
| `maxHeight` | `string` | `undefined` | Max board height |
| `cardTemplate` | `string` | `undefined` | Custom card template |

#### Column Definition

```typescript
interface ErxKanbanColumn {
  id: string;
  title: string;
  color?: string;
  limit?: number;
  collapsed?: boolean;
}
```

#### Item Definition

```typescript
interface ErxKanbanItem {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  labels?: string[];
  assignee?: { name: string; avatar?: string };
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  data?: any;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxItemMove` | `{ item, fromColumn, toColumn, fromIndex, toIndex }` | Item moved |
| `erxItemClick` | `{ item }` | Item clicked |
| `erxItemAdd` | `{ columnId }` | Add card clicked |
| `erxColumnCollapse` | `{ column, collapsed }` | Column collapsed |

---

### erx-dashboard-grid

Draggable dashboard widget grid.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `number` | `12` | Grid columns |
| `rowHeight` | `number` | `100` | Row height (px) |
| `widgets` | `ErxDashboardWidget[]` | `[]` | Widget positions |
| `gap` | `number` | `16` | Gap between widgets |
| `draggable` | `boolean` | `true` | Enable dragging |
| `resizable` | `boolean` | `true` | Enable resizing |
| `compactType` | `'vertical' \| 'horizontal' \| null` | `'vertical'` | Compaction |

#### Widget Definition

```typescript
interface ErxDashboardWidget {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
}
```

**Usage:**
```html
<erx-dashboard-grid widgets='[{"id":"1","x":0,"y":0,"w":6,"h":2}]'>
  <div slot="widget-1">Widget Content</div>
</erx-dashboard-grid>
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxLayoutChange` | `{ widgets }` | Layout changed |
| `erxDragStart` | `{ widget }` | Drag started |
| `erxDragEnd` | `{ widget }` | Drag ended |
| `erxResizeStart` | `{ widget }` | Resize started |
| `erxResizeEnd` | `{ widget }` | Resize ended |

---

### erx-shell

App shell layout with header/sidebar/main/footer.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sidebarWidth` | `number` | `250` | Sidebar width (px) |
| `sidebarCollapsedWidth` | `number` | `64` | Collapsed width |
| `sidebarCollapsed` | `boolean` | `false` | Collapsed state |
| `sidebarPosition` | `'left' \| 'right'` | `'left'` | Sidebar position |
| `headerHeight` | `number` | `60` | Header height (px) |
| `footerHeight` | `number` | `50` | Footer height (px) |
| `showHeader` | `boolean` | `true` | Show header |
| `showSidebar` | `boolean` | `true` | Show sidebar |
| `showFooter` | `boolean` | `false` | Show footer |
| `resizableSidebar` | `boolean` | `false` | Resizable sidebar |

**Usage:**
```html
<erx-shell>
  <div slot="header">Header</div>
  <div slot="sidebar">Sidebar</div>
  <div slot="main">Main Content</div>
  <div slot="footer">Footer</div>
</erx-shell>
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxSidebarToggle` | `{ collapsed }` | Sidebar toggled |
| `erxSidebarResize` | `{ width }` | Sidebar resized |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `toggleSidebar()` | `void` | Toggle sidebar |
| `collapseSidebar()` | `void` | Collapse sidebar |
| `expandSidebar()` | `void` | Expand sidebar |

---

## Navigation

### erx-mega-menu

Mega menu navigation with sections.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `ErxMegaMenuItem[]` | `[]` | Menu items |
| `trigger` | `'hover' \| 'click'` | `'hover'` | Open trigger |
| `closeOnClick` | `boolean` | `true` | Close on item click |
| `closeDelay` | `number` | `150` | Close delay (ms) |

#### Menu Item Definition

```typescript
interface ErxMegaMenuItem {
  label: string;
  href?: string;
  sections?: ErxMegaMenuSection[];
  icon?: string;
}

interface ErxMegaMenuSection {
  title?: string;
  items: ErxMegaMenuLink[];
}

interface ErxMegaMenuLink {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxItemClick` | `{ item, href }` | Item clicked |
| `erxOpen` | `{ item }` | Dropdown opened |
| `erxClose` | `void` | Dropdown closed |

---

### erx-pagination

Numeric pagination with page size selector.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `total` | `number` | `0` | Total items |
| `page` | `number` | `1` | Current page |
| `pageSize` | `number` | `10` | Items per page |
| `pageSizeOptions` | `number[]` | `[10,20,50,100]` | Page size options |
| `showSizeChanger` | `boolean` | `false` | Show page size select |
| `showQuickJumper` | `boolean` | `false` | Show page input |
| `showTotal` | `boolean` | `true` | Show total count |
| `showFirstLast` | `boolean` | `true` | First/last buttons |
| `siblingCount` | `number` | `1` | Sibling pages shown |
| `simple` | `boolean` | `false` | Simple mode |
| `disabled` | `boolean` | `false` | Disable pagination |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxPageChange` | `{ page, pageSize }` | Page changed |
| `erxPageSizeChange` | `{ pageSize }` | Page size changed |

---

### erx-dropdown

Dropdown menu with nested items.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `ErxDropdownItem[]` | `[]` | Menu items |
| `trigger` | `'click' \| 'hover' \| 'contextmenu'` | `'click'` | Open trigger |
| `placement` | `string` | `'bottom-start'` | Dropdown placement |
| `closeOnSelect` | `boolean` | `true` | Close on select |
| `disabled` | `boolean` | `false` | Disable dropdown |
| `maxHeight` | `string` | `'300px'` | Max menu height |
| `minWidth` | `string` | `'150px'` | Min menu width |

#### Item Definition

```typescript
interface ErxDropdownItem {
  label: string;
  value?: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
  children?: ErxDropdownItem[];
}
```

**Usage:**
```html
<erx-dropdown items='[{"label":"Edit","value":"edit"}]'>
  <button slot="trigger">Options</button>
</erx-dropdown>
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxSelect` | `{ item, value }` | Item selected |
| `erxOpen` | `void` | Dropdown opened |
| `erxClose` | `void` | Dropdown closed |

---

### erx-context-menu

Right-click context menu.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `ErxContextMenuItem[]` | `[]` | Menu items |
| `target` | `string \| HTMLElement` | `undefined` | Target element/selector |
| `disabled` | `boolean` | `false` | Disable menu |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxSelect` | `{ item, target, event }` | Item selected |
| `erxOpen` | `{ x, y, target }` | Menu opened |
| `erxClose` | `void` | Menu closed |

---

### erx-command

Command palette (Cmd+K style).

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `commands` | `ErxCommand[]` | `[]` | Available commands |
| `open` | `boolean` | `false` | Open state |
| `placeholder` | `string` | `'Type a command...'` | Search placeholder |
| `shortcut` | `string` | `'Cmd+K'` | Open shortcut |
| `maxResults` | `number` | `10` | Max visible results |
| `groupBy` | `string` | `undefined` | Group by field |
| `showShortcuts` | `boolean` | `true` | Show shortcuts |
| `emptyMessage` | `string` | `'No results'` | Empty message |

#### Command Definition

```typescript
interface ErxCommand {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  shortcut?: string;
  group?: string;
  keywords?: string[];
  disabled?: boolean;
  action?: () => void;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxSelect` | `{ command }` | Command selected |
| `erxOpen` | `void` | Palette opened |
| `erxClose` | `void` | Palette closed |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `show()` | `void` | Open palette |
| `hide()` | `void` | Close palette |

---

### erx-load-more

Infinite scroll / load more button.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `'button' \| 'infinite' \| 'auto'` | `'button'` | Load mode |
| `loadText` | `string` | `'Load More'` | Button text |
| `loadingText` | `string` | `'Loading...'` | Loading text |
| `completeText` | `string` | `'All items loaded'` | Complete text |
| `errorText` | `string` | `'Failed to load'` | Error text |
| `retryText` | `string` | `'Retry'` | Retry button text |
| `threshold` | `number` | `200` | Scroll threshold (px) |
| `disabled` | `boolean` | `false` | Disable component |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxLoadMore` | `{ page, done, error }` | Load more triggered |

**Usage:**
```html
<erx-load-more mode="infinite" @erxLoadMore="handleLoad">
</erx-load-more>

<script>
function handleLoad(event) {
  const { page, done, error } = event.detail;

  fetchData(page)
    .then(data => {
      // Add data to list
      done(data.hasMore); // true = more available, false = complete
    })
    .catch(err => {
      error(err.message);
    });
}
</script>
```

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `reset()` | `void` | Reset to initial state |
| `complete()` | `void` | Mark as complete |

---

## Overlays

### erx-drawer

Side drawer panel.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Open state |
| `position` | `'left' \| 'right'` | `'right'` | Drawer position |
| `width` | `number \| string` | `'400px'` | Drawer width |
| `title` | `string` | `undefined` | Drawer title |
| `showClose` | `boolean` | `true` | Show close button |
| `backdropDismiss` | `boolean` | `true` | Close on backdrop |
| `escDismiss` | `boolean` | `true` | Close on Escape |
| `showBackdrop` | `boolean` | `true` | Show backdrop |

**Usage:**
```html
<erx-drawer title="Settings">
  <div>Drawer content...</div>
  <div slot="footer">
    <button>Save</button>
  </div>
</erx-drawer>
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxOpen` | `void` | Drawer opened |
| `erxClose` | `void` | Drawer closed |
| `erxBackdropClick` | `void` | Backdrop clicked |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `show()` | `void` | Open drawer |
| `hide()` | `void` | Close drawer |

---

### erx-sheet

Bottom/top sheet with drag gestures.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Open state |
| `position` | `'bottom' \| 'top'` | `'bottom'` | Sheet position |
| `snapPoints` | `number[]` | `[0.5, 1]` | Snap points (0-1) |
| `initialSnap` | `number` | `0` | Initial snap index |
| `showHandle` | `boolean` | `true` | Show drag handle |
| `backdropDismiss` | `boolean` | `true` | Close on backdrop |
| `escDismiss` | `boolean` | `true` | Close on Escape |
| `modal` | `boolean` | `true` | Modal behavior |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxOpen` | `void` | Sheet opened |
| `erxClose` | `void` | Sheet closed |
| `erxSnap` | `{ snapPoint, index }` | Snapped to point |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `show()` | `void` | Open sheet |
| `hide()` | `void` | Close sheet |
| `snapTo(index)` | `void` | Snap to point |

---

### erx-lightbox

Fullscreen image viewer with zoom.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `images` | `ErxLightboxImage[]` | `[]` | Image array |
| `startIndex` | `number` | `0` | Starting image |
| `open` | `boolean` | `false` | Open state |
| `showNav` | `boolean` | `true` | Show navigation |
| `showThumbnails` | `boolean` | `true` | Show thumbnails |
| `showCounter` | `boolean` | `true` | Show image counter |
| `showCaption` | `boolean` | `true` | Show captions |
| `enableZoom` | `boolean` | `true` | Enable zoom |
| `maxZoom` | `number` | `3` | Max zoom level |
| `enableSlideshow` | `boolean` | `false` | Enable slideshow |
| `slideshowInterval` | `number` | `3000` | Slideshow interval |
| `backdropDismiss` | `boolean` | `true` | Close on backdrop |
| `keyboardNav` | `boolean` | `true` | Keyboard navigation |
| `swipeNav` | `boolean` | `true` | Swipe navigation |

#### Image Definition

```typescript
interface ErxLightboxImage {
  src: string;
  thumbnail?: string;
  alt?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxOpen` | `{ index }` | Lightbox opened |
| `erxClose` | `void` | Lightbox closed |
| `erxSlide` | `{ index, image }` | Image changed |
| `erxZoom` | `{ zoom }` | Zoom changed |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `show(index?)` | `void` | Open lightbox |
| `hide()` | `void` | Close lightbox |
| `next()` | `void` | Next image |
| `prev()` | `void` | Previous image |
| `goTo(index)` | `void` | Go to image |
| `zoomIn()` | `void` | Zoom in |
| `zoomOut()` | `void` | Zoom out |
| `resetZoom()` | `void` | Reset zoom |

---

### erx-fullscreen-modal

Full-screen takeover modal.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Open state |
| `modalTitle` | `string` | `undefined` | Modal title |
| `showClose` | `boolean` | `true` | Show close button |
| `showHeader` | `boolean` | `true` | Show header |
| `escapeClose` | `boolean` | `true` | Close on Escape |
| `animation` | `'fade' \| 'slide-up' \| 'zoom'` | `'fade'` | Animation |
| `background` | `string` | `undefined` | Background color |

**Usage:**
```html
<erx-fullscreen-modal modal-title="Edit Item">
  <div>Modal content...</div>
  <div slot="header-actions">
    <button>Save</button>
  </div>
  <div slot="footer">Footer content</div>
</erx-fullscreen-modal>
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxOpen` | `void` | Modal opened |
| `erxClose` | `void` | Modal closed |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `show()` | `void` | Open modal |
| `close()` | `void` | Close modal |

---

### erx-snackbar

Brief notification at bottom of screen.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Visible state |
| `message` | `string` | `''` | Message text |
| `variant` | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Variant |
| `duration` | `number` | `4000` | Auto-hide duration (ms), 0 = persistent |
| `position` | `'bottom' \| 'bottom-left' \| 'bottom-right' \| 'top' \| 'top-left' \| 'top-right'` | `'bottom'` | Position |
| `actionText` | `string` | `undefined` | Action button text |
| `showClose` | `boolean` | `false` | Show close button |
| `icon` | `string` | `undefined` | Custom icon |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxClose` | `void` | Snackbar closed |
| `erxAction` | `void` | Action clicked |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `show(message?)` | `void` | Show snackbar |
| `hide()` | `void` | Hide snackbar |

---

### erx-notifications

Notification center panel.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `notifications` | `ErxNotification[]` | `[]` | Notifications list |
| `open` | `boolean` | `false` | Panel open state |
| `maxVisible` | `number` | `5` | Max visible items |
| `showTimestamp` | `boolean` | `true` | Show timestamps |
| `showActions` | `boolean` | `true` | Show action buttons |
| `showMarkAllRead` | `boolean` | `true` | Show mark all read |
| `emptyMessage` | `string` | `'No notifications'` | Empty text |
| `title` | `string` | `'Notifications'` | Panel title |

#### Notification Definition

```typescript
interface ErxNotification {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  read?: boolean;
  timestamp?: string | Date;
  avatar?: string;
  actions?: { label: string; value: string }[];
  data?: any;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxNotificationClick` | `{ notification }` | Notification clicked |
| `erxNotificationAction` | `{ notification, action }` | Action clicked |
| `erxMarkRead` | `{ notification }` | Marked as read |
| `erxMarkAllRead` | `void` | All marked read |
| `erxDismiss` | `{ notification }` | Notification dismissed |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `show()` | `void` | Open panel |
| `hide()` | `void` | Close panel |
| `markRead(id)` | `void` | Mark as read |
| `markAllRead()` | `void` | Mark all read |
| `dismiss(id)` | `void` | Dismiss notification |

---

## Feedback

### erx-state

Empty state / error state / loading state display.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'empty' \| 'error' \| 'loading' \| 'success' \| 'custom'` | `'empty'` | State type |
| `stateTitle` | `string` | auto | Title text |
| `description` | `string` | `undefined` | Description text |
| `icon` | `string` | auto | Custom icon |
| `actionText` | `string` | `undefined` | Primary button |
| `secondaryActionText` | `string` | `undefined` | Secondary button |
| `compact` | `boolean` | `false` | Compact mode |

**Usage:**
```html
<erx-state
  type="empty"
  state-title="No items found"
  description="Try adjusting your search"
  action-text="Reset Filters"
>
  <div slot="icon">🔍</div>
  <div slot="content">Additional content</div>
</erx-state>
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxAction` | `{ action: 'primary' \| 'secondary' }` | Action clicked |

---

### erx-banner

Full-width notification banner.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `visible` | `boolean` | `true` | Visible state |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'info'` | Variant |
| `position` | `'top' \| 'bottom' \| 'inline'` | `'inline'` | Position |
| `dismissible` | `boolean` | `true` | Show dismiss button |
| `icon` | `string` | auto | Custom icon |
| `actionText` | `string` | `undefined` | Action button text |
| `sticky` | `boolean` | `false` | Sticky on scroll |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxDismiss` | `void` | Banner dismissed |
| `erxAction` | `void` | Action clicked |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `show()` | `void` | Show banner |
| `hide()` | `void` | Hide banner |

---

### erx-callout

Highlighted information box.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error' \| 'tip' \| 'note'` | `'info'` | Variant |
| `calloutTitle` | `string` | auto | Title text |
| `icon` | `string` | auto | Custom icon |
| `collapsible` | `boolean` | `false` | Collapsible |
| `collapsed` | `boolean` | `false` | Initial collapsed |

---

## Buttons

### erx-button-group

Group of related buttons.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Button variant |
| `vertical` | `boolean` | `false` | Vertical layout |
| `fullWidth` | `boolean` | `false` | Full width |
| `disabled` | `boolean` | `false` | Disable all |

**Usage:**
```html
<erx-button-group>
  <button>Left</button>
  <button>Center</button>
  <button>Right</button>
</erx-button-group>
```

---

### erx-split-button

Button with dropdown for secondary actions.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `'Action'` | Primary button label |
| `options` | `ErxSplitButtonOption[]` | `[]` | Dropdown options |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Variant |
| `disabled` | `boolean` | `false` | Disable button |
| `loading` | `boolean` | `false` | Loading state |

#### Option Definition

```typescript
interface ErxSplitButtonOption {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxClick` | `void` | Primary button clicked |
| `erxSelect` | `{ value, option }` | Option selected |

---

### erx-status-indicator

Visual status badge/dot.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `status` | `'online' \| 'offline' \| 'away' \| 'busy' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'neutral'` | Status |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `variant` | `'dot' \| 'badge' \| 'pill'` | `'dot'` | Display variant |
| `label` | `string` | auto | Label text |
| `pulse` | `boolean` | `false` | Pulse animation |

---

## POS

### erx-pos-cart

Shopping cart with line items, totals, and actions.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `ErxCartItem[]` | `[]` | Cart items |
| `taxRate` | `number` | `0` | Tax rate (0-1) |
| `currency` | `string` | `'USD'` | Currency code |
| `showImages` | `boolean` | `true` | Show product images |
| `editable` | `boolean` | `true` | Allow editing |
| `showDiscount` | `boolean` | `true` | Show discount field |
| `showNotes` | `boolean` | `true` | Show item notes |
| `discountType` | `'percent' \| 'fixed'` | `'percent'` | Discount type |
| `discount` | `number` | `0` | Discount amount |

#### Cart Item Definition

```typescript
interface ErxCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  sku?: string;
  notes?: string;
  modifiers?: { name: string; price: number }[];
  discount?: number;
  taxable?: boolean;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxItemUpdate` | `{ item, quantity, field }` | Item updated |
| `erxItemRemove` | `{ item }` | Item removed |
| `erxItemClick` | `{ item }` | Item clicked |
| `erxDiscountChange` | `{ type, amount }` | Discount changed |
| `erxCheckout` | `{ items, subtotal, tax, discount, total }` | Checkout clicked |
| `erxClear` | `void` | Cart cleared |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `addItem(item)` | `void` | Add item |
| `updateItem(id, updates)` | `void` | Update item |
| `removeItem(id)` | `void` | Remove item |
| `clear()` | `void` | Clear cart |
| `getTotals()` | `{ subtotal, tax, discount, total }` | Get totals |

---

### erx-pos-keypad

Numeric keypad for POS input.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Current value |
| `mode` | `'number' \| 'currency' \| 'quantity' \| 'phone'` | `'number'` | Input mode |
| `maxValue` | `number` | `Infinity` | Maximum value |
| `minValue` | `number` | `0` | Minimum value |
| `decimalPlaces` | `number` | `2` | Decimal places |
| `showClear` | `boolean` | `true` | Show clear button |
| `showBackspace` | `boolean` | `true` | Show backspace |
| `showSubmit` | `boolean` | `true` | Show submit button |
| `submitText` | `string` | `'Enter'` | Submit button text |
| `disabled` | `boolean` | `false` | Disable keypad |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxChange` | `{ value, numericValue }` | Value changed |
| `erxSubmit` | `{ value, numericValue }` | Submit pressed |
| `erxClear` | `void` | Cleared |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `clear()` | `void` | Clear value |
| `setValue(value)` | `void` | Set value |

---

### erx-pos-payment

Payment method selector and processor.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `total` | `number` | `0` | Total amount |
| `currency` | `string` | `'USD'` | Currency code |
| `methods` | `ErxPaymentMethod[]` | defaults | Payment methods |
| `splitPayment` | `boolean` | `false` | Allow split payment |
| `showTendered` | `boolean` | `true` | Show tendered amount |
| `showChange` | `boolean` | `true` | Show change due |
| `quickAmounts` | `number[]` | auto | Quick cash amounts |

#### Payment Method Definition

```typescript
interface ErxPaymentMethod {
  id: string;
  name: string;
  icon?: string;
  type: 'cash' | 'card' | 'wallet' | 'other';
  enabled?: boolean;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxPayment` | `{ method, amount, tendered, change }` | Payment made |
| `erxMethodSelect` | `{ method }` | Method selected |
| `erxCancel` | `void` | Payment cancelled |

---

### erx-pos-product-grid

Product grid with categories and search.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `products` | `ErxProduct[]` | `[]` | Product list |
| `categories` | `ErxCategory[]` | `[]` | Categories |
| `columns` | `number` | `4` | Grid columns |
| `showSearch` | `boolean` | `true` | Show search bar |
| `showCategories` | `boolean` | `true` | Show category tabs |
| `showPrices` | `boolean` | `true` | Show prices |
| `showStock` | `boolean` | `false` | Show stock status |
| `cardSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Card size |
| `imageAspect` | `'square' \| '4:3' \| '16:9'` | `'square'` | Image aspect |

#### Product Definition

```typescript
interface ErxProduct {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  sku?: string;
  barcode?: string;
  stock?: number;
  color?: string;
  variants?: ErxProductVariant[];
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxProductClick` | `{ product }` | Product clicked |
| `erxCategoryChange` | `{ category }` | Category changed |
| `erxSearch` | `{ query }` | Search performed |

---

### erx-pos-receipt

Receipt preview and print.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `ErxReceiptItem[]` | `[]` | Line items |
| `storeName` | `string` | `''` | Store name |
| `storeAddress` | `string` | `''` | Store address |
| `storePhone` | `string` | `''` | Store phone |
| `receiptNumber` | `string` | auto | Receipt number |
| `date` | `string` | now | Receipt date |
| `subtotal` | `number` | calculated | Subtotal |
| `tax` | `number` | `0` | Tax amount |
| `taxLabel` | `string` | `'Tax'` | Tax label |
| `discount` | `number` | `0` | Discount |
| `total` | `number` | calculated | Total |
| `paymentMethod` | `string` | `''` | Payment method |
| `tendered` | `number` | `0` | Amount tendered |
| `change` | `number` | `0` | Change due |
| `showBarcode` | `boolean` | `true` | Show barcode |
| `footerText` | `string` | `''` | Footer message |
| `width` | `number` | `300` | Receipt width (px) |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `print()` | `Promise<void>` | Print receipt |
| `download(format?)` | `Promise<void>` | Download as PDF/image |
| `getHTML()` | `string` | Get HTML content |

---

## HR

### erx-org-chart

Interactive organization chart.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `ErxOrgNode` | `null` | Root node |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout |
| `collapsible` | `boolean` | `true` | Collapsible nodes |
| `showPhotos` | `boolean` | `true` | Show photos |
| `showTitles` | `boolean` | `true` | Show job titles |
| `showDepartments` | `boolean` | `false` | Show departments |
| `zoomable` | `boolean` | `true` | Enable zoom |
| `pannable` | `boolean` | `true` | Enable pan |
| `minZoom` | `number` | `0.5` | Minimum zoom |
| `maxZoom` | `number` | `2` | Maximum zoom |
| `nodeWidth` | `number` | `200` | Node width |
| `nodeHeight` | `number` | `80` | Node height |

#### Node Definition

```typescript
interface ErxOrgNode {
  id: string;
  name: string;
  title?: string;
  department?: string;
  photo?: string;
  email?: string;
  phone?: string;
  children?: ErxOrgNode[];
  collapsed?: boolean;
  data?: any;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxNodeClick` | `{ node }` | Node clicked |
| `erxNodeExpand` | `{ node, expanded }` | Node expanded/collapsed |
| `erxZoom` | `{ zoom }` | Zoom changed |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `expandAll()` | `void` | Expand all nodes |
| `collapseAll()` | `void` | Collapse all nodes |
| `zoomIn()` | `void` | Zoom in |
| `zoomOut()` | `void` | Zoom out |
| `fitToScreen()` | `void` | Fit chart to screen |
| `centerNode(id)` | `void` | Center on node |

---

### erx-timesheet

Weekly timesheet entry grid.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `weekStart` | `string` | current week | Week start date (ISO) |
| `projects` | `ErxProject[]` | `[]` | Available projects |
| `entries` | `ErxTimesheetEntry[]` | `[]` | Time entries |
| `maxHoursPerDay` | `number` | `24` | Max daily hours |
| `minHoursPerDay` | `number` | `0` | Min daily hours |
| `readOnly` | `boolean` | `false` | Readonly mode |
| `showTotals` | `boolean` | `true` | Show totals |
| `showWeekends` | `boolean` | `true` | Show weekends |
| `allowOvertime` | `boolean` | `true` | Allow overtime |
| `step` | `number` | `0.25` | Hour increment |

#### Entry Definition

```typescript
interface ErxTimesheetEntry {
  id?: string;
  projectId: string;
  date: string;
  hours: number;
  notes?: string;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxChange` | `{ entries, totals }` | Entries changed |
| `erxSubmit` | `{ entries, weekStart, totals }` | Submitted |
| `erxWeekChange` | `{ weekStart }` | Week changed |

---

## Calendar & Scheduling

### erx-calendar

Full-featured calendar with month/week/day views.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `view` | `'month' \| 'week' \| 'day' \| 'agenda'` | `'month'` | Current view |
| `date` | `string` | today | Selected date (ISO) |
| `events` | `ErxCalendarEvent[]` | `[]` | Events |
| `selectable` | `boolean` | `true` | Enable selection |
| `editable` | `boolean` | `true` | Enable editing |
| `showWeekNumbers` | `boolean` | `false` | Show week numbers |
| `showAllDay` | `boolean` | `true` | Show all-day section |
| `minTime` | `string` | `'00:00'` | Day start time |
| `maxTime` | `string` | `'24:00'` | Day end time |
| `slotDuration` | `string` | `'00:30'` | Time slot duration |
| `firstDayOfWeek` | `number` | `0` | First day (0=Sun) |
| `businessHours` | `object` | `undefined` | Business hours |
| `nowIndicator` | `boolean` | `true` | Show current time |

#### Event Definition

```typescript
interface ErxCalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  color?: string;
  textColor?: string;
  editable?: boolean;
  resourceId?: string;
  data?: any;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxDateSelect` | `{ start, end, allDay }` | Date range selected |
| `erxEventClick` | `{ event }` | Event clicked |
| `erxEventDrop` | `{ event, oldStart, newStart }` | Event moved |
| `erxEventResize` | `{ event, newEnd }` | Event resized |
| `erxViewChange` | `{ view }` | View changed |
| `erxDateChange` | `{ date }` | Date navigated |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `today()` | `void` | Go to today |
| `prev()` | `void` | Previous period |
| `next()` | `void` | Next period |
| `gotoDate(date)` | `void` | Go to date |
| `changeView(view)` | `void` | Change view |
| `addEvent(event)` | `void` | Add event |
| `updateEvent(id, updates)` | `void` | Update event |
| `removeEvent(id)` | `void` | Remove event |
| `getEvents()` | `ErxCalendarEvent[]` | Get all events |

---

### erx-gantt

Gantt chart for project planning.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tasks` | `ErxGanttTask[]` | `[]` | Tasks |
| `viewMode` | `'day' \| 'week' \| 'month' \| 'quarter' \| 'year'` | `'week'` | Timeline scale |
| `startDate` | `string` | auto | Start date |
| `endDate` | `string` | auto | End date |
| `showDependencies` | `boolean` | `true` | Show dependencies |
| `showProgress` | `boolean` | `true` | Show progress bars |
| `showToday` | `boolean` | `true` | Show today line |
| `draggable` | `boolean` | `true` | Enable dragging |
| `resizable` | `boolean` | `true` | Enable resizing |
| `rowHeight` | `number` | `40` | Row height |
| `headerHeight` | `number` | `50` | Header height |
| `barHeight` | `number` | `20` | Bar height |
| `barCornerRadius` | `number` | `3` | Bar radius |
| `padding` | `number` | `10` | Bar padding |

#### Task Definition

```typescript
interface ErxGanttTask {
  id: string;
  name: string;
  start: string;
  end: string;
  progress?: number;
  dependencies?: string[];
  color?: string;
  assignee?: string;
  type?: 'task' | 'milestone' | 'project';
  collapsed?: boolean;
  children?: ErxGanttTask[];
  data?: any;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxTaskClick` | `{ task }` | Task clicked |
| `erxTaskDoubleClick` | `{ task }` | Task double-clicked |
| `erxTaskChange` | `{ task, field, oldValue, newValue }` | Task changed |
| `erxProgressChange` | `{ task, progress }` | Progress changed |
| `erxViewChange` | `{ viewMode }` | View changed |

---

## Multimedia

### erx-video-player

Custom video player with controls.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `src` | `string` | required | Video URL |
| `sources` | `ErxVideoSource[]` | `[]` | Multiple sources |
| `poster` | `string` | `''` | Poster image |
| `autoplay` | `boolean` | `false` | Auto play |
| `loop` | `boolean` | `false` | Loop video |
| `muted` | `boolean` | `false` | Start muted |
| `controls` | `boolean` | `true` | Show controls |
| `preload` | `'none' \| 'metadata' \| 'auto'` | `'metadata'` | Preload |
| `pip` | `boolean` | `true` | Picture-in-picture |
| `fullscreen` | `boolean` | `true` | Fullscreen button |
| `playbackRates` | `number[]` | `[0.5,1,1.5,2]` | Speed options |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxPlay` | `void` | Playback started |
| `erxPause` | `void` | Playback paused |
| `erxEnded` | `void` | Playback ended |
| `erxTimeUpdate` | `{ currentTime, duration }` | Time update |
| `erxVolumeChange` | `{ volume, muted }` | Volume changed |
| `erxFullscreen` | `{ fullscreen }` | Fullscreen toggled |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `play()` | `Promise<void>` | Play video |
| `pause()` | `void` | Pause video |
| `seek(time)` | `void` | Seek to time |
| `setVolume(vol)` | `void` | Set volume (0-1) |
| `toggleMute()` | `void` | Toggle mute |
| `toggleFullscreen()` | `Promise<void>` | Toggle fullscreen |

---

### erx-audio-player

Audio player with waveform.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `src` | `string` | required | Audio URL |
| `trackTitle` | `string` | `''` | Track title |
| `artist` | `string` | `''` | Artist name |
| `cover` | `string` | `''` | Cover art URL |
| `autoplay` | `boolean` | `false` | Auto play |
| `loop` | `boolean` | `false` | Loop audio |
| `muted` | `boolean` | `false` | Start muted |
| `showTime` | `boolean` | `true` | Show time |
| `showVolume` | `boolean` | `true` | Volume control |
| `showSpeed` | `boolean` | `false` | Speed control |
| `compact` | `boolean` | `false` | Compact mode |
| `preload` | `'none' \| 'metadata' \| 'auto'` | `'metadata'` | Preload |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxPlay` | `void` | Playback started |
| `erxPause` | `void` | Playback paused |
| `erxEnded` | `void` | Playback ended |
| `erxTimeUpdate` | `{ currentTime, duration }` | Time update |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `play()` | `Promise<void>` | Play audio |
| `pause()` | `void` | Pause audio |
| `seek(time)` | `void` | Seek to time |

---

### erx-qr-code

QR code generator.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | required | Data to encode |
| `size` | `number` | `200` | QR code size |
| `errorCorrection` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | Error correction |
| `foreground` | `string` | `'#000'` | Foreground color |
| `background` | `string` | `'#fff'` | Background color |
| `logo` | `string` | `''` | Center logo URL |
| `logoSize` | `number` | `50` | Logo size |
| `logoBorderRadius` | `number` | `0` | Logo border radius |
| `margin` | `number` | `4` | Quiet zone margin |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `toDataURL(type?)` | `string` | Get as data URL |
| `toBlob(type?)` | `Promise<Blob>` | Get as Blob |
| `download(filename?)` | `void` | Download image |

---

### erx-barcode-scanner

Camera-based barcode scanner.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `formats` | `string` | all | Barcode formats |
| `facingMode` | `'user' \| 'environment'` | `'environment'` | Camera |
| `active` | `boolean` | `false` | Scanner active |
| `torch` | `boolean` | `false` | Flashlight |
| `beep` | `boolean` | `true` | Beep on scan |
| `vibrate` | `boolean` | `true` | Vibrate on scan |
| `scanInterval` | `number` | `100` | Scan interval (ms) |
| `showOverlay` | `boolean` | `true` | Show scan overlay |

**Supported Formats:** `code_128`, `code_39`, `code_93`, `ean_13`, `ean_8`, `upc_a`, `upc_e`, `itf`, `codabar`, `qr_code`, `data_matrix`, `pdf_417`, `aztec`

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxScan` | `{ value, format, rawValue }` | Barcode scanned |
| `erxError` | `{ error }` | Scanner error |
| `erxStart` | `void` | Scanner started |
| `erxStop` | `void` | Scanner stopped |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `start()` | `Promise<void>` | Start scanning |
| `stop()` | `void` | Stop scanning |
| `toggleTorch()` | `void` | Toggle flashlight |
| `switchCamera()` | `void` | Switch camera |

---

### erx-image-gallery

Image gallery with grid/masonry layout.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `images` | `ErxGalleryImage[]` | `[]` | Images |
| `layout` | `'grid' \| 'masonry'` | `'grid'` | Layout type |
| `columns` | `number` | `3` | Grid columns |
| `gap` | `number` | `8` | Gap between images |
| `lightbox` | `boolean` | `true` | Open in lightbox |
| `selectable` | `boolean` | `false` | Enable selection |
| `selectMode` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `showCaption` | `boolean` | `false` | Show captions |
| `aspectRatio` | `string` | `undefined` | Fixed aspect ratio |
| `lazy` | `boolean` | `true` | Lazy load images |

#### Image Definition

```typescript
interface ErxGalleryImage {
  src: string;
  thumbnail?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  data?: any;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxImageClick` | `{ image, index }` | Image clicked |
| `erxSelect` | `{ images, indexes }` | Selection changed |

---

### erx-carousel

Image/content carousel.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `slides` | `ErxCarouselSlide[]` | `[]` | Slide items |
| `autoplay` | `boolean` | `false` | Auto advance |
| `autoplayInterval` | `number` | `5000` | Interval (ms) |
| `loop` | `boolean` | `false` | Infinite loop |
| `showArrows` | `boolean` | `true` | Navigation arrows |
| `showDots` | `boolean` | `true` | Dot indicators |
| `slidesPerView` | `number` | `1` | Visible slides |
| `spacing` | `number` | `0` | Slide spacing |
| `centered` | `boolean` | `false` | Center active |
| `draggable` | `boolean` | `true` | Enable drag |
| `pauseOnHover` | `boolean` | `true` | Pause autoplay |

#### Slide Definition

```typescript
interface ErxCarouselSlide {
  image?: string;
  title?: string;
  description?: string;
  href?: string;
  content?: string;
}
```

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxSlideChange` | `{ index, slide }` | Slide changed |
| `erxSlideClick` | `{ index, slide }` | Slide clicked |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `next()` | `void` | Next slide |
| `prev()` | `void` | Previous slide |
| `goTo(index)` | `void` | Go to slide |
| `play()` | `void` | Start autoplay |
| `pause()` | `void` | Pause autoplay |

---

### erx-image-crop

Image cropping tool.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `src` | `string` | required | Image source |
| `aspectRatio` | `number` | `undefined` | Fixed aspect ratio |
| `minWidth` | `number` | `0` | Minimum crop width |
| `minHeight` | `number` | `0` | Minimum crop height |
| `maxWidth` | `number` | `Infinity` | Maximum crop width |
| `maxHeight` | `number` | `Infinity` | Maximum crop height |
| `outputType` | `'blob' \| 'dataurl' \| 'canvas'` | `'blob'` | Output type |
| `outputQuality` | `number` | `0.92` | JPEG quality |
| `outputFormat` | `'jpeg' \| 'png' \| 'webp'` | `'jpeg'` | Output format |
| `circular` | `boolean` | `false` | Circular crop |
| `guides` | `boolean` | `true` | Show guides |
| `centerIndicator` | `boolean` | `true` | Show center |
| `zoomable` | `boolean` | `true` | Enable zoom |
| `rotatable` | `boolean` | `false` | Enable rotation |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxCrop` | `{ x, y, width, height, rotation, zoom }` | Crop changed |
| `erxReady` | `void` | Image loaded |
| `erxError` | `{ error }` | Load error |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getCroppedImage()` | `Promise<Blob \| string \| HTMLCanvasElement>` | Get result |
| `reset()` | `void` | Reset crop area |
| `rotate(degrees)` | `void` | Rotate image |
| `zoom(scale)` | `void` | Zoom image |
| `setAspectRatio(ratio)` | `void` | Set aspect ratio |

---

### erx-pdf-viewer

PDF document viewer.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `src` | `string` | required | PDF URL or data |
| `page` | `number` | `1` | Current page |
| `zoom` | `number` | `1` | Zoom level |
| `rotation` | `number` | `0` | Rotation (0,90,180,270) |
| `showToolbar` | `boolean` | `true` | Show toolbar |
| `showPageNav` | `boolean` | `true` | Page navigation |
| `showZoom` | `boolean` | `true` | Zoom controls |
| `showRotate` | `boolean` | `false` | Rotate button |
| `showDownload` | `boolean` | `true` | Download button |
| `showPrint` | `boolean` | `true` | Print button |
| `fitWidth` | `boolean` | `false` | Fit to width |
| `fitHeight` | `boolean` | `false` | Fit to height |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `erxPageChange` | `{ page, totalPages }` | Page changed |
| `erxZoomChange` | `{ zoom }` | Zoom changed |
| `erxLoad` | `{ totalPages }` | PDF loaded |
| `erxError` | `{ error }` | Load error |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `goToPage(page)` | `void` | Go to page |
| `nextPage()` | `void` | Next page |
| `prevPage()` | `void` | Previous page |
| `zoomIn()` | `void` | Zoom in |
| `zoomOut()` | `void` | Zoom out |
| `rotate(degrees)` | `void` | Rotate |
| `print()` | `void` | Print PDF |
| `download()` | `void` | Download PDF |

---

## Global CSS Custom Properties

All components use these CSS custom properties for consistent theming:

```css
:root {
  /* Colors */
  --erx-color-primary: #667eea;
  --erx-color-primary-dark: #5a67d8;
  --erx-color-primary-light: #eef2ff;
  --erx-color-success: #10b981;
  --erx-color-warning: #f59e0b;
  --erx-color-danger: #ef4444;
  --erx-color-info: #3b82f6;

  /* Surfaces */
  --erx-surface: #ffffff;
  --erx-surface-secondary: #f9fafb;
  --erx-surface-tertiary: #f3f4f6;
  --erx-surface-inverse: #1f2937;
  --erx-surface-code: #1e1e1e;

  /* Text */
  --erx-text: #111827;
  --erx-text-secondary: #6b7280;
  --erx-text-tertiary: #9ca3af;
  --erx-text-inverse: #ffffff;

  /* Borders */
  --erx-border-color: #e5e7eb;
  --erx-border-radius: 8px;
  --erx-border-radius-sm: 4px;
  --erx-border-radius-lg: 12px;

  /* Shadows */
  --erx-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --erx-shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --erx-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);

  /* Spacing */
  --erx-space-xs: 4px;
  --erx-space-sm: 8px;
  --erx-space-md: 16px;
  --erx-space-lg: 24px;
  --erx-space-xl: 32px;

  /* Typography */
  --erx-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --erx-font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;

  /* Touch */
  --erx-touch-target: 44px;

  /* Transitions */
  --erx-transition-fast: 150ms;
  --erx-transition-normal: 200ms;
  --erx-transition-slow: 300ms;
}
```

---

Built with ❤️ by ERPlora Team
