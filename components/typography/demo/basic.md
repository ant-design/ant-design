---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

简单的展示。

## en-US

Simplest Usage.

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
