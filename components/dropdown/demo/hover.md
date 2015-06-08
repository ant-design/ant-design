# 基本

- order: 1

鼠标触发

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
  <Dropdown overlay={menu} trigger="hover">
  <button className="ant-btn ant-btn-ghost">hover <span className="anticon anticon-caret-down"></span></button>
  </Dropdown>
, document.getElementById('components-dropdown-demo-hover'));
````
