# erx-command



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                 | Type               | Default                         |
| -------------- | --------------- | --------------------------- | ------------------ | ------------------------------- |
| `disabled`     | `disabled`      | Disabled state              | `boolean`          | `false`                         |
| `emptyMessage` | `empty-message` | Empty state message         | `string`           | `'No results found'`            |
| `items`        | --              | Command items               | `ErxCommandItem[]` | `[]`                            |
| `maxResults`   | `max-results`   | Max visible items           | `number`           | `10`                            |
| `open`         | `open`          | Open state                  | `boolean`          | `false`                         |
| `placeholder`  | `placeholder`   | Placeholder text            | `string`           | `'Type a command or search...'` |
| `shortcutHint` | `shortcut-hint` | Show keyboard shortcut hint | `string`           | `'⌘K'`                          |
| `showRecent`   | `show-recent`   | Show recent items           | `boolean`          | `true`                          |


## Events

| Event           | Description          | Type                                 |
| --------------- | -------------------- | ------------------------------------ |
| `erxOpenChange` | Open/close event     | `CustomEvent<ErxCommandOpenEvent>`   |
| `erxSearch`     | Search event         | `CustomEvent<ErxCommandSearchEvent>` |
| `erxSelect`     | Command select event | `CustomEvent<ErxCommandSelectEvent>` |


## Methods

### `closePalette() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `openPalette() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `togglePalette() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part            | Description |
| --------------- | ----------- |
| `"backdrop"`    |             |
| `"container"`   |             |
| `"empty"`       |             |
| `"footer"`      |             |
| `"group"`       |             |
| `"group-title"` |             |
| `"header"`      |             |
| `"input"`       |             |
| `"item"`        |             |
| `"results"`     |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
