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

- `message.success(content, duration)`
- `message.error(content, duration)`
- `message.info(content, duration)`
- `message.warning(content, duration)`
- `message.warn(content, duration)`
- `message.loading(content, duration)`

This components provides 4 static methods, with arguments as following:

| Argument   | Description                        | Type                     | Default      |
|------------|------------------------------------|--------------------------|--------------|
| content    | content of the message             | string\|ReactNode | -            |
| duration   | time before auto-dismiss,in seconds | number                   | 1.5          |

Methods for global configuration and destruction are also provided:

- `message.config(options)`
- `message.destroy()`

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
