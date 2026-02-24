---
category: Components
group: 导航
title: Menu
subtitle: 导航菜单
description: 为页面和功能提供导航的菜单列表。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KeyQQL5iKkkAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Vn4XSqJFAxcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

更多布局和导航的使用可以参考：[通用布局](/components/layout-cn)。

## 开发者注意事项 {#notes-for-developers}

- Menu 元素为 `ul`，因而仅支持 [`li` 以及 `script-supporting` 子元素](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element)。因而你的子节点元素应该都在 `Menu.Item` 内使用。
- Menu 需要计算节点结构，因而其子元素仅支持 `Menu.*` 以及对此进行封装的 HOC 组件。

## 代码演示 {#examples}

### 顶部导航

水平的顶部导航菜单。

```tsx
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          { label: 'Option 1', key: 'setting:1' },
          { label: 'Option 2', key: 'setting:2' },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          { label: 'Option 3', key: 'setting:3' },
          { label: 'Option 4', key: 'setting:4' },
        ],
      },
    ],
  },
  {
    key: 'alipay',
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
  },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default App;
```


### 内嵌菜单

垂直菜单，子菜单内嵌在菜单区域。

```tsx
import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
      {
        key: 'g2',
        label: 'Item 2',
        type: 'group',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      { key: '13', label: 'Option 13' },
      { key: '14', label: 'Option 14' },
    ],
  },
];

const App: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default App;
```

### 缩起内嵌菜单

内嵌菜单可以被缩起/展开。

你可以在 [Layout](/components/layout-cn/#layout-demo-side) 里查看侧边布局结合的完整示例。

```tsx
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
  { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
  { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default App;
```

### 菜单项提示

折叠状态下可配置 `tooltip`，也可以关闭。

```tsx
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu, Space, Switch } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
  { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
  { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [tooltipEnabled, setTooltipEnabled] = useState(true);

  return (
    <div style={{ width: 256 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => setCollapsed((prev) => !prev)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <Switch
          checked={tooltipEnabled}
          onChange={setTooltipEnabled}
          checkedChildren="Tooltip On"
          unCheckedChildren="Tooltip Off"
        />
      </Space>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        tooltip={tooltipEnabled ? { placement: 'left' } : false}
        items={items}
      />
    </div>
  );
};

export default App;
```

### 只展开当前父级菜单

点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。

```tsx
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: 'Navigation One',
    children: [
      { key: '11', label: 'Option 1' },
      { key: '12', label: 'Option 2' },
      { key: '13', label: 'Option 3' },
      { key: '14', label: 'Option 4' },
    ],
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: 'Navigation Two',
    children: [
      { key: '21', label: 'Option 1' },
      { key: '22', label: 'Option 2' },
      {
        key: '23',
        label: 'Submenu',
        children: [
          { key: '231', label: 'Option 1' },
          { key: '232', label: 'Option 2' },
          { key: '233', label: 'Option 3' },
        ],
      },
      {
        key: '24',
        label: 'Submenu 2',
        children: [
          { key: '241', label: 'Option 1' },
          { key: '242', label: 'Option 2' },
          { key: '243', label: 'Option 3' },
        ],
      },
    ],
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: 'Navigation Three',
    children: [
      { key: '31', label: 'Option 1' },
      { key: '32', label: 'Option 2' },
      { key: '33', label: 'Option 3' },
      { key: '34', label: 'Option 4' },
    ],
  },
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const App: React.FC = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key));
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default App;
```

### 垂直菜单

子菜单是弹出的形式。

```tsx
import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    icon: <MailOutlined />,
    label: 'Navigation One',
    children: [
      {
        key: '1-1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
      {
        key: '1-2',
        label: 'Item 2',
        type: 'group',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    icon: <AppstoreOutlined />,
    label: 'Navigation Two',
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
];

const onClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};

const App: React.FC = () => (
  <Menu onClick={onClick} style={{ width: 256 }} mode="vertical" items={items} />
);

export default App;
```

### 主题

内建了两套主题 `light` 和 `dark`，默认 `light`。

```tsx
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu, Switch } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const [current, setCurrent] = useState('1');

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick: MenuProps['onClick'] = (e) => {
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
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default App;
```

### 子菜单主题

你可以通过 `theme` 属性来设置 SubMenu 的主题从而达到不同目录树下不同主题色的效果。该例子默认为根目录深色，子目录浅色效果。

```tsx
import React, { useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu, Switch } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const App: React.FC = () => {
  const [menuTheme, setMenuTheme] = useState<MenuTheme>('light');
  const [current, setCurrent] = useState('1');

  const changeTheme = (value: boolean) => {
    setMenuTheme(value ? 'dark' : 'light');
  };

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const items: MenuItem[] = [
    {
      key: 'sub1',
      icon: <MailOutlined />,
      label: 'Navigation One',
      theme: menuTheme,
      children: [
        { key: '1', label: 'Option 1' },
        { key: '2', label: 'Option 2' },
        { key: '3', label: 'Option 3' },
      ],
    },
    { key: '5', label: 'Option 5' },
    { key: '6', label: 'Option 6' },
  ];

  return (
    <>
      <Switch
        checked={menuTheme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        openKeys={['sub1']}
        selectedKeys={[current]}
        mode="vertical"
        theme="dark"
        items={items}
        getPopupContainer={(node) => node.parentNode as HTMLElement}
      />
    </>
  );
};

export default App;
```

### 切换菜单类型

展示动态切换模式。

```tsx
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Divider, Menu, Switch } from 'antd';
import type { GetProp, MenuProps } from 'antd';

type MenuTheme = GetProp<MenuProps, 'theme'>;

type MenuItem = GetProp<MenuProps, 'items'>[number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: 'Navigation One',
  },
  {
    key: '2',
    icon: <CalendarOutlined />,
    label: 'Navigation Two',
  },
  {
    key: 'sub1',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
      {
        key: 'sub1-2',
        label: 'Submenu',
        children: [
          { key: '5', label: 'Option 5' },
          { key: '6', label: 'Option 6' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
    ],
  },
  {
    key: 'link',
    icon: <LinkOutlined />,
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Ant Design
      </a>
    ),
  },
];

const App: React.FC = () => {
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
  const [theme, setTheme] = useState<MenuTheme>('light');

  const changeMode = (value: boolean) => {
    setMode(value ? 'vertical' : 'inline');
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <>
      <Switch onChange={changeMode} /> Change Mode
      <Divider vertical />
      <Switch onChange={changeTheme} /> Change Style
      <br />
      <br />
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
        items={items}
      />
    </>
  );
};

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Menu 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 1px solid #f0f0f0;
    max-width: 600px;
    padding: 8px;
    border-radius: 4px;
  `,
  item: css`
    color: #1677ff;
  `,
}));

const items: Required<MenuProps>['items'] = [
  {
    key: 'SubMenu',
    label: 'Navigation One',
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
    ],
  },
  { key: 'mail', label: 'Navigation Two' },
];

const styles: MenuProps['styles'] = {
  root: { border: '1px solid #f0f0f0', padding: 8, borderRadius: 4 },
  item: { color: '#1677ff' },
  subMenu: { list: { color: '#fa541c' } },
};

const stylesFn: MenuProps['styles'] = (info) => {
  const hasSub = info.props.items?.[0];
  return {
    root: {
      backgroundColor: hasSub ? 'rgba(240,249,255, 0.6)' : 'rgba(255,255,255)',
    },
  } satisfies MenuProps['styles'];
};

const App: React.FC = () => {
  const shareProps: MenuProps = {
    classNames,
    items,
  };

  return (
    <Flex vertical gap="middle">
      <Menu {...shareProps} styles={styles} />
      <Menu mode="inline" {...shareProps} styles={stylesFn} />
    </Flex>
  );
};

export default App;
```





### 自定义弹出框

使用 `popupRender` 属性自定义弹出菜单的渲染。

```tsx
import React from 'react';
import type { MenuProps } from 'antd';
import { Col, ConfigProvider, Flex, Menu, Row, Space, Typography } from 'antd';
import { createStyles } from 'antd-style';

const { Title, Paragraph } = Typography;

const useStyles = createStyles(({ token }) => ({
  navigationPopup: {
    padding: token.padding,
    minWidth: 480,
    background: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  },
  menuItem: {
    borderRadius: token.borderRadius,
    transition: `all ${token.motionDurationSlow}`,
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.02)',
    },
  },
  menuItemSpace: {
    padding: token.paddingSM,
  },
  leadingHeader: {
    margin: '0 !important',
    paddingBottom: token.paddingXS,
    borderBottom: `1px solid ${token.colorSplit}`,
  },
  marginLess: {
    margin: '0 !important',
  },
}));

const MenuItem = ({ title, description }: { title: string; description: string }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.menuItem}>
      <Space vertical size={4} className={styles.menuItemSpace}>
        <Title level={5} className={styles.marginLess}>
          {title}
        </Title>
        <Paragraph type="secondary" className={styles.marginLess}>
          {description}
        </Paragraph>
      </Space>
    </div>
  );
};

const menuItems = [
  {
    key: 'home',
    label: 'Home',
  },
  {
    key: 'features',
    label: 'Features',
    children: [
      {
        key: 'getting-started',
        label: (
          <MenuItem title="Getting Started" description="Quick start guide and learn the basics." />
        ),
      },
      {
        key: 'components',
        label: <MenuItem title="Components" description="Explore our component library." />,
      },
      {
        key: 'templates',
        label: <MenuItem title="Templates" description="Ready-to-use template designs." />,
      },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    children: [
      {
        key: 'blog',
        label: <MenuItem title="Blog" description="Latest updates and articles." />,
      },
      {
        key: 'community',
        label: <MenuItem title="Community" description="Join our developer community." />,
      },
    ],
  },
];

const App: React.FC = () => {
  const { styles } = useStyles();
  const popupRender: MenuProps['popupRender'] = (_, { item }) => {
    return (
      <Flex className={styles.navigationPopup} vertical gap="middle">
        <Typography.Title level={3} className={styles.leadingHeader}>
          {item.title}
        </Typography.Title>
        <Row gutter={16}>
          {React.Children.map(item.children as React.ReactNode, (child) => {
            if (!React.isValidElement(child)) {
              return null;
            }
            return (
              <Col span={12} key={child.key}>
                {child}
              </Col>
            );
          })}
        </Row>
      </Flex>
    );
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            popupBg: '#fff',
            horizontalItemSelectedColor: '#1677ff',
            horizontalItemHoverColor: '#1677ff',
          },
          Typography: {
            titleMarginBottom: 0,
            titleMarginTop: 0,
          },
        },
      }}
    >
      <Menu mode="horizontal" items={menuItems} popupRender={popupRender} />
    </ConfigProvider>
  );
};

export default App;
```


## API

通用属性参考：[通用属性](/docs/react/common-props)

### Menu

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultOpenKeys | 初始展开的 SubMenu 菜单项 key 数组 | string\[] | - |  |
| defaultSelectedKeys | 初始选中的菜单项 key 数组 | string\[] | - |  |
| expandIcon | 自定义展开图标 | ReactNode \| `(props: SubMenuProps & { isSubMenu: boolean }) => ReactNode` | - | 4.9.0 |
| forceSubMenuRender | 在子菜单展示之前就渲染进 DOM | boolean | false |  |
| inlineCollapsed | inline 时菜单是否收起状态 | boolean | - |  |
| inlineIndent | inline 模式的菜单缩进宽度 | number | 24 |  |
| items | 菜单内容 | [ItemType\[\]](#itemtype) | - | 4.20.0 |
| mode | 菜单类型，现在支持垂直、水平、和内嵌模式三种 | `vertical` \| `horizontal` \| `inline` | `vertical` |  |
| multiple | 是否允许多选 | boolean | false |  |
| openKeys | 当前展开的 SubMenu 菜单项 key 数组 | string\[] | - |  |
| overflowedIndicator | 用于自定义 Menu 水平空间不足时的省略收缩的图标 | ReactNode | `<EllipsisOutlined />` |  |
| selectable | 是否允许选中 | boolean | true |  |
| selectedKeys | 当前选中的菜单项 key 数组 | string\[] | - |  |
| style | 根节点样式 | CSSProperties | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom) , CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom) , CSSProperties> | - |  |
| subMenuCloseDelay | 用户鼠标离开子菜单后关闭延时，单位：秒 | number | 0.1 |  |
| subMenuOpenDelay | 用户鼠标进入子菜单后开启延时，单位：秒 | number | 0 |  |
| tooltip | 配置 inline 折叠时的 MenuItem 悬浮提示，设为 `false` 可关闭 | false \| TooltipProps | - | 6.3.0 |
| theme | 主题颜色 | `light` \| `dark` | `light` |  |
| triggerSubMenuAction | SubMenu 展开/关闭的触发行为 | `hover` \| `click` | `hover` |  |
| onClick | 点击 MenuItem 调用此函数 | function({ key, keyPath, domEvent }) | - |  |
| onDeselect | 取消选中时调用，仅在 multiple 生效 | function({ key, keyPath, selectedKeys, domEvent }) | - |  |
| onOpenChange | SubMenu 展开/关闭的回调 | function(openKeys: string\[]) | - |  |
| onSelect | 被选中时调用 | function({ key, keyPath, selectedKeys, domEvent }) | -   |  |
| popupRender | 自定义子菜单的弹出框 | (node: ReactElement, props: { item: SubMenuProps; keys: string[] }) => ReactElement | - |  |

> 更多属性查看 [@rc-component/menu](https://github.com/react-component/menu#api)

### ItemType

> type ItemType = [MenuItemType](#menuitemtype) | [SubMenuType](#submenutype) | [MenuItemGroupType](#menuitemgrouptype) | [MenuDividerType](#menudividertype);

#### MenuItemType

| 参数     | 说明                     | 类型      | 默认值 | 版本   |
| -------- | ------------------------ | --------- | ------ | ------ |
| danger   | 展示错误状态样式         | boolean   | false  |        |
| disabled | 是否禁用                 | boolean   | false  |        |
| extra    | 额外节点                 | ReactNode | -      | 5.21.0 |
| icon     | 菜单图标                 | ReactNode | -      |        |
| key      | item 的唯一标志          | string    | -      |        |
| label    | 菜单项标题               | ReactNode | -      |        |
| title    | 设置收缩时展示的悬浮标题 | string    | -      |        |

#### SubMenuType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| children | 子菜单的菜单项 | [ItemType\[\]](#itemtype) | - |  |
| disabled | 是否禁用 | boolean | false |  |
| icon | 菜单图标 | ReactNode | - |  |
| key | 唯一标志 | string | - |  |
| label | 菜单项标题 | ReactNode | - |  |
| popupClassName | 子菜单样式，`mode="inline"` 时无效 | string | - |  |
| popupOffset | 子菜单偏移量，`mode="inline"` 时无效 | \[number, number] | - |  |
| onTitleClick | 点击子菜单标题 | function({ key, domEvent }) | - |  |
| theme | 设置子菜单的主题，默认从 Menu 上继承 | `light` \| `dark` | - |  |
| popupRender | 自定义当前子菜单的弹出框 | (node: ReactElement, props: { item: SubMenuProps; keys: string[] }) => ReactElement | - |  |

#### MenuItemGroupType

定义类型为 `group` 时，会作为分组处理:

```ts
const groupItem = {
  type: 'group', // Must have
  label: 'My Group',
  children: [],
};
```

| 参数     | 说明         | 类型                              | 默认值 | 版本 |
| -------- | ------------ | --------------------------------- | ------ | ---- |
| children | 分组的菜单项 | [MenuItemType\[\]](#menuitemtype) | -      |      |
| label    | 分组标题     | ReactNode                         | -      |      |

#### MenuDividerType

菜单项分割线，只用在弹出菜单内，需要定义类型为 `divider`：

```ts
const dividerItem = {
  type: 'divider', // Must have
};
```

| 参数   | 说明     | 类型    | 默认值 | 版本 |
| ------ | -------- | ------- | ------ | ---- |
| dashed | 是否虚线 | boolean | false  |      |

## FAQ

### 为何 Menu 的子元素会渲染两次？ {#faq-render-twice}

Menu 通过[二次渲染](https://github.com/react-component/menu/blob/f4684514096d6b7123339cbe72e7b0f68db0bce2/src/Menu.tsx#L543)收集嵌套结构信息以支持 HOC 的结构。合并成一个推导结构会使得逻辑变得十分复杂，欢迎 PR 以协助改进该设计。

### 在 Flex 布局中，Menu 没有按照预期响应式省略菜单？ {#faq-flex-layout}

Menu 初始化时会先全部渲染，然后根据宽度裁剪内容。当处于 Flex 布局中，你需要告知其预期宽度为响应式宽度（[在线 Demo](https://codesandbox.io/s/ding-bu-dao-hang-antd-4-21-7-forked-5e3imy?file=/demo.js)）：

```jsx
<div style={{ flex }}>
  <div style={{ ... }}>Some Content</div>
  <Menu style={{ minWidth: 0, flex: "auto" }} />
</div>
```

## Semantic DOM

https://ant.design/components/menu-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Menu)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeBarBorderWidth | 菜单项指示条边框宽度 | string \| number | 1 |
| activeBarHeight | 菜单项指示条高度 | number | 2 |
| activeBarWidth | 菜单项指示条宽度 | string \| number | 0 |
| collapsedIconSize | 收起时图标尺寸 | number | 16 |
| collapsedWidth | 收起后的宽度 | string \| number | 80 |
| dangerItemActiveBg | 危险菜单项激活态背景色 | string | #fff2f0 |
| dangerItemColor | 危险菜单项文字颜色 | string | #ff4d4f |
| dangerItemHoverColor | 危险菜单项文字悬浮颜色 | string | #ff4d4f |
| dangerItemSelectedBg | 危险菜单项选中背景色 | string | #fff2f0 |
| dangerItemSelectedColor | 危险菜单项文字选中颜色 | string | #ff4d4f |
| darkDangerItemActiveBg | 暗色模式下的危险菜单项激活态背景 | string | #ff4d4f |
| darkDangerItemColor | 暗色模式下的危险菜单项文字颜色 | string | #ff4d4f |
| darkDangerItemHoverColor | 暗色模式下的危险菜单项悬浮文字背景 | string | #ff7875 |
| darkDangerItemSelectedBg | 暗色模式下的危险菜单项选中背景 | string | #ff4d4f |
| darkDangerItemSelectedColor | 暗色模式下的危险菜单项选中文字颜色 | string | #fff |
| darkGroupTitleColor | 暗色模式下的分组标题文字颜色 | string | rgba(255,255,255,0.65) |
| darkItemBg | 暗色模式下的菜单项背景 | string | #001529 |
| darkItemColor | 暗色模式下的菜单项文字颜色 | string | rgba(255,255,255,0.65) |
| darkItemDisabledColor | 暗色模式下的菜单项禁用颜色 | string | rgba(255,255,255,0.25) |
| darkItemHoverBg | 暗色模式下的菜单项悬浮背景 | string | transparent |
| darkItemHoverColor | 暗色模式下的菜单项悬浮颜色 | string | #fff |
| darkItemSelectedBg | 暗色模式下的菜单项选中背景 | string | #1677ff |
| darkItemSelectedColor | 暗色模式下的菜单项选中颜色 | string | #fff |
| darkPopupBg | 暗色模式下的浮层菜单的背景颜色 | string | #001529 |
| darkSubMenuItemBg | 暗色模式下的子菜单项背景 | string | #000c17 |
| dropdownWidth | 弹出菜单的宽度 | string \| number | 160 |
| groupTitleColor | 分组标题文字颜色 | string | rgba(0,0,0,0.45) |
| groupTitleFontSize | 分组标题文字大小 | number | 14 |
| groupTitleLineHeight | 分组标题文字高度 | string \| number | 1.5714285714285714 |
| horizontalItemBorderRadius | 横向菜单项圆角 | number | 0 |
| horizontalItemHoverBg | 横向菜单项横悬浮态背景色 | string | transparent |
| horizontalItemHoverColor | 水平菜单项文字悬浮颜色 | string | #1677ff |
| horizontalItemSelectedBg | 水平菜单项选中态背景色 | string | transparent |
| horizontalItemSelectedColor | 水平菜单项文字选中颜色 | string | #1677ff |
| horizontalLineHeight | 横向菜单行高 | LineHeight<string \| number> \| undefined | 46px |
| iconMarginInlineEnd | 图标与文字间距 | MarginInlineEnd<string \| number> \| undefined | 10 |
| iconSize | 图标尺寸 | number | 14 |
| itemActiveBg | 菜单项激活态背景色 | string | #e6f4ff |
| itemBg | 菜单项背景色 | string | #ffffff |
| itemBorderRadius | 菜单项的圆角 | number | 8 |
| itemColor | 菜单项文字颜色 | string | rgba(0,0,0,0.88) |
| itemDisabledColor | 菜单项文字禁用颜色 | string | rgba(0,0,0,0.25) |
| itemHeight | 菜单项高度 | string \| number | 40 |
| itemHoverBg | 菜单项悬浮态背景色 | string | rgba(0,0,0,0.06) |
| itemHoverColor | 菜单项文字悬浮颜色 | string | rgba(0,0,0,0.88) |
| itemMarginBlock | 菜单项纵向外间距 | MarginBlock<string \| number> \| undefined | 4 |
| itemMarginInline | 菜单项横向外间距 | number | 4 |
| itemPaddingInline | 菜单项横向内间距 | PaddingInline<string \| number> \| undefined | 16 |
| itemSelectedBg | 菜单项选中态背景色 | string | #e6f4ff |
| itemSelectedColor | 菜单项文字选中颜色 | string | #1677ff |
| popupBg | 弹出框背景色 | string | #ffffff |
| subMenuItemBg | 子菜单项背景色 | string | rgba(0,0,0,0.02) |
| subMenuItemBorderRadius | 子菜单项的圆角 | number | 4 |
| subMenuItemSelectedColor | 子菜单内有选中项时，子菜单标题色 | string | #1677ff |
| zIndexPopup | 弹出菜单的 z-index | number | 1050 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| boxShadowSecondary | 控制元素二级阴影样式。 | string |  |
| colorBgElevated | 浮层容器背景色，在暗色模式下该 token 的色值会比 `colorBgContainer` 要亮一些。例如：模态框、弹出框、菜单等。 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextLightSolid | 控制带背景色的文本，例如 Primary Button 组件中的文本高亮颜色。 | string |  |
| controlHeightLG | 较高的组件高度 | number |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| margin | 控制元素外边距，中等尺寸。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| motionDurationFast | 动效播放速度，快速。用于小型元素动画交互 | string |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOut | 预设动效曲率 | string |  |
| motionEaseInOutCirc | 预设动效曲率 | string |  |
| motionEaseInQuint | 预设动效曲率 | string |  |
| motionEaseOut | 预设动效曲率 | string |  |
| motionEaseOutCirc | 预设动效曲率 | string |  |
| motionEaseOutQuint | 预设动效曲率 | string |  |
| padding | 控制元素的内间距。 | number |  |
| paddingXL | 控制元素的特大内间距。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |


