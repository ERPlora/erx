# erx-tree



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type         | Default |
| -------- | --------- | ----------- | ------------ | ------- |
| `config` | --        |             | `TreeConfig` | `{}`    |
| `nodes`  | --        |             | `TreeNode[]` | `[]`    |


## Events

| Event       | Description | Type                            |
| ----------- | ----------- | ------------------------------- |
| `erxExpand` |             | `CustomEvent<TreeExpandDetail>` |
| `erxSelect` |             | `CustomEvent<TreeSelectDetail>` |


## Methods

### `collapseAll() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `expandAll() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `selectNode(nodeId: string) => Promise<void>`



#### Parameters

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| `nodeId` | `string` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
