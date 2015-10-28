# 基本

- order: 0

默认选中第一项。

---

````jsx
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

ReactDOM.render(
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
    <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
    <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-basic'));
````
