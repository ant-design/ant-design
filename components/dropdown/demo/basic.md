# 基本

- order: 0

点击出发

---

````jsx
var Menu = antd.Menu;
var Dropdown = antd.Dropdown;

function onClick(key){
 alert('select ' + key);
}

var menu = <Menu style={{width:140}} onClick={onClick}>
  <Menu.Item disabled>disabled</Menu.Item>
  <Menu.Item key="1">第一个菜单项</Menu.Item>
  <Menu.Divider/>
  <Menu.Item key="2">第二个菜单项</Menu.Item>
</Menu>;


React.render(
  <Dropdown animation="slide-up" overlay={menu} trigger="click">
  <button className="ant-btn ant-btn-ghost">点我下来 <span className="anticon anticon-caret-down"></span></button>
  </Dropdown>
, document.getElementById('components-dropdown-demo-basic'));
````
