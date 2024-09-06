import React from 'react';
import { Flex, Splitter, Typography } from 'antd';

const renderDesc = (text: string) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5}>
      {text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <Splitter
    layout="vertical"
    style={{
      height: 300,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Splitter.Panel>{renderDesc('First')}</Splitter.Panel>

    <Splitter.Panel>{renderDesc('Second')}</Splitter.Panel>
  </Splitter>
);

export default App;
