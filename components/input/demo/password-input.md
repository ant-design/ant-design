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
import { Input } from 'antd';

const Password = Input.Password;

ReactDOM.render(
  <div>
    <Password
      placeholder="input password"
      style={{ width: 200 }}
    />
  </div>,
  mountNode);
```
