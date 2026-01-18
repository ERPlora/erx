# erx-data-grid



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                          | Type                                | Default               |
| --------------- | ---------------- | ---------------------------------------------------- | ----------------------------------- | --------------------- |
| `bordered`      | `bordered`       | Show borders                                         | `boolean`                           | `false`               |
| `columns`       | --               | Column definitions                                   | `ErxColumn[]`                       | `[]`                  |
| `compact`       | `compact`        | Compact row height                                   | `boolean`                           | `false`               |
| `currentPage`   | `current-page`   | Current page (1-indexed)                             | `number`                            | `1`                   |
| `data`          | --               | Row data array                                       | `Record<string, unknown>[]`         | `[]`                  |
| `editable`      | `editable`       | Enable inline cell editing                           | `boolean`                           | `false`               |
| `emptyMessage`  | `empty-message`  | Message when no data                                 | `string`                            | `'No data available'` |
| `filterable`    | `filterable`     | Enable column filtering                              | `boolean`                           | `false`               |
| `groupBy`       | `group-by`       | Field to group rows by                               | `string \| undefined`               | `undefined`           |
| `hover`         | `hover`          | Enable row hover effect                              | `boolean`                           | `true`                |
| `loading`       | `loading`        | Show loading state                                   | `boolean`                           | `false`               |
| `pageSize`      | `page-size`      | Rows per page                                        | `number`                            | `25`                  |
| `paginate`      | `paginate`       | Enable pagination                                    | `boolean`                           | `false`               |
| `rowHeight`     | `row-height`     | Row height in pixels for virtual scroll              | `number`                            | `48`                  |
| `rowKey`        | `row-key`        | Field to use as unique row identifier                | `string`                            | `'id'`                |
| `selectable`    | `selectable`     | Enable row selection: false, 'single', or 'multiple' | `"multiple" \| "single" \| boolean` | `false`               |
| `selected`      | --               | Currently selected row keys                          | `string[]`                          | `[]`                  |
| `sortable`      | `sortable`       | Enable column sorting                                | `boolean`                           | `true`                |
| `striped`       | `striped`        | Enable striped rows                                  | `boolean`                           | `false`               |
| `totalRows`     | `total-rows`     | Total rows (for server-side pagination)              | `number \| undefined`               | `undefined`           |
| `virtualScroll` | `virtual-scroll` | Enable virtual scrolling for large datasets          | `boolean`                           | `false`               |
| `visibleRows`   | `visible-rows`   | Number of visible rows for virtual scroll            | `number`                            | `15`                  |


## Events

| Event               | Description                          | Type                                 |
| ------------------- | ------------------------------------ | ------------------------------------ |
| `erxCellEdit`       | Emitted when cell edit is committed  | `CustomEvent<ErxCellEditEvent>`      |
| `erxCellEditCancel` | Emitted when cell edit is cancelled  | `CustomEvent<ErxCellEditStartEvent>` |
| `erxCellEditStart`  | Emitted when cell edit starts        | `CustomEvent<ErxCellEditStartEvent>` |
| `erxFilter`         | Emitted when filters change          | `CustomEvent<ErxFilterEvent>`        |
| `erxPageChange`     | Emitted when page changes            | `CustomEvent<ErxPageChangeEvent>`    |
| `erxRowClick`       | Emitted when a row is clicked        | `CustomEvent<ErxRowClickEvent>`      |
| `erxRowDoubleClick` | Emitted when a row is double-clicked | `CustomEvent<ErxRowClickEvent>`      |
| `erxRowSelect`      | Emitted when row selection changes   | `CustomEvent<ErxRowSelectEvent>`     |
| `erxSort`           | Emitted when sort changes            | `CustomEvent<ErxSortEvent>`          |


## Methods

### `clearSelection() => Promise<void>`

Clear all selections

#### Returns

Type: `Promise<void>`



### `exportToCSV(filename?: string) => Promise<string>`

Export data to CSV

#### Parameters

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| `filename` | `string` |             |

#### Returns

Type: `Promise<string>`



### `refresh() => Promise<void>`

Refresh the grid (re-process data)

#### Returns

Type: `Promise<void>`



### `scrollToRow(key: string) => Promise<void>`

Scroll to a specific row by key

#### Parameters

| Name  | Type     | Description |
| ----- | -------- | ----------- |
| `key` | `string` |             |

#### Returns

Type: `Promise<void>`



### `selectAll() => Promise<void>`

Select all visible rows

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"body"`         |             |
| `"cell"`         |             |
| `"cell-editing"` |             |
| `"container"`    |             |
| `"empty"`        |             |
| `"header"`       |             |
| `"header-cell"`  |             |
| `"loading"`      |             |
| `"pagination"`   |             |
| `"row"`          |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
