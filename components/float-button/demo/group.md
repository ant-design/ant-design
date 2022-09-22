---
order: 4
iframe: 360
title:
  zh-CN: 浮动按钮组
  en-US: FloatButton Group
---

## zh-CN

按钮组合使用时，推荐使用 `<FloatButton.Group />`，你可以通过设置 shape 属性自定义悬浮按钮组的样式，悬浮按钮组的 shape 会覆盖内部的 shape 属性。

## en-US

When multiple buttons are used together，you can use `<FloatButton.Group />`. You can customize the shape of the group by setting the `Shape` property. The shape of the group overrides the internal shape property.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton.Group shape="circle" style={{ right: 24 }}>
      <FloatButton />
      <FloatButton />
      <FloatButton.BackTop visibilityHeight={-1} />
    </FloatButton.Group>
    <FloatButton.Group shape="square" style={{ right: 94 }}>
      <FloatButton />
      <FloatButton />
      <FloatButton.BackTop visibilityHeight={-1} />
    </FloatButton.Group>
  </>
);

export default App;
```
