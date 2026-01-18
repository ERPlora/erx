# erx-table



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description    | Type                        | Default               |
| -------------- | --------------- | -------------- | --------------------------- | --------------------- |
| `bordered`     | `bordered`      | Bordered       | `boolean`                   | `false`               |
| `columns`      | --              | Table columns  | `ErxTableColumn[]`          | `[]`                  |
| `compact`      | `compact`       | Compact        | `boolean`                   | `false`               |
| `data`         | --              | Table data     | `Record<string, unknown>[]` | `[]`                  |
| `emptyMessage` | `empty-message` | Empty message  | `string`                    | `'No data available'` |
| `hoverable`    | `hoverable`     | Hoverable rows | `boolean`                   | `true`                |
| `size`         | `size`          | Table size     | `"lg" \| "md" \| "sm"`      | `'md'`                |
| `stickyHeader` | `sticky-header` | Fixed header   | `boolean`                   | `false`               |
| `striped`      | `striped`       | Striped rows   | `boolean`                   | `false`               |


## Events

| Event         | Description     | Type                                 |
| ------------- | --------------- | ------------------------------------ |
| `erxRowClick` | Row click event | `CustomEvent<ErxTableRowClickEvent>` |
| `erxSort`     | Sort event      | `CustomEvent<ErxTableSortEvent>`     |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"body"`    |             |
| `"head"`    |             |
| `"row"`     |             |
| `"table"`   |             |
| `"td"`      |             |
| `"th"`      |             |
| `"wrapper"` |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
