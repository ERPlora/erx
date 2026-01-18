# erx-payment



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description               | Type                 | Default            |
| ------------ | ------------- | ------------------------- | -------------------- | ------------------ |
| `allowSplit` | `allow-split` | Allow split payments      | `boolean`            | `false`            |
| `allowTip`   | `allow-tip`   | Allow tips                | `boolean`            | `true`             |
| `currency`   | `currency`    | Currency symbol           | `string`             | `'$'`              |
| `disabled`   | `disabled`    | Disable interactions      | `boolean`            | `false`            |
| `locale`     | `locale`      | Locale for formatting     | `string`             | `'en-US'`          |
| `methods`    | --            | Available payment methods | `ErxPaymentMethod[]` | `[]`               |
| `showNumpad` | `show-numpad` | Show numpad for cash      | `boolean`            | `true`             |
| `tipPresets` | --            | Preset tip percentages    | `number[]`           | `[10, 15, 20, 25]` |
| `total`      | `total`       | Total amount to pay       | `number`             | `0`                |


## Events

| Event         | Description                             | Type                                   |
| ------------- | --------------------------------------- | -------------------------------------- |
| `erxComplete` | Emitted when payment is completed       | `CustomEvent<ErxPaymentCompleteEvent>` |
| `erxSelect`   | Emitted when payment method is selected | `CustomEvent<ErxPaymentSelectEvent>`   |


## Methods

### `reset() => Promise<void>`

Reset payment state

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"amount"`    |             |
| `"cash"`      |             |
| `"complete"`  |             |
| `"container"` |             |
| `"methods"`   |             |
| `"tips"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
