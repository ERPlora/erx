# erx-category-tabs



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                          | Type                                | Default     |
| ------------------- | --------------------- | ------------------------------------ | ----------------------------------- | ----------- |
| `allLabel`          | `all-label`           | Label for "All" category             | `string`                            | `'All'`     |
| `categories`        | --                    | Categories to display                | `ErxCategory[]`                     | `[]`        |
| `centered`          | `centered`            | Center tabs when they fit            | `boolean`                           | `false`     |
| `disabled`          | `disabled`            | Disable all tabs                     | `boolean`                           | `false`     |
| `scrollable`        | `scrollable`          | Allow horizontal scroll              | `boolean`                           | `true`      |
| `showAll`           | `show-all`            | Show "All" category at the beginning | `boolean`                           | `true`      |
| `showCounts`        | `show-counts`         | Show item counts                     | `boolean`                           | `false`     |
| `showIcons`         | `show-icons`          | Show category icons                  | `boolean`                           | `true`      |
| `showScrollButtons` | `show-scroll-buttons` | Show scroll indicators/buttons       | `boolean`                           | `true`      |
| `size`              | `size`                | Size variant                         | `"lg" \| "md" \| "sm"`              | `'md'`      |
| `value`             | `value`               | Currently selected category ID       | `number \| string \| undefined`     | `undefined` |
| `variant`           | `variant`             | Tab style variant                    | `"chips" \| "pills" \| "underline"` | `'pills'`   |


## Events

| Event       | Description                         | Type                                  |
| ----------- | ----------------------------------- | ------------------------------------- |
| `erxSelect` | Emitted when a category is selected | `CustomEvent<ErxCategorySelectEvent>` |


## Methods

### `scrollToCategory(id: string | number) => Promise<void>`

Scroll to a specific category

#### Parameters

| Name | Type               | Description |
| ---- | ------------------ | ----------- |
| `id` | `string \| number` |             |

#### Returns

Type: `Promise<void>`



### `select(id: string | number | null) => Promise<void>`

Select a category by ID

#### Parameters

| Name | Type                       | Description |
| ---- | -------------------------- | ----------- |
| `id` | `string \| number \| null` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"scroll"`    |             |
| `"tab"`       |             |
| `"tabs"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
