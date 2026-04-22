import React from 'react';
import { Button, Flex, TextTooltip } from 'antd';

const App: React.FC = () => (
  <Flex gap="middle" wrap>
    <TextTooltip title="Hover trigger" trigger="hover">
      <Button>Hover</Button>
    </TextTooltip>
    <TextTooltip title="Focus trigger" trigger="focus">
      <Button>Focus</Button>
    </TextTooltip>
    <TextTooltip title="Open by default" defaultOpen>
      <Button>Default open</Button>
    </TextTooltip>
  </Flex>
);

export default App;
