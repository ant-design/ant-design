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
    <Text>(default)Ant Design</Text>
    <Text type="secondary">secondary Ant Design</Text>
    <Text type="success">success Ant Design</Text>
    <Text type="warning">warning Ant Design</Text>
    <Text type="danger">danger Ant Design</Text>
    <Text disabled>disabled Ant Design</Text>
    <Text mark>mark Ant Design</Text>
    <Text code>code Ant Design</Text>
    <Text keyboard>keyboard Ant Design</Text>
    <Text underline>underline Ant Design</Text>
    <Text delete>delete Ant Design</Text>
    <Text strong>strong Ant Design</Text>
    <Link href="https://ant.design" target="_blank">
      Ant Design
    </Link>
  </Space>,
  mountNode,
);
```
