# erx-cart



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                            | Type            | Default                |
| ---------------------- | ------------------------ | -------------------------------------- | --------------- | ---------------------- |
| `compact`              | `compact`                | Compact mode                           | `boolean`       | `false`                |
| `currency`             | `currency`               | Currency symbol                        | `string`        | `'$'`                  |
| `disabled`             | `disabled`               | Disable all interactions               | `boolean`       | `false`                |
| `editableNotes`        | `editable-notes`         | Editable item notes                    | `boolean`       | `false`                |
| `emptyMessage`         | `empty-message`          | Empty cart message                     | `string`        | `'Your cart is empty'` |
| `items`                | --                       | Cart items                             | `ErxCartItem[]` | `[]`                   |
| `locale`               | `locale`                 | Currency locale for formatting         | `string`        | `'en-US'`              |
| `showClearButton`      | `show-clear-button`      | Show clear all button                  | `boolean`       | `true`                 |
| `showImages`           | `show-images`            | Show item images                       | `boolean`       | `true`                 |
| `showQuantityControls` | `show-quantity-controls` | Show quantity controls                 | `boolean`       | `true`                 |
| `showRemoveButton`     | `show-remove-button`     | Show remove button                     | `boolean`       | `true`                 |
| `showSummary`          | `show-summary`           | Show summary section                   | `boolean`       | `true`                 |
| `taxIncluded`          | `tax-included`           | Whether tax is included in prices      | `boolean`       | `false`                |
| `taxLabel`             | `tax-label`              | Tax label                              | `string`        | `'Tax'`                |
| `taxRate`              | `tax-rate`               | Tax rate (decimal, e.g., 0.21 for 21%) | `number`        | `0`                    |


## Events

| Event           | Description                        | Type                                                              |
| --------------- | ---------------------------------- | ----------------------------------------------------------------- |
| `erxCheckout`   | Emitted when checkout is clicked   | `CustomEvent<{ summary: ErxCartSummary; items: ErxCartItem[]; }>` |
| `erxClear`      | Emitted when cart is cleared       | `CustomEvent<ErxCartClearEvent>`                                  |
| `erxItemChange` | Emitted when item quantity changes | `CustomEvent<ErxCartItemChangeEvent>`                             |
| `erxItemRemove` | Emitted when item is removed       | `CustomEvent<ErxCartItemRemoveEvent>`                             |


## Methods

### `addItem(item: ErxCartItem) => Promise<void>`

Add item to cart

#### Parameters

| Name   | Type          | Description |
| ------ | ------------- | ----------- |
| `item` | `ErxCartItem` |             |

#### Returns

Type: `Promise<void>`



### `clear() => Promise<void>`

Clear all items

#### Returns

Type: `Promise<void>`



### `getSummary() => Promise<ErxCartSummary>`

Get current summary

#### Returns

Type: `Promise<ErxCartSummary>`



### `removeItem(itemId: string | number) => Promise<void>`

Remove item from cart

#### Parameters

| Name     | Type               | Description |
| -------- | ------------------ | ----------- |
| `itemId` | `string \| number` |             |

#### Returns

Type: `Promise<void>`



### `updateQuantity(itemId: string | number, quantity: number) => Promise<void>`

Update item quantity

#### Parameters

| Name       | Type               | Description |
| ---------- | ------------------ | ----------- |
| `itemId`   | `string \| number` |             |
| `quantity` | `number`           |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"actions"`      |             |
| `"container"`    |             |
| `"empty"`        |             |
| `"header"`       |             |
| `"item"`         |             |
| `"item-content"` |             |
| `"item-image"`   |             |
| `"items"`        |             |
| `"summary"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
