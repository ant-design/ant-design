import React from 'react';
import { Flex, Steps, StepsProps } from 'antd';

const sharedProps: StepsProps = {
  current: 1,
  variant: 'outlined',
  items: [
    {
      title: 'Finished',
      description: 'This is a description.',
    },
    {
      title: 'In Progress',
      description: 'This is a description.',
      status: 'error',
    },
    {
      title: 'Waiting',
      description: 'This is a description.',
    },
  ],
};

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Steps {...sharedProps} />
    <Steps {...sharedProps} size="small" />
    <Steps {...sharedProps} orientation="vertical" />
    <Steps {...sharedProps} orientation="vertical" size="small" />
    <Steps {...sharedProps} progressDot size="small" />
    <Steps {...sharedProps} progressDot size="small" orientation="vertical" />
  </Flex>
);

export default App;
