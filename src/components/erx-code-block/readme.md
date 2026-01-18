# erx-code-block



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                         | Type                              | Default     |
| ----------------- | ------------------- | --------------------------------------------------- | --------------------------------- | ----------- |
| `code`            | `code`              | Code content                                        | `string`                          | `''`        |
| `fileName`        | `file-name`         | File name to display                                | `string \| undefined`             | `undefined` |
| `highlightLines`  | `highlight-lines`   | Highlight specific lines (comma-separated or array) | `number[] \| string \| undefined` | `undefined` |
| `language`        | `language`          | Programming language                                | `string \| undefined`             | `undefined` |
| `maxHeight`       | `max-height`        | Max height before scrolling                         | `string \| undefined`             | `undefined` |
| `showCopy`        | `show-copy`         | Show copy button                                    | `boolean`                         | `true`      |
| `showLanguage`    | `show-language`     | Show language badge                                 | `boolean`                         | `true`      |
| `showLineNumbers` | `show-line-numbers` | Show line numbers                                   | `boolean`                         | `true`      |
| `wordWrap`        | `word-wrap`         | Wrap long lines                                     | `boolean`                         | `false`     |


## Events

| Event     | Description                 | Type                                               |
| --------- | --------------------------- | -------------------------------------------------- |
| `erxCopy` | Emitted when code is copied | `CustomEvent<{ code: string; success: boolean; }>` |


## Methods

### `copyCode() => Promise<boolean>`

Copy code to clipboard

#### Returns

Type: `Promise<boolean>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"content"`   |             |
| `"copy"`      |             |
| `"filename"`  |             |
| `"header"`    |             |
| `"language"`  |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
