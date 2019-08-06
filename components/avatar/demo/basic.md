---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

头像有三种尺寸，两种形状可选。

## en-US

Three sizes and two shapes are available.

```jsx
import { Avatar } from 'antd';
import { User } from '@ant-design/icons';

ReactDOM.render(
  <div>
    <div>
      <Avatar size={64} icon={<User />} />
      <Avatar size="large" icon={<User />} />
      <Avatar icon={<User />} />
      <Avatar size="small" icon={<User />} />
    </div>
    <div>
      <Avatar shape="square" size={64} icon={<User />} />
      <Avatar shape="square" size="large" icon={<User />} />
      <Avatar shape="square" icon={<User />} />
      <Avatar shape="square" size="small" icon={<User />} />
    </div>
  </div>,
  mountNode,
);
```

<style>
#components-avatar-demo-basic .ant-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
</style>
