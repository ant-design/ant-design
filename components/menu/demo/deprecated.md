---
order: 0
title:
  zh-CN: 基础用法（废弃的语法糖）
  en-US: Basic usage (deprecated syntactic sugar)
version: < 4.20.0
---

## zh-CN

通过语法糖的方式组织菜单目录树，在 `4.20.0` 之后推荐通过 `items` 属性实现。在下个大版本中语法糖用法将被移除从而让 Menu 可以获得更好的性能优化。

## en-US

Use the syntax sugar to organize the menu directory tree. We recommend to use `items` after `4.20.0`. In the next major version, the syntax sugar will be removed to make performance improvement be possible.

```tsx
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const App = () => (
  <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
    <Menu.Item key="mail" icon={<MailOutlined />}>
      Navigation One
    </Menu.Item>
    <Menu.SubMenu key="SubMenu" title="Navigation Two - Submenu" icon={<SettingOutlined />}>
      <Menu.Item key="two" icon={<AppstoreOutlined />}>
        Navigation Two
      </Menu.Item>
      <Menu.Item key="three" icon={<AppstoreOutlined />}>
        Navigation Three
      </Menu.Item>
      <Menu.ItemGroup title="Item Group">
        <Menu.Item key="four" icon={<AppstoreOutlined />}>
          Navigation Four
        </Menu.Item>
        <Menu.Item key="five" icon={<AppstoreOutlined />}>
          Navigation Five
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu.SubMenu>
  </Menu>
);

export default App;
```
