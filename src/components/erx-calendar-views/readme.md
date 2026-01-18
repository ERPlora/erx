# erx-calendar-views



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                   | Default      |
| -------------- | --------------- | ----------- | -------------------------------------- | ------------ |
| `date`         | --              |             | `Date`                                 | `new Date()` |
| `disabled`     | `disabled`      |             | `boolean`                              | `false`      |
| `endHour`      | `end-hour`      |             | `number`                               | `20`         |
| `events`       | --              |             | `CalendarEvent[]`                      | `[]`         |
| `hourHeight`   | `hour-height`   |             | `number`                               | `60`         |
| `locale`       | `locale`        |             | `string`                               | `'en-US'`    |
| `slotDuration` | `slot-duration` |             | `number`                               | `30`         |
| `startHour`    | `start-hour`    |             | `number`                               | `8`          |
| `view`         | `view`          |             | `"day" \| "month" \| "week" \| "year"` | `'week'`     |


## Events

| Event            | Description | Type                                     |
| ---------------- | ----------- | ---------------------------------------- |
| `erxEventSelect` |             | `CustomEvent<{ event: CalendarEvent; }>` |
| `erxSelect`      |             | `CustomEvent<CalendarViewSelectDetail>`  |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"day"`       |             |
| `"toolbar"`   |             |
| `"week"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
