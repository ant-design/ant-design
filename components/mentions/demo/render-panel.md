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
import { Mentions } from 'antd';
import React from 'react';

const { Option } = Mentions;

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalMentions } = Mentions;

const App: React.FC = () => (
  <InternalMentions style={{ width: '100%' }} value="@">
    <Option value="afc163">afc163</Option>
    <Option value="zombieJ">zombieJ</Option>
  </InternalMentions>
);

export default App;
```
