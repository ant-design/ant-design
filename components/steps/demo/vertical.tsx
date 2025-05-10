import React from 'react';
import { Steps } from 'antd';

const content = 'This is a content.';
const App: React.FC = () => (
  <Steps
    orientation="vertical"
    current={1}
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
);

export default App;
