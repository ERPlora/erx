# erx-color-picker



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description               | Type                      | Default                                                                                                                                                                                                 |
| ------------- | -------------- | ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`    | `disabled`     | Disabled state            | `boolean`                 | `false`                                                                                                                                                                                                 |
| `format`      | `format`       | Color format              | `"hex" \| "hsl" \| "rgb"` | `'hex'`                                                                                                                                                                                                 |
| `presets`     | --             | Preset colors             | `string[]`                | `[     '#ef4444', '#f97316', '#f59e0b', '#eab308',     '#84cc16', '#22c55e', '#14b8a6', '#06b6d4',     '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6',     '#a855f7', '#d946ef', '#ec4899', '#f43f5e',   ]` |
| `showAlpha`   | `show-alpha`   | Show alpha/opacity slider | `boolean`                 | `false`                                                                                                                                                                                                 |
| `showInput`   | `show-input`   | Show input field          | `boolean`                 | `true`                                                                                                                                                                                                  |
| `showPresets` | `show-presets` | Show preset colors        | `boolean`                 | `true`                                                                                                                                                                                                  |
| `value`       | `value`        | Selected color value      | `string`                  | `'#667eea'`                                                                                                                                                                                             |


## Events

| Event       | Description        | Type                               |
| ----------- | ------------------ | ---------------------------------- |
| `erxChange` | Color change event | `CustomEvent<ErxColorChangeEvent>` |


## Methods

### `setColor(color: string) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `color` | `string` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"alpha-slider"` |             |
| `"container"`    |             |
| `"hue-slider"`   |             |
| `"input"`        |             |
| `"panel"`        |             |
| `"presets"`      |             |
| `"sl-area"`      |             |
| `"trigger"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
