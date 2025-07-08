import React, { useState } from 'react';
import { Flex, Progress, Segmented } from 'antd';

import { GapPlacement } from '../progress';

const App: React.FC = () => {
  const [gapPlacement, setGapPlacement] = useState<GapPlacement>('bottom');
  const [gapDegree, setGapDegree] = useState<number>(50);
  return (
    <>
      gapDegree:
      <Segmented
        options={[
          { label: 50, value: 50 },

          { label: 100, value: 100 },
        ]}
        defaultValue={50}
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
          { label: 'start', value: 'start' },
          { label: 'end', value: 'end' },
          { label: 'top', value: 'top' },
          { label: 'bottom', value: 'bottom' },
        ]}
        defaultValue="bottom"
        onChange={(value: GapPlacement) => {
          setGapPlacement(value);
        }}
      />
      <Flex gap="small" wrap>
        <Progress type="dashboard" gapDegree={gapDegree} percent={30} gapPlacement={gapPlacement} />
      </Flex>
    </>
  );
};

export default App;
