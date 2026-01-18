# erx-calculator



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                   | Type                  | Default     |
| ---------------- | ----------------- | ----------------------------- | --------------------- | ----------- |
| `currency`       | `currency`        | Currency symbol (for display) | `string \| undefined` | `undefined` |
| `disabled`       | `disabled`        | Disable calculator            | `boolean`             | `false`     |
| `precision`      | `precision`       | Decimal precision             | `number`              | `10`        |
| `showMemory`     | `show-memory`     | Show memory buttons           | `boolean`             | `false`     |
| `showScientific` | `show-scientific` | Show scientific functions     | `boolean`             | `false`     |
| `value`          | `value`           | Initial value                 | `string`              | `'0'`       |


## Events

| Event       | Description                       | Type                                |
| ----------- | --------------------------------- | ----------------------------------- |
| `erxInput`  | Emitted on any input              | `CustomEvent<{ display: string; }>` |
| `erxResult` | Emitted when result is calculated | `CustomEvent<ErxCalculatorResult>`  |


## Methods

### `clear() => Promise<void>`

Clear the calculator

#### Returns

Type: `Promise<void>`



### `getValue() => Promise<number>`

Get current value

#### Returns

Type: `Promise<number>`



### `setValue(value: string | number) => Promise<void>`

Set display value

#### Parameters

| Name    | Type               | Description |
| ------- | ------------------ | ----------- |
| `value` | `string \| number` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"display"`   |             |
| `"keypad"`    |             |
| `"memory"`    |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
