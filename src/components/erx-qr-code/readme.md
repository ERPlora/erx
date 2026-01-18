# erx-qr-code



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description            | Type                       | Default     |
| ----------------- | ------------------ | ---------------------- | -------------------------- | ----------- |
| `backgroundColor` | `background-color` | Background color       | `string`                   | `'#ffffff'` |
| `color`           | `color`            | Foreground color       | `string`                   | `'#000000'` |
| `errorLevel`      | `error-level`      | Error correction level | `"H" \| "L" \| "M" \| "Q"` | `'M'`       |
| `logo`            | `logo`             | Logo image URL         | `string \| undefined`      | `undefined` |
| `logoSize`        | `logo-size`        | Logo size ratio (0-1)  | `number`                   | `0.2`       |
| `margin`          | `margin`           | Include margin         | `number`                   | `4`         |
| `size`            | `size`             | Size in pixels         | `number`                   | `200`       |
| `value`           | `value`            | Data to encode         | `string`                   | `''`        |


## Methods

### `download(filename?: string) => Promise<void>`



#### Parameters

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| `filename` | `string` |             |

#### Returns

Type: `Promise<void>`



### `toDataURL() => Promise<string>`



#### Returns

Type: `Promise<string>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"canvas"`    |             |
| `"container"` |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
