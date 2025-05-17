import React, { useState } from 'react';
import { Flex, Steps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  return (
    <Flex vertical gap="large">
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Step 1',
            subTitle: '00:00:05',
            status: 'finish',
            content: 'This is a content.',
          },
          {
            title: 'Step 2',
            subTitle: '00:01:02',
            status: 'process',
            content: 'This is a content.',
          },
          {
            title: 'Step 3',
            subTitle: 'waiting for longlong time',
            status: 'wait',
            content: 'This is a content.',
          },
        ]}
      />

      <Steps
        type="navigation"
        current={current}
        onChange={onChange}
        items={[
          {
            status: 'finish',
            title: 'Step 1',
          },
          {
            status: 'process',
            title: 'Step 2',
          },
          {
            status: 'wait',
            title: 'Step 3',
          },
          {
            status: 'wait',
            title: 'Step 4',
          },
        ]}
      />

      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        items={[
          {
            status: 'finish',
            title: 'finish 1',
          },
          {
            status: 'finish',
            title: 'finish 2',
          },
          {
            status: 'process',
            title: 'current process',
          },
          {
            status: 'wait',
            title: 'wait',
            disabled: true,
          },
        ]}
      />
    </Flex>
  );
};

export default App;
