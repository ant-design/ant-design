# 触发方式

- order: 2

默认是移入触发菜单，可以点击触发。

---

````jsx
import { Menu, Dropdown, Icon } from 'antd';

const menu = <Menu>
  <Menu.Item key="0">
    <a href="http://www.alipay.com/">第一个菜单项</a>
  </Menu.Item>
  <Menu.Item key="1">
    <a href="http://www.taobao.com/">第二个菜单项</a>
  </Menu.Item>
  <Menu.Divider/>
  <Menu.Item key="3">第三个菜单项</Menu.Item>
</Menu>;

ReactDOM.render(<div>
  <Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" href="#">
      点击触发 <Icon type="down" />
    </a>
  </Dropdown>
</div>, document.getElementById('components-dropdown-demo-trigger'));
````
