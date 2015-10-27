# 禁用

- order: 1

禁用某一项。

---

````jsx
var Tabs = antd.Tabs;
var TabPane = Tabs.TabPane;

function callback(key) {}

ReactDOM.render(
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="选项卡一" key="1">选项卡一</TabPane>
    <TabPane tab="选项卡二" disabled={true} key="2">选项卡二</TabPane>
    <TabPane tab="选项卡三" key="3">选项卡三</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-disabled'));
````
