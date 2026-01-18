# erx-gantt



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type          | Default                |
| ---------- | ---------- | ----------- | ------------- | ---------------------- |
| `config`   | --         |             | `GanttConfig` | `{ viewMode: 'week' }` |
| `disabled` | `disabled` |             | `boolean`     | `false`                |
| `tasks`    | --         |             | `GanttTask[]` | `[]`                   |


## Events

| Event           | Description | Type                                                         |
| --------------- | ----------- | ------------------------------------------------------------ |
| `erxSelect`     |             | `CustomEvent<GanttSelectDetail>`                             |
| `erxUpdate`     |             | `CustomEvent<GanttUpdateDetail>`                             |
| `erxViewChange` |             | `CustomEvent<{ viewMode: GanttViewMode; startDate: Date; }>` |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"body"`      |             |
| `"container"` |             |
| `"content"`   |             |
| `"toolbar"`   |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
