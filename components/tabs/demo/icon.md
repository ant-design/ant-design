# 图标

- order: 2

有图标的标签。

---

````jsx
import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

const tabContent = [
  <span><Icon type="apple" />选项卡一</span>,
  <span><Icon type="android" />选项卡二</span>,
  <span><Icon type="lock" />选项卡三</span>,
];

ReactDOM.render(
  <Tabs defaultActiveKey="2">
    <TabPane tab={tabContent[0]} key="1">选项卡一</TabPane>
    <TabPane tab={tabContent[1]} key="2">选项卡二</TabPane>
    <TabPane tab={tabContent[2]} key="3">选项卡三</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-icon'));
````
