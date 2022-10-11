---
order: 99
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
import React from 'react';
import { Drawer } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDrawer } = Drawer;

export default () => (
  <div style={{ padding: 32, background: '#e6e6e6' }}>
    <InternalDrawer title="Hello Title" style={{ height: 300 }} footer="Footer!">
      Hello Content
    </InternalDrawer>
  </div>
);
```
