import React from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs } from 'antd';

type TabsAlignment = 'start' | 'center' | 'end';

const App: React.FC = () => {
  const [tabAlignment, setTabAlignment] = React.useState<TabsAlignment>('end');

  const changeTabAlignment = (e: RadioChangeEvent) => {
    setTabAlignment(e.target.value);
  };

  return (
    <>
      <Radio.Group value={tabAlignment} onChange={changeTabAlignment}>
        <Radio.Button value="start">Start</Radio.Button>
        <Radio.Button value="center">Center</Radio.Button>
        <Radio.Button value="end">End</Radio.Button>
      </Radio.Group>

      <Tabs
        defaultActiveKey="1"
        align={tabAlignment}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab Pane ${id}`,
          };
        })}
      />
    </>
  );
};

export default App;
