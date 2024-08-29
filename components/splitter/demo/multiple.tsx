import React from 'react';
import { Divider, Splitter } from 'antd';

const App: React.FC = () => (
  <Splitter
    style={{
      height: 300,
      borderRadius: 4,
      border: '1px solid #e5e7eb',
    }}
    onResizeStart={(sizes, index) => {
      console.log('[ sizes index ] ===>', sizes, index);
    }}
  >
    <Splitter.Panel size={20}>
      <Divider>1 size=20</Divider>
    </Splitter.Panel>

    <Splitter.Panel>
      <Divider>2</Divider>
    </Splitter.Panel>

    <Splitter.Panel>
      <Divider>3</Divider>
    </Splitter.Panel>

    <Splitter.Panel>
      <Divider>4</Divider>
    </Splitter.Panel>
  </Splitter>
);

export default App;
