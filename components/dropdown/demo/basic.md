# 基本

- order: 0

最简单的下拉菜单。

---

````jsx
import { Menu, Dropdown, Icon } from 'antd';

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
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" href="#">
      触发链接 <Icon type="down" />
    </a>
  </Dropdown>
, document.getElementById('components-dropdown-demo-basic'));
````
