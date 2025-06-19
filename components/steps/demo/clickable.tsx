import React, { useState } from 'react';
import { Divider, Steps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  const content = 'This is a content.';

  return (
    <>
      <Steps
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Step 1',
            content,
          },
          {
            title: 'Step 2',
            content,
          },
          {
            title: 'Step 3',
            content,
          },
        ]}
      />

      <Divider />

      <Steps
        current={current}
        onChange={onChange}
        orientation="vertical"
        items={[
          {
            title: 'Step 1',
            content,
          },
          {
            title: 'Step 2',
            content,
          },
          {
            title: 'Step 3',
            content,
          },
        ]}
      />
    </>
  );
};

export default App;
