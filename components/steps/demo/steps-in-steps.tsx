import React, { useState } from 'react';
import type { StepsProps } from 'antd';
import { Card, Radio, Steps } from 'antd';

const App: React.FC = () => {
  const [size, setSize] = useState<StepsProps['size']>('default');
  const content = 'This is a content.';
  const horizontalSteps = (
    <Card>
      <Steps
        size={size}
        items={[
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
        ]}
      />
    </Card>
  );

  return (
    <>
      <Radio.Group
        style={{ marginBottom: 16 }}
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <Radio value="small">Small</Radio>
        <Radio value="default">Default</Radio>
      </Radio.Group>
      <Steps
        size={size}
        orientation="vertical"
        items={[
          {
            title: 'Finished',
            content: horizontalSteps,
          },
          {
            title: 'In Progress',
            content,
          },
          {
            title: 'Waiting',
            content,
          },
        ]}
      />
    </>
  );
};

export default App;
