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
    popup: '弹出菜单(inline 模式不生效)',
    'subMenu.listTitle': '子菜单标题元素',
    'subMenu.list': '子菜单列表元素',
    'subMenu.listItem': '子菜单单项元素',
    'subMenu.listItemIcon': '子菜单条目图标元素',
    'subMenu.listItemContent': '子菜单条目内容元素',
  },
  en: {
    root: 'Root element',
    item: 'Item element',
    itemContent: 'Item content element',
    itemIcon: 'Icon element',
    popup: 'Popup element(inline mode has no effect)',
    'subMenu.listTitle': 'subMenu list title',
    'subMenu.list': 'Submenu list element',
    'subMenu.listItem': 'Submenu list item element',
    'subMenu.listItemIcon': 'Submenu list item icon element',
    'subMenu.listItemContent': 'Submenu list item content element',
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

const groupItem = [
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

type ModeType = 'horizontal' | 'vertical' | 'inline';

const Block = (props: any) => {
  const { mode, setMode, item } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const [current, setCurrent] = React.useState('mail');

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
        items={item}
        styles={{
          root: {
            width: mode === 'horizontal' ? 400 : 230,
          },
          popup: {
            zIndex: 1,
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
  const [mode, setMode] = React.useState<ModeType>('horizontal');

  const semantics = React.useMemo(() => {
    const baseLocale = [
      { name: 'root', desc: locale.root },
      { name: 'item', desc: locale.item },
      { name: 'itemIcon', desc: locale.itemIcon },
      { name: 'itemContent', desc: locale.itemContent },
    ];
    const subMenu = [
      { name: 'subMenu.listTitle', desc: locale['subMenu.listTitle'] },
      { name: 'subMenu.list', desc: locale['subMenu.list'] },
      { name: 'subMenu.listItem', desc: locale['subMenu.listItem'] },
      { name: 'subMenu.listItemIcon', desc: locale['subMenu.listItemIcon'] },
      { name: 'subMenu.listItemContent', desc: locale['subMenu.listItemContent'] },
    ];

    const additionalLocale = mode !== 'inline' ? [{ name: 'popup', desc: locale.popup }] : [];

    return [...baseLocale, ...additionalLocale, ...subMenu];
  }, [mode]);

  const itemList = React.useMemo(() => {
    return mode === 'horizontal' ? items : [...items, ...groupItem];
  }, [mode]);

  return (
    <SemanticPreview componentName="Menu" semantics={semantics}>
      <Block mode={mode} setMode={setMode} item={itemList} />
    </SemanticPreview>
  );
};

export default App;
