import React from 'react';
import { Button, Flex, TextTooltip } from 'antd';

const App: React.FC = () => (
  <Flex gap="middle" wrap>
    <TextTooltip title="Arrow enabled">
      <Button>Arrow</Button>
    </TextTooltip>
    <TextTooltip title="Arrow disabled" arrow={false}>
      <Button>No Arrow</Button>
    </TextTooltip>
    <TextTooltip title="Bottom arrow" placement="bottom">
      <Button>Bottom</Button>
    </TextTooltip>
  </Flex>
);

export default App;
