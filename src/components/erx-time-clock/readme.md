# erx-time-clock



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                          | Default         |
| -------------- | --------------- | ----------- | --------------------------------------------- | --------------- |
| `clockedInAt`  | `clocked-in-at` |             | `Date \| string \| undefined`                 | `undefined`     |
| `disabled`     | `disabled`      |             | `boolean`                                     | `false`         |
| `employeeId`   | `employee-id`   |             | `number \| string \| undefined`               | `undefined`     |
| `employeeName` | `employee-name` |             | `string \| undefined`                         | `undefined`     |
| `locale`       | `locale`        |             | `string`                                      | `'en-US'`       |
| `showDate`     | `show-date`     |             | `boolean`                                     | `true`          |
| `showSeconds`  | `show-seconds`  |             | `boolean`                                     | `true`          |
| `status`       | `status`        |             | `"clocked-in" \| "clocked-out" \| "on-break"` | `'clocked-out'` |


## Events

| Event           | Description | Type                             |
| --------------- | ----------- | -------------------------------- |
| `erxBreakEnd`   |             | `CustomEvent<ErxTimeClockEvent>` |
| `erxBreakStart` |             | `CustomEvent<ErxTimeClockEvent>` |
| `erxClockIn`    |             | `CustomEvent<ErxTimeClockEvent>` |
| `erxClockOut`   |             | `CustomEvent<ErxTimeClockEvent>` |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"actions"`   |             |
| `"container"` |             |
| `"date"`      |             |
| `"elapsed"`   |             |
| `"status"`    |             |
| `"time"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
