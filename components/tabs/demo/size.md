# 迷你型

- order: 5

用在弹出框等较狭窄的容器内。

---

````jsx
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

ReactDOM.render(
  <Tabs defaultActiveKey="2" size="small">
    <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
    <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
    <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-size'));
````

