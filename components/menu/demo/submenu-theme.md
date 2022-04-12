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

```tsx
import { Menu, Switch, MenuProps } from 'antd';
import { MailOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  theme?: 'light' | 'dark',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    theme,
  } as MenuItem;
}

const SubMenuTheme = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [current, setCurrent] = React.useState('1');

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

  const items: MenuItem[] = [
    getItem(
      'Navigation One',
      'sub1',
      <MailOutlined />,
      [getItem('Option 1', '1'), getItem('Option 2', '2'), getItem('Option 3', '3')],
      theme,
    ),
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
  ];

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
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="vertical"
        theme="dark"
        items={items}
      />
    </>
  );
};

export default () => <SubMenuTheme />;
```
