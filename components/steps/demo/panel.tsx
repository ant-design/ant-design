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
        subTitle: '00:00:05',
        description: 'This is a description.',
      },
      {
        title: 'Step 2',
        subTitle: '00:01:02',
        description: 'This is a description.',
      },
      {
        title: 'Step 3',
        subTitle: 'waiting for longlong time',
        description: 'This is a description.',
      },
    ],
  };

  return (
    <Flex vertical gap="middle">
      <Steps {...sharedProps} />
      <Steps {...sharedProps} size="small" style={{ height: 200 }} />
    </Flex>
  );
};

export default App;
