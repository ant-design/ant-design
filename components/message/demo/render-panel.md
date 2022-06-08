---
order: 99
title:
  zh-CN: 纯粹容器
  en-US: PurePanel
debug: true
---

## zh-CN

调试用组件，请勿直接使用。

## en-US

Debug usage. Do not use in your production.

```tsx
import { message } from 'antd';
import React from 'react';

const { _RenderPanel: RenderPanel } = message;

export default () => <RenderPanel content="Hello World!" type="error" />;
```
