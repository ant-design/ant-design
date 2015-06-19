# 小一号

- order: 0

用在弹出框等较狭窄的容器内。

---

````jsx
var Tabs = antd.Tabs;
var TabPane = Tabs.TabPane;

React.render(
  <Tabs defaultActiveKey="2" size="mini">
    <TabPane tab="tab 1" key="1">选项卡一</TabPane>
    <TabPane tab="tab 2" key="2">选项卡二</TabPane>
    <TabPane tab="tab 3" key="3">选项卡三</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-size'));
````

