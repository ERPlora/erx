# erx-fullscreen-modal



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description               | Type                             | Default     |
| ------------- | -------------- | ------------------------- | -------------------------------- | ----------- |
| `animation`   | `animation`    | Animation type            | `"fade" \| "slide-up" \| "zoom"` | `'fade'`    |
| `background`  | `background`   | Custom background color   | `string \| undefined`            | `undefined` |
| `escapeClose` | `escape-close` | Close on escape key       | `boolean`                        | `true`      |
| `modalTitle`  | `modal-title`  | Modal title               | `string \| undefined`            | `undefined` |
| `open`        | `open`         | Whether the modal is open | `boolean`                        | `false`     |
| `showClose`   | `show-close`   | Show close button         | `boolean`                        | `true`      |
| `showHeader`  | `show-header`  | Show header bar           | `boolean`                        | `true`      |


## Events

| Event      | Description               | Type                |
| ---------- | ------------------------- | ------------------- |
| `erxClose` | Emitted when modal closes | `CustomEvent<void>` |
| `erxOpen`  | Emitted when modal opens  | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Close the modal

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Open the modal

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"actions"`   |             |
| `"close"`     |             |
| `"container"` |             |
| `"content"`   |             |
| `"footer"`    |             |
| `"header"`    |             |
| `"title"`     |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
