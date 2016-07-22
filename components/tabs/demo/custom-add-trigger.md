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
      { title: '选项卡', content: '选项卡一内容', key: '1' },
      { title: '选项卡', content: '选项卡二内容', key: '2' },
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
    panes.push({ title: '新建页签', content: '新页面', key: activeKey });
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
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
````
