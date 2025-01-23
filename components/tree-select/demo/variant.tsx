import React from 'react';
import { Flex, TreeSelect } from 'antd';

const style: React.CSSProperties = {
  width: '100%',
  maxWidth: '100%',
};

const App: React.FC = () => {
  return (
    <Flex vertical gap="middle">
      <TreeSelect style={style} placeholder="Please select" variant="borderless" />
      <TreeSelect style={style} placeholder="Please select" variant="filled" />
      <TreeSelect style={style} placeholder="Please select" variant="outlined" />
      <TreeSelect style={style} placeholder="Please select" variant="underlined" />
    </Flex>
  );
};

export default App;
