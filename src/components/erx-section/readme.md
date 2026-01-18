# erx-section



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description             | Type                             | Default     |
| -------------- | --------------- | ----------------------- | -------------------------------- | ----------- |
| `collapsed`    | `collapsed`     | Initial collapsed state | `boolean`                        | `false`     |
| `collapsible`  | `collapsible`   | Collapsible             | `boolean`                        | `false`     |
| `divider`      | `divider`       | Show divider            | `boolean`                        | `false`     |
| `icon`         | `icon`          | Icon                    | `string \| undefined`            | `undefined` |
| `padding`      | `padding`       | Padding size            | `"lg" \| "md" \| "none" \| "sm"` | `'md'`      |
| `sectionTitle` | `section-title` | Section title           | `string \| undefined`            | `undefined` |
| `subtitle`     | `subtitle`      | Subtitle/description    | `string \| undefined`            | `undefined` |


## Events

| Event       | Description  | Type                                 |
| ----------- | ------------ | ------------------------------------ |
| `erxToggle` | Toggle event | `CustomEvent<ErxSectionToggleEvent>` |


## Methods

### `collapse() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `expand() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"content"`   |             |
| `"header"`    |             |
| `"subtitle"`  |             |
| `"title"`     |             |
| `"toggle"`    |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
