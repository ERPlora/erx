# erx-snackbar



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                     | Type                                                                                | Default     |
| ------------ | ------------- | ------------------------------- | ----------------------------------------------------------------------------------- | ----------- |
| `actionText` | `action-text` | Action button text              | `string \| undefined`                                                               | `undefined` |
| `duration`   | `duration`    | Duration in ms (0 = persistent) | `number`                                                                            | `4000`      |
| `icon`       | `icon`        | Icon to display                 | `string \| undefined`                                                               | `undefined` |
| `message`    | `message`     | Message text                    | `string`                                                                            | `''`        |
| `open`       | `open`        | Whether the snackbar is visible | `boolean`                                                                           | `false`     |
| `position`   | `position`    | Position on screen              | `"bottom" \| "bottom-left" \| "bottom-right" \| "top" \| "top-left" \| "top-right"` | `'bottom'`  |
| `showClose`  | `show-close`  | Show close button               | `boolean`                                                                           | `false`     |
| `variant`    | `variant`     | Snackbar variant                | `"default" \| "error" \| "info" \| "success" \| "warning"`                          | `'default'` |


## Events

| Event       | Description                        | Type                |
| ----------- | ---------------------------------- | ------------------- |
| `erxAction` | Emitted when action button clicked | `CustomEvent<void>` |
| `erxClose`  | Emitted when snackbar closes       | `CustomEvent<void>` |


## Methods

### `hide() => Promise<void>`

Hide the snackbar

#### Returns

Type: `Promise<void>`



### `show(message?: string) => Promise<void>`

Show the snackbar

#### Parameters

| Name      | Type                  | Description |
| --------- | --------------------- | ----------- |
| `message` | `string \| undefined` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"action"`    |             |
| `"close"`     |             |
| `"container"` |             |
| `"icon"`      |             |
| `"message"`   |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
