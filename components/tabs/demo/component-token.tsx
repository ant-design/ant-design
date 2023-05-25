import { AppleOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Button, ConfigProvider, Radio, Tabs } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [size, setSize] = useState<SizeType>('small');

  const onChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            cardHeadBackground: '#6f2121',
            cardHeight: 40,
            cardActiveColor: '#12a11d',
            cardHorizontalPadding: `20px 30px`,
            cardHorizontalPaddingSm: `16px 30px`,
            cardHorizontalPaddingLg: `7px 2px 6px`,
            titleFontSize: 22,
            titleFontSizeLg: 28,
            titleFontSizeSm: 16,
            inkBarColor: '#d5b85f',
            barMargin: `0 0 20px 0`,
            horizontalGutter: 32,
            horizontalMargin: '0 0 0 32px',
            horizontalPadding: `30px 0`,
            horizontalPaddingLG: `20px 0`,
            horizontalPaddingSM: `10px 0`,
            verticalPadding: `20px 18px`,
            verticalMargin: `10px  0 0 0`,
            scrollingSize: 32,
            highlightColor: '#a81675',
            hoverColor: '#508c18',
            activeColor: '#346717',
            cardGutter: 10,
            cardActiveBorderTop: '2px solid transparent',
          },
        },
      }}
    >
      <div>
        <Radio.Group value={size} onChange={onChange} style={{ marginBottom: 16 }}>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="middle">Middle</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
        <Tabs
          defaultActiveKey="1"
          size={size}
          tabPosition="right"
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
          type="card"
          size={size}
          items={new Array(30).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: (
                <span>
                  <AppleOutlined />
                  Card Tab{id}
                </span>
              ),
              key: id,
              children: `Content of card tab ${id}`,
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
      </div>
    </ConfigProvider>
  );
};

export default App;
