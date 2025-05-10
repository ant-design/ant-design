import React from 'react';
import { Steps } from 'antd';

const content = 'This is a content.';
const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Progress',
    content,
    subTitle: 'Left 00:00:08',
  },
  {
    title: 'Waiting',
    content,
  },
];

const App: React.FC = () => <Steps current={1} items={items} size="small" />;

export default App;
