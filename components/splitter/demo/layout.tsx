import React, { useState } from 'react';
import type { SplitterProps } from 'antd';
import { Radio, Splitter } from 'antd';

const App: React.FC = () => {
  const [layout, setLayout] = useState<SplitterProps['layout']>('horizontal');

  return (
    <>
      <Radio.Group
        value={layout}
        style={{ marginBottom: 24 }}
        onChange={(e) => setLayout(e.target.value)}
      >
        <Radio.Button value="vertical">vertical</Radio.Button>
        <Radio.Button value="horizontal">horizontal</Radio.Button>
      </Radio.Group>

      <Splitter
        layout={layout}
        style={{
          height: 300,
          borderRadius: 4,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Splitter.Panel>
          <div style={{ padding: 12 }}>first</div>
        </Splitter.Panel>

        <Splitter.Panel>
          <div style={{ padding: 12 }}>second</div>
        </Splitter.Panel>
      </Splitter>
    </>
  );
};

export default App;
