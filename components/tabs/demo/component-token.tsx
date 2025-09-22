import React from 'react';
import { Button, ConfigProvider, Flex, Tabs } from 'antd';

const tabItems = Array.from({ length: 3 }).map((_, i) => {
  const id = String(i + 1);
  return {
    disabled: i === 2,
    label: `Tab ${id}`,
    key: id,
    children: `Content of Tab Pane ${id}`,
  };
});

const sharedTabsProps = {
  items: Array.from({ length: 2 }).map((_, i) => {
    const id = String(i + 1);
    return {
      label: `Tab ${id}`,
      key: id,
    };
  }),
  tabBarStyle: { background: 'red' },
};

const App: React.FC = () => (
  <>
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            cardBg: '#f6ffed',
            cardHeight: 60,
            cardPadding: `20px`,
            cardPaddingSM: `20px`,
            cardPaddingLG: `20px`,
            titleFontSize: 20,
            titleFontSizeLG: 20,
            titleFontSizeSM: 20,
            inkBarColor: '#52C41A',
            horizontalMargin: `0 0 12px 0`,
            horizontalItemGutter: 12, // Fixed Value
            horizontalItemPadding: `20px`,
            horizontalItemPaddingSM: `20px`,
            horizontalItemPaddingLG: `20px`,
            verticalItemPadding: `8px`,
            verticalItemMargin: `4px 0 0 0`,
            itemColor: 'rgba(0,0,0,0.85)',
            itemSelectedColor: '#389e0d',
            itemHoverColor: '#d9f7be',
            itemActiveColor: '#b7eb8f',
            cardGutter: 12,
          },
        },
      }}
    >
      <div>
        <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={<Button>Extra Action</Button>}
          style={{ marginBottom: 32 }}
          items={tabItems}
        />
        <Tabs
          tabPlacement="start"
          defaultActiveKey="1"
          tabBarExtraContent={<Button>Extra Action</Button>}
          style={{ marginBottom: 32 }}
          items={tabItems}
        />
        <Tabs
          size="small"
          defaultActiveKey="1"
          tabBarExtraContent={<Button>Extra Action</Button>}
          style={{ marginBottom: 32 }}
          items={tabItems}
        />
        <Tabs
          size="large"
          defaultActiveKey="1"
          tabBarExtraContent={<Button>Extra Action</Button>}
          style={{ marginBottom: 32 }}
          items={tabItems}
        />
        <Tabs defaultActiveKey="1" centered type="card" items={tabItems} />
        <Tabs size="small" defaultActiveKey="1" centered type="card" items={tabItems} />
        <Tabs size="large" defaultActiveKey="1" centered type="card" items={tabItems} />
      </div>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            cardHeight: 180,
            cardPadding: '0px 0px 0px 0px',
            cardPaddingSM: '0px 0px 0px 0px',
            verticalItemPadding: '0px 0px',
            borderRadiusLG: 0,
            borderRadius: 0,
            horizontalItemPadding: '0px 0px 0px 0px',
            horizontalMargin: '0 0 0 0',
            inkBarColor: '#ffa940',
          },
        },
      }}
    >
      <Tabs size="small" type="editable-card" items={tabItems} />
    </ConfigProvider>
    <Flex align="flex-end">
      <Tabs size="large" type="card" {...sharedTabsProps} />
      <Tabs size="middle" type="card" {...sharedTabsProps} />
      <Tabs size="small" type="editable-card" {...sharedTabsProps} />
      <Tabs size="small" type="card" {...sharedTabsProps} />
    </Flex>
  </>
);

export default App;
