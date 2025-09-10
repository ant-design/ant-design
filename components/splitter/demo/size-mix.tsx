import React from 'react';
import { Flex, Splitter, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <Splitter
    style={{
      height: 300,
      width: 1000,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Splitter.Panel defaultSize={100} min={100} max={200}>
      <Desc text="First" />
    </Splitter.Panel>
    <Splitter.Panel min={100} max={200}>
      <Desc text="Second" />
    </Splitter.Panel>
    <Splitter.Panel min="20%">
      <Desc text="Second" />
    </Splitter.Panel>
  </Splitter>
);

export default App;
