import React from 'react';
import { Button, Flex, Slider } from 'antd';

const App: React.FC = () => {
  const [gap, setGap] = React.useState<number>(8);
  return (
    <>
      <Slider value={gap} onChange={setGap} />
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
