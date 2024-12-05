import React from 'react';
import { Button, Flex, Tooltip } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap={72} align="flex-start">
    <span />
    <Tooltip
      open
      title="Thanks for using antd. Have a nice day !"
      arrow={{ pointAtCenter: true }}
      placement="topLeft"
    >
      <Button>Point at center</Button>
    </Tooltip>
    <Tooltip open title="." placement="topLeft">
      <Button>Min Width</Button>
    </Tooltip>
    <Tooltip open title="." placement="top">
      <Button>Min Width</Button>
    </Tooltip>
  </Flex>
);

export default App;
