import React from 'react';
import { Divider, Splitter } from 'antd';

const App: React.FC = () => (
  <Splitter
    style={{
      height: 200,
      border: '1px solid #e5e7eb',
    }}
  >
    <Splitter.Panel collapsible>
      <Divider>1</Divider>
    </Splitter.Panel>

    <Splitter.Panel>
      <Divider>2</Divider>
    </Splitter.Panel>

    <Splitter.Panel>
      <Divider>3</Divider>
    </Splitter.Panel>
  </Splitter>
);

export default App;
