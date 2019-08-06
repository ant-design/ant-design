---
order: 1
title:
  zh-CN: 多色图标
  en-US: Two-tone icon and colorful icon
---

## zh-CN

可以通过设置 `theme` 属性为 `twoTone` 来渲染双色图标，并且可以设置主题色。

## en-US

Specific them property `theme` to `twoTone` to render two-tone icons. You can also set the primary color.

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
