---
order: 99
title:
  zh-CN: 分隔符
  en-US: Split
---

## zh-CN

相邻组件分隔符。

## en-US

Crowded components split.

```jsx
import { Space, Typography, Divider } from 'antd';

function SpaceSplit() {
  return (
    <Space split={<Divider type="vertical" />}>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
    </Space>
  );
}

ReactDOM.render(<SpaceSplit />, mountNode);
```
