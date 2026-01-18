# erx-virtual-keyboard



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description            | Type                               | Default     |
| --------------- | ---------------- | ---------------------- | ---------------------------------- | ----------- |
| `disabled`      | `disabled`       | Disable keyboard       | `boolean`                          | `false`     |
| `hapticEnabled` | `haptic-enabled` | Enable haptic feedback | `boolean`                          | `true`      |
| `layout`        | `layout`         | Keyboard layout        | `"numeric" \| "phone" \| "qwerty"` | `'qwerty'`  |
| `soundEnabled`  | `sound-enabled`  | Enable sound feedback  | `boolean`                          | `false`     |
| `target`        | `target`         | Target input selector  | `string \| undefined`              | `undefined` |
| `theme`         | `theme`          | Keyboard theme         | `"auto" \| "dark" \| "light"`      | `'auto'`    |
| `visible`       | `visible`        | Show keyboard          | `boolean`                          | `true`      |


## Events

| Event      | Description               | Type                                 |
| ---------- | ------------------------- | ------------------------------------ |
| `erxClose` | Emitted on keyboard close | `CustomEvent<void>`                  |
| `erxEnter` | Emitted on Enter          | `CustomEvent<{ value: string; }>`    |
| `erxInput` | Emitted on key press      | `CustomEvent<ErxKeyboardInputEvent>` |


## Methods

### `clear() => Promise<void>`

Clear input

#### Returns

Type: `Promise<void>`



### `hide() => Promise<void>`

Hide the keyboard

#### Returns

Type: `Promise<void>`



### `setValue(value: string) => Promise<void>`

Set input value

#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `value` | `string` |             |

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Show the keyboard

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
