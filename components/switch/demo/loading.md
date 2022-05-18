---
order: 4
title:
  zh-CN: 加载中
  en-US: Loading
---

## zh-CN

标识开关操作仍在执行中。

## en-US

Mark a pending state of switch.

```tsx
import React from 'react';
import { Switch } from 'antd';

export default () => (
  <>
    <Switch loading defaultChecked />
    <br />
    <Switch size="small" loading />
  </>
);
```
