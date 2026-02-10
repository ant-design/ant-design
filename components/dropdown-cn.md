---
category: Components
group: 导航
title: Dropdown
subtitle: 下拉菜单
description: 向下弹出的列表。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*gTBySYX11WcAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*k619RJ_7bKEAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

- 用于收罗一组命令操作。
- Select 用于选择，而 Dropdown 是命令集合。

## 代码演示 {#examples}

### 基本

最简单的下拉菜单。

```tsx
import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];

const App: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default App;
```

### 额外节点

带有快捷方式的下拉菜单。

```tsx
import React from 'react';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'My Account',
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: 'Profile',
    extra: '⌘P',
  },
  {
    key: '3',
    label: 'Billing',
    extra: '⌘B',
  },
  {
    key: '4',
    label: 'Settings',
    icon: <SettingOutlined />,
    extra: '⌘S',
  },
];

const App: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default App;
```

### 弹出位置

支持 6 个弹出位置。

```tsx
import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const App: React.FC = () => (
  <Space vertical>
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottom">
        <Button>bottom</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Button>bottomRight</Button>
      </Dropdown>
    </Space>
    <Space wrap>
      <Dropdown menu={{ items }} placement="topLeft">
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="top">
        <Button>top</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="topRight">
        <Button>topRight</Button>
      </Dropdown>
    </Space>
  </Space>
);

export default App;
```

### 箭头

可以展示一个箭头。

```tsx
import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const App: React.FC = () => (
  <Space vertical>
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottomLeft" arrow>
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottom" arrow>
        <Button>bottom</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <Button>bottomRight</Button>
      </Dropdown>
    </Space>
    <Space wrap>
      <Dropdown menu={{ items }} placement="topLeft" arrow>
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="top" arrow>
        <Button>top</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="topRight" arrow>
        <Button>topRight</Button>
      </Dropdown>
    </Space>
  </Space>
);

export default App;
```

### 其他元素

分割线和不可用菜单项。

```tsx
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item（disabled）',
    key: '3',
    disabled: true,
  },
];

const App: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default App;
```

### 箭头指向

设置 `arrow` 为 `{ pointAtCenter: true }` 后，箭头将指向目标元素的中心。

```tsx
import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const App: React.FC = () => (
  <Space vertical>
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
        <Button>bottom</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
        <Button>bottomRight</Button>
      </Dropdown>
    </Space>
    <Space wrap>
      <Dropdown menu={{ items }} placement="topLeft" arrow={{ pointAtCenter: true }}>
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="top" arrow={{ pointAtCenter: true }}>
        <Button>top</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="topRight" arrow={{ pointAtCenter: true }}>
        <Button>topRight</Button>
      </Dropdown>
    </Space>
  </Space>
);

export default App;
```

### 触发方式

默认是移入触发菜单，可以点击触发。

```tsx
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    label: (
      <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
        1st menu item
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
        2nd menu item
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const App: React.FC = () => (
  <Dropdown menu={{ items }} trigger={['click']}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Click me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default App;
```

### 触发事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

```tsx
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const App: React.FC = () => (
  <Dropdown menu={{ items, onClick }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me, Click menu item
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default App;
```

### 带下拉框的按钮

左边是按钮，右边是额外的相关功能菜单。可设置 `icon` 属性来修改右边的图标。

```tsx
import React from 'react';
import { DownOutlined, EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};

const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: '2nd menu item',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: '3rd menu item',
    key: '3',
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: '4rd menu item',
    key: '4',
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const App: React.FC = () => (
  <Space wrap>
    <Space.Compact>
      <Button onClick={handleButtonClick}>Dropdown</Button>
      <Dropdown menu={menuProps} placement="bottomRight">
        <Button icon={<EllipsisOutlined />} />
      </Dropdown>
    </Space.Compact>
    <Space.Compact>
      <Button onClick={handleButtonClick}>Dropdown</Button>
      <Dropdown menu={menuProps} placement="bottomRight">
        <Button icon={<UserOutlined />} />
      </Dropdown>
    </Space.Compact>
    <Space.Compact>
      <Button onClick={handleButtonClick} disabled>
        Dropdown
      </Button>
      <Dropdown menu={menuProps} placement="bottomRight" disabled>
        <Button icon={<EllipsisOutlined />} disabled />
      </Dropdown>
    </Space.Compact>
    <Space.Compact>
      <Tooltip title="tooltip">
        <Button onClick={handleButtonClick}>With Tooltip</Button>
      </Tooltip>
      <Dropdown menu={menuProps} placement="bottomRight">
        <Button loading />
      </Dropdown>
    </Space.Compact>
    <Dropdown menu={menuProps}>
      <Button onClick={handleButtonClick} icon={<DownOutlined />} iconPlacement="end">
        Button
      </Button>
    </Dropdown>
    <Space.Compact>
      <Button onClick={handleButtonClick} danger>
        Danger
      </Button>
      <Dropdown menu={menuProps} placement="bottomRight">
        <Button icon={<EllipsisOutlined />} danger />
      </Dropdown>
    </Space.Compact>
  </Space>
);

export default App;
```

### 扩展菜单

使用 `popupRender` 对下拉菜单进行自由扩展。如果你并不需要 Menu 内容，请直接使用 Popover 组件。

```tsx
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Space, theme } from 'antd';
import type { MenuProps } from 'antd';

const { useToken } = theme;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
];

const App: React.FC = () => {
  const { token } = useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  return (
    <Dropdown
      menu={{ items }}
      popupRender={(menu) => (
        <div style={contentStyle}>
          {React.cloneElement(
            menu as React.ReactElement<{
              style: React.CSSProperties;
            }>,
            { style: menuStyle },
          )}
          <Divider style={{ margin: 0 }} />
          <Space style={{ padding: 8 }}>
            <Button type="primary">Click me!</Button>
          </Space>
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default App;
```

### 多级菜单

传入的菜单里有多个层级。

```tsx
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    type: 'group',
    label: 'Group title',
    children: [
      {
        key: '1-1',
        label: '1st menu item',
      },
      {
        key: '1-2',
        label: '2nd menu item',
      },
    ],
  },
  {
    key: '2',
    label: 'sub menu',
    children: [
      {
        key: '2-1',
        label: '3rd menu item',
      },
      {
        key: '2-2',
        label: '4th menu item',
      },
    ],
  },
  {
    key: '3',
    label: 'disabled sub menu',
    disabled: true,
    children: [
      {
        key: '3-1',
        label: '5d menu item',
      },
      {
        key: '3-2',
        label: '6th menu item',
      },
    ],
  },
];

const App: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Cascading menu
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default App;
```


### 菜单隐藏方式

默认是点击关闭菜单，可以关闭此功能。

```tsx
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { DropdownProps, MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '3') {
      setOpen(false);
    }
  };

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Clicking me will not close the menu.',
      key: '1',
    },
    {
      label: 'Clicking me will not close the menu also.',
      key: '2',
    },
    {
      label: 'Clicking me will close the menu.',
      key: '3',
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default App;
```

### 右键菜单

默认是移入触发菜单，可以点击鼠标右键触发。弹出菜单位置会跟随右键点击位置变动。

```tsx
import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, theme } from 'antd';

const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const App: React.FC = () => {
  const {
    token: { colorBgLayout, colorTextTertiary },
  } = theme.useToken();

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <div
        style={{
          color: colorTextTertiary,
          background: colorBgLayout,
          height: 200,
          textAlign: 'center',
          lineHeight: '200px',
        }}
      >
        Right Click on here
      </div>
    </Dropdown>
  );
};

export default App;
```

### 加载中状态

添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。

```tsx
import React, { useState } from 'react';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Submit and continue',
    key: '1',
  },
];

const App: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((state) => {
      const newLoadings = [...state];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((state) => {
        const newLoadings = [...state];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <Space vertical>
      <Space.Compact>
        <Button type="primary" loading>
          Submit
        </Button>
        <Dropdown menu={{ items }}>
          <Button type="primary" icon={<EllipsisOutlined />} />
        </Dropdown>
      </Space.Compact>
      <Space.Compact size="small">
        <Button type="primary" loading>
          Submit
        </Button>
        <Dropdown menu={{ items }}>
          <Button type="primary" icon={<EllipsisOutlined />} />
        </Dropdown>
      </Space.Compact>
      <Space.Compact>
        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          Submit
        </Button>
        <Dropdown menu={{ items }}>
          <Button type="primary" icon={<EllipsisOutlined />} />
        </Dropdown>
      </Space.Compact>
      <Space.Compact>
        <Button loading={loadings[1]} onClick={() => enterLoading(1)}>
          Submit
        </Button>
        <Dropdown menu={{ items }}>
          <Button icon={<DownOutlined />} />
        </Dropdown>
      </Space.Compact>
    </Space>
  );
};

export default App;
```

### 菜单可选选择

添加 `menu` 中的 `selectable` 属性可以开启选择能力。

```tsx
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
  {
    key: '3',
    label: 'Item 3',
  },
];

const App: React.FC = () => (
  <Dropdown
    menu={{
      items,
      selectable: true,
      defaultSelectedKeys: ['3'],
    }}
  >
    <Typography.Link>
      <Space>
        Selectable
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
);

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Dropdown 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { DownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Space } from 'antd';
import type { DropdownProps, MenuProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    backgroundColor: token.colorFillAlter,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Profile',
  },
  {
    key: '2',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: '3',
    label: 'Logout',
    icon: <LogoutOutlined />,
    danger: true,
  },
];

const objectStyles: DropdownProps['styles'] = {
  root: {
    backgroundColor: '#ffffff',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
  },
  item: {
    padding: '8px 12px',
    fontSize: '14px',
  },
  itemTitle: {
    fontWeight: '500',
  },
  itemIcon: {
    color: '#1890ff',
    marginRight: '8px',
  },
  itemContent: {
    backgroundColor: 'transparent',
  },
};

const functionStyles: DropdownProps['styles'] = (info) => {
  const { props } = info;
  const isClick = props.trigger?.includes('click');
  if (isClick) {
    return {
      root: {
        borderColor: '#1890ff',
        borderRadius: '8px',
      },
    } satisfies DropdownProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyles();

  const sharedProps: DropdownProps = {
    menu: { items },
    placement: 'bottomLeft',
    classNames: { root: styles.root },
  };

  return (
    <Flex gap="middle" wrap="wrap">
      <Space vertical size="large">
        <Dropdown {...sharedProps} styles={objectStyles}>
          <Button>
            <Space>
              Object Style
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Dropdown {...sharedProps} styles={functionStyles} trigger={['click']}>
          <Button type="primary">
            <Space>
              Function Style
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Space>
    </Flex>
  );
};

export default App;
```





## API

通用属性参考：[通用属性](/docs/react/common-props)

### Dropdown

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| arrow | 下拉框箭头是否显示 | boolean \| { pointAtCenter: boolean } | false |  |
| autoAdjustOverflow | 下拉框被遮挡时自动调整位置 | boolean | true | 5.2.0 |
| classNames | 用于自定义 Dropdown 组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| disabled | 菜单是否禁用 | boolean | - |  |
| ~~destroyPopupOnHide~~ | 关闭后是否销毁 Dropdown，使用 `destroyOnHidden` 替换 | boolean | false |  |
| destroyOnHidden | 关闭后是否销毁 Dropdown | boolean | false | 5.25.0 |
| ~~dropdownRender~~ | 自定义下拉框内容，使用 `popupRender` 替换 | (menus: ReactNode) => ReactNode | - | 4.24.0 |
| popupRender | 自定义弹出框内容 | (menus: ReactNode) => ReactNode | - | 5.25.0 |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | (triggerNode: HTMLElement) => HTMLElement | () => document.body |  |
| menu | 菜单配置项 | [MenuProps](/components/menu-cn#api) | - |  |
| ~~overlayClassName~~ | 下拉根元素的类名称, 请使用 `classNames.root` 替换 | string | - |  |
| ~~overlayStyle~~ | 下拉根元素的样式，请使用 `styles.root` | CSSProperties | - |  |
| placement | 菜单弹出位置：`bottom` `bottomLeft` `bottomRight` `top` `topLeft` `topRight` | string | `bottomLeft` |  |
| styles | 用于自定义 Dropdown 组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom) , CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom) , CSSProperties> | - |  |
| trigger | 触发下拉的行为，移动端不支持 hover | Array&lt;`click`\|`hover`\|`contextMenu`> | \[`hover`] |  |
| open | 菜单是否显示 | boolean | - |  |
| onOpenChange | 菜单显示状态改变时调用，点击菜单按钮导致的消失不会触发 | (open: boolean, info: { source: 'trigger' \| 'menu' }) => void | - | `info.source`: 5.11.0 |

## 注意

请确保 `Dropdown` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。

## Semantic DOM

https://ant.design/components/dropdown-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Dropdown)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| paddingBlock | 下拉菜单纵向内边距 | PaddingBlock<string \| number> \| undefined | 5 |
| zIndexPopup | 下拉菜单 z-index | number | 1050 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| borderRadiusXS | XS号圆角，用于组件中的一些小圆角，如 Segmented 、Arrow 等一些内部圆角的组件样式中。 | number |  |
| boxShadowSecondary | 控制元素二级阴影样式。 | string |  |
| colorBgElevated | 浮层容器背景色，在暗色模式下该 token 的色值会比 `colorBgContainer` 要亮一些。例如：模态框、弹出框、菜单等。 | string |  |
| colorError | 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。 | string |  |
| colorIcon | 控制弱操作图标的颜色，例如 allowClear 或 Alert 关闭按钮。  * | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDescription | 控制文本描述字体颜色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| colorTextLightSolid | 控制带背景色的文本，例如 Primary Button 组件中的文本高亮颜色。 | string |  |
| controlItemBgActive | 控制组件项在激活状态下的背景颜色。 | string |  |
| controlItemBgActiveHover | 控制组件项在鼠标悬浮且激活状态下的背景颜色。 | string |  |
| controlItemBgHover | 控制组件项在鼠标悬浮时的背景颜色。 | string |  |
| controlPaddingHorizontal | 控制元素水平内间距。 | number |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeIcon | 控制选择器、级联选择器等中的操作图标字体大小。正常情况下与 fontSizeSM 相同。 | number |  |
| fontSizeSM | 小号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| marginXXS | 控制元素外边距，最小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionEaseInOutCirc | 预设动效曲率 | string |  |
| motionEaseInQuint | 预设动效曲率 | string |  |
| motionEaseOutCirc | 预设动效曲率 | string |  |
| motionEaseOutQuint | 预设动效曲率 | string |  |
| padding | 控制元素的内间距。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |
| sizePopupArrow | 组件箭头的尺寸 | number |  |



## FAQ

### Dropdown 在水平方向超出屏幕时会被挤压该怎么办？ {#faq-dropdown-squeezed}

你可以通过 `width: max-content` 来解决这个问题，参考 [#43025](https://github.com/ant-design/ant-design/issues/43025#issuecomment-1594394135)。
