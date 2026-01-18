# erx-machine-status



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute      | Description | Type      | Default     |
| ---------------------- | -------------- | ----------- | --------- | ----------- |
| `compact`              | `compact`      |             | `boolean` | `false`     |
| `machine` _(required)_ | --             |             | `Machine` | `undefined` |
| `showActions`          | `show-actions` |             | `boolean` | `true`      |
| `showAlerts`           | `show-alerts`  |             | `boolean` | `true`      |
| `showMetrics`          | `show-metrics` |             | `boolean` | `true`      |


## Events

| Event       | Description | Type                               |
| ----------- | ----------- | ---------------------------------- |
| `erxAction` |             | `CustomEvent<MachineActionDetail>` |
| `erxSelect` |             | `CustomEvent<Machine>`             |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"actions"`   |             |
| `"alerts"`    |             |
| `"container"` |             |
| `"header"`    |             |
| `"info"`      |             |
| `"job"`       |             |
| `"metrics"`   |             |
| `"operator"`  |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
