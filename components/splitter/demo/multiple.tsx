import React from 'react';
import { Flex, Splitter, Typography } from 'antd';

const renderDesc = (id: number) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title
      type="secondary"
      level={5}
      style={{
        whiteSpace: 'nowrap',
      }}
    >
      Panel {id}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <Splitter
    style={{
      height: 200,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Splitter.Panel collapsible>{renderDesc(1)}</Splitter.Panel>

    <Splitter.Panel
      collapsible={{
        start: true,
      }}
    >
      {renderDesc(2)}
    </Splitter.Panel>

    <Splitter.Panel>{renderDesc(3)}</Splitter.Panel>
  </Splitter>
);

export default App;
