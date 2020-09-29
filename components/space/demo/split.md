---
order: 99
title:
  zh-CN: 拆分
  en-US: Split
---

## zh-CN

相邻组件拆分。

## en-US

Crowded components split.

```jsx
import { Space, Button, Divider } from 'antd';

function SpaceVertical() {
  return (
    <Space split={<Divider type="vertical" />}>
      <Button type="primary">Button</Button>
      <Button>Button</Button>
      <a>a</a>
    </Space>
  );
}

ReactDOM.render(<SpaceVertical />, mountNode);
```
