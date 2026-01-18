# erx-shell



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description             | Type                | Default   |
| ------------------ | ------------------- | ----------------------- | ------------------- | --------- |
| `collapsedWidth`   | `collapsed-width`   | Collapsed sidebar width | `string`            | `'64px'`  |
| `footerHeight`     | `footer-height`     | Footer height           | `string`            | `'48px'`  |
| `headerHeight`     | `header-height`     | Header height           | `string`            | `'64px'`  |
| `sidebarCollapsed` | `sidebar-collapsed` | Sidebar collapsed       | `boolean`           | `false`   |
| `sidebarPosition`  | `sidebar-position`  | Sidebar position        | `"left" \| "right"` | `'left'`  |
| `sidebarWidth`     | `sidebar-width`     | Sidebar width           | `string`            | `'260px'` |


## Events

| Event              | Description          | Type                                   |
| ------------------ | -------------------- | -------------------------------------- |
| `erxSidebarToggle` | Sidebar toggle event | `CustomEvent<{ collapsed: boolean; }>` |


## Methods

### `collapseSidebar() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `expandSidebar() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggleSidebar() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"footer"`    |             |
| `"header"`    |             |
| `"main"`      |             |
| `"sidebar"`   |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
