import React, { useState } from 'react';
import { Flex, Steps } from 'antd';
import type { StepsProps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const sharedProps: StepsProps = {
    type: 'panel',
    current,
    onChange,
    items: [
      {
        title: 'Step 1',
        subTitle: '00:00',
        description: 'This is a description.',
      },
      {
        title: 'Step 2',
        description: 'This is a description.',
        status: 'error',
      },
      {
        title: 'Step 3',
        description: 'This is a description.',
      },
    ],
  };

  return (
    <Flex vertical gap="middle">
      <Steps {...sharedProps} />
      <Steps {...sharedProps} size="small" />
      <Steps {...sharedProps} size="small" variant="outlined" />
    </Flex>
  );
};

export default App;
