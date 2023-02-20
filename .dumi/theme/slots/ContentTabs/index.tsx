import type { FC, ReactNode } from 'react';
import React from 'react';
import { CodeOutlined, SkinOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useRouteMeta } from 'dumi';
import type { IContentTabsProps } from 'dumi/theme-default/slots/ContentTabs';
import type { TabsProps } from 'rc-tabs';

const titleMap: Record<string, string> = {
  design: '设计',
};

const iconMap: Record<string, ReactNode> = {
  design: <SkinOutlined />,
};

const ContentTabs: FC<IContentTabsProps> = ({ tabs, tabKey, onChange }) => {
  const meta = useRouteMeta();

  if (!meta.tabs) {
    return null;
  }

  const items: TabsProps['items'] = [
    {
      label: (
        <span>
          <CodeOutlined />
          开发
        </span>
      ),
      key: 'development',
    },
  ];
  tabs?.forEach((tab) => {
    items.push({
      label: (
        <span>
          {iconMap[tab.key]}
          {titleMap[tab.key]}
        </span>
      ),
      key: tab.key,
    });
  });

  return (
    <Tabs
      items={items}
      activeKey={tabKey || 'development'}
      onChange={(key) => onChange(tabs.find((tab) => tab.key === key))}
      style={{ margin: '32px 0 -16px' }}
    />
  );
};

export default ContentTabs;
