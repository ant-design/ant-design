---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

默认选中第一项。

## en-US

Default activate first tab.

```jsx
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Demo = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="SANDBOX" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="STAGING" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="PRODUCTION" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

ReactDOM.render(<Demo />, mountNode);
```
