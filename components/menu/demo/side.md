# 侧边菜单

- order: 1

基本使用。

---

````jsx
var Menu = antd.Menu;
var MenuItem = Menu.Item;
var SubMenu = Menu.SubMenu;

function handleClick(info) {
  console.log('selected ',info);
}

React.render(<Menu onClick={handleClick} style={{width:200}} mode="vertical">
  <SubMenu title={<span><i className="anticon anticon-apple"></i><span>导航一</span></span>}>
    <MenuItem key="1">选项1</MenuItem>
    <MenuItem key="2">选项2</MenuItem>
    <MenuItem key="3">选项3</MenuItem>
    <MenuItem key="4">选项4</MenuItem>
  </SubMenu>
  <SubMenu title={<span><i className="anticon anticon-apple"></i><span>导航二</span></span>}>
    <MenuItem key="5">选项5</MenuItem>
    <MenuItem key="6">选项6</MenuItem>
     <SubMenu title={<span><i className="anticon anticon-apple"></i><span>三级导航</span></span>}>
        <MenuItem key="7">选项7</MenuItem>
        <MenuItem key="8">选项8</MenuItem>
      </SubMenu>
  </SubMenu>
  <SubMenu title={<span><i className="anticon anticon-apple"></i><span>导航三</span></span>}>
    <MenuItem key="9">选项9</MenuItem>
    <MenuItem key="10">选项10</MenuItem>
    <MenuItem key="11">选项11</MenuItem>
    <MenuItem key="12">选项12</MenuItem>
  </SubMenu>
  </Menu>
, document.getElementById('components-menu-demo-side'));
````
