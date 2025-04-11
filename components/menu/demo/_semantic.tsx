import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Menu, MenuProps, Segmented } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

type MenuItem = Required<MenuProps>['items'][number];

const locales = {
  cn: {
    root: '根元素',
    item: '条目元素',
    itemContent: '条目内容元素',
    itemIcon: '图标元素',
    'popup.root': '弹出菜单元素(inline 模式不生效)',
    'popup.list': '弹出菜单列表元素',
    'popup.listItem': '弹出菜单单项元素',
    'popup.listItemIcon': '弹出菜单条目图标元素',
    'popup.listItemContent': '弹出菜单条目内容元素',
    'popup.listTitle': '弹出菜单标题元素',
  },
  en: {
    root: 'Root element',
    item: 'Item element',
    itemContent: 'Item content element',
    itemIcon: 'Icon element',
    'popup.root': 'Popup element(Inline mode has no effect)',
    'popup.list': 'Popup list element',
    'popup.listItem': 'Popup item element',
    'popup.listItemIcon': 'Popup item icon element',
    'popup.listItemContent': 'Popup item content element',
    'popup.listTitle': 'Popup title element',
  },
};
const items: MenuItem[] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    key: 'SubMenu',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label: 'Option 1', icon: <MailOutlined /> },
          { key: '2', label: 'Option 2' },
        ],
      },
    ],
  },
];

type ModeType = 'horizontal' | 'vertical' | 'inline';
const Block: React.FC = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [current, setCurrent] = React.useState('mail');
  const [mode, setMode] = React.useState<ModeType>('horizontal');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div ref={divRef}>
      <Segmented<ModeType>
        options={['horizontal', 'vertical', 'inline']}
        onChange={(value) => setMode(value)}
      />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode={mode}
        items={items}
        styles={{
          popup: {
            root: {
              zIndex: 1,
            },
          },
        }}
        {...props}
        openKeys={['SubMenu']}
        getPopupContainer={() => divRef.current}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Menu"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'item', desc: locale.item },
        { name: 'itemIcon', desc: locale.itemIcon },
        { name: 'itemContent', desc: locale.itemContent },
        { name: 'popup.root', desc: locale['popup.root'] },
        { name: 'popup.listTitle', desc: locale['popup.listTitle'] },
        { name: 'popup.list', desc: locale['popup.list'] },
        { name: 'popup.listItem', desc: locale['popup.listItem'] },
        { name: 'popup.listItemIcon', desc: locale['popup.listItemIcon'] },
        { name: 'popup.listItemContent', desc: locale['popup.listItemContent'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
