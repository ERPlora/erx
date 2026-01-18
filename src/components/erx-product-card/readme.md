# erx-product-card



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute         | Description                    | Type                         | Default      |
| ---------------------- | ----------------- | ------------------------------ | ---------------------------- | ------------ |
| `currency`             | `currency`        | Currency symbol                | `string`                     | `'$'`        |
| `disabled`             | `disabled`        | Disable the card               | `boolean`                    | `false`      |
| `imageFit`             | `image-fit`       | Image fit mode                 | `"contain" \| "cover"`       | `'cover'`    |
| `locale`               | `locale`          | Currency locale for formatting | `string`                     | `'en-US'`    |
| `orientation`          | `orientation`     | Card orientation               | `"horizontal" \| "vertical"` | `'vertical'` |
| `placeholder`          | `placeholder`     | Placeholder image URL          | `string \| undefined`        | `undefined`  |
| `product` _(required)_ | --                | Product data                   | `ErxProduct`                 | `undefined`  |
| `selected`             | `selected`        | Mark as selected               | `boolean`                    | `false`      |
| `showAddButton`        | `show-add-button` | Show add to cart button        | `boolean`                    | `true`       |
| `showImage`            | `show-image`      | Show image                     | `boolean`                    | `true`       |
| `showPrice`            | `show-price`      | Show price                     | `boolean`                    | `true`       |
| `showQuantity`         | `show-quantity`   | Show quantity controls         | `boolean`                    | `false`      |
| `showStock`            | `show-stock`      | Show stock indicator           | `boolean`                    | `true`       |
| `size`                 | `size`            | Card size variant              | `"lg" \| "md" \| "sm"`       | `'md'`       |


## Events

| Event               | Description                         | Type                                     |
| ------------------- | ----------------------------------- | ---------------------------------------- |
| `erxAdd`            | Emitted when add to cart is clicked | `CustomEvent<ErxProductCardAddEvent>`    |
| `erxQuantityChange` | Emitted when quantity changes       | `CustomEvent<{ quantity: number; }>`     |
| `erxSelect`         | Emitted when card is clicked        | `CustomEvent<ErxProductCardSelectEvent>` |


## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"add-button"`     |             |
| `"badges"`         |             |
| `"category"`       |             |
| `"container"`      |             |
| `"content"`        |             |
| `"image"`          |             |
| `"image-wrapper"`  |             |
| `"name"`           |             |
| `"original-price"` |             |
| `"placeholder"`    |             |
| `"price"`          |             |
| `"price-wrapper"`  |             |
| `"quantity"`       |             |
| `"sku"`            |             |
| `"stock"`          |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
