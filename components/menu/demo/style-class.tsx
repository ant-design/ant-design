import React from 'react';
import { Menu, Flex } from 'antd';
import type { MenuProps } from 'antd';

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

const classNamesObject: MenuProps['classNames'] = {
  root: 'demo-menu-root',
  item: 'demo-menu-item',
  itemIcon: 'demo-menu-item-icon',
  itemContent: 'demo-menu-item-content',
  subMenu: {
    list: 'demo-submenu-list',
    itemTitle: 'demo-submenu-title',
  },
};

const classNamesFn: MenuProps['classNames'] = (info) => {
  const inline = info.props.mode === 'inline';
  return { root: inline ? 'demo-menu-root--inline' : 'demo-menu-root--plain' };
};

const stylesObject: MenuProps['styles'] = {
  root: { border: '1px solid #f0f0f0', padding: 8, borderRadius: 4 },
  item: { color: '#1677ff' },
  subMenu: { list: { color: '#fa541c' } },
};

const stylesFn: MenuProps['styles'] = (info) => {
  const hasSub = !!info.props.items?.[0];
  return { root: { backgroundColor: hasSub ? '#f0f9ff' : '#ffffff' } };
};

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Menu mode="inline" items={items} classNames={classNamesObject} />
    <Menu mode="inline" items={items} classNames={classNamesFn} />
    <Menu mode="inline" items={items} styles={stylesObject} />
    <Menu mode="inline" items={items} styles={stylesFn} />
  </Flex>
);

export default App;
