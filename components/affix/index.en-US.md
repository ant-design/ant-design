---
category: Components
type: Other
title: Affix
---

Make an element sticky to viewport.

## When To Use

When user browses a long web page, some content need to sticky to viewport. It is common for menus and actions.

Please note that Affix should not cover other content in page, especially when the size of viewport is small.

## API

| Property     | Description           | Type     | Default      |
|--------------|-----------------------|----------|--------------|
| offsetTop    | Pixels to offset from top when calculating position of scroll | Number | 0 |
| offsetBottom | Pixels to offset from bottom when calculating position of scroll | Number | - |
| onChange     | Callback when affix state is changed | Function(affixed) | - |

**Note:** Children of `Affix` can not be `position: absolute`, but you can set `Affix` as `position: absolute`:

```jsx
<Affix style={{ position: 'absolute', top: y, left: x}}>
  ...
</Affix>
```
