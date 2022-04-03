---
order: 5
title:
  zh-CN: 子菜单主题
  en-US: Sub-menu theme
---

## zh-CN

内建了两套主题 `light` 和 `dark`，默认 `light`。

## en-US

The Sub-menu will inherit the theme of `Menu`, but you can override this at the `SubMenu` level via the `theme` prop.

```jsx
import { Menu, Switch } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const SubMenuTheme = () => {
  const [theme, setTheme] = React.useState('light');
  const [current, setCurrent] = React.useState('1');

  const changeTheme = value => {
    setTheme(value ? 'dark' : 'light');
  };

  const handleClick = e => {
    setCurrent(e.key);
  };

  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="vertical"
        theme="dark"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One" theme={theme}>
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
        </SubMenu>
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
      </Menu>
    </>
  );
};

export default () => <SubMenuTheme />;
```
