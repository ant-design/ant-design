---
category: Components
title: Alert
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Ct7bT7rrTTAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-U3XQqYN7VsAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: Feedback
  order: 6
---

Alert component for feedback.

## When To Use

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/style.tsx">More types</code>
<code src="./demo/closable.tsx">Closable</code>
<code src="./demo/description.tsx">Description</code>
<code src="./demo/icon.tsx">Icon</code>
<code src="./demo/close-text.tsx">Customized Close Text</code>
<code src="./demo/banner.tsx" iframe="250">Banner</code>
<code src="./demo/loop-banner.tsx">Loop Banner</code>
<code src="./demo/smooth-closed.tsx">Smoothly Unmount</code>
<code src="./demo/error-boundary.tsx">ErrorBoundary</code>
<code src="./demo/custom-icon.tsx" debug>Custom Icon</code>
<code src="./demo/action.tsx">Custom action</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| action | The action of Alert | ReactNode | - | 4.9.0 |
| afterClose | Called when close animation is finished | () => void | - |  |
| banner | Whether to show as banner | boolean | false |  |
| closable | Whether Alert can be closed | boolean | - |  |
| closeText | Close text to show | ReactNode | - |  |
| closeIcon | Custom close icon | ReactNode | `<CloseOutlined />` | 4.18.0 |
| description | Additional content of Alert | ReactNode | - |  |
| icon | Custom icon, effective when `showIcon` is true | ReactNode | - |  |
| message | Content of Alert | ReactNode | - |  |
| showIcon | Whether to show icon | boolean | false, in `banner` mode default is true |  |
| type | Type of Alert styles, options: `success`, `info`, `warning`, `error` | string | `info`, in `banner` mode default is `warning` |  |
| onClose | Callback when Alert is closed | (e: MouseEvent) => void | - |  |

### Alert.ErrorBoundary

| Property    | Description                      | Type      | Default           | Version |
| ----------- | -------------------------------- | --------- | ----------------- | ------- |
| description | Custom error description to show | ReactNode | {{ error stack }} |         |
| message     | Custom error message to show     | ReactNode | {{ error }}       |         |
