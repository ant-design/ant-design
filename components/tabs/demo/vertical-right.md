# 垂直

- order: 7

选项卡在右边。

---

````jsx
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

ReactDOM.render(
  <Tabs defaultActiveKey="1" tabPosition="right">
    <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
    <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
    <TabPane tab="选项卡三长" key="3">选项卡三内容</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-vertical-right'));
````
