---
category: Components
type: Feedback
title: Alert
---

Alert component for feedback.

## When To Use

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

## API

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| afterClose | Called when close animation is finished | () => void | - | 3.3.1 |
| banner | Whether to show as banner | boolean | false | 3.0.0 |
| closable | Whether Alert can be closed | boolean | - | 3.0.0 |
| closeText | Close text to show | string\|ReactNode | - | 3.0.0 |
| description | Additional content of Alert | string\|ReactNode | - | 3.0.0 |
| icon | Custom icon, effective when `showIcon` is `true` | ReactNode | - | 3.10.0 |
| message | Content of Alert | string\|ReactNode | - | 3.0.0 |
| showIcon | Whether to show icon | boolean | false, in `banner` mode default is true | 3.0.0 |
| type | Type of Alert styles, options: `success`, `info`, `warning`, `error` | string | `info`, in `banner` mode default is `warning` | 3.0.0 |
| onClose | Callback when Alert is closed | (e: MouseEvent) => void | - | 3.0.0 |
