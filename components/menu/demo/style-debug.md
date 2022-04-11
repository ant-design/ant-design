---
order: 99
title:
  zh-CN: Style debug
  en-US: Style debug
debug: true
---

## zh-CN

buggy!

## en-US

buggy!

```tsx
import * as React from 'react';
import { Menu, MenuProps, Switch } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Navigation One Long Long Long Long', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Option 11', '11'),
  getItem('Option 12', '12'),
];

const Demo = () => {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');
  const [current, setCurrent] = React.useState('1');

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
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
        theme={theme}
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        items={items}
        inlineCollapsed
        // Test only. Remove in future.
        _internalRenderMenuItem={node =>
          React.cloneElement(node, {
            style: {
              ...node.props.style,
              textDecoration: 'underline',
            },
          })
        }
        // Test only. Remove in future.
        _internalRenderSubMenuItem={node =>
          React.cloneElement(node, {
            style: {
              ...node.props.style,
              background: 'rgba(255,255,255,0.3)',
            },
          })
        }
        // Test only. Remove in future.
        _internalDisableMenuItemTitleTooltip
      />
    </>
  );
};

export default () => <Demo />;
```
