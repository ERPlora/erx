# erx-employee-card



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute      | Description | Type                         | Default      |
| ----------------------- | -------------- | ----------- | ---------------------------- | ------------ |
| `clickable`             | `clickable`    |             | `boolean`                    | `true`       |
| `employee` _(required)_ | --             |             | `ErxEmployee`                | `undefined`  |
| `orientation`           | `orientation`  |             | `"horizontal" \| "vertical"` | `'vertical'` |
| `showContact`           | `show-contact` |             | `boolean`                    | `true`       |
| `showStatus`            | `show-status`  |             | `boolean`                    | `true`       |
| `size`                  | `size`         |             | `"lg" \| "md" \| "sm"`       | `'md'`       |


## Events

| Event       | Description | Type                                                      |
| ----------- | ----------- | --------------------------------------------------------- |
| `erxAction` |             | `CustomEvent<{ employee: ErxEmployee; action: string; }>` |
| `erxSelect` |             | `CustomEvent<{ employee: ErxEmployee; }>`                 |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"actions"`   |             |
| `"avatar"`    |             |
| `"container"` |             |
| `"info"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
