---
order: 99
title:
  zh-CN: 多样的 Child
  en-US: Diverse Child
debug: true
---

## zh-CN

Debug usage

## en-US

Debug usage

```jsx
import { Space, Button, Popconfirm } from 'antd';

ReactDOM.render(
  <Space>
    <>
      Button
      <Button>Button</Button>
    </>
    Button
    <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
      <Button>Delete</Button>
    </Popconfirm>
    <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
      <Button disabled>Delete</Button>
    </Popconfirm>
    {null}
    {false}
    {1}
    Button
    {null}
    {undefined}
  </Space>,
  mountNode,
);
```
