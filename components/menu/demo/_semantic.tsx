import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Flex, Menu, MenuProps, Segmented } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

type MenuItem = Required<MenuProps>['items'][number];

const locales = {
  cn: {
    root: '根元素',
    item: '条目元素',
    itemContent: '条目内容元素',
    itemIcon: '图标元素',
    itemTitle: '菜单标题元素(horizontal 模式不生效)',
    list: '菜单列表元素(horizontal 模式不生效)',
    popup: '弹出菜单(inline 模式不生效)',
    'subMenu.itemTitle': '子菜单标题元素',
    'subMenu.list': '子菜单列表元素',
    'subMenu.item': '子菜单单项元素',
    'subMenu.itemIcon': '子菜单条目图标元素',
    'subMenu.itemContent': '子菜单条目内容元素',
  },
  en: {
    root: 'Root element',
    item: 'Item element',
    itemContent: 'Item content element',
    itemIcon: 'Icon element',
    itemTitle: 'Item title(horizontal mode has no effect)',
    list: 'Item list element(horizontal mode has no effect)',
    popup: 'Popup element(inline mode has no effect)',
    'subMenu.itemTitle': 'subMenu item title',
    'subMenu.list': 'Submenu element',
    'subMenu.item': 'Submenu item element',
    'subMenu.itemIcon': 'Submenu item icon element',
    'subMenu.itemContent': 'Submenu item content element',
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

const groupItem: MenuItem[] = [
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

const Block: React.FC<
  MenuProps & { item: MenuItem[]; setMode: React.Dispatch<React.SetStateAction<ModeType>> }
> = (props) => {
  const { mode, setMode, item } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const [current, setCurrent] = React.useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Flex vertical gap="middle" ref={divRef} align="center">
      <Segmented<ModeType>
        options={['horizontal', 'vertical', 'inline']}
        onChange={(value) => setMode(value)}
      />
      <div style={{ height: 360 }}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode={mode}
          items={item}
          styles={{
            root: {
              width: mode === 'horizontal' ? 310 : 230,
            },
            popup: {
              root: {
                zIndex: 1,
              },
            },
          }}
          {...props}
          openKeys={['SubMenu']}
          getPopupContainer={() => divRef.current!}
        />
      </div>
    </Flex>
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
    const subMenuLocale = [
      { name: 'subMenu.itemTitle', desc: locale['subMenu.itemTitle'] },
      { name: 'subMenu.list', desc: locale['subMenu.list'] },
      { name: 'subMenu.item', desc: locale['subMenu.item'] },
      { name: 'subMenu.itemIcon', desc: locale['subMenu.itemIcon'] },
      { name: 'subMenu.itemContent', desc: locale['subMenu.itemContent'] },
    ];
    const groupLocale = [
      { name: 'itemTitle', desc: locale.itemTitle },
      { name: 'list', desc: locale.list },
    ];

    const additionalPopupLocale = mode !== 'inline' ? [{ name: 'popup', desc: locale.popup }] : [];
    const additionalGroupLocale = mode !== 'horizontal' ? groupLocale : [];

    return [...baseLocale, ...additionalGroupLocale, ...additionalPopupLocale, ...subMenuLocale];
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
