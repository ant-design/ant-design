---
order: 9
title: 新增和关闭页签
---

只有卡片样式的页签支持新增和关闭选项。

````jsx
import { Tabs } from 'antd';
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
      <Tabs
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
      </Tabs>
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
````
