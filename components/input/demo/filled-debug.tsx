import React from 'react';
import { Flex, Input } from 'antd';

const { TextArea } = Input;

const App: React.FC = () => (
  <Flex vertical gap={20}>
    <Flex gap={12}>
      <Input placeholder="Filled" variant="filled" />
      <Input placeholder="Filled" variant="filled" disabled />
      <Input placeholder="Filled" variant="filled" status="error" value="Filled Error" />
    </Flex>
    <Flex gap={12}>
      <Input prefix="$" placeholder="Filled" variant="filled" />
      <Input prefix="$" placeholder="Filled" variant="filled" disabled />
      <Input prefix="$" placeholder="Filled" variant="filled" status="error" value="Filled Error" />
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
        value="Filled Error"
      />
    </Flex>
    <Flex gap={12}>
      <Input addonAfter=".com" placeholder="Filled" variant="filled" />
      <Input addonAfter=".com" placeholder="Filled" variant="filled" disabled />
      <Input
        addonAfter=".com"
        placeholder="Filled"
        variant="filled"
        status="error"
        value="Filled Error"
      />
    </Flex>
    <Flex gap={12}>
      <Input addonBefore="http://" placeholder="Filled" variant="filled" />
      <Input addonBefore="http://" placeholder="Filled" variant="filled" disabled />
      <Input
        addonBefore="http://"
        placeholder="Filled"
        variant="filled"
        status="error"
        value="Filled Error"
      />
    </Flex>
    <TextArea variant="filled" placeholder="Basic" />
    <TextArea variant="filled" placeholder="Basic" status="error" value="Filled Error" />
    <TextArea variant="filled" placeholder="Allow Clear" allowClear />
    <TextArea variant="filled" placeholder="Show Count" showCount />
    <TextArea
      variant="filled"
      placeholder="Show Count"
      showCount
      status="error"
      value="Filled Error"
    />
  </Flex>
);

export default App;
