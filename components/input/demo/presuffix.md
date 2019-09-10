---
order: 8
title:
  zh-CN: 前缀和后缀
  en-US: prefix and suffix
---

## zh-CN

在输入框上添加前缀或后缀图标。

## en-US

Add prefix or suffix icons inside input.

```jsx
import { Input, Tooltip, Icon } from 'antd';

ReactDOM.render(
  <div>
    <Input
      placeholder="Enter your username"
      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
      suffix={
        <Tooltip title="Extra information">
          <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />

    <br />
    <br />

    <Input prefix="￥" suffix="RMB" />
  </div>,
  mountNode,
);
```
