# erx-video-player



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                            | Type                             | Default      |
| ------------ | ------------ | -------------------------------------- | -------------------------------- | ------------ |
| `autoplay`   | `autoplay`   | Auto play                              | `boolean`                        | `false`      |
| `controls`   | `controls`   | Show controls                          | `boolean`                        | `true`       |
| `fullscreen` | `fullscreen` | Enable fullscreen                      | `boolean`                        | `true`       |
| `loop`       | `loop`       | Loop video                             | `boolean`                        | `false`      |
| `muted`      | `muted`      | Muted by default                       | `boolean`                        | `false`      |
| `pip`        | `pip`        | Enable picture-in-picture              | `boolean`                        | `true`       |
| `poster`     | `poster`     | Poster image                           | `string \| undefined`            | `undefined`  |
| `preload`    | `preload`    | Preload strategy                       | `"auto" \| "metadata" \| "none"` | `'metadata'` |
| `sources`    | --           | Multiple sources for quality selection | `ErxVideoSource[]`               | `[]`         |
| `src`        | `src`        | Video source URL or array of sources   | `string \| undefined`            | `undefined`  |


## Events

| Event           | Description            | Type                                                      |
| --------------- | ---------------------- | --------------------------------------------------------- |
| `erxEnded`      | Emitted on ended       | `CustomEvent<void>`                                       |
| `erxPause`      | Emitted on pause       | `CustomEvent<void>`                                       |
| `erxPlay`       | Emitted on play        | `CustomEvent<void>`                                       |
| `erxTimeUpdate` | Emitted on time update | `CustomEvent<{ currentTime: number; duration: number; }>` |


## Methods

### `pause() => Promise<void>`

Pause video

#### Returns

Type: `Promise<void>`



### `play() => Promise<void>`

Play video

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



### `toggleFullscreen() => Promise<void>`

Toggle fullscreen

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"container"`    |             |
| `"controls"`     |             |
| `"play-overlay"` |             |
| `"video"`        |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
