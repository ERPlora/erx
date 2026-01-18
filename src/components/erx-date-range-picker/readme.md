# erx-date-range-picker



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                     | Default               |
| ------------- | ------------- | ----------- | ------------------------ | --------------------- |
| `config`      | --            |             | `DateRangePickerConfig`  | `{}`                  |
| `disabled`    | `disabled`    |             | `boolean`                | `false`               |
| `label`       | `label`       |             | `string \| undefined`    | `undefined`           |
| `placeholder` | `placeholder` |             | `string`                 | `'Select date range'` |
| `range`       | --            |             | `DateRange \| undefined` | `undefined`           |


## Events

| Event       | Description | Type                                 |
| ----------- | ----------- | ------------------------------------ |
| `erxChange` |             | `CustomEvent<DateRangeChangeDetail>` |


## Methods

### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setRange(range: DateRange) => Promise<void>`



#### Parameters

| Name    | Type        | Description |
| ------- | ----------- | ----------- |
| `range` | `DateRange` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"calendars"` |             |
| `"container"` |             |
| `"dropdown"`  |             |
| `"footer"`    |             |
| `"presets"`   |             |
| `"trigger"`   |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
