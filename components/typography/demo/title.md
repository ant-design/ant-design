---
order: 1
title:
  zh-CN: 标题组件
  en-US: Title Component
---

## zh-CN

展示不同级别的标题。

## en-US

Display title in different level.

```jsx
import { Typography } from 'antd';

const { Title } = Typography;

ReactDOM.render(
  <>
    <Title>h1. Infra Design</Title>
    <Title level={2}>h2. Infra Design</Title>
    <Title level={3}>h3. Infra Design</Title>
    <Title level={4}>h4. Infra Design</Title>
    <Title level={5}>h5. Infra Design</Title>
  </>,
  mountNode,
);
```
