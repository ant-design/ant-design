# 其他元素

- order: 1

分割线和不可用菜单项。

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
  <Menu.Divider/>
  <Menu.Item key="3" disabled>第三个菜单项（不可用）</Menu.Item>
</Menu>;

React.render(
  <Dropdown overlay={menu}>
    <button className="ant-btn ant-btn-default">
      鼠标移入 <i className="anticon anticon-caret-down"></i>
    </button>
  </Dropdown>
, document.getElementById('components-dropdown-demo-item'));
````
