---
order: 2
title:
  zh-CN: 修改延时
  en-US: Customize duration
---

## zh-CN

自定义时长 `10s`，默认时长为 `3s`。

## en-US

Customize message display duration from default `3s` to `10s`.

```tsx
import { Button, message } from 'antd';
import React from 'react';

const success = () => {
  message.success('新增成功，插件包发布中，等待1-2分钟后刷新页面', 10);
};

const App: React.FC = () => <Button onClick={success}>Customized display duration</Button>;

export default App;
```
