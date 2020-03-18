---
order: 0
title:
  zh-CN: 垂直间距
  en-US: Vertical Space
---

```jsx
import { Space, Card } from 'antd';

function SpaceDemo() {
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

ReactDOM.render(<SpaceDemo />, mountNode);
```
