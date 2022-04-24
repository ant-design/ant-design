---
order: 7
title:
  zh-CN: 大小
  en-US: Size
---

## zh-CN

可以设置有数字徽标的大小。

## en-US

Set size of numeral Badge.

```jsx
import { Badge, Avatar } from 'antd';

export default () => (
  <>
    <Badge size="default" count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge size="small" count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
  </>
);
```
