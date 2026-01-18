# erx-pin-pad



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                        | Type                                   | Default     |
| ---------------- | ----------------- | -------------------------------------------------- | -------------------------------------- | ----------- |
| `allowDecimal`   | `allow-decimal`   | Enable decimal point button                        | `boolean`                              | `false`     |
| `allowNegative`  | `allow-negative`  | Enable negative numbers (adds +/- button)          | `boolean`                              | `false`     |
| `autoSubmit`     | `auto-submit`     | Auto-submit when maxLength is reached              | `boolean`                              | `false`     |
| `customButtons`  | --                | Custom button layout (3 buttons per row)           | `ErxPinPadButtonConfig[] \| undefined` | `undefined` |
| `disabled`       | `disabled`        | Disable the entire pin pad                         | `boolean`                              | `false`     |
| `hapticFeedback` | `haptic-feedback` | Enable haptic feedback (vibration) on button press | `boolean`                              | `true`      |
| `label`          | `label`           | Label text above the display                       | `string \| undefined`                  | `undefined` |
| `masked`         | `masked`          | Mask the input (show dots instead of numbers)      | `boolean`                              | `true`      |
| `maxLength`      | `max-length`      | Maximum length of the PIN                          | `number`                               | `4`         |
| `placeholder`    | `placeholder`     | Placeholder text when empty                        | `string`                               | `''`        |
| `showBackspace`  | `show-backspace`  | Show backspace button                              | `boolean`                              | `true`      |
| `showClear`      | `show-clear`      | Show clear button                                  | `boolean`                              | `true`      |
| `showDisplay`    | `show-display`    | Show the value display                             | `boolean`                              | `true`      |
| `showSubmit`     | `show-submit`     | Show submit/enter button                           | `boolean`                              | `true`      |
| `soundEnabled`   | `sound-enabled`   | Sound effect on button press                       | `boolean`                              | `false`     |
| `value`          | `value`           | Current value                                      | `string`                               | `''`        |


## Events

| Event         | Description                                                  | Type                                |
| ------------- | ------------------------------------------------------------ | ----------------------------------- |
| `erxChange`   | Emitted when value changes                                   | `CustomEvent<ErxPinPadChangeEvent>` |
| `erxClear`    | Emitted when clear is pressed                                | `CustomEvent<void>`                 |
| `erxKeyPress` | Emitted on each key press                                    | `CustomEvent<{ key: string; }>`     |
| `erxSubmit`   | Emitted when PIN is submitted (Enter pressed or auto-submit) | `CustomEvent<ErxPinPadSubmitEvent>` |


## Methods

### `clear() => Promise<void>`

Clear the current value

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Focus the pin pad

#### Returns

Type: `Promise<void>`



### `setValue(value: string) => Promise<void>`

Set the value programmatically

#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `value` | `string` |             |

#### Returns

Type: `Promise<void>`



### `submit() => Promise<void>`

Submit the current value

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"button"`    |             |
| `"container"` |             |
| `"display"`   |             |
| `"keypad"`    |             |
| `"submit"`    |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
