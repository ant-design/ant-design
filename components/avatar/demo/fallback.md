---
order: 99
title:
  zh-CN: 图片不存在时
  en-US: Fallback
debug: true
---

## zh-CN

图片不存在时，会回退到 `src`。

## en-US

图片不存在时，会回退到 `src`。

```tsx
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

ReactDOM.render(
  <>
    <Avatar
      shape="circle"
      src="http://abc.com/not-exist.jpg"
    >
      A
    </Avatar>
    <Avatar
      shape="circle"
      src="http://abc.com/not-exist.jpg"
    >
      ABC
    </Avatar>
  </>,
  mountNode,
);
```

<style>
#components-avatar-demo-basic .ant-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
.ant-row-rtl #components-avatar-demo-basic .ant-avatar {
  margin-right: 0;
  margin-left: 16px;
}
</style>
