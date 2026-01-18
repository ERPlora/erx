# erx-state



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                  | Type                                                       | Default     |
| --------------------- | ----------------------- | ---------------------------- | ---------------------------------------------------------- | ----------- |
| `actionText`          | `action-text`           | Primary action button text   | `string \| undefined`                                      | `undefined` |
| `compact`             | `compact`               | Compact mode                 | `boolean`                                                  | `false`     |
| `description`         | `description`           | Description text             | `string \| undefined`                                      | `undefined` |
| `icon`                | `icon`                  | Custom icon (emoji or text)  | `string \| undefined`                                      | `undefined` |
| `secondaryActionText` | `secondary-action-text` | Secondary action button text | `string \| undefined`                                      | `undefined` |
| `stateTitle`          | `state-title`           | Title text                   | `string \| undefined`                                      | `undefined` |
| `type`                | `type`                  | State type                   | `"custom" \| "empty" \| "error" \| "loading" \| "success"` | `'empty'`   |


## Events

| Event       | Description                        | Type                                                 |
| ----------- | ---------------------------------- | ---------------------------------------------------- |
| `erxAction` | Emitted when action button clicked | `CustomEvent<{ action: "primary" \| "secondary"; }>` |


## Shadow Parts

| Part                 | Description |
| -------------------- | ----------- |
| `"action-primary"`   |             |
| `"action-secondary"` |             |
| `"actions"`          |             |
| `"container"`        |             |
| `"description"`      |             |
| `"icon"`             |             |
| `"spinner"`          |             |
| `"title"`            |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
