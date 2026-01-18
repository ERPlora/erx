# erx-split-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description          | Type                                   | Default     |
| ---------- | ---------- | -------------------- | -------------------------------------- | ----------- |
| `disabled` | `disabled` | Disabled state       | `boolean`                              | `false`     |
| `label`    | `label`    | Primary button label | `string`                               | `'Action'`  |
| `loading`  | `loading`  | Loading state        | `boolean`                              | `false`     |
| `options`  | --         | Dropdown options     | `ErxSplitButtonOption[]`               | `[]`        |
| `size`     | `size`     | Button size          | `"lg" \| "md" \| "sm"`                 | `'md'`      |
| `variant`  | `variant`  | Button variant       | `"danger" \| "primary" \| "secondary"` | `'primary'` |


## Events

| Event       | Description                           | Type                                                            |
| ----------- | ------------------------------------- | --------------------------------------------------------------- |
| `erxClick`  | Emitted when primary button clicked   | `CustomEvent<void>`                                             |
| `erxSelect` | Emitted when dropdown option selected | `CustomEvent<{ value: string; option: ErxSplitButtonOption; }>` |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"dropdown"`  |             |
| `"option"`    |             |
| `"primary"`   |             |
| `"toggle"`    |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
