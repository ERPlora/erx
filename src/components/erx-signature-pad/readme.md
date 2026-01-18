# erx-signature-pad



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                  | Default     |
| ---------- | ---------- | ----------- | --------------------- | ----------- |
| `config`   | --         |             | `SignatureConfig`     | `{}`        |
| `disabled` | `disabled` |             | `boolean`             | `false`     |
| `label`    | `label`    |             | `string \| undefined` | `undefined` |


## Events

| Event       | Description | Type                                 |
| ----------- | ----------- | ------------------------------------ |
| `erxChange` |             | `CustomEvent<SignatureChangeDetail>` |
| `erxClear`  |             | `CustomEvent<void>`                  |


## Methods

### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `isEmpty_() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `toDataURL(format?: "png" | "jpeg" | "svg") => Promise<string>`



#### Parameters

| Name     | Type                                    | Description |
| -------- | --------------------------------------- | ----------- |
| `format` | `"jpeg" \| "png" \| "svg" \| undefined` |             |

#### Returns

Type: `Promise<string>`




## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"actions"`        |             |
| `"canvas"`         |             |
| `"canvas-wrapper"` |             |
| `"container"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
