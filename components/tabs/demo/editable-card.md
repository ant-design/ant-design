# 新增和关闭页签

- order: 9

只有卡片样式的页签支持新增和关闭选项。

---

````jsx
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const Demo = React.createClass({
  getInitialState() {
    this.newTabIndex = 0;
    const panes = [
      <TabPane tab="选项卡" key="1">选项卡一内容</TabPane>,
      <TabPane tab="选项卡" key="2">选项卡二内容</TabPane>,
    ];
    return {
      activeKey: panes[0].key,
      panes: panes,
    };
  },
  onChange(activeKey) {
    this.setState({ activeKey });
  },
  onEdit(targetKey, action) {
    this[action](targetKey);
  },
  add() {
    const panes = this.state.panes;
    const activeKey = 'newTab' + this.newTabIndex++;
    panes.push(<TabPane tab="新建页签" key={activeKey}>新页面</TabPane>);
    this.setState({ panes, activeKey });
  },
  remove(targetKey) {
    let activeKey = this.state.activeKey;
    let lastIndex = this.state.panes.findIndex(pane => pane.key === targetKey) - 1;
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (activeKey === targetKey) {
      activeKey = panes[lastIndex >= 0 ? lastIndex : 0].key;
    }
    this.setState({ panes, activeKey });
  },
  render() {
    return (
      <Tabs onChange={this.onChange} activeKey={this.state.activeKey}
        type="editable-card" onEdit={this.onEdit}>
        {this.state.panes}
      </Tabs>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('components-tabs-demo-editable-card'));
````

