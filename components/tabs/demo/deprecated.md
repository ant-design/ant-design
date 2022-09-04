---
order: -1
title:
  zh-CN: 基础用法（废弃的语法糖）
  en-US: Basic usage (deprecated syntactic sugar)
version: < 4.23.0
---

## zh-CN

默认选中第一项。

## en-US

Default activate first tab.

```tsx
import { Tabs } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </Tabs.TabPane>
    <Tabs.TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </Tabs.TabPane>
    <Tabs.TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </Tabs.TabPane>
  </Tabs>
);

export default App;
```
