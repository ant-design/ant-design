import React from 'react';
import { Flex, Radio, Typography } from 'antd';

const options = [
  { label: 'Hangzhou', value: 'a' },
  { label: 'Shanghai', value: 'b' },
  { label: 'Beijing', value: 'c' },
];

const App: React.FC = () => (
  <Flex gap="large" wrap>
    <Flex vertical gap="medium" style={{ flex: '1 1 280px' }}>
      <Typography.Text strong>Radio</Typography.Text>
      <Radio.Group defaultValue="a" size="large" options={options} />
      <Radio.Group defaultValue="a" options={options} />
      <Radio.Group defaultValue="a" size="small" options={options} />
    </Flex>
    <Flex vertical gap="medium" style={{ flex: '1 1 280px' }}>
      <Typography.Text strong>Radio.Button</Typography.Text>
      <Radio.Group defaultValue="a" size="large" options={options} optionType="button" />
      <Radio.Group defaultValue="a" options={options} optionType="button" />
      <Radio.Group defaultValue="a" size="small" options={options} optionType="button" />
    </Flex>
  </Flex>
);

export default App;
