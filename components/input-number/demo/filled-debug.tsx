import React from 'react';
import { Flex, InputNumber } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <Flex gap={12}>
      <InputNumber placeholder="Filled" variant="filled" />
      <InputNumber placeholder="Filled" variant="filled" disabled />
      <InputNumber placeholder="Filled" variant="filled" status="error" />
    </Flex>
    <Flex gap={12}>
      <InputNumber prefix="$" placeholder="Filled" variant="filled" />
      <InputNumber prefix="$" placeholder="Filled" variant="filled" disabled />
      <InputNumber prefix="$" placeholder="Filled" variant="filled" status="error" />
    </Flex>
    <Flex gap={12}>
      <InputNumber addonBefore="http://" addonAfter=".com" placeholder="Filled" variant="filled" />
      <InputNumber
        addonBefore="http://"
        addonAfter=".com"
        placeholder="Filled"
        variant="filled"
        disabled
      />
      <InputNumber
        addonBefore="http://"
        addonAfter=".com"
        placeholder="Filled"
        variant="filled"
        status="error"
      />
    </Flex>
    <Flex gap={12}>
      <InputNumber addonAfter=".com" placeholder="Filled" variant="filled" />
      <InputNumber addonAfter=".com" placeholder="Filled" variant="filled" disabled />
      <InputNumber addonAfter=".com" placeholder="Filled" variant="filled" status="error" />
    </Flex>
    <Flex gap={12}>
      <InputNumber addonBefore="http://" placeholder="Filled" variant="filled" />
      <InputNumber addonBefore="http://" placeholder="Filled" variant="filled" disabled />
      <InputNumber addonBefore="http://" placeholder="Filled" variant="filled" status="error" />
    </Flex>
  </Flex>
);

export default App;
