# erx-upload



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description             | Type      | Default            |
| ------------- | -------------- | ----------------------- | --------- | ------------------ |
| `accept`      | `accept`       | Accept file types       | `string`  | `'*/*'`            |
| `disabled`    | `disabled`     | Disabled state          | `boolean` | `false`            |
| `maxFiles`    | `max-files`    | Max number of files     | `number`  | `10`               |
| `maxSize`     | `max-size`     | Max file size in bytes  | `number`  | `10 * 1024 * 1024` |
| `multiple`    | `multiple`     | Allow multiple files    | `boolean` | `true`             |
| `showList`    | `show-list`    | Show file list          | `boolean` | `true`             |
| `showPreview` | `show-preview` | Show preview for images | `boolean` | `true`             |


## Events

| Event         | Description           | Type                                    |
| ------------- | --------------------- | --------------------------------------- |
| `erxComplete` | Upload complete event | `CustomEvent<ErxUploadCompleteEvent>`   |
| `erxError`    | Upload error event    | `CustomEvent<ErxUploadErrorEvent>`      |
| `erxProgress` | Upload progress event | `CustomEvent<ErxUploadProgressEvent>`   |
| `erxRemove`   | File remove event     | `CustomEvent<{ file: ErxUploadFile; }>` |
| `erxSelect`   | File select event     | `CustomEvent<ErxUploadSelectEvent>`     |


## Methods

### `clearFiles() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getFiles() => Promise<ErxUploadFile[]>`



#### Returns

Type: `Promise<ErxUploadFile[]>`



### `removeFile(id: string) => Promise<void>`



#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `string` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"dropzone"`  |             |
| `"file"`      |             |
| `"list"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
