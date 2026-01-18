# erx-autocomplete



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                   | Default       |
| ------------- | ------------- | ----------- | ---------------------- | ------------- |
| `config`      | --            |             | `AutocompleteConfig`   | `{}`          |
| `disabled`    | `disabled`    |             | `boolean`              | `false`       |
| `label`       | `label`       |             | `string \| undefined`  | `undefined`   |
| `loading`     | `loading`     |             | `boolean`              | `false`       |
| `options`     | --            |             | `AutocompleteOption[]` | `[]`          |
| `placeholder` | `placeholder` |             | `string`               | `'Search...'` |
| `value`       | `value`       |             | `string \| undefined`  | `undefined`   |


## Events

| Event       | Description | Type                                    |
| ----------- | ----------- | --------------------------------------- |
| `erxClear`  |             | `CustomEvent<void>`                     |
| `erxSearch` |             | `CustomEvent<AutocompleteSearchDetail>` |
| `erxSelect` |             | `CustomEvent<AutocompleteSelectDetail>` |


## Methods

### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"dropdown"`  |             |
| `"input"`     |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
