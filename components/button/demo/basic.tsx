import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Button type="primary">Approve Test</Button>
    <Button>Failed again</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Flex>
);

export default App;
