# 图标

- order: 2

有图标的标签。

---

````jsx
var Tabs = antd.Tabs;
var TabPane = Tabs.TabPane;

var tabContent = [
  <span><i className="anticon anticon-apple"></i>选项卡一</span>,
  <span><i className="anticon anticon-android"></i>选项卡二</span>,
  <span><i className="anticon anticon-lock"></i>选项卡三</span>,
];

React.render(
  <Tabs defaultActiveKey="2">
    <TabPane tab={tabContent[0]} key="1">选项卡一</TabPane>
    <TabPane tab={tabContent[1]} key="2">选项卡二</TabPane>
    <TabPane tab={tabContent[2]} key="3">选项卡三</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-icon'));
````
