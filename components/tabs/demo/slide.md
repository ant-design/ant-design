---
order: 3
title:
  zh-CN: 滑动
  en-US: Slide
---

## zh-CN

可以左右、上下滑动，容纳更多标签。

## en-US

In order to fit in more tabs, they can slide left and right (or up and down).

```tsx
import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs } from 'antd';
import React, { useState } from 'react';

const { TabPane } = Tabs;

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const App: React.FC = () => {
  const [mode, setMode] = useState<TabPosition>('top');

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
        <Radio.Button value="top">Horizontal</Radio.Button>
        <Radio.Button value="left">Vertical</Radio.Button>
      </Radio.Group>
      <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 220 }}>
        {[...Array.from({ length: 30 }, (_, i) => i)].map(i => (
          <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
            Content of tab {i}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default App;
```
