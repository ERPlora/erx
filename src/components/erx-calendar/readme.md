# erx-calendar



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                  | Default             |
| -------------- | --------------- | ----------- | --------------------- | ------------------- |
| `config`       | --              |             | `CalendarConfig`      | `{ view: 'month' }` |
| `disabled`     | `disabled`      |             | `boolean`             | `false`             |
| `events`       | --              |             | `CalendarEvent[]`     | `[]`                |
| `selectedDate` | `selected-date` |             | `string \| undefined` | `undefined`         |


## Events

| Event            | Description | Type                                     |
| ---------------- | ----------- | ---------------------------------------- |
| `erxEventSelect` |             | `CustomEvent<CalendarEventSelectDetail>` |
| `erxSelect`      |             | `CustomEvent<CalendarSelectDetail>`      |
| `erxViewChange`  |             | `CustomEvent<CalendarViewChangeDetail>`  |


## Methods

### `goToDate(date: Date) => Promise<void>`



#### Parameters

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| `date` | `Date` |             |

#### Returns

Type: `Promise<void>`



### `setView(view: CalendarView) => Promise<void>`



#### Parameters

| Name   | Type                                   | Description |
| ------ | -------------------------------------- | ----------- |
| `view` | `"month" \| "week" \| "day" \| "year"` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"body"`      |             |
| `"container"` |             |
| `"header"`    |             |
| `"month"`     |             |
| `"year"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
