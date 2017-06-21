---
order: 8
title:
  zh-CN: 卡片式页签
  en-US: Card type tab
---

## zh-CN

另一种样式的页签，不提供对应的垂直样式。

## en-US

Another type Tabs, which doesn't support vertical mode.


````jsx
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

ReactDOM.render(
  <Tabs onChange={callback} type="card">
    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
  </Tabs>
, mountNode);
````
