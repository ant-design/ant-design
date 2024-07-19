import React, { useState } from 'react';
import { Radio, SplitPanel } from 'antd';
import type { GroupProps } from '../Group';

const App: React.FC = () => {
  const [layout, setLayout] = useState<GroupProps['layout']>('vertical');

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

      <SplitPanel.Group layout={layout} height={300}>
        <SplitPanel>111</SplitPanel>
        <SplitPanel>222</SplitPanel>
        <SplitPanel>333</SplitPanel>
      </SplitPanel.Group>
    </>
  );
};

export default App;
