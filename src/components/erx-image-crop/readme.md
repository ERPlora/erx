# erx-image-crop



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description         | Type                        | Default     |
| --------------- | ---------------- | ------------------- | --------------------------- | ----------- |
| `aspectRatio`   | `aspect-ratio`   | Aspect ratio        | `number \| undefined`       | `undefined` |
| `circular`      | `circular`       | Circular crop       | `boolean`                   | `false`     |
| `maxZoom`       | `max-zoom`       | Zoom range max      | `number`                    | `3`         |
| `minHeight`     | `min-height`     | Minimum crop height | `number`                    | `50`        |
| `minWidth`      | `min-width`      | Minimum crop width  | `number`                    | `50`        |
| `minZoom`       | `min-zoom`       | Zoom range min      | `number`                    | `1`         |
| `outputFormat`  | `output-format`  | Output format       | `"jpeg" \| "png" \| "webp"` | `'jpeg'`    |
| `outputQuality` | `output-quality` | Output quality      | `number`                    | `0.9`       |
| `showGrid`      | `show-grid`      | Show grid overlay   | `boolean`                   | `true`      |
| `src`           | `src`            | Image source URL    | `string \| undefined`       | `undefined` |


## Events

| Event             | Description         | Type                                     |
| ----------------- | ------------------- | ---------------------------------------- |
| `erxCropChange`   | Crop change event   | `CustomEvent<ErxImageCropEvent>`         |
| `erxCropComplete` | Crop complete event | `CustomEvent<ErxImageCropCompleteEvent>` |


## Methods

### `getCroppedImage() => Promise<ErxImageCropCompleteEvent>`



#### Returns

Type: `Promise<ErxImageCropCompleteEvent>`



### `reset() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `rotate(degrees: number) => Promise<void>`



#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `degrees` | `number` |             |

#### Returns

Type: `Promise<void>`



### `setZoom(zoom: number) => Promise<void>`



#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `zoom` | `number` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part                | Description |
| ------------------- | ----------- |
| `"container"`       |             |
| `"controls"`        |             |
| `"crop-area"`       |             |
| `"image"`           |             |
| `"image-container"` |             |
| `"overlay"`         |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
