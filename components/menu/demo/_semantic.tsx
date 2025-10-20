import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Flex, Menu, Segmented } from 'antd';
import type { MenuProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

type MenuItem = Required<MenuProps>['items'][number];

const locales = {
  cn: {
    root: '根元素，包含菜单容器的基础样式和布局',
    item: '条目元素，包含相对定位、块级显示、外边距、空白符处理、光标样式、过渡动画等菜单项的基础交互样式',
    itemContent: '条目内容元素，包含菜单项内容的布局和排版样式',
    itemIcon: '图标元素，包含最小宽度、字体大小、过渡动画、图标重置样式，以及与文本的间距控制',
    itemTitle: '菜单标题元素(horizontal 模式不生效)，包含标题文字的样式和布局',
    list: '菜单列表元素(horizontal 模式不生效)，包含菜单列表的布局和容器样式',
    popup: '弹出菜单(inline 模式不生效)，包含弹出层的定位、层级、背景等样式',
    'subMenu.itemTitle': '子菜单标题元素，包含子菜单标题的样式和交互效果',
    'subMenu.list': '子菜单列表元素，包含子菜单列表的布局和容器样式',
    'subMenu.item': '子菜单单项元素，包含子菜单项的样式和交互效果',
    'subMenu.itemIcon': '子菜单条目图标元素，包含子菜单图标的尺寸和样式',
    'subMenu.itemContent': '子菜单条目内容元素，包含子菜单内容的布局和排版',
  },
  en: {
    root: 'Root element with basic menu container styles and layout',
    item: 'Item element with relative positioning, block display, margins, whitespace handling, cursor styles, transitions and other basic interactive styles for menu items',
    itemContent: 'Item content element with layout and typography styles for menu item content',
    itemIcon:
      'Icon element with min-width, font-size, transitions, icon reset styles, and spacing control with text',
    itemTitle:
      'Item title element (no effect in horizontal mode) with title text styles and layout',
    list: 'Menu list element (no effect in horizontal mode) with menu list layout and container styles',
    popup:
      'Popup menu element (no effect in inline mode) with popup layer positioning, z-index, background and other styles',
    'subMenu.itemTitle': 'Submenu title element with submenu title styles and interactive effects',
    'subMenu.list': 'Submenu list element with submenu list layout and container styles',
    'subMenu.item': 'Submenu item element with submenu item styles and interactive effects',
    'subMenu.itemIcon': 'Submenu item icon element with submenu icon size and styles',
    'subMenu.itemContent':
      'Submenu item content element with submenu content layout and typography',
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
  }, [mode, locale]);

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
