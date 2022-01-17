---
order: 2
title:
zh-CN: 溢出计数描述符
en-US: Overflow Count
---

## zh-CN

当 `count` 大于 `overflowCount` 时，会显示 `${overflowCount}${overflowCountDescriptor}`。 `overflowCountDescriptor` 的默认值为 `+`。

## en-US

`${overflowCount}${overflowCountDescriptor}` is displayed when `count` is larger than `overflowCount`. The default value of `overflowCountDescriptor` is `+`.

```jsx
import { Badge, Avatar } from 'antd';

ReactDOM.render(
  <>
    <Badge overflowCount={1} count={5} overflowCountDescriptor="++">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge overflowCount={10} count={5} overflowCountDescriptor="$">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge overflowCount={10} count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
  </>,
  mountNode,
);
```
