# 基本

- order: 0

基本用法。

---

````jsx
var Tab = antd.Tab;
var TabPanel = Tab.Panel;

function callback() {}

React.render(
  <Tab defaultActiveKey="2" onChange={callback}>
    <TabPanel tab="tab 1" key="1">选项卡一</TabPanel>
    <TabPanel tab="tab 2" key="2">选项卡二</TabPanel>
    <TabPanel tab="tab 3" key="3">选项卡三</TabPanel>
  </Tab>
, document.getElementById('components-tab-demo-basic'));
````
