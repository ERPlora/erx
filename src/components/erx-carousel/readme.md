# erx-carousel



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description             | Type                 | Default |
| ---------------- | ----------------- | ----------------------- | -------------------- | ------- |
| `autoPlay`       | `auto-play`       | Auto-play               | `boolean`            | `false` |
| `interval`       | `interval`        | Auto-play interval (ms) | `number`             | `5000`  |
| `loop`           | `loop`            | Loop slides             | `boolean`            | `true`  |
| `pauseOnHover`   | `pause-on-hover`  | Pause on hover          | `boolean`            | `true`  |
| `showNav`        | `show-nav`        | Show navigation arrows  | `boolean`            | `true`  |
| `showPagination` | `show-pagination` | Show pagination dots    | `boolean`            | `true`  |
| `slides`         | --                | Slides array            | `ErxCarouselSlide[]` | `[]`    |
| `slidesPerView`  | `slides-per-view` | Slides per view         | `number`             | `1`     |
| `spaceBetween`   | `space-between`   | Space between slides    | `number`             | `0`     |
| `touchEnabled`   | `touch-enabled`   | Enable touch/swipe      | `boolean`            | `true`  |


## Events

| Event            | Description        | Type                                 |
| ---------------- | ------------------ | ------------------------------------ |
| `erxSlideChange` | Slide change event | `CustomEvent<ErxCarouselSlideEvent>` |


## Methods

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



### `pause() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `play() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `prev() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"container"`  |             |
| `"content"`    |             |
| `"dot"`        |             |
| `"image"`      |             |
| `"nav"`        |             |
| `"nav-next"`   |             |
| `"nav-prev"`   |             |
| `"pagination"` |             |
| `"slide"`      |             |
| `"track"`      |             |
| `"viewport"`   |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
