import React, { useState } from 'react';
import { Flex, Radio, Splitter, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const SIZE_BUCKETS_1 = [
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

const SIZE_BUCKETS_2 = [
  {
    min: 300,
  },
  {
    min: 100,
    max: 200,
  },
  {
    min: 600,
  },
] as const;

const App: React.FC = () => {
  const [sizeBucket, setSizeBucket] = useState(1);

  const SIZE_BUCKETS = sizeBucket === 1 ? SIZE_BUCKETS_1 : SIZE_BUCKETS_2;

  return (
    <>
      <Radio.Group
        onChange={(e) => setSizeBucket(e.target.value)}
        value={sizeBucket}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value={1}>Size Bucket 1</Radio.Button>
        <Radio.Button value={2}>Size Bucket 2</Radio.Button>
      </Radio.Group>
      <Splitter
        key={sizeBucket}
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
    </>
  );
};

export default App;
