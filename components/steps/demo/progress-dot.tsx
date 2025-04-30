import React from 'react';
import { Divider, Flex, Steps } from 'antd';

const items = [
  {
    title: 'Finished',
    description: 'This is a description.',
  },
  {
    title: 'In Progress',
    description: 'This is a description.',
  },
  {
    title: 'Waiting',
    description: 'This is a description.',
  },
];

const sharedProps = {
  progressDot: true,
  current: 1,
  items,
};

const sharedVerticalProps = {
  ...sharedProps,
  orientation: 'vertical',
  style: {
    flex: 'auto',
  },
} as const;

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Steps {...sharedProps} />
    <Steps {...sharedProps} variant="outlined" />
    <Divider />
    <Flex gap="middle">
      <Steps {...sharedVerticalProps} />
      <Steps {...sharedVerticalProps} variant="outlined" />
    </Flex>
  </Flex>
);

export default App;
