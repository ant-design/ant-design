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
  <Flex vertical gap="middle">
    <Typography.Title level={3}>[true, 0, false]</Typography.Title>
    <Splitter
      style={{
        height: 200,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Splitter.Panel>{renderDesc(1)}</Splitter.Panel>

      <Splitter.Panel defaultSize={0}>{renderDesc(2)}</Splitter.Panel>

      <Splitter.Panel resizable={false}>{renderDesc(3)}</Splitter.Panel>
    </Splitter>

    <Typography.Title level={3}>[false, 0, true]</Typography.Title>
    <Splitter
      style={{
        height: 200,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Splitter.Panel resizable={false}>{renderDesc(1)}</Splitter.Panel>

      <Splitter.Panel defaultSize={0}>{renderDesc(2)}</Splitter.Panel>

      <Splitter.Panel>{renderDesc(3)}</Splitter.Panel>
    </Splitter>

    <Typography.Title level={3}>Start have min & max</Typography.Title>
    <Splitter
      style={{
        height: 200,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Splitter.Panel min={50} max={100}>
        {renderDesc(1)}
      </Splitter.Panel>

      <Splitter.Panel>{renderDesc(2)}</Splitter.Panel>
    </Splitter>

    <Typography.Title level={3}>End have min & max</Typography.Title>
    <Splitter
      style={{
        height: 200,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Splitter.Panel>{renderDesc(1)}</Splitter.Panel>

      <Splitter.Panel min="20%" max="70%">
        {renderDesc(2)}
      </Splitter.Panel>
    </Splitter>
  </Flex>
);

export default App;
