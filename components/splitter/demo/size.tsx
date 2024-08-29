import React from 'react';
import { Splitter } from 'antd';

const App: React.FC = () => (
  <Splitter
    style={{
      height: 300,
      borderRadius: 4,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}
    onResize={(sizes, index) => {
      console.log('[ sizes index ] ===>', sizes, index);
    }}
  >
    <Splitter.Panel size={40} min={20} max={80}>
      <div style={{ padding: 12 }}>
        <div>first</div>
        <div>size=40</div>
        <div>max=80</div>
        <div>min=20</div>
      </div>
    </Splitter.Panel>

    <Splitter.Panel>
      <div style={{ padding: 12 }}>second</div>
    </Splitter.Panel>
  </Splitter>
);

export default App;
