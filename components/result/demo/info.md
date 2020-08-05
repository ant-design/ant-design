---
order: 1
title:
  zh-CN: Info
  en-US: Info
---

## zh-CN

展示处理结果。

## en-US

Show processing results.

```jsx
import { Result, Button } from 'antd';

ReactDOM.render(
  <Result
    title="Your operation has been executed"
    extra={
      <Button type="primary" key="console">
        Go Console
      </Button>
    }
  />,
  mountNode,
);
```
