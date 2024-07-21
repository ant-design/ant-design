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
        height={300}
        layout={layout}
        items={[
          {
            content: <div>111</div>,
          },
          {
            content: <div>222</div>,
          },
          {
            content: <div>333</div>,
          },
        ]}
      />
    </>
  );
};

export default App;
