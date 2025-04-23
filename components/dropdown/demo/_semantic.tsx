import React from 'react';
import { DeleteOutlined, DownOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    menuTitle: '菜单标题',
    menuItem: '菜单项',
    menuItemContent: '菜单项内容',
    menuItemIcon: '菜单项图标',
  },
  en: {
    root: 'Root element',
    menuTitle: 'Menu title',
    menuItem: 'Menu item',
    menuItemContent: 'Menu item content',
    menuItemIcon: 'Menu item icon',
  },
};

const items: MenuProps['items'] = [
  {
    key: '1',
    type: 'group',
    label: 'Group title',
    children: [
      {
        key: '1-1',
        label: '1st menu item',
        icon: <SaveOutlined />,
      },
      {
        key: '1-2',
        label: '2nd menu item',
        icon: <EditOutlined />,
      },
    ],
  },
  {
    key: 'SubMenu',
    label: 'SubMenu',
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
  {
    key: '3',
    type: 'divider',
  },
  {
    key: '4',
    label: 'Delete',
    icon: <DeleteOutlined />,
    danger: true,
  },
];

const Block: React.FC = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div style={{ height: 120, position: 'absolute', top: 50 }} ref={divRef}>
      <Dropdown
        {...props}
        menu={{ items, defaultOpenKeys: ['SubMenu'] }}
        open
        styles={{
          root: {
            width: 200,
            zIndex: 1,
          },
        }}
        getPopupContainer={() => divRef.current}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Hover me
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Dropdown"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'menu.itemTitle', desc: locale.menuTitle },
        { name: 'menu.item', desc: locale.menuItem },
        { name: 'menu.itemIcon', desc: locale.menuItemIcon },
        { name: 'menu.itemContent', desc: locale.menuItemContent },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
