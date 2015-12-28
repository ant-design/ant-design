# 带下拉框的按钮

- order: 4

左边是按钮，右边是额外的相关功能菜单。

---

````jsx
import { Menu, Dropdown } from 'antd';
const DropdownButton = Dropdown.Button;

const menu = <Menu>
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

ReactDOM.render(
<DropdownButton overlay={menu} type="primary">
  某功能按钮
</DropdownButton>
, document.getElementById('components-dropdown-demo-dropdown-button'));
````
