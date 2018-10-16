---
category: Components
type: Navigation
title: Affix
---

Make an element stick to viewport.

## When To Use

When user browses a long web page, some content need to stick to the viewport. This is common for menus and actions.

Please note that Affix should not cover other content on the page, especially when the size of the viewport is small.

## API

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| offsetBottom | Pixels to offset from bottom when calculating position of scroll | number | - |
| offsetTop | Pixels to offset from top when calculating position of scroll | number | 0 |
| target | specifies the scrollable area dom node | () => HTMLElement | () => window |
| onChange | Callback for when affix state is changed | Function(affixed) | - |

**Note:** Children of `Affix` can not be `position: absolute`, but you can set `Affix` as `position: absolute`:

```jsx
<Affix style={{ position: 'absolute', top: y, left: x}}>
  ...
</Affix>
```
