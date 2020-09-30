---
order: 99
title:
  zh-CN: 垂直分隔符
  en-US: Vertical Split
---

## zh-CN

相邻组件垂直分隔符。

## en-US

Crowded components vertical split.

```jsx
import { Space, Typography, Divider } from 'antd';

function SpaceVertical() {
  return (
    <Space type="vertical" split={<Divider />}>
      <Typography>Link</Typography>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
    </Space>
  );
}

ReactDOM.render(<SpaceVertical />, mountNode);
```
