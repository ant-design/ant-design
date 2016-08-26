---
category: Components
type: Views
english: Alert
---

Alert component for feedback.

## When to use

- When you need to show alert messages for users.
- When you need a persist static container, and closable by user actions.

## API

| Property   | Description                                               | Type       | Default |
|----------- |---------------------------------------------------------  | ---------- |-------|
| type       | Type of Alert styles, options:`success`, `info`, `warning`, `error` | String | `info` |
| closable   | Whether Alert can be closed | Boolean | - |
| closeText  | Close text to show | React.Node | - |
| message    | Content of Alert | React.Node | - |
| description | Additional content of Alert | React.Node | - |
| onClose    | Callback when close Alert | Function | - |
| showIcon   | Whether to show icon | Boolean | false |
| banner   | Whether to show as banner | Boolean | false |
