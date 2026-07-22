import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Segmented, Space } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
type DemoMode = 'horizontal' | 'vertical' | 'inline-collapsed';
const scrollableSubmenuPopupClassName = 'scrollable-submenu-popup';

const scrollableItems: MenuItem[] = Array.from({ length: 24 }, (_, index) => ({
  key: `option-${index + 1}`,
  label: `Option ${index + 1}`,
}));

const items: MenuItem[] = [
  {
    key: 'navigation',
    icon: <MailOutlined />,
    label: 'Navigation One',
    popupClassName: scrollableSubmenuPopupClassName,
    children: scrollableItems,
  },
  {
    key: 'applications',
    icon: <AppstoreOutlined />,
    label: 'Navigation Two',
    children: [
      { key: 'application-1', label: 'Option 1' },
      { key: 'application-2', label: 'Option 2' },
      { key: 'application-3', label: 'Option 3' },
    ],
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Navigation Three',
  },
];

const modeOptions: { label: string; value: DemoMode }[] = [
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Vertical', value: 'vertical' },
  { label: 'Inline collapsed', value: 'inline-collapsed' },
];

const App: React.FC = () => {
  const [mode, setMode] = useState<DemoMode>('horizontal');

  const inlineCollapsed = mode === 'inline-collapsed';
  const menuMode = inlineCollapsed ? 'inline' : mode;

  return (
    <>
      <style>{`
        .${scrollableSubmenuPopupClassName}.ant-menu-submenu-popup .ant-menu-vertical.ant-menu-sub {
          max-height: 256px;
        }
      `}</style>
      <Space orientation="vertical" size="middle">
        <Segmented<DemoMode> options={modeOptions} value={mode} onChange={setMode} />
        <Menu
          key={mode}
          defaultOpenKeys={inlineCollapsed ? undefined : ['navigation']}
          defaultSelectedKeys={['option-1']}
          getPopupContainer={(node) => node.parentNode as HTMLElement}
          items={items}
          mode={menuMode}
          scrollFade
          style={{ width: mode === 'horizontal' ? 520 : inlineCollapsed ? 80 : 256 }}
          triggerSubMenuAction={inlineCollapsed ? 'click' : 'hover'}
          {...(inlineCollapsed ? { inlineCollapsed } : {})}
        />
      </Space>
    </>
  );
};

export default App;
