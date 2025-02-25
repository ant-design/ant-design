import React, { useState } from 'react';
import { AutoComplete, Select, Flex, Radio } from 'antd';
const AutoCompleteAndSelect = () => {
  const [size, setSize] = useState<'small' | 'middle' | 'large' | undefined>('middle');
  return (
    <Flex vertical gap={16}>
      <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio.Button value="small">small</Radio.Button>
        <Radio.Button value="middle">middle</Radio.Button>
        <Radio.Button value="large">large</Radio.Button>
      </Radio.Group>
      <Select defaultValue={'centered'} size={size} style={{ width: 200 }} />
      <AutoComplete defaultValue={'centered'} size={size} style={{ width: 200 }} />
    </Flex>
  );
};

export default AutoCompleteAndSelect;
