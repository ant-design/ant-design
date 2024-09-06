import React from 'react';
import { Splitter } from 'antd';

const App: React.FC = () => (
  <Splitter
    style={{
      height: 300,
      border: '1px solid #e5e7eb',
    }}
  >
    <Splitter.Panel collapsible>aaa</Splitter.Panel>
    <Splitter.Panel>
      <Splitter layout="vertical">
        <Splitter.Panel>bbb</Splitter.Panel>
        <Splitter.Panel>ccc</Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);

export default App;
