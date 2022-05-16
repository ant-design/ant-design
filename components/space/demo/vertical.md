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

const App = () => (
  <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Card title="Card" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Card" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Card" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>
);

export default App;
```
