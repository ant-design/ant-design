---
order: 1
title:
  zh-CN: 多色图标
  en-US: Two-tone icon and colorful icon
---

## zh-CN

双色图标可以通过 `twoToneColor` 属性设置主题色。

## en-US

You can set `twoToneColor` prop to specific primary color for two-tone icons.

```jsx
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

ReactDOM.render(
  <div className="icons-list">
    <SmileTwoTone />
    <HeartTwoTone twoToneColor="#eb2f96" />
    <CheckCircleTwoTone twoToneColor="#52c41a" />
  </div>,
  mountNode,
);
```
