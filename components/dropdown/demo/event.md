# 触发事件

- order: 3

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

---

````jsx
import { Menu, Dropdown, Button, Icon } from 'antd';
const onSelect = function ({key}){
  alert('选中了菜单' + key);
};

const menu = <Menu onSelect={onSelect}>
  <Menu.Item key="1">第一个菜单项</Menu.Item>
  <Menu.Item key="2">第二个菜单项</Menu.Item>
  <Menu.Item key="3">第三个菜单项</Menu.Item>
</Menu>;

ReactDOM.render(
  <Dropdown overlay={menu}>
    <Button>
      鼠标移入，点击菜单 <Icon type="down" />
    </Button>
  </Dropdown>
, document.getElementById('components-dropdown-demo-event'));
````
