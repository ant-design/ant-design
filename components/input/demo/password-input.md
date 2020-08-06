---
order: 10
title:
  zh-CN: 密码框
  en-US: Password box
---

## zh-CN

密码框。

## en-US

Input type of password.

```jsx
import { Input, Space } from '@allenai/varnish';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

ReactDOM.render(
  <Space direction="vertical">
    <Input.Password placeholder="input password" />
    <Input.Password
      placeholder="input password"
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
  </Space>,
  mountNode,
);
```
