# erx-sheet



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                         | Type                                     | Default     |
| ------------------- | -------------------- | ----------------------------------- | ---------------------------------------- | ----------- |
| `backdrop`          | `backdrop`           | Show backdrop                       | `boolean`                                | `true`      |
| `backdropDismiss`   | `backdrop-dismiss`   | Close on backdrop click             | `boolean`                                | `true`      |
| `breakpoints`       | --                   | Snap breakpoints (for bottom sheet) | `ErxSheetBreakpoint[]`                   | `[]`        |
| `customSize`        | `custom-size`        | Custom height/width                 | `string \| undefined`                    | `undefined` |
| `initialBreakpoint` | `initial-breakpoint` | Initial breakpoint                  | `number`                                 | `0`         |
| `open`              | `open`               | Open state                          | `boolean`                                | `false`     |
| `position`          | `position`           | Sheet position                      | `"bottom" \| "left" \| "right" \| "top"` | `'bottom'`  |
| `showHandle`        | `show-handle`        | Show drag handle                    | `boolean`                                | `true`      |
| `size`              | `size`               | Sheet size                          | `"full" \| "lg" \| "md" \| "sm" \| "xl"` | `'md'`      |
| `swipeToDismiss`    | `swipe-to-dismiss`   | Enable swipe to dismiss             | `boolean`                                | `true`      |


## Events

| Event                 | Description             | Type                                   |
| --------------------- | ----------------------- | -------------------------------------- |
| `erxBreakpointChange` | Breakpoint change event | `CustomEvent<ErxSheetBreakpointEvent>` |
| `erxOpenChange`       | Open/close event        | `CustomEvent<ErxSheetOpenEvent>`       |


## Methods

### `dismiss() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `present() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setBreakpoint(index: number) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `index` | `number` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"backdrop"`  |             |
| `"container"` |             |
| `"content"`   |             |
| `"handle"`    |             |
| `"sheet"`     |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
