# erx-kanban



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description | Type           | Default     |
| --------------------- | --------- | ----------- | -------------- | ----------- |
| `cards`               | --        |             | `KanbanCard[]` | `[]`        |
| `config` _(required)_ | --        |             | `KanbanConfig` | `undefined` |


## Events

| Event               | Description | Type                                      |
| ------------------- | ----------- | ----------------------------------------- |
| `erxCardMove`       |             | `CustomEvent<KanbanCardMoveDetail>`       |
| `erxCardSelect`     |             | `CustomEvent<KanbanCardSelectDetail>`     |
| `erxColumnCollapse` |             | `CustomEvent<KanbanColumnCollapseDetail>` |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"card"`      |             |
| `"cards"`     |             |
| `"column"`    |             |
| `"container"` |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
