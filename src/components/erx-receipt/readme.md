# erx-receipt



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute      | Description                              | Type             | Default     |
| ------------------- | -------------- | ---------------------------------------- | ---------------- | ----------- |
| `compact`           | `compact`      | Compact mode (less spacing)              | `boolean`        | `false`     |
| `currency`          | `currency`     | Currency symbol                          | `string`         | `'$'`       |
| `data` _(required)_ | --             | Receipt data                             | `ErxReceiptData` | `undefined` |
| `locale`            | `locale`       | Locale for formatting                    | `string`         | `'en-US'`   |
| `paperWidth`        | `paper-width`  | Paper width in mm (for thermal printers) | `58 \| 80`       | `80`        |
| `showBarcode`       | `show-barcode` | Show barcode                             | `boolean`        | `true`      |
| `showLogo`          | `show-logo`    | Show logo                                | `boolean`        | `true`      |
| `showQrCode`        | `show-qr-code` | Show QR code                             | `boolean`        | `true`      |


## Methods

### `getHTML() => Promise<string>`

Get receipt as HTML string

#### Returns

Type: `Promise<string>`



### `print() => Promise<void>`

Print the receipt

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"codes"`     |             |
| `"container"` |             |
| `"footer"`    |             |
| `"header"`    |             |
| `"info"`      |             |
| `"items"`     |             |
| `"payment"`   |             |
| `"totals"`    |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
