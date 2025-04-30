import React from 'react';
import { Flex, Steps } from 'antd';

const description = 'This is a description';
const items = [
  {
    title: 'Finished',
    description,
  },
  {
    title: 'In Process',
    description,
  },
  {
    title: 'Waiting',
    description,
  },
];

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Steps current={1} status="error" items={items} />
    <Steps current={1} status="error" items={items} variant="outlined" />
  </Flex>
);

export default App;
