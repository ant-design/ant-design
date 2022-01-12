---
order: 7
title:
  zh-CN: 前缀
  en-US: Prefix
---

## zh-CN

在输入框上添加前缀图标。

## en-US

Add a prefix inside input.

```jsx
import { InputNumber } from 'infrad';
import { InfoCircleOutlined, SmileOutlined, UserOutlined } from 'infra-design-icons';

ReactDOM.render(
  <>
    <InputNumber prefix="￥" style={{ width: '100%' }} />
    <br />
    <br />
    <InputNumber addonBefore={<UserOutlined />} prefix="￥" style={{ width: '100%' }} />
    <br />
    <br />
    <InputNumber prefix="￥" disabled style={{ width: '100%' }} />
  </>,
  mountNode,
);
```
