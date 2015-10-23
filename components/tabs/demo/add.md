# 添加

- order: 4
- hidden: true

演示添加删除功能。

---

````jsx
var Tabs = antd.Tabs;
var TabPane = Tabs.TabPane;
var Button = antd.Button;
var Icon = antd.Icon;

var index = 0;
var closeStyle = {
  position: 'absolute',
  top: 0,
  right: -10,
};
var addStyle = {
  pointerEvents: 'auto',
  color: 'black',
};
var extraStyle = {
  float: 'right'
};

var Test = React.createClass({
  getInitialState() {
    return {
      tabs: [{
        title: 'title ' + index,
        content: 'content ' + index,
      }],
      activeKey: 'title ' + index
    };
  },
  remove(title, e) {
    e.stopPropagation();
    if(this.state.tabs.length === 1) {
      antd.message.error('仅剩一个，不能删除');
      return;
    }
    var foundIndex = 0;
    var tabs = this.state.tabs.filter(function (t, index) {
      if (t.title !== title) {
        return true;
      } else {
        foundIndex = index;
        return false;
      }
    });
    var activeKey = this.state.activeKey;
    if (activeKey === title) {
      if (foundIndex) {
        foundIndex--;
      }
      activeKey = tabs[foundIndex].title;
    }
    this.setState({tabs, activeKey})
  },
  add() {
    index++;
    this.setState({
      tabs: this.state.tabs.concat({
        title: 'title '+index,
        content: 'content '+index,
      })
    });
  },
  onChange(activeKey) {
    this.setState({activeKey});
  },
  render() {
    return <Tabs
    onChange={this.onChange}
    activeKey={this.state.activeKey}
    tabBarExtraContent={<div style={extraStyle}><Button type="primary">其它操作</Button></div>}>
    {
      this.state.tabs.map((t)=>{
        return <TabPane key={t.title} tab={<div>{t.title} <Icon type="cross" style={closeStyle} onClick={this.remove.bind(this,t.title)}></Icon></div>}>
          {t.content}
        </TabPane>;
      }).concat(<TabPane key="__add" disabled tab={<Icon style={addStyle} type="plus-circle" onClick={this.add}></Icon>} />)
    }
    </Tabs>
  }
})

ReactDOM.render(<Test />, document.getElementById('components-tabs-demo-add'));
````
