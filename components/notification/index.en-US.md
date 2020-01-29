---
category: Components
type: Feedback
noinstant: true
title: Notification
---

Display a notification message globally.

## When To Use

To display a notification message at any of the four corners of the viewport. Typically it can be used in the following cases:

- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details about upcoming steps the user may have to follow.
- A notification that is pushed by the application.

## API

- `notification.success(config)`
- `notification.error(config)`
- `notification.info(config)`
- `notification.warning(config)`
- `notification.warn(config)`
- `notification.open(config)`
- `notification.close(key: String)`
- `notification.destroy()`

The properties of config are as follows:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bottom | Distance from the bottom of the viewport, when `placement` is `bottomRight` or `bottomLeft` (unit: pixels). | number | 24 |  |
| btn | Customized close button | ReactNode | - |  |
| className | Customized CSS class | string | - |  |
| description | The content of notification box (required) | string\|ReactNode | - |  |
| duration | Time in seconds before Notification is closed. When set to 0 or null, it will never be closed automatically | number | 4.5 |  |
| getContainer | Return the mount node for Notification | () => HTMLNode | () => document.body |  |
| icon | Customized icon | ReactNode | - |  |
| key | The unique identifier of the Notification | string | - |  |
| message | The title of notification box (required) | string\|ReactNode | - |  |
| onClose | Specify a function that will be called when the close button is clicked | Function | - |  |
| onClick | Specify a function that will be called when the notification is clicked | Function | - | 3.11.0 |
| placement | Position of Notification, can be one of `topLeft` `topRight` `bottomLeft` `bottomRight` | string | `topRight` |  |
| style | Customized inline style | [React.CSSProperties](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts#L794) | - |  |
| top | Distance from the top of the viewport, when `placement` is `topRight` or `topLeft` (unit: pixels). | number | 24 |  |
| closeIcon | custom close icon | ReactNode | - | 3.26.0 |

`notification` also provides a global `config()` method that can be used for specifying the default options. Once this method is used, all the notification boxes will take into account these globally defined options when displaying.

- `notification.config(options)`

```js
notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bottom | Distance from the bottom of the viewport, when `placement` is `bottomRight` or `bottomLeft` (unit: pixels). | number | 24 |  |
| duration | Time in seconds before Notification is closed. When set to 0 or null, it will never be closed automatically | number | 4.5 |  |
| getContainer | Return the mount node for Notification | () => HTMLNode | () => document.body |  |
| placement | Position of Notification, can be one of `topLeft` `topRight` `bottomLeft` `bottomRight` | string | `topRight` |  |
| top | Distance from the top of the viewport, when `placement` is `topRight` or `topLeft` (unit: pixels). | number | 24 |  |
| closeIcon | custom close icon | ReactNode | - | 3.25.0 |
