import React, { useState } from 'react';
import { ConfigProvider, Flex, Progress, Segmented } from 'antd';

const App: React.FC = () => {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [gapDegree, setGapDegree] = useState<number>(100);
  return (
    <>
      gapDegree:
      <Segmented
        options={[
          { label: 100, value: 100 },
          { label: 50, value: 50 },
        ]}
        defaultValue={100}
        onChange={(value: number) => {
          setGapDegree(value);
        }}
      />
      <Flex gap="small" wrap>
        <Progress type="dashboard" percent={75} gapDegree={gapDegree} />
      </Flex>
      gapPlacement:
      <Segmented
        options={[
          { label: 'start', value: 'ltr' },
          { label: 'end', value: 'rtl' },
        ]}
        defaultValue="ltr"
        onChange={(value: 'ltr' | 'rtl') => {
          setDirection(value);
        }}
      />
      <Flex gap="small" wrap>
        <ConfigProvider direction={direction}>
          <Progress type="dashboard" gapDegree={gapDegree} percent={30} gapPlacement="start" />
        </ConfigProvider>
      </Flex>
    </>
  );
};

export default App;
