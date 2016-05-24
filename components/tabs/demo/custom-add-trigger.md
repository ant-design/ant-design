---
order: 11
title: 自定义新增页签触发器
---

隐藏默认的页签增加图标，给自定义触发器绑定事件。

````jsx
import { Tabs, Button } from 'antd';
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
      panes,
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
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push(<TabPane tab="新建页签" key={activeKey}>新页面</TabPane>);
    this.setState({ panes, activeKey });
  },
  remove(targetKey) {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  },
  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="ghost" onClick={this.add}>新增</Button>
        </div>
        <Tabs hideAdd onChange={this.onChange} activeKey={this.state.activeKey}
          type="editable-card" onEdit={this.onEdit}>
          {this.state.panes}
        </Tabs>
      </div>
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
````
