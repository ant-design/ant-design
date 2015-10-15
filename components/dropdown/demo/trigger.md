# 触发方式

- order: 2

点击或鼠标移入触发。

---

````jsx
var Menu = antd.Menu;
var Dropdown = antd.Dropdown;
var Button = antd.Button;
var Icon = antd.Icon;

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

React.render(<div>
  <Dropdown overlay={menu} trigger="click">
    <Button type="primary">
      点击触发 <Icon type="down" />
    </Button>
  </Dropdown>
  <Dropdown overlay={menu}>
    <Button>
      鼠标移入 <Icon type="down" />
    </Button>
  </Dropdown>
</div>, document.getElementById('components-dropdown-demo-trigger'));
````
