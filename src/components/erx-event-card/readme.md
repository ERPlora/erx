# erx-event-card



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description  | Type               | Default     |
| -------------------- | -------------- | ------------ | ------------------ | ----------- |
| `compact`            | `compact`      | Compact mode | `boolean`          | `false`     |
| `event` _(required)_ | --             | Event data   | `ErxEventCardData` | `undefined` |
| `showActions`        | `show-actions` | Show actions | `boolean`          | `true`      |


## Events

| Event       | Description      | Type                                   |
| ----------- | ---------------- | -------------------------------------- |
| `erxAction` | Action event     | `CustomEvent<ErxEventCardActionEvent>` |
| `erxClick`  | Card click event | `CustomEvent<ErxEventCardClickEvent>`  |


## Shadow Parts

| Part            | Description |
| --------------- | ----------- |
| `"attendees"`   |             |
| `"color-bar"`   |             |
| `"container"`   |             |
| `"content"`     |             |
| `"date"`        |             |
| `"description"` |             |
| `"footer"`      |             |
| `"location"`    |             |
| `"status"`      |             |
| `"time"`        |             |
| `"title"`       |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
