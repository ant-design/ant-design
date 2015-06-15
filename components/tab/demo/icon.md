# 图标

- order: 2

带有图标。

---

````jsx
var Tab = antd.Tab;
var TabPane = Tab.TabPane;

function callback() {}

var tabContent = [
  <span><i className="anticon anticon-lock"></i>tab 1</span>,
  <span><i className="anticon anticon-lock"></i>tab 2</span>,
  <span><i className="anticon anticon-lock"></i>tab 3</span>,
]

React.render(
  <Tab defaultActiveKey="2" onChange={callback}>
    <TabPane tab={tabContent[0]} key="1">选项卡一</TabPane>
    <TabPane tab={tabContent[1]} key="2">选项卡一</TabPane>
    <TabPane tab={tabContent[2]} key="3">选项卡一</TabPane>
  </Tab>
, document.getElementById('components-tab-demo-icon'));
````
