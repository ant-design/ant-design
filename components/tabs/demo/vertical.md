# 垂直

- order: 4

分成左右两种。

---

````jsx
var Tabs = antd.Tabs;
var TabPane = Tabs.TabPane;

ReactDOM.render(<div>
  <h3 style={{margin: '0 0 20px'}}>页签在左边</h3>
  <Tabs defaultActiveKey="1" tabPosition="left">
    <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
    <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
    <TabPane tab="选项卡三长" key="3">选项卡三内容</TabPane>
  </Tabs>
  <h3 style={{margin: '40px 0 20px'}}>页签在右边</h3>
  <Tabs defaultActiveKey="1" tabPosition="right">
    <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
    <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
    <TabPane tab="选项卡三长" key="3">选项卡三内容</TabPane>
  </Tabs>
</div>, document.getElementById('components-tabs-demo-vertical'));
````

