import React from 'react';
import { Radio, Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const App: React.FC = () => {
  const [align, setAlign] = React.useState<TabsProps['indicatorAlign']>('center');
  return (
    <>
      <Radio.Group
        defaultValue="center"
        onChange={(e) => setAlign(e.target.value)}
        style={{ marginBottom: 12 }}
      >
        {['start', 'center', 'end'].map((item) => (
          <Radio.Button key={item} value={item}>
            {item}
          </Radio.Button>
        ))}
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        indicatorSize={(origin) => origin - 20}
        indicatorAlign={align}
      />
    </>
  );
};

export default App;
