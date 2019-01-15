---
order: 6
title:
  zh-CN: 填底的按钮样式
  en-US: Solid radio button
---

## zh-CN

实色填底的单选按钮样式。

## en-US

Solid radio button style.

```jsx
import { Radio } from 'antd';

ReactDOM.render(
  <div>
    <div>
      <Radio.Group defaultValue="a" buttonStyle="solid">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
    </div>
    <div style={{ marginTop: 16 }}>
      <Radio.Group defaultValue="c" buttonStyle="solid">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b" disabled>Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
    </div>
  </div>,
  mountNode
);
```
