# erx-pagination



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                  | Type       | Default             |
| --------------- | ----------------- | ---------------------------- | ---------- | ------------------- |
| `compact`       | `compact`         | Compact mode                 | `boolean`  | `false`             |
| `disabled`      | `disabled`        | Disabled state               | `boolean`  | `false`             |
| `maxVisible`    | `max-visible`     | Maximum visible page buttons | `number`   | `5`                 |
| `page`          | `page`            | Current page (1-indexed)     | `number`   | `1`                 |
| `pageSizes`     | --                | Available page sizes         | `number[]` | `[10, 25, 50, 100]` |
| `perPage`       | `per-page`        | Items per page               | `number`   | `10`                |
| `showFirstLast` | `show-first-last` | Show first/last buttons      | `boolean`  | `true`              |
| `showPageSize`  | `show-page-size`  | Show page size selector      | `boolean`  | `false`             |
| `showPrevNext`  | `show-prev-next`  | Show prev/next buttons       | `boolean`  | `true`              |
| `showRange`     | `show-range`      | Show current range           | `boolean`  | `true`              |
| `showTotal`     | `show-total`      | Show total count             | `boolean`  | `false`             |
| `total`         | `total`           | Total number of items        | `number`   | `0`                 |


## Events

| Event               | Description            | Type                                    |
| ------------------- | ---------------------- | --------------------------------------- |
| `erxPageChange`     | Page change event      | `CustomEvent<ErxPaginationChangeEvent>` |
| `erxPageSizeChange` | Page size change event | `CustomEvent<ErxPageSizeChangeEvent>`   |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"btn-first"` |             |
| `"btn-last"`  |             |
| `"btn-next"`  |             |
| `"btn-page"`  |             |
| `"btn-prev"`  |             |
| `"container"` |             |
| `"current"`   |             |
| `"nav"`       |             |
| `"pages"`     |             |
| `"range"`     |             |
| `"size"`      |             |
| `"total"`     |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
