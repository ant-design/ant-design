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
import { Typography } from '@allenai/varnish';

const { Text } = Typography;
const text = 'The best way to predict the future is to invent it';

ReactDOM.render(
  <div>
    <Text>{text}</Text>
    <br />
    <Text type="secondary">{text}</Text>
    <br />
    <Text type="warning">{text}</Text>
    <br />
    <Text type="danger">{text}</Text>
    <br />
    <Text disabled>{text}</Text>
    <br />
    <Text mark>{text}</Text>
    <br />
    <Text code>{text}</Text>
    <br />
    <Text underline>{text}</Text>
    <br />
    <Text delete>{text}</Text>
    <br />
    <Text strong>{text}</Text>
  </div>,
  mountNode,
);
```
