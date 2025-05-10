import React from 'react';
import { Flex, Steps } from 'antd';

const content = 'This is a content.';
const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Progress',
    content,
    subTitle: 'Left 00:00:08',
  },
  {
    title: 'Waiting',
    content,
  },
];

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Steps current={1} items={items} />
    <Steps current={1} items={items} variant="outlined" />
  </Flex>
);

export default App;
