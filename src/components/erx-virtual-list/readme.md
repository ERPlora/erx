# erx-virtual-list



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                | Default              |
| -------- | --------- | ----------- | ------------------- | -------------------- |
| `config` | --        |             | `VirtualListConfig` | `{ itemHeight: 48 }` |
| `items`  | --        |             | `VirtualListItem[]` | `[]`                 |


## Events

| Event       | Description | Type                                   |
| ----------- | ----------- | -------------------------------------- |
| `erxScroll` |             | `CustomEvent<VirtualListScrollDetail>` |


## Methods

### `scrollToIndex(index: number) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `index` | `number` |             |

#### Returns

Type: `Promise<void>`



### `scrollToTop() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"item"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
