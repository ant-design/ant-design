---
order: 1
iframe: 400
title:
  zh-CN: 自定义样式
  en-US: Custom style
---

## zh-CN

可以自定义回到顶部按钮的样式，限制宽高：`40px * 40px`。

> 注意：`BackTop` 需要一个可接受 `onClick` 事件的元素作为 `children`。 如果您直接将文本作为子项放置，则该组件将无法正常运行。

## en-US

You can customize the style of the button, just note the size limit: no more than `40px * 40px`.

> Note: `BackTop` expects a element could accept `onClick` propety as children. If you put a text directly as children the component will not function properly.

```tsx
import { BackTop } from 'antd';
import React from 'react';

const style: React.CSSProperties = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

const App: React.FC = () => (
  <div style={{ height: '600vh', padding: 8 }}>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <BackTop>
      <div style={style}>UP</div>
    </BackTop>
  </div>
);

export default App;
```
