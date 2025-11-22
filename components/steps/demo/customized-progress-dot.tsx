import React from 'react';
import type { StepsProps } from 'antd';
import { Popover, Steps } from 'antd';

const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);
const content = 'You can hover on the dot.';
const App: React.FC = () => (
  <Steps
    current={1}
    progressDot={customDot}
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
      {
        title: 'Waiting',
        content,
      },
    ]}
  />
);

export default App;
