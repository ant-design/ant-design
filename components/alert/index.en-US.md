---
category: Components
type: Feedback
title: Alert
---

Alert component for feedback.

## When To Use

- When you need to show alert messages for users.
- When you need a persistent static container which is closable by user actions.

## API

| Property   | Description                                               | Type       | Default |
|----------- |---------------------------------------------------------  | ---------- |-------|
| type       | Type of Alert styles, options:`success`, `info`, `warning`, `error` | string | `info`, in `banner` mode it's `warning` |
| closable   | Whether Alert can be closed | boolean | - |
| closeText  | Close text to show | string\|ReactNode | - |
| message    | Content of Alert | string\|ReactNode | - |
| description | Additional content of Alert | string\|ReactNode | - |
| onClose    | Callback when close Alert | Function | - |
| showIcon   | Whether to show icon | boolean | false, in `banner` mode it's true |
| banner   | Whether to show as banner | boolean | false |
