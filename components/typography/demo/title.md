---
order: 1
title:
  zh-CN: 标题组件
  en-US: Title Component
---

## zh-CN

展示不同级别的标题。

## en-US

Instead of dom header elements, you can also use title to displal in different levels.

Warning: Typography.Title is not recommended for use. Instead, we recommend you use standard dom elements; h1...h6 for titles.

```jsx
import { Typography } from '@allenai/varnish';

const { Title } = Typography;
const text = 'AI for the Common Good';

ReactDOM.render(
  <>
    <Title>h1. {text}</Title>
    <Title level={2}>h2. {text}</Title>
    <Title level={3}>h3. {text}</Title>
    <Title level={4}>h4. {text}</Title>
  </>,
  mountNode,
);
```
