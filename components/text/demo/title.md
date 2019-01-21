---
order: 1
title:
  zh-CN: 标题
  en-US: Title
---

## zh-CN

展示不同级别的标题。

## en-US

Display title in different level.

```jsx
import { Text } from 'antd';

const { Title } = Text;

ReactDOM.render(
  <div>
    <Title>h1. Ant Design</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
  </div>,
  mountNode
);
```
