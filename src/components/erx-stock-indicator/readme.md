# erx-stock-indicator



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                           | Type                                                    | Default                                                                                                              |
| ---------------- | ----------------- | ------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `allowBackorder` | `allow-backorder` | Enable backorder state (quantity < 0) | `boolean`                                               | `false`                                                                                                              |
| `labels`         | --                | Custom labels                         | `"backorder" \| "in-stock" \| "low" \| "out" \| string` | `{     'in-stock': 'In Stock',     'low': 'Low Stock',     'out': 'Out of Stock',     'backorder': 'Backorder',   }` |
| `lowThreshold`   | `low-threshold`   | Low stock threshold                   | `number`                                                | `5`                                                                                                                  |
| `maxStock`       | `max-stock`       | Maximum stock for bar visualization   | `number`                                                | `100`                                                                                                                |
| `quantity`       | `quantity`        | Current stock quantity                | `number`                                                | `0`                                                                                                                  |
| `showLabel`      | `show-label`      | Show label text                       | `boolean`                                               | `true`                                                                                                               |
| `showQuantity`   | `show-quantity`   | Show quantity number                  | `boolean`                                               | `true`                                                                                                               |
| `size`           | `size`            | Size variant                          | `"lg" \| "md" \| "sm"`                                  | `'md'`                                                                                                               |
| `variant`        | `variant`         | Display style                         | `"badge" \| "bar" \| "dot"`                             | `'dot'`                                                                                                              |


## Shadow Parts

| Part            | Description |
| --------------- | ----------- |
| `"badge"`       |             |
| `"bar"`         |             |
| `"bar-wrapper"` |             |
| `"container"`   |             |
| `"dot"`         |             |
| `"label"`       |             |
| `"quantity"`    |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
