# erx-pdf-viewer



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description              | Type                            | Default     |
| ---------------- | ----------------- | ------------------------ | ------------------------------- | ----------- |
| `fitMode`        | `fit-mode`        | Fit mode                 | `"height" \| "page" \| "width"` | `'width'`   |
| `page`           | `page`            | Initial page number      | `number`                        | `1`         |
| `showDownload`   | `show-download`   | Show download button     | `boolean`                       | `true`      |
| `showNavigation` | `show-navigation` | Show page navigation     | `boolean`                       | `true`      |
| `showPrint`      | `show-print`      | Show print button        | `boolean`                       | `true`      |
| `showToolbar`    | `show-toolbar`    | Show toolbar             | `boolean`                       | `true`      |
| `showZoom`       | `show-zoom`       | Show zoom controls       | `boolean`                       | `true`      |
| `src`            | `src`             | PDF source URL or base64 | `string \| undefined`           | `undefined` |
| `zoom`           | `zoom`            | Initial zoom level       | `number`                        | `1`         |


## Events

| Event           | Description       | Type                                 |
| --------------- | ----------------- | ------------------------------------ |
| `erxError`      | Error event       | `CustomEvent<ErxPdfErrorEvent>`      |
| `erxLoad`       | Load event        | `CustomEvent<ErxPdfLoadEvent>`       |
| `erxPageChange` | Page change event | `CustomEvent<ErxPdfPageChangeEvent>` |


## Methods

### `download() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `goToPage(pageNum: number) => Promise<void>`



#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `pageNum` | `number` |             |

#### Returns

Type: `Promise<void>`



### `nextPage() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `prevPage() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `print() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setZoom(level: number) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `level` | `number` |             |

#### Returns

Type: `Promise<void>`



### `zoomIn() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `zoomOut() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"iframe"`    |             |
| `"toolbar"`   |             |
| `"viewer"`    |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
