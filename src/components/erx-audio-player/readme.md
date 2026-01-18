# erx-audio-player



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute     | Description                 | Type                             | Default      |
| ------------------ | ------------- | --------------------------- | -------------------------------- | ------------ |
| `artist`           | `artist`      | Artist name                 | `string \| undefined`            | `undefined`  |
| `autoplay`         | `autoplay`    | Auto play                   | `boolean`                        | `false`      |
| `compact`          | `compact`     | Compact mode                | `boolean`                        | `false`      |
| `cover`            | `cover`       | Cover art URL               | `string \| undefined`            | `undefined`  |
| `loop`             | `loop`        | Loop audio                  | `boolean`                        | `false`      |
| `muted`            | `muted`       | Muted by default            | `boolean`                        | `false`      |
| `preload`          | `preload`     | Preload strategy            | `"auto" \| "metadata" \| "none"` | `'metadata'` |
| `showSpeed`        | `show-speed`  | Show playback speed control | `boolean`                        | `false`      |
| `showTime`         | `show-time`   | Show time display           | `boolean`                        | `true`       |
| `showVolume`       | `show-volume` | Show volume control         | `boolean`                        | `true`       |
| `src` _(required)_ | `src`         | Audio source URL            | `string`                         | `undefined`  |
| `trackTitle`       | `track-title` | Track title                 | `string \| undefined`            | `undefined`  |


## Events

| Event           | Description            | Type                                                      |
| --------------- | ---------------------- | --------------------------------------------------------- |
| `erxEnded`      | Emitted on ended       | `CustomEvent<void>`                                       |
| `erxPause`      | Emitted on pause       | `CustomEvent<void>`                                       |
| `erxPlay`       | Emitted on play        | `CustomEvent<void>`                                       |
| `erxTimeUpdate` | Emitted on time update | `CustomEvent<{ currentTime: number; duration: number; }>` |


## Methods

### `pause() => Promise<void>`

Pause audio

#### Returns

Type: `Promise<void>`



### `play() => Promise<void>`

Play audio

#### Returns

Type: `Promise<void>`



### `seek(time: number) => Promise<void>`

Seek to time

#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `time` | `number` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"controls"`  |             |
| `"cover"`     |             |
| `"info"`      |             |
| `"play"`      |             |
| `"progress"`  |             |
| `"speed"`     |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
