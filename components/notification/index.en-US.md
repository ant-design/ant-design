---
category: Components
type: Feedback
noinstant: true
title: Notification
---

To display a notification message globally.

## When To Use
To display a notification message at the four corner of the view port. Typically it can be
used in the following cases:

- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details
about upcoming steps the user may have to follow.
- A notification that is pushed by the application.

## API

- `notification.success(config)`
- `notification.error(config)`
- `notification.info(config)`
- `notification.warning(config)`
- `notification.warn(config)`
- `notification.close(key: String)`
- `notification.destroy()`

The properties of config are as follows:

| Property   | Description                                     | Type         | Default |
|----------- |---------------------------------------------    | ----------- |--------|
| message    | The title of notification box (required)        | string\|ReactNode      | -     |
| description | The content of notification box (required)     | string\|ReactNode      | -     |
| btn        | Customized close button                         | ReactNode      | -     |
| icon       | Customized icon                                 | ReactNode      | _     |
| key        | The unique identifier of current notification                                 | string      | -     |
| onClose    | Specify a function that will be called after clicking the default close button  | Function    | -     |
| duration   | A notification box is closed after 4.5s by default. When specifying `duration` to null or 0, it will never be closed automatically | number    | 4.5     |
| placement  | To set the position, which can be one of `topLeft` `topRight` `bottomLeft` `bottomRight` | string | topRight |


`notification` also provide a global `config()` method that can be used for specifying the default options. Once this method is used, all the notification boxes
will take into account these globally defined options before displaying.

- `notification.config(options)`
```js
notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});
```

| Property       | Description    | Type                       | Default       |
|------------|--------------------|----------------------------|--------------|
| placement  | To set the position, which can be one of `topLeft` `topRight` `bottomLeft` `bottomRight` | string | topRight |
| top        | Offset to top, when message pop up from `topRight` or `topLeft` (unit: pixels).          | number                   | 24        |
| bottom     | Offset to bottom, when message pop up from `bottomRight` or `bottomLeft` (unit: pixels). | number                   | 24        |
| duration   | A duration to close notification automatically by default (unit: second) | number                   | 4.5         |
