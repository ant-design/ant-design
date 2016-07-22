---
order: 10
title: 卡片式页签容器
---

用于容器顶部，需要一点额外的样式覆盖。

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
  </div>
, mountNode);
````

````css
#components-tabs-demo-card-top .code-box-demo {
  background: #ECECEC;
  overflow: hidden;
  padding: 24px;
}

.card-container > .ant-tabs-card > .ant-tabs-content {
  background: #fff;
  padding: 16px;
  height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
}
````
