# erx-tag-input



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                  | Default        |
| ------------- | ------------- | ----------- | --------------------- | -------------- |
| `config`      | --            |             | `TagInputConfig`      | `{}`           |
| `disabled`    | `disabled`    |             | `boolean`             | `false`        |
| `label`       | `label`       |             | `string \| undefined` | `undefined`    |
| `placeholder` | `placeholder` |             | `string`              | `'Add tag...'` |
| `suggestions` | --            |             | `Tag[]`               | `[]`           |
| `tags`        | --            |             | `Tag[]`               | `[]`           |


## Events

| Event       | Description | Type                                |
| ----------- | ----------- | ----------------------------------- |
| `erxChange` |             | `CustomEvent<TagInputChangeDetail>` |


## Methods

### `addTag(tag: Tag) => Promise<void>`



#### Parameters

| Name  | Type  | Description |
| ----- | ----- | ----------- |
| `tag` | `Tag` |             |

#### Returns

Type: `Promise<void>`



### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `removeTag(tagId: string) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `tagId` | `string` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part            | Description |
| --------------- | ----------- |
| `"container"`   |             |
| `"input"`       |             |
| `"suggestions"` |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
