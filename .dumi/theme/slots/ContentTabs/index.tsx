import type { FC, ReactNode } from 'react';
import React from 'react';
import { CodeOutlined, SkinOutlined } from '@ant-design/icons';
import type { TabsProps } from '@rc-component/tabs';
import { Tabs } from 'antd';
import { useRouteMeta } from 'dumi';
import type { IContentTabsProps } from 'dumi/theme-default/slots/ContentTabs';

import useLocale from '../../../hooks/useLocale';

const iconMap: Record<string, ReactNode> = {
  design: <SkinOutlined />,
};

const locales = {
  cn: {
    development: '开发',
    design: '设计',
  },
  en: {
    development: 'Development',
    design: 'Design',
  },
};

const ContentTabs: FC<IContentTabsProps> = ({ tabs, tabKey, onChange }) => {
  const meta = useRouteMeta();

  const [locale] = useLocale(locales);

  const titleMap: Record<string, ReactNode> = {
    design: locale.design,
  };

  if (!meta.tabs) {
    return null;
  }

  const items: TabsProps['items'] = [
    {
      key: 'development',
      label: locale.development,
      icon: <CodeOutlined />,
    },
  ];

  tabs?.forEach((tab) => {
    items.push({
      key: tab.key,
      label: titleMap[tab.key],
      icon: iconMap[tab.key],
    });
  });

  return (
    <Tabs
      items={items}
      activeKey={tabKey || 'development'}
      onChange={(key) => onChange(tabs?.find((tab) => tab.key === key))}
      style={{ margin: '32px 0 -16px' }}
    />
  );
};

export default ContentTabs;
