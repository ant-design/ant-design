import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

type MenuItem = Required<MenuProps>['items'][number];

const locales = {
  cn: {
    root: '根元素',
    item: '条目元素',
    itemContent: '条目内容元素',
    itemIcon: '图标元素',
    popup: '弹出菜单元素',
  },
  en: {
    root: 'Root element',
    item: 'Item element',
    itemContent: 'Item content element',
    itemIcon: 'Icon element',
    popup: 'Popup element',
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
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
    ],
  },
];

const Block: React.FC = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [current, setCurrent] = React.useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div ref={divRef}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
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
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'item', desc: locale.item },
        { name: 'itemIcon', desc: locale.itemIcon },
        { name: 'itemContent', desc: locale.itemContent },
        { name: 'popup', desc: locale.popup },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
