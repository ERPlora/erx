# erx-rating



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                | Type                                                             | Default     |
| ------------- | -------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- | ----------- |
| `allowHalf`   | `allow-half`   | Allow half-star ratings                                    | `boolean`                                                        | `false`     |
| `color`       | `color`        | Color theme                                                | `"danger" \| "primary" \| "secondary" \| "success" \| "warning"` | `'warning'` |
| `disabled`    | `disabled`     | Disabled state                                             | `boolean`                                                        | `false`     |
| `icon`        | `icon`         | Icon type                                                  | `"circle" \| "heart" \| "star" \| "thumb"`                       | `'star'`    |
| `label`       | `label`        | Custom label text (e.g., "4.5 out of 5")                   | `string`                                                         | `''`        |
| `max`         | `max`          | Maximum rating value (number of stars/icons)               | `number`                                                         | `5`         |
| `readonly`    | `readonly`     | Read-only mode (no interaction)                            | `boolean`                                                        | `false`     |
| `reviewCount` | `review-count` | Number of reviews/ratings (displayed if showLabel is true) | `number`                                                         | `0`         |
| `showLabel`   | `show-label`   | Show rating count label                                    | `boolean`                                                        | `false`     |
| `showValue`   | `show-value`   | Show numeric value next to stars                           | `boolean`                                                        | `false`     |
| `size`        | `size`         | Size variant                                               | `"lg" \| "md" \| "sm"`                                           | `'md'`      |
| `value`       | `value`        | Current rating value                                       | `number`                                                         | `0`         |


## Events

| Event       | Description                            | Type                             |
| ----------- | -------------------------------------- | -------------------------------- |
| `erxChange` | Emitted when rating value changes      | `CustomEvent<RatingChangeEvent>` |
| `erxHover`  | Emitted when user hovers over a rating | `CustomEvent<number>`            |


## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"container"`      |             |
| `"label"`          |             |
| `"star"`           |             |
| `"star-container"` |             |
| `"star-half"`      |             |
| `"stars"`          |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
