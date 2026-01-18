# erx-drawer



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                    | Type                                     | Default     |
| ----------------- | ------------------ | ------------------------------ | ---------------------------------------- | ----------- |
| `backdrop`        | `backdrop`         | Show backdrop                  | `boolean`                                | `true`      |
| `backdropDismiss` | `backdrop-dismiss` | Close on backdrop click        | `boolean`                                | `true`      |
| `headerTitle`     | `header-title`     | Drawer title                   | `string \| undefined`                    | `undefined` |
| `keyboardClose`   | `keyboard-close`   | Enable keyboard close (Escape) | `boolean`                                | `true`      |
| `open`            | `open`             | Open state                     | `boolean`                                | `false`     |
| `position`        | `position`         | Drawer position                | `"left" \| "right"`                      | `'right'`   |
| `showClose`       | `show-close`       | Show close button              | `boolean`                                | `true`      |
| `size`            | `size`             | Drawer size                    | `"full" \| "lg" \| "md" \| "sm" \| "xl"` | `'md'`      |
| `width`           | `width`            | Custom width                   | `string \| undefined`                    | `undefined` |


## Events

| Event           | Description      | Type                              |
| --------------- | ---------------- | --------------------------------- |
| `erxOpenChange` | Open/close event | `CustomEvent<ErxDrawerOpenEvent>` |


## Methods

### `dismiss() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `present() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"backdrop"`  |             |
| `"close"`     |             |
| `"container"` |             |
| `"content"`   |             |
| `"drawer"`    |             |
| `"footer"`    |             |
| `"header"`    |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
