---
category: Components
group: Data Display
title: Tooltip
description: Simple text popup box.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*9LKlRbWytugAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bCbPTJ7LQngAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a `button/text/operation`. It's often used instead of the html `title` attribute.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/smooth-transition.tsx">Smooth Transition</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/arrow.tsx">Arrow</code>
<code src="./demo/shift.tsx" iframe="300">Auto Shift</code>
<code src="./demo/auto-adjust-overflow.tsx" debug>Adjust placement automatically</code>
<code src="./demo/destroy-on-close.tsx" debug>Destroy tooltip when hidden</code>
<code src="./demo/colorful.tsx">Colorful Tooltip</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/debug.tsx" debug>Debug</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/disabled-children.tsx" debug>Disabled children</code>
<code src="./demo/wrap-custom-component.tsx">Wrap custom component</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| title | The text shown in the tooltip | ReactNode \| () => ReactNode | - | - |
| color | The background color. After using this attribute, the internal text color will adapt automatically | string | - | 5.27.0 |

### Common API

<embed src="./shared/sharedProps.en-US.md"></embed>

### ConfigProvider - tooltip.unique {#config-provider-tooltip-unique}

You can configure global unique display for Tooltip through ConfigProvider. When `unique` is set to `true`, only one Tooltip under the ConfigProvider will be displayed at the same time, providing better user experience and smooth transition effects.

Note: After configuration, properties like `getContainer`, `arrow` etc. will be ignored.

```tsx
import { Button, ConfigProvider, Space, Tooltip } from 'antd';

export default () => (
  <ConfigProvider
    tooltip={{
      unique: true,
    }}
  >
    <Space>
      <Tooltip title="First tooltip">
        <Button>Button 1</Button>
      </Tooltip>
      <Tooltip title="Second tooltip">
        <Button>Button 2</Button>
      </Tooltip>
    </Space>
  </ConfigProvider>
);
```

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Tooltip"></ComponentTokenTable>

## FAQ

### Why doesn't HOC work sometimes?

Please ensure that the child elements of `Tooltip` can accept `onMouseEnter`, `onMouseLeave`, `onPointerEnter`, `onPointerLeave`, `onFocus`, `onClick` events.

Please refer to https://github.com/ant-design/ant-design/issues/15909

### Why Tooltip not update content when close?

Tooltip will cache content when it is closed to avoid flicker when content is updated:

```jsx
// `title` will not blink when `user` is empty
<Tooltip open={user} title={user?.name} />
```

<div>
<img alt="no blink" height="50" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KVx7QLOYwVsAAAAAAAAAAAAADrJ8AQ/original" />
</div>

If need update content when close, you can set `fresh` property ([#44830](https://github.com/ant-design/ant-design/issues/44830)):

```jsx
<Tooltip open={user} title={user?.name} fresh />
```

<div>
<img alt="no blink" height="50" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rUbsR4xWpMsAAAAAAAAAAAAADrJ8AQ/original" />
</div>

---

<!-- 请确保在 FAQ 最后 -->

<embed src="./shared/sharedFAQ.en-US.md"></embed>
