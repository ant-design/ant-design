---
order: 2
title:
  zh-CN: 居中
  en-US: Centered
---

## zh-CN

标签居中展示。

## en-US

Centered tabs.

```jsx
import { Tabs } from '@allenai/varnish';

const { TabPane } = Tabs;

const Demo = () => (
  <Tabs defaultActiveKey="1" centered>
    <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

ReactDOM.render(<Demo />, mountNode);
```
