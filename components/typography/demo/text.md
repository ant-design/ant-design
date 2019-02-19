---
order: 2
title:
  zh-CN: 文本组件
  en-US: Text Component
---

## zh-CN

内置不同样式的文本。

## en-US

Provides multiple types of text.

```jsx
import { Typography } from 'antd';

const { Text } = Typography;

ReactDOM.render(
  <div>
    <Text>Ant Design</Text>
    <br />
    <Text type="secondary">Ant Design</Text>
    <br />
    <Text type="warning">Ant Design</Text>
    <br />
    <Text type="danger">Ant Design</Text>
    <br />
    <Text disabled>Ant Design</Text>
    <br />
    <Text mark>Ant Design</Text>
    <br />
    <Text code>Ant Design</Text>
    <br />
    <Text underline>Ant Design</Text>
    <br />
    <Text delete>Ant Design</Text>
    <br />
    <Text strong>Ant Design</Text>
  </div>,
  mountNode
);
```
