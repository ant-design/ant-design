import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    popup: '弹出菜单元素',
    menuItem: '菜单项',
    menuItemContent: '菜单项内容',
    menuItemIcon: '菜单项图标',
  },
  en: {
    root: 'Root element',
    popup: 'Popup element',
    menuItem: 'Menu item',
    menuItemContent: 'Menu item content',
    menuItemIcon: 'Menu item icon',
  },
};

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
];

const Block: React.FC = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div style={{ height: 120, position: 'absolute', top: 50 }} ref={divRef}>
      <Dropdown
        {...props}
        menu={{ items }}
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
        { name: 'popup', desc: locale.popup },
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
