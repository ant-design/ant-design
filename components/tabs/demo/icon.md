# 图标

- order: 2

有图标的标签。

---

````jsx
var Tabs = antd.Tabs;
var TabPane = Tabs.TabPane;

function callback(key) {}

var tabContent = [
  <span><i className="anticon anticon-lock"></i>tab 1</span>,
  <span><i className="anticon anticon-lock"></i>tab 2</span>,
  <span><i className="anticon anticon-lock"></i>tab 3</span>,
]

React.render(
  <Tabs defaultActiveKey="2" onChange={callback}>
    <TabPane tab={tabContent[0]} key="1">选项卡一</TabPane>
    <TabPane tab={tabContent[1]} key="2">选项卡一</TabPane>
    <TabPane tab={tabContent[2]} key="3">选项卡一</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-icon'));
````
