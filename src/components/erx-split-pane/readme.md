# erx-split-pane



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute               | Description                                                                   | Type                         | Default        |
| -------------------- | ----------------------- | ----------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `collapsible`        | `collapsible`           | Enable collapse button on the divider                                         | `boolean`                    | `false`        |
| `disabled`           | `disabled`              | Disable resizing                                                              | `boolean`                    | `false`        |
| `gutterSize`         | `gutter-size`           | Size of the divider/gutter in pixels                                          | `number`                     | `8`            |
| `orientation`        | `orientation`           | Orientation of the split: 'horizontal' (side-by-side) or 'vertical' (stacked) | `"horizontal" \| "vertical"` | `'horizontal'` |
| `persistKey`         | `persist-key`           | Persist size to localStorage with this key                                    | `string \| undefined`        | `undefined`    |
| `primaryMaxSize`     | `primary-max-size`      | Maximum size of the primary pane in pixels                                    | `number \| undefined`        | `undefined`    |
| `primaryMinSize`     | `primary-min-size`      | Minimum size of the primary pane in pixels                                    | `number`                     | `100`          |
| `primarySize`        | `primary-size`          | Initial size of the primary pane (px or %)                                    | `string`                     | `'50%'`        |
| `resetOnDoubleClick` | `reset-on-double-click` | Enable double-click to reset to initial size                                  | `boolean`                    | `true`         |
| `secondaryMinSize`   | `secondary-min-size`    | Minimum size of the secondary pane in pixels                                  | `number`                     | `100`          |


## Events

| Event            | Description                             | Type                                     |
| ---------------- | --------------------------------------- | ---------------------------------------- |
| `erxCollapse`    | Emitted when pane is collapsed/expanded | `CustomEvent<ErxSplitPaneCollapseEvent>` |
| `erxResize`      | Emitted when pane is resized            | `CustomEvent<ErxSplitPaneResizeEvent>`   |
| `erxResizeEnd`   | Emitted when resize ends                | `CustomEvent<ErxSplitPaneResizeEvent>`   |
| `erxResizeStart` | Emitted when resize starts              | `CustomEvent<void>`                      |


## Methods

### `collapsePrimary() => Promise<void>`

Collapse the primary pane

#### Returns

Type: `Promise<void>`



### `collapseSecondary() => Promise<void>`

Collapse the secondary pane

#### Returns

Type: `Promise<void>`



### `expand() => Promise<void>`

Expand both panes

#### Returns

Type: `Promise<void>`



### `reset() => Promise<void>`

Reset to initial size

#### Returns

Type: `Promise<void>`



### `setSize(size: number | string) => Promise<void>`

Set the size programmatically

#### Parameters

| Name   | Type               | Description |
| ------ | ------------------ | ----------- |
| `size` | `string \| number` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"gutter"`    |             |
| `"primary"`   |             |
| `"secondary"` |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
