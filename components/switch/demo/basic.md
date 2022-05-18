---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.

```tsx
import React from 'react';
import { Switch } from 'antd';

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

export default () => <Switch defaultChecked onChange={onChange} />;
```

<style>
.code-box-demo .ant-switch {
  margin-bottom: 8px;
}
</style>
