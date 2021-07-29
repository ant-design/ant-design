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
    <Text>Infra Design (default)</Text>
    <Text type="secondary">Infra Design (secondary)</Text>
    <Text type="success">Infra Design (success)</Text>
    <Text type="warning">Infra Design (warning)</Text>
    <Text type="danger">Infra Design (danger)</Text>
    <Text disabled>Infra Design (disabled)</Text>
    <Text mark>Infra Design (mark)</Text>
    <Text code>Infra Design (code)</Text>
    <Text keyboard>Infra Design (keyboard)</Text>
    <Text underline>Infra Design (underline)</Text>
    <Text delete>Infra Design (delete)</Text>
    <Text strong>Infra Design (strong)</Text>
    <Text italic>Infra Design (italic)</Text>
    <Link href="https://ant.design" target="_blank">
      Infra Design (Link)
    </Link>
  </Space>,
  mountNode,
);
```
