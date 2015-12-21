# 附加内容

- order: 4

可以在页签右边添加附加操作。

---

````jsx
import { Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;

const operations = <Button>额外操作</Button>;

ReactDOM.render(
<Tabs tabBarExtraContent={operations}>
  <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
  <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
  <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
</Tabs>, document.getElementById('components-tabs-demo-extra'));
````
