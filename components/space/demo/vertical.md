---
order: 1
title:
  zh-CN: 垂直间距
  en-US: Vertical Space
---

## zh-CN

相邻组件垂直间距。

## en-US

Crowded components vertical spacing.

```jsx
import { Space, Card } from 'antd';

function SpaceVertical() {
  return (
    <Space direction="vertical">
      <Card title="Card" style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Card" style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
  );
}

ReactDOM.render(<SpaceVertical />, mountNode);
```
