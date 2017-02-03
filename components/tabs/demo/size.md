---
order: 5
title:
  zh-CN: 迷你型
  en-US: Mini tab
---

## zh-CN

用在弹出框等较狭窄的容器内。

## en-US

Small size can be used in Modal.

````__react
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

ReactDOM.render(
  <Tabs defaultActiveKey="2" size="small">
    <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
    <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
    <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
  </Tabs>
, mountNode);
````
