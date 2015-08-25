# 迷你型

- order: 0

用在弹出框等较狭窄的容器内。

---

````jsx
var Tabs = antd.Tabs;
var TabPane = Tabs.TabPane;

React.render(
  <Tabs defaultActiveKey="2" size="mini">
    <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
    <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
    <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-size'));
````

