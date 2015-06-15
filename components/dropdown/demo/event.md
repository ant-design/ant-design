# 基本

- order: 3

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

---

````jsx
var Menu = antd.Menu;
var Dropdown = antd.Dropdown;
var onClick = function (key){
  alert('选中了菜单' + key);
};

var menu = <Menu onClick={onClick}>
  <Menu.Item key="1">第一个菜单项</Menu.Item>
  <Menu.Item key="2">第二个菜单项</Menu.Item>
  <Menu.Item key="3">第三个菜单项</Menu.Item>
</Menu>;

React.render(
  <Dropdown overlay={menu}>
    <button className="ant-btn ant-btn-default">
      鼠标移入，点击菜单 <i className="anticon anticon-down"></i>
    </button>
  </Dropdown>
, document.getElementById('components-dropdown-demo-event'));
````
