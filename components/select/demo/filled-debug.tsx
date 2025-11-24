import React from 'react';
import { Flex, Select } from 'antd';
import type { SelectProps } from 'antd';

const sharedSelectProps: SelectProps<string> = {
  value: 'lucy',
  variant: 'filled' as const,
  style: { flex: '1 1 50%', minWidth: 0 },
  options: [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
  ],
};

const App: React.FC = () => (
  <Flex gap={12} vertical>
    <Flex gap={8}>
      <Select {...sharedSelectProps} disabled />
      <Select {...sharedSelectProps} disabled mode="multiple" placeholder="Outlined" />
    </Flex>
    <Flex gap={8}>
      <Select {...sharedSelectProps} status="error" />
      <Select {...sharedSelectProps} status="error" mode="multiple" placeholder="Outlined" />
    </Flex>
    <Flex gap={8}>
      <Select {...sharedSelectProps} disabled status="error" />
      <Select
        {...sharedSelectProps}
        disabled
        status="error"
        mode="multiple"
        placeholder="Outlined"
      />
    </Flex>
  </Flex>
);

export default App;
