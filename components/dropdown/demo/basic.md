# 基本

- order: 0

最简单的下拉菜单。

---

````jsx
var Menu = antd.Menu;
var Dropdown = antd.Dropdown;

var menu = <Menu style={{width:150}}>
  <Menu.Item>
    <a target="_blank" href="http://www.alipay.com/">第一个菜单项</a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" href="http://www.taobao.com/">第二个菜单项</a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" href="http://www.tmall.com/">第三个菜单项</a>
  </Menu.Item>
</Menu>;

React.render(
  <Dropdown overlay={menu}>
    <button className="ant-btn ant-btn-menu">
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
