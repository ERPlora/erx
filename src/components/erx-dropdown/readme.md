# erx-dropdown



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                     | Type                                                                                                                       | Default          |
| --------------- | ----------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `closeOnSelect` | `close-on-select` | Close on select                 | `boolean`                                                                                                                  | `true`           |
| `disabled`      | `disabled`        | Disabled state                  | `boolean`                                                                                                                  | `false`          |
| `items`         | --                | Menu items                      | `ErxDropdownItem[]`                                                                                                        | `[]`             |
| `minWidth`      | `min-width`       | Min width of dropdown           | `string`                                                                                                                   | `'180px'`        |
| `open`          | `open`            | Open state (for manual trigger) | `boolean`                                                                                                                  | `false`          |
| `placement`     | `placement`       | Dropdown placement              | `"bottom-end" \| "bottom-start" \| "left-end" \| "left-start" \| "right-end" \| "right-start" \| "top-end" \| "top-start"` | `'bottom-start'` |
| `trigger`       | `trigger`         | Trigger mode                    | `"click" \| "hover" \| "manual"`                                                                                           | `'click'`        |


## Events

| Event           | Description       | Type                                  |
| --------------- | ----------------- | ------------------------------------- |
| `erxOpenChange` | Open/close event  | `CustomEvent<ErxDropdownOpenEvent>`   |
| `erxSelect`     | Item select event | `CustomEvent<ErxDropdownSelectEvent>` |


## Methods

### `closeMenu() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `openMenu() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggleMenu() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"divider"`   |             |
| `"header"`    |             |
| `"item"`      |             |
| `"menu"`      |             |
| `"submenu"`   |             |
| `"trigger"`   |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
