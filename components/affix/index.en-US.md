---
category: Components
title: Affix
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YSm4RI3iOJ8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*03dxS64LxeQAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: Other
  order: 7
---

Wrap Affix around another component to make it stick the viewport.

## When To Use

On longer web pages, it's helpful to stick component into the viewport. This is common for menus and actions.

Please note that Affix should not cover other content on the page, especially when the size of the viewport is small.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/on-change.tsx">Callback</code>
<code src="./demo/target.tsx">Container to scroll.</code>
<code src="./demo/debug.tsx" debug>debug</code>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| offsetBottom | Offset from the bottom of the viewport (in pixels) | number | - |
| offsetTop | Offset from the top of the viewport (in pixels) | number | 0 |
| target | Specifies the scrollable area DOM node | () => HTMLElement | () => window |
| onChange | Callback for when Affix state is changed | (affixed?: boolean) => void | - |

**Note:** Children of `Affix` must not have the property `position: absolute`, but you can set `position: absolute` on `Affix` itself:

```jsx
<Affix style={{ position: 'absolute', top: y, left: x }}>...</Affix>
```

## FAQ

### When binding container with `target` in Affix, elements sometimes move out of the container.

We only listen to container scroll events for performance consideration. You can add custom listeners if you still want to: <https://codesandbox.io/s/stupefied-maxwell-ophqnm?file=/index.js>

Related issues：[#3938](https://github.com/ant-design/ant-design/issues/3938) [#5642](https://github.com/ant-design/ant-design/issues/5642) [#16120](https://github.com/ant-design/ant-design/issues/16120)

### When Affix is ​​used in a horizontal scroll container, the position of the element `left` is incorrect.

Affix is ​​generally only applicable to areas with one-way scrolling, and only supports usage in vertical scrolling containers. If you want to use it in a horizontal container, you can consider implementing with the native `position: sticky` property.

Related issues：[#29108](https://github.com/ant-design/ant-design/issues/29108)
