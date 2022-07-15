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
import { Modal } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = Modal;

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
    <InternalPanel title="Hello World!" style={{ width: '100%' }}>
      Hello World?!
    </InternalPanel>
    <InternalPanel type="success" style={{ width: 200 }}>
      A good news!
    </InternalPanel>
    <InternalPanel title="Confirm This?" type="confirm" style={{ width: 300 }}>
      Some descriptions.
    </InternalPanel>
  </div>
);
```
