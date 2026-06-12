import React from 'react';
import { Badge, Flex, Radio } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle" align="start">
    <Radio.Group buttonStyle="solid">
      <Badge count={1}>
        <Radio.Button value={1}>Click Me</Radio.Button>
      </Badge>
      <Badge count={2}>
        <Radio.Button value={2}>Not Me</Radio.Button>
      </Badge>
    </Radio.Group>
    <Radio.Group vertical buttonStyle="solid">
      <Badge count={1}>
        <Radio.Button value="vertical-1">Click Me</Radio.Button>
      </Badge>
      <Badge count={0}>
        <Radio.Button value="vertical-0">Hidden Badge</Radio.Button>
      </Badge>
      <Badge count={2}>
        <Radio.Button value="vertical-2">Not Me</Radio.Button>
      </Badge>
    </Radio.Group>
  </Flex>
);

export default App;
