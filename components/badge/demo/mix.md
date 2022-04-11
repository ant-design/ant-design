---
order: 99
title:
  zh-CN: 各种混用的情况
  en-US: Mixed usage
debug: true
---

## zh-CN

测试 `count` `stauts` `color` `dot` 共用的情况。

## en-US

Using `count/dot` with custom `stauts/color`.

```jsx
import { Badge, Avatar } from 'antd';

export default () => (
  <>
    <Badge count={5} status="success">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={5} status="warning">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={5} color="blue">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={5} color="#fa541c">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge dot status="success">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge dot status="warning">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge dot color="blue">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge dot color="#fa541c">
      <Avatar shape="square" size="large" />
    </Badge>
  </>
);
```
