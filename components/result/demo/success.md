---
order: 0
title:
  zh-CN: Success
  en-US: Success
---

## zh-CN

成功的结果。

## en-US

Show successful results.

```jsx
import { Result, Button } from 'antd';

ReactDOM.render(
  <Result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" key="console">
        Go Console
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ]}
  />,
  mountNode,
);
```
