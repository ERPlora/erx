# erx-json-viewer



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                         | Type                  | Default     |
| ------------------ | -------------------- | ----------------------------------- | --------------------- | ----------- |
| `collapsed`        | `collapsed`          | Collapsed by default                | `boolean`             | `false`     |
| `copyable`         | `copyable`           | Copy button                         | `boolean`             | `true`      |
| `data`             | --                   | JSON data to display                | `unknown`             | `null`      |
| `expandDepth`      | `expand-depth`       | Initial expansion depth             | `number`              | `2`         |
| `maxStringLength`  | `max-string-length`  | Max string length before truncation | `number`              | `100`       |
| `rootName`         | `root-name`          | Show root name                      | `string \| undefined` | `undefined` |
| `searchable`       | `searchable`         | Searchable                          | `boolean`             | `false`     |
| `showArrayIndexes` | `show-array-indexes` | Show array indexes                  | `boolean`             | `true`      |
| `showTypes`        | `show-types`         | Show data types                     | `boolean`             | `false`     |


## Methods

### `collapseAll() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `copyToClipboard() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `expandAll() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"toolbar"`   |             |
| `"tree"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
