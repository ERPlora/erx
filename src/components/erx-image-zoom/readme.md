# erx-image-zoom



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute    | Description                                      | Type                            | Default     |
| ------------------ | ------------ | ------------------------------------------------ | ------------------------------- | ----------- |
| `alt`              | `alt`        | Alt text                                         | `string`                        | `''`        |
| `lensSize`         | `lens-size`  | Lens size in pixels (for lens mode)              | `number`                        | `150`       |
| `position`         | `position`   | Zoom position/style                              | `"lens" \| "overlay" \| "side"` | `'overlay'` |
| `smooth`           | `smooth`     | Enable smooth transitions                        | `boolean`                       | `true`      |
| `src` _(required)_ | `src`        | Image source URL                                 | `string`                        | `undefined` |
| `trigger`          | `trigger`    | Zoom trigger mode                                | `"both" \| "click" \| "hover"`  | `'hover'`   |
| `zoomLevel`        | `zoom-level` | Zoom level multiplier                            | `number`                        | `2`         |
| `zoomSrc`          | `zoom-src`   | High-resolution image for zoom (defaults to src) | `string \| undefined`           | `undefined` |


## Events

| Event     | Description                     | Type                                               |
| --------- | ------------------------------- | -------------------------------------------------- |
| `erxZoom` | Emitted when zoom state changes | `CustomEvent<{ zoomed: boolean; level: number; }>` |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"image"`     |             |
| `"lens"`      |             |
| `"overlay"`   |             |
| `"side"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
