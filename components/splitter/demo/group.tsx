import React from 'react';
import { Flex, Splitter, Typography } from 'antd';

const renderDesc = (text: string) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title
      type="secondary"
      level={5}
      style={{
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <Splitter
    style={{
      height: 300,
      border: '1px solid #e5e7eb',
    }}
  >
    <Splitter.Panel collapsible>{renderDesc('Left')}</Splitter.Panel>
    <Splitter.Panel>
      <Splitter layout="vertical">
        <Splitter.Panel>{renderDesc('Top')}</Splitter.Panel>
        <Splitter.Panel>{renderDesc('Bottom')}</Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);

export default App;
