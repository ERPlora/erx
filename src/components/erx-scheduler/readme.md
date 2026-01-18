# erx-scheduler



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute  | Description | Type                  | Default                                                                            |
| ----------- | ---------- | ----------- | --------------------- | ---------------------------------------------------------------------------------- |
| `config`    | --         |             | `SchedulerConfig`     | `{     view: 'week',     date: new Date(),     resources: [],     events: [],   }` |
| `disabled`  | `disabled` |             | `boolean`             | `false`                                                                            |
| `events`    | --         |             | `SchedulerEvent[]`    | `[]`                                                                               |
| `resources` | --         |             | `SchedulerResource[]` | `[]`                                                                               |


## Events

| Event            | Description | Type                                      |
| ---------------- | ----------- | ----------------------------------------- |
| `erxEventSelect` |             | `CustomEvent<SchedulerEventSelectDetail>` |
| `erxEventUpdate` |             | `CustomEvent<SchedulerEventUpdateDetail>` |
| `erxSelect`      |             | `CustomEvent<SchedulerSelectDetail>`      |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"timeline"`  |             |
| `"toolbar"`   |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
