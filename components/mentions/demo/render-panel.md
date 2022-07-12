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
import { Mentions } from 'antd';
import React from 'react';

const { Option } = Mentions;

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalMentions } = Mentions;

const App: React.FC = () => {
  const measureRef = React.useRef<any>();

  React.useEffect(() => {
    measureRef.current?.startMeasure('', '@', 0);
  }, []);

  return (
    <Mentions ref={measureRef} style={{ width: '100%' }} value="@">
      <Option value="afc163">afc163</Option>
      <Option value="zombieJ">zombieJ</Option>
    </Mentions>
  );
};

export default App;
```
