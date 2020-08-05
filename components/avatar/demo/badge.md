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

```tsx
import { UserOutlined } from '@ant-design/icons';
import Avatar from '..';
import Badge from '../../badge';
// TODO: put back after deploy // import { Avatar, Badge } from '@allenai/varnish';

ReactDOM.render(
  <>
    <span className="avatar-item">
      <Badge count={1}>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>
    </span>
    <span>
      <Badge dot>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>
    </span>
  </>,
  mountNode,
);
```

```css
/* tile uploaded pictures */
.avatar-item {
  margin-right: 24px;
}

[class*='-col-rtl'] .avatar-item {
  margin-right: 0;
  margin-left: 24px;
}
```
