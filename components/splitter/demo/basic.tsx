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
          borderRadius: '4px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
        items={[
          {
            // size: layout === 'horizontal' ? 20 : 50,
            // size: '30%',
            size: '400px',
            collapsible: true,
            content: (
              <Card title="first" bordered={false}>
                <div>something</div>
              </Card>
            ),
          },
          {
            min: 50,
            content: (
              <Card title="second" bordered={false}>
                <div>something</div>
              </Card>
            ),
          },
        ]}
        onResizeStart={() => {
          console.log('[ onResizeStart ] ===>');
        }}
        onResize={(sizes) => {
          console.log('[ sizes ] ===>', sizes);
        }}
        onResizeEnd={() => {
          console.log('[ onResizeStart ] ===>');
        }}
      />
    </>
  );
};

export default App;
