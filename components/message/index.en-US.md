---
category: Components
type: Feedback
noinstant: true
title: Message
---

Display global messages as feedbacks to user operations.

## When To Use

- To provide feedbacks such as success, warning, error etc.
- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.

## API

This components provides some static methods, with usage and arguments as following:

- `message.success(content, duration, onClose)`
- `message.error(content, duration, onClose)`
- `message.info(content, duration, onClose)`
- `message.warning(content, duration, onClose)`
- `message.warn(content, duration, onClose)` // alias of warning
- `message.loading(content, duration, onClose)`

| Argument   | Description                        | Type                     | Default      |
|------------|------------------------------------|--------------------------|--------------|
| content    | content of the message             | string\|ReactNode | -            |
| duration   | time before auto-dismiss,in seconds | number                   | 1.5          |
| onClose   | Specify a function that will be called after the message closed| Function                   | -          |

Methods for global configuration and destruction are also provided:

- `message.config(options)`
- `message.destroy()`

### message.config

```js
message.config({
  top: 100,
  duration: 2,
});
```

| Argument   | Description                        | Type                     | Default     |
|------------|------------------------------------|--------------------------|-------------|
| top        | distance to top                    | number                   | 24px        |
| duration   | time before auto-dismiss,in seconds | number                   | 1.5         |
| getContainer | specify render container | () => HTMLElement | () => document.body |
