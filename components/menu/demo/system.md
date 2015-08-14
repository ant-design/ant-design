# 系统菜单

- order: 1

点击后出现菜单

---

````jsx
var Menu = antd.Menu;
var MenuItem = Menu.Item;
var SubMenu = Menu.SubMenu;

function handleClick(info) {
  console.log('selected ',info);
}

React.render(<Menu onClick={handleClick} mode="horizontal" openSubMenuOnMouseEnter={false} closeSubMenuOnMouseLeave={false}>
  <SubMenu key="sub1" title={<span><i className="anticon anticon-apple"></i><span>导航一</span></span>}>
    <MenuItem key="1">选项1</MenuItem>
    <MenuItem key="2">选项2</MenuItem>
    <MenuItem key="3">选项3</MenuItem>
    <MenuItem key="4">选项4</MenuItem>
  </SubMenu>
  <SubMenu key="sub2" title={<span><i className="anticon anticon-apple"></i><span>导航二</span></span>}>
    <MenuItem key="5">选项5</MenuItem>
    <MenuItem key="6">选项6</MenuItem>
     <SubMenu key="sub3" title={<span><i className="anticon anticon-apple"></i><span>三级导航</span></span>}>
        <MenuItem key="7">选项7</MenuItem>
        <MenuItem key="8">选项8</MenuItem>
      </SubMenu>
  </SubMenu>
  <SubMenu key="sub4" title={<span><i className="anticon anticon-apple"></i><span>导航三</span></span>}>
    <MenuItem key="9">选项9</MenuItem>
    <MenuItem key="10">选项10</MenuItem>
    <MenuItem key="11">选项11</MenuItem>
    <MenuItem key="12">选项12</MenuItem>
  </SubMenu>
  </Menu>
, document.getElementById('components-menu-demo-system'));
````
