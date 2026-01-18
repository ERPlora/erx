# erx-context-menu



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                | Type                   | Default     |
| ---------- | ---------- | ---------------------------------------------------------- | ---------------------- | ----------- |
| `disabled` | `disabled` | Disabled state                                             | `boolean`              | `false`     |
| `items`    | --         | Menu items                                                 | `ErxContextMenuItem[]` | `[]`        |
| `target`   | `target`   | CSS selector for target elements (defaults to host parent) | `string \| undefined`  | `undefined` |


## Events

| Event           | Description       | Type                                     |
| --------------- | ----------------- | ---------------------------------------- |
| `erxOpenChange` | Open/close event  | `CustomEvent<ErxContextMenuOpenEvent>`   |
| `erxSelect`     | Item select event | `CustomEvent<ErxContextMenuSelectEvent>` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `show(x: number, y: number, target?: HTMLElement) => Promise<void>`



#### Parameters

| Name     | Type                       | Description |
| -------- | -------------------------- | ----------- |
| `x`      | `number`                   |             |
| `y`      | `number`                   |             |
| `target` | `HTMLElement \| undefined` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"divider"` |             |
| `"header"`  |             |
| `"item"`    |             |
| `"menu"`    |             |
| `"submenu"` |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
