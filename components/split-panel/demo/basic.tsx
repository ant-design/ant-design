import React, { useState } from 'react';
import { Radio, SplitPanel } from 'antd';

import type { SplitPanelProps } from '../SplitPanel';

const App: React.FC = () => {
  const [layout, setLayout] = useState<SplitPanelProps['layout']>('horizontal');

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

      <SplitPanel
        layout={layout}
        style={{
          height: 300,
          borderRadius: '4px',
          border: '1px solid #e5e7eb',
        }}
        items={[
          {
            // size: layout === 'horizontal' ? 20 : 10,
            content: <div>111</div>,
            resizable: false,
            collapsible: true,
          },
          {
            content: <div>222</div>,
            min: 10,
            max: 40,
          },
          {
            content: <div>333</div>,
          },
          {
            content: <div>444</div>,
          },
        ]}
      />
    </>
  );
};

export default App;
