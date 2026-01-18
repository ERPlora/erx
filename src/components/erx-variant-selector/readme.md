# erx-variant-selector



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description            | Type                   | Default   |
| ------------ | ------------- | ---------------------- | ---------------------- | --------- |
| `currency`   | `currency`    | Currency symbol        | `string`               | `'$'`     |
| `disabled`   | `disabled`    | Disable all selections | `boolean`              | `false`   |
| `groups`     | --            | Variant groups         | `ErxVariantGroup[]`    | `[]`      |
| `locale`     | `locale`      | Locale for formatting  | `string`               | `'en-US'` |
| `showPrices` | `show-prices` | Show price modifiers   | `boolean`              | `true`    |
| `showStock`  | `show-stock`  | Show stock info        | `boolean`              | `true`    |
| `size`       | `size`        | Size variant           | `"lg" \| "md" \| "sm"` | `'md'`    |
| `value`      | --            | Current selection      | `ErxVariantSelection`  | `{}`      |


## Events

| Event         | Description                                       | Type                                               |
| ------------- | ------------------------------------------------- | -------------------------------------------------- |
| `erxComplete` | Emitted when all required selections are complete | `CustomEvent<{ selection: ErxVariantSelection; }>` |
| `erxSelect`   | Emitted when a variant is selected                | `CustomEvent<ErxVariantSelectEvent>`               |


## Methods

### `getSelection() => Promise<ErxVariantSelection>`

Get current selection

#### Returns

Type: `Promise<ErxVariantSelection>`



### `isComplete() => Promise<boolean>`

Check if selection is complete

#### Returns

Type: `Promise<boolean>`



### `reset() => Promise<void>`

Reset all selections

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"group"`     |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
