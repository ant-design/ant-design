import React from 'react';
import { Flex, Progress, Slider } from 'antd';

const DEFAULT_COUNT = 5;
const DEFAULT_GAP = 8;

const App: React.FC = () => {
  const [stepsCount, setStepsCount] = React.useState<number>(DEFAULT_COUNT);
  const [stepsGap, setStepsGap] = React.useState<number>(DEFAULT_GAP);
  return (
    <>
      <p>Custom count:</p>
      <Slider
        defaultValue={DEFAULT_COUNT}
        min={2}
        max={10}
        value={stepsCount}
        onChange={setStepsCount}
      />
      <p>Custom gap:</p>
      <Slider
        defaultValue={DEFAULT_GAP}
        step={4}
        min={0}
        max={40}
        value={stepsGap}
        onChange={setStepsGap}
      />
      <Flex wrap="wrap" gap="middle" style={{ marginTop: 16 }}>
        <Progress
          type="dashboard"
          steps={8}
          percent={50}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20}
        />
        <Progress
          type="circle"
          percent={100}
          steps={{ count: stepsCount, gap: stepsGap }}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20}
        />
      </Flex>
    </>
  );
};

export default App;
