import React from 'react';
import { Button, Flex, Segmented } from 'antd';
import type { SegmentedValue } from 'antd/es/segmented';

const App: React.FC = () => {
  const [gap, setGap] = React.useState<SegmentedValue>('small');
  return (
    <>
      <Segmented value={gap} onChange={setGap} options={['small', 'middle', 'large']} />
      <br />
      <br />
      <Flex gap={gap}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Flex>
    </>
  );
};

export default App;
