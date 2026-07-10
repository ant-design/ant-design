import React, { useMemo, useRef, useState } from 'react';
import { Input, Menu, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import type { TabsProps } from 'antd';

const useSearchPopupStyle = createStyles(({ token, css }) => ({
  container: css`
    width: 200px;
    background: ${token.colorBgContainer};
    box-shadow: ${token.boxShadow};
    border-radius: ${token.borderRadiusLG}px;
    overflow: hidden;
  `,
  searchWrapper: css`
    padding: ${token.paddingXS}px ${token.paddingSM}px;
    border-bottom: ${token.lineWidth}px ${token.lineType} ${token.colorBorder};
  `,
  menuWrapper: css`
    max-height: 300px;
    overflow-y: auto;
  `,
  empty: css`
    padding: ${token.paddingSM}px;
    color: ${token.colorTextDisabled};
    text-align: center;
  `,
}));

const items: TabsProps['items'] = Array.from({ length: 30 }, (_, i) => {
  const id = String(i);
  return {
    label: `Tab-${id}`,
    key: id,
    disabled: i === 28,
    children: `Content of tab ${id}`,
  };
});

const SearchPopup = (restTabs: any[], activeKey: string, onChange: (key: string) => void) => {
  const [searchTerm, setSearchTerm] = useState('');
  const menuRef = useRef<any>(null);
  const { styles } = useSearchPopupStyle();

  const fullTabs = useMemo(
    () => restTabs.map((item) => ({ key: item.key, label: item.label, disabled: item.disabled })),
    [restTabs],
  );

  const filterTabs = useMemo(
    () =>
      !searchTerm
        ? fullTabs
        : fullTabs.filter((tab) =>
            String(tab.label).toLowerCase().includes(searchTerm.toLowerCase()),
          ),
    [fullTabs, searchTerm],
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <Input
          placeholder="Search tabs..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
              menuRef.current?.focus();
            }
          }}
          allowClear
        />
      </div>
      <div className={styles.menuWrapper}>
        <Menu
          ref={menuRef}
          defaultSelectedKeys={[activeKey]}
          items={filterTabs}
          onClick={({ key }) => {
            setSearchTerm('');
            onChange(key);
          }}
        />
      </div>
      {filterTabs.length === 0 && <div className={styles.empty}>No matching tabs</div>}
    </div>
  );
};

const App: React.FC = () => {
  const [activeKey, setActiveKey] = React.useState('1');

  return (
    <Tabs
      activeKey={activeKey}
      onChange={setActiveKey}
      items={items}
      more={{
        trigger: 'click',
        placement: 'bottomLeft',
        popupRender: (_, { restTabs }) => SearchPopup(restTabs, activeKey, setActiveKey),
      }}
    />
  );
};

export default App;
