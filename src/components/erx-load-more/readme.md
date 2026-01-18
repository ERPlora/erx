# erx-load-more



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                             | Type                               | Default              |
| -------------- | --------------- | --------------------------------------- | ---------------------------------- | -------------------- |
| `completeText` | `complete-text` | Text when all items loaded              | `string`                           | `'All items loaded'` |
| `disabled`     | `disabled`      | Disable the component                   | `boolean`                          | `false`              |
| `errorText`    | `error-text`    | Text on error                           | `string`                           | `'Failed to load'`   |
| `loadText`     | `load-text`     | Text for load more button               | `string`                           | `'Load More'`        |
| `loadingText`  | `loading-text`  | Text while loading                      | `string`                           | `'Loading...'`       |
| `mode`         | `mode`          | Mode: button, infinite scroll, or auto  | `"auto" \| "button" \| "infinite"` | `'button'`           |
| `retryText`    | `retry-text`    | Retry button text                       | `string`                           | `'Retry'`            |
| `threshold`    | `threshold`     | Threshold in pixels for infinite scroll | `number`                           | `200`                |


## Events

| Event         | Description                              | Type                            |
| ------------- | ---------------------------------------- | ------------------------------- |
| `erxLoadMore` | Emitted when more items should be loaded | `CustomEvent<ErxLoadMoreEvent>` |


## Methods

### `complete() => Promise<void>`

Mark as complete (no more items)

#### Returns

Type: `Promise<void>`



### `reset() => Promise<void>`

Reset the component to initial state

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"button"`    |             |
| `"complete"`  |             |
| `"container"` |             |
| `"error"`     |             |
| `"loading"`   |             |
| `"retry"`     |             |
| `"spinner"`   |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
