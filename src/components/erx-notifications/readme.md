# erx-notifications



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute            | Description                 | Type                | Default              |
| ----------------- | -------------------- | --------------------------- | ------------------- | -------------------- |
| `emptyMessage`    | `empty-message`      | Empty state message         | `string`            | `'No notifications'` |
| `groupByDate`     | `group-by-date`      | Group notifications by date | `boolean`           | `true`               |
| `maxVisible`      | `max-visible`        | Max visible notifications   | `number`            | `50`                 |
| `notifications`   | --                   | Notifications array         | `ErxNotification[]` | `[]`                 |
| `open`            | `open`               | Open state                  | `boolean`           | `false`              |
| `panelTitle`      | `panel-title`        | Panel title                 | `string`            | `'Notifications'`    |
| `showBadge`       | `show-badge`         | Show unread count badge     | `boolean`           | `true`               |
| `showClearAll`    | `show-clear-all`     | Show clear all button       | `boolean`           | `true`               |
| `showMarkAllRead` | `show-mark-all-read` | Show mark all read button   | `boolean`           | `true`               |


## Events

| Event                    | Description                | Type                                       |
| ------------------------ | -------------------------- | ------------------------------------------ |
| `erxClearAll`            | Clear all event            | `CustomEvent<void>`                        |
| `erxMarkAllRead`         | Mark all read event        | `CustomEvent<void>`                        |
| `erxNotificationAction`  | Notification action event  | `CustomEvent<ErxNotificationActionEvent>`  |
| `erxNotificationClick`   | Notification click event   | `CustomEvent<ErxNotificationClickEvent>`   |
| `erxNotificationDismiss` | Notification dismiss event | `CustomEvent<ErxNotificationDismissEvent>` |
| `erxOpenChange`          | Open/close event           | `CustomEvent<ErxNotificationsOpenEvent>`   |


## Methods

### `addNotification(notification: ErxNotification) => Promise<void>`



#### Parameters

| Name           | Type              | Description |
| -------------- | ----------------- | ----------- |
| `notification` | `ErxNotification` |             |

#### Returns

Type: `Promise<void>`



### `clearAll() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `markAllAsRead() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `markAsRead(id: string) => Promise<void>`



#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `string` |             |

#### Returns

Type: `Promise<void>`



### `removeNotification(id: string) => Promise<void>`



#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `string` |             |

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |
| `"empty"`     |             |
| `"item"`      |             |
| `"list"`      |             |
| `"panel"`     |             |
| `"trigger"`   |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
