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
import { Tooltip } from 'antd';
import React from 'react';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalTooltip } = Tooltip;

const App: React.FC = () => (
  <>
    <InternalTooltip>Hello, Pure Panel!</InternalTooltip>
    <InternalTooltip placement="bottomLeft" style={{ width: 200 }}>
      Hello, Pure Panel!
    </InternalTooltip>
  </>
);

export default App;
```
