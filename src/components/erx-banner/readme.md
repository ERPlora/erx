# erx-banner



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                   | Type                                                       | Default     |
| ------------- | ------------- | ----------------------------- | ---------------------------------------------------------- | ----------- |
| `actionText`  | `action-text` | Action button text            | `string \| undefined`                                      | `undefined` |
| `dismissible` | `dismissible` | Dismissible                   | `boolean`                                                  | `true`      |
| `icon`        | `icon`        | Icon to show                  | `string \| undefined`                                      | `undefined` |
| `position`    | `position`    | Position                      | `"bottom" \| "inline" \| "top"`                            | `'inline'`  |
| `sticky`      | `sticky`      | Sticky when scrolling         | `boolean`                                                  | `false`     |
| `variant`     | `variant`     | Banner variant                | `"error" \| "info" \| "neutral" \| "success" \| "warning"` | `'info'`    |
| `visible`     | `visible`     | Whether the banner is visible | `boolean`                                                  | `true`      |


## Events

| Event        | Description                           | Type                |
| ------------ | ------------------------------------- | ------------------- |
| `erxAction`  | Emitted when action button is clicked | `CustomEvent<void>` |
| `erxDismiss` | Emitted when banner is dismissed      | `CustomEvent<void>` |


## Methods

### `hide() => Promise<void>`

Hide the banner

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Show the banner

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"action"`    |             |
| `"close"`     |             |
| `"container"` |             |
| `"content"`   |             |
| `"icon"`      |             |
| `"text"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
