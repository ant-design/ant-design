import React from 'react';
import { Steps } from 'antd';

const content = 'This is a content.';
const App: React.FC = () => (
  <Steps
    current={1}
    percent={60}
    items={[
      {
        title: 'Finished',
        content,
      },
      {
        title: 'In Progress',
        subTitle: 'Left 00:00:08',
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
