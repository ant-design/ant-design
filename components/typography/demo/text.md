---
order: 2
title:
  zh-CN: 文本与超链接组件
  en-US: Text and Link Component
---

## zh-CN

内置不同样式的文本以及超链接组件。

## en-US

Provides multiple types of text and link.

```jsx
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;

ReactDOM.render(
  <Space direction="vertical">
    <Text>Ant Design</Text>
    <Text type="secondary">Ant Design</Text>
    <Text type="warning">Ant Design</Text>
    <Text type="danger">Ant Design</Text>
    <Text disabled>Ant Design</Text>
    <Text mark>Ant Design</Text>
    <Text code>Ant Design</Text>
    <Text keyboard>Ant Design</Text>
    <Text underline>Ant Design</Text>
    <Text delete>Ant Design</Text>
    <Text strong>Ant Design</Text>
    <Link href="https://ant.design" target="_blank">
      Ant Design
    </Link>
  </Space>,
  mountNode,
);
```
