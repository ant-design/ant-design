# 基本

- order: 0

最简单的下拉菜单。

---

````jsx
var Menu = antd.Menu;
var Dropdown = antd.Dropdown;

var menu = <Menu>
  <Menu.Item key="0">
    <a target="_blank" href="http://www.alipay.com/">第一个菜单项</a>
  </Menu.Item>
  <Menu.Item key="1">
    <a target="_blank" href="http://www.taobao.com/">第二个菜单项</a>
  </Menu.Item>
  <Menu.Item key="3">第三个菜单项</Menu.Item>
</Menu>;

React.render(
  <Dropdown overlay={menu}>
    <button className="ant-btn ant-btn-default">
      某按钮 <i className="anticon anticon-down"></i>
    </button>
  </Dropdown>
, document.getElementById('components-dropdown-demo-basic'));
````

<style>
.code-box-demo .ant-btn {
  margin-right: 6px;
}
</style>
