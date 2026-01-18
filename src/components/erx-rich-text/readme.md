# erx-rich-text



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description      | Type                | Default                                                                                                                                                                                     |
| ------------- | ------------- | ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`    | `disabled`    | Disabled state   | `boolean`           | `false`                                                                                                                                                                                     |
| `maxHeight`   | `max-height`  | Max height       | `string`            | `'500px'`                                                                                                                                                                                   |
| `minHeight`   | `min-height`  | Min height       | `string`            | `'200px'`                                                                                                                                                                                   |
| `placeholder` | `placeholder` | Placeholder text | `string`            | `'Start typing...'`                                                                                                                                                                         |
| `readOnly`    | `read-only`   | Read only        | `boolean`           | `false`                                                                                                                                                                                     |
| `tools`       | --            | Enabled tools    | `ErxRichTextTool[]` | `[     'bold', 'italic', 'underline', 'strike',     'heading1', 'heading2',     'bulletList', 'orderedList',     'blockquote', 'code', 'link',     'divider', 'undo', 'redo', 'clear',   ]` |
| `value`       | `value`       | HTML content     | `string`            | `''`                                                                                                                                                                                        |


## Events

| Event       | Description          | Type                                  |
| ----------- | -------------------- | ------------------------------------- |
| `erxChange` | Content change event | `CustomEvent<ErxRichTextChangeEvent>` |


## Methods

### `getContent() => Promise<{ html: string; text: string; }>`



#### Returns

Type: `Promise<{ html: string; text: string; }>`



### `setContent(html: string) => Promise<void>`



#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `html` | `string` |             |

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"editor"`    |             |
| `"tool"`      |             |
| `"toolbar"`   |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
