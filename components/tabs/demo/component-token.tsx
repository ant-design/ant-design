import { Button, ConfigProvider, Tabs } from 'antd';
import React from 'react';

const App: React.FC = () => (
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
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of tab ${id}`,
          };
        })}
      />
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        tabBarExtraContent={<Button>Extra Action</Button>}
        style={{ marginBottom: 32 }}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of tab ${id}`,
          };
        })}
      />
      <Tabs
        size="small"
        defaultActiveKey="1"
        tabBarExtraContent={<Button>Extra Action</Button>}
        style={{ marginBottom: 32 }}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of tab ${id}`,
          };
        })}
      />
      <Tabs
        size="large"
        defaultActiveKey="1"
        tabBarExtraContent={<Button>Extra Action</Button>}
        style={{ marginBottom: 32 }}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of tab ${id}`,
          };
        })}
      />
      <Tabs
        defaultActiveKey="1"
        centered
        type="card"
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            disabled: i === 2,
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab Pane ${id}`,
          };
        })}
      />
      <Tabs
        size="small"
        defaultActiveKey="1"
        centered
        type="card"
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            disabled: i === 2,
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab Pane ${id}`,
          };
        })}
      />
      <Tabs
        size="large"
        defaultActiveKey="1"
        centered
        type="card"
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            disabled: i === 2,
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab Pane ${id}`,
          };
        })}
      />
    </div>
  </ConfigProvider>
);

export default App;
