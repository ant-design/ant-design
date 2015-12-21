# 卡片式页签容器

- order: 10

用于容器顶部，需要一点额外的样式覆盖。

---

````jsx
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

ReactDOM.render(
<div className="card-container">
  <Tabs type="card">
    <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
    <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
    <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
  </Tabs>
</div>, document.getElementById('components-tabs-demo-card-top'));
````

````css
#components-tabs-demo-card-top {
  background: #ECECEC;
  overflow: hidden;
  padding: 24px;
}

.card-container > .ant-tabs-card .ant-tabs-content {
  background: #fff;
  padding: 16px;
  height: 120px;
  margin-top: -16px;
}
.card-container > .ant-tabs-card .ant-tabs-tabs-bar,
.card-container > .ant-tabs-card .ant-tabs-tab-active {
  border-color: #fff;
}
````
