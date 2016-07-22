---
order: 2
title: 图标
---

有图标的标签。

````jsx
import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

ReactDOM.render(
  <Tabs defaultActiveKey="2">
    <TabPane tab={<span><Icon type="apple" />选项卡一</span>} key="1">
      选项卡一
    </TabPane>
    <TabPane tab={<span><Icon type="android" />选项卡二</span>} key="2">
      选项卡二
    </TabPane>
  </Tabs>
, mountNode);
````
