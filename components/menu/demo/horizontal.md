# 顶部导航

- order: 0

水平的顶部导航菜单。

---

````jsx
var Menu = antd.Menu;
var SubMenu = Menu.SubMenu;

var App = React.createClass({
  getInitialState() {
    return {
      current: 'mail'
    }
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  },
  render() {
    return <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
    <Menu.Item key="mail">
      <i className="anticon anticon-mail"></i>导航一
    </Menu.Item>
    <Menu.Item key="app">
      <i className="anticon anticon-large"></i>导航二
    </Menu.Item>
    <SubMenu title={<span><i className="anticon anticon-setting"></i>导航三（子菜单）</span>}>
      <Menu.Item key="setting:1">选项1</Menu.Item>
      <Menu.Item key="setting:2">选项2</Menu.Item>
      <Menu.Item key="setting:3">选项3</Menu.Item>
      <Menu.Item key="setting:4">选项4</Menu.Item>
    </SubMenu>
  </Menu>
  }
});

React.render(<App />, document.getElementById('components-menu-demo-horizontal'));
````
