# 基本

- order: 0

最简单的用法

---

````jsx
var Tabs = antd.Tab;
var TabPane = Tabs.TabPane;

function callback() {}

React.render(
  <Tabs defaultActiveKey="2" onChange={callback}>
    <TabPane tab='tab 1' key="1"></TabPane>
    <TabPane tab='tab 2' key="2"></TabPane>
    <TabPane tab='tab 3' key="3"></TabPane>
  </Tabs>
, document.getElementById('components-tab-demo-basic'));
````
