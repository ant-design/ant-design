import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space, Tabs } from 'antd';

type TabPlacement = 'start' | 'end' | 'top' | 'bottom';

const App: React.FC = () => {
  const [tabPlacement, setTabPlacement] = useState<TabPlacement>('start');

  const changeTabPlacement = (e: RadioChangeEvent) => {
    setTabPlacement(e.target.value);
  };

  return (
    <>
      <Space style={{ marginBottom: 24 }}>
        Tab placement:
        <Radio.Group value={tabPlacement} onChange={changeTabPlacement}>
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="bottom">bottom</Radio.Button>
          <Radio.Button value="start">start</Radio.Button>
          <Radio.Button value="end">end</Radio.Button>
        </Radio.Group>
      </Space>
      <Tabs
        tabPlacement={tabPlacement}
        items={Array.from({ length: 3 }).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
      />
    </>
  );
};

export default App;
