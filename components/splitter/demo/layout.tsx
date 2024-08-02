import React, { useState } from 'react';
import { Card, Radio, Splitter } from 'antd';

import type { SplitterProps } from '../Splitter';

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
        <Splitter.Panel defaultSize="220px" collapsible>
          <Card title="first" bordered={false}>
            <div>defaultSize: 220px</div>
            <div>collapsible: true</div>
          </Card>
        </Splitter.Panel>

        <Splitter.Panel>
          <Card title="second" bordered={false}>
            <div>something</div>
          </Card>
        </Splitter.Panel>
      </Splitter>
    </>
  );
};

export default App;
