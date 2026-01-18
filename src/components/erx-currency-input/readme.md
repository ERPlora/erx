# erx-currency-input



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                  | Default               |
| ------------- | ------------- | ----------- | --------------------- | --------------------- |
| `config`      | --            |             | `CurrencyInputConfig` | `{ currency: 'USD' }` |
| `disabled`    | `disabled`    |             | `boolean`             | `false`               |
| `label`       | `label`       |             | `string \| undefined` | `undefined`           |
| `placeholder` | `placeholder` |             | `string`              | `'0.00'`              |
| `readonly`    | `readonly`    |             | `boolean`             | `false`               |
| `value`       | `value`       |             | `number \| undefined` | `undefined`           |


## Events

| Event       | Description | Type                                     |
| ----------- | ----------- | ---------------------------------------- |
| `erxBlur`   |             | `CustomEvent<CurrencyInputChangeDetail>` |
| `erxChange` |             | `CustomEvent<CurrencyInputChangeDetail>` |


## Methods

### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setValue(value: number) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `value` | `number` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"input"`     |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
