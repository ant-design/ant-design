# 基本

- order: 0

默认选中第二项。

---

````jsx
var Tabs = antd.Tabs;
var TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

React.render(
  <Tabs defaultActiveKey="2" onChange={callback}>
    <TabPane tab="tab 1" key="1">选项卡一</TabPane>
    <TabPane tab="tab 2" key="2">选项卡二</TabPane>
    <TabPane tab="tab 3" key="3">选项卡三</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-basic'));
````
