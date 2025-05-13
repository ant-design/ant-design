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
  },
  {
    title: 'Waiting',
    content,
  },
];

const App: React.FC = () => (
  <Flex>
    <div style={{ flex: 1 }}>
      <Steps orientation="vertical" current={1} items={items} />
    </div>
    <div style={{ flex: 1 }}>
      <Steps orientation="vertical" current={1} items={items} size="small" />
    </div>
  </Flex>
);

export default App;
