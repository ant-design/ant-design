import React from 'react';
import { Button, Flex, TextTooltip } from 'antd';

const App: React.FC = () => (
  <Flex gap="middle" align="center" wrap>
    <TextTooltip title="Copy link">
      <Button>Hover me</Button>
    </TextTooltip>
    <TextTooltip title="This tooltip only supports plain text.">
      <span>Plain text trigger</span>
    </TextTooltip>
  </Flex>
);

export default App;
