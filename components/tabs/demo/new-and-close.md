# 新增和关闭页签

- order: 9

只有卡片样式的页签支持关闭选项。

---

````jsx
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

function newTabPane() {
  return <TabPane tab="新建标签">新页面模板</TabPane>;
}

ReactDOM.render(
  <Tabs onChange={callback} type="card" editable newTabPane={newTabPane}>
    <TabPane tab="选项卡" key="1">选项卡一内容</TabPane>
    <TabPane tab="选项卡" key="2">选项卡二内容</TabPane>
    <TabPane tab="选项卡" key="3">选项卡三内容</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-new-and-close'));
````

