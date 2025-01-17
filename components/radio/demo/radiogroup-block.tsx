import React from 'react';
import { Flex, Radio } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

const options: CheckboxGroupProps<string>['options'] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Radio.Group block options={options} defaultValue="Apple" />
    <Radio.Group
      block
      options={options}
      defaultValue="Apple"
      optionType="button"
      buttonStyle="solid"
    />
    <Radio.Group block options={options} defaultValue="Pear" optionType="button" />
  </Flex>
);

export default App;
