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
  <Splitter style={{ height: 300, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <Splitter.Panel collapsible>
      <Desc text="Left" />
    </Splitter.Panel>
    <Splitter.Panel>
      <Splitter layout="vertical">
        <Splitter.Panel>
          <Desc text="Top" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Bottom" />
        </Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);

export default App;
