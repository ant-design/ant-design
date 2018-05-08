---
order: 3
title:
  zh-CN: 带徽标的头像
  en-US: With Badge
---

## zh-CN

通常用于消息提示。

## en-US

Usually used for messages remind.

````jsx
import { Avatar, Badge } from 'antd';

ReactDOM.render(
  <div>
    <span style={{ marginRight: 24 }}>
      <Badge count={1}><Avatar shape="square" icon="user" /></Badge>
    </span>
    <span>
      <Badge dot><Avatar shape="square" icon="user" /></Badge>
    </span>
  </div>
, mountNode);
````
