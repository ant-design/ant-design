---
category: Components
type: Views
noinstant: true
english: Notification
---

To display a notification message globally.

## When to use
To display a notification message at the top right of the view port. Typically it can be
used in the following case:

- A notification with complext content.
- A notification of interaction with users, typically, it will provide next step hint
for users.
- A notification is pushed by application.

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
| message    | The title of notification box (required)        | React.Element or String      | No     |
| description | The content of notification box (required)     | React.Element or String      | No     |
| btn        | Custom close button                                   | React.Element      | No     |
| key        | The unique identity of current notification                                 | String      | No     |
| onClose    | Specify a function that will be called after clicking the default close button  | Function    | No     |
| duration   | A notification box is closed after 4.5s by default, but when you specify `duration` to null, it will never be closed automatically | Number    | 4.5     |


`Notification` also provide a global config method, when using this method once, all notification boxes
will be applied the defined configuration before displaying.

- `notification.config(options)`

```js
notification.config({
  top: 100,
  duration: 3,
});
```

| Property       | Description    | Type                       | Default       |
|------------|--------------------|----------------------------|--------------|
| top        | Offset to top of message | Number                     | 24px         |
| duration   | A duration to close notification automatically by default (unit: second) | Number                   | 4.5         |
