import React from 'react';
import { Splitter } from 'antd';

const App: React.FC = () => (
  <Splitter
    layout="vertical"
    style={{
      height: 300,
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
);

export default App;
