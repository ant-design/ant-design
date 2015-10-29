# 动态的页签

- order: 4

演示添加删除和附加操作。

---

````jsx
import { Tabs, Button, Icon, message } from 'antd';
const TabPane = Tabs.TabPane;

let index = 0;
const closeStyle = {
  position: 'absolute',
  top: 8,
  right: -9,
};

const addStyle = {
  pointerEvents: 'auto',
  color: '#2db7f5',
  position: 'absolute',
  top: 8,
  left: 0,
  marginLeft: -8,
};

const Test = React.createClass({
  getInitialState() {
    return {
      tabs: [{
        title: 'title ' + index,
        content: 'content ' + index,
        index: index
      }],
      activeKey: index.toString()
    };
  },
  remove(index, e) {
    e.stopPropagation();
    let tabs = this.state.tabs;
    let activeKey = this.state.activeKey;
    let foundIndex = 0;

    if(tabs.length === 1) {
      message.error('仅剩一个，不能删除');
      return;
    }

    const newTabs = tabs.filter(tab => {
      if (tab.index !== index) {
        return true;
      } else {
        foundIndex = index;
        return false;
      }
    });

    if (activeKey === index) {
      activeKey = tabs[foundIndex - 1].index;
    }

    this.setState({
      tabs: newTabs, activeKey
    });
  },
  add() {
    index += 1;
    this.setState({
      tabs: this.state.tabs.concat({
        title: 'title ' + index,
        content: 'content ' + index,
        index: index,
      }),
      activeKey: index.toString(),
    });
  },
  onChange(activeKey) {
    console.log(activeKey);
    this.setState({ activeKey });
  },
  render() {
    const addBtn = <Icon style={addStyle} type="plus-circle" onClick={this.add} />;
    const operations = <Button>操作</Button>;
    return (
      <Tabs onChange={this.onChange}
        activeKey={this.state.activeKey}
        tabBarExtraContent={operations}>
        {
          this.state.tabs.map(tab => (
            <TabPane key={tab.index} tab={
              <div>
                {tab.title}
                <Icon type="cross" style={closeStyle} onClick={this.remove.bind(this, tab.index)} />
              </div>
            }>{tab.content}</TabPane>
          ))
        }
        <TabPane key="__add" disabled tab={addBtn} />
      </Tabs>
    );
  }
})

ReactDOM.render(<Test />, document.getElementById('components-tabs-demo-add'));
````
