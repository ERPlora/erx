# erx-image-gallery



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description        | Type                                | Default  |
| ------------- | -------------- | ------------------ | ----------------------------------- | -------- |
| `aspectRatio` | `aspect-ratio` | Image aspect ratio | `string`                            | `'1'`    |
| `columns`     | `columns`      | Columns (for grid) | `number`                            | `3`      |
| `gap`         | `gap`          | Gap between images | `number`                            | `8`      |
| `images`      | --             | Images array       | `ErxGalleryImage[]`                 | `[]`     |
| `layout`      | `layout`       | Layout type        | `"carousel" \| "grid" \| "masonry"` | `'grid'` |
| `lazyLoad`    | `lazy-load`    | Lazy load images   | `boolean`                           | `true`   |
| `lightbox`    | `lightbox`     | Enable lightbox    | `boolean`                           | `true`   |


## Events

| Event           | Description       | Type                                |
| --------------- | ----------------- | ----------------------------------- |
| `erxImageClick` | Image click event | `CustomEvent<ErxGalleryClickEvent>` |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"caption"`   |             |
| `"container"` |             |
| `"grid"`      |             |
| `"image"`     |             |
| `"item"`      |             |
| `"lightbox"`  |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
