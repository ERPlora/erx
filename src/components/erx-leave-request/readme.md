# erx-leave-request



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute      | Description | Type              | Default     |
| ---------------------- | -------------- | ----------- | ----------------- | ----------- |
| `compact`              | `compact`      |             | `boolean`         | `false`     |
| `locale`               | `locale`       |             | `string`          | `'en-US'`   |
| `request` _(required)_ | --             |             | `ErxLeaveRequest` | `undefined` |
| `showActions`          | `show-actions` |             | `boolean`         | `true`      |


## Events

| Event       | Description | Type                                         |
| ----------- | ----------- | -------------------------------------------- |
| `erxAction` |             | `CustomEvent<ErxLeaveRequestActionEvent>`    |
| `erxSelect` |             | `CustomEvent<{ request: ErxLeaveRequest; }>` |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"actions"`   |             |
| `"container"` |             |
| `"dates"`     |             |
| `"header"`    |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
