import React from 'react';
import { Splitter } from 'antd';

const App: React.FC = () => (
  <Splitter
    style={{
      height: 300,
      borderRadius: 4,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Splitter.Panel collapsible min="20%">
      <div style={{ padding: 12 }}>first</div>
    </Splitter.Panel>

    <Splitter.Panel collapsible>
      <div style={{ padding: 12 }}>second</div>
    </Splitter.Panel>
  </Splitter>
);

export default App;
