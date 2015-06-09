# 基本

- order: 0

最简单的下拉菜单。

---

````jsx
var Menu = antd.Menu;
var Dropdown = antd.Dropdown;

var menu = <Menu>
  <Menu.Item key="0">
    <a href="http://www.alipay.com/">第一个菜单项</a>
  </Menu.Item>
  <Menu.Item key="1">
    <a href="http://www.taobao.com/">第二个菜单项</a>
  </Menu.Item>
  <Menu.Divider/>
  <Menu.Item key="3">第三个菜单项</Menu.Item>
</Menu>;

React.render(
  <Dropdown animation="slide-up" overlay={menu}>
    <button className="ant-btn ant-btn-ghost">
      点我下来 <i className="anticon anticon-caret-down"></i>
    </button>
  </Dropdown>
, document.getElementById('components-dropdown-demo-basic'));
````
