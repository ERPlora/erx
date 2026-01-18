# erx-lightbox



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                | Type                 | Default |
| ------------------- | -------------------- | -------------------------- | -------------------- | ------- |
| `backdropDismiss`   | `backdrop-dismiss`   | Close on backdrop click    | `boolean`            | `true`  |
| `currentIndex`      | `current-index`      | Current image index        | `number`             | `0`     |
| `enableSlideshow`   | `enable-slideshow`   | Enable slideshow           | `boolean`            | `false` |
| `enableZoom`        | `enable-zoom`        | Enable zoom                | `boolean`            | `true`  |
| `images`            | --                   | Images array               | `ErxLightboxImage[]` | `[]`    |
| `keyboardNav`       | `keyboard-nav`       | Enable keyboard navigation | `boolean`            | `true`  |
| `maxZoom`           | `max-zoom`           | Max zoom level             | `number`             | `3`     |
| `open`              | `open`               | Open state                 | `boolean`            | `false` |
| `showCaption`       | `show-caption`       | Show caption               | `boolean`            | `true`  |
| `showCounter`       | `show-counter`       | Show image counter         | `boolean`            | `true`  |
| `showNav`           | `show-nav`           | Show navigation arrows     | `boolean`            | `true`  |
| `showThumbnails`    | `show-thumbnails`    | Show thumbnails strip      | `boolean`            | `true`  |
| `slideshowInterval` | `slideshow-interval` | Slideshow interval (ms)    | `number`             | `3000`  |


## Events

| Event            | Description        | Type                                 |
| ---------------- | ------------------ | ------------------------------------ |
| `erxOpenChange`  | Open/close event   | `CustomEvent<ErxLightboxOpenEvent>`  |
| `erxSlideChange` | Slide change event | `CustomEvent<ErxLightboxSlideEvent>` |
| `erxZoomChange`  | Zoom change event  | `CustomEvent<ErxLightboxZoomEvent>`  |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `goTo(index: number) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `index` | `number` |             |

#### Returns

Type: `Promise<void>`



### `next() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `prev() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `show(index?: number) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `index` | `number` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"backdrop"`   |             |
| `"caption"`    |             |
| `"container"`  |             |
| `"header"`     |             |
| `"image"`      |             |
| `"main"`       |             |
| `"nav-next"`   |             |
| `"nav-prev"`   |             |
| `"thumbnails"` |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
