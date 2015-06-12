# 滑动

- order: 2

可以滑动

---

````jsx
var Tab = antd.Tab;
var TabPane = Tab.TabPane;

function callback() {}

React.render(
  <Tab defaultActiveKey="1" onChange={callback}>
    <TabPane tab="tab 1" key="1">选项卡一</TabPane>
    <TabPane tab="tab 2" key="2">选项卡二</TabPane>
    <TabPane tab="tab 3" key="3">选项卡三</TabPane>
    <TabPane tab="tab 4" key="4">选项卡四</TabPane>
    <TabPane tab="tab 5" key="5">选项卡五</TabPane>
    <TabPane tab="tab 6" key="6">选项卡六</TabPane>
  </Tab>
, document.getElementById('components-tabs-demo-slide'));
````
