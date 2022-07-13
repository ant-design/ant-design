---
order: 999
title:
  zh-CN: _InternalPanelDoNotUseOrYouWillBeFired
  en-US: _InternalPanelDoNotUseOrYouWillBeFired
debug: true
only: true
---

## zh-CN

调试用组件，请勿直接使用。

## en-US

Debug usage. Do not use in your production.

```tsx
import { Popconfirm, Divider } from 'antd';
import React from 'react';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPopconfirm } = Popconfirm;

const App: React.FC = () => (
  <InternalPopconfirm
    title={
      <>
        Are you sure to delete this task?
        <Divider />
      </>
    }
    okText="Yes"
    cancelText="No"
  />
);

export default App;
```
