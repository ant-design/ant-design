import React from 'react';
import { Flex, Splitter, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const SIZE_BUCKETS = [
  {
    defaultSize: 100,
    min: 100,
    max: 200,
  },
  {
    min: 100,
    max: 200,
  },
  {
    min: '20%',
  },
] as const;

// const SIZE_BUCKETS = [
//   {
//     min: 300,
//   },
//   {
//     min: 100,
//     max: 200,
//   },
//   {
//     min: 600,
//   },
// ] as const;

const App: React.FC = () => (
  <Splitter
    style={{
      height: 300,
      width: 1000,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Splitter.Panel {...SIZE_BUCKETS[0]}>
      <Desc text="First" />
    </Splitter.Panel>
    <Splitter.Panel {...SIZE_BUCKETS[1]}>
      <Desc text="Second" />
    </Splitter.Panel>
    <Splitter.Panel {...SIZE_BUCKETS[2]}>
      <Desc text="Third" />
    </Splitter.Panel>
  </Splitter>
);

export default App;
