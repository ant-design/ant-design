---
order: 1
iframe: 400
title:
  zh-CN: 自定义样式
  en-US: Custom style
---

## zh-CN

可以自定义回到顶部按钮的样式，限制宽高：`40px * 40px`。

## en-US

You can customize the style of the button, just note the size limit: no more than `40px * 40px`.

```jsx
import { BackTop } from 'antd';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

ReactDOM.render(
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
  </div>,
  mountNode,
);
```
