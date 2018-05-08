---
order: 2
title:
  zh-CN: 图标
  en-US: Icon
---

## zh-CN

有图标的标签。

## en-US

The Tab with Icon.


````jsx
import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

ReactDOM.render(
  <Tabs defaultActiveKey="2">
    <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">
      Tab 1
    </TabPane>
    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
      Tab 2
    </TabPane>
  </Tabs>
, mountNode);
````
