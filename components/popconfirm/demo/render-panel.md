---
order: 999
title:
  zh-CN: _InternalPanelDoNotUseOrYouWillBeFired
  en-US: _InternalPanelDoNotUseOrYouWillBeFired
debug: true
---

## zh-CN

调试用组件，请勿直接使用。

## en-US

Debug usage. Do not use in your production.

```tsx
import { Popconfirm } from 'antd';
import React from 'react';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPopconfirm } = Popconfirm;

const App: React.FC = () => (
  <>
    <InternalPopconfirm title="Are you OK?" />
    <InternalPopconfirm title="Are you OK?" placement="bottomRight" style={{ width: 250 }} />
  </>
);

export default App;
```
