# erx-order-ticket



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description           | Type       | Default     |
| -------------------- | -------------- | --------------------- | ---------- | ----------- |
| `compact`            | `compact`      | Compact mode          | `boolean`  | `false`     |
| `currency`           | `currency`     | Currency symbol       | `string`   | `'$'`       |
| `locale`             | `locale`       | Locale for formatting | `string`   | `'en-US'`   |
| `order` _(required)_ | --             | Order data            | `ErxOrder` | `undefined` |
| `showActions`        | `show-actions` | Show action buttons   | `boolean`  | `true`      |
| `showPrices`         | `show-prices`  | Show prices           | `boolean`  | `false`     |
| `showStatus`         | `show-status`  | Show status badge     | `boolean`  | `true`      |


## Events

| Event       | Description                           | Type                                     |
| ----------- | ------------------------------------- | ---------------------------------------- |
| `erxAction` | Emitted when action button is clicked | `CustomEvent<ErxOrderTicketActionEvent>` |
| `erxSelect` | Emitted when ticket is clicked        | `CustomEvent<{ order: ErxOrder; }>`      |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"actions"`   |             |
| `"container"` |             |
| `"customer"`  |             |
| `"footer"`    |             |
| `"header"`    |             |
| `"items"`     |             |
| `"notes"`     |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
