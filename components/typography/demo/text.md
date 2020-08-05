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
import { Space } from '@allenai/varnish';
import Typography from '..';
// TODO: put back after deploy // import { Typography, Space } from '@allenai/varnish';

const { Text, Link } = Typography;

const text = 'The best way to predict the future is to invent it';

ReactDOM.render(
  <Space direction="vertical">
    <Text>{text}</Text>
    <Text type="secondary">{text}</Text>
    <Text type="warning">{text}</Text>
    <Text type="danger">{text}</Text>
    <Text disabled>{text}</Text>
    <Text mark>{text}</Text>
    <Text code>{text}</Text>
    <Text underline>{text}</Text>
    <Text delete>{text}</Text>
    <Text strong>{text}</Text>
    <Link href="https://varnish.allenai.org/" target="_blank" rel="noopener noreferrer">{text}</Link>
  </Space>,
  mountNode,
);
```
