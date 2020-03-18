---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic Usage
---

## zh-CN

相邻按钮水平间距。

## en-US

Crowded button horizontal space.

```jsx
import { Button, Space, ConfigProvider } from 'antd';

function SpaceDemo() {
  return (
    <Space>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
    </Space>
  );
}

ReactDOM.render(<SpaceDemo />, mountNode);
```
