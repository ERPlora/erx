# erx-barcode-scanner



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description         | Type                      | Default                                      |
| --------------- | ----------------- | ------------------- | ------------------------- | -------------------------------------------- |
| `autoStart`     | `auto-start`      | Auto-start camera   | `boolean`                 | `false`                                      |
| `beepOnScan`    | `beep-on-scan`    | Beep on scan        | `boolean`                 | `true`                                       |
| `continuous`    | `continuous`      | Continuous scanning | `boolean`                 | `false`                                      |
| `facingMode`    | `facing-mode`     | Facing mode         | `"environment" \| "user"` | `'environment'`                              |
| `formats`       | --                | Accepted formats    | `ErxBarcodeFormat[]`      | `['qr_code', 'ean_13', 'ean_8', 'code_128']` |
| `height`        | `height`          | Height              | `string`                  | `'300px'`                                    |
| `scanInterval`  | `scan-interval`   | Scan frequency (ms) | `number`                  | `500`                                        |
| `showOverlay`   | `show-overlay`    | Show overlay/guide  | `boolean`                 | `true`                                       |
| `vibrateOnScan` | `vibrate-on-scan` | Vibrate on scan     | `boolean`                 | `true`                                       |
| `width`         | `width`           | Width               | `string`                  | `'100%'`                                     |


## Events

| Event      | Description        | Type                                       |
| ---------- | ------------------ | ------------------------------------------ |
| `erxError` | Error event        | `CustomEvent<ErxBarcodeScannerErrorEvent>` |
| `erxScan`  | Scan success event | `CustomEvent<ErxBarcodeScanEvent>`         |


## Methods

### `startScanning() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `stopScanning() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggleTorch(enabled: boolean) => Promise<void>`



#### Parameters

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| `enabled` | `boolean` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part            | Description |
| --------------- | ----------- |
| `"container"`   |             |
| `"error"`       |             |
| `"guide"`       |             |
| `"overlay"`     |             |
| `"placeholder"` |             |
| `"result"`      |             |
| `"video"`       |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
