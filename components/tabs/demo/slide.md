# 滑动

- order: 3

可以左右滑动，容纳更多标签。

---

````jsx
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

ReactDOM.render(
  <Tabs defaultActiveKey="1">
    <TabPane tab="选项一" key="1">选项卡一</TabPane>
    <TabPane tab="选项二" key="2">选项卡二</TabPane>
    <TabPane tab="选项三" key="3">选项卡三</TabPane>
    <TabPane tab="选项四" key="4">选项卡四</TabPane>
    <TabPane tab="选项五" key="5">选项卡五</TabPane>
    <TabPane tab="选项六" key="6">选项卡六</TabPane>
    <TabPane tab="选项七" key="7">选项卡七</TabPane>
    <TabPane tab="选项八" key="8">选项卡八</TabPane>
    <TabPane tab="选项九" key="9">选项卡九</TabPane>
  </Tabs>
, document.getElementById('components-tabs-demo-slide'));
````
