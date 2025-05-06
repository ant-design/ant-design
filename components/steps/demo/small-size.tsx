import React from 'react';
import { Flex, Steps } from 'antd';

const description = 'This is a description.';
const items = [
  {
    title: 'Finished',
    description,
  },
  {
    title: 'In Progress',
    description,
    subTitle: 'Left 00:00:08',
  },
  {
    title: 'Waiting',
    description,
  },
];

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Steps current={1} items={items} size="small" />
    <Steps current={1} items={items} size="small" variant="outlined" />
  </Flex>
);

export default App;
