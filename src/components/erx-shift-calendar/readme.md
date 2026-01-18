# erx-shift-calendar



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute  | Description | Type                                        | Default      |
| ------------- | ---------- | ----------- | ------------------------------------------- | ------------ |
| `currentDate` | --         |             | `Date`                                      | `new Date()` |
| `disabled`    | `disabled` |             | `boolean`                                   | `false`      |
| `employees`   | --         |             | `{ id: string \| number; name: string; }[]` | `[]`         |
| `locale`      | `locale`   |             | `string`                                    | `'en-US'`    |
| `shifts`      | --         |             | `ErxShift[]`                                | `[]`         |
| `view`        | `view`     |             | `"month" \| "week"`                         | `'week'`     |


## Events

| Event           | Description | Type                               |
| --------------- | ----------- | ---------------------------------- |
| `erxDateChange` |             | `CustomEvent<{ date: Date; }>`     |
| `erxSelect`     |             | `CustomEvent<ErxShiftSelectEvent>` |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"grid"`      |             |
| `"header"`    |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
