# 基本

- order: 2

基本用法。

---

````jsx
var Tab = antd.Tab;
var TabPane = Tab.TabPane;

function callback() {}

React.render(
  <Tab defaultActiveKey="2" onChange={callback}>
    <TabPane tab="tab 1" key="1">选项卡一</TabPane>
    <TabPane tab="tab 2" key="2">选项卡二</TabPane>
    <TabPane tab="tab 3" key="3">选项卡三</TabPane>
  </Tab>
, document.getElementById('components-tabs-demo-basic'));
````
