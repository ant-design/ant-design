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
import { DatePicker } from 'antd';
import React from 'react';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDatePicker } = DatePicker;

const App: React.FC = () => <InternalDatePicker />;

export default App;
```
