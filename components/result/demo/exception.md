---
order: 1
title:
  zh-CN: '404'
  en-US: '404'
---

## zh-CN

最简单的用法。

## en-US

The simplest use.

```jsx
import { Result, Button } from 'antd';

ReactDOM.render(
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />,
  mountNode,
);
```
