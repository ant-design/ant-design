---
order: 6
title:
  zh-CN: 位置
  en-US: Position
---

## zh-CN

有四个位置，`tabPosition="left|right|top|bottom"`。在移动端下，`left|right` 会自动切换成 `top`。

## en-US

Tab's position: left, right, top or bottom. Will auto switch to `top` in mobile.

```tsx
import type { RadioChangeEvent } from 'antd';
import { Radio, Space, Tabs } from 'antd';
import React, { useState } from 'react';

const { TabPane } = Tabs;

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const App: React.FC = () => {
  const [tabPosition, setTabPosition] = useState<TabPosition>('left');

  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value);
  };

  return (
    <>
      <Space style={{ marginBottom: 24 }}>
        Tab position:
        <Radio.Group value={tabPosition} onChange={changeTabPosition}>
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="bottom">bottom</Radio.Button>
          <Radio.Button value="left">left</Radio.Button>
          <Radio.Button value="right">right</Radio.Button>
        </Radio.Group>
      </Space>
      <Tabs tabPosition={tabPosition}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </>
  );
};

export default App;
```
