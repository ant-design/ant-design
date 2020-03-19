---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic Usage
---

## zh-CN

相邻组件水平间距。

## en-US

Crowded components horizontal spacing.

```jsx
import { Button, Space } from 'antd';

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
