import React from 'react';
import { Flex, Input } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <Flex gap={12}>
      <Input placeholder="Filled" variant="filled" />
      <Input placeholder="Filled" variant="filled" disabled />
      <Input placeholder="Filled" variant="filled" status="error" />
    </Flex>
    <Flex gap={12}>
      <Input prefix="$" placeholder="Filled" variant="filled" />
      <Input prefix="$" placeholder="Filled" variant="filled" disabled />
      <Input prefix="$" placeholder="Filled" variant="filled" status="error" />
    </Flex>
    <Flex gap={12}>
      <Input addonBefore="http://" addonAfter=".com" placeholder="Filled" variant="filled" />
      <Input
        addonBefore="http://"
        addonAfter=".com"
        placeholder="Filled"
        variant="filled"
        disabled
      />
      <Input
        addonBefore="http://"
        addonAfter=".com"
        placeholder="Filled"
        variant="filled"
        status="error"
      />
    </Flex>
    <Flex gap={12}>
      <Input addonAfter=".com" placeholder="Filled" variant="filled" />
      <Input addonAfter=".com" placeholder="Filled" variant="filled" disabled />
      <Input addonAfter=".com" placeholder="Filled" variant="filled" status="error" />
    </Flex>
    <Flex gap={12}>
      <Input addonBefore="http://" placeholder="Filled" variant="filled" />
      <Input addonBefore="http://" placeholder="Filled" variant="filled" disabled />
      <Input addonBefore="http://" placeholder="Filled" variant="filled" status="error" />
    </Flex>
  </Flex>
);

export default App;
