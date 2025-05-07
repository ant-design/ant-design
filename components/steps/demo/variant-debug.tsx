import React from 'react';
import { Flex, Steps, StepsProps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = React.useState(1);

  const sharedProps: StepsProps = {
    current,
    variant: 'outlined',
    onChange: (current: number) => {
      setCurrent(current);
    },
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

  return (
    <Flex vertical gap="middle">
      <Steps {...sharedProps} variant="filled" />
      <Steps {...sharedProps} />
      <Steps {...sharedProps} size="small" />
      <Steps {...sharedProps} orientation="vertical" />
      <Steps {...sharedProps} orientation="vertical" size="small" />
      <Steps {...sharedProps} progressDot size="small" />
      <Steps {...sharedProps} progressDot size="small" orientation="vertical" />
    </Flex>
  );
};

export default App;
