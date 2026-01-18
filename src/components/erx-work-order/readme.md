# erx-work-order



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute         | Description | Type        | Default     |
| -------------------- | ----------------- | ----------- | ----------- | ----------- |
| `compact`            | `compact`         |             | `boolean`   | `false`     |
| `order` _(required)_ | --                |             | `WorkOrder` | `undefined` |
| `showActions`        | `show-actions`    |             | `boolean`   | `true`      |
| `showMaterials`      | `show-materials`  |             | `boolean`   | `false`     |
| `showOperations`     | `show-operations` |             | `boolean`   | `false`     |


## Events

| Event       | Description | Type                                 |
| ----------- | ----------- | ------------------------------------ |
| `erxAction` |             | `CustomEvent<WorkOrderActionDetail>` |
| `erxSelect` |             | `CustomEvent<WorkOrder>`             |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"actions"`    |             |
| `"container"`  |             |
| `"header"`     |             |
| `"materials"`  |             |
| `"operations"` |             |
| `"product"`    |             |
| `"quantity"`   |             |
| `"schedule"`   |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
