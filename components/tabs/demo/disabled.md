# 禁用

- order: 1

禁用某一项。

---

````jsx
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

ReactDOM.render(
  <Tabs defaultActiveKey="1">
    <TabPane tab="选项卡一" key="1">选项卡一</TabPane>
    <TabPane tab="选项卡二" disabled key="2">选项卡二</TabPane>
    <TabPane tab="选项卡三" key="3">选项卡三</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-disabled'));
````
