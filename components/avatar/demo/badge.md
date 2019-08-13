---
order: 3
title:
  zh-CN: 带徽标的头像
  en-US: With Badge
---

## zh-CN

通常用于消息提示。

## en-US

Usually used for reminders and notifications.

```jsx
import { Avatar, Badge } from 'antd';
import { User } from '@ant-design/icons';

ReactDOM.render(
  <div>
    <span style={{ marginRight: 24 }}>
      <Badge count={1}>
        <Avatar shape="square" icon={<User />} />
      </Badge>
    </span>
    <span>
      <Badge dot>
        <Avatar shape="square" icon={<User />} />
      </Badge>
    </span>
  </div>,
  mountNode,
);
```
