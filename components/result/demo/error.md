---
order: 6
title:
  zh-CN: Error
  en-US: Error
---

## zh-CN

展示错误的结果。

## en-US

Show the wrong result.

```jsx
import { Result, Button } from 'antd';

ReactDOM.render(
  <Result
    status="error"
    title="Submission Failed"
    subTitle="Please check and modify the following information before resubmitting."
    extra={
      <Button type="primary" key="console">
        Go Console
      </Button>
    }
  />,
  mountNode,
);
```
