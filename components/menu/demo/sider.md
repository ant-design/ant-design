# 内嵌菜单

- order: 1

垂直菜单，子菜单内嵌在菜单区域。

---

````jsx
var Menu = antd.Menu;
var SubMenu = Menu.SubMenu;

var Sider = React.createClass({
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
    return <Menu onClick={this.handleClick}
                 style={{width:240}}
                 selectedKeys={[this.state.current]}
                 mode="inline">
      <SubMenu key="sub1" title={<span><i className="anticon anticon-mail"></i><span>导航一</span></span>}>
        <Menu.Item key="1">选项1</Menu.Item>
        <Menu.Item key="2">选项2</Menu.Item>
        <Menu.Item key="3">选项3</Menu.Item>
        <Menu.Item key="4">选项4</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" title={<span><i className="anticon anticon-large"></i><span>导航二</span></span>}>
        <Menu.Item key="5">选项5</Menu.Item>
        <Menu.Item key="6">选项6</Menu.Item>
        <SubMenu key="sub3" title="三级导航">
          <Menu.Item key="7">选项7</Menu.Item>
          <Menu.Item key="8">选项8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" title={<span><i className="anticon anticon-setting"></i><span>导航三</span></span>}>
        <Menu.Item key="9">选项9</Menu.Item>
        <Menu.Item key="10">选项10</Menu.Item>
        <Menu.Item key="11">选项11</Menu.Item>
        <Menu.Item key="12">选项12</Menu.Item>
      </SubMenu>
    </Menu>;
  }
});
React.render(<Sider />, document.getElementById('components-menu-demo-sider'));
````
