# erx-panel



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description     | Type                                    | Default      |
| ------------- | ------------- | --------------- | --------------------------------------- | ------------ |
| `collapsed`   | `collapsed`   | Collapsed state | `boolean`                               | `false`      |
| `collapsible` | `collapsible` | Collapsible     | `boolean`                               | `true`       |
| `disabled`    | `disabled`    | Disabled state  | `boolean`                               | `false`      |
| `icon`        | `icon`        | Icon            | `string \| undefined`                   | `undefined`  |
| `panelTitle`  | `panel-title` | Panel title     | `string \| undefined`                   | `undefined`  |
| `subtitle`    | `subtitle`    | Subtitle        | `string \| undefined`                   | `undefined`  |
| `variant`     | `variant`     | Variant style   | `"bordered" \| "default" \| "elevated"` | `'bordered'` |


## Events

| Event       | Description  | Type                               |
| ----------- | ------------ | ---------------------------------- |
| `erxToggle` | Toggle event | `CustomEvent<ErxPanelToggleEvent>` |


## Methods

### `collapse() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `expand() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"content"`   |             |
| `"footer"`    |             |
| `"header"`    |             |
| `"subtitle"`  |             |
| `"title"`     |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
